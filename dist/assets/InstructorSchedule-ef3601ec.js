import{_ as P,r as y,j as I,o as a,c as n,g as S,a as s,F as p,f as m,t as u,d as T,p as x,b}from"./index-e17482e7.js";const v=i=>(x("data-v-25ed37e9"),i=i(),b(),i),w={class:"schedule"},D=v(()=>s("h2",{class:"title"},"Instructor Schedule",-1)),N={key:0},j=v(()=>s("thead",null,[s("tr",null,[s("th",null,"Time"),s("th",null,"Monday"),s("th",null,"Tuesday"),s("th",null,"Wednesday"),s("th",null,"Thursday"),s("th",null,"Friday")])],-1)),A={key:0},C={key:0,class:"course-block"},F={class:"course-time"},K={class:"course-name"},O="https://d3gxk33bye.execute-api.us-east-1.amazonaws.com/Test/getStudentCourses",B={__name:"InstructorSchedule",setup(i){var o;const l={},_=y(!1);let g;const h=localStorage.getItem("loginParams");console.log(h),h&&(g=JSON.parse(h).username),I(async()=>{try{const c=await fetch(`${O}?username=${g}`);if(!c.ok)throw new Error("HTTP error!");o=(await c.json()).body,console.log("INSTRUCTOR COURSES:",o);const e=Object.keys(o);for(let t=0;t<e.length;t++){const r=o[e[t]].days.SS;console.log("Printing Days...");for(let d=0;d<o[e[t]].days.SS.length;d++)console.log(o[e[t]].days.SS[d]),l[o[e[t]].days.SS[d]]||(l[o[e[t]].days.SS[d]]=[]),l[o[e[t]].days.SS[d]].push({courseKey:e[t],startTime:o[e[t]].startTime.S,endTime:o[e[t]].endTime.S})}console.log("Schedule dict: ",l),_.value=!0}catch(c){console.error(c)}});const M=y(["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00PM"]),f=y(["Monday","Tuesday","Wednesday","Thursday","Friday"]);return(c,k)=>(a(),n("div",w,[D,_.value?(a(),n("h3",N)):S("",!0),s("table",null,[j,s("tbody",null,[(a(!0),n(p,null,m(M.value,e=>(a(),n("tr",{key:e},[s("td",null,u(e),1),T(" "+u(console.log(e))+" ",1),(a(!0),n(p,null,m(f.value,t=>(a(),n("td",{key:t},[T(u(console.log(t))+" ",1),_.value&&l[t]?(a(),n("div",A,[(a(!0),n(p,null,m(l[t],r=>(a(),n("div",{key:r.courseKey},[e>=r.startTime&&e<=r.endTime?(a(),n("div",C,[s("div",F,u(r.startTime)+" - "+u(r.endTime),1),s("div",K,u(r.courseKey),1)])):S("",!0)]))),128))])):S("",!0)]))),128))]))),128))])])]))}},R=P(B,[["__scopeId","data-v-25ed37e9"]]);export{R as default};