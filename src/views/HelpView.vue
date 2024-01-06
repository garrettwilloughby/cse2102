<template>
  <div class = "background">
    <p class = "text">This is for you to offer US help, we are desperate.</p>
  </div>
</template>

<style lang="scss" scoped>
.background {
  position: relative;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.6); /* White text with 80% opacity */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 90px;
  background-image: url("johnSleding.jpg");
  background-size: cover;
  background-position: center;
  height: 80vh;
}

.background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2); /* Black overlay with 20% opacity */
}

.text {
  color: white; /* White text color */
  z-index: 1; /* Ensure text is above the overlay */
}


</style>