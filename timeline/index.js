import artHistory from "./cards/art.js";
import errorPopup from "./errorPopup.js";
import generalHistoryCards from "./cards/general-history.js";
import scienceCards from "./cards/science.js";
import settings from "./settings.js";
import shuffle from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/_shuffleSelf.js"

var app = new Vue({
    el: '#app',
    components: {
        'error-popup': errorPopup,
        'settings': settings
    },
    data: {
        cards: shuffle(generalHistoryCards),
        selectedCard: {},
        selectedCardIndex: Number,
        playedCards: [],
        playersCards: Object,
        currentPlayerIndex: 0,
        newPlayerIndex: 1,
        currentPlayer: 'player0',
        packCards: [],
        playersOrder: ['player0'],
        numberOfPlayers: 1,
        settings: {
            playersList: { player0: '' },
            topicsList: ['general-history'],
        },
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
        },
        error: false,
        correctPlacementCards: [],
        settingsShown: false,
        endOfGame: false
    },
    methods: {
        selectCard: function(card, index) {
            this.selectedCard = card;
            this.selectedCardIndex = index;
        },
        removeCardFromPlayersCards() {
            let currentPlayersCards = [...this.playersCards[this.currentPlayer]];
            currentPlayersCards.splice(this.selectedCardIndex, 1)
            this.playersCards[this.currentPlayer] = currentPlayersCards;
        },
        addCardToPlayersCards() {
            if (this.packCards.length) {
                let currentPlayersCards = [...this.playersCards[this.currentPlayer]];
                currentPlayersCards.push(this.packCards[0])
                this.playersCards[this.currentPlayer] = currentPlayersCards;
                this.packCards.splice(0, 1);
            }
        },
        addCardIntoPlayedCards(index) {
            let currentPlayedCards = [...this.playedCards];
            currentPlayedCards.splice(index, 0, this.selectedCard)
            this.playedCards = currentPlayedCards;
        },
        handOverPlayersCards() {
            const initialNumberOfPlayersCards = this.numberOfPlayers * 4;
            let playersCards = this.cards.slice(1, initialNumberOfPlayersCards + 1);
            var splittedPlayersCards = {};
            for (var i = 0; i < this.numberOfPlayers; i++) {
                splittedPlayersCards[this.playersOrder[i]] = playersCards.slice(i * 4, i * 4 + 4);
            }
            this.playersCards = {...splittedPlayersCards};
        },
        putCard: function(card, index) {
            if (index === -1 && card.year > this.selectedCard.year) {
                this.addCardIntoPlayedCards(index + 1);
                this.removeCardFromPlayersCards();
                if (this.playersCards[this.currentPlayer].length === 0) this.endOfGame = true;
                this.selectedCard = {};
            } else if (index === this.playedCards.length - 1 && this.playedCards[index].year < this.selectedCard.year) {
                this.addCardIntoPlayedCards(index + 1);
                this.removeCardFromPlayersCards();
                if (this.playersCards[this.currentPlayer].length === 0) this.endOfGame = true;
                this.selectedCard = {};
            } else if (index !== -1 && this.playedCards[index].year < this.selectedCard.year && this.playedCards[index+1].year > this.selectedCard.year) {
                this.addCardIntoPlayedCards(index + 1);
                this.removeCardFromPlayersCards();
                if (this.playersCards[this.currentPlayer].length === 0) this.endOfGame = true;
                this.selectedCard = {};
            } else {
                console.log('error');
                this.error = true;
                const rightCard = this.playedCards.find(card => card.year > this.selectedCard.year);
                if (rightCard) {
                    const rightCardIndex = this.playedCards.findIndex(card => card.year > this.selectedCard.year);
                    if (rightCardIndex === 0) {
                        this.correctPlacementCards = [this.selectedCard, this.playedCards[0]]
                    } else {
                        const leftCard = this.playedCards[rightCardIndex - 1];
                        this.correctPlacementCards = [leftCard, this.selectedCard, rightCard];
                    }
                } else {
                    this.correctPlacementCards = [this.playedCards[this.playedCards.length - 1], this.selectedCard];
                }
            }
            if (!this.error && this.playersCards[this.currentPlayer].length !== 0) this.shiftThePlayer();
        },
        giveNewCard: function() {
            this.removeCardFromPlayersCards();
            this.addCardToPlayersCards();
            this.error = false;
            this.shiftThePlayer();
            this.selectedCard = {};
        },
        shiftThePlayer: function() {
            if (this.currentPlayerIndex === this.numberOfPlayers - 1) {
                this.currentPlayerIndex = 0
            } else {
                ++this.currentPlayerIndex;
            }
            this.currentPlayer = this.playersOrder[this.currentPlayerIndex];
            console.log(this.currentPlayer);
        },
        handOverCards: function(n) {
            this.cards = shuffle(this.cards);
            this.playedCards = this.cards.slice(0, 1);
            this.handOverPlayersCards();
            this.packCards = this.cards.slice((this.numberOfPlayers * 4) + 1, n);
        },

        showSettings: function() {
            this.settingsShown = true;
        },
        hideSettings: function() {
            this.settingsShown = false;
        },
        restart: function(updatedSettings, updatedNewPlayerIndex, updatedNumberOfPlayers,updatedPlayersOrder) {
            this.cards = [];

            this.settings = {...updatedSettings};
            this.newPlayerIndex = updatedNewPlayerIndex;
            this.numberOfPlayers = updatedNumberOfPlayers;
            this.playersOrder = [...updatedPlayersOrder];

            this.settings.topicsList.forEach(topicName => this.cards = [...this.cards, ...this.topics[topicName].cards]);
            this.handOverCards(this.cards.length);
            this.selectedCard = {};
            this.currentPlayerIndex = 0;
            this.currentPlayer = this.playersOrder[0];
            this.settingsShown = false;
            this.endOfGame = false;
        },
    },
    beforeMount() {
        this.handOverCards(20);
    }
})

// function shuffle(array) {
//     const length = array == null ? 0 : array.length
//     if (!length) {
//       return []
//     }
//     let index = -1
//     const lastIndex = length - 1
//     const result = copyArray(array)
//     while (++index < length) {
//       const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
//       const value = result[rand]
//       result[rand] = result[index]
//       result[index] = value
//     }
//     return result
// }

// function copyArray(source, array) {
//     let index = -1
//     const length = source.length

//     array || (array = new Array(length))
//     while (++index < length) {
//       array[index] = source[index]
//     }
//     return array
// }