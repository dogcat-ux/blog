<template>
  <el-container>
    <el-header><HeaderBar></HeaderBar></el-header>
    <el-container>
      <el-aside width="200px">
        <el-scrollbar style="width: 100%">

        </el-scrollbar>
      </el-aside>
      <el-main>
        <el-scrollbar style="width: 100%;height: 100%">

        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "PrivateChat",
    data(){
      return{

      }
    }
  }
</script>

<style scoped>

</style>
