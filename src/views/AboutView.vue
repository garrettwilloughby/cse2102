<template>
  <div class = "body">
  <div class = "info-container">
    <div class="about-header"><u>This is an about Page</u></div>
    <div class="info">
      Here you will find incredibly important info regarding the
      Course Registration System for Great Success
    </div>
    <p style="text-align: center;"> (trademarked, registered, copyrighted, patented)</p>
  </div>
    <div class = "button-container">
      <div class = "swagger" @click = link>
      <p>Click here for swagger!</p>
      </div>
    </div>
</div>
</template>

<script>
  export default {
    methods:{
      link: function(){
        window.open("http://2102aws-uconn-queryuser.s3-website-us-east-1.amazonaws.com")

      }

    }
  } 

</script>

<style scoped>

.body {
  background-color: whitesmoke;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button-container {
  /* No changes needed for button-container */
  justify-content: center;
  align-items: center;
  text-align: center;
}

.swagger {
  font-weight: bold;
  height: 160px;
  width: 160px;
  background-color: rgb(255, 255, 255);
  transition: all 0.3s ease;
  border-radius: 20px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px; 
}

.swagger:hover {
  background-image: url("swagger.png");
}

.about-header {
  font-size: 2rem;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  padding-top: 90px;
  padding-left: 50px;
  width: 100%;
}

.info-container{
  padding-bottom: 100px;
}

.info {
  font-size: 20px;
  font-weight: normal;
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
