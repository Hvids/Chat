<template lang="html">
  <div class="">
    <div class="container header">
      <div class="row">
        <div class="col">
          <SearchChat></SearchChat>
        </div>
        <div class="col">
            <AddChat></AddChat>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchChat from '@/components/header_components/SearchChat'
import AddChat from '@/components/header_components/AddChat'
export default {
  name: 'ChatHeader',
  components: {
    SearchChat,
    AddChat
  }
}
</script>

<style lang="scss" scoped>
.add-chat {
  position: block;
  margin-left: 100%;
  margin-right: 0px;
}
.header{
  border-radius: 15px;
  background-color: white
}
</style>
