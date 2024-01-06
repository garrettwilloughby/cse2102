<template>
    <nav class="info-container">
        <router-link to="/contact" class="contact">Contact Us</router-link>
        <span class="separator"> | </span>
        <router-link to="/help" class="help">Help</router-link>
    </nav>
</template>

<script>
    export default {
        name: 'infobar-comp',
        components: {},
    };
</script>

<style lang="scss" scoped>
.info-container {
  background-color: #ffffff; /* Set the background color for the bar */
  color: white; /* Set the text color */
  display:flex;
  justify-content: center;
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  
  .contact {
    margin:0;
    color: red;
    font-size: 15px;
    &.router-link-exact-active {
        color: #000000;
      }
  }
  .separator {
    color:black;
    font-size: 15px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .help {
    color: red;
    font-size: 15px;
    margin:0;
    &.router-link-exact-active {
        color:black
    }
  }

  a:hover {
    color: blue;
  }
}
</style>

<!-- <section class = "info-bar">
    <div class="info-links">
      <a class="contact" href="/contact">Contact Us</a>
      <span class="separator">|</span>
      <a class="help" href="/help">Help</a>
    </div>
  </section> -->