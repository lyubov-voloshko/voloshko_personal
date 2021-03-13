const html = String.raw;
export default {
    template:
    html`<div class="modal">
        <div class="veil" v-on:click="$emit('close')"></div>
        <div class="popup">
            <div class="popup__header">
                <button class="iconButton popup__closeButton"
                    v-on:click="$emit('close')">×</button>
                <h1 class="popup__title">Settings</h1>
            </div>
            <div class="settings">
                <div class="playersCount__header">
                    <h2 class="popup__subtitle">Players</h2>
                    <button type="button" class="button button_outlined" v-on:click="addPlayer()">+ add player</button>
                </div>

                <ol class="playersList">
                    <li v-for="(player, key, index) in updatedSettings.playersList"
                        :key="'input-' + key">
                        <div class="playerItem">
                            <span>player</span>
                            <input type="text"
                                class="textField"
                                :placeholder="key"
                                v-model="updatedSettings.playersList[key]">
                            <button type="button" v-if="Object.keys(updatedSettings.playersList).length !== 1"
                                class="iconButton playerItem__deleteButton"
                                v-on:click="removePlayer(key)">×</button>
                        </div>
                    </li>
                </ol>

                <h2 class="popup__subtitle">Topics</h2>
                <ul class="topics">
                    <li v-for="(topic, key) in topics" :key="key" class="topic">
                        <div class="checkbox">
                            <input type="checkbox" :value="key" :id="key"
                                class="checkbox__input"
                                v-model="updatedSettings.topicsList">
                            <label :for="key" class="checkbox__appearance">{{ topic.title }}</label>
                        </div>
                    </li>
                </ul>

            </div>
            <button class="button button_solid"
                v-on:click="$emit('restart', updatedSettings, updatedNewPlayerIndex, updatedNumberOfPlayers,updatedPlayersOrder)">
                restart
            </button>
        </div>
    </div>`,
    props: {
        settings: Object,
        topics: Object,
        newplayerindex: Number,
        numberofplayers: Number,
        playersorder: Array
    },
    data: function() {
        return {
            updatedSettings: JSON.parse(JSON.stringify(this.settings)),
            updatedNewPlayerIndex: this.newplayerindex,
            updatedNumberOfPlayers: this.numberofplayers,
            updatedPlayersOrder: [...this.playersorder]
        }
    },
    methods: {
        addPlayer: function() {
            const newPlayerId = `player${this.updatedNewPlayerIndex}`;
            this.updatedPlayersOrder.push(newPlayerId);
            ++this.updatedNumberOfPlayers;
            ++this.updatedNewPlayerIndex;
            this.$set(this.updatedSettings.playersList, newPlayerId, '');
        },
        removePlayer: function(player) {
            this.updatedPlayersOrder.splice(this.updatedPlayersOrder.indexOf(player), 1);
            this.$delete(this.updatedSettings.playersList, player);
            --this.updatedNumberOfPlayers;
        }
    }
}
