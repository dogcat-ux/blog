<template>
  <div class="user-info-item">
    <div class="info-key">
      <slot name="infoKey"></slot>
    </div>
    <div class="info-value">
      <slot name="infoValue"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfoItem"
  }
</script>

<style lang="scss" scoped>
  .user-info-item{
    width: 500px;
    height: 50px;
    display: flex;
    text-align: left;
    align-items: center;
    position: relative;
    .info-key{
      position: absolute;
      left: 10px;
      width: 80px;
    }
    .info-value{
      position: absolute;
      right: 10px;
      width: 280px;
    }
  }
</style>
