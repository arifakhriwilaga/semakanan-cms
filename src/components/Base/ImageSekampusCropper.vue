<template>
  <div>
    <el-dialog title="Upload Image Makanan" :visible.sync="statusModal" :width="widthModal" :append-to-body="true" :lock-scroll="true" :before-close="beforeClose">
      <div class="row">
        <div class="col-md-6">
            <div  class="col-md-8">
            <!-- if the image null -->
            
            <label class="col-md-5" style="font-size:18px;padding-right:0;" v-if="(!result && !image)">Pilih image :</label>
            <input type="file" v-if="(!result && !image)" accept="image/*" class="file col-md-4" name="image" style="padding-left:0;font-size: 1.2em;widht:2px"  @change="uploadImg($event, 1)" value="upload">
            
            <!-- if the image cropped -->
            <label style="font-size:20px;" v-if="(result)">Image hasil crop</label>
            </div>            
            
            <!-- <div class="col-md-4">
            </div>  -->
        </div>  
        
        <div class="col-md-6">
            <!-- if the image null -->
            <!-- <button class="btn btn-fill btn-primary pull-right" @click="update" style="margin-right: 10px;" v-if="(!result && !image)">Close</button> -->
            <button type="submit" v-if="(result)" class="btn btn-fill btn-primary pull-right" style="margin-bottom:25px;margin-left:5px" @click="update(true)" >Simpan</button>                          
            <button class="btn btn-fill btn-primary pull-right" @click="finish('base64')" v-if="(!result && image)" style="margin-left:5px">Crop</button>
            <button type="submit" v-if="(image)" class="btn btn-fill btn-primary pull-right" style="margin-bottom:25px;margin-left:30px" @click="result = '';image = ''">Edit</button>                          

            <button class="btn btn-fill btn-primary pull-right" @click="changeScale(1)" v-if="(!result && image)">+</button>
            <button class="btn btn-fill btn-primary pull-right" @click="changeScale(-1)" v-if="(!result && image)" style="margin-right:10px">-</button>
            
            <!-- if the image cropped -->
            <!-- <button type="submit" v-if="(image)" class="btn btn-fill btn-primary pull-right" style="margin-bottom:25px;margin-right:10px" @click="result = '';image = ''">Edit</button>                           -->
        </div>
        <div class="col-md-12" style="overflow-x: auto;overflow-y: hidden;">            
            <!-- <el-button type="primary" icon="el-icon-upload" v-if="(!form.field.image)" @click="showModal=true;" name="image" v-validate="'required'"> Upload</el-button> -->
            <!-- <input type="file" name="image" accept="image/*" style="font-size: 1.2em; padding: 10px 0;" @change="setImage" /> -->
            <br/>
            <div class="col-md-12" style="width:  100%; height: 500px; margin-bottom: 50px"  v-if="(!result && image)">
            <vueCropper
                ref="cropper"
                :img="image"
                :autoCrop="true"
                :autoCropWidth="width"
                :autoCropHeight="height"
                :outputSize="option.size"
                :outputType="option.outputType"
                :info="true"
                :full="option.full"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :fixedBox="option.fixedBox"
                :original="option.original"
                @realTime="realTime"
              ></vueCropper>
            </div><br/>
            <label style="font-size:20px;margin-left: 500px;" v-if="(!result && !image)">Image kosong</label><br>
            <img :src="imageDefault" v-if="(!result && !image)" style="margin-left: 410px;">

            <img :src="result" style="border: 1px solid gray" alt="Cropped Image" v-if="(result)"/><br/>
        </div>
      </div>
    </el-dialog>
</div>
</template>
<script>
  import VueCropper from 'vue-cropper';
  import Vue from 'vue'
  import {Dialog} from 'element-ui'
  Vue.use(Dialog);
  export default {
    components:{
      VueCropper
    },
    props:{
      statusModal: Boolean,
      width: Number,
      height: Number,
      widthModal: String,
    },
    created() {
      // console.log(this.statusModal);
      // console.log('hallo ari');
    },
    data(){
      return {
        // statusModal: true,
        imageDefault: '/static/img/no-image.png',
        result: null,
        crap: false,
        image: null,
        previews: {},
        option: {
          img: '',
          size: 1,
          full: false,
          outputType: 'png',
          canMove: true,
          fixedBox: true,
          original: true,
          canMoveBox: false,

        },
      }
    },
    methods:{
      beforeClose() {
        this.update('');
        this.clearDataDialog();
      },
      clearDataDialog() {
        this.result = '';
        this.image = '';
      },
      update(status){
        // console.log(status);
        this.$emit('img', (!status) ? status : this.result);
        this.$emit('close');
        this.clearDataDialog();
      },
      changeScale(num) {
        this.$refs.cropper.changeScale(num);
      },
      realTime(data) {
        this.previews = data
      },
      finish(type) {
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            var test = window.open('')
            test.location.href = window.URL.createObjectURL(data)
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.result = data;
          })
        }
        // this.update();
        // alert('Cropped!!!. you can close now');
      },

      down(type) {
        // event.preventDefault()
        var aLink = document.createElement('a')
        aLink.download = 'demo'
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        }
      },

      uploadImg(e, num) {
        //上传图片
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('Upload file type image seperti jpg,jpeg dan png')
          // alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.image = data
          } else if (num === 2) {
            this.image = data
          }
        };
        reader.readAsArrayBuffer(file)

      },

    }
  }
</script>
<style>
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 1200px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
