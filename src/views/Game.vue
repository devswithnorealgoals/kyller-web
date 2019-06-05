<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <button @click="show">Open</button>
    <!-- <v-dialog height="100%"/> -->
    <modals-container/>
    <modal name="hello-world" height="100%" width="100%">
        <template>
            <div>
                <p style="text-align:center;">dzaij</p>
                <button @click="hide">Close</button>
                <ul id="example-1">
                <li v-for="player in players" v-bind:key="player">
                    {{ player.name }}
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
export default {
  name: 'Game',
  data() {
      return {
          players: []
      }
  },
  components: {
      PlayersModal
  },
  props: {
    msg: String
  },
  created: function() {
      this.test()
      var db = firebase.firestore();
      db.collection("games").doc(this.$route.params.game).onSnapshot((doc)  => {
        console.log("Current data: ", doc.data()['players']);
        this.players = doc.data()["players"]
    });

  },
  methods: {
    test: function () {
        console.log(this.$route.params.game)
    },
    show () {
        this.$modal.show('hello-world')
    },
    hide () {
        this.$modal.hide('hello-world');
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
