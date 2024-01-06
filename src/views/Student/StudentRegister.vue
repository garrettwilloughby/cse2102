<template>
    <div class ="body">
    <div class="top">
      <div>
        <h1 class = "page-header">Register for classes!</h1>
        <h1 class = "page-subheader">Here are your current classes:</h1>
      </div>

      <div>
        <h2 class = "creditScore"> Total Credits Taken: {{ totalCredits }}</h2>
        <h2 class = "creditScore">Credits Currently Taking: {{ currentCredits }}</h2>
      </div>
    </div>
    <div class = "courseView" v-for="course in Courses" :key="course.S">

      <StudentCourseCom :course="course.S" />

      <div class = "dropButton" @click = "drop(course)">
        <p class = "drop">Drop</p>
    </div>

    </div>

    <div class= "register">
    <label>Select class:  </label>

        <select v-model = "selectedCourse" id = "selectedCourse">
            <option v-for="course in courseData" :key="course.courseid" :value="course"  >
              {{ course.courseid.S }} - {{ course.course_name.S }} 
            </option>
        </select>
    </div>

    <div v-if="selectedCourse" class = "courseView">
    
  
    <div class = "course-info" @click = "link(selectedCourse.courseid.S)">
      <div>
        <h2>You have selected:</h2>
        <p class = "course-title">Course: {{ selectedCourse.courseid.S }} - {{ selectedCourse.course_name.S }}</p>
        <p>Instructor: {{ selectedCourse.instructor.S }}</p>
        <p>Description: {{ selectedCourse.course_description.S }}</p>
        <p v-if="selectedCourse.prereq.S">Prerequistes: {{ selectedCourse.prereq.L }}</p>

       
      </div>

      <div>
        <p>Days/Times:</p>
        <div class = "courseDays">
          <p class = "day" v-for = "day in selectedCourse.schedule.M.days.SS">{{ day }}</p>
        </div>
        <p>{{ selectedCourse.schedule.M.startTime.S }} - {{ selectedCourse.schedule.M.endTime.S }}</p>
        <p>Cap: {{ selectedCourse.curr_cap.N }} / {{ selectedCourse.max_cap.N }} | Credits: {{ selectedCourse.credits.N }}</p>
        
      </div>
    </div>


    <div class = "enrollButton" @click = enroll>

      <p class = "enroll">Enroll</p>
    </div>

  </div>

  <div class = "bottom">

  </div>

  </div>

</template>

<script>
import { ref, onMounted, watch } from 'vue';
const apiKeyCourses = "https://28it7l5myh.execute-api.us-east-1.amazonaws.com/test_courses/resources"
const apiKeyPut = "https://17s030bn2j.execute-api.us-east-1.amazonaws.com/test4"

import StudentCourseCom from './StudentCourseCom.vue';

