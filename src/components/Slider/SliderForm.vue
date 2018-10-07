<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Slider</h4>
            <button class="btn btn-primary btn-fill pull-right" style="margin-bottom: 15px" @click="listSlider()">List </button>
        </div>

        <!-- Form Input -->
        <div class="col-md-6 card">      
          <div class="card-header">
              <div class="card-title"><h4 style="margin-top:10px;">{{(!this.$router.currentRoute.params.id) ? 'Tambah' : 'Ubah'}} Slider</h4></div>
            <hr>
          </div>

          <form v-on:submit.prevent="saveForm">
            <div class="card-content">
              <div class="col-sm-12">
                <div class="form-group">
                    <label for="">Caption</label>
                    <input type="text" v-model="form.field.caption" v-validate="'required'" name="caption" class="form-control">
                    <span class="msg-error">{{ errors.first('caption') }}</span>
                </div>
                <div class="form-group">
                    <label for="">Tipe</label> <br />
                    <el-select class="select-primary"
                            size="large"
                            placeholder="Pilih Tipe"
                            v-model="form.field.type" v-validate="'required'" name="type">
                        <el-option v-for="option in type_options"
                                    class="select-primary"
                                    :value="option.value"
                                    :label="option.label"
                                    :key="option.label">
                        </el-option>
                    </el-select><br>
                    <span class="msg-error">{{ errors.first('type') }}</span>
                </div>
                <div class="form-group">
                    <label>Gambar</label>
                    <input type="file" v-if="(!form.field.image)" class="form-control" @change="onFileChanged" accept="image/jpeg" v-validate="'required'" name="image">
                    <el-button v-if="(form.field.image)" type="info" class="pull-right" circle style="position: absolute;right: 5px;top: 27px;width:30px;height:30px" @click="form.field.image = ''"> <i class="el-icon-edit" style="left: 8px;top: 8px;position: absolute;"></i></el-button>
                    <img :src="form.field.image" v-if="(form.field.image)" />
                    <span class="msg-error">{{ errors.first('image') }}</span>
                </div>
              </div>

              <div class="col-sm-12">
                <hr>
                  <div class="form-group">
                      <button type="submit" class="btn btn-fill btn-primary pull-right" style="margin-bottom:25px;" :disabled="isSubmitted">{{(!this.$router.currentRoute.params.id) ? 'Simpan' : 'Update'}}</button>
                  </div>
              </div>
            </div>
          </form>
        </div>

        <spinner :showSpinner="statusSpinner" :class="'spinner-dashboard'"></spinner>
    </div>
</template>

