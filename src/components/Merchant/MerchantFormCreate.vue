<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Merchant</h4>
            <button class="btn btn-primary pull-right" @click="listMerchant()" style="margin-bottom: 15px">List</button>
        </div>

        <!-- Form Input -->
        <div class="col-md-12 card">
            <div class="card-header">
                <div class="card-title"><h4 style="margin-top:10px;">{{mode == 'Add' ? 'Tambah' : 'Ubah'}} Merchant</h4></div>
                <hr>
            </div>
            <form v-on:submit.prevent="saveForm">
                <div class="card-content">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>Nama</label>
                            <input type="text" class="form-control" v-model="merchant.name" v-validate="'required'"
                                name="nama">
                            <span>{{ errors.first('nama') }}</span>
                        </div>

                        <div class="form-group">
                            <label>Gambar</label>
                            <input type="file" class="form-control" @change="onFileChanged"
                            name="image"
                            >
                            <img :src="merchant.image" v-if="merchant.image!=''">
                            <span>{{ errors.first('image') }}</span>
                        </div>

                        <div class="form-group">
                            <label for="">Nama Pemilik</label>
                            <input type="text" class="form-control" v-model="merchant.owner" v-validate="'required'"
                            name="pemilik"
                            >
                            <span>{{ errors.first('pemilik') }}</span>
                        </div>

                        <div class="form-group">
                            <label for="">No. Telepon</label>
                            <input type="text" class="form-control" v-model="merchant.phone"  v-validate="'required'"
                            name="phone"
                            >
                            <span>{{ errors.first('phone') }}</span>
                        </div>

                        <div class="form-group">
                            <label for="">Waktu Buka</label>
                            <div class="form-group">
                                <el-time-select
                                        v-model="merchant.open_time"
                                        :picker-options="{
                                    start: '00:00',
                                    step: '00:15',
                                    end: '23:59'
                                    }"
                                        name="jam_buka"
                                        v-validate="'required'"
                                        placeholder="Pilih Waktu Buka">
                                </el-time-select>
                                <span>{{ errors.first('jam_buka') }}</span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="">Waktu Tutup</label>
                            <div class="form-group">
                                <el-time-select
                                        v-model="merchant.close_time"
                                        :picker-options="{
                                    start: '00:00',
                                    step: '00:15',
                                    end: '23:59'
                                    }"
                                        name="jam_tutup"
                                        v-validate="'required'"
                                        placeholder="Pilih Waktu Tutup">
                                </el-time-select>
                                <span>{{ errors.first('jam_tutup') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <!-- <div class="card"> -->
                            <!-- <div class="card-content"> -->
                                <div class="form-group">
                                    <label for="">Alamat</label>
                                    <textarea name="" id="" cols="15" rows="5" class="form-control"
                                            v-model="merchant.address" name="address" v-validate="'required'"></textarea>
                                    <span>{{ errors.first('address') }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="">Deskripsi</label>
                                    <textarea cols="15" rows="5" class="form-control"
                                            v-model="merchant.description" name="description" v-validate="'required'"></textarea>
                                    <span>{{ errors.first('description') }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="">Lokasi</label>
                                    <div id="regularMap" class="map"></div>
                                </div>
                            <!-- </div> -->
                        <!-- </div> -->
                    </div>
                    <div class="col-sm-12">
                        <hr>
                        <div class="form-group">
                            <button type="submit" class="btn btn-fill btn-primary pull-right" style="margin-bottom:25px;" :disabled="isSubmitted">{{mode == 'Add' ? 'Simpan' : 'Update'}}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    let SERVER = process.env.HOST_URL;

    import {API_KEY} from 'src/components/Dashboard/Views/Maps/API_KEY'
    import GoogleMapsLoader from 'google-maps'
    import axios from 'axios'
    import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'

    import ImageUpload from 'src/components/Base/ImageUpload';

    GoogleMapsLoader.KEY = API_KEY


    export default {
        // props:{
        //   merchant: Object
        // },
        components: {
            [TimeSelect.name]: TimeSelect, ImageUpload
        },
        data () {
          return {
            merchant: {
              latitude: '',
              longitude: '',
              name: '',
              address: '',
              owner: '',
              image: '',
              phone: '',
              open_time: '',
              close_time: '',
              description: ''
            },
            isSubmitted: false

          }
        },
        created(){
          let merchant_id = this.$router.currentRoute.params.id;
          if (typeof(merchant_id) != "undefined"){
                this.getMerchant(merchant_id);
          }
        },
        computed: {
          mode(){
            if (this.$router.currentRoute.params.id){
              return "Update";
            }else{
              return "Add"
            }
          }
        },
        methods: {
            onLoad(avatar) {
              this.merchant.image = avatar.src;
            },
            getMerchant(merchant_id){
              axios.get(`${SERVER}/api/merchants/${merchant_id}`).then(res => {
                const data = res.data;

                this.merchant.info = data.data.info;
                this.merchant.name = data.data.name;
                this.merchant.image = data.data.image;
                this.merchant.address = data.data.address;
                this.merchant.owner = data.data.owner;
                this.merchant.phone = data.data.phone;
                this.merchant.latitude = Number(data.data.latitude);
                this.merchant.longitude = Number(data.data.longitude);
                this.merchant.open_time = data.data.open_time;
                this.merchant.close_time = data.data.close_time;

                // set map
                const myLatlng = new window.google.maps.LatLng(this.merchant.latitude, this.merchant.longitude)
                const mapOptions = {
                    zoom: 15,
                    center: myLatlng,
                    scrollwheel: false // we disable de scroll over the map, it is a really annoing when you scroll through page
                }

                this.map = new window.google.maps.Map(document.getElementById('regularMap'), mapOptions)
                this.markers = new window.google.maps.Marker({position:myLatlng});
                this.markers.setMap(this.map);
                this.map.addListener('click', event => {
                    this.addMarker(event.latLng)
                });

              }).catch( err => {
//                this.$router.push({ name: 'merchant-list' })
              });
            },
            listMerchant() {
                this.$router.push({ name: 'merchant-list' });
            },
            initRegularMap (google, location) {
                // Regular Map
                const myLatlng = new window.google.maps.LatLng(-6.914744, 107.609810);
                const mapOptions = {
                    zoom: 15,
                    center: myLatlng,
                    scrollwheel: false // we disable de scroll over the map, it is a really annoing when you scroll through page
                }

                this.map = new window.google.maps.Map(document.getElementById('regularMap'), mapOptions);
                
                this.markers = new window.google.maps.Marker({position:myLatlng});
                this.markers.setMap(this.map);

                this.merchant.latitude = this.markers.getPosition().lat()
                this.merchant.longitude = this.markers.getPosition().lng()

                this.map.addListener('click', event => {
                    this.addMarker(event.latLng)
                });
            },
            addMarker (location) {
                if (this.markers) {
                    this.deleteMarkers()
                }
                this.markers = new window.google.maps.Marker({
                    position: location,
                    map: this.map
                })
                this.merchant.latitude = this.markers.getPosition().lat()
                this.merchant.longitude = this.markers.getPosition().lng()
            },
            deleteMarkers () {
                this.markers.setMap(null)
                this.markers = null;
            },
            saveForm () {

              this.$validator.validateAll().then(() => {
                // console.log(this.errors.any());
                if (!this.errors.any()) {

                  this.isSubmitted = true;

                  if (this.$router.currentRoute.params.id) {
                    if (this.merchant.image.slice(0, 10) != "data:image") {
                      Vue.delete(this.merchant, 'image');
                    };
                    // if (this.image.spli)
                    axios.put('/api/merchants/' + this.$router.currentRoute.params.id, this.merchant).then(res => {
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
                        this.listMerchant();
                      }
                    }).catch(err => {
                        console.log('error')
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
                    });
                  } else {
                    axios.post('/api/merchants', this.merchant).then(res => {
                      if (res.status == 201) {
                        this.listMerchant();
                        this.$notify({
                          component: {
                            template: `<span>Data berhasil disimpan!</span>`
                          },
                          icon: 'ti-alert',
                          horizontalAlign: 'right',
                          verticalAlign: 'top',
                          type: 'success'
                        })
                      }
                    }).catch(err => {
                    //   console.log(err.response.data.errors);
                      let messages = err.response.data.errors;
                      let keys = Object.keys(messages);
                      for (let i = 0; i < keys.length; i++) {
                        this.errors.add(keys[i], messages[keys[i]][0]);
                      }

                      this.$notify({
                        component: {
                          template: `<span>` + err.response.data.message + `<br>Lengkapi semua fields</span>`
                        },
                        icon: 'ti-alert',
                        horizontalAlign: 'right',
                        verticalAlign: 'top',
                        type: 'danger'
                      })
                      this.isSubmitted = false;
                    });
                  }
                }
              });


            },
            onFileChanged (e) {
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.merchant.image = e.target.result;
                };
            }
        },
        mounted () {
            GoogleMapsLoader.load((google) => {
                this.initRegularMap(google)
            })
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

