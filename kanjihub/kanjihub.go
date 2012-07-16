package kanjihub

import (
	"appengine"
	"appengine/datastore"
	"code.google.com/p/gorilla/mux"
	"encoding/json"
	"fmt"
	"net/http"
)

type Kanji struct {
	Literal     string   `json:"literal"`
	Grade       int      `json:"grade"`
	StrokeCount int      `json:"stroke_count"`
	Freq        int      `json:"freq"`
	JLPT        int      `json:"jlpt"`
	Onyomi      []string `json:"onyomi"`
	Kunyomi     []string `json:"kunyomi"`
	Meanings    []string `json:"meanings"`
}

func init() {
	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler)
	r.HandleFunc("/kanji/{literal}", KanjiDetailHandler)
	http.Handle("/", r)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, world!")
}

func KanjiDetailHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	l := vars["literal"]
	c := appengine.NewContext(r)
	k := datastore.NewKey(c, "Kanji", l, 0, nil)
	kanji := new(Kanji)
	err := datastore.Get(c, k, kanji)
	if err != nil {
		fmt.Fprint(w, err)
	}
	b, err := json.Marshal(kanji)
	if err != nil {
		fmt.Fprint(w, err)
	}
	fmt.Fprint(w, string(b))
}
