<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Form Slider</h4>
            <button class="btn btn-primary pull-right" style="margin-bottom: 15px" @click="toList">List Slider </button>
        </div>

        <!-- Form Input -->
        <div class="col-md-12">
            <div class="card">
                <form action="">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-offset-2 col-md-8 col-sm-8 col-xs-12">
                                <h4 class="card-title">

                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="row">
                            <div class="col-md-offset-2 col-md-8 col-sm-8 col-xs-12">
                                <div class="form-group">
                                    <label for="">Caption</label>
                                    <input type="text" v-model="slider.caption" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="">Tipe</label> <br />
                                    <el-select class="select-primary"
                                            size="large"
                                            placeholder="Pilih Tipe"
                                            v-model="slider.type">
                                        <el-option v-for="option in type_options"
                                                    class="select-danger"
                                                    :value="option.value"
                                                    :label="option.label"
                                                    :key="option.label">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="form-group">
                                    <label>Gambar</label>
                                    <input type="file" class="form-control" @change="onFileChanged" accept="image/jpeg">
                                    <img :src="slider.image" v-if="slider.image!=''" />
                                </div>

                                <div class="form-group">
                                    <a href="javascript:;" style="width: 100%" class="btn btn-primary" @click="save">{{label}}</a>
                                </div>
                                {{slider}}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import SliderService from './SliderService';

    import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'

    let sliderService = new SliderService();
    export default {
      components: {
        [Select.name]: Select,
      },
      created() {
        let slider_id = this.$router.currentRoute.params.id;
        if (typeof(slider_id) != "undefined"){
                this.getSlider(slider_id)
        }
      },
      data() {
        return {
          slider: {
            caption: '',
            type: '',
            image: '',
          },
          type_options: [
            {
              value: 'home', label: 'Home'
            },
            {
              value: 'semakanan', label: 'seMakanan'
            },
          ],
        }
      },
      computed:{
        label: function(){
          let slider_id = this.$router.currentRoute.params.id;
          if (typeof(slider_id) == "undefined") {
            return "Add Slider"
          }else{
            return "Update Slider"
          }
        }
      },
      methods: {
        getSlider(slider_id) {
          axios.get(`/api/sliders/` + slider_id).then(res => {
            this.slider = res.data.data;
            this.title = res.data.meta.message;
            console.log(res);
          }).catch(err => {
            this.$notify({
              component: {
                template: `<span>Terjadi kesalahan!</span>`,
              },
              icon: 'ti-alert',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'danger'
            })
          });
        },
        save() {
          let slider_id = this.$router.currentRoute.params.id;
          if (typeof(slider_id) == "undefined") {
            sliderService.post(this.slider).then(res => {
              this.$notify({
                component: {
                  template: `<span>Data berhasil disimpan</span>`
                },
                icon: 'ti-alert',
                verticalAlign: 'top',
                horizontalAlign: 'right',
                type: 'success'
              });
              this.$router.push({name: `slider-list-semakanan`})
            }).catch(err => {
              let messages = err.response.data.errors;
              let keys = Object.keys(messages);
              for (let i = 0; i < keys.length; i++) {
                this.errors.add(keys[i], messages[keys[i]][0]);
              }

              this.$notify({
                component: {
                  template: `<span>Terjadi kesalahan</span>`
                },
                icon: 'ti-alert',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'danger'
              })
            })
          } else {
            sliderService.put(slider_id, this.slider).then(res => {
              this.$notify({
                component: {
                  template: `<span>Data berhasil disimpan</span>`
                },
                icon: 'ti-alert',
                verticalAlign: 'top',
                horizontalAlign: 'right',
                type: 'success'
              });
              this.$router.push({name: `slider-list-semakanan`})
            }).catch(err => {
              let messages = err.response.data.errors;
              let keys = Object.keys(messages);
              for (let i = 0; i < keys.length; i++) {
                this.errors.add(keys[i], messages[keys[i]][0]);
              }

              this.$notify({
                component: {
                  template: `<span>Terjadi kesalahan</span>`
                },
                icon: 'ti-alert',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'danger'
              })
            })
          }

        },
        toList() {
          this.$router.push({name: 'slider-semakanan-list'})
        },
        onFileChanged(e) {
          if (!e.target.files.length) return;
          //
          // this.slider.image  = e.target.files[0];
          let file = e.target.files[0];

          let reader = new FileReader();


          reader.onload = e => {
            let src = e.target.result;
            this.slider.image = src;
            this.$emit('loaded', {src, file});
          };

          reader.readAsDataURL(file);

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
