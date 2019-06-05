<template>
<div>
      <h1>This is created inline</h1>
      <p>{{ text }}</p>
    </div>
</template>

<script>
export default {
  name: 'PlayersModal',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
h1 {
    text-align: center;
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
div {
    /* background: rebeccapurple; */
}
</style>
