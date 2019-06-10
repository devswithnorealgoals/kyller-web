<template>
  <div>
    <div v-if="player">
      <p>{{player.name}}</p>
      <p>{{player.mission}}</p>
      <p>{{player.to_kill}}</p>
      <button @click="killed('killed')"> J'ai kill !</button>
      <button @click="quit">Quitter</button>
    </div>
    <p v-show="!player">Loading...</p>
    <modal name="hello-world" height="100%" width="100%">
        <template>
            <div>
                <p style="text-align:center;">dzaij</p>
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
import firebase from 'firebase'
import PlayersModal from '@/components/PlayersModal.vue'
import axios from 'axios'

export default {
  name: 'Game',
  data() {
      return {
          players: [],
          player: null
      }
  },
  components: {
      PlayersModal
  },
  props: {
    msg: String
  },
  mounted: function() {
    if (!localStorage.getItem('kyllerPlayer')) {
      this.$modal.show('hello-world')
    }
  },
  created: function() {
      var db = firebase.firestore();
      db.collection("games").doc(this.$route.params.game).onSnapshot((doc)  => {
        console.log("Current data: ", doc.data()['players'])
        this.players = doc.data()["players"]
        const playerName = localStorage.getItem('kyllerPlayer')
        if (playerName) {
        this.player = this.players.find((p) => p.name === playerName)
      }
    });
  },
  methods: {
    show() {
        this.$modal.show('hello-world')
    },
    hide() {
        this.$modal.hide('hello-world')
    },
    chose(player) {
      if (player) {
        localStorage.setItem('kyllerPlayer', player.name)
        this.player = player
        this.$modal.hide('hello-world')
      }
    },
    quit() {
      localStorage.removeItem('kyllerPlayer')
      this.$router.push('/')
    },
    killed(status) {
      var killedFunction = firebase.functions().httpsCallable('killed')
      // axios.post('http://localhost:5000/kyller/us-central1/killed', {data: {
      // // axios.post('https://us-central1-kyller.cloudfunctions.net/killed', {data: {
      //     'gameId': this.$route.params.game,
      //     'playerName': this.player.name,
      //     'status': status
      //   }}, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     }
      //   }).then(function(ok) {
      //     console.log(ok)
      //   }, function(error) {
      //     console.log(error)
      //   })
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
