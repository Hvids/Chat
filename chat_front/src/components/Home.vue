<template lang="html">
  <div class="home" id="" >
    <div class="container">
      <div class="row">
        <div class="col">
          <!-- <img src="@/assets/img/BlogImage_Chat.jpg" alt=""> -->
        </div>
        <div class="col-8 col-sm-6 col-lg-4 col-md-5 col-xl-4">
            <Enter></Enter>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Enter from '@/components/Enter'
import Register from '@/components/Register'
export default {
  name: 'Home',
  components: {
    Enter,
    Register
  }
}

</script>

<style lang="scss" scoped>

</style>
