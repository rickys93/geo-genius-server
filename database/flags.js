const flags = [
    {
        id: 1,
        countryName: "Japan",
        flagFile: "./flag-images/jp.png",
        interestingFact: "This country consists of 6,852 islands",
    },
    {
        id: 2,
        countryName: "Belgium",
        flagFile: "./flag-images/be.png",
        interestingFact:
            "This country produces more than 220,000 tons of chocolate per annum",
    },
    {
        id: 3,
        countryName: "Argentina",
        flagFile: "./flag-images/ar.png",
        interestingFact:
            "This country is home to both the highest and lowest points of the Southern Hemisphere",
    },
    {
        id: 4,
        countryName: "Chile",
        flagFile: "./flag-images/cl.png",
        interestingFact:
            "The northern part of this country is home to the driest desert in the world, Atacama",
    },
    {
        id: 5,
        countryName: "Norway",
        flagFile: "./flag-images/no.png",
        interestingFact: "This country introduced salmon sushi to Japan",
    },
    {
        id: 6,
        countryName: "Somalia",
        flagFile: "./flag-images/so.png",
        interestingFact: "This country has the longest coastline in mainland Africa",
    },
    {
        id: 7,
        countryName: "Vietnam",
        flagFile: "./flag-images/vn.png",
        interestingFact: "This country has the world's largest cave",
    },
    {
        id: 8,
        countryName: "Turkey",
        flagFile: "./flag-images/tr.png",
        interestingFact: "The story of Santa Claus originated in this country",
    },
    {
        id: 9,
        countryName: "Sweden",
        flagFile: "./flag-images/se.png",
        interestingFact: "More than half of this country is covered in forest",
    },
    {
        id: 10,
        countryName: "Poland",
        flagFile: "./flag-images/pl.png",
        interestingFact:
            "In this country, everyone has a special holiday for their name",
    },
    {
        id: 11,
        countryName: "New Zealand",
        flagFile: "./flag-images/nz.png",
        interestingFact:
            "There are five sheep for every resident in this country",
    },
    {
        id: 12,
        countryName: "Mexico",
        flagFile: "./flag-images/mx.png",
        interestingFact: "69 different languages are spoken in this country.",
    },
    {
        id: 13,
        countryName: "South Korea",
        flagFile: "./flag-images/kr.png",
        interestingFact: "In this country, babies are one year old when born",
    },
    {
        id: 14,
        countryName: "Jamaica",
        flagFile: "./flag-images/jm.png",
        interestingFact: "This country produces the most music per capita. ",
    },
    {
        id: 15,
        countryName: "India",
        flagFile: "./flag-images/in.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 16,
        countryName: "Austria",
        flagFile: "./flag-images/at.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 17,
        countryName: "Australia",
        flagFile: "./flag-images/au.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 18,
        countryName: "Bangladesh",
        flagFile: "./flag-images/bd.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 19,
        countryName: "Bolivia",
        flagFile: "./flag-images/bo.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 20,
        countryName: "Canada",
        flagFile: "./flag-images/ca.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 21,
        countryName: "China",
        flagFile: "./flag-images/cn.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 22,
        countryName: "Cuba",
        flagFile: "./flag-images/cu.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 23,
        countryName: "Egypt",
        flagFile: "./flag-images/eg.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 24,
        countryName: "Ethiopia",
        flagFile: "./flag-images/et.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 25,
        countryName: "France",
        flagFile: "./flag-images/fr.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 26,
        countryName: "Germany",
        flagFile: "./flag-images/de.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 27,
        countryName: "Greece",
        flagFile: "./flag-images/gr.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 28,
        countryName: "Italy",
        flagFile: "./flag-images/it.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 29,
        countryName: "India",
        flagFile: "./flag-images/in.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 30,
        countryName: "Israel",
        flagFile: "./flag-images/il.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 31,
        countryName: "Kenya",
        flagFile: "./flag-images/ke.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 32,
        countryName: "Kazakhstan",
        flagFile: "./flag-images/kz.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 33,
        countryName: "Malaysia",
        flagFile: "./flag-images/my.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 34,
        countryName: "Nigeria",
        flagFile: "./flag-images/ng.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 35,
        countryName: "Netherlands",
        flagFile: "./flag-images/nl.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 36,
        countryName: "Portugal",
        flagFile: "./flag-images/pt.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 37,
        countryName: "Seychelles",
        flagFile: "./flag-images/sc.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 38,
        countryName: "Ukraine",
        flagFile: "./flag-images/ua.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 39,
        countryName: "Yemen",
        flagFile: "./flag-images/ye.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
    {
        id: 40,
        countryName: "Syria",
        flagFile: "./flag-images/sy.png",
        interestingFact: "This country is the wettest inhabited place on Earth.",
    },
];

module.exports = flags;
