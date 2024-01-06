<template>
    <div class="Course-Page">
        <h1>Course Page</h1>
        <div class="courses-container">
          <button class="back-button" @click="goBack">back</button>
          <div v-for="(course, index) in courses" :key="index" class="course-row">
            <div class="course-info">
              {{ course.name }}, {{ course.details }}
            </div>
            <button class="manage-button">Manage</button>
          </div>
      </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.Course-Page {
    height: 100vh;
}
</style>

    <button class="back-button" @click="goBack">back</button>
    <div v-for="(course, index) in courses" :key="index" class="course-row">
      <div class="course-info">
        {{ course.name }}, {{ course.details }}
      </div>
      <button class="manage-button">Manage</button>
    </div>
  </div>


<script>
export default {
  name: "CoursesList",
  data() {
    return {
      courses: [
        { name: "Course 1", details: "misc details" },
        { name: "Course 2", details: "misc details" },
        { name: "Course 3", details: "misc details" }
      ]
    };
  },
  methods: {
    goBack() {
      // Implement the back functionality here, e.g., using vue-router
    }
  }
};
</script>

<style scoped>
.courses-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.back-button {
  background-color: #f0f0f0;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.course-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e0e0e0;
  padding: 10px;
  gap: 20px;
}

.course-info {
  flex: 1;
  padding: 10px;
  background-color: #f5f5f5;
}

.manage-button {
  background-color: #f0f0f0;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
