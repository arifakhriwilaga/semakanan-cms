<template>
  <div class="row">
    <div class="col-lg-4 col-md-5">
      <user-card :merchant="merchant">

      </user-card>
      <!-- <members-card>

      </members-card> -->
    </div>
    <div class="col-lg-8 col-md-7">
      <merchant-form-create :merchant="merchant">

      </merchant-form-create>
    </div>
  </div>
</template>
<script>
  let SERVER = process.env.HOST_URL;

  import UserCard from './Profile/UserCard.vue'
  import MembersCard from './Profile/MembersCard.vue'
  import MerchantFormCreate from './MerchantFormCreate.vue'
  import axios from 'axios'

  export default {
    components: {
      MerchantFormCreate,
     UserCard,
      MembersCard
    },
    created() {
      let merchant_id = this.$router.currentRoute.params.id;
      if (merchant_id != "undefined") {
        this.getMerchant(merchant_id)
      }

    },
    data(){
      return {
        merchant: {
          name: '',
          image: '',
          address: '',
          owner: '',
          phone: '',
          latitude: '',
          longitude: '',
          open_time: '',
          close_time: ''
        }
      }
    },
    methods:{
      getMerchant(merchant_id){
              axios.get(`${SERVER}/api/merchant/${merchant_id}`).then(res => {
                const data = res.data;
                this.merchant.name = data.data.name;
                this.merchant.image = data.data.image;
                this.merchant.address = data.data.address;
                this.merchant.owner = data.data.owner;
                this.merchant.phone = data.data.phone;
                this.merchant.latitude = Number(data.data.latitude);
                this.merchant.longitude = Number(data.data.longitude);
                this.merchant.open_time = data.data.open_time;
                this.merchant.close_time = data.data.close_time;
              }).catch( err => {
              })
            },
    }
  }

</script>
<style>

</style>
