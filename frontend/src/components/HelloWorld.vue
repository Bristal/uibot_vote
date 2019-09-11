<template>
  <div class="hello">
    <h1 class="gfont">{{ msg }}</h1>
    <p class="code-desc">
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="http://gamerchat.qq.oa.com/wiki/" target="_blank" rel="noopener">uibot documentation</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

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