<script>
    import axios from 'axios';
    import SliderService from './SliderService';
    import Vue from 'vue';

    import { Select} from 'element-ui'

    let sliderService = new SliderService();
    export default {
      components: {
        [Select.name]: Select,
      },
      created() {
        this.$validator.localize('id', this.form.validation.messages); // set custom messages

        if (typeof(this.$router.currentRoute.params.id) != "undefined"){
          this.getSlider()
        }
      },
      data() {
        return {
          // clearImage: {},
          isSubmitted: false,
          statusSpinner: false,
          tempData: {},
          form: {
            field: {
                caption: '',
                type: '',
                image: ''
            },
            validation: {
                messages: {
                    custom: {
                        caption: {
                            required: 'Caption tidak boleh kosong'
                        },
                        type: {
                            required: 'Tipe tidak boleh kosong'
                        },
                        image: {
                            required: 'Image tidak boleh kosong'
                        },
                    }
                }
            }
          
          },
          type_options: [
            { value: 'home', label: 'Home' },
            { value: 'semakanan', label: 'seMakanan' },
          ],
        }
      },
      // watch: {
      //   clearImage: function(){
      //     this.form.field.image = '';
      //     // return this.form.field.image;
      //     // console.log(this.form.field.image)
      //   }
      // },
      computed:{
        label: function(){
          if (!this.$router.currentRoute.params.id) {
            return "Add Slider"
          }else{
            return "Update Slider"
          }
        }
      },
      methods: {
        // GET RELATED DATA
        getSlider() {
          this.statusSpinner = true
          axios.get(`/api/sliders/` + this.$router.currentRoute.params.id).then(res => {
            this.form.field = res.data.data;
            this.title = res.data.meta.message;
            this.statusSpinner = false;
          }).catch(err => {
            this.$notify({
              component: {
                template: `<span>Terjadi kesalahan!</span>`,
              },
              icon: 'ti-alert',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'danger'
            })
          }).catch((err) => {this.statusSpinner = false; this.showModalError()});;
        },

        // ACTION
        saveForm() {
          this.$validator.validateAll().then((result) => {
            if (result) {
              this.isSubmitted = true;
              this.statusSpinner = true;

              if (!this.$router.currentRoute.params.id) {
                axios.post('/api/sliders', this.form.field).then(res => {
                  this.statusSpinner = false
                  this.$notify({
                    component: {
                      template: `<span>Data berhasil disimpan</span>`
                    },
                    icon: 'ti-alert',
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    type: 'success'
                  });
                  this.listSlider();
                
                }).catch(err => {

                  let messages = err.response.data.errors;
                  if(messages !== undefined) {
                    let keys = Object.keys(messages);
                    for (let i = 0; i < keys.length; i++) {
                      this.errors.add(keys[i], messages[keys[i]][0]);
                    }
                  }

                  this.$notify({
                    component: {
                      template: `<span>Terjadi kesalahan</span>`
                    },
                    icon: 'ti-alert',
                    horizontalAlign: 'right',
                    verticalAlign: 'top',
                    type: 'danger'
                  })
                  this.isSubmitted = false;
                  this.statusSpinner = false;
                  this.getSlider();
                })
              } else {
                
                Vue.delete(this.form.field, 'id');
                if (this.form.field.image.slice(0, 10) != "data:image") {
                  Vue.delete(this.form.field, 'image');
                };
                
                axios.put('/api/sliders/' + this.$router.currentRoute.params.id, this.form.field).then(res => {
                  this.$notify({
                    component: {
                      template: `<span>Data berhasil disimpan</span>`
                    },
                    icon: 'ti-alert',
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    type: 'success'
                  });
                  this.statusSpinner = false;
                  this.listSlider();
                }).catch(err => {
                
                  let messages = err.response.data.errors;
                  if(messages !== undefined) {
                    let keys = Object.keys(messages);
                    for (let i = 0; i < keys.length; i++) {
                      this.errors.add(keys[i], messages[keys[i]][0]);
                    }
                  }

                  this.$notify({
                    component: {
                      template: `<span>Terjadi kesalahan</span>`
                    },
                    icon: 'ti-alert',
                    horizontalAlign: 'right',
                    verticalAlign: 'top',
                    type: 'danger'
                  })
                  this.isSubmitted = false;
                  this.statusSpinner = false;
                  this.getSlider();
                })
              }
            }
          });
        },

        // OTHERs
        listSlider() {
          this.$router.push({name: 'slider-list-semakanan'})
        },
        onFileChanged(e) {
          if (!e.target.files.length) return;
          //
          // this.form.field.image  = e.target.files[0];
          let file = e.target.files[0];

          let reader = new FileReader();


          reader.onload = e => {
            let src = e.target.result;
            this.form.field.image = src;
            this.$emit('loaded', {src, file});
          };

          reader.readAsDataURL(file);

        },
        showModalError(){
            swal({
            title: 'Terjadi kesalahan',
            text: 'Retry request',
            type: 'error',
            confirmButtonClass: 'btn btn-info btn-fill',
            cancelButtonClass: 'btn btn-danger btn-fill',
            showCancelButton: true,
            buttonsStyling: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel',
            }).then(() => {
            
                this.getSlider();
            
            }, function (dismiss) {
                // this code dismiss condition
            });
            
        }
      }
    }
</script>

<style scoped>
    .form-group {
        margin-bottom: 20px !important
    }

    label {
        margin-bottom: 4px !important
    }
</style>
