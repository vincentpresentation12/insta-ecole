<template>
  <button 
    class="base-call-to-action-component button"
    :class="{
      'has-background-primary has-text-white': cmpItem.isprimary,
      'is-fullwidth': cmpItem.isfull,
      'is-small': !cmpItem.isfull,
    }"
    :type="cmpItem.type"
    v-text="cmpItem.content"
    @click.prevent="$emit('onClick', cmpItem.action)"
  />
</template>

<script>

export default {
  name: 'BaseCallToAction',
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