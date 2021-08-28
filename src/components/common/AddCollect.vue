<template>
  <span>
      <transition name="fade">
        <span  @click="toCollect">
          <i class="el-icon-star-off" v-if="!isCollect"></i>
          <i class="el-icon-star-on" v-else></i>
<!--          <img src="../../assets/img/iconBlog/like.png" alt="" class="icon-size" v-if="!whetherLike">-->
<!--          <img src="../../assets/img/iconBlog/likeActive.png" alt="" class="icon-size" v-else>-->
        </span>
      </transition>
      <span class="likes-num" v-if="!isCollect">{{collects}}</span>
      <span class="likes-num-active" v-else>{{collects}}</span>
      </span>
</template>

<script>
  // <!--  传入点赞数likes和是否点赞了whetherLike-->
  export default {
    name: "AddCollect",
    methods:{
      toCollect(){
        this.$emit("toCollect")
      }
    },
    props:{
      collects:Number,
      isCollect:Boolean
    }
  }
</script>

<style lang="scss" scoped>
  .el-icon-star-off {
    font-size: var(--font-icon);
    cursor: pointer;
    color: var(--color-common-icon);
  }
  .el-icon-star-off:hover{
    font-size: var(--font-icon);
    color: var(--color-common-icon-active);
  }
  .el-icon-star-on {
    font-size: var(--font-icon);
    cursor: pointer;
    color: var(--color-common-icon-active);
  }
</style>
