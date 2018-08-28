<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Form Pengguna</h4>
            <button class="btn btn-primary pull-right" @click="listUser()" style="margin-bottom: 15px">List</button>
        </div>

        <!-- Form Input -->
        <div class="col-md-12">
            <div class="card">
                <form action="">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-offset-2 col-md-8 col-sm-8 col-xs-12">
                                <h4 class="card-title">
                                    Form
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
                                    <label for="">Email</label>
                                    <input type="email" class="form-control" v-model="email">
                                </div>
                                <div class="form-group">
                                    <label for="">Password</label>
                                    <input type="password" class="form-control" v-model="password">
                                </div>
                                <div class="form-group">
                                    <a href="javascript:;" style="width: 100%" class="btn btn-primary" @click="saveForm()">Simpan</a>
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
    import axios from 'axios'

    export default {
        data () {
            return {
                name: '',
                email: '',
                password: '',
                url: ''
            }
        },
        mounted() {
            if (this.$router.currentRoute.params.id) {
                this.url = `/api/users/${this.$router.currentRoute.params.id}`;
            } else {
                this.url = `/api/users/create`
            }
        },
        methods: {
            listUser() {
                this.$router.push({ name: 'user-list' })
            },
            saveForm () {
                // Validasi number


                if (!this.name || !this.email || !this.password) {
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
                    formData.append('email', this.email);
                    formData.append('password', this.password)

                    axios.post(this.url, formData).then(res => {
                        this.$notify({
                            component: {
                                template: `<span>Data berhasil disimpan!</span>`
                            },
                            icon: 'ti-alert',
                            horizontalAlign: 'right',
                            verticalAlign: 'top',
                            type: 'success'
                        })
                        this.$router.push({name: 'user-list'})
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

