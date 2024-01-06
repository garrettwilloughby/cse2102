<template>
    <div class="admin-course-view">
      <h1>Welcome to Course View</h1>
      <p>This is where you can search for courses and<br>enroll.</p>
      <div class="search-container">
        <h2>Search for Courses</h2>
        <div class="search-bar">
          <input id="search-courses" v-model="searchText" class="box-in" @keyup.enter="enterClicked" placeholder="Search by Course ID...">
        </div>
      </div>
      <div class="center-container">
        <div class="content-container">
          <router-link :to="'/course/' + course.courseid.S" class="aCoursePage" v-for="course in filterCourses" :key="course.courseid">
          <!-- <router-link :to="'/course/' + course.courseid.S" class="aCoursePage" v-for="course in filterCourses" :key="course.courseid"> -->
            <div class="course">
              <h2>{{ course.courseid.S }} - {{ course.course_name.S }}</h2>
              <p>{{ course.course_description.S }}</p>
              <div class="more-info">
                <p>Cap: {{ course.curr_cap.N }} / {{ course.max_cap.N }}
                  | Credits: {{ course.credits.N }}
                  | Instructor: {{ course.instructor.S }}
                </p>
                <!-- <p>Instructor/Capacity/Date&Time</p> -->
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, ref } from 'vue'
  const searchText = ref('');
  const enterClicked = () => {
  
    alert(`You entered: ${searchText.value}`)
  };
  const courses = ref([]);
  const apiUrl = 'https://28it7l5myh.execute-api.us-east-1.amazonaws.com/test_courses/resources';
  onMounted(async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('HTTP error!')
      }
      const data = await response.json();
      //console.log(data)
      const parsedData = JSON.parse(data.body);
      courses.value = parsedData;
      courses.sort();
    } catch (error) {
      console.error(error)
    }
  });
  
  // TODO
  const filterCourses = computed( () => {
    return courses.value.filter(course => {
      console.log(course.course_name.S)
      return course.courseid.S.toLowerCase().includes(searchText.value.toLowerCase());
    });
  });
  
  
  </script>
  
  <style lang="scss" scoped>
  .admin-course-view {
    height: 100vh;
    h1 {
      text-align: center;
      font-size: 20px;
      font-weight: bolder;
    }
    p {
      text-align: center;
    }
    h3 {
      padding-bottom: 40px;
    }
  }
  
  .center-container {
    //display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    flex-grow: 1; /* Expand to fill available space */
  }
  
  .content-container {
    padding: 1rem;
  }
  
  .search-container {
    padding: 1rem;
    
    text-align: center;
  }
  
  .box-in {
    padding-left: 4px;
    padding-right: 4px;
    width: 215px;
  }
  
  .aCoursePage:hover {
    color:red;
    //font-style: italic;
    font-weight: bolder;
  }
  .course {
    color: black;
    background-color: #fff;
    margin-bottom: 1rem;
    padding: 1rem;
    border: 2px solid #ddd;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
  
    h2 {
      font-weight: bolder;
    }
  }
  .course:hover {
    border-color: blue;
    // h2{
    //   font-weight: bolder;
    // }
  }
  
  h3 {
    text-align: center;
  }
  
  .more-info{
    p{
      font-family:Georgia, 'Times New Roman', Times, serif;
      font-size: small;
      margin-top: 20px;
      //border: 2px solid black;
    }
  }
  
  </style>