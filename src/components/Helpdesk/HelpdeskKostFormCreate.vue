<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Helpdesk Kost</h4>
            <button class="btn btn-primary pull-right" @click="listKost()" style="margin-bottom: 15px">List</button>
        </div>

        <!-- Form Input -->
        <div class="col-md-6 card">
            <div class="card-header">
                <div class="card-title"><h4 style="margin-top:10px;">{{mode == 'Add' ? 'Tambah' : 'Ubah'}} Kost</h4></div>
                <hr>
            </div>
            <form v-on:submit.prevent="saveForm">
                <div class="card-content">
                    <div class="row">

                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Nama</label>
                            <input type="text" class="form-control" v-model="kost.name" v-validate="'required'"
                                name="nama">
                            <span>{{ errors.first('nama') }}</span>
                        </div>
                        <div class="form-group">
                            <label>Gambar</label>
                            <input type="file" class="form-control" @change="onFileChanged"
                            name="image"
                            >
                            <img :src="kost.image" v-if="kost.image!=''">
                            <span>{{ errors.first('image') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="">Alamat</label>
                            <textarea id="" cols="15" rows="5" class="form-control"
                                    v-model="kost.address" name="alamat" v-validate="'required'"></textarea>
                            <span>{{ errors.first('alamat') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="">Lokasi</label>
                            <div id="regularMap" class="map"></div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <hr>
                        <div class="form-group">
                            <button type="submit" class="btn btn-fill btn-primary pull-right" style="margin-bottom:25px;" :disabled="isSubmitted">{{mode == 'Add' ? 'Simpan' : 'Update'}}</button>
                        </div>
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
            ImageUpload
        },
        data () {
          return {
            kost: {
              latitude: '',
              longitude: '',
              name: '',
              address: ''
            },
            isSubmitted: false

          }
        },
        created(){
          let kost_id = this.$router.currentRoute.params.id;
          console.log(kost_id);
          if (typeof(kost_id) != "undefined"){
                this.getMerchant(kost_id);
          }
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
            onLoad(avatar) {
              this.kost.image = avatar.src;
            },
            getMerchant(kost_id){
              axios.get(`${SERVER}/api/helpdesk/kosts/${merchant_id}`).then(res => {
                const data = res.data;

                this.kost.name = data.data.name;
                this.kost.image = data.data.image;
                this.kost.address = data.data.address;
                this.kost.latitude = Number(data.data.latitude);
                this.kost.longitude = Number(data.data.longitude);
              }).catch( err => {
//                this.$router.push({ name: 'merchant-list' })
              })
            },
            listKost() {
                this.$router.push({ name: 'helpdesk-kost-list' })
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
                this.kost.latitude = this.markers.getPosition().lat()
                this.kost.longitude = this.markers.getPosition().lng()
            },
            deleteMarkers () {
                this.markers.setMap(null)
                this.markers = null;
            },
            saveForm () {

              this.$validator.validateAll().then(() => {

                if (!this.errors.any()) {

                  this.isSubmitted = true;

                  if (this.$router.currentRoute.params.id) {
                    if (this.kost.image.slice(0, 10) != "data:image") {
                      Vue.delete(this.kost, 'image');
                    };
                    // if (this.image.spli)
                    axios.put('/api/helpdesk/' + this.$router.currentRoute.params.id, this.kost).then(res => {
                      if (res.status == 200) {
                        console.log(res);
                        this.listKost();
                        this.$notify({
                          component: {
                            template: `<span>`+ res.data.meta.message +`</span>`
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
                    });
                  } else {
                    console.log(this.kost);

                    axios.post('/api/helpdesk', this.kost).then(res => {
                      if (res.status == 201) {
                        this.listKost();
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
                      console.log(err.response.data.errors);
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
                    this.kost.image = e.target.result;
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

