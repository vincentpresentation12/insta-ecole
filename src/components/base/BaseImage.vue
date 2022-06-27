<template>
  <figure class="base-image-component">
      <figcaption class="mb-5">
        <h2 class="is-size-4">{{cmpItem.title}}</h2>
        <p class="is-size-6">{{cmpItem.caption}}</p>
      </figcaption>

      <BaseCallToActionVue 
        :item="{
          type: `button`,
          content: `Ouvrir`,
          isfull: false,
          isprimary: false,
        }"
        @onClick="$emit( 'onDisplaySnapshoot', cmpItem.id )"
      />
  </figure>
</template>

<script>
import BaseCallToActionVue from './BaseCallToAction.vue'
export default {
  name: 'BaseImage',

  components: {
    BaseCallToActionVue
  },

  /* 
    [VUE] Props
    Data binding from parent component
  */
    props: {
      item: {
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
      cmpItem: function(){ return this.item }
    },
  //
}
</script>