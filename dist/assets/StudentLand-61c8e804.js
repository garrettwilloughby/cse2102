import{_ as a,o as d,c as i,a as e,t as c,p as l,b as _}from"./index-e17482e7.js";const h={data(){return{firstName:"",lastName:""}},mounted(){const s=localStorage.getItem("loginParams");if(console.log(s),s){const t=JSON.parse(s);this.firstName=t.first,this.lastName=t.last}},methods:{routeToCourses(){this.$router.push("/studentCourses")},routeToSchedule(){this.$router.push("/studentSchedule")},routeToRegistraion(){this.$router.push("/studentRegister")}}},u=s=>(l("data-v-56e55e04"),s=s(),_(),s),p={class:"button-container"},m={class:"welcomeStudent"},S={class:"buttons"},f=u(()=>e("p",null,"My Courses",-1)),g=[f],v=u(()=>e("p",null,"Schedule",-1)),T=[v],C=u(()=>e("p",null,"Register",-1)),N=[C];function b(s,t,k,I,n,o){return d(),i("div",p,[e("h1",m,"Welcome, "+c(n.firstName)+"!",1),e("div",null,[e("div",S,[e("div",{class:"button",onClick:t[0]||(t[0]=(...r)=>o.routeToCourses&&o.routeToCourses(...r))},g),e("div",{class:"button",onClick:t[1]||(t[1]=(...r)=>o.routeToSchedule&&o.routeToSchedule(...r))},T),e("div",{class:"button",onClick:t[2]||(t[2]=(...r)=>o.routeToRegistraion&&o.routeToRegistraion(...r))},N)])])])}const x=a(h,[["render",b],["__scopeId","data-v-56e55e04"]]);export{x as default};
