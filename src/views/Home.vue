<template>
  <div class="home" style="display:flex; flex-direction:column; justify-content: space-around; height:80vh;">
    <h1> LE KILLER</h1>
    <img alt="Vue logo" src="../assets/target.png" width="50%" style="align-self:center">
    <div id="nav">
      <p style="font-family:courier;">Qui sera le meilleur assassin...</p>
      <router-link to="/game/XyIzoGLrWI9F6evjLZ6b" style="opacity:0;">JOIN</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
@font-face {
  font-family: "gunplay3d";
  src: url("../assets/gunplay3d.ttf") format("truetype");
}
h1 {
  font-family: 'gunplay3d';
  font-size: 2em;
}
</style>
