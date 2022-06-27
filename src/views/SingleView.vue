<template>
  <section class="single-view-component section" v-if="cmpSingleItem">
    <template v-if="['snapshoot', 'album'].indexOf($route.params.type) !== -1">
      <article class="box"  v-if="$route.params.type === 'snapshoot'">
        <h1 class="is-size-2">{{ cmpSingleItem.title }}</h1>
        <p>{{ cmpSingleItem.caption }}</p>
      </article>

      <article class="box" v-if="$route.params.type === 'album'">
        <h1 class="is-size-2">Album view</h1>
        <!-- 
          TODO: Display list of album snapshoots
          - Get all lbum snapshoots
          - Generate a loop 'v-for' on snapshoot list
          - Display 'BaseImage' for each snapshoot
          - Link to display single snapshoot
        -->
      </article>
    </template>
    <template v-else>
      <article class="box">
        <h1 class="is-size-2">404</h1>
      </article>
    </template>
  </section>
</template>

<script>
import { dexieDb } from '@/services/dexie.service'
/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'SingleView',

    // Used to define properties class
    data(){
      return {
        cmpSingleItem: null,
      }
    },

    /* 
      [VUE] Methods
      Used to add functionnalies
    */
      methods: {
        
      },
    //

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {},
    //

    mounted: async function(){
      /* 
        [DEXIE] Save
        Save API response in Dexie
      */
        // Save new snapshot in IndexDB with Dexie.js
        this.cmpSingleItem = await dexieDb.snapshoots.get( +this.$route.params.id );
        if(!this.cmpSingleItem){
          this.$router.push({ name: 'DashboardView' })
        }
      //
    }
  }
//
</script>