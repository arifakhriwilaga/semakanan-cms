<template>
    <div class="col-md-12">
        <div class="card">
            <form class="form-horizontal" v-on:submit.prevent="onSubmit">
                <div class="card-header"><h4 class="card-title">
                    {{food.id == "" ? 'Menambahkan Makanan' : 'Ubah Makanan'}}
                </h4></div>
                <div class="card-content">
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
                                   :key="option.label">
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
                <div class="card-footer">
                    <div class="form-group"><label class="col-md-3"></label>
                        <div class="col-md-9">
                            <button type="submit" class="btn btn-fill btn-info" :disabled="isSubmitted">
                                {{ food.id == "" ? "Add" : "Update" }}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
  import axios from 'axios';

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
          console.log('food please');
          console.log(res);
          this.food = res.data.data;
        });
      },
      onSubmit(){
        this.isSubmitted = true;

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
    mounted() {
      axios.get(`/api/merchants`).then(res => {
        console.log(res.data.data);
        for (let index = 0; index < res.data.data.length; index++) {
          this.merchant_options.push({
            value: res.data.data[index].id,
            label: res.data.data[index].name
          });
        }
        this.error = false;
      })
    }
  }
</script>
