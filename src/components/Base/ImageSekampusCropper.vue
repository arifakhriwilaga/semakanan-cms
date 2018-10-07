<template>
  <div name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <div class="test-button" style="margin-bottom: 10px">
                  <label class="btn" for="uploads">upload</label>
                  <input type="file" id="uploads" style="clip:rect(0 0 0 0);"
                         accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
                  <button @click="finish('base64')" type="button" class="btn">Crop</button>
                  <button @click="changeScale(1)" class="btn">+</button>
                  <button @click="changeScale(-1)" class="btn">-</button>
                <button class="btn btn-fill btn-primary" type="button" @click="update">
                  Close
                </button>
                </div>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="col-md-12" style="width:  100%; height: 500px; margin-bottom: 50px">

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
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">

            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VueCropper from 'vue-cropper';
  export default {
    components:{
      VueCropper
    },
    props:{
      showModal: Boolean,
      width: Number,
      height: Number
    },
    data(){
      return {
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
      update(){
        this.$emit('img', this.result);
        this.$emit('close');
        this.$sidebar.toggleMinimize();

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

        alert('Cropped!!!. you can close now');
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
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
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
