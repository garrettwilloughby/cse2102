import{_ as D,r as m,e as b,w as V,o as c,c as r,a,t as l,F as f,f as S,g as J,p as N,b as T,h as O,i as q}from"./index-e17482e7.js";const E="https://d3gxk33bye.execute-api.us-east-1.amazonaws.com/Test/getCourse?courseid=",P="https://d3gxk33bye.execute-api.us-east-1.amazonaws.com/Test/getStudentsEnrolled?courseid=",A={data(){return{toggle:!1}},props:{course:{type:String,required:!0}},setup(e){const t=m([]),n=m([]),o=m(JSON.parse(localStorage.getItem("courseInfoSaved"))||{}),i=async()=>{try{const s=await fetch(`${E}${e.course}`);if(s.ok){const _=await s.json(),h=JSON.parse(_.body);t.value=h,o.value[e.course]=t.value,localStorage.setItem("courseInfoSaved",JSON.stringify(o.value))}else console.error("API request failed:",s.status,s.statusText)}catch(s){console.error("Error during API request:",s)}},u=m(JSON.parse(localStorage.getItem("courseStudentsSaved"))||{}),d=async()=>{try{const s=await fetch(`${P}${e.course}`);if(s.ok){const _=await s.json();u.value[e.course]=_.body,n.value=u.value[e.course].L,localStorage.setItem("courseStudentsSaved",JSON.stringify(u.value))}else console.error("API request failed:",s.status,s.statusText)}catch(s){console.error("Error during API request:",s)}};return b(()=>{i(),d()}),V(()=>o.value,()=>{console.log("Local storage updated:",o.value)}),{existingData:o,props:e,studentVal:n}},methods:{link:function(e){console.log(e),this.$router.push("/course/"+e)},changeToggle:function(){this.toggle=!this.toggle,console.log(this.toggle)}}},k=e=>(N("data-v-1fb2bc9a"),e=e(),T(),e),B={class:"course-title"},M={class:"details"},L={class:"detail"},$={class:"detailDays"},j={class:"detailDaysText"},z={class:"detail"},F={key:0,class:"students"},U={key:0},H=k(()=>a("p",{class:"studentTextTitle"},"No students in the course!",-1)),R=[H],W={key:1},G=k(()=>a("p",{class:"studentTextTitle"},"Students Enrolled:",-1));function K(e,t,n,o,i,u){var d,s,_,h,v,p,I,y,C,x;return c(),r(f,null,[a("div",{class:"course-info",onClick:t[0]||(t[0]=(...g)=>u.changeToggle&&u.changeToggle(...g))},[a("p",B,l(n.course)+" - "+l((s=(d=o.existingData[n.course])==null?void 0:d.Items[0])==null?void 0:s.course_name.S),1),a("div",M,[a("p",L,l((h=(_=o.existingData[n.course])==null?void 0:_.Items[0])==null?void 0:h.location.S),1),a("div",$,[(c(!0),r(f,null,S((p=(v=o.existingData[n.course])==null?void 0:v.Items[0])==null?void 0:p.schedule.M.days.SS,g=>(c(),r("p",j,l(g),1))),256))]),a("p",z,l((y=(I=o.existingData[n.course])==null?void 0:I.Items[0])==null?void 0:y.schedule.M.startTime.S)+" - "+l((x=(C=o.existingData[n.course])==null?void 0:C.Items[0])==null?void 0:x.schedule.M.endTime.S),1)])]),i.toggle?(c(),r("div",F,[!o.studentVal||o.studentVal.length===0?(c(),r("div",U,R)):(c(),r("div",W,[G,(c(!0),r(f,null,S(o.studentVal,(g,w)=>(c(),r("p",{class:"studentText",key:w},l(g.S),1))),128))]))])):J("",!0)],64)}const Q=D(A,[["render",K],["__scopeId","data-v-1fb2bc9a"]]);const X={data(){return{firstName:"",lastName:"",Courses:[],schoolRole:"",currentCredits:0,totalCredits:0}},mounted(){const e=localStorage.getItem("loginParams");if(console.log(e),e){const t=JSON.parse(e);this.firstName=t.first,this.lastName=t.last,this.Courses=t.courses,this.username=t.username,this.password=t.password,this.role=t.role,this.currentCredits=t.currentCredits,this.totalCredits=t.totalCredits}},components:{InstructorCourseCom:Q}},Y=e=>(N("data-v-2cf77c67"),e=e(),T(),e),Z={class:"body"},ee={class:"container"},se={class:"welcome-message"},te=Y(()=>a("p",{class:"welcome-submessage"},"Click on any course to reveal its students!",-1)),oe={class:"courses-container"},ae={class:"course-list"};function ce(e,t,n,o,i,u){const d=O("InstructorCourseCom");return c(),r("div",Z,[a("div",ee,[a("p",se,"Welcome, "+l(i.firstName)+"! Here are your courses.",1),te,a("div",oe,[a("ul",ae,[(c(!0),r(f,null,S(i.Courses,s=>(c(),r("li",{key:s.S,class:"course-item"},[q(d,{course:s.S},null,8,["course"])]))),128))])])])])}const ne=D(X,[["render",ce],["__scopeId","data-v-2cf77c67"]]);export{ne as default};
