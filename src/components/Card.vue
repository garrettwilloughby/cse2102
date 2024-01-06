<template>
    <div class="sqr-button">
        <div class="button-header">
            <h1 class="is-size-5 has-text-weight-bold">{{ adminPage.title }}</h1>
        </div>
        <div class="button-body">
        </div>
    </div>
</template>

<script>
export default {
    name: 'LandingButton',
    props: ['adminPage'],
};
</script>

<style lang="scss" scoped>
.sqr-button {
  background-color: white;
  
  border-radius: 15px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  color: #4a4a4a;
  width: 200px;
  height: 200px;
  //position: relative;
  text-align: center;
  //background-image: url('https://images.pexels.com/photos/4588052/pexels-photo-4588052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-position: center;
  background-image: url('../components/icons/edit.png');
  background-size: 100px;
  background-repeat: no-repeat;
  background-position-y:center;
  transition: scale 0.3s ease;
}

.sqr-button:hover{
    scale: 1.03;
}

</style>