export default {
    template:
    `<div class="modal">
        <div class="veil"></div>
        <div class="popup">
            <ul class="cardBox">
                <li v-for="card in correctplacementcards" class="card card_played" :class="{ card_wrong: card.id === selectedcard.id }">
                    <span class="card__title">{{ card.title }}</span>
                    <span class="card__year">{{ card.year }}</span>
                </li>
            </ul>

            <button class="button popup__button" v-on:click="$emit('handleok')">ok</button>
        </div>
    </div>`,
    props: {
        selectedcard: Object,
        correctplacementcards: Array
    }
}
