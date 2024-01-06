
<template>
    
  <div class="button-container">
    <h1 class = "welcomeInstructor">Welcome, {{ firstName }}!</h1>
          <div>
          <div class="buttons">
              <div class="button" @click="routeToCourses">
                <p>Courses</p>
              </div>

              <div class="button" @click="routeToSchedule">
                <p>Schedule</p>
                
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
    this.$router.push('/InstructorCourses')
  },
  routeToSchedule(){
    this.$router.push('/InstructorSchedule')
  },
  routeToStudentList(){
    this.$router.push('/StudentList')
  },    
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


.welcomeInstructor {
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: bolder;
  text-align: center;
  transition: color 0.3s ease;
}

.welcomeInstructor:hover {
  color: rgb(0, 17, 144);
}


</style>