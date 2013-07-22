package main

import (
	"fmt"
	"github.com/shawnps/kanjidic2"
	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
	"sync"
)

const mongoDbUrl = "localhost"

type Kanji struct {
	Id          bson.ObjectId `bson:"_id"`
	Literal     string
	Grade       int
	StrokeCount int
	Freq        int
	JLPT        int
	Onyomi      []string
	Kunyomi     []string
	Meanings    []string
}

func main() {
	var wg sync.WaitGroup
	kanjidic := kanjidic2.ParseKanjiDic2("kanjidic2/kanjidic2.xml")
	session, err := mgo.Dial(mongoDbUrl)
	if err != nil {
		fmt.Println(err)
	}
	for _, kanji := range kanjidic {
		wg.Add(1)
		k := Kanji{
			Id:          bson.NewObjectId(),
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
		fmt.Println("inserting this kanji: ", k)
		go func(s *mgo.Session, k Kanji) {
			defer wg.Done()
			c := s.DB("kanjihub").C("kanji")
			err := c.Insert(k)
			if err != nil {
				fmt.Println(err)
			}
		}(session, k)
	}
	wg.Wait()
}
