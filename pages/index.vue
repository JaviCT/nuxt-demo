<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
    <img
      src="/v.png"
      alt="Vuetify.js"
      class="mb-5"
    >
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import axios from 'axios'

export default {
  layout: 'blog',
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  created() {
    //this.getCameras()
  },
  methods: {
    getCameras() {
      let myitems = []
      axios.get(process.env.API_URL + 'cameras',{
        params: {
          api_id: this.$store.state.authUser.api_id,
          api_key: this.$store.state.authUser.api_key
        }
      })
      .then(function (response) {
        // handle success
        let aux = response.data.cameras
        aux.forEach(function (arrayItem) {
          myitems.push({
            icon: 'videocam',
            title: arrayItem.name,
            to: '/camera/' + arrayItem.id
          })
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
      this.items = myitems
    },
  }
}
</script>
