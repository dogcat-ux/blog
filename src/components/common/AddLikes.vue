<template>
  <span>
      <transition name="fade">
        <span  @click="toLike">
          <img src="../../assets/img/iconBlog/like.png" alt="" class="icon-size" v-if="!whetherLike">
          <img src="../../assets/img/iconBlog/likeActive.png" alt="" class="icon-size" v-else>
        </span>
      </transition>
      <slot name="likes"></slot>
      <span class="likes-num" v-if="!whetherLike">{{likes}}</span>
      <span class="likes-num-active" v-else>{{likes}}</span>
      </span>
</template>

<script>
// <!--  传入点赞数likes和是否点赞了whetherLike-->
  export default {
    name: "AddLikes",
    methods:{
      toLike(){
        this.$emit("toLike")
      }
    },
    props:{
      likes:Number,
      whetherLike:Boolean
    }
  }
</script>

<style lang="scss" scoped>
  .likes-num{
    font-size: 13px;
    color: var(--color-common-icon);
  }
  .likes-num-active{
    font-size: 13px;
    color: var(--color-common-icon-active);
  }
</style>
