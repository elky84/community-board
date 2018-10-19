<template>
  <div id="app">
    <h2><i class="fas fa-language"></i>커뮤니티 보드</h2>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

.element {
  font-size: 12px;
}

.form-control {
  font-size: 12px;
}

.label {
  font-size: 12px;
}

.nav {
  font-size: 12px;
}

.dropdown-item {
  font-size: 12px;
}

</style>
