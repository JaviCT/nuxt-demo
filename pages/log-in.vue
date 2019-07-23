<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs8 sm8 md8>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field v-model="formUsername" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field v-model="formPassword" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    middleware: 'anonymous',
    data: () => ({
      drawer: null,
      formError: null,
      formUsername: '',
      formPassword: ''
    }),
    props: {
      source: String
    },
    methods: {
      async login () {
        try {
          await this.$store.dispatch('login', {
            username: this.formUsername,
            password: this.formPassword
          })
          this.formUsername = ''
          this.formPassword = ''
          this.formError = null
        } catch (e) {
          this.formError = e.message
        }
      },
      async logout () {
        try {
          await this.$store.dispatch('logout')
        } catch (e) {
          this.formError = e.message
        }
      }
    }
  }
</script>
