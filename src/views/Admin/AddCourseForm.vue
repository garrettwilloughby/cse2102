<!-- Some elements of design any CSS style from https://www.w3schools.com/howto/howto_css_responsive_form.asp -->
<template>
    <div class="addCourseContainer">
        <form autocomplete="off" name="addForm">
            <div class="row">
                <div class="col-labels">
                    <label for="courseid">Course ID</label>
                </div>
                <div class="col-input">
                    <input type="text" id="courseid" name="courseid" v-model="courseid">
                </div>
            </div>

            <div class="row">
                <div class="col-labels">
                    <label for="course-name">Course Name</label>
                </div>
                <div class="col-input">
                    <input type="text" id="course-name" name="course-name" v-model="course_name">
                </div>
            </div>

            <div class="row">
                <div class="col-labels">
                    <label for="course-name">Instructor</label>
                </div>
                <div class="col-input">
                    <div class="instructor-select">
                        <select id="instructor" name="instructor" v-model="instructor">
                            <option v-for="instructor in listInstructors" :key="instructor" :value="instructor">
                                {{ instructor }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-labels">
                    <label for="course-description">Course Description</label>
                </div>
                <div class="col-input">
                    <textarea name="courseDescription" style="height:100px" v-model="course_description"></textarea>
                </div>
            </div>

            <div class="multirow">
                <div class="row">
                    <div class="col-labels">
                        <label for="creditNum">Credits</label>
                    </div>
                    <div class="col-input">
                        <input type="text" name="creditNum" value id="creditNumInput" style="width:4em; height:3em" v-model="creditsIn">
                    </div>
                </div>
                <div class="row">
                    <div class="col-labels">
                        <label for="maxCapNum">Capacity</label>
                    </div>
                    <div class="col-input">
                        <input type="text" name="maxCapNum" value id="maxCapNumInput" style="width:4em; height:3em" v-model="max_capIn">
                    </div>
                </div>
                <div class="row">
                    <div class="col-labels">
                        <label for="days">Days</label>
                    </div>
                    <div class="col-input">
                        <div class="days-select">
                            <select id="days" name="days" v-model="days">
                                <option v-for="days in validDays" :key ="days" :value="days">
                                    {{ days }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-labels">
                        <label for="days">Start/End</label>
                    </div>
                    <div class="col-input" style="display:flex;">
                        <div class="startTime">
                            <input type="text" id="startTime" name="startTime" v-model="startTime" style="width:100px; display=flex; margin-right: 10px;">
                        </div>
                        <div class="endTime">
                            <input type="text" id="endTime" name="endTime" v-model="endTime" style="width:100px; margin-left: 10px;">
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="row">
                <div class="col-labels">
                    <label for="course-name">Instructor</label>
                </div>
                <div class="col-input">
                    <div class="instructor-select">
                        <select id="instructor" name="instructor" v-model="instructor">
                            <option v-for="instructor in instructors" :key="instructor" :value="instructor">
                                {{ instructor }}
                            </option>
                        </select>
                    </div>
                </div>
            </div> -->

            <div class="row">
                <div class="col-labels">
                    <label for="location">Location</label>
                </div>
                <div class="col-input">
                    <input type="text" name="location" id="location" v-model="location">
                </div>
            </div>

            <div class="row">
                <div class="col-labels">
                    <label for="prereqs">Pre-requisite(s)</label>
                </div>
                <div class="col-input">
                    <input type="text" name="prereq" id="prereqInput" placeholder="e.g. CourseID-1, CourseID-2, etc." v-model="prereqs">
                </div>
            </div>

            <div class="submitCourse" style="display:flex; justify-content: center; margin-top: 80px;">
                <a class="button is-dark" @click="submitCourse">
                    <strong>Add Course</strong>
                </a>
            </div>

        </form>
    </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'


const listInstructors = ref([]);


const instructor = ref('');
const courseid = ref('');
const course_name = ref('');
const course_description = ref('');
const creditsIn = ref('');
const max_capIn = ref('');
const startTime = ref('');
const endTime = ref('');
const location = ref('');
const prereqs = ref('');
const days = ref([]);

async function fetchInstructors() {
    try {
        const response = await fetch('https://zdofbsyu1g.execute-api.us-east-1.amazonaws.com/test/query?role=instructor');
        if (!response.ok) {
            throw new Error("Failed to fetch data.");
        }
        const instructorData = await response.json();
        const parsedData = JSON.parse(instructorData.body);
        for (let i = 0; i < parsedData.Items.length; i++) {
            console.log(parsedData.Items[i].username.S);
            listInstructors.value.push(parsedData.Items[i].firstName.S + " " + parsedData.Items[i].lastName.S);
        }
        console.log("INSTRUCTOR LIST:", listInstructors.value);
    } catch (error) {
        console.log("ERROR");
    }
}

onMounted(() => {
    fetchInstructors();
});
const instructors = ref(["Hello", "Goodbye", "Salutations", "A Salut'"]);
const validDays = ref(["Monday/Wednesday", "Tuesday/Thursday", "Monday/Wednesday/Friday"]);
async function submitCourse() {

    // Format input to match Lambda function/Dynamo DB
    const credits = parseInt(creditsIn.value, 10);
    const max_cap = parseInt(max_capIn.value, 10);

    const daysList = days.value.split('/');
    console.log(daysList);

    const schedule = {
        M: {
            days: {
                SS: daysList,
            },
            endTime: {
                S: endTime.value,
            },
            startTime: {
                S: startTime.value,
            },
        },
    };
    const request = {
        courseid: courseid.value,
        course_name: course_name.value,
        course_description: course_description.value,
        instructor: instructor.value,
        credits: credits.toString(),
        max_cap: max_cap.toString(),
        location: location.value,
        prereq: prereqs.value,
        schedule: schedule
    };

    console.log(JSON.stringify(request));

    try {
        const response = await fetch('https://d3gxk33bye.execute-api.us-east-1.amazonaws.com/Test/insertCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        // Wait for response from Lambda
        const jsonData = await response.json();
        console.log(jsonData);
        const status = jsonData.statusCode;
        console.log(status);

        if (status == 401) {
            alert("ERROR: Course already exists");
        }
        else if (status == 400) {
            alert("ERROR: Check input fields");
        }
        else {
            alert("Successfully added course!");
        }
    } catch (error) {
        console.error('Error', error);
    }
    // I had an issue where my lambda function was returning a 200 response
    // fetch('https://d3gxk33bye.execute-api.us-east-1.amazonaws.com/Test/insertCourse', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(request),
    // })
    // .then(response => {
    //     let y = response.json();
    //     let x = response.status;
    //     console.log(y);
    //     console.log(x);
    //     if (x.ok) {
    //         console.log(ok);
    //     }
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         alert("Failed to add course. Check inputs.");
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     alert("Successfully added course!");
    //     // Log response from lambda
    //     console.log("RESPONSE FROM LAMBDA", data);
    //     document.getElementsByName(addForm)[0].requestFullscreen();
    // })
    // .catch(error => {
    //     // Handle errors
    //     alert("Error: ${error.message}");
    //     console.error('Error:', error);
    // });
    
}
</script>

<style lang="scss" scoped>
/* Style inputs, select elements and textareas */
input[type=text], select, textarea{
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}


/* Style the label to display next to the inputs */
label {
  padding: 6px 6px 6px 0;
  display: inline-block;
}

/* Style the container */
.addCourseContainer {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;

}

/* Floating column for labels: 25% width */
.col-labels {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-input {
  float: left;
  width: 40%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>