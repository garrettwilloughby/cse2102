import{_ as P,r as y,j as b,o as a,c as n,g as S,a as s,F as p,f as m,t as r,d as g,p as x,b as w}from"./index-e17482e7.js";const v=i=>(x("data-v-e398c5db"),i=i(),w(),i),D={class:"schedule"},I=v(()=>s("h2",{class:"title"},"Student Schedule",-1)),N={key:0},j=v(()=>s("thead",null,[s("tr",null,[s("th",null,"Time"),s("th",null,"Monday"),s("th",null,"Tuesday"),s("th",null,"Wednesday"),s("th",null,"Thursday"),s("th",null,"Friday")])],-1)),A={key:0},E={key:0,class:"course-block"},F={class:"course-time"},K={class:"course-name"},B="https://d3gxk33bye.execute-api.us-east-1.amazonaws.com/Test/getStudentCourses",C={__name:"StudentSchedule",setup(i){var o;const l={},_=y(!1);let T;const h=localStorage.getItem("loginParams");console.log(h),h&&(T=JSON.parse(h).username),b(async()=>{try{const c=await fetch(`${B}?username=${T}`);if(!c.ok)throw new Error("HTTP error!");o=(await c.json()).body,console.log("STUDENT COURSES:",o);const e=Object.keys(o);for(let t=0;t<e.length;t++){const d=o[e[t]].days.SS;console.log("Printing Days...");for(let u=0;u<o[e[t]].days.SS.length;u++)l[o[e[t]].days.SS[u]]||(l[o[e[t]].days.SS[u]]=[]),l[o[e[t]].days.SS[u]].push({courseKey:e[t],startTime:o[e[t]].startTime.S,endTime:o[e[t]].endTime.S})}console.log("Schedule dict: ",l),_.value=!0}catch(c){console.error(c)}});const M=y(["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00PM"]),f=y(["Monday","Tuesday","Wednesday","Thursday","Friday"]);return(c,k)=>(a(),n("div",D,[I,_.value?(a(),n("h3",N)):S("",!0),s("table",null,[j,s("tbody",null,[(a(!0),n(p,null,m(M.value,e=>(a(),n("tr",{key:e},[s("td",null,r(e),1),g(" "+r(console.log(e))+" ",1),(a(!0),n(p,null,m(f.value,t=>(a(),n("td",{key:t},[g(r(console.log(t))+" ",1),_.value&&l[t]?(a(),n("div",A,[(a(!0),n(p,null,m(l[t],d=>(a(),n("div",{key:d.courseKey},[e>=d.startTime&&e<=d.endTime?(a(),n("div",E,[s("div",F,r(d.startTime)+" - "+r(d.endTime),1),s("div",K,r(d.courseKey),1)])):S("",!0)]))),128))])):S("",!0)]))),128))]))),128))])])]))}},U=P(C,[["__scopeId","data-v-e398c5db"]]);export{U as default};
