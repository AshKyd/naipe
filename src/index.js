var Random = require('random-js');
var msrand = require('./msrand');

var Deck = function(opts){
    // Initialise these here or they're staaaatttiiiiccc!
    this.decks = [];
    this.cards = [];
    this.currentCard = 0;

    var _this = this;
    Object.keys(opts||{}).forEach(function(item, key){
        _this[key] = item;
    });

    this.configureDeck();

    // Default 1 million games.
    this.setSeed(this.seed || Math.random()*1e6);
}

Deck.prototype = {
    defaults : {
        deckCount : 1,
        jokers : false,
        suits : [0,1,2,3],
        seed : 0
    },

    keys : {
        suits : ['Clubs','Diamonds','Hearts','Spades'],
        cards : ['Joker','Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King']
    },

    configureDeck : function(){
        for(var i=0; i < this.deckCount; i++){
            this.addDeck();
        }
    },

    addDeck : function(){
        var newDeck = [];
        var newCard = false;
        var suitNum = false;

        var jokers = this.jokers;
        var suits = this.suits;

        for(var card=0; card<this.keys.cards.length; card++){

            // Skip Jokers
            if(card == 0 && !jokers){
                continue;
            }

            for(var suit=0; suit <= suits.length-1; suit++){
                suitNum = suits[suit];

                // Create and distribute the card.
                newCard = new Card({
                    number : card,
                    numberName : this.keys.cards[card],
                    suitNum : suitNum,
                    suitName : this.keys.suits[suitNum],
                    visibility: false
                });

                newDeck.push(newCard);
                this.cards.push(newCard);
            }
        }
        this.decks.push(newDeck);
    },

    shuffle : function(){
       if(this.msCompat){
           // MS compatible shuffle algorithm.
           if(this.cards.length){
               var i = this.cards.length;
               while(i--) {
                   var j = this.msrand.msMaxRand(i+1);
                   var tmp = this.cards[i];
                   this.cards[i] = this.cards[j];
                   this.cards[j] = tmp;
               }
           }
           this.cards.reverse();
       } else {
           var newCards = [];

           while(this.cards.length){
               var j = Math.round(this.srand()*(this.cards.length-1));
               newCards.push(this.cards.splice(j,1));
           }
           this.cards = newCards;
       }
    },

    next : function(){
        if(typeof this.cards[this.currentCard] != 'undefined'){
            return this.cards[this.currentCard++];
        }
        return false;
    },

    setSeed: function(seed){
        this.seed = seed;
        this.rand = new Random.engines.mt19937();
        this.rand.seed(this.seed);
        this.msrand = new msrand(this.seed);
    }
};

var Card = function(opts){
    var _this = this;
    Object.keys(opts).forEach(function(item, key){
        _this[key] = item;
    });
};

module.exports = {
    Deck: Deck,
    Card: Card
}
