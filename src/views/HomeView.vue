<template>
  <div class = "home">
    <section class = "hero is-dark">
      <div class = "hero-body">
        <div class = "container">
          <h1 class = "title">Welcome to the Group 7:Sec004<br>Course Registration System</h1>
          <!-- <div class = "button-block">
            <button class = "button is-xl is-dark">
              Sign In to Access System
            </button>
          </div> -->
        </div>
      </div>
    </section>
  </div>
</template>




<script>
  export default {
    name: 'home_comp',
    components: {},

  };
</script>

<style lang="scss" scoped>

html, body {
  height: 100%;
}
.hero {
  text-align: center;
  background-image: url('background.jpg');
  background-size:cover;
  background-position:center;
  background-repeat: no-repeat;
  margin-top: 0px;
  height: 83vh;
}
.hero-body .title {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  padding: 40px 0 20px 0;
  font-size: 60px;
  //color: white !important;
}

.subtitle {
  text-shadow: 4px 4px 4px rgba(0,0,0,0.7);
  font-size: 30px;
}

.button-block {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  .button {
    margin-right: 50px;
    margin-left: 50px;
  }
}

.info-bar {
  background-color: #333; /* Set the background color for the bar */
  color: white; /* Set the text color */
  //padding: 10px 0; /* Add padding for spacing */
}

/* Styles for the info-links container */
.info-links {
  display: flex; /* Makes links appear Horizontally */
  justify-content: center; 
  align-items: center;
  background-color: white;
  .separator {
    padding-right: 10px;
    padding-left: 10px;
    color: black;
  }
  .contact {
    font-size: 1em;
    color: red;
  }
  .help {
    margin: 0;
    font-size: 1em;
    color: red;
  }
}

.is-xl {
  font-size: 1.7rem;
  font-family: Arial, Helvetica, sans-serif;
}

</style>

