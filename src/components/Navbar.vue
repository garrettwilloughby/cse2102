<template>
  <!-- This container holds navbar title + the links -->
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/"> <!-- Clicking on "Course Registration System" also brings you Home -->
        <strong class="is-size-4">Course Registration System</strong>
      </a>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <!-- This is where the navbar links are -->
    <div id="navbar" class="navbar-menu">
      <div class="navbar-start">
        <!-- Home and About buttons are children of "navbar-menu" -->
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/about" class="navbar-item">About</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="newButton" @click = "goBack">
              <strong>Back</strong>
            </a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <a class= "newButton" @click = "navigate">
              <strong>Login</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
// import { useAuth0 } from '@auth0/auth0-vue';
  export default {
    // setup() {
    //   const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    //   return {
    //     login: () => {
    //       loginWithRedirect();
          
    //     },
    //     user,
    //     isAuthenticated
    //   };
    // },
    name: 'nav_comp',
    methods: {
      navigate: function (e){
        this.$router.push('/login');
      },
      goBack: function(e){
        this.$router.go(-1)
      }
      
      
      }
  };
</script>

<style lang="scss" scoped>
  /* These styles apply to the ENTIRE navigation bar */
  nav {
    
    margin-top: 25px;
    margin-bottom: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #d88d00;
      }
    }
  }

  .newButton{
    text-align: center;
  }

  .newButton:hover {
  transform: scale(1.10); /* Slightly increase the size */

}

</style>
