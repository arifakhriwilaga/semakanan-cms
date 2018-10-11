<template>
  <div>
    <el-dialog title="Detil Image" :visible.sync="statusModal" :width="widthModal" :append-to-body="true" :lock-scroll="true" :before-close="beforeClose">
        <div class="row">
            <div class="col-md-12 landscape-div">            
                <img :src="dataImage" style="margin-bottom:60px">
            </div>
        </div>
    </el-dialog>
</div>
</template>
<script>
  import Vue from 'vue'
  import {Dialog} from 'element-ui'
  Vue.use(Dialog);
  export default {
    // components:{
    //   VueCropper
    // },
    props:{
      statusModal: Boolean,
      width: Number,
      height: Number,
      widthModal: String,
      dataImage: String,
    },
    created() {
      // console.log(this.statusModal);
      // console.log('hallo ari');
    },
    data(){
      return {
        // statusModal: true,
        imageDefault: '/static/img/no-image.png',
        // result: null,
        // crap: false,
        // image: null,
        // previews: {},
        // option: {
        //   img: '',
        //   size: 1,
        //   full: false,
        //   outputType: 'png',
        //   canMove: true,
        //   fixedBox: true,
        //   original: true,
        //   canMoveBox: false,

        // },
      }
    },
    methods:{
      beforeClose() {
        this.$emit('closeModal', true);
      },
    //   clearDataDialog() {
    //     this.result = '';
    //     this.image = '';
    //   },
    //   update(status){
    //     // console.log(status);
    //     this.$emit('img', (!status) ? status : this.result);
    //     this.$emit('close');
    //     this.clearDataDialog();
    //   },
    //   changeScale(num) {
    //     this.$refs.cropper.changeScale(num);
    //   },
    //   realTime(data) {
    //     this.previews = data
    //   },
    //   finish(type) {
    //     if (type === 'blob') {
    //       this.$refs.cropper.getCropBlob((data) => {
    //         var test = window.open('')
    //         test.location.href = window.URL.createObjectURL(data)
    //       })
    //     } else {
    //       this.$refs.cropper.getCropData((data) => {
    //         this.result = data;
    //       })
    //     }
    //     // this.update();
    //     // alert('Cropped!!!. you can close now');
    //   },

    //   down(type) {
    //     // event.preventDefault()
    //     var aLink = document.createElement('a')
    //     aLink.download = 'demo'
    //     // 输出
    //     if (type === 'blob') {
    //       this.$refs.cropper.getCropBlob((data) => {
    //         this.downImg = data
    //         aLink.href = data
    //         aLink.click()
    //       })
    //     } else {
    //       this.$refs.cropper.getCropData((data) => {
    //         this.downImg = data
    //         aLink.href = data
    //         aLink.click()
    //       })
    //     }
    //   },

    //   uploadImg(e, num) {
    //     //上传图片
    //     // this.option.img
    //     var file = e.target.files[0]
    //     if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
    //       alert('Upload file type image seperti jpg,jpeg dan png')
    //       // alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
    //       return false
    //     }
    //     var reader = new FileReader()
    //     reader.onload = (e) => {
    //       let data
    //       if (typeof e.target.result === 'object') {
    //         data = window.URL.createObjectURL(new Blob([e.target.result]))
    //       } else {
    //         data = e.target.result
    //       }
    //       if (num === 1) {
    //         this.image = data
    //       } else if (num === 2) {
    //         this.image = data
    //       }
    //     };
    //     reader.readAsArrayBuffer(file)

    //   },

    }
  }
</script>