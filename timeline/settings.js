export default {
    template:
    `<div class="settings">
        <div class="playersCount">
            <label for="number-of-players" class="playersCount__label">Number of players</label>
            <input type="number" id="number-of-players"
                v-model="settings.numberOfPlayers"
                class="playersNumber" />
        </div>
        <div class="topics">
            <div v-for="(topic, key) in topics" class="checkbox topic">
                <input type="checkbox" :value="key" :id="key"
                    class="checkbox__input"
                    v-model="settings.topicsList">
                <label :for="key" class="checkbox__appearance">{{ topic.title }}</label>
            </div>
            <button class="button"
                v-on:click="$emit('restart')">
                restart
            </button>
        </div>
    </div>`,
    props: {
        settings: Object,
        topics: Object
    }
}
