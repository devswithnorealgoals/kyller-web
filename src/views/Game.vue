<template>
  <div>
    <pull-to :top-load-method="fetchAndRefresh"
    :top-config="{
      pullText:'rafraîchir',
      doneText:'ok',
      failText:'erreur',
      loadingText:'loading...',
      triggerText: 'loading...'}">
      <div
        v-if="player"
        style="display: flex; 
      flex-direction: column;
      justify-content: space-between; 
      height:90vh;
      padding:5px;"
      >
        <!-- <p>v rafraîchir</p> -->
        <p class="game-name">{{game}}</p>
        <p
          style="text-align:center;"
          class="small-text"
        >{{players.filter((p)=>!p.killed).length}} joueurs restants</p>
        <div v-show="player.killed">
          <p class="big-label">MISSION FAILED</p>
          <p class="small-text">Vous avez été éliminé :(</p>
        </div>
        <div v-show="player.name != player.to_kill && !player.killed">
          <p class="big-label">CIBLE :</p>
          <p class="small-text">{{player.to_kill}}</p>
          <p class="big-label">MISSION</p>
          <p class="small-text">{{player.mission}}</p>
        </div>
        <div v-show="player.name == player.to_kill && !player.killed">
          <p class="big-label">MISSION ACCOMPLISHED</p>
          <p class="small-text">Félicitations, vous êtes notre meilleur espion !</p>
        </div>
        <div class="btns-group">
          <div
            class="btn-kill"
            @click="killed('got_killed')"
            v-show="player.name != player.to_kill && !player.killed"
          >J'ai été kill !</div>
          <div
            class="btn-kill"
            @click="killed('got_counter_killed')"
            v-show="player.name != player.to_kill && !player.killed"
          >J'ai été contre kill !</div>
          <div class="quit-btn" @click="quit">Quitter</div>
        </div>
        <div style="height:10vh"></div>
      </div>
      <p v-show="!player">Loading...</p>
    </pull-to>
    <modal name="who-are-you" height="auto" width="100%" :scrollable="true">
      <template>
        <div>
          <p class="game-name">{{game}}</p>
          <p style="font-family: 'courier'; text-align:center;">Qui êtes-vous ?</p>
          <ul class="players-list">
            <li v-for="player in players" v-bind:key="player.name">
              <div class="btn-player" @click="chose(player)">{{ player.name }}</div>
            </li>
          </ul>
          <p v-if="error">{{error}}</p>
          <div style="display:flex; width:99%; justify-content:center; padding-bottom: 15vh">
            <div class="quit-btn" @click="quit">Quitter</div>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
// import firebase from "firebase";
import PlayersModal from "@/components/PlayersModal.vue";
import axios from "axios";
import PullTo from "vue-pull-to";

export default {
  name: "Game",
  data() {
    return {
      players: [],
      player: null,
      game: "",
      error: null
    };
  },
  components: {
    PlayersModal,
    PullTo
  },
  props: {
    msg: String
  },
  mounted: function() {
    if (!localStorage.getItem("kyllerPlayer")) {
      this.$modal.show("who-are-you");
    }
  },
  created: function() {
    this.fetchAndRefresh()
  },
  methods: {
    show() {
      this.$modal.show("who-are-you");
    },
    hide() {
      this.$modal.hide("who-are-you");
    },
    chose(player) {
      if (player) {
        localStorage.setItem("kyllerPlayer", player.name);
        this.player = player;
        this.$modal.hide("who-are-you");
      }
    },
    refresh(players) {
      this.players = players;
      const playerName = localStorage.getItem("kyllerPlayer");
      if (playerName) {
        this.player = this.players.find(p => p.name === playerName);
        if (!this.player) {
          localStorage.removeItem("kyllerPlayer");
          this.$modal.show("who-are-you");
        }
      }
    },
    fetchAndRefresh(loaded) {
      axios
      .get("http://localhost:5000/api/game/" + this.$route.params.game)
      .then(result => {
        if (loaded) {
          loaded('done')
        }
        if (result.data && result.data.game.name) {
          this.game = result.data.game.name
        }
        this.refresh(result.data.game["players"]);
      });
    },
    quit() {
      localStorage.removeItem("kyllerPlayer");
      this.$router.push("/");
    },
    killed(status) {
      axios
        .post(
          "http://localhost:5000/api/game/" +
            this.$route.params.game +
            "/killed",
          { status, playerName: this.player.name }
        )
        .then(result => {
          if (result.data && result.data.new) {
            this.refresh(result.data.new);
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@font-face {
  font-family: "gunplay";
  src: url("../assets/gunplayrg.ttf") format("truetype");
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.game-name {
  font-size: 2em;
  text-align: center;
  font-family: "courier";
}
.players-list li {
  display: block;
  text-align: center;
  border-bottom: 1px solid grey;
}
.players-list li:first-child {
  border-top: 1px solid grey;
}
.btn-player {
  font-size: 1em;
  font-family: "courier";
  /* color: #494949 !important; */
  /* background: #ffffff; */
  padding: 20px;
}
.big-label {
  text-transform: uppercase;
  font-family: "gunplay";
  font-size: 1.1em;
}
.small-text {
  font-family: "courier";
  font-size: 1em;
}
.quit-btn {
  font-family: "gunplay";
  text-transform: uppercase;
  font-size: 1em;
  margin-top: 1em;
  padding: 10px;
}
.btns-group {
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.btn-kill {
  border: none;
  padding: 10px;
  width: 60vw;
  background: #ffbf00;
  align-self: center;
  font-family: gunplay;
  text-transform: uppercase;
  font-size: 1em;
}
</style>
