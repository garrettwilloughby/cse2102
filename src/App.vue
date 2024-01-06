<template>
  <div id="app">
    <Nav />
    <router-view />
    <Info />
  </div>
</template>

<script>
  import Nav from './components/Navbar.vue';
  import Info from './components/Infobar.vue';
  export default {
    name: 'app',
    components: {
      Nav, Info
    },
  };
</script>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>