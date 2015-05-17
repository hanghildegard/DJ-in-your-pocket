OfflineSongs = new Ground.Collection('offlineSongs', { connection: null });
MetaData = {
    "genre_groups": [
        {
            "id": 1001,
            "name": "Pop"
        },
        {
            "id": 1002,
            "name": "Rock"
        },
        {
            "id": 1003,
            "name": "Metal"
        },
        {
            "id": 1004,
            "name": "Blues"
        },
        {
            "id": 1007,
            "name": "Dance"
        },
        {
            "id": 1008,
            "name": "Street &amp; Urban"
        },
        {
            "id": 1009,
            "name": "World Music"
        },
        {
            "id": 1010,
            "name": "Xtreme"
        },
        {
            "id": 1005,
            "name": "Latin"
        },
        {
            "id": 1006,
            "name": "Jamaica"
        },
        {
            "id": 1011,
            "name": "Background"
        }
    ],
    "genres": [
        {
            "id": "79",
            "name": "Acid House",
            "group_id": "1007"
        },
        {
            "id": "60",
            "name": "Acidjazz",
            "group_id": "1008"
        },
        {
            "id": "42",
            "name": "Afro",
            "group_id": "1009"
        },
        {
            "id": "85",
            "name": "Alternative Metal",
            "group_id": "1003"
        },
        {
            "id": "2",
            "name": "Alternative Rock",
            "group_id": "1002"
        },
        {
            "id": "17",
            "name": "Ambient",
            "group_id": "1011"
        },
        {
            "id": "122",
            "name": "Arabic",
            "group_id": "1009"
        },
        {
            "id": "111",
            "name": "Bebop",
            "group_id": "1004"
        },
        {
            "id": "82",
            "name": "Black Metal",
            "group_id": "1003"
        },
        {
            "id": "126",
            "name": "Bluegrass",
            "group_id": "1009"
        },
        {
            "id": "8",
            "name": "Blues",
            "group_id": "1004"
        },
        {
            "id": "90",
            "name": "Bossa Nova",
            "group_id": "1005"
        },
        {
            "id": "35",
            "name": "Breakbeat",
            "group_id": "1007"
        },
        {
            "id": "103",
            "name": "Cajun",
            "group_id": "1009"
        },
        {
            "id": "102",
            "name": "Calypso",
            "group_id": "1005"
        },
        {
            "id": "132",
            "name": "Celtic Folk",
            "group_id": "1009"
        },
        {
            "id": "131",
            "name": "Celtic Punk",
            "group_id": "1002"
        },
        {
            "id": "97",
            "name": "Chanson",
            "group_id": "1009"
        },
        {
            "id": "127",
            "name": "Chill-Out",
            "group_id": "1011"
        },
        {
            "id": "83",
            "name": "Choral Music",
            "group_id": "1011"
        },
        {
            "id": "84",
            "name": "Church Music",
            "group_id": "1011"
        },
        {
            "id": "32",
            "name": "Cinematic",
            "group_id": "1011"
        },
        {
            "id": "28",
            "name": "Classical",
            "group_id": "1011"
        },
        {
            "id": "107",
            "name": "Classical Pop",
            "group_id": "1001"
        },
        {
            "id": "113",
            "name": "Cool Jazz",
            "group_id": "1004"
        },
        {
            "id": "130",
            "name": "Country Pop",
            "group_id": "1001"
        },
        {
            "id": "9",
            "name": "Country &amp; Western",
            "group_id": "1009"
        },
        {
            "id": "49",
            "name": "Dance",
            "group_id": "1007"
        },
        {
            "id": "41",
            "name": "Dancehall",
            "group_id": "1006"
        },
        {
            "id": "101",
            "name": "Dance-pop",
            "group_id": "1001"
        },
        {
            "id": "74",
            "name": "Death Metal",
            "group_id": "1003"
        },
        {
            "id": "7",
            "name": "Disco",
            "group_id": "1007"
        },
        {
            "id": "105",
            "name": "Doom Metal",
            "group_id": "1003"
        },
        {
            "id": "18",
            "name": "Drum'n'Bass",
            "group_id": "1007"
        },
        {
            "id": "26",
            "name": "Dub",
            "group_id": "1006"
        },
        {
            "id": "56",
            "name": "Dubstep",
            "group_id": "1008"
        },
        {
            "id": "63",
            "name": "EBM",
            "group_id": "1010"
        },
        {
            "id": "23",
            "name": "Electro",
            "group_id": "1008"
        },
        {
            "id": "55",
            "name": "Electro-house",
            "group_id": "1007"
        },
        {
            "id": "99",
            "name": "Electronic Rock",
            "group_id": "1007"
        },
        {
            "id": "100",
            "name": "Electropop",
            "group_id": "1007"
        },
        {
            "id": "45",
            "name": "Etno",
            "group_id": "1009"
        },
        {
            "id": "31",
            "name": "Europop",
            "group_id": "1007"
        },
        {
            "id": "104",
            "name": "Fado",
            "group_id": "1005"
        },
        {
            "id": "69",
            "name": "Flamenco",
            "group_id": "1005"
        },
        {
            "id": "43",
            "name": "Folk",
            "group_id": "1009"
        },
        {
            "id": "118",
            "name": "Folk Metal",
            "group_id": "1003"
        },
        {
            "id": "22",
            "name": "Funk",
            "group_id": "1004"
        },
        {
            "id": "64",
            "name": "Futurepop",
            "group_id": "1010"
        },
        {
            "id": "38",
            "name": "Garagerock",
            "group_id": "1002"
        },
        {
            "id": "54",
            "name": "Glamrock",
            "group_id": "1002"
        },
        {
            "id": "75",
            "name": "Gospel",
            "group_id": "1004"
        },
        {
            "id": "24",
            "name": "Goth Rock",
            "group_id": "1002"
        },
        {
            "id": "62",
            "name": "Grime",
            "group_id": "1008"
        },
        {
            "id": "87",
            "name": "Grindcore",
            "group_id": "1003"
        },
        {
            "id": "116",
            "name": "Grunge",
            "group_id": "1002"
        },
        {
            "id": "114",
            "name": "Hard Bop",
            "group_id": "1004"
        },
        {
            "id": "73",
            "name": "Hardcore Punk",
            "group_id": "1002"
        },
        {
            "id": "77",
            "name": "Hardcore Techno",
            "group_id": "1007"
        },
        {
            "id": "4",
            "name": "Hard Rock",
            "group_id": "1002"
        },
        {
            "id": "12",
            "name": "Heavy Metal",
            "group_id": "1003"
        },
        {
            "id": "78",
            "name": "High Energy",
            "group_id": "1007"
        },
        {
            "id": "47",
            "name": "Hiphop",
            "group_id": "1008"
        },
        {
            "id": "19",
            "name": "House",
            "group_id": "1007"
        },
        {
            "id": "123",
            "name": "IDM",
            "group_id": "1007"
        },
        {
            "id": "57",
            "name": "Indie-Electro",
            "group_id": "1007"
        },
        {
            "id": "51",
            "name": "Indiepop",
            "group_id": "1001"
        },
        {
            "id": "50",
            "name": "Indierock",
            "group_id": "1002"
        },
        {
            "id": "29",
            "name": "Industrial",
            "group_id": "1010"
        },
        {
            "id": "86",
            "name": "Industrial Metal",
            "group_id": "1003"
        },
        {
            "id": "109",
            "name": "Instrumental Rock",
            "group_id": "1002"
        },
        {
            "id": "80",
            "name": "Italo Disco",
            "group_id": "1007"
        },
        {
            "id": "6",
            "name": "Jazz",
            "group_id": "1004"
        },
        {
            "id": "106",
            "name": "Jazz Fusion",
            "group_id": "1004"
        },
        {
            "id": "5",
            "name": "Latin",
            "group_id": "1005"
        },
        {
            "id": "129",
            "name": "Latin Pop",
            "group_id": "1001"
        },
        {
            "id": "98",
            "name": "Mambo",
            "group_id": "1005"
        },
        {
            "id": "94",
            "name": "Mariachi",
            "group_id": "1005"
        },
        {
            "id": "125",
            "name": "Metalcore",
            "group_id": "1003"
        },
        {
            "id": "120",
            "name": "New Age",
            "group_id": "1011"
        },
        {
            "id": "52",
            "name": "New Wave",
            "group_id": "1002"
        },
        {
            "id": "21",
            "name": "Noise",
            "group_id": "1010"
        },
        {
            "id": "59",
            "name": "Nu-Jazz",
            "group_id": "1008"
        },
        {
            "id": "119",
            "name": "Nu Metal",
            "group_id": "1003"
        },
        {
            "id": "53",
            "name": "Opera",
            "group_id": "1011"
        },
        {
            "id": "108",
            "name": "Operatic Pop",
            "group_id": "1001"
        },
        {
            "id": "89",
            "name": "Piano Rock",
            "group_id": "1001"
        },
        {
            "id": "10",
            "name": "Pop",
            "group_id": "1001"
        },
        {
            "id": "88",
            "name": "Post-punk",
            "group_id": "1002"
        },
        {
            "id": "117",
            "name": "Post-rock",
            "group_id": "1002"
        },
        {
            "id": "81",
            "name": "Power Metal",
            "group_id": "1003"
        },
        {
            "id": "128",
            "name": "Progressive House",
            "group_id": "1007"
        },
        {
            "id": "92",
            "name": "Progressive Metal",
            "group_id": "1003"
        },
        {
            "id": "39",
            "name": "Progressive Rock",
            "group_id": "1002"
        },
        {
            "id": "124",
            "name": "Psychedelic Rock",
            "group_id": "1002"
        },
        {
            "id": "91",
            "name": "Psychobilly",
            "group_id": "1002"
        },
        {
            "id": "37",
            "name": "Punkrock",
            "group_id": "1002"
        },
        {
            "id": "15",
            "name": "Rap",
            "group_id": "1008"
        },
        {
            "id": "16",
            "name": "Reggae",
            "group_id": "1006"
        },
        {
            "id": "58",
            "name": "Reggaeton",
            "group_id": "1008"
        },
        {
            "id": "36",
            "name": "R'n'B",
            "group_id": "1008"
        },
        {
            "id": "13",
            "name": "Rock",
            "group_id": "1002"
        },
        {
            "id": "40",
            "name": "Rockabilly",
            "group_id": "1002"
        },
        {
            "id": "76",
            "name": "Rock 'n' Roll",
            "group_id": "1002"
        },
        {
            "id": "66",
            "name": "Rumba",
            "group_id": "1005"
        },
        {
            "id": "68",
            "name": "Salsa",
            "group_id": "1005"
        },
        {
            "id": "65",
            "name": "Samba",
            "group_id": "1005"
        },
        {
            "id": "1",
            "name": "Schlager",
            "group_id": "1001"
        },
        {
            "id": "110",
            "name": "Show\/Musical",
            "group_id": "1011"
        },
        {
            "id": "33",
            "name": "Ska",
            "group_id": "1006"
        },
        {
            "id": "67",
            "name": "Soca",
            "group_id": "1005"
        },
        {
            "id": "96",
            "name": "Son",
            "group_id": "1005"
        },
        {
            "id": "25",
            "name": "Soul",
            "group_id": "1004"
        },
        {
            "id": "121",
            "name": "Soundscape",
            "group_id": "1011"
        },
        {
            "id": "70",
            "name": "Speed Metal",
            "group_id": "1003"
        },
        {
            "id": "115",
            "name": "Stoner Rock",
            "group_id": "1002"
        },
        {
            "id": "112",
            "name": "Swing",
            "group_id": "1004"
        },
        {
            "id": "61",
            "name": "Swingbeat",
            "group_id": "1008"
        },
        {
            "id": "48",
            "name": "Synthpop",
            "group_id": "1001"
        },
        {
            "id": "46",
            "name": "Techno",
            "group_id": "1007"
        },
        {
            "id": "95",
            "name": "Tex-Mex",
            "group_id": "1009"
        },
        {
            "id": "71",
            "name": "Thrash Metal",
            "group_id": "1003"
        },
        {
            "id": "20",
            "name": "Trance",
            "group_id": "1007"
        },
        {
            "id": "34",
            "name": "Triphop",
            "group_id": "1008"
        },
        {
            "id": "93",
            "name": "Vocal Jazz",
            "group_id": "1004"
        },
        {
            "id": "44",
            "name": "World Music",
            "group_id": "1009"
        }
    ],
    "parameters": [
        {
            "id": 26,
            "name": "Adult Oriented"
        },
        {
            "id": 14,
            "name": "Aggressive"
        },
        {
            "id": 29,
            "name": "Alternative"
        },
        {
            "id": 25,
            "name": "Art\/Artistic"
        },
        {
            "id": 5,
            "name": "Background"
        },
        {
            "id": 31,
            "name": "Ballad"
        },
        {
            "id": 28,
            "name": "Bombastic"
        },
        {
            "id": 8,
            "name": "Couple-forming"
        },
        {
            "id": 9,
            "name": "Dance-value"
        },
        {
            "id": 11,
            "name": "Energetic"
        },
        {
            "id": 4,
            "name": "Evergreen"
        },
        {
            "id": 24,
            "name": "Experimental"
        },
        {
            "id": 23,
            "name": "Explicit content"
        },
        {
            "id": 18,
            "name": "Festal"
        },
        {
            "id": 12,
            "name": "Happy"
        },
        {
            "id": 30,
            "name": "Humour"
        },
        {
            "id": 13,
            "name": "Melancholic"
        },
        {
            "id": 22,
            "name": "Melodic"
        },
        {
            "id": 1,
            "name": "Popularity"
        },
        {
            "id": 21,
            "name": "Psychedelic"
        },
        {
            "id": 16,
            "name": "Quality of Recording"
        },
        {
            "id": 6,
            "name": "Singalong"
        },
        {
            "id": 27,
            "name": "Teen Oriented"
        },
        {
            "id": 3,
            "name": "Today's Hit"
        },
        {
            "id": 7,
            "name": "Traditional"
        },
        {
            "id": 10,
            "name": "Uplifting"
        }
    ],
    "themes": [
        {
            "id": 9,
            "name": "Army"
        },
        {
            "id": 6,
            "name": "Children"
        },
        {
            "id": 1,
            "name": "Christmas"
        },
        {
            "id": 16,
            "name": "Drinking Songs"
        },
        {
            "id": 11,
            "name": "Eurovision Song Contest"
        },
        {
            "id": 17,
            "name": "Halloween"
        },
        {
            "id": 2,
            "name": "Ice hockey"
        },
        {
            "id": 13,
            "name": "Idols\/Popstars\/X Factor"
        },
        {
            "id": 3,
            "name": "Love"
        },
        {
            "id": 5,
            "name": "Movie"
        },
        {
            "id": 14,
            "name": "Musical"
        },
        {
            "id": 18,
            "name": "Nature Sounds"
        },
        {
            "id": 8,
            "name": "Spiritual"
        },
        {
            "id": 7,
            "name": "Summer"
        },
        {
            "id": 15,
            "name": "TV"
        },
        {
            "id": 10,
            "name": "Wedding"
        }
    ],
    "dances": [
        {
            "id": 5,
            "name": "Beat"
        },
        {
            "id": 23,
            "name": "Beguine"
        },
        {
            "id": 6,
            "name": "Cha-cha"
        },
        {
            "id": 3,
            "name": "Foxtrot"
        },
        {
            "id": 8,
            "name": "Humppa"
        },
        {
            "id": 9,
            "name": "Jenkka"
        },
        {
            "id": 4,
            "name": "Jive"
        },
        {
            "id": 25,
            "name": "Mambo"
        },
        {
            "id": 28,
            "name": "Mazurka"
        },
        {
            "id": 27,
            "name": "Merengue"
        },
        {
            "id": 17,
            "name": "Nopea beat"
        },
        {
            "id": 19,
            "name": "Nopea fox"
        },
        {
            "id": 14,
            "name": "Paso doble"
        },
        {
            "id": 13,
            "name": "Polka"
        },
        {
            "id": 12,
            "name": "Quickstep"
        },
        {
            "id": 15,
            "name": "Rumba"
        },
        {
            "id": 26,
            "name": "Salsa"
        },
        {
            "id": 11,
            "name": "Samba"
        },
        {
            "id": 21,
            "name": "Shuffle"
        },
        {
            "id": 16,
            "name": "Slow beat"
        },
        {
            "id": 18,
            "name": "Slow fox"
        },
        {
            "id": 20,
            "name": "Slow waltz"
        },
        {
            "id": 2,
            "name": "Tango"
        },
        {
            "id": 22,
            "name": "Trioli"
        },
        {
            "id": 7,
            "name": "Twist"
        },
        {
            "id": 24,
            "name": "Viennese Waltz"
        },
        {
            "id": 1,
            "name": "Waltz"
        }
    ],
    "countries": [
        {
            "id": 4,
            "name": "Algeria"
        },
        {
            "id": 11,
            "name": "Argentina"
        },
        {
            "id": 14,
            "name": "Australia"
        },
        {
            "id": 15,
            "name": "Austria"
        },
        {
            "id": 17,
            "name": "Bahamas"
        },
        {
            "id": 20,
            "name": "Barbados"
        },
        {
            "id": 22,
            "name": "Belgium"
        },
        {
            "id": 27,
            "name": "Bolivia"
        },
        {
            "id": 31,
            "name": "Brazil"
        },
        {
            "id": 38,
            "name": "Cameroon"
        },
        {
            "id": 39,
            "name": "Canada"
        },
        {
            "id": 45,
            "name": "China"
        },
        {
            "id": 48,
            "name": "Colombia"
        },
        {
            "id": 56,
            "name": "Cuba"
        },
        {
            "id": 58,
            "name": "Czech Republic"
        },
        {
            "id": 59,
            "name": "Denmark"
        },
        {
            "id": 64,
            "name": "Egypt"
        },
        {
            "id": 225,
            "name": "England"
        },
        {
            "id": 68,
            "name": "Estonia"
        },
        {
            "id": 73,
            "name": "Finland"
        },
        {
            "id": 74,
            "name": "France"
        },
        {
            "id": 81,
            "name": "Germany"
        },
        {
            "id": 84,
            "name": "Greece"
        },
        {
            "id": 93,
            "name": "Haiti"
        },
        {
            "id": 97,
            "name": "Hungary"
        },
        {
            "id": 98,
            "name": "Iceland"
        },
        {
            "id": 101,
            "name": "Iran, Islamic Republic Of"
        },
        {
            "id": 102,
            "name": "Iraq"
        },
        {
            "id": 103,
            "name": "Ireland"
        },
        {
            "id": 104,
            "name": "Israel"
        },
        {
            "id": 105,
            "name": "Italy"
        },
        {
            "id": 106,
            "name": "Jamaica"
        },
        {
            "id": 107,
            "name": "Japan"
        },
        {
            "id": 117,
            "name": "Latvia"
        },
        {
            "id": 118,
            "name": "Lebanon"
        },
        {
            "id": 138,
            "name": "Mexico"
        },
        {
            "id": 140,
            "name": "Moldova, Republic Of"
        },
        {
            "id": 144,
            "name": "Morocco"
        },
        {
            "id": 150,
            "name": "Netherlands"
        },
        {
            "id": 156,
            "name": "Nigeria"
        },
        {
            "id": 240,
            "name": "Northern Ireland"
        },
        {
            "id": 160,
            "name": "Norway"
        },
        {
            "id": 171,
            "name": "Poland"
        },
        {
            "id": 172,
            "name": "Portugal"
        },
        {
            "id": 173,
            "name": "Puerto Rico"
        },
        {
            "id": 176,
            "name": "Romania"
        },
        {
            "id": 177,
            "name": "Russian Federation"
        },
        {
            "id": 241,
            "name": "Scotland"
        },
        {
            "id": 189,
            "name": "Serbia"
        },
        {
            "id": 194,
            "name": "Slovenia"
        },
        {
            "id": 197,
            "name": "South Africa"
        },
        {
            "id": 199,
            "name": "Spain"
        },
        {
            "id": 205,
            "name": "Sweden"
        },
        {
            "id": 206,
            "name": "Switzerland"
        },
        {
            "id": 207,
            "name": "Syrian Arab Republic"
        },
        {
            "id": 218,
            "name": "Turkey"
        },
        {
            "id": 223,
            "name": "Ukraine"
        },
        {
            "id": 226,
            "name": "United States"
        },
        {
            "id": 242,
            "name": "Wales"
        }
    ],
    "languages": [
        {
            "id": 13,
            "name": "czech"
        },
        {
            "id": 2,
            "name": "english"
        },
        {
            "id": 1,
            "name": "finnish"
        },
        {
            "id": 7,
            "name": "french"
        },
        {
            "id": 5,
            "name": "german"
        },
        {
            "id": 15,
            "name": "greek"
        },
        {
            "id": 10,
            "name": "instrumental"
        },
        {
            "id": 6,
            "name": "italian"
        },
        {
            "id": 8,
            "name": "japanese"
        },
        {
            "id": 12,
            "name": "norwegian"
        },
        {
            "id": 14,
            "name": "polish"
        },
        {
            "id": 11,
            "name": "portuguese"
        },
        {
            "id": 9,
            "name": "russian"
        },
        {
            "id": 4,
            "name": "spanish"
        },
        {
            "id": 3,
            "name": "swedish"
        }
    ],
    "instrument_groups": [
        {
            "id": 1001,
            "name": "Keyboards"
        },
        {
            "id": 1002,
            "name": "Strings"
        },
        {
            "id": 1003,
            "name": "Wind instruments"
        },
        {
            "id": 1004,
            "name": "Percussion"
        },
        {
            "id": 1005,
            "name": "Ensembles"
        }
    ],
    "instruments": [
        {
            "id": 13,
            "name": "Bassoon",
            "group_id": 1003
        },
        {
            "id": 17,
            "name": "Brass quintet",
            "group_id": 1005
        },
        {
            "id": 3,
            "name": "Cello",
            "group_id": 1002
        },
        {
            "id": 4,
            "name": "Clarinet",
            "group_id": 1003
        },
        {
            "id": 6,
            "name": "Flute",
            "group_id": 1003
        },
        {
            "id": 5,
            "name": "Guitar",
            "group_id": 1002
        },
        {
            "id": 9,
            "name": "Harp",
            "group_id": 1002
        },
        {
            "id": 8,
            "name": "Harpsichord",
            "group_id": 1001
        },
        {
            "id": 12,
            "name": "Oboe",
            "group_id": 1003
        },
        {
            "id": 18,
            "name": "Orchestra",
            "group_id": 1005
        },
        {
            "id": 7,
            "name": "Organ",
            "group_id": 1001
        },
        {
            "id": 1,
            "name": "Piano",
            "group_id": 1001
        },
        {
            "id": 14,
            "name": "Piano duo",
            "group_id": 1005
        },
        {
            "id": 15,
            "name": "Piano trio",
            "group_id": 1005
        },
        {
            "id": 16,
            "name": "String quartet",
            "group_id": 1005
        },
        {
            "id": 11,
            "name": "Trumpet",
            "group_id": 1003
        },
        {
            "id": 10,
            "name": "Viola",
            "group_id": 1002
        },
        {
            "id": 2,
            "name": "Violin",
            "group_id": 1002
        }
    ],
    "classical_genres": [
        {
            "id": 12,
            "name": "Ballade"
        },
        {
            "id": 2,
            "name": "Concerto"
        },
        {
            "id": 4,
            "name": "Etude"
        },
        {
            "id": 13,
            "name": "Impromptu"
        },
        {
            "id": 14,
            "name": "Mazurka"
        },
        {
            "id": 5,
            "name": "Nocturne"
        },
        {
            "id": 16,
            "name": "Overture"
        },
        {
            "id": 7,
            "name": "Prelude\/Fugue"
        },
        {
            "id": 1,
            "name": "Sonata"
        },
        {
            "id": 9,
            "name": "String Quartet"
        },
        {
            "id": 6,
            "name": "Suite\/Partita"
        },
        {
            "id": 3,
            "name": "Symphony"
        },
        {
            "id": 10,
            "name": "Toccata"
        },
        {
            "id": 15,
            "name": "Tone\/Symphonic Poem"
        },
        {
            "id": 8,
            "name": "Variations"
        },
        {
            "id": 11,
            "name": "Waltz"
        }
    ]
};