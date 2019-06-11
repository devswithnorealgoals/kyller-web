<template>
  <div>
    <div v-if="player">
      <p style="text-align:center;">{{game}}</p>
      <p style="text-align:center;">{{players.filter((p)=>!p.killed).length}} joueurs restants</p>
      <div v-show="player.killed">
        Vous avez perdu :(
      </div>
      <div v-show="player.name != player.to_kill && !player.killed">
        <p>{{player.name}}</p>
        <p>{{player.mission}}</p>
        <p>{{player.to_kill}}</p>
      </div>
      <div v-show="player.name == player.to_kill && !player.killed">
        <p>Vous avez gagné !</p>
      </div>
      <button @click="killed('killed')"> J'ai kill !</button>
      <button @click="quit">Quitter</button>
    </div>
    <p v-show="!player">Loading...</p>
    <modal name="hello-world" height="100%" width="100%">
        <template>
            <div>
                <p style="text-align:center;">{{game}}</p>
                <ul id="example-1">
                <li v-for="player in players" v-bind:key="player.name">
                  <button @click="chose(player)">{{ player.name }}</button>
                </li>
                </ul>
            </div>
        </template>
    </modal>
  </div>
</template>

<script>
import firebase from "firebase"
import PlayersModal from "@/components/PlayersModal.vue"
import axios from "axios"

export default {
  name: "Game",
  data() {
      return {
          players: [],
          player: null,
          game: ''
      }
  },
  components: {
      PlayersModal
  },
  props: {
    msg: String
  },
  mounted: function() {
    if (!localStorage.getItem("kyllerPlayer")) {
      this.$modal.show("hello-world")
    }
  },
  created: function() {
      var db = firebase.firestore();
      db.collection("games").doc(this.$route.params.game).onSnapshot((doc)  => {
        console.log("Current data: ", doc.data()["players"])
        this.players = doc.data()["players"]
        this.game = doc.data()["name"]
        const playerName = localStorage.getItem("kyllerPlayer")
        if (playerName) {
        this.player = this.players.find((p) => p.name === playerName)
      }
    });
  },
  methods: {
    show() {
        this.$modal.show("hello-world")
    },
    hide() {
        this.$modal.hide("hello-world")
    },
    chose(player) {
      if (player) {
        localStorage.setItem("kyllerPlayer", player.name)
        this.player = player
        this.$modal.hide("hello-world")
      }
    },
    quit() {
      localStorage.removeItem("kyllerPlayer")
      this.$router.push("/")
    },
    killed(status) {
      var killedFunction = firebase.functions().httpsCallable("killed")
      killedFunction({
        gameId: this.$route.params.game,
        playerName: this.player.name,
        status: status
      }).then(function(ok) {
        console.log(ok)
      }, function(error) {
        console.log(error)
      })
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
