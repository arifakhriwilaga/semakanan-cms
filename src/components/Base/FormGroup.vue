<template>
    <div class="form-group" :class="{'has-error': error_message}">
        <label v-if="label" class="control-label" :class="labelClasses">
            {{label}}
        </label>
        <div :class="contentClasses" style="text-align: left">
            <slot></slot>
            <span>{{ error_message }}</span>
        </div>
    </div>
</template>
<script>
  export default {
    data(){
      return {
      }
    },
    props:{
      value:[String, Number],
      error_message:{
        type: String,
        default: null
      },
      label:{
        type: [Number, String],
        default: ''
      },
      label_size:{
        type: [Number, String],
        default: 3
      },
      content_size:{
        type: [Number, String],
        default: 9
      }
    },
    computed:{
      labelClasses(){
        return 'col-md-' + this.label_size;
      },
      contentClasses(){
        return 'col-md-' + this.content_size;
      }
    }

  }
</script>