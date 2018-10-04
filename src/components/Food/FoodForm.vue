<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Makanan</h4>
            <button class="btn btn-primary pull-right" @click="listFood()" style="margin-bottom: 15px">List</button>
        </div>

        <div class=" col-md-6 card">
            <div class="card-header">
              <h4 class="card-title">
                {{food.id == "" ? 'Tambah' : 'Ubah'}} Makanan
              </h4>
            </div>
            <form class="form-horizontal" v-on:submit.prevent="onSubmit">
              <div class="card-content">
                <div class="col-sm-12">
                  <form-group-input
                    :error_message="errors.first('name')"
                    :label="'Name'" type="text" placeholder="Name"
                    minlength="3" maxlength="100" v-model="food.name"
                    :disabled="isSubmitted"></form-group-input>

                  <div :class="{'form-group': true, 'has-error': errors.first('merchant_id') }"><label
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
                  </div>
                  <div :class="{'form-group': true, 'has-error': errors.first('description') }"><label
                    class="col-md-3 control-label">Description</label>
                    <div class="col-md-9">
                      <textarea class="form-control" v-model="food.description"></textarea>
                      <span>{{ errors.first('description') }}</span>
                    </div>
                  </div>
                  <form-group-input
                    :error_message="errors.first('price')"
                    label="Price" type="number" placeholder="contoh: 45000"
                    minlength="3" maxlength="100" v-model="food.price"
                    :disabled="isSubmitted"></form-group-input>
                  <form-group-input
                    :error_message="errors.first('m_price')"
                    label="Merchant Price" type="number" placeholder="contoh: 47000"
                    minlength="3" maxlength="100" v-model="food.m_price"

                    :disabled="isSubmitted"></form-group-input>

                  <div :class="{'form-group': true, 'has-error': errors.first('image') }"><label
                    class="col-md-3 control-label">Image</label>
                    <div class="col-md-9">
                      <button type="button" class="btn btn-fill btn-primary"
                              @click="showModal=true; $sidebar.toggleMinimize()">Upload
                      </button>
                      <img :src="food.image"/>
                      <span>{{ errors.first('image') }}</span>
                    </div>
                  </div>
                  <image-sekampus-cropper :width="980" :height="290"
                                          v-if="showModal" @close="showModal = false" @img="setImage($event)"
                  >
                  </image-sekampus-cropper>
                </div>
                <div class="col-sm-12">
                  <hr>
                  <button type="submit" class="btn btn-fill btn-primary pull-right" style="margin-bottom:25px;" :disabled="isSubmitted">{{!food.id ? 'Simpan' : 'Update'}}</button>
                </div>
              </div>
              <!-- <div class="card-footer">
                  <div class="form-group"><label class="col-md-3"></label>
                      <div class="col-md-9">
                          <button type="submit" class="btn btn-fill btn-info" :disabled="isSubmitted">
                              {{ food.id == "" ? "Add" : "Update" }}
                          </button>
                      </div>
                  </div>
              </div> -->
            </form>
        </div>
    </div>
</template>
<script>
  import axios from 'axios';
  import Vue from 'vue';

  import FormGroupInput from 'src/components/Base/FormGroupInput';
  import ImageSekampusCropper from 'src/components/Base/ImageSekampusCropper';

  export default {
    components: {
      FormGroupInput,
      ImageSekampusCropper
    },
    data(){
      return{
        showModal: false,
        food: {
          merchant_id: null,
          name: null,
          description: null,
          price: null,
          m_price: null,
          type_id: 1,
          image: null,
          id: ""
        },
        tempFood: {},
        merchant_options: [],
        isSubmitted: false
      }
    },
    created() {
      let food_id = this.$router.currentRoute.params.id;
      if (typeof(food_id) != "undefined") {
        this.getFood(food_id)
      }
    },
    methods:{
      setImage(val){
        this.food.image = val;
      },
      getFood(food_id){
        axios.get('/api/foods/' + food_id).then(res=>{
          // console.log('food please');
          // console.log(res);
          this.food.description = res.data.data.description;
          this.food.m_price = res.data.data.m_price;
          this.food.name = res.data.data.name;
          this.food.price = res.data.data.price;
          this.food.image = res.data.data.image;
          this.tempFood = res.data.data;

        });
      },
      onSubmit(){
        this.isSubmitted = true;

        if (this.$router.currentRoute.params.id) {
          if (this.food.image.slice(0, 10) != "data:image") {
            Vue.delete(this.food, 'image');
          };
          // if (this.image.spli)
          axios.put('/api/foods/' + this.$router.currentRoute.params.id, this.food).then(res => {
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
            this.listFood();
          }).catch(err => {
              // console.log('error')
              this.$notify({
                component: {
                  template: `<span>Terjadi kesalahan!</span>`
                },
                icon: 'ti-alert',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'danger'
              })
              this.isSubmitted = false;
              this.listFood();
          });
        } else {
          axios.post('/api/foods', this.food).then(res => {
            this.$notify({
              component: {
                template: `<span>Data berhasil disimpan</span>`
              },
              icon: 'ti-alert',
              verticalAlign: 'top',
              horizontalAlign: 'right',
              type: 'success'
            });
            this.$router.push({name: 'food-list'})
          }).catch(err=>{
            this.isSubmitted = false;
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
      },
      listFood() {
        this.$router.push({ name: 'food-list' })
      },
    },
    mounted() {
      axios.get(`/api/merchants`).then(res => {
        // console.log(res.data.data);
        for (let index = 0; index < res.data.data.length; index++) {
          // console.log(res.data.data[index].id);
          this.merchant_options.push({
            value: res.data.data[index].id,
            label: res.data.data[index].name
          });
        }
        // console.log('hi guys');
        this.food.merchant_id = this.tempFood.merchant.id;

        this.error = false;
      })
    }
  }
</script>
