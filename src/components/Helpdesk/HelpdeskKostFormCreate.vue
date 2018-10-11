<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Helpdesk Kost</h4>
            <button class="btn btn-primary pull-right" @click="listKost()" style="margin-bottom: 15px">List</button>
        </div>

        <!-- Form Input -->
        <div class="col-md-12 card">
            <div class="card-header">
                <div class="card-title"><h4 style="margin-top:10px;">{{mode == 'Add' ? 'Tambah' : 'Ubah'}} Kost</h4></div>
                <hr>
            </div>
            <form v-on:submit.prevent="saveForm">
                <div class="card-content">
                    <div class="row">

                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Nama</label>
                            <input type="text" class="form-control" v-model="form.field.name" v-validate="'required'"
                                name="name">
                            <span>{{ errors.first('name') }}</span>
                        </div>
                        <div class="form-group">
                            <label>Gambar</label>
                            <input type="file" v-if="(!form.field.image)" class="form-control" @change="onFileChanged" name="image" v-validate="'required'">
                            <el-button v-if="(form.field.image)" type="info" class="pull-right" circle style="position: absolute;right: 5px;top: 27px;width:30px;height:30px" @click="form.field.image = ''"> <i class="el-icon-edit" style="left: 8px;top: 8px;position: absolute;"></i></el-button>
                            <img :src="form.field.image" v-if="form.field.image!=''">
                            <span>{{ errors.first('image') }}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="">Alamat</label>
                            <textarea id="" cols="15" rows="5" class="form-control"
                                    v-model="form.field.address" name="address" v-validate="'required'"></textarea>
                            <span>{{ errors.first('address') }}</span>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="">Lokasi</label>
                            <input type="text" class="form-control" id="pac-input" placeholder="Ketik Alamat" style="width:600px!important;background:#fff"><br>
                            <div id="map" class="map"></div>
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
        //   kost: Object
        // },
        components: {
            ImageUpload
        },
        data () {
          return {
            form: {
                field: {
                    latitude: '',
                    longitude: '',
                    name: '',
                    address: '',
                    image: ''
                },
                validation: {
                    messages: {
                        custom: {
                            name: {
                                required: 'Nama tidak boleh kosong'
                            },
                            address: {
                                required: 'Alamat tidak boleh kosong'
                            },
                            image: {
                                required: 'Image tidak boleh kosong'
                            },
                        }
                    }
                }
            
            },
            isSubmitted: false

          }
        },
        created(){
          if (this.$router.currentRoute.params.id){
                this.getKost();
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
              this.form.field.image = avatar.src;
            },
            getKost(){
              axios.get(`${SERVER}/api/helpdesk/kosts/${this.$router.currentRoute.params.id}`).then(res => {
                const data = res.data;

                this.form.field.name = data.data.name;
                this.form.field.image = data.data.image;
                this.form.field.address = data.data.address;
                this.form.field.latitude = Number(data.data.latitude);
                this.form.field.longitude = Number(data.data.longitude);
                this.createSearchBar(this.form.field.latitude, this.form.field.longitude);

              }).catch( err => {
//                this.$router.push({ name: 'kost-list' })
              })
            },
            listKost() {
                this.$router.push({ name: 'helpdesk-kost-list' })
            },
            createSearchBar(latitude, longitude) {
                const myLatlng = new window.google.maps.LatLng(latitude, longitude);
                const mapOptions = {
                    zoom: 15,
                    center: myLatlng,
                    scrollwheel: false // we disable de scroll over the map, it is a really annoing when you scroll through page
                }

                this.map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
                this.markers = new window.google.maps.Marker({position:myLatlng});
                this.markers.setMap(this.map);

                var input = document.getElementById('pac-input');
                var searchBox = new window.google.maps.places.SearchBox(input);
                this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                var tempMap = this.map

                // Bias the SearchBox results towards current map's viewport.
                this.map.addListener('bounds_changed', function() {
                    searchBox.setBounds(tempMap.getBounds());
                });

                var markers = [];
                var tempForm = this.form;
                var originalMarker = this.markers;

                // Listen for the event fired when the user selects a prediction and retrieve
                // more details for that place.
                searchBox.addListener('places_changed', function() {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach(function(marker) {
                    marker.setMap(null);
                });
                markers = [];
                // console.log(originalMarker);
                if(originalMarker) {
                    originalMarker.setMap(null);
                    originalMarker = null;
                }
                // For each place, get the icon, name and location.
                var bounds = new window.google.maps.LatLngBounds();

                places.forEach(function(place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    
                    // Create a marker for each place.
                    markers.push(new window.google.maps.Marker({
                        map: tempMap,
                        // icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }));
                    tempForm.field.latitude = markers[0].getPosition().lat();
                    tempForm.field.longitude = markers[0].getPosition().lng();
                    
                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                    tempMap.fitBounds(bounds);  
                });
                
                this.map.addListener('click', event => {
                    markers.forEach(function(marker) {
                        marker.setMap(null);
                    });
                    markers = [];
                    if (originalMarker) {
                        originalMarker.setMap(null);
                        originalMarker = null;
                    } 
                    originalMarker = new window.google.maps.Marker({
                        position: event.latLng,
                        map: tempMap
                    })
                    tempForm.field.latitude = originalMarker.getPosition().lat()
                    tempForm.field.longitude = originalMarker.getPosition().lng()
                });
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
                this.form.field.latitude = this.markers.getPosition().lat()
                this.form.field.longitude = this.markers.getPosition().lng()
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
                    if (this.form.field.image.slice(0, 10) != "data:image") {
                      Vue.delete(this.kost, 'image');
                    };
                    // if (this.image.spli)
                    axios.put('/api/helpdesk/kosts' + this.$router.currentRoute.params.id, this.form.field).then(res => {
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

                    axios.post('/api/helpdesk/kosts', this.form.field).then(res => {
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
                    this.form.field.image = e.target.result;
                };
            }
        },
        mounted () {
            GoogleMapsLoader.load((google) => {
                this.createSearchBar(-6.914744, 107.609810);
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

