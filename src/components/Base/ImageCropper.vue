<template>
  <div>
    <el-dialog title="Upload Image Makanan" :visible.sync="statusModal" :append-to-body="true" :lock-scroll="true" :width="widthModal" :before-close="beforeClose">
        <div class="row">
        <div class="col-md-6">
            <div  class="col-md-8">
            <!-- if the image null -->
            
            <label class="col-md-5" style="font-size:18px;padding-right:0;" v-if="(!cropImg && !imgSrc)">Pilih image :</label>
            <input type="file" v-if="(!cropImg && !imgSrc)" accept="image/*" class="file col-md-4" name="image" style="padding-left:0;font-size: 1.2em;widht:2px"  @change="setImage" value="upload">
            
            <!-- if the image cropped -->
            <label style="font-size:20px;" v-if="(cropImg)">Image hasil crop</label>
            </div>            
            
            <div class="col-md-4">
            </div> 
        </div>  
        
        <div class="col-md-6">
            <!-- if the image null -->
            <button class="btn btn-fill btn-primary pull-right" @click="cropImage" v-if="(!cropImg && imgSrc)">Crop</button>
            <button class="btn btn-fill btn-primary pull-right" @click="imgSrc = ''" v-if="(!cropImg && imgSrc)" style="margin-right: 10px;">Hapus</button>
            
            <!-- if the image cropped -->
            <button type="submit" v-if="(cropImg)" class="btn btn-fill btn-primary pull-right" style="margin-bottom:25px" @click="saveImage()">Simpan</button>                          
            <button type="submit" v-if="(cropImg)" class="btn btn-fill btn-primary pull-right" style="margin-bottom:25px;margin-right:10px" @click="cropImg = '';imgSrc = ''">Edit</button>                          
        </div>
        <div class="col-md-12" style="overflow-x: auto;overflow-y: hidden;">            
            <!-- <el-button type="primary" icon="el-icon-upload" v-if="(!form.field.image)" @click="showModal=true;" name="image" v-validate="'required'"> Upload</el-button> -->
            <!-- <input type="file" name="image" accept="image/*" style="font-size: 1.2em; padding: 10px 0;" @change="setImage" /> -->
            <br/>
            <div style="width: 100%; height:300px; border: 1px solid gray; display: inline-block;"  v-if="(!cropImg && imgSrc)">
            <vue-cropper
                ref='cropper'
                :guides="true"
                :view-mode="2"
                drag-mode="crop"
                :auto-crop-area="0.5"
                :min-container-width="250"
                :min-container-height="180"
                :background="true"
                :rotatable="true"
                :src="imgSrc"
                alt="Source Image"
                :img-style="{ 'width': '400px', 'height': '300px' }">
            </vue-cropper>
            </div><br/>
            <label style="font-size:20px;margin-left: 500px;" v-if="(!cropImg && !imgSrc)">Image kosong</label><br>
            <img :src="imageDefault" v-if="(!cropImg && !imgSrc)" style="margin-left: 410px;">

            <img :src="cropImg" style="border: 1px solid gray" alt="Cropped Image" v-if="(cropImg)"/><br/>
        </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
  import VueCropper from 'vue-cropperjs';

  export default {
    // components:{
    //   VueCropper
    // },
    props:{
      statusModal: Boolean,
      widthModal: String
    },
    data(){
      return {
        imgSrc: '',
        cropImg: '',
        imageDefault: '/static/img/no-image.png',

        tempImage: {
            thumbnail: '',
            original: ''
        }
        // showModal: true
      }
    },
    created() {
        // console.log('hallo ari');
    },
    methods:{
      clearDataDialog() {
          this.imgSrc = '';
          this.cropImg = '';
          this.tempImage.thumbnail = '';
          this.tempImage.original = '';
      },
      beforeClose() {
        this.updateImage(this.tempImage);
        this.clearDataDialog();
        
      },
      saveImage(){
        this.tempImage.thumbnail = this.cropImg;
        this.tempImage.original = this.cropImg;
        this.updateImage(this.tempImage);
        this.clearDataDialog();
      },
      updateImage(image) {
        this.$emit('updateImg', image);
      },
      setImage(e) {
        const file = e.target.files[0];

        if (!file.type.includes('image/')) {
          alert('Please select an image file');
          return;
        }

        if (typeof FileReader === 'function') {
          const reader = new FileReader();

          reader.onload = (event) => {
            this.imgSrc = event.target.result;
            // rebuild cropperjs with the updated source
            if(this.$refs.cropper) this.$refs.cropper.replace(event.target.result);
          };

          reader.readAsDataURL(file);
        } else {
          alert('Sorry, FileReader API not supported');
        }
      },
      cropImage() {
        // get image data for post processing, e.g. upload or setting image src
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      },
      rotate() {
        // guess what this does :)
        this.$refs.cropper.rotate(90);
      },
    }
  }
</script>
<style>
  /* .modal-mask {
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
} */
</style>
