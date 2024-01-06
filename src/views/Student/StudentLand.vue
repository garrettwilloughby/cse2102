
<template>
    
    <div class="button-container">
      <h1 class = "welcomeStudent">Welcome, {{ firstName }}!</h1>
            <div>
            <div class="buttons">
                <div class="button" @click="routeToCourses">
                  <p>My Courses</p>
                </div>

                <div class="button" @click="routeToSchedule">
                  <p>Schedule</p>
                  
                </div>

                <div class="button" @click="routeToRegistraion">
                  <p>Register</p>
                  
                </div>

            </div>
            </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: ''
    };
  },
  mounted() {
    //get stored data from local storage
    const storedData = localStorage.getItem('loginParams');
    console.log(storedData);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.firstName = parsedData.first;
      this.lastName = parsedData.last;
    }
  },
  methods: {
    routeToCourses(){
      this.$router.push('/studentCourses')
    },
    routeToSchedule(){
      this.$router.push('/studentSchedule')
    },
    routeToRegistraion(){
      this.$router.push('/studentRegister')

    }
  }
};
</script>

<style scoped>

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: whitesmoke;
  height: 100vh;
}

.buttons {
  margin-top: 5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  font-weight: bold;
}

.button {
  height: 150px;
  width: 200px;
  box-shadow: 1px 1px 1px 1px #888888;
}

.button:hover{
  color: rgb(0, 17, 144);
}


.welcomeStudent {
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: bolder;
  text-align: center;
  transition: color 0.3s ease;
}

.welcomeStudent:hover {
  color: rgb(0, 17, 144);
}



</style>