export default {
  data() {
    return {
      username: '',
      firstName: '',
      lastName: '',
      Courses: [],
      schoolRole: '',
      courseData: '',
      selectedCourse: null,
      currentCredits: 0,
      totalCredits: 0
    };
  },
  async mounted() {
    //get stored data from local storage
    console.log("hello")
    const storedData = localStorage.getItem('loginParams');
    console.log(storedData);

    //get stuff from local storage
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


    const courseData = ref([]);
    try {
        const response = await fetch(apiKeyCourses);
        if (response.ok) {
          const data = await response.json();
          const parsedData = JSON.parse(data.body);
          courseData.value = parsedData;
          console.log(courseData._rawValue);

          // Update local storage
        } else {
          console.error('API request failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during API request:', error);
      }

      this.courseData = courseData.value;


  },
  
  methods:{
    async apiFun(){
      //get coursesArray to pass as parameter to api.

      const coursesArray = this.Courses.map(courseObject => courseObject.S);
      console.log("Credits", this.currentCredits)
      console.log("totalCredits", this.totalCredits)

      //set payload
      let payload = {
      username: this.username,
      currentCredits: this.currentCredits,
      totalCredits: this.totalCredits,
      Courses: coursesArray
      }

      //get parameters from local storage
      this.loginParams = {
      username: this.username,
      password: this.password,
      courses: this.Courses,
      role: this.role,
      last: this.lastName,
      first: this.firstName,
      currentCredits: this.currentCredits,
      totalCredits: this.totalCredits

        };

      console.log("payload", JSON.stringify(payload))
      //set updated login params (courses, credits)
      this.$store.commit('setLoginParams', this.loginParams); 

      try {
        //const response = await fetch(apiKey)
        const response = await fetch(apiKeyPut, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        })
        
        // console.log(response)
        // console.log(JSON.stringify(payload))
        // console.log(payload)
        
    if (response.ok) {
      const data = await response.json();
      console.log('API Response:', data);
    } else {
      console.error('API request failed:', response.status, response.statusText);
      // log the response body for more information so hopefully we CAN FIND THIS ERROR!!!!!!!!
      const errorText = await response.json();
      console.error('Error response body:', errorText);
    }
    } catch (error) {
    console.error('Error during API request:', error);
    }
  },
  async apiFunAdd(){
    const apiUrl1 = 'https://d3gxk33bye.execute-api.us-east-1.amazonaws.com/Test/addStudentToCourse';
  // Concatenate parameters onto end. Ex: ...addStudentToCourse?username=Gmw21001&courseid=CSE-466
    const params1 = `?username=${this.username}&courseid=${this.selectedCourse.courseid.S}`;
    console.log(params1)
    const apiUrl1Add = apiUrl1 + params1;
    try {
      var requestOptionsAddStudent = {
        method: 'PUT',
        redirect: 'follow'
      };

    fetch(apiUrl1Add, requestOptionsAddStudent)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  } catch (error) {
    console.error(error)
  };

  },
  async apiFunRem(course){
    console.log("apiFunRem Called!!!!!!!!!!")
    console.log("In remove API, trying to remove", course)
    const apiUrl2 = 'https://d3gxk33bye.execute-api.us-east-1.amazonaws.com/Test/removeStudentFromCourse';
  // Concatenate parameters onto end. Ex: ...removeStudentFromCourse?username=Gmw21001&courseid=CSE-466
    const params2 = `?username=${this.username}&courseid=${course.S}`;
    const apiUrl2Remove = apiUrl2 + params2;
    try {
      var requestOptionsRemoveStudent = {
        method: 'PATCH',
        redirect: 'follow'
      };

    fetch(apiUrl2Remove, requestOptionsRemoveStudent)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  } catch (error) {
    console.error(error)
  };

  },
  convertTime(time) {
      //parse data
      const [hours, minutesAMPM] = time.split(":");
      const minutes = minutesAMPM.slice(0, 2);
      const period = minutesAMPM.slice(-2);

      // convert da hours to military time
      let militaryHours = parseInt(hours);
      if (period === "PM" && militaryHours !== 12){
        militaryHours += 12;
      }
      // format time
      const militaryTime = `${militaryHours.toString().padStart(2, "0")}${minutes}`;
      return parseInt(militaryTime);

  },
  timeConflict(){
    //loop through student course, comparing each one to selected course.
      const selectedStart = this.convertTime(this.selectedCourse.schedule.M.startTime.S);
      const selectedEnd = this.convertTime(this.selectedCourse.schedule.M.endTime.S);
      const selectedDays = this.selectedCourse.schedule.M.days.SS
      // console.log(this.selectedCourse.schedule.M.endTime.S)
      // console.log(this.selectedCourse.schedule.M.startTime.S)

      // console.log(selectedStart)
      // console.log(selectedEnd)
    
      //get stuff from local storage
      const existingData = ref(JSON.parse(localStorage.getItem('courseInfoSaved')) || {});

      // Loop through existing courses
      for (const course of this.Courses) {
        
        // Extract start and end times for each existing course
          const existingStart = this.convertTime(existingData._rawValue[course.S].Items[0].schedule.M.startTime.S)
          const existingEnd = this.convertTime(existingData._rawValue[course.S].Items[0].schedule.M.endTime.S)
          const existingDays = existingData._rawValue[course.S].Items[0].schedule.M.days.SS
         
          //console.log(selectedStart, selectedEnd, course.S, existingStart, existingEnd)
        // check for time/day conflict
        const dayConflict = selectedDays.some(day => existingDays.includes(day));
        const timeConflict = (
          (selectedStart >= existingStart && selectedStart < existingEnd) ||
          (selectedEnd > existingStart && selectedEnd <= existingEnd) ||
          (selectedStart <= existingStart && selectedEnd >= existingEnd) 
        ) 
        if(timeConflict && dayConflict){
          // Time conflict found
          return course.S;
        }
      }
      // No time conflict found
      return false;
  },
    enroll: function(){
      const isEnrolled = this.Courses.some(course => course.S === this.selectedCourse.courseid.S);
      const isConflict = this.timeConflict()
      
      

      if(isEnrolled){
        alert("You are already enrolled in this class!")
      }
      else if (isConflict){
        alert("Time conflict!", isConflict)
      }
      else{
      //test in console accessing selectedCourse within this function
      console.log("enrolling in", this.selectedCourse.courseid.S);
      
      //store selected courses in json and push to array
      const newCourse = { S: this.selectedCourse.courseid.S };
      this.Courses.push(newCourse);
      
      //update credits
      this.totalCredits = parseInt(this.totalCredits) + parseInt(this.selectedCourse.credits.N)
      this.currentCredits = parseInt(this.currentCredits) + parseInt(this.selectedCourse.credits.N)

  
      this.apiFunAdd();
      this.apiFun()
      }
    },
  
  drop: function(course){
    console.log("dropping", course.S)
    const existingData = ref(JSON.parse(localStorage.getItem('courseInfoSaved')) || {});
    //remove courses from list
    let index = this.Courses.findIndex(c => c.S === course.S);
    if (index !== -1) {
        this.Courses.splice(index, 1);
    }

    //update credits
    this.totalCredits = parseInt(this.totalCredits) - existingData._rawValue[course.S].Items[0].credits.N
    this.currentCredits = parseInt(this.currentCredits) - existingData._rawValue[course.S].Items[0].credits.N

    
    this.apiFunRem(course);
    this.apiFun()
  },
  link: function(course){
      console.log(course)
      this.$router.push('/course/' + course);
    
    }

  },
  components:
  {
    StudentCourseCom
  },

};
</script>

