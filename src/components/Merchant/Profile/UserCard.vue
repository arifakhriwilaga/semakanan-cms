<template>
  <div class="card card-user">
    <div class="image">
      <img src="static/img/background.jpg" alt="...">
    </div>
    <div class="card-content">
      <div class="author">
        <img class="avatar border-white" src="static/img/faces/face-2.jpg" alt="...">
        <h4 class="title">{{merchant.name}}
          <br>
          <button class="btn btn-success" style="margin: 4px 0 4px 0" v-if="open" @click="status()">BUKA</button>
          <button class="btn btn-danger" style="margin: 4px 0 4px 0" v-if="!open" @click="status()">TUTUP</button>
          <br>
          <a href="#">
            <small>{{merchant.owner}}</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">
      </p>
    </div>
  </div>
</template>
<script>
  let SERVER = process.env.HOST_URL;

  import axios from 'axios'
  export default {
    props:{
      merchant: Object
    },
    data(){
      return{
        open: ''
      }
    },
    methods: {
      getClasses (index) {
        const remainder = index % 3
        if (remainder === 0) {
          return 'col-md-3 col-md-offset-1'
        } else if (remainder === 2) {
          return 'col-md-4'
        } else {
          return 'col-md-3'
        }
      },
      status() {
        axios.put(SERVER + `/api/merchant/state/change/${this.$router.currentRoute.params.id}`).then(res => {
          this.$notify({
            component: {
              template: `<span>${res.data.meta.message}</span>`
            },
            icon: 'ti-alert',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'success'
          })
          this.open = res.data.data.buka
        })
      }
    }
  }

</script>
<style>

</style>
