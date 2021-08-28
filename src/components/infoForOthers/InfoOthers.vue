<template>
  <div>
    <user-info-item><span slot="infoKey">用户名：</span>
      <span slot="infoValue">{{user.username}}</span>
    </user-info-item>
    <user-info-item><span slot="infoKey">邮箱：</span><span slot="infoValue">{{user.email}}</span></user-info-item>
    <user-info-item><span slot="infoKey">性别：</span>
      <span slot="infoValue" v-if="user.sex&&user.sex===0">男</span>
      <span slot="infoValue" v-if="user.sex&&user.sex===1">女</span>
      <span slot="infoValue" v-else-if="!user.gender||user.sex===2">暂无</span>
    </user-info-item>
    <user-info-item><span slot="infoKey">个性签名：</span>
      <span slot="infoValue" v-if="user.signature">{{user.signature}}</span>
      <span slot="infoValue" v-else>这个人很懒，什么也没留下~</span>
    </user-info-item>
  </div>
</template>

<script>
  import UserInfoItem from "../infoForOthers/UserInfoItem";
  export default {
    name: "InfoOthers",
    components:{
      UserInfoItem
    },
    props:["user"]
  }
</script>

<style scoped>

</style>
