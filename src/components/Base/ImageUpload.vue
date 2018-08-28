<template>
    <div class="form-">
        <form-group :label="label" :error_message="errors.first('image')">
            <input type="file" accept="image/*" class="form-control"
                   @change="onChange"
                   >
        </form-group>
        <form-group :label="label_preview">
            <div v-if="href">
                <img :src="href" width="100%"/>
                <button type="button" @click="removeImage" class="close-thik"></button>
            </div>
        </form-group>
    </div>
</template>
<script>
  import FormGroup from 'src/components/Base/FormGroup.vue'

  export default {
    components:{
      FormGroup
    },
    props: {
      label: String,
      url: String,
    },
    data(){
      return{
        href: ''
      }
    },
    computed:{
      label_preview(){
        return this.label + " " + 'preview'
      },
    },
    watch: {
      url: function(){
        this.href = this.url
      }
    },
    methods: {
      onChange(e) {
        if (!e.target.files.length) return;

        let file = e.target.files[0];

        let reader = new FileReader();


        reader.onload = e => {
          let src = e.target.result;
          this.href = src;
          this.$emit('loaded', {src, file});
        };

        reader.readAsDataURL(file);

      },
      removeImage: function (e) {
        this.href = '';
        let src = this.href;
        let file = null;
        this.$emit('loaded', {src, file});
      },

    }
  }
</script>
<style>
[class*='close-'] {
  color: red;
  font: 14px/100% arial, sans-serif;
  position: absolute;
  right: 5px;
  text-decoration: none;
  text-shadow: 0 1px 0 #fff;
  top: 5px;
}

  .close-thik:after {
  content: '✖'; /* UTF-8 symbol */
}
</style>
