<template>
<div class = "body">
    <div v-if="courseLoaded">
        <div class="sidebar">
            <div class="sidebar-contents">
                <p>Instructor: {{ course.instructor.S }}</p>
                <p>Location: {{ course.location.S }}</p>
                <p>Seats: {{ course.curr_cap.N }} / {{ course.max_cap.N }}</p><br><br>
                <div v-if="course.prereq.L.length === 0">
                    <p>Prerequisite(s): None</p>
                </div>
                <div v-else>
                    <p>Prerequisite(s):</p>
                    <span v-for="(item, index) in course.prereq.L" :key="index">
                        {{ item.S }}
                        <span v-if="index < course.prereq.L.length - 1">, </span>
                    </span>
                </div>
            </div>
        </div>
        <div class="course-info">
            <h2>{{ course.courseid.S }}</h2>
            <p>{{ course.course_name.S }}</p><br>
            <p>{{ course.course_description.S }}</p><br>
        </div>
    </div>
    <!-- Had to add this, because page loaded before data fetched. Not sure why. -->
    <div v-else>
        <p>Loading...</p>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
//const props = defineProps(['courseid']);
const route = useRoute();                       // Returns the route (e.g. if route was /course/:courseid, it returns that)
console.log("Route:")
console.log(route)
const courseid = ref(route.params.courseid);    // This retrieves the courseid from the routed address (e.g. /course/CSE-250, courseid=CSE-250 would get its value from route)
const course = ref({});
const apiUrl = 'https://d3gxk33bye.execute-api.us-east-1.amazonaws.com/Test/getCourse';
/* Boolean to determine when information is available to be displayed. I was getting
   an error for some reason, as if the data wasn't being fetched before it was displayed
   in the template. */
const courseLoaded = ref(false);

/* Executes contents when page is loaded */
onMounted(async () => {
  try {
    const apiUrl_query = apiUrl + '?courseid=' + courseid.value;
    const response = await fetch(apiUrl_query);
    if (!response.ok) {
      throw new Error('HTTP error!');
    }
    const data = await response.json();
    course.value = JSON.parse(data.body).Items[0];
    courseLoaded.value = true;
  } catch (error) {
    console.error(error);
  };

    
});
</script>


<style lang="scss" scoped>

.body{
    background-color: white;
    height: 80vh;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
}
.sidebar {
    height: 80vh;
    width: 250px;
    position: fixed;
    z-index: 1;
    overflow-x: hidden;
    background-color: navy;
    color: white;
    border: 1px solid black;
    font-weight: 500;
    transition: all 0.5s ease;
    scale: 1.03;
    border-radius: 5px;
    
}

.sidebar-contents {
    padding: 10px;
}

.sidebar:hover{
    background-color: whitesmoke;
    color: black;
    
}

.course-info {
    margin-left: 260px;

    h2{
        font-weight: bold;
        font-size: 35px;
    }

    h1 {
        text-decoration: underline;
    }
}
</style>
