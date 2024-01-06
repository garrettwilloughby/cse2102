
<div class="course-info">
    <div class="course-header">
        <h2>CSE XXXX</h2>
        <p>Section 001</p>
        <p><a href="sallybus.html">Syllabus last semester</a></p>
    </div>
    <div class="course-status">
        <span>Status: Available</span>
    </div>
    <table class="course-table">
        <tr>
            <th>Units</th>
            <th>Grading</th>
            <th>Instruction Mode</th>
            <th>Location</th>
            <th>Campus</th>
            <th>Available Reserved Seats</th>
        </tr>
        <tr>
            <td>0.00</td>
            <td>In Person</td>
            <td>Main Campus</td>
            <td></td>
        </tr>
    </table>
</div>
=======
<template>
  <div class="course-page">
    <button class="back-button" @click="goBack">Back</button>
    <div class="course-content">
      <div class="course-title">Course 1</div>
      <div class="course-details">
        <div class="course-description">Course description</div>
        <div class="course-professor">Professor,</div>
        <div class="alternate-classes">alternate/similar classes,</div>
        <div class="prereqs">Prereqs,</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoursePage",
  methods: {
    goBack() {
      // Implement the back functionality here, e.g., using vue-router
    }
  }
};
</script>

<style scoped>
.course-page {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.back-button {
  background-color: #f0f0f0;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;
}

.course-content {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  padding: 20px;
}

.course-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.course-details {
  display: flex;
  flex-direction: column;
}

.course-description,
.course-professor,
.alternate-classes,
.prereqs {
  font-size: 16px;
  margin-bottom: 10px;
}
</style>

