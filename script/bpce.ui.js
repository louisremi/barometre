(function( window, App, jQuery, _ ) {

if ( !App.ui ) {
	App.ui = {};
}

var ui = App.ui;

ui.tabs = {
	courant: [ "pouvoir", "conso", "epargne", "consocourante", "immo", "auto", "actu", "apropos" ],
	pouvoir: [ "pouvoir", "conso" ],
	epargne: [ "epargne" ],
	consocourante: [ "consocourante" ],
	immo: ["immo"],
	auto: ["auto"],
	actu: ["actu"],
	apropos: ["apropos"]
};

ui.picClass = {
	"plus":"increase",
	"moins":"decrease",
	"egale":"stable",
	"nsp":"nspp",
	"oui":"yes",
	"non":"no"
};

ui.actuText = {
	"plus":"<b>…augmenter (%)</b>",
	"moins":"<b>…diminuer (%)</b>",
	"egale":"<b>…rester stable (%)</b>",
	"nsp":"ne se prononce pas (%)",
	"oui":"<b>oui</b>",
	"non":"<b>non</b>"
};

// find current month:
// we only have data for last month, and we don't have data for June and July
var now = new Date(),
	usefulDate = new Date( now.getFullYear(), now.getMonth() - ( now.getMonth() == 7 ? 3 : now.getMonth() == 6 ? 2 : 1 ), now.getDate() ),
	currentYear = usefulDate.getFullYear(),
	firstYear = 2011,
	i = 0;

ui.now = usefulDate;

ui.years = [];
ui.lastMonthOfYear = [];
while ( firstYear + i <= currentYear ) {
	ui.years[i] = firstYear + i;
	ui.lastMonthOfYear[i] = 12;
	i++;
}

ui.lastMonthOfYear[ ui.years.length - 1 ] = ui.now.getMonth() + 1;

ui.months = {
	1: [ "Jan.", "Janvier" ],
	2: [ "Fév.", "Février" ],
	3: [ "Mars", "Mars" ],
	4: [ "Avr.", "Avril" ],
	5: [ "Mai", "Mai" ],
	6: [ "Juin", "Juin" ],
	//7: [ "Jul", "Juillet" ],
	8: [ "Août", "Août" ],
	9: [ "Sept.", "Septembre" ],
	10: [ "Oct.", "Octobre" ],
	11: [ "Nov.", "Novembre" ],
	12: [ "Déc.", "Décembre" ]
};

ui.displays = {
	year: "affichage par année",
	month: "affichage par mois",
	evolution: "affichage par évolution"
};

ui.questions = {
	pouvoir: {
		tab: "pouvoir",
		question: "Au cours des trois prochains mois,<br/>votre pouvoir d'achat va-t-il…",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années",
		answers: [{
				className: "increase",
				label: "<b>…augmenter (%)</b>",
				position: [140, 60],
				centered: 0
			}, {
				className: "stable",
				label: "<b>…rester stable (%)</b>",
				position: [140, 100],
				centered: 0
			}, {
				className: "decrease",
				label: "<b>…diminuer (%)</b>",
				position: [60, 60],
				centered: 1
			}, {
				className: "nspp",
				label: "ne se prononce pas (%)",
				position: [140, 20],
				centered: 0
			}
		],
		answerSlugs: [
			"augmenter",
			"egale",
			"descendre",
			"nsp"
		],
		display: {
			month: App.Views.QuestionMonth,
			year: App.Views.QuestionYear,
			evolution: App.Views.QuestionEvolution,
			compare: App.Views.QuestionCompare
		}
	},
	conso: {
		tab: "pouvoir",
		question: "Postes de dépenses les plus préoccupants",
		moreClassName: "all conso-all",
		moreLabel: "Voir l'ensemble des résultats",
		moreHref: "month/pouvoir/:year/:month",
		answers: [{
			label:"L'alimentation",
			position: [60, 30],
			centered: 1
		}, {
			label:"L'essence",
			position: [60, 100],
			centered: 1
		}, {
			label:"Les impôts",
			position: [140, 120],
			centered: 0
		}, {
			label:"L'électricité",
			position: [140, 60],
			centered: 0
		}, {
			label:"La santé",
			position: [140, 10],
			centered: 0
		}, {
			label:"Le gaz"
		}, {
			label:"Le logement"
		}, {
			label:"Les travaux et l'entretien de la maison"
		}, {
			label:"L'achat de la voiture"
		}, {
			label:"L'école"
		}, {
			label:"Autres"
		}, {
			label:"L'habillement"
		}, {
			label:"Les transport en commun"
		}, {
			label:"Aucun"
		}, {
			label:"Les technologies (ordinateur, internet…)"
		}, {
			label:"Ne se prononce pas"
		}],
		answerSlugs: [
			"alim",
			"essence",
			"impot",
			"elec",
			"sante",
			"gaz",
			"logement",
			"entretien",
			"voiture",
			"ecole",
			"autres",
			"habillement",
			"transport",
			"aucun",
			"ordi",
			"nsp"
		],
		display: {
			month: App.views.ConsoQuestionMonthView,
			year: App.Views.QuestionYear,
			evolution: App.Views.QuestionEvolution,
			compare: App.Views.QuestionCompare
		}
	},
	epargne: {
		tab: "epargne",
		question: "Envisagez-vous de…",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années",
		answers: [{
				className: "increase",
				label: "…mettre <b>plus d'argent de côté</b> que ces derniers mois (%)",
				position: [140, 60],
				centered: 0
			}, {
				className: "stable",
				label: "…mettre <b>autant d'argent de côté</b> que ces derniers mois",
				position: [60, 90],
				centered: 1
			}, {
				className: "decrease",
				label: "…mettre <b>moins d'argent de côté</b> que ces derniers mois (%)",
				position: [140, 100],
				centered: 0
			}, {
				className: "irrelevant",
				label: "je ne mets pas d'argent de côté (%)",
				position: [60, 30],
				centered: 1
			}, {
				className: "nspp",
				label: "ne se prononce pas (%)",
				position: [140, 20],
				centered: 0
			}
		],
		answerSlugs: [
			"augmenter",
			"egale",
			"descendre",
			"pasdecote",
			"nsp"
		],
		display: {
			month: App.Views.QuestionMonth,
			year: App.Views.QuestionYear,
			evolution: App.Views.QuestionEvolution,
			compare: App.Views.QuestionCompare
		}
	},
	consocourante: {
		tab: "consocourante",
		question: "Au cours des trois prochains mois, pour l'alimentation ou l'habillement, envisagez vous de…",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années",
		answers: [{
				className: "increase",
				label: "…dépenser <b>plus d'argent</b> que ces derniers mois (%)",
				position: [140, 60],
				centered: 0
			}, {
				className: "stable",
				label: "…dépenser <b>autant d'argent</b> que ces derniers mois",
				position: [60, 60],
				centered: 1
			}, {
				className: "decrease",
				label: "…dépenser <b>moins d'argent</b> que ces derniers mois (%)",
				position: [140, 100],
				centered: 0
			}, {
				className: "nspp",
				label: "ne se prononce pas (%)",
				position: [140, 20],
				centered: 0
			}
		],
		answerSlugs: [
			"augmenter",
			"egale",
			"descendre",
			"nsp"
		],
		display: {
			month: App.Views.QuestionMonth,
			year: App.Views.QuestionYear,
			evolution: App.Views.QuestionEvolution,
			compare: App.Views.QuestionCompare
		}
	},
	immo: {
		tab: "immo",
		question: "Au cours des trois prochains mois, envisagez vous d'acheter<br/>une maison ou un appartement ?",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années",
		noDataLabel: "Sondage réalisé un mois sur deux",
		answers: [{
				className: "yes",
				label: "<b>oui</b>",
				position: [140, 70],
				centered: 0
			}, {
				className: "no",
				label: "<b>non</b>",
				position: [60, 40],
				centered: 1
			}, {
				className: "nspp",
				label: "ne se prononce pas (%)",
				position: [140, 40],
				centered: 0
			}
		],
		answerSlugs: [
			"oui",
			"non",
			"nsp"
		],
		display: {
			month: App.Views.QuestionMonth,
			year: App.Views.QuestionYear,
			evolution: App.Views.QuestionEvolution,
			compare: App.Views.QuestionCompare
		}
	},
	auto: {
		tab: "auto",
		question: "Au cours des trois prochains mois, envisagez vous d'acheter<br/>ou de changer de voiture ?",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années",
		noDataLabel: "Sondage réalisé un mois sur deux",
		answers: [{
				className: "yes",
				label: "<b>oui</b>",
				position: [140, 70],
				centered: 0
			}, {
				className: "no",
				label: "<b>non</b>",
				position: [60, 40],
				centered: 1
			}, {
				className: "nspp",
				label: "ne se prononce pas (%)",
				position: [140, 40],
				centered: 0
			}
		],
		answerSlugs: [
			"oui",
			"non",
			"nsp"
		],
		display: {
			month: App.Views.QuestionMonth,
			year: App.Views.QuestionYear,
			evolution: App.Views.QuestionEvolution,
			compare: App.Views.QuestionCompare
		}
	},
	actu: {
		tab: "actu",
		question: "",
		moreClassName: "",
		answers: new Array(50),
		moreLabel: null,
		display: {
			month: App.Views.QuestionActualite,
			year: $,
			evolution: $,
			compare: $
		}
	},
	apropos: {
		question: "",
		moreClassName: "",
		moreLabel: "",
		display: {
			month: $,
			year: $,
			evolution: $,
			compare: $
		}
	}
};

ui.depenses = {
	alim: {
		label: "l'alimentation",
		icon: "\u202FB"
	},
	essence: {
		label: "l'essence",
		icon: "U"
	},
	impot: {
		label: "les impôts",
		icon: "P"
	},
	elec: {
		label: "l'électricité",
		icon: "H"
	},
	sante: {
		label: "la santé",
		icon: "N"
	},
	gaz: {
		label: "le gaz",
		icon: "K"
	},
	logement: {
		label: "le logement",
		icon: "I"
	},
	entretien: {
		label: "les travaux et l'entretien de la maison",
		icon: "R"
	},
	voiture: {
		label: "l'achat de la voiture",
		icon: "L"
	},
	ecole: {
		label: "l'école",
		icon: "D"
	},
	autres: {
		label: "autres",
		icon: "O"
	},
	habillement: {
		label: "l'habillement",
		icon: "Q"
	},
	transport: {
		label: "les transports en commun",
		icon: "J"
	},
	aucun: {
		label: "aucun",
		icon: "S"
	},
	ordi: {
		label: "les technologies (ordinateur,internet…)",
		icon: "E"
	},
	nsp: {
		label: "ne se prononce pas",
		icon: "T"
	}
};

ui.colors = {
	conso: [
		"#becd43",
		"#b3dddc",
		"#ec7a94",
		"#e7d4e7",
		"#f6a800",
		"#a6a6a6",
		"#a6a6a6",
		"#a6a6a6",
		"#a6a6a6",
		"#a6a6a6",
		"#a6a6a6",
		"#a6a6a6",
		"#a6a6a6",
		"#a6a6a6",
		"#a6a6a6",
		"#a6a6a6"
	],
	actu: [
		"#b8ca36",
		"#a1cdd2",
		"#d37495",
		"#ecd3e6",
		"#e09d26",
		"#a1a0ce",
		"#93c19e",
		"#fff280",
		"#a6a6a6",
		"#a6a6a6",
		"#a6a6a6",
		"#a6a6a6"
	],
	_default: [
		"#427324",
		"#f6a800",
		"#f7c9d6",
		"#afd7d7",
		"#571d74"
	],
	font:[
		"#fff",
		"#000",
		"#000",
		"#000",
		"#fff"
	],
	fontTable: {
		"#427324": "#fff",
		"#f6a800": "#000",
		"#f7c9d6": "#000",
		"#afd7d7": "#000",
		"#571d74": "#fff"
	}
};

ui.transitionDuration = 300;

ui.redirects = {
	"pouvoir/2011/1": "pouvoir/2011/5",
	"pouvoir/2011/2": "pouvoir/2011/5",
	"pouvoir/2011/3": "pouvoir/2011/5",
	"pouvoir/2011/4": "pouvoir/2011/5",

	"epargne/2011/1": "epargne/2011/10",
	"epargne/2011/2": "epargne/2011/10",
	"epargne/2011/3": "epargne/2011/10",
	"epargne/2011/4": "epargne/2011/10",
	"epargne/2011/5": "epargne/2011/10",
	"epargne/2011/6": "epargne/2011/10",
	"epargne/2011/8": "epargne/2011/10",
	"epargne/2011/9": "epargne/2011/10",

	"epargne/2012/6": "epargne/2012/5",

	"consocourante/2011/1": "consocourante/2011/10",
	"consocourante/2011/2": "consocourante/2011/10",
	"consocourante/2011/3": "consocourante/2011/10",
	"consocourante/2011/4": "consocourante/2011/10",
	"consocourante/2011/5": "consocourante/2011/10",
	"consocourante/2011/6": "consocourante/2011/10",
	"consocourante/2011/8": "consocourante/2011/10",
	"consocourante/2011/9": "consocourante/2011/10",

	"consocourante/2012/6": "consocourante/2012/5",

	"immo/2011/1": "immo/2011/11",
	"immo/2011/2": "immo/2011/11",
	"immo/2011/3": "immo/2011/11",
	"immo/2011/4": "immo/2011/11",
	"immo/2011/5": "immo/2011/11",
	"immo/2011/6": "immo/2011/11",
	"immo/2011/7": "immo/2011/11",
	"immo/2011/8": "immo/2011/11",
	"immo/2011/9": "immo/2011/11",
	"immo/2011/10": "immo/2011/11",
	"immo/2011/12": "immo/2011/11",

	"immo/2012/2": "immo/2012/1",
	"immo/2012/4": "immo/2012/3",
	"immo/2012/6": "immo/2012/5",
	"immo/2012/7": "immo/2012/5",
	"immo/2012/8": "immo/2012/5",
	"immo/2012/10": "immo/2012/9",
	"immo/2012/12": "immo/2012/11",

	"immo/2013/2": "immo/2013/1",

	"auto/2011/1": "auto/2011/10",
	"auto/2011/2": "auto/2011/10",
	"auto/2011/3": "auto/2011/10",
	"auto/2011/4": "auto/2011/10",
	"auto/2011/5": "auto/2011/10",
	"auto/2011/6": "auto/2011/10",
	"auto/2011/7": "auto/2011/10",
	"auto/2011/8": "auto/2011/10",
	"auto/2011/9": "auto/2011/10",
	"auto/2011/11": "auto/2011/10",

	"auto/2012/1": "auto/2011/12",
	"auto/2012/3": "auto/2012/2",
	"auto/2012/5": "auto/2012/4",
	"auto/2012/6": "auto/2012/4",
	"auto/2012/7": "auto/2012/4",
	"auto/2012/9": "auto/2012/8",
	"auto/2012/11": "auto/2012/10",

	"auto/2013/1": "auto/2012/12",

	"immo/all/2": "immo/all/1",
	"immo/all/4": "immo/all/3",
	"immo/all/6": "immo/all/5",
	"immo/all/7": "immo/all/5",
	"immo/all/8": "immo/all/5",
	"immo/all/10": "immo/all/9",
	"immo/all/12": "immo/all/11",

	"auto/all/1": "auto/all/2",
	"auto/all/3": "auto/all/4",
	"auto/all/5": "auto/all/4",
	"auto/all/6": "auto/all/4",
	"auto/all/7": "auto/all/4",
	"auto/all/9": "auto/all/8",
	"auto/all/11": "auto/all/10",

	"actu/2012/6": "actu/2012/5"
};

ui.empty = {
	pouvoir: {
		2011: ",1,2,3,4,"
	},
	epargne: {
		2011: ",1,2,3,4,5,6,8,9,",
		2012: ",6,"
	},
	consocourante: {
		2011: ",1,2,3,4,5,6,8,9,",
		2012: ",6,"
	},
	immo: {
		2011: ",5,7,8,9,10,11,12,",
		2012: ",2,4,6,7,8,10,12,",
		2013: ",2,"
	},
	auto: {
		2011: ",6,7,8,9,10,11,12,",
		2012: ",1,3,5,6,7,9,11,",
		2013: ",1,"
	},
	actu: {
		2012: ",6,"
	}
};

})( window, window.App, jQuery, _ );