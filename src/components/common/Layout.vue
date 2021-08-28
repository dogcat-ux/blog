<template>
  <div class="max">
    <div class="page">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="content">
        <div class="aside">
          <slot name="aside"></slot>
        </div>
        <div class="main">
          <slot name="main"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Layout"
  }
</script>

<style lang="scss" scoped>
  .max{
    width: 100vw;
    height: 100vh;
    background-color: pink;
  }
  .page{
    width: 100vw;
    /*height: 100vh;*/
    height: auto;
    /*background-color: var(--bgc);*/
    background-color: moccasin;
    .header{
      width: 100vw;
      height: 60px;
    }
    .content{
      width: var(--width-main);
      height: 100%;
      text-align: center;
      margin: 20px auto;
      background-color: #FFFFFF;
      display: flex;
      .aside{
        width: 200px;
        height: 100%;
      }
      .main{
        flex: 1;
        height: 100%;
      }
    }

  }
  .el-menu {
    border-right: 0;
  }
</style>
