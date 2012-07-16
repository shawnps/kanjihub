package kanjidic2

import (
	"encoding/xml"
	"log"
	"os"
)

type Reading struct {
	RType string `xml:"r_type,attr"json:"r_type"`
	Value string `xml:",innerxml"json:"reading"`
}

type Meaning struct {
	MLang string `xml:"m_lang,attr"json:"m_lang,omitempty"`
	Value string `xml:",innerxml"json:"meaning"`
}

type DicRef struct {
	DrType string `xml:"dr_type,attr"json:"dr_type"`
	Value  string `xml:",chardata"json:"dic_ref"`
}

type CpValue struct {
	CpType string `xml:"cp_type,attr"json:"cp_type"`
	Value  string `xml:",innerxml"json:"cp_value"`
}

type RadValue struct {
	RadType string `xml:"rad_type,attr"json:"rad_type"`
	Value   int    `xml:",chardata"json:"rad_value"`
}

type Variant struct {
	VarType string `xml:"var_type,attr"json:"var_type"`
	Value   string `xml:",innerxml"json:"variant"`
}

type QCode struct {
	QcType string `xml:"qc_type,attr"json:"qc_type"`
	Value  string `xml:",innerxml"json:"q_code"`
}

type Kanji struct {
	Literal     string     `xml:"literal"json:"literal"`
	CodePoints  []CpValue  `xml:"codepoint>cp_value"json:"codepoints"`
	Radicals    []RadValue `xml:"radical>rad_value"json:"radicals"`
	Grade       int        `xml:"misc>grade"json:"grade,omitempty"`
	StrokeCount int        `xml:"misc>stroke_count"json:"stroke_count"`
	Variant     *Variant   `xml:"misc>variant"json:"variant,omitempty"`
	Freq        int        `xml:"misc>freq"json:"freq,omitempty"`
	JLPT        int        `xml:"misc>jlpt"json:"jlpt,omitempty"`
	DicRefs     []DicRef   `xml:"dic_number>dic_ref"json:"dic_numbers,omitempty"`
	QueryCodes  []QCode    `xml:"query_code>q_code"json:"query_codes,omitempty"`
	Readings    []Reading  `xml:"reading_meaning>rmgroup>reading"json:"readings,omitempty"`
	Meanings    []Meaning  `xml:"reading_meaning>rmgroup>meaning"json:"meanings,omitempty"`
	Nanori      []string   `xml:"nanori"json:"nanori,omitempty"`
}

func ParseKanjiDic2(filename string) (kanjiList []Kanji) {
	xmlFile, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer xmlFile.Close()
	decoder := xml.NewDecoder(xmlFile)
	for {
		token, _ := decoder.Token()
		if token == nil {
			break
		}
		switch startElement := token.(type) {
		case xml.StartElement:
			if startElement.Name.Local == "character" {
				var kanji Kanji
				decoder.DecodeElement(&kanji, &startElement)
				kanjiList = append(kanjiList, kanji)
			}
		}
	}
	return
}
