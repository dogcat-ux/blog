<template>
  <div class="one-blog-footer">
<!--    1-->
<!--    <span>-->
<!--      <i class="el-icon-view"></i>-->
<!--      <slot name="views"></slot>-->
<!--    </span>-->
<!--    2-->
    <AddLikes :likes="likes" @toLike="toLike" :whether-like="whetherLike"></AddLikes>
<!--   3-->
    <AddCollect @toCollect="toCollect" :is-collect="isCollect"></AddCollect>
<!--     4-->
    <span>
      <span @click="toReply">
        <i class="el-icon-edit"></i>
      </span>
      <slot name="comments"></slot>
    </span>
  </div>
</template>

<script>
  import AddLikes from "./AddLikes";
  import AddCollect from "./AddCollect";
  import {getBlogLike} from "../../api/user/BlogController/getBlogLike";
  import {getBlogCollection} from "../../api/user/BlogController/getBlogCollection";
  import {getWhetherLike} from "../../api/user/UserController/getWhetherLike";
  import {getIsCollection} from "../../api/user/UserController/getIsCollection";

  export default {
    name: "CommonFooter",
    components:{
      AddLikes,
      AddCollect
    },
    data() {
      return {
        isCollect: false,
        whetherLike:false,
        collects1:this.collects,
        likes1:this.likes
      }
    },
    props:["blogId","likes","collects"],
    methods:{
      getLikeOrNot(){
        getWhetherLike(this.blogId).then(res=>{
          console.log("getWhetherLike",res)
          if (res.status===200){
            if(res.data.code===200){
              this.whetherLike=res.data.data
            }
          }
        }).catch(err=>{
          console.log(err)
        });
      },
      getCollectionOrNot(){
        getIsCollection(this.blogId).then(res=>{
          console.log("getIsCollection",res)
          if (res.status===200){
            if(res.data.code===200){
              this.isCollect=res.data.data
            }
          }
        }).catch(err=>{
          console.log(err)
        });
      },
      toCollect(){
        getBlogCollection(this.blogId).then(res=>{
          console.log("收藏",res)
          if (res.status===200){
            if(res.data.code===200){
              this.isCollect=!this.isCollect
              if(this.isCollect){
                this.collects++
              }else{
                this.collects--
              }
              this.$emit("addCancelCollect",this.isCollect)
            }else {
              this.$message.error(res.data.message)
            }
          }else {
          }
        }).catch(err=>{
          console.log(err)
        });
      },
      toLike(){
        getBlogLike(this.blogId).then(res=>{
          console.log("点赞",res)
          if (res.status===200){
            if(res.data.code===200){
              this.whetherLike=!this.whetherLike
              if(this.whetherLike){
                this.likes++
              }else{
                this.likes--
              }
              this.$emit("addCancelLike",this.whetherLike)
            }else {
              this.$message.error(res.data.message)
            }
          }else {
          }
        }).catch(err=>{
          console.log(err)
        });
      },
      toReply(){
        if(this.isDetailPage){
          this.$emit("toReply")
        }else{
          this.$router.push({
            path:'/user/DetailPage',
            params:{
              blog_id:Number(this.blogId)
            }
          })
        }
      }
    },
    computed:{
      isDetailPage(){
        return this.$route.path.indexOf('/user/DetailPage')!==-1 ;
      }
    },
    created() {
      this.getLikeOrNot()
      this.getCollectionOrNot()
    }
  }
</script>

<style lang="scss" scoped>
  .one-blog-footer {
    display: flex;
    span {
      flex: 1;
      cursor: pointer;
    }
    .el-icon-view{
      font-size: var(--font-icon);
      cursor: pointer;
      color: var(--color-common-icon);
    }
    .el-icon-star-off {
      font-size: var(--font-icon);
      cursor: pointer;
      color: var(--color-common-icon);
    }
    .el-icon-star-off:hover{
      color: var(--color-common-icon-active);
    }
    .el-icon-star-on {
      font-size: var(--font-icon);
      cursor: pointer;
      color: var(--color-common-icon-active);
    }
    .el-icon-edit {
      font-size: var(--font-icon);
      cursor: pointer;
      color: var(--color-common-icon);
    }
    .el-icon-edit:hover{
      color: var(--color-common-icon-active);
    }
  }
</style>
