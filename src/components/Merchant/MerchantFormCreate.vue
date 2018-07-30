<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Form {{mode}} Merchant</h4>
            <button class="btn btn-primary pull-right" @click="listMerchant()" style="margin-bottom: 15px">List</button>
        </div>

        <!-- Form Input -->
        <form v-on:submit.prevent="saveForm">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-xs-12">
                                <h4 class="card-title">
                                    Form {{mode}}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Nama</label>
                                    <input type="text" class="form-control" v-model="merchant.name" v-validate="'required'"
                                           name="nama">
                                    <span>{{ errors.first('nama') }}</span>
                                </div>
                                <div class="form-group">
                                    <label>Gambar</label>
                                    <input type="file" class="form-control" @change="onFileChanged" v-validate="'required'"
                                    name="image"
                                    >
                                    <span>{{ errors.first('image') }}</span>
                                </div>

                                <div class="form-group">
                                    <label for="">Pemilik</label>
                                    <input type="text" class="form-control" v-model="merchant.owner" v-validate="'required'"
                                    name="pemilik"
                                    >
                                    <span>{{ errors.first('pemilik') }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="">No. Telepon</label>
                                    <input type="text" class="form-control" v-model="merchant.phone"  v-validate="'required'"
                                    name="telepon"
                                    >
                                    <span>{{ errors.first('telepon') }}</span>
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
                                <div class="form-group">
                                    <button type="submit" class="btn btn-fill btn-primary" :disabled="isSubmitted">
                                      {{mode}} Merchant</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">

                    </div>
                    <div class="card-content">
                        <div class="form-group">
                            <label for="">Alamat</label>
                            <textarea name="" id="" cols="30" rows="10" class="form-control"
                                      v-model="address" name="alamat" v-validate="'required'"></textarea>
                            <span>{{ errors.first('alamat') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="">Lokasi</label>
                            <div id="regularMap" class="map"></div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

    let SERVER = process.env.HOST_URL;

    import {API_KEY} from 'src/components/Dashboard/Views/Maps/API_KEY'
    import GoogleMapsLoader from 'google-maps'
    import axios from 'axios'
    import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
    GoogleMapsLoader.KEY = API_KEY


    export default {
        props:{
          merchant: Object
        },
        components: {
            [TimeSelect.name]: TimeSelect
        },
        data () {
            return {
                map: '',
                markers: '',
                latitude: '',
                longitude: '',
                name: '',
                address: '',
                owner: '',
                image: '',
                phone: '',
                open_time: '',
                close_time: '',
                isSubmitted: false
            }
        },
        created(){
          // let merchant_id = this.$router.currentRoute.params.id;
          // if (merchant_id != "undefined"){
          //       this.getMerchant(merchant_id)
          // }
        },
        computed: {
          mode(){
            if (this.$router.currentRoute.params.id){
              return "Update"
            }else{
              return "Add"
            }
          }
        },
        methods: {
            getMerchant(merchant_id){
              axios.get(`${SERVER}/api/merchant/${merchant_id}`).then(res => {
                const data = res.data;

                this.name = data.data.name;
                this.image = data.data.image;
                this.address = data.data.address;
                this.owner = data.data.owner;
                this.phone = data.data.phone;
                this.latitude = Number(data.data.latitude);
                this.longitude = Number(data.data.longitude);
                this.open_time = data.data.open_time;
                this.close_time = data.data.close_time;
              }).catch( err => {
//                this.$router.push({ name: 'merchant-list' })
              })
            },
            listMerchant() {
                this.$router.push({ name: 'merchant-list' })
            },
            initRegularMap (google) {
                // Regular Map
                const myLatlng = new window.google.maps.LatLng(-6.914744, 107.609810)
                const mapOptions = {
                    zoom: 8,
                    center: myLatlng,
                    scrollwheel: false // we disable de scroll over the map, it is a really annoing when you scroll through page
                }

                this.map = new window.google.maps.Map(document.getElementById('regularMap'), mapOptions)

                this.map.addListener('click', event => {
                    this.addMarker(event.latLng)
                })
            },
            addMarker (location) {
                if (this.markers) {
                    this.deleteMarkers()
                }
                this.markers = new window.google.maps.Marker({
                    position: location,
                    map: this.map
                })
                this.latitude = this.markers.getPosition().lat()
                this.longitude = this.markers.getPosition().lng()
            },
            deleteMarkers () {
                this.markers.setMap(null)
                this.markers = null;
            },
            saveForm () {

              this.$validator.validateAll().then(() => {

                if (!this.errors.any()) {

                  this.isSubmitted = true;

                  var formData = new FormData();
                  formData.append('name', this.name);
                  formData.append('image', this.image);
                  formData.append('address', this.address);
                  formData.append('phone', this.phone);
                  formData.append('owner', this.owner);
                  formData.append('latitude', this.latitude);
                  formData.append('longitude', this.longitude);
                  formData.append('open_time', this.open_time);
                  formData.append('close_time', this.close_time);

                  axios.post(SERVER + '/api/merchant/create', formData).then(res => {
                    if (res.status == 200 || res.status == 201){
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
                  })
                }
              });


            },
            onFileChanged (event) {
                this.image = event.target.files[0];
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

