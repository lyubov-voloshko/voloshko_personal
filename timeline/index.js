import artHistory from "./cards/art.js"
import generalHistoryCards from "./cards/general-history.js";
import scienceCards from "./cards/science.js";

var app = new Vue({
    el: '#app',
    data: {
        cards: shuffle(generalHistoryCards),
        selectedCard: {},
        selectedCardIndex: Number,
        playedCards: [],
        playersCards: [],
        packCards: [],
        topicsList: ['general-history'],
        topics: {
            'general-history': {
                title: 'general history',
                cards: generalHistoryCards
            },
            'art':{
                title: 'art',
                cards: artHistory
            },
            'science': {
                title: 'science',
                cards: scienceCards
            }
        }
    },
    methods: {
        selectCard: function(card, index) {
            this.selectedCard = card;
            this.selectedCardIndex = index;
        },
        removeCardFromPlayersCards() {
            let currentPlayersCard = [...this.playersCards];
            currentPlayersCard.splice(this.selectedCardIndex, 1)
            this.playersCards = currentPlayersCard;
        },
        addCardFromPlayersCards() {
            if (this.packCards.length) {
                let currentPlayersCard = [...this.playersCards];
                currentPlayersCard.push(this.packCards[0])
                this.playersCards = currentPlayersCard;
                this.packCards.splice(0, 1);
            }
        },
        addCardIntoPlayedCards(index) {
            let currentPlayedCard = [...this.playedCards];
            currentPlayedCard.splice(index, 0, this.selectedCard)
            this.playedCards = currentPlayedCard;
        },
        putCard: function(card, index) {
            if (index === -1 && card.year > this.selectedCard.year) {
                this.addCardIntoPlayedCards(index + 1);
                this.removeCardFromPlayersCards();
            } else if (index === this.playedCards.length - 1 && this.playedCards[index].year < this.selectedCard.year) {
                this.addCardIntoPlayedCards(index + 1);
                this.removeCardFromPlayersCards();
            } else if (index !== -1 && this.playedCards[index].year < this.selectedCard.year && this.playedCards[index+1].year > this.selectedCard.year) {
                this.addCardIntoPlayedCards(index + 1);
                this.removeCardFromPlayersCards();
            } else {
                console.log('error');
                this.removeCardFromPlayersCards();
                this.addCardFromPlayersCards();
            }
        },
        handOverCards: function(n) {
            this.cards = shuffle(this.cards);
            this.playedCards = this.cards.slice(0, 1);
            this.playersCards = this.cards.slice(1, 7);
            this.packCards = this.cards.slice(8, n);
        },

        restart: function() {
            this.cards = []
            this.topicsList.forEach(topicName => this.cards = [...this.cards, ...this.topics[topicName].cards]);
            this.handOverCards(this.cards.length);
            console.log(this.cards.length);
        }
    },
    beforeMount() {
        this.handOverCards(20);
    }
})

function shuffle(array) {
    const length = array == null ? 0 : array.length
    if (!length) {
      return []
    }
    let index = -1
    const lastIndex = length - 1
    const result = copyArray(array)
    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
      const value = result[rand]
      result[rand] = result[index]
      result[index] = value
    }
    return result
}

function copyArray(source, array) {
    let index = -1
    const length = source.length

    array || (array = new Array(length))
    while (++index < length) {
      array[index] = source[index]
    }
    return array
  }