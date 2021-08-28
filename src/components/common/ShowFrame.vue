<template>
  <!--  <div class="show-frame">-->
  <el-container>
    <el-main>
      <div class="frame-box">
        <el-row :gutter="20">
          <el-col :span="spanNum" v-for="(item,index) in showArray" :key="index">
            <div class="frame-item" @click="goGoodDetail(item.id)">
              <el-image :src="item.firstPicture" class="img-item"></el-image>
              <div class="time-title">
<!--                <div>-->
<!--                  <span>{{item.creatTime}}</span>-->
<!--                </div>-->
                <span class="title">{{item.title}}</span>
              </div>
              <p class="goodsInfo">{{item.content}}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <el-footer class="pagination">
      <slot name="Pagination"></slot>
      <!--        <Pagination :page-size="this.pageSize" :total="this.total" @currentChange="currentChange" @requestData="requestData"></Pagination>-->
    </el-footer>
  </el-container>
  <!--  </div>-->
</template>

<script>
  // <!--  该组件作为子组件-->
  //需要传入的
  //1.循环展示的数组数据 2.spanNum
  export default {
    name: "ShowGoodsFrame",
    props:{
      showArray:Array,
      spanNum:Number
    },
    data(){
      return {
        // spanNum:6
      }
    },
    components:{
    },
    computed:{
    },
    methods:{
      goGoodDetail(blog_id){
        this.$router.push({
          path:'/user/DetailPage',
          query:{
            blog_id:blog_id
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  /*自己的样式*/
  .show-frame{
    margin: 20px auto;
    width: var(--view-width);
  }
  .pagination{
    margin: 0 auto;
  }
  .frame-item{
    width: var(--frame-item);
    height: var(--frame-item);
    margin-top: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .img-item{
    margin: 0 auto;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    width: var(--frame-item);
    height: 200px;
    cursor: pointer;
  }
  /deep/ img{
    width:100%;
    height: 100%;
    object-fit:cover;
  }
  .time-title{
    display: flex;
    flex-direction: row;
    color: var(--color-font-main);
    .creat-time{
      width: 50px;
      height: 50px;
      background-color: var(--color-hook);
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      span:first-child{
      }
      span:last-child{
        font-size: 14px;
      }
    }
    .title{
      color: var(--color-font-main);
      border-bottom: 1px var(--color-font-main) solid;
      /*margin-left: 20px;*/
      margin-bottom: 10px;
    }
  }
  .goodsInfo{
    margin-top: 5px;
    color: #9a9a9a;
    /*color: #b36715;*/
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap:break-word;
    white-space:nowrap;
  }
  /*element-uid的样式*/
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
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
