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

// find current month:
// we only have data for last month, and we don't have data for June and July
var now = new Date(),
	usefulDate = new Date( now.getFullYear(), now.getMonth() - ( now.getMonth() == 7 ? 3 : now.getMonth() == 6 ? 2 : 1 ), now.getDate() ),
	currentYear = usefulDate.getFullYear(),
	i = 3;

ui.now = usefulDate;

ui.years = [];
while ( i-- ) {
	ui.years[2 - i] = currentYear--;
}

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
		question: "Au cours des trois prochains mois, votre pouvoir d'achat va-t-il…",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années"
	},
	conso: {
		question: "Postes de dépenses les plus préoccupants",
		moreClassName: "all",
		moreLabel: "Voir l'ensemble des résultats"
	},
	epargne: {
		question: "Envisagez-vous de…",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années"
	},
	consocourante: {
		question: "Au cours des trois prochains mois, pour l'alimentation ou l'habillement, envisagez vous de…",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années"
	},
	immo: {
		question: "Au cours des trois prochains mois, envisagez vous d'acheter une maison ou un appartement ?",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années"
	},
	automobile: {
		question: "Au cours des trois prochains mois, envisagez vous d'acheter ou de changer de voiture ?",
		moreClassName: "compare",
		moreLabel: "Comparer ce même mois sur les autres années"
	},
	actualite: {
		question: "",
		moreClassName: "",
		moreLabel: "Voir la question précédente"
	}
};

ui.colors = [
	"#427324",
	"#f6a800",
	"#f7c9d6",
	"#afd7d7",
	"#571d74"
];

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
};

ui.draw = function() {

};

/*

var data = {};

// find current month:
// we only have data for last month, and we don't have data for June and July
var now = new Date,
	usefulDate = new Date( now.getFullYear(), now.getMonth() - ( now.getMonth() == 7 ? 3 : now.getMonth() == 6 ? 2 : 1 ), now.getDate() ),
	currentYear = usefulDate.getFullYear(),
	i = 3;

data.years = {};
while ( i-- ) {
	data.years[ currentYear-- ] = {
		className: i == 2 ? "active" : "",
		url: ""
	};
}

data.activeTab

data.colors = [
	"#427324",
	"#f6a800",
	"#f7c9d6",
	"#afd7d7",
	"#571d74"
];

data.tabs = {
	courant: [ "pouvoir", "conso", "epargne", "immo", "auto", "actu" ],
	pouvoir: [ "pouvoir", "conso" ],
	epargne: [ "epargne" ],
	immo: ["immo"],
	auto: ["auto"],
	actu: ["actu"]
};

var display = data.displays = {};

displays.month = [{
	id: "pouvoir",
	answers: [{
		id: "augmenter",
		title: "<b>…augmenter (%)</b>",
		background: "#427324"
	}, {
		id: "stable",
		title: "<b>…rester stable (%)</b>",
		background: "#f6a800"
	}, {
		id: "diminuer",
		title: "<b>…diminuer (%)</b>",
		background: "#f7c9d6"
	}, {
		id: "nsp",
		title: "…ne se prononce pas (%)",
		background: "#571d74"
	}]
//}, {
//	id: "conso",
//	answers: [
//	}]
}, {
	id: "epargne",
	answers: [{
		id: "augmenter",
		title: "mettre <b>plus d'argent de côté</b> que ces derniers mois (%)",
		background: "#427324"
	}, {
		id: "stable",
		title: "mettre <b>autant d'argent de côté</b> que ces derniers mois",
		background: "#f6a800"
	}, {
		id: "diminuer",
		title: "mettre <b>moins d'argent de côté</b> que ces derniers mois (%)",
		background: "#f7c9d6"
	}, {
		id: "non",
		title: "je ne met pas d'argent de côté (%)",
		background: "#afd7d7"
	}, {
		id: "nsp",
		title: "…ne se prononce pas (%)",
		background: "#571d74"
	}]
}, {
	id: "immo",
	answers: [{
		id: "oui",
		title: "<b>oui</b>",
		background: "#427324"
	}, {
		id: "non",
		title: "<b>non</b>",
		background: "#f6a800"
	}, {
		id: "nsp",
		title: "…ne se prononce pas (%)",
		background: "#571d74"
	}]
}, {
	id: "auto",
	answers: [{
		id: "oui",
		title: "<b>oui</b>",
		background: "#427324"
	}, {
		id: "non",
		title: "<b>non</b>",
		background: "#f6a800"
	}, {
		id: "nsp",
		title: "…ne se prononce pas (%)",
		background: "#571d74"
	}]
}];

App.data = data;*/

})( window, window.App, jQuery, _ );