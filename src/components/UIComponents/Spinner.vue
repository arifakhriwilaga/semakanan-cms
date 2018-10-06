<template>
  <div>
    <div class="overlay" style="z-index:10" v-if="showSpinner">
      <div class="overlay__inner">
            <div class="overlay__content">
              <span class="spinner"></span>
              <span class="text-spinner">Loading...</span>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
    
    export default {
        name: 'spinner',
        props: {
            showSpinner: false
        }
    }

</script>