<style scoped>

.courseDays{
  display: flex;
}

.day{
  margin-right: 5px;
}
.body{
  padding-top: 10px;
  background-color: whitesmoke;
  min-height: 100vh;
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
.courseView{
  display: flex;

}
.drop{
  padding: 50px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.dropButton{
  justify-content: center;
  align-items: center;
  text-align: center;
  
  height: 175px;
  width: 150px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;
  cursor: pointer;
}

.dropButton:hover {
  background-color: rgba(199, 7, 7, 0.463);
  transform: scale(1.05); /* Slightly increase the size */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */

}

.enrollButton{
  justify-content: center;
  align-items: center;
  text-align: center;
  
  height: 175px;
  width: 150px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;
  cursor: pointer;
}

.enrollButton:hover {
  background-color: rgba(50, 171, 10, 0.5);
  transform: scale(1.05); /* Slightly increase the size */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */

}

.enroll{
  padding: 50px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  margin-bottom: 20px;
  margin-left: 10px;
}
.course-info {
  display: flex;
  border: 1px solid #ccc;
  width: 75%;
  height: 175px;
  margin-left: 5%;
  margin-right: 1%;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  justify-content: space-between;
  overflow:hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  
}

.course-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.register{
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-left: 5%;
  padding-top: 10px;
  padding-bottom: 10px;
}

.bottom{
  background-color: whitesmoke;
  height: 10vh;
}

</style>