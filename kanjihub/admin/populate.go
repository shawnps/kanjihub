package admin

import (
	"appengine"
	"appengine/datastore"
	"appengine/delay"
	"admin/kanjidic2"
	"net/http"
)

func init() {
	http.HandleFunc("/populate", populate)
}

type Kanji struct {
	Literal     string
	Grade       int
	StrokeCount int
	Freq        int
	JLPT        int
	Onyomi      []string
	Kunyomi     []string
	Meanings    []string
}

func populate(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	populateLater.Call(c)
}

var populateLater = delay.Func("populate", func(c appengine.Context) {
	kanjidic := kanjidic2.ParseKanjiDic2("kanjidic2.xml")
	for _, kanji := range kanjidic {
		c.Infof(kanji.Literal)
		k := Kanji{
			Literal:     kanji.Literal,
			Grade:       kanji.Grade,
			StrokeCount: kanji.StrokeCount,
			Freq:        kanji.Freq,
			JLPT:        kanji.JLPT,
		}
		for _, r := range kanji.Readings {
			if r.RType == "ja_on" {
				k.Onyomi = append(k.Onyomi, r.Value)
			}
			if r.RType == "ja_kun" {
				k.Kunyomi = append(k.Kunyomi, r.Value)
			}
		}
		for _, m := range kanji.Meanings {
			// English meanings do not have an m_lang attribute
			if m.MLang == "" {
				k.Meanings = append(k.Meanings, m.Value)
			}
		}
		_, err := datastore.Put(c, datastore.NewKey(c, "Kanji", kanji.Literal, 0, nil), &k)
		if err != nil {
			c.Errorf(err.Error())
			return
		}
	}
})
