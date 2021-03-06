package kanjihub

import (
	"appengine"
	"appengine/datastore"
	"appengine/memcache"
	"code.google.com/p/gorilla/mux"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

type Kanji struct {
	Literal     string   `json:"literal"`
	Grade       int      `json:"grade"`
	StrokeCount int      `json:"strokes"`
	Freq        int      `json:"freq"`
	JLPT        int      `json:"jlpt"`
	Onyomi      []string `json:"onYomi"`
	Kunyomi     []string `json:"kunYomi"`
	Meanings    []string `json:"meanings"`
}

func init() {
	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler)
	r.HandleFunc("/api/kanji/{literal}", KanjiDetailHandler)
	r.HandleFunc("/api/search/{reading}/{term}", KanjiSearchHandler)
	r.HandleFunc("/{path:.*}", HomeHandler)
	http.Handle("/", r)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	b, err := ioutil.ReadFile("index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	fmt.Fprint(w, string(b))
	return
}

func KanjiSearchHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	// parse query params out of url
	vars := mux.Vars(r)
	// TODO: change query based on reading
	reading := vars["reading"]
	searchTerm := vars["term"]
	readingFilter := "Kunyomi ="
	if reading == strings.ToLower("onyomi") {
		readingFilter = "Onyomi ="
	}

	// build the query
	q := datastore.NewQuery("Kanji").
		Filter(readingFilter, searchTerm).
		Order("StrokeCount").
		Limit(100)

	// execute query and capture results
	results := make([]Kanji, 0)
	if _, err := q.GetAll(c, &results); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// marshall kanji into json
	jsonResults, err := json.Marshal(results)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	// output results
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	fmt.Fprint(w, string(jsonResults))
}

func KanjiDetailHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	vars := mux.Vars(r)
	l := vars["literal"]
	k := datastore.NewKey(c, "Kanji", l, 0, nil)
	// Try to get kanji from memcache
	item, err := memcache.Get(c, l)
	if err != nil && err != memcache.ErrCacheMiss {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	// Got it from memcache
	if err == nil {
		c.Debugf("memcache hit for %s", l)
		fmt.Fprint(w, string(item.Value))
		return
	} else {
		// Wasn't in memcache, have to get from datastore
		kanji := new(Kanji)
		err := datastore.Get(c, k, kanji)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		b, err := json.Marshal(kanji)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		// Set it in memcache with the literal as the key, and the
		// []byte representation of the JSON as the value
		item := &memcache.Item{
			Key:   l,
			Value: b,
		}
		err = memcache.Set(c, item)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		fmt.Fprint(w, string(b))
	}
}
