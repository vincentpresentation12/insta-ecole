<template>
  <section class="home-view-component section">
    <article 
      class="box"
      v-if="!$store.getters.userinfo"
    >
      <!-- Inject value to child compoenent has a HTML property -->
      <BaseForm 
        class="mb-4"
        :formvalue="cmpStep === 'login' ? cmpLoginForm : cmpRegisterForm"
        @onSubmit="onSubmit(cmpStep, $event)"
      />
      
      <!-- Bind DOM event: @Event -->
      <BaseCallToAction 
        :item="{
          type: `button`,
          content: 
            cmpStep === 'login'
            ? `Don't have an account? Create one now.`
            : `Got an account? Go to login.`,
          isfull: false,
          isprimary: false,
          action: cmpStep === 'login' ? 'register' : 'login'
        }"
        @onClick="cmpStep = $event"
      />
    </article>
    <article 
      class="box"
      v-else
    >
      <h1 class="is-size-4">Bienvenue {{ $store.getters.userinfo.name }}</h1>
    </article>
  </section>
</template>

<script>
/* 
  [IMPORT] Modules/components
*/
  import BaseForm from '../components/base/BaseForm.vue';
  import BaseCallToAction from '../components/base/BaseCallToAction.vue';
//

/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'HomeView',

    // Used to define properties class
    data(){
      return {
        // Basic values
        cmpStep: 'login',

        // Form values
        cmpLoginForm: {
          title: `Connect to your account`,
          submit: `Login`,
          fieldsets: [
            {
              label: `Email`,
              type: `email`,
              name: `email`,
              required: true,
              min: 5,
              value: 'julien@dwsapp.io'
            },
            {
              label: `Password`,
              type: `password`,
              name: `password`,
              required: true,
              min: 5,
              value: 'azertyuiop'
            }
          ]
        },
        cmpRegisterForm: {
          title: `Create your account`,
          submit: `Register`,
          fieldsets: [
            {
              label: `Name`,
              type: `text`,
              name: `name`,
              required: true,
              min: 2,
              value: 'Julien Noyer'
            },
            {
              label: `Email`,
              type: `email`,
              name: `email`,
              required: true,
              min: 5,
              value: 'julien@dwsapp.io'
            },
            {
              label: `Password`,
              type: `password`,
              name: `password`,
              required: true,
              min: 5,
              value: 'azertyuiop'
            },
            {
              label: `Repeate password`,
              type: `password`,
              name: `password-repeate`,
              required: true,
              min: 5,
              value: 'azertyuiop'
            }
          ]
        }
      }
    },

    /* 
      [VUE] Methods
      Used to add functionnalies
    */
      methods: {
        onSubmit: function(step, event){
          // Check register form
          if( step === 'register' ){
            if( event.password === event['password-repeate'] ){
              // Delete unused property
              delete event['password-repeate'];

              // Use store action
              this.$store.dispatch('registerOperation', event)
            }
            else{ alert(`Password missmatch`) }
          }
          else{
            // Use store action
            this.$store.dispatch('loginOperation', event)
          }
        },
      },
    //

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {
        BaseForm, BaseCallToAction
      }
    //
  }
//
</script>