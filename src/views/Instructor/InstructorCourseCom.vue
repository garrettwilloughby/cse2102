<template>
  <!-- course info always shown -->
  <div class="course-info" @click = "changeToggle">
    <p class="course-title">{{ course }} - {{ existingData[course]?.Items[0]?.course_name.S }}</p>
    <div class="details">
      <p class="detail">{{ existingData[course]?.Items[0]?.location.S }}</p>
      <div class="detailDays">
        <p class="detailDaysText" v-for=" day in existingData[course]?.Items[0]?.schedule.M.days.SS">
         {{ day }} 
        </p>
      </div>
      <p class="detail">{{ existingData[course]?.Items[0]?.schedule.M.startTime.S }} - {{ existingData[course]?.Items[0]?.schedule.M.endTime.S }}</p>
    </div>
  </div>

  <!-- toggle is flag to show/hide students -->
  <div class = "students" v-if = "toggle">
    <div v-if="!studentVal || studentVal.length === 0">
      <p class = "studentTextTitle">No students in the course!</p>
    </div>
    <div v-else>
      <p class = "studentTextTitle">Students Enrolled:</p>
      <p class = "studentText" v-for = "(item, index) in studentVal" :key="index"> {{ item.S }}</p>
    </div>
  </div>
</template>

<script>
import { ref, watch, onBeforeMount } from 'vue';

//call course api
const apiUrl = "https://d3gxk33bye.execute-api.us-east-1.amazonaws.com/Test/getCourse?courseid=";
const apiUrl2 = "https://d3gxk33bye.execute-api.us-east-1.amazonaws.com/Test/getStudentsEnrolled?courseid="

export default {
  data(){
    return{
      toggle: false,
    }
  },
  props: {
    course: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const courseInfo = ref([]);
    const studentVal = ref([]);

    const existingData = ref(JSON.parse(localStorage.getItem('courseInfoSaved')) || {});

    //this api gets the course info
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}${props.course}`);
        if (response.ok) {
          const data = await response.json();
          const parsedData = JSON.parse(data.body);
          courseInfo.value = parsedData;

          // Update local storage
          existingData.value[props.course] = courseInfo.value;
          localStorage.setItem('courseInfoSaved', JSON.stringify(existingData.value));
        } else {
          console.error('API request failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during API request:', error);
      }

    }

    const existingDataStudents = ref(JSON.parse(localStorage.getItem('courseStudentsSaved')) || {});

    //this api call gets the users in the course
    const fetchData2 = async () => {
      try {
        const response = await fetch(`${apiUrl2}${props.course}`);
        if (response.ok) {
          const studentData = await response.json();
          //const parsedDataStudent = JSON.parse();
          // Update local storage
          existingDataStudents.value[props.course] = studentData.body;

          studentVal.value = existingDataStudents.value[props.course].L

          localStorage.setItem('courseStudentsSaved', JSON.stringify(existingDataStudents.value));
        } else {
          console.error('API request failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during API request:', error);
      }
    }

    //call both so we can get data before render!
    onBeforeMount(() => {
      fetchData();
      fetchData2();
    });


    //watch for changes
    watch(() => existingData.value, () => {
      console.log('Local storage updated:', existingData.value);
    });

    return { existingData, props, studentVal };
  },
  methods: {
    link: function(course){
      console.log(course)
      this.$router.push('/course/' + course);
    
    },
    changeToggle: function(){
      this.toggle = (!this.toggle)
      console.log(this.toggle)
    }

  }
};
</script>

<style scoped>
.students{
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

.studentText{
  margin-left: 4%;
}

.studentTextTitle{
  margin-left: 2%;
  font-weight: bold;
}
.course-info {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  cursor: pointer;
}

.course-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.details {
  font-size: 1.1em;
}

.detail {
  margin-bottom: 8px;
}

.detailDays{
  display: flex;
}

.detailDaysText{
  margin-right: 5px;
}
</style>