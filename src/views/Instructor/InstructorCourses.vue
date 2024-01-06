
<template>
  <div class = "body">
    <div class="container">
      <p class="welcome-message">Welcome, {{ firstName }}! Here are your courses.</p>
        <p class = "welcome-submessage">Click on any course to reveal its students!</p>
      <div class="courses-container">
        <ul class="course-list">
          <li v-for="course in Courses" :key="course.S" class="course-item">
              <InstructorCourseCom :course="course.S" />
          </li>
        </ul>
      </div>
    </div>
  </div>
  </template>

  
  
<script>
import InstructorCourseCom from './InstructorCourseCom.vue';
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

    //get data from local storage and parse it
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
    InstructorCourseCom
  },
};
  </script>
  
  <style scoped>

  .body{
    background-color: whitesmoke;
    padding-top: 10px;
  }
  .container {
    max-width: 800px; 
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc; 
    border-radius: 5px; 
    background-color: white;
  }
  
  .welcome-message {
    font-size: 24px; 
     
  }
  .welcome-submessage{
    margin-bottom:20px; 
    margin-left:10px
  }
  
  .courses-container {
    background-color: #f9f9f9; 
    border: 1px solid #eaeaea; 
    padding: 15px;
    border-radius: 5px;
  }
  
  .course-list {
    list-style-type: none; 
    padding: 0; 
  }
  
  .course-item {
    padding: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
    transition: background-color 0.3s; 
  }
  .router-link {
    color: black; 
    text-decoration: none; 
  }
  
  .course-item:hover {
    background-color: #e6e6e6; 
  }
  
  
  .course-item:hover .router-link {
    color: black;
  }
  
  
  .router-link-active {
    color: black;
  }
  
  
  .router-link-exact-active {
    color: black;
  }
  .course-item:last-child {
    border-bottom: none; 
  }
  </style>