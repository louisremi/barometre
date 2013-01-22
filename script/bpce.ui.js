(function( window, App, jQuery, _ ) {

var ui = App.ui = {};

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
	"non":"no",
};

ui.actuText = {
	"plus":"<b>…augmenter (%)</b>",
	"moins":"<b>…diminuer (%)</b>",
	"egale":"<b>…rester stable (%)</b>",
	"nsp":"…ne se prononce pas (%)",
	"oui":"<b>oui</b>",
	"non":"<b>non</b>",
}

// find current month:
// we only have data for last month, and we don't have data for June and July
var now = new Date(),
	usefulDate = new Date( now.getFullYear(), now.getMonth() - ( now.getMonth() == 7 ? 3 : now.getMonth() == 6 ? 2 : 1 ), now.getDate() ),
	currentYear = usefulDate.getFullYear(),
	i = 3;

ui.now = usefulDate;

/* Franck doesn't want smart dates
ui.years = [];
while ( i-- ) {
	ui.years[2 - i] = currentYear--;
}*/
// be stupid and hard code it
ui.years = [2013, 2012, 2011];

ui.months = {
	1: [ "Jan", "Janvier" ],
	2: [ "Fev", "Février" ],
	3: [ "Mar", "Mars" ],
	4: [ "Avr", "Avril" ],
	5: [ "Mai", "Mai" ],
	//5: [ "Jun", "Juin" ],
	//6: [ "Jul", "Juillet" ],
	8: [ "Aou", "Août" ],
	9: [ "Sep", "Septembre" ],
	10: [ "Oct", "Octobre" ],
	11: [ "Nov", "Novembre" ],
	12: [ "Dec", "Décembre" ]
};

ui.displays = {
	year: "affichage par année",
	month: "affichage par mois",
	evolution: "affichage par évolution" 
};

ui.questions = {
	pouvoir: {
		tab: "pouvoir",
		question: "Au cours des trois prochains mois, votre pouvoir d'achat va-t-il…",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années",
		answers: [{
				className: "increase",
				label: "<b>…augmenter (%)</b>"
			}, {
				className: "stable",
				label: "<b>…rester stable (%)</b>"
			}, {
				className: "decrease",
				label: "<b>…diminuer (%)</b>"
			}, {
				className: "nspp",
				label: "…ne se prononce pas (%)"
			}
		],
		answerSlugs: [
			"augmenter",
			"egale",
			"descendre",
			"nsp",
		],
		display: {
			month: App.Views.QuestionMonth,
			year: App.Views.QuestionYear,
			evolution: App.Views.QuestionEvolution
		}
	},
	conso: {
		tab: "pouvoir",
		question: "Postes de dépenses les plus préoccupants",
		moreClassName: "all conso-all",
		moreLabel: "Voir l'ensemble des résultats",
		/*answerSlug: [
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
		],*/
		display: {
			month: App.views.ConsoQuestionMonthView,
			year: App.views.ConsoQuestionYearView,
			evolution: $//App.Views.QuestionEvolution,
		}
	},
	epargne: {
		tab: "epargne",
		question: "Envisagez-vous de…",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années",
		answers: [{
				className: "increase",
				label: "mettre <b>plus d'argent de côté</b> que ces derniers mois (%)"
			}, {
				className: "stable",
				label: "mettre <b>autant d'argent de côté</b> que ces derniers mois"
			}, {
				className: "decrease",
				label: "mettre <b>moins d'argent de côté</b> que ces derniers mois (%)"
			}, {
				className: "irrelevant",
				label: "je ne met pas d'argent de côté (%)"
			}, {
				className: "nspp",
				label: "…ne se prononce pas (%)"
			}
		],
		answerSlugs: [
			"augmenter",
			"egale",
			"descendre",
			"pasdecote",
			"nsp",
		],
		display: {
			month: App.Views.QuestionMonth,
			year: App.Views.QuestionYear,
			evolution: App.Views.QuestionEvolution
		}
	},
	consocourante: {
		tab: "consocourante",
		question: "Au cours des trois prochains mois, pour l'alimentation ou l'habillement, envisagez vous de…",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années",
		answers: [{
				className: "increase",
				label: "dépenser <b>plus d'argent</b> que ces derniers mois (%)"
			}, {
				className: "stable",
				label: "dépenser <b>autant d'argent</b> que ces derniers mois"
			}, {
				className: "decrease",
				label: "dépenser <b>moins d'argent</b> que ces derniers mois (%)"
			}, {
				className: "nspp",
				label: "…ne se prononce pas (%)"
			}
		],
		answerSlugs: [
			"augmenter",
			"egale",
			"descendre",
			"nsp",
		],
		display: {
			month: App.Views.QuestionMonth,
			year: App.Views.QuestionYear,
			evolution: App.Views.QuestionEvolution
		}
	},
	immo: {
		tab: "immo",
		question: "Au cours des trois prochains mois, envisagez vous d'acheter une maison ou un appartement ?",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années",
		answers: [{
				className: "yes",
				label: "<b>oui</b>"
			}, {
				className: "no",
				label: "<b>non</b>"
			}, {
				className: "nspp",
				label: "…ne se prononce pas (%)"
			}
		],
		answerSlugs: [
			"oui",
			"non",
			"nsp",
		],
		display: {
			month: App.Views.QuestionMonth,
			year: App.Views.QuestionYear,
			evolution: App.Views.QuestionEvolution
		}
	},
	auto: {
		tab: "auto",
		question: "Au cours des trois prochains mois, envisagez vous d'acheter ou de changer de voiture ?",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années",
		answers: [{
				className: "yes",
				label: "<b>oui</b>"
			}, {
				className: "no",
				label: "<b>non	</b>"
			}, {
				className: "nspp",
				label: "…ne se prononce pas (%)"
			}
		],
		answerSlugs: [
			"oui",
			"non",
			"nsp",
		],
		display: {
			month: App.Views.QuestionMonth,
			year: App.Views.QuestionYear,
			evolution: App.Views.QuestionEvolution
		}
	},
	actu: {
		tab: "actu",
		question: "",
		moreClassName: "",
		answersMaxLength: 5,
		moreLabel: "Voir la question précédente",
		display: {
			month: App.views.ActualiteQuestionMonthView,
			year: App.views.ActualiteQuestionYearView,
			evolution: $
		}
	},
	apropos: {
		question: "",
		moreClassName: "",
		moreLabel: "",
		display: {
			month: App.views.AproposView,
			year: App.views.AproposView,
			evolution: $
		}
	}
};

ui.colors = [
	"#427324",
	"#f6a800",
	"#f7c9d6",
	"#afd7d7",
	"#571d74"
];

ui.transitionDuration = 300;

ui.initialize = function() {
	var commonData = {
		years: ui.years,
		months: ui.months
	};

	$(".question").each(function() {
		var questionSlug = this.id.split("-")[1],
			data = $.extend({}, commonData, ui.questions[ questionSlug ] );

		$(this).html( ( _.template( $("#question-template").html() ) )( data ) );
	});

	$("#years-style")[0].styleSheet ?
		$("#years-style")[0].styleSheet.cssText = ( _.template( $("#years-style-template").html() ) )( { years: ui.years } ) :
		$("#years-style").html( ( _.template( $("#years-style-template").html() ) )( { years: ui.years } ) );
};

})( window, window.App, jQuery, _ );