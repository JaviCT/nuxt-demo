<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="$store.state.authUser"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      v-if="$store.state.authUser"
      :clipped-left="clipped"
      fixed
      app
    >
      <v-btn-toggle>
        <v-btn
          @click.stop="miniVariant = !miniVariant"
        >
          Live view
        </v-btn>
        <v-btn
          @click.stop="miniVariant = !miniVariant"
        >
          Recordings
        </v-btn>
        <v-btn
          @click.stop="miniVariant = !miniVariant"
        >
          Sharing
        </v-btn>
        <v-btn
          @click.stop="miniVariant = !miniVariant"
        >
          Details
        </v-btn>
        <v-btn
          @click.stop="miniVariant = !miniVariant"
        >
          Archives
        </v-btn>
        <v-btn
          @click.stop="miniVariant = !miniVariant"
        >
          Snapmail
        </v-btn>
        <v-btn
          @click.stop="miniVariant = !miniVariant"
        >
          Compare
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-if="$store.state.authUser"
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>
              compare_arrows
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      v-if="$store.state.authUser"
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  created() {
    this.getCameras()
  },
  methods: {
    getCameras() {
      let myitems = []
      axios.get(process.env.apiUrl + 'cameras',{
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
