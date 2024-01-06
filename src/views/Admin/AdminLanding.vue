<template>
    <div class = "admin-landing">
        <section class="adminContainer">  <!-- "hero is-primary" is an already established class with pre-defined styles! See in bulma-->
            <div class = "welcomeBody">
                <h1 class = "welcomeAdmin">Greetings, Administrator {{ firstName }} {{ lastName }}</h1>
            </div>
        </section>
        <div class="button-container">
            <div class="columns is-multiline">
            <div class="buttons">
                <div v-for="adminPage in adminPages" :adminPage="adminPage" :key="adminPage.id" class="admin-button">
                    <router-link :to="'/admin/' + adminPage.id">
                        <Card :adminPage="adminPage"/>
                    </router-link>
                </div>
            </div>
            </div>
            <!-- <div class="columns is-multiline">
                <div
                  v-for="adminPage in adminPages"
                  :adminPage="adminPage"
                  :key="adminPage.id"
                  class="column is-one-quarter"
                >
                    <router-link :to="adminPage.id">
                        <Card :adminPage="adminPage" />
                    </router-link>
                </div>
            </div> -->
        </div>
    </div>
</template>


<script>
import Card from '../../components/Card.vue';

export default {
    components: {
        Card,
    },
    data() {
      return {
        firstName: '',
        lastName: '',
        adminPage: {},
        adminPages: [
          {
            id: 101,
            title: "Browse Courses",
          },
          {
            id: 102,
            title: "Add Course"
          },
        ],
      };
    },
    mounted() {
    //get stored data from local storage
    const storedData = localStorage.getItem('loginParams');
    console.log(storedData);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.firstName = parsedData.first;
      this.lastName = parsedData.last;
    }
  }
};

</script>

<style lang="scss" scoped>

    .adminContainer{
        background-color: navy;
        color: white;
    }

    .welcomeAdmin{
        font-size: 25px;
        margin-bottom: 20px;
        font-weight: bolder;
        text-align: center;
        transition: color 0.3s ease;
        padding-top: 20px;
        
    }

    .welcomeBody{
        text-align: center;
        align-items: center;
        justify-content: center;
        border: 2px solid rgb(0, 0, 0);
    }
    .welcomeAdmin:hover {
        color: rgb(0, 169, 124);
    }
    .button-container{
        text-align: center;
        align-items: center;
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: whitesmoke;
        height: 80vh;
    }
    .buttons {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-bottom: 50%;
    }
    .admin-button {
        flex: 1;
        margin: 0 40px;
        //border: 2px solid #301d1d;
        border-radius: 10px;
    }

    h1 {
        font-size: large;
    }

</style>
