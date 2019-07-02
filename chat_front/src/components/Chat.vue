<template lang="html">
  <div class="">
    <div class="container menu">
      <div class="row">
        <div class="col-1">
          <router-link :to="{ name: 'Home', params: {} }"><i class="fas fa-address-card"></i></router-link>
        </div>
        <div class="col">
          <ChatHeader></ChatHeader>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ChatBody></ChatBody>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatHeader from '@/components/ChatHeader'
import ChatBody from '@/components/ChatBody'
export default {
  name: 'Chat',
  components: {
    ChatHeader,
    ChatBody
  }
}
</script>

<style lang="scss" scoped>
.menu{
  border-radius: 15px;
  background-color: white;
}
</style>
