<template>
  <div class="course-info" @click = "link(course)">

    <!-- display course info -->
  <div class = "details">
    <p class="course-title">{{ course }} - {{ existingData[course]?.Items[0]?.course_name.S }}</p>
        <p class="detail">Instructor: {{ existingData[course]?.Items[0]?.instructor.S }}</p>
        <p class="detail">Location: {{ existingData[course]?.Items[0]?.location.S }}</p>
        <p> Cap: {{ existingData[course]?.Items[0]?.curr_cap.N }}/{{ existingData[course]?.Items[0]?.max_cap.N }} | Credits: {{ existingData[course]?.Items[0]?.credits.N }}</p>
    </div>

    <div class = "details2">

        <div class="detailDays">
          <p class="detailDaysText" v-for=" day in existingData[course]?.Items[0]?.schedule.M.days.SS">
          {{ day }} 
          </p>
        </div>

          <p class="detail">{{ existingData[course]?.Items[0]?.schedule.M.startTime.S }} - {{ existingData[course]?.Items[0]?.schedule.M.endTime.S }}</p>
      </div>
    </div>
  
</template>

<script>
import { ref, watch, onBeforeMount } from 'vue';

//call course api
const apiUrl = "https://d3gxk33bye.execute-api.us-east-1.amazonaws.com/Test/getCourse?courseid=";

export default {
  props: {
    course: {
      type: String,
      required: true
    }
  },
  setup(props) {
    //store info here to return later
    const courseInfo = ref([]);
    const existingData = ref(JSON.parse(localStorage.getItem('courseInfoSaved')) || {});

    //call api
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
    };

    //on component mount, makes sure we update info before render
    onBeforeMount(() => {
      fetchData();
    });

    //watch chnages
    watch(() => existingData.value, () => {
      console.log('Local storage updated:', existingData.value);
    });

    //return so we can use in temp
    return { existingData, props };
  },
  methods: {
    link: function(course){
      console.log(course)
      this.$router.push('/course/' + course);
    
    }

  }
};
</script>

<style scoped>
.course-info {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.course-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.details {
  font-size: 1.1em;
  display: grid;
  justify-content: space-between;
}

.detail {
  margin-bottom: 0px;
}


.detailDays{
  display: flex;
}

.detailDaysText{
  margin-right: 5px;
}

.details2{
  margin-bottom: 50px;
}
</style>