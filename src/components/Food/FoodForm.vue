<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Makanan</h4>
            <button class="btn btn-primary pull-right" @click="listFood()" style="margin-bottom: 15px">List</button>
        </div>

        <div class=" col-md-6 card">
          <div class="card-header">
            <h4 class="card-title">
              {{(!this.$router.currentRoute.params.id) ? 'Tambah' : 'Ubah'}} Makanan
            </h4>
          </div>
          <form class="form-horizontal" v-on:submit.prevent="onSubmit">
            <div class="card-content">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="">Nama</label>
                  <input type="text" class="form-control" v-model="form.field.name" name="name" v-validate="'required'" minlength="3" maxlength="100" :disabled="isSubmitted">
                  <span class="msg-error">{{ errors.first('name') }}</span>
                </div>
                <!-- <form-group-input
                  :error_message="errors.first('name')"
                  :label="'Name'" type="text" placeholder="Name"
                  minlength="3" maxlength="100" v-model="food.name"
                  :disabled="isSubmitted"></form-group-input> -->
                <div class="form-group">
                  <label for="">Merchant</label>
                  <el-select style="padding-right:0px;padding-left:0px;width:100%" class="select-primary"
                          size="large"
                          placeholder="Pilih Merchant"
                          v-model="form.field.merchant_id" name="merchant_id" v-validate="'required'">
                      <el-option v-for="option in merchant_options"
                                  class="select-danger"
                                  :value="option.value"
                                  :label="option.label"
                                  :key="option.value">
                      </el-option>
                  </el-select>
                  <span class="msg-error">{{ errors.first('merchant_id') }}</span>
                </div>

                <div class="form-group">
                  <label for="">Tipe</label>
                  <el-select style="padding-right:0px;padding-left:0px;width:100%" class="select-primary"
                          size="large"
                          placeholder="Pilih Tipe Makanan"
                          v-model="form.field.type_id" name="type_id" v-validate="'required'">
                      <el-option v-for="option in food_type_options"
                                  class="select-danger"
                                  :value="option.id"
                                  :label="option.type"
                                  :key="option.id">
                      </el-option>
                  </el-select>
                  <span class="msg-error">{{ errors.first('type_id') }}</span>
                </div>
                <!-- <div :class="{'form-group': true, 'has-error': errors.first('merchant_id') }"><label
                  class="col-md-3 control-label">Merchant</label>
                    <el-select class="select-primary"
                                size="large"
                                placeholder="Pilih Merchant"
                                v-model="food.merchant_id">
                      <el-option v-for="option in merchant_options"
                                  class="select-danger"
                                  :value="option.value"
                                  :label="option.label"
                                  :key="option.value">
                      </el-option>
                    </el-select>
                    <span>{{ errors.first('merchant_id') }}</span>
                </div> -->
                <!-- <div :class="{'form-group': true, 'has-error': errors.first('description') }"><label
                  class="col-md-3 control-label">Description</label>
                  <div class="col-md-9">
                    <textarea class="form-control" v-model="food.description"></textarea>
                    <span>{{ errors.first('description') }}</span>
                  </div>
                </div> -->
                <div class="form-group">
                    <label for="">Deskripsi</label>
                    <textarea cols="15" rows="5" class="form-control"
                            v-model="form.field.description" name="description" v-validate="'required'"></textarea>
                    <span class="msg-error">{{ errors.first('description') }}</span>
                </div>
                <div class="form-group">
                  <label for="">Harga</label>
                  <input type="number" class="form-control" v-model="form.field.price" name="price" v-validate="'required'" placeholder="contoh: 47000" minlength="3" maxlength="100" :disabled="isSubmitted">
                  <span class="msg-error">{{ errors.first('price') }}</span>
                </div>
                <div class="form-group">
                  <label for="">Harga Merchant</label>
                  <input type="number" class="form-control" v-model="form.field.m_price" name="m_price" v-validate="'required'" placeholder="contoh: 47000" minlength="3" maxlength="100" :disabled="isSubmitted">
                  <span class="msg-error">{{ errors.first('m_price') }}</span>
                </div>
                <!-- <form-group-input
                  :error_message="errors.first('price')"
                  label="Price" type="number" placeholder="contoh: 45000"
                  minlength="3" maxlength="100" v-model="food.price"
                  :disabled="isSubmitted"></form-group-input>
                <form-group-input
                  :error_message="errors.first('m_price')"
                  label="Merchant Price" type="number" placeholder="contoh: 47000"
                  minlength="3" maxlength="100" v-model="food.m_price"

                  :disabled="isSubmitted"></form-group-input> -->
                
                <div class="form-group">
                    <label>Gambar</label>
                    <button type="button" class="btn btn-fill btn-primary" v-if="(!form.field.image)" @click="showModal=true" name="image" v-validate="'required'">Upload</button>
                    <!-- <input type="file" v-if="(!form.field.image)" class="form-control" @change="onFileChanged" name="image" v-validate="'required'"> -->
                    <el-button v-if="(form.field.image)" type="info" class="pull-right" circle style="position: absolute;right: 5px;top: 27px;width:30px;height:30px" @click="form.field.image = ''"> <i class="el-icon-edit" style="left: 8px;top: 8px;position: absolute;"></i></el-button>
                    <img :src="form.field.image" v-if="(form.field.image)">
                    <span class="msg-error">{{ errors.first('image') }}</span>
                    <!-- <image-cropper :widthModal="'1150px'" :statusModal="showModal"   @updateImg="getImage($event)"></image-cropper> -->
                    <image-sekampus-cropper :width="980" :height="290" :widthModal="'1150px'" :statusModal="showModal" @close="getStatusClose($event)" @img="setImage($event)"></image-sekampus-cropper>
                </div>
              </div>
              <div class="col-sm-12">
                <hr>
                <button type="submit" class="btn btn-fill btn-primary pull-right" style="margin-bottom:25px;" :disabled="isSubmitted">{{(!this.$router.currentRoute.params.id) ? 'Simpan' : 'Update'}}</button>
              </div>
            </div>
            
          </form>
        </div>

        <spinner :showSpinner="statusSpinner" :class="'spinner-dashboard'"></spinner>
    </div>
</template>
<script>
  import axios from 'axios';
  import Vue from 'vue';
  import swal from 'sweetalert2'

  import FormGroupInput from 'src/components/Base/FormGroupInput';
  import ImageSekampusCropper from 'src/components/Base/ImageSekampusCropper';
  import ImageCropper from 'src/components/Base/ImageCropper';
  
  export default {
    components: {
      FormGroupInput,
      ImageSekampusCropper,
      ImageCropper
    },
    data(){
      return{
        showModal: false,
        form: {
          field: {
              merchant_id: '',
              type_id: '',
              name: '',
              description: '',
              price: '',
              m_price: '',
              image: '',
              // id: ''
          },
          validation: {
              messages: {
                  custom: {
                      merchant_id: {
                          required: 'Merchant tidak boleh kosong'
                      },
                      type_id: {
                          required: 'Tipe tidak boleh kosong'
                      },
                      name: {
                          required: 'Nama tidak boleh kosong'
                      },
                      description: {
                          required: 'Deskripsi tidak boleh kosong'
                      },
                      price: {
                          required: 'Harga tidak boleh kosong'
                      },
                      m_price: {
                          required: 'M Harga tidak boleh kosong'
                      },
                      image: {
                          required: 'Image tidak boleh kosong'
                      }
                      // description: {
                      //     required: 'Deskripsi tidak boleh kosong'
                      // }
                  }
              }
          }
        },
        merchant_options: [],
        food_type_options: [
          {id: 1, type:'Food'},
          {id: 2, type:'Drink'},
          {id: 3, type:'Snack'}
        ],
        isSubmitted: false
      }
    },
    created() {
      this.$validator.localize('id', this.form.validation.messages); // set custom messages
      this.getRelatedData();      
      // this.statusSpinner = false;
      // if (this.$router.currentRoute.params.id) {
      //   this.getFood();
      // }
    },
    methods:{
      // GET RELATED DATA
      getRelatedData(){
        this.statusSpinner = true;
        this.merchant_options = [];
        axios.get(`/api/merchants`).then(res => {
          if (this.$router.currentRoute.params.id) {
            this.getFood();
          }
          for (let index = 0; index < res.data.data.length; index++) {
            this.merchant_options.push({
              value: res.data.data[index].id,
              label: res.data.data[index].name
            });
          }
          

          this.error = false;
          this.statusSpinner = false;
        }).catch((err) => {console.log(err);this.statusSpinner = false; this.showModalError()});
      },
      getFood(){
        this.statusSpinner = true;
        this.form = {
          field: {
            merchant_id: '',
            name: '',
            description: '',
            price: '',
            m_price: '',
            type_id: '',
            image: '',
            // id: ''
          }
        }
        axios.get('/api/foods/' + this.$router.currentRoute.params.id).then(res=>{
          
          this.form.field.description = res.data.data.description;
          this.form.field.m_price = res.data.data.m_price;
          this.form.field.name = res.data.data.name;
          this.form.field.price = res.data.data.price;
          this.form.field.image = res.data.data.image;
          this.form.field.merchant_id = res.data.data.merchant.id;
          for (let index = 0; index < this.food_type_options.length; index++) {
            if(this.food_type_options[index].type ==  res.data.data.type)
            this.form.field.type_id = this.food_type_options[index].id;
          }
          
          this.statusSpinner = false

        }).catch((err) => {this.statusSpinner = false; this.showModalError()});
      },

      // ACTION
      onSubmit(){
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.isSubmitted = true;
            this.statusSpinner = true;
            if (this.$router.currentRoute.params.id) {
              if (this.form.field.image.slice(0, 10) != "data:image") {
                Vue.delete(this.form.field, 'image');
              };
              // if (this.image.spli)
              axios.put('/api/foods/' + this.$router.currentRoute.params.id, this.form.field).then(res => {
                if (res.status == 200) {
                  
                  this.$notify({
                  component: {
                      template: `<span>`+ res.data.meta.message +`</span>`
                  },
                  icon: 'ti-alert',
                  horizontalAlign: 'right',
                  verticalAlign: 'top',
                  type: 'success'
                  });
                }
                this.isSubmitted = false;
                this.statusSpinner = false;
                this.listFood();
              }).catch(err => {
                // console.log('error')
                  this.isSubmitted = false;
                  this.statusSpinner = false;
                  this.$notify({
                    component: {
                      template: `<span>Terjadi kesalahan!</span>`
                    },
                    icon: 'ti-alert',
                    horizontalAlign: 'right',
                    verticalAlign: 'top',
                    type: 'danger'
                  })
                  this.getRelatedData();
              });
            } else {
              axios.post('/api/foods', this.form.field).then(res => {
                this.$notify({
                  component: {
                    template: `<span>Data berhasil disimpan</span>`
                  },
                  icon: 'ti-alert',
                  verticalAlign: 'top',
                  horizontalAlign: 'right',
                  type: 'success'
                });
                this.listFood();
              }).catch(err=>{
                this.isSubmitted = false;
                this.statusSpinner = false;
                this.getRelatedData();
                this.$notify({
                  component: {
                    template: `<span>Terjadi kesalahan</span>`
                  },
                  icon: 'ti-alert',
                  horizontalAlign: 'right',
                  verticalAlign: 'top',
                  type: 'danger'
                });
                let messages = err.response.data.errors;
                let keys = Object.keys(messages);
                for (let i = 0; i < keys.length; i++) {
                  this.errors.add(keys[i], messages[keys[i]][0]);
                }

              });
            }
          }
        });
      },

      // OTHERS
      setImage(val){
        // if(val) {
          this.form.field.image = val;
        // }
      },
      listFood() {
        this.$router.push({ name: 'food-list' })
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
          
            // this.created();
          
          }, function (dismiss) {
              // this code dismiss condition
          });
          
      },
      getStatusClose($event){
        this.showModal = false
      },
      getImage() {
        this.showModal = false
      }
    },
    // mounted() {
    //   this.getRelatedData();
    // }
  }
</script>
