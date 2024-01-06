<template>
<div class = "body">
<div class = "container">
  <div class = "top">
    <div>
      <p class = "page-header">Welcome, {{ firstName }}!</p>
      <p class = "page-subheader">here are your courses!</p>
    </div>
    <div>
        <h2 class = "creditScore"> Total Credits Taken: {{ totalCredits }}</h2>
        <h2 class = "creditScore">Credits Currently Taking: {{ currentCredits }}</h2>
    </div>
  </div>

    <!-- iterate to make course components -->
    <div class = "courseView" v-for="course in Courses" :key="course.S" >
      
      <StudentCourseCom :course="course.S" />
    </div>

</div>
</div>
   
    

</template>

<script>
//test api for put users
//const apiKey = "https://17s030bn2j.execute-api.us-east-1.amazonaws.com/test";

import StudentCourseCom from './StudentCourseCom.vue';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      Courses: [],
      schoolRole: '',
      currentCredits: 0,
      totalCredits: 0
    };
  },
  mounted() {
    //get stored data from local storage
    const storedData = localStorage.getItem('loginParams');
    console.log(storedData);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.firstName = parsedData.first
      this.lastName = parsedData.last
      this.Courses = parsedData.courses
      this.username = parsedData.username
      this.password = parsedData.password
      this.role = parsedData.role
      this.currentCredits = parsedData.currentCredits
      this.totalCredits = parsedData.totalCredits
    }
  },
  components:
  {
    StudentCourseCom
  }
};
</script>

<style scoped>

.body{
  background-color: whitesmoke;
  padding-top: 10px;
  height: 90vh;
}
.container{
  margin-left: 5%;
  margin-right: 5%;
}

.top{
  display: flex;
  justify-content: space-between;
  margin-right: 2%;
}

.creditScore{
  color: darkgray;
  font-weight: bold;
  font-size: 12px;
  padding-top: 10px;
}
.page-header{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 10px;
}

.page-subheader{
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 10px;
}


</style>