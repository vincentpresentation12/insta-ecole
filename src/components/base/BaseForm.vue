<template>
  <!-- Bind 'submit' event to emit 'onSubmit' event -->
  <form 
    class="base-form-component"
    @submit.prevent="onSubmit(cmpFormvalue.fieldsets)"
  >
    <h2 class="title is-size-4">{{cmpFormvalue.title}}</h2>

    <!-- Display DOM loop: v-for -->
    <fieldset 
      class="mb-4"
      v-for="(item, idx) in cmpFormvalue.fieldsets" 
      :key="`item-${idx}`"
    >
      <label 
        class="label"
        :for="`item-${item.name}-${idx}`" 
        v-text="item.label"
      />

      <input 
        class="input"
        :type="item.type" 
        :id="`item-${item.name}-${idx}`" 
        :name="item.name"
        :required="item.required"
        :min="item.min"
        v-model="item.value"
      >
    </fieldset>

    <BaseCallToAction 
      :item="{
        type: `submit`,
        content: cmpFormvalue.submit,
        isfull: true,
        isprimary: true,
      }"
      @onClick="onSubmit(cmpFormvalue.fieldsets)"
    />
  </form>
</template>


<script>
/* 
  TODO: Basic security
  When a user submit a form, we must wait for response and disable form submit.
  - Find a way to clear form value at success
*/
/* 
  [IMPORT] Modules/components
*/
  import BaseCallToAction from './BaseCallToAction.vue';
//

/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'BaseForm',

    /* 
      [VUE] Props
      Data binding from parent component
    */
      props: {
        formvalue: {
          type: Object,
          required: true,
          default: () => {}
        }
      },
    //

    /* 
      [VUE] Computed
      Used to have version of property value
    */
      computed: {
        cmpFormvalue: function(){ return this.formvalue }
      },
    //

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {
        BaseCallToAction
      },
    //

    /* 
      [VUE] Methods
      Used to add functionnalies
    */
      methods: {
        onSubmit: function(fieldsets){
          // Extarct form value
          let returnedObject = {};

          // Get each form fieldset
          for( let item of fieldsets ){
            returnedObject[item.name] = item.value
          }

          // Return computed value
          this.$emit('onSubmit', returnedObject)
        },
      },
    //
  }
//
</script>