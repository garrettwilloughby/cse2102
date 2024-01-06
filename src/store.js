import { createStore } from 'vuex';

export default createStore({
    //data stored
  state: {
    loginParams: {
      username: '',
      password: '',
      courses: [],
      role: '',
      last: '',
      first: '',
      currentCredits: 0,
      totalCredits: 0,
    }
  },
  //allows us to update the state
  mutations: {
    setLoginParams(state, params) {

        //each time function is run, reset loginParams, so after each login.

      state.loginParams = params;
      localStorage.setItem('loginParams', JSON.stringify(params));
    }
  }
});




/* <script>
  //import { createStore } from 'vuex'
  //import EventBus from 'Front-End/src/store.js';

  export default {
      //start by initalizing the data
      data() {
        return {
        loginParams: {
          username: '',
          password: '',
          courses: [],
          role: ''
        }
      };
      },
      methods: {
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
          console.log([username.value, password.value])
  
          const apiUrl = 'https://zdofbsyu1g.execute-api.us-east-1.amazonaws.com/test';
          
          const fetchData = async () => {
            //need to wait for the api fetch to go through
            //pass username to API *make sure querystrings configured on APIgateway
              const response = await fetch(`${apiUrl}?username=${username.value}`);
              //check response
              if (response.ok) {
                //wait until request resolves
                const data = await response.json();
                console.log(data)
                
                
                const body = JSON.parse(data.body);
                const realPassword = body.Items[0].password.S;
                const userRole = body.Items[0].role.S;
                const userCourses = body.Items[0].courses.L;
                
                console.log(realPassword); 
                console.log(password.value);
                console.log(userRole);
                console.log(userCourses);
  
                loginParams = {
                    username: username.value,
                    password: password.value,
                    courses: userCourses,
                    role: userRole
                  };
                
                EventBus.$emit('set-login-params', this.loginParams);
                
                if(realPassword == password.value){
  
                  alert("Welcome.");
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
  
                  return this.loginParams
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
          };
  
  
          fetchData();
          }  
        }  
        }
    };
  </script> */