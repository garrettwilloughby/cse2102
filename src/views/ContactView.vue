<template>
<div class = "body">
  <div class = "emailContainer">
  <div class="emails">
    Email:<br>
    <!-- our emails lol -->
    <div class="list-emails">
      jonathan.vann@uconn.edu<br>
      garrett.willoughby@uconn.edu<br>
      haoyu.2.zhang@uconn.edu<br> 
      zijiang.zhao@uconn.edu<br>
    </div>
  </div>
  </div>
</div>
</template>


<script setup>
</script>


<style scoped>

.body{
  height: 80vh;
  background-color: whitesmoke;
}

.emails {
font-size: 2rem;
font-weight: bold;
color: black;
display: flex;
flex-direction: column; 
align-items: center; 
justify-content: center; 
padding-top: 90px;
}

.list-emails {
text-align: center; 
font-size: 1rem;
}
</style>
