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

func KanjiDetailHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	w.Header().Set("Content-Type", "application/json")
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
		fmt.Fprint(w, string(b))
	}
    w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, string(b))
}
