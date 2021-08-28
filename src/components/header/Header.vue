<template>
  <el-row :gutter="20">
    <el-col :span="4" :offset="0">
      <slot name="leftBox"></slot>
    </el-col>
    <el-col :span="4" :offset="12">
      <slot name="rightBox"></slot>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
