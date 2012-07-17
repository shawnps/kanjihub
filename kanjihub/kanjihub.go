package kanjihub

import (
	"io/ioutil"
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
	http.Handle("/", r)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
        b, err := ioutil.ReadFile("frontend/public/index.html")
        if err != nil {
            http.Error(w, err.Error(), http.StatusNotFound)
            return
        }
	fmt.Fprint(w, string(b))
        return
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
