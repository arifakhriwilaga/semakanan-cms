<template>
  <div>
    <!-- <nav class="navbar navbar-transparent navbar-absolute">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#navigation-example-2"
                  @click="toggleNavbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>

      </div>
    </nav> -->

    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page" data-color="" data-image="">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                
                <form @submit.prevent="login()">
                  <div class="card" data-background="color" data-color="blue">

                    <div class="card-header">
                      <h3 class="card-title" style="text-align:center">seMakanan Admin</h3>
                    </div>

                    <div class="card-content">
                      <div class="form-group">
                        <input type="email" placeholder="Email" class="form-control border-input" v-model="form.field.email" v-validate="'required|email'" name="email" autocomplete="off">
                        <span class="msg-error">{{ errors.first('email') }}</span>
                      </div>
                      <div class="form-group">
                        <input type="password" placeholder="Password" class="form-control border-input" v-model="form.field.password" v-validate="'required'" data-vv-as="Password" name="password" autocomplete="off">
                        <span class="msg-error">{{ errors.first('password') }}</span>                      
                      </div>
                    </div>

                    <div class="card-footer text-center">
                      <button type="submit" class="btn btn-fill btn-wd ">Login</button>
                      <div class="forgot">
                        <a class="cursor-pointer" @click="toForgotPassword()">
                          Forgot your password?
                        </a>
                      </div>
                    </div>

                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>

        <footer class="footer footer-transparent">
          <div class="container">
            <div class="copyright">
              &copy; by seKampus <i class="fa fa-heart heart"></i> 
            </div>
          </div>
        </footer>
        <div class="full-page-background" style="background-image: url(static/img/background/background6.png) "></div>
      </div>
      <spinner :showSpinner="statusSpinner"></spinner>
    </div>
    
  </div>
</template>
<script>
  export default {
    data() {
      return {
        statusSpinner: false,
        form: {
          field: {
            email: "admin@sekampus.id",
            password: "sekampus",
          },
          validation: {
            messages : {
              custom: {
                email: {
                  required: 'Email tidak boleh kosong',
                  email: 'Email tidak valid'
                },
                password: {
                  required: 'Password tidak boleh kosong',
                }
              }
            }
          }
        }
      }
    },
    created() {
      this.$validator.localize('id', this.form.validation.messages); // set custom messages
      this.$store.dispatch('emptyMerchant')
    },
    methods: {
      
      // OTHERS
      // toggleNavbar () {
      //   document.body.classList.toggle('nav-open')
      // },
      // closeMenu () {
      //   document.body.classList.remove('nav-open')
      //   document.body.classList.remove('off-canvas-sidebar')
      // },
      toForgotPassword: function () {
        alert('Under construction');
        // this.href = '';
        // let src = this.href;
        // let file = null;
        // this.$emit('loaded', {src, file});
      },

      // ACTION
      login () {
        this.$validator.validateAll().then((result) => {

          if (result) {
            this.statusSpinner = true;

            this.$store.dispatch('login', this.form.field).then(() => {
              this.$router.push('/');

            }).catch(() => {
              this.statusSpinner = false;
              this.$notify(
              {
                component: {
                  template: `<span><b>Email</b> atau <b>Password</b> salah!</span>`
                },
                icon: 'ti-warning',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'danger'
              })
            })
          }
        })
      },

    },
    beforeDestroy () {
      this.statusSpinner = false;
      // this.closeMenu()
    }
  }
</script>
<style>
</style>
