import{_ as c,o as n,c as d,a as e,t as l,p as i,b as _}from"./index-e17482e7.js";const p={data(){return{firstName:"",lastName:""}},mounted(){const t=localStorage.getItem("loginParams");if(console.log(t),t){const s=JSON.parse(t);this.firstName=s.first,this.lastName=s.last}},methods:{routeToCourses(){this.$router.push("/InstructorCourses")},routeToSchedule(){this.$router.push("/InstructorSchedule")},routeToStudentList(){this.$router.push("/StudentList")}}},u=t=>(i("data-v-25977e00"),t=t(),_(),t),h={class:"button-container"},m={class:"welcomeInstructor"},S={class:"buttons"},f=u(()=>e("p",null,"Courses",-1)),I=[f],v=u(()=>e("p",null,"Schedule",-1)),C=[v];function N(t,s,T,g,a,o){return n(),d("div",h,[e("h1",m,"Welcome, "+l(a.firstName)+"!",1),e("div",null,[e("div",S,[e("div",{class:"button",onClick:s[0]||(s[0]=(...r)=>o.routeToCourses&&o.routeToCourses(...r))},I),e("div",{class:"button",onClick:s[1]||(s[1]=(...r)=>o.routeToSchedule&&o.routeToSchedule(...r))},C)])])])}const k=c(p,[["render",N],["__scopeId","data-v-25977e00"]]);export{k as default};
