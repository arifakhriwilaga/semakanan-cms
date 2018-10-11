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
                            <input type="text" class="form-control" v-model="form.field.name" v-validate="'required'"
                                name="name">
                            <span class="msg-error">{{ errors.first('name') }}</span>
                        </div>

                        <div class="form-group">
                            <label for="">Nama Pemilik</label>
                            <input type="text" class="form-control" v-model="form.field.owner" v-validate="'required'"
                            name="owner"
                            >
                            <span class="msg-error">{{ errors.first('owner') }}</span>
                        </div>

                        <div class="form-group">
                            <label for="">No. Telepon</label>
                            <input type="text" class="form-control" v-model="form.field.phone"  v-validate="'required'"
                            name="phone"
                            >
                            <span class="msg-error">{{ errors.first('phone') }}</span>
                        </div>

                        <div class="form-group">
                            <label>Gambar</label><br>
                            <input type="file" v-if="(!form.field.image)" class="form-control" @change="onFileChanged" name="image" v-validate="'required'">
                            <el-button v-if="(form.field.image)" type="info" class="pull-right" circle style="position: absolute;right: 5px;top: 27px;width:30px;height:30px" @click="form.field.image = ''"> <i class="el-icon-edit" style="left: 8px;top: 8px;position: absolute;"></i></el-button>
                            <img :src="form.field.image" v-if="form.field.image!=''">
                            <span class="msg-error">{{ errors.first('image') }}</span>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        
                        <div class="form-group">
                            <label for="">Waktu Buka</label>
                            <div class="form-group">
                                <el-time-select
                                        v-model="form.field.open_time"
                                        :picker-options="{
                                    start: '00:00',
                                    step: '00:15',
                                    end: '23:59'
                                    }"
                                        name="open_time"
                                        v-validate="'required'"
                                        placeholder="Pilih Waktu Buka">
                                </el-time-select>
                                <span class="msg-error">{{ errors.first('open_time') }}</span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="">Waktu Tutup</label>
                            <div class="form-group">
                                <el-time-select
                                        v-model="form.field.close_time"
                                        :picker-options="{
                                    start: '00:00',
                                    step: '00:15',
                                    end: '23:59'
                                    }"
                                        name="close_time"
                                        v-validate="'required'"
                                        placeholder="Pilih Waktu Tutup">
                                </el-time-select>
                                <span class="msg-error">{{ errors.first('close_time') }}</span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="">Alamat</label>
                            <textarea cols="15" rows="5" class="form-control" v-model="form.field.address" name="address" v-validate="'required'"></textarea>
                            <span class="msg-error">{{ errors.first('address') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="">Deskripsi</label>
                            <textarea cols="15" rows="5" class="form-control"
                                    v-model="form.field.description" name="description" v-validate="'required'"></textarea>
                            <span class="msg-error">{{ errors.first('description') }}</span>
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
            </form>
        </div>

        <spinner :showSpinner="statusSpinner" :class="'spinner-dashboard'"></spinner>
    </div>
</template>

<script>
    import Vue from 'vue';
    import swal from 'sweetalert2'

    let SERVER = process.env.HOST_URL;

    import {API_KEY} from 'src/components/Dashboard/Views/Maps/API_KEY'
    import GoogleMapsLoader from 'google-maps'
    import axios from 'axios'
    import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'

    import ImageUpload from 'src/components/Base/ImageUpload';

    GoogleMapsLoader.KEY = API_KEY
    GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
    GoogleMapsLoader.LANGUAGE = 'id';


    export default {
        // props:{
        //   merchant: Object
        // },
        components: {
            [TimeSelect.name]: TimeSelect, ImageUpload
        },
        data () {
            return {
                form: {
                    field: {
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
                    validation: {
                        messages: {
                            custom: {
                                name: {
                                    required: 'Nama tidak boleh kosong'
                                },
                                address: {
                                    required: 'Alamat tidak boleh kosong'
                                },
                                owner: {
                                    required: 'Nama Pemilik tidak boleh kosong'
                                },
                                image: {
                                    required: 'Image tidak boleh kosong'
                                },
                                phone: {
                                    required: 'No Telepon tidak boleh kosong'
                                },
                                open_time: {
                                    required: 'Waktu Buka tidak boleh kosong'
                                },
                                close_time: {
                                    required: 'Waktu Tutup tidak boleh kosong'
                                },
                                description: {
                                    required: 'Deskripsi tidak boleh kosong'
                                }
                            }
                        }
                    }
                
                },
                isSubmitted: false,
                statusSpinner: false
          }
        },
        created(){
            this.$validator.localize('id', this.form.validation.messages); // set custom messages
            if (typeof(this.$router.currentRoute.params.id) != "undefined"){
                this.getMerchant();
            }
        },
        ready:function(){
            getPositionTemp();
        },
        // watch: {
        //     markers: function(newValue, oldValue) {
        //         console.log(newValue)l
        //     }
        // },
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

            // GET RELATED DATA
            getMerchant(){
                this.statusSpinner = true;

                axios.get(`${SERVER}/api/merchants/${this.$router.currentRoute.params.id}`).then(res => {
                    const data = res.data;

                    this.form.field.info = data.data.info;
                    this.form.field.name = data.data.name;
                    this.form.field.image = data.data.image;
                    this.form.field.address = data.data.address;
                    this.form.field.owner = data.data.owner;
                    this.form.field.phone = data.data.phone;
                    this.form.field.latitude = Number(data.data.latitude);
                    this.form.field.longitude = Number(data.data.longitude);
                    this.form.field.open_time = data.data.open_time;
                    this.form.field.close_time = data.data.close_time;
                    this.form.field.description = data.data.info.description;

                    // set map
                    // const myLatlng = new window.google.maps.LatLng(this.form.field.latitude, this.form.field.longitude)
                    this.createSearchBar(this.form.field.latitude, this.form.field.longitude);
                    // const mapOptions = {
                    //     zoom: 15,
                    //     center: myLatlng,
                    //     scrollwheel: false // we disable de scroll over the map, it is a really annoing when you scroll through page
                    // }

                    // this.map = new window.google.maps.Map(document.getElementById('regularMap'), mapOptions)
                    // this.markers = new window.google.maps.Marker({position:myLatlng});
                    // this.markers.setMap(this.map);
                    // this.map.addListener('click', event => {
                    //     this.addMarker(event.latLng)
                    // });
                    this.statusSpinner = false;

                }).catch((err) => {this.statusSpinner = false; this.showModalError()});
            },

            // ACTION
            saveForm () {
              this.$validator.validateAll().then((result) => {
                if (result) {
                    this.isSubmitted = true;
                    this.statusSpinner = true;
                    if (this.$router.currentRoute.params.id) {
                        if (this.form.field.image.slice(0, 10) != "data:image") {
                        Vue.delete(this.form.field, 'image');
                        };
                        // if (this.image.spli)
                        axios.put('/api/merchants/' + this.$router.currentRoute.params.id, this.form.field).then(res => {
                            this.statusSpinner = false;                      
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
                            let messages = err.response.data.errors;
                            if(messages !== undefined) {
                                let keys = Object.keys(messages);
                                for (let i = 0; i < keys.length; i++) {
                                this.errors.add(keys[i], messages[keys[i]][0]);
                                }
                            }
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
                            this.statusSpinner = false;                      
                        });
                    } else {
                        axios.post('/api/merchants', this.form.field).then(res => {
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
                            let messages = err.response.data.errors;
                            if(messages !== undefined) {
                                let keys = Object.keys(messages);
                                for (let i = 0; i < keys.length; i++) {
                                this.errors.add(keys[i], messages[keys[i]][0]);
                                }
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
                            this.statusSpinner = false;
                        });
                    }
                }
              });
            },

            // OTHERS
            listMerchant() {
                this.$router.push({ name: 'merchant-list' });
            },
            onLoad(avatar) {
              this.form.field.image = avatar.src;
            },
            onFileChanged (e) {
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.form.field.image = e.target.result;
                };
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
                
                    this.getMerchant();
                
                }, function (dismiss) {
                    // this code dismiss condition
                });
                
            },

            // OTHERs > MAPS
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

                this.form.field.latitude = this.markers.getPosition().lat()
                this.form.field.longitude = this.markers.getPosition().lng()

                this.map.addListener('click', event => {
                    // markers = [];
                    console.log(markers)
                    markers.forEach(function(marker) {
                        marker.setMap(null);
                    });
                    // tempMarkers.setMap(null);
                    markers = [];
                    this.addMarker(event.latLng, markers)
                });
            },
            addMarker (location, tempMarkers) {
                
                if (this.markers) {
                    this.deleteMarkers()
                } else if(tempMarkers) {
                    tempMarkers.forEach(function(marker) {
                        marker.setMap(null);
                    });
                    
                    tempMarkers = [];
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
            getPositionTemp() {
                var marker;
                return  marker = this.markers;
            }
        },
        mounted () {
            GoogleMapsLoader.load((google) => {
                this.createSearchBar(-6.914744, 107.609810);
            })
        },
        
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

