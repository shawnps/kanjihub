package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"io/ioutil"
	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
	"net/http"
)

const mongoDbUrl = "localhost"

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

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler)
	r.HandleFunc("/api/kanji/{literal}", KanjiDetailHandler)
	//r.HandleFunc("/api/search/{reading}/{term}", KanjiSearchHandler)
	r.HandleFunc("/{path:.*}", HomeHandler)
	http.Handle("/", r)
	http.ListenAndServe(":8080", nil)
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

/*
func KanjiSearchHandler(w http.ResponseWriter, r *http.Request) {
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
*/

func KanjiDetailHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	l := vars["literal"]
	session, err := mgo.Dial(mongoDbUrl)
	if err != nil {
		fmt.Println(err)
	}
	c := session.DB("kanjihub").C("kanji")
	kanji := new(Kanji)
	err = c.Find(bson.M{"literal": l}).One(&kanji)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	b, err := json.Marshal(kanji)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	fmt.Fprint(w, string(b))
}
