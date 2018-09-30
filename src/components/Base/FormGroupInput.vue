<template>
  <form-group :error_message="error_message"
              :label="label"
              :label_size="label_size"
              :content_size="input_size"
  >

        <input class="form-control border-input"
               v-bind="$attrs"
               :value="value"
               @input="$emit('input',$event.target.value)">

  </form-group>
</template>
<script>
  import FormGroup from './FormGroup.vue';

  export default {
    name: 'fg-input',
    inheritAttrs: false,
    components:{
      FormGroup
    },
    props: {
      value: [String, Number],
      label: String,
      error_message: String,
      label_size: {
        default: 3,
        type: Number
      },
      input_size: {
        default: 9,
        type: Number
      }
    },
    computed:{
      labelClasses(){
        return 'col-md-' + this.label_size;
      },
      inputClasses(){
        return 'col-md-' + this.input_size;
      }
    }
  }
</script>
<style>

</style>
