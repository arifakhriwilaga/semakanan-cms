<template>
    <div class="form-group" :class="{'has-error': error_message}">
        <label v-if="label" class="control-label" :class="labelClasses">
            {{label}}
        </label>
        <div :class="inputClasses">
            <textarea class="form-control border-input"
                   v-bind="$attrs"
                   :value="value"
                   @input="$emit('input',$event.target.value)">

            </textarea>
            <span>{{ error_message }}</span>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'fg-input',
    inheritAttrs: false,
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
