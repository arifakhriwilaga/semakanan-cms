<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Form Tambah Merchant</h4>
            <button class="btn btn-primary pull-right" @click="listMerchant()" style="margin-bottom: 15px">List</button>
        </div>

        <!-- Form Input -->
        <div class="col-md-12">
            <div class="card">
                <form action="">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-offset-2 col-md-8 col-sm-8 col-xs-12">
                                <h4 class="card-title">
                                    Form Tambah
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="row">
                            <div class="col-md-offset-2 col-md-8 col-sm-8 col-xs-12">
                                <div class="form-group">
                                    <label>Nama</label>
                                    <input type="text" class="form-control" v-model="name">
                                </div>
                                <div class="form-group">
                                    <label>Gambar</label>
                                    <input type="file" class="form-control" @change="onFileChanged">
                                </div>
                                <div class="form-group">
                                    <label for="">Alamat</label>
                                    <textarea name="" id="" cols="30" rows="10" class="form-control" v-model="address"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="">No. Telepon</label>
                                    <input type="text" class="form-control" v-model="phone">
                                </div>
                                <div class="form-group">
                                    <label for="">Pemilik</label>
                                    <input type="text" class="form-control" v-model="owner">
                                </div>
                                <div class="form-group">
                                    <label for="">Waktu Buka</label>
                                    <div class="form-group">
                                        <el-time-select
                                            v-model="open_time"
                                            :picker-options="{
                                            start: '00:00',
                                            step: '00:15',
                                            end: '23:59'
                                            }"
                                            placeholder="Pilih Waktu Buka">
                                        </el-time-select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="">Waktu Tutup</label>
                                    <div class="form-group">
                                        <el-time-select
                                            v-model="close_time"
                                            :picker-options="{
                                            start: '00:00',
                                            step: '00:15',
                                            end: '23:59'
                                            }"
                                            placeholder="Pilih Waktu Tutup">
                                        </el-time-select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="">Lokasi</label>
                                    <div id="regularMap" class="map"></div>
                                </div>
                                <div class="form-group">
                                    <a href="javascript:;" style="width: 100%" class="btn btn-primary" @click="saveForm()">Ubah Merchant</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {API_KEY} from 'src/components/Dashboard/Views/Maps/API_KEY'
    import GoogleMapsLoader from 'google-maps'
    import axios from 'axios'
    import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
    GoogleMapsLoader.KEY = API_KEY

    export default {
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
            }
        },
        methods: {
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

                if (this.latitude || this.longitude) {
                    this.markers = new window.google.maps.Marker({
                        position: {lat: this.latitude, lng: this.longitude},
                        map: this.map
                    })
                }

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
                // Validasi number


                if (!this.name || !this.address || !this.phone || !this.owner || !this.latitude || !this.longitude || !this.open_time || !this.close_time) {
                    this.$notify(
                    {
                        component: {
                        template: `<span>Semua kolom harus terisi, cek kembali!</span>`
                        },
                        icon: 'ti-alert',
                        horizontalAlign: 'right',
                        verticalAlign: 'top',
                        type: 'danger'
                    })
                } else {
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

                    axios.post(`http://apiadmin.portalsekampus.id/public/api/merchant/edit/${this.$router.currentRoute.params.id}`, formData).then(res => {
                        this.$notify({
                            component: {
                                template: `<span>Data berhasil disimpan!</span>`
                            },
                            icon: 'ti-alert',
                            horizontalAlign: 'right',
                            verticalAlign: 'top',
                            type: 'success'
                        })

                        this.name = '';
                        this.image = '';
                        this.address = '';
                        this.phone = '';
                        this.owner = '';
                        this.latitude = '';
                        this.longitude = '';
                        this.close_time = '';
                        this.open_time = '';
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
                    })
                }
            },
            onFileChanged (event) {
                this.image = event.target.files[0];
            }
        },
        mounted () {
            axios.get(`http://apiadmin.portalsekampus.id/public/api/merchant/${this.$router.currentRoute.params.id}`).then(res => {
                const data = res.data.data.merchant;

                this.name = data.data.name;
                this.image = data.data.image;
                this.address = data.data.address;
                this.owner = data.data.owner;
                this.phone = data.data.phone;
                this.latitude = Number(data.data.latitude);
                this.longitude = Number(data.data.longitude);
                this.open_time = data.data.open_time;
                this.close_time = data.data.close_time;
            }).catch(err => {
                this.$notify({
                    component: {
                        tempalte: '<span>Terjadi kesalahan!</span>'
                    },
                    icon: 'ti-alert',
                    horizontalAlign: 'right',
                    verticalAlign: 'top',
                    type: 'danger'
                })
            })
            setTimeout(() => {
                GoogleMapsLoader.load((google) => {
                    this.initRegularMap(google)
                })
            }, 1000);
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

