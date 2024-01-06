<template>
  <div class="login">
    <div class = "loginContainer">
      <div class = "usernameDiv">
        <label>Username: </label>
        <input ref = "username" name = "username">
      </div>
      <div class = "passwordDiv">
        <label>Password: </label>
        <input ref = "password" name = "password" type = "password">
      </div>

      <div class="buttons">

          <a class="button is-dark" @click = "submit">
            <strong>Login</strong>
          </a>
      </div>
    </div>
  </div>


</template>

<script>
import store from '../store';

const apiUrl = 'https://zdofbsyu1g.execute-api.us-east-1.amazonaws.com/test';

export default {
    methods: {
        async fetchData(username, password){
          console.log("fetching")
          //need to wait for the api fetch to go through
          //pass username to API *make sure querystrings configured on APIgateway
            const response = await fetch(`${apiUrl}?username=${username}`);
            //check response
            if (response.ok) {
              //wait until request resolves
              const data = await response.json();
              console.log(data)
              
              
              const body = JSON.parse(data.body);
              const realPassword = body.Items[0].password.S;
              const userRole = body.Items[0].schoolRole.S;
              const userCourses = body.Items[0].courses.L;
              const first = body.Items[0].firstName.S;
              const last = body.Items[0].lastName.S;
              
              console.log(realPassword); 
              console.log(password);
              console.log(userRole);
              console.log(userCourses);

              this.loginParams = {
                  username: username,
                  password: password,
                  courses: userCourses,
                  role: userRole,
                  last: last,
                  first: first
                };
          
              if(realPassword == password){

                //linked to student
                if(userRole == "student"){
                  this.$router.push('/studentLand');
                }
                //linked to instructor
                else if(userRole == "instructor"){
                  this.$router.push('/instructorLand');
                }
                //linked to admin
                else{
                  this.$router.push('/adminLand');
                }
                
              this.$store.commit('setLoginParams', this.loginParams); // Commit the mutation to set loginParams
                
              }


              //false alert, incorrect username or password
              else{
                alert("Incorrect username or password.")
                //reset input
                this.$refs['username'].value = "";
                this.$refs['password'].value = "";
              }

            }
            else{
              throw new Error('HTTP error!')
            }
        },

        submit: function (e){
        
        //DOM to get values
        let username = document.getElementsByName('username')[0]
        let password = document.getElementsByName('password')[0]

        //check if empty
        if(username.value == ""){
          alert("Please do not leave username field blank.")
        }
        else if(password.value == ""){
          alert("Please do not leave password field blank.")
        }
        else{
        //want to request data from data base then direct user based on role associated.
        console.log("Submitted")
        console.log([username.value, password.value]);

        return this.fetchData(username.value, password.value);
      }
        } 
      
      }  
    };
</script>

<style scoped>
.login {
min-height: 85vh;
display: flex;
align-items: center;
justify-content: center;
background-color: #f4f4f4; 
}

.loginContainer {
background-color: rgb(255, 255, 255); 
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 20px; 
border-radius: 10px; 
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
height: 25vh;
width: 45vh;

}

.passwordDiv{
padding-bottom: 25px;
}

</style>
