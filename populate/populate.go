package main

import (
	"appengine"
	"appengine/datastore"
	"kanjidic2"
	"net/http"
)

func init() {
	http.HandleFunc("/populate", populate)
}

func populate(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	kanjidic := kanjidic2.ParseKanjiDic2("/Users/shawn/kanjihub/kanjidic2/kanjidic2.xml")
	for _, kanji := range kanjidic {
		_, err := datastore.Put(c, datastore.NewIncompleteKey(c, "Kanji", nil), &kanji)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
