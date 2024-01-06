<template>
  <div class="schedule">
    <h2 class = "title">Student Schedule</h2>
    <h3 v-if=scheduleLoaded>
      <!-- <p>{{ student_schedule['Tuesday']}}</p> -->
    </h3>
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
        </tr>
      </thead>
      <tbody>
        <!-- Iterate thru all "time" values in times[] -->
        <tr v-for="time in times" :key="time">
          <!-- Display the time -->
          <td>{{ time }}</td> 
          {{ console.log(time) }}
          <!-- Iterate thru all "day" values in days[] -->
          <td v-for="day in days" :key="day">
            {{ console.log(day) }}
            <div v-if="scheduleLoaded && student_schedule[day]">
              <div v-for="course in student_schedule[day]" :key="course.courseKey">
                <!--check if the crouse in the time zoon-->
                <div v-if="time >= course.startTime && time <= course.endTime" class="course-block">
                  <!--display class informations-->
                  <div class="course-time">{{ course.startTime }} - {{ course.endTime }}</div>
                  <div class="course-name">{{ course.courseKey }}</div>  
                </div>
                <!-- If  -->
              </div>
            </div>
            

          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

var student_courses;
const student_schedule = {}
const scheduleLoaded = ref(false)
const apiUrl = 'https://d3gxk33bye.execute-api.us-east-1.amazonaws.com/Test/getStudentCourses';

let username;

const storedData = localStorage.getItem('loginParams');
    console.log(storedData);

    //get stuff from local storage
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      username = parsedData.username;
    }
  
onMounted(async () => {
  try {
    const response = await fetch(`${apiUrl}?username=${username}`);
    if (!response.ok) {
      throw new Error('HTTP error!')
    }
    const data = await response.json();
    //console.log(data);
    student_courses = data.body;
    console.log("STUDENT COURSES:", student_courses);
    // Get dict keys (courseids)
    const courseKeys = Object.keys(student_courses);
    // Create a simplified schedule using just courseids matched with the Day
    // Can use the courseids to access more specific info later
    for (let i = 0; i < courseKeys.length; i++) {
      //console.log(student_courses[courseKeys[i]].days.SS);
      const x = student_courses[courseKeys[i]].days.SS;
      console.log("Printing Days...")
      for (let j = 0; j < student_courses[courseKeys[i]].days.SS.length; j++) {
        //console.log(student_courses[courseKeys[i]].days.SS[j]);
        if (!student_schedule[student_courses[courseKeys[i]].days.SS[j]]) {
          student_schedule[student_courses[courseKeys[i]].days.SS[j]] = [];
        }
        //student_schedule[student_courses[courseKeys[i]].days.SS[j]].push(courseKeys[i])
        student_schedule[student_courses[courseKeys[i]].days.SS[j]].push({
          courseKey: courseKeys[i],
          startTime: student_courses[courseKeys[i]].startTime.S,
          endTime: student_courses[courseKeys[i]].endTime.S
        });
      };
    };
    console.log("Schedule dict: ", student_schedule)
    scheduleLoaded.value = true
  } catch (error) {
    console.error(error)
  }
});
// Table cell info
const times = ref(['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',"4:00 PM","5:00 PM","6:00 PM", "7:00PM"]);
const days = ref(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
</script>

<style scoped>
.schedule {
  max-width: 800px;
  margin: auto;
  padding-bottom: 30px;
}
.title{
  padding-bottom: 10px;
}

table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}
thead {
  background-color: #eee;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
h2 {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.course-block {
  background-color: #6cace4; 
  color: white;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}
.course-time {
  font-size: 0.8em;
  opacity: 0.7;
}
.course-name {
  font-weight: bold;
  font-size: 1.2em;
}
</style>

