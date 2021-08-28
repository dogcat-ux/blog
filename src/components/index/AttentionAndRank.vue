<template>
  <div class="attention-rank">
    <div class="my-attention">
      <div class="my-attention-title">
        <span>
          <img src="../../assets/img/iconBlog/myAttention.png" class="icon-size" alt="">
          我的关注</span>
        <span>更多>></span>
      </div>
      <div class="my-attention-content">
        <div class="my-attention-main" v-for="(item,index) in myAttention">
          <el-image :src="item.firstPicture"
                    @click="goDetail(item.id)"
                    class="img-item"></el-image>
          <div class="my-attention-text">
            <div class="min-title">{{item.title}}</div>
            <p>{{item.content}}</p>
            <div class="footer">
              <i class="el-icon-alarm-clock"></i>
              {{item.creatTime}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rank">
      <div class="rank-title">
        <span>
          <img src="../../assets/img/iconBlog/hot.png" alt="" class="icon-size">
          热门周排行榜</span>
        <span @click="rankMore">更多>></span>
      </div>
      <div class="rank-content" v-for="(item,index) in rank">
        <span>{{index+1}}</span>
        <el-image :src="item.firstPicture"
                  @click="goDetail(item.id)"
                  class="img-item"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
  import {home} from "../../api/user/BlogController/home";
  export default {
    name: "AttentionAndRank",
    data() {
      return {
        myAttention: [
        ],
        rank: [],
      }
    },
    methods: {
      goDetail(blogId) {
        this.$router.push({
          path: '/user/DetailPage',
          query: {
            blog_id: blogId
          }
        })
      },
      rankMore() {

      },

    },
    created() {
      home(10, 0).then(res=>{
        if (res.data.code===200){
          this.myAttention=res.data.data.slice(0,5)
          this.rank=res.data.data.slice(5,10)
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
</script>

<style lang="scss" scoped>
  $attention_width: 830px;
  $rank_width: 361px;
  .attention-rank {
    margin: 0 auto;
    width: var(--width-index);
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    overflow: hidden;

    .my-attention {
      width: $attention_width;
      display: flex;
      flex-direction: column;

      .my-attention-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px var(--color-main) solid;
      }

      .my-attention-content {
        display: flex;
        flex-direction: column;

        .my-attention-main {
          display: flex;
          flex-direction: row;
          margin: 16px 0;
          overflow: hidden;
          padding-bottom: 10px;
          border-bottom: 1px var(--color-main) dotted ;

          .img-item {
            cursor: pointer;
            margin: 0 auto;
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            overflow: hidden;
            width: 400px;
            height: 211px;
          }

          /deep/ img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
          }

          .my-attention-text {
            width: 400px;
            padding-left: 53px;
            overflow: hidden;
            position: relative;

            .min-title {
              top: 0;
              position: absolute;
              left: 53px;
              margin-top: 10px;
              font-size: var(--font-title-min);
            }

            p {
              top: 50px;
              left: 53px;
              position: absolute;
              text-align: left;
              width: 427px;
              height: 110px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
            }

            .footer {
              position: absolute;
              bottom: 0;
              left: 53px;
              width: 100%;
              text-align: right;
              padding-right: 60px;
              margin-bottom: 10px;
              .el-icon-alarm-clock{
                color: var(--color-icon);
              }
            }
          }
        }
      }
    }

    .rank {
      width: $rank_width;
      text-align: center;

      .rank-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px var(--color-main) solid;
        /*span:first-child{*/
        /*  border-left: 6px var(--color-main) solid;*/
        /*  padding: 5px;*/
        /*  span{*/
        /*    border-left: 3px var(--color-main) solid;*/
        /*    padding: 5px;*/
        /*  }*/
        /*}*/
      }

      .rank-content {
        text-align: center;
        margin: 0 auto;
        display: flex;
        vertical-align: middle;
        align-items: center;

        .img-item {
          text-align: left;
          cursor: pointer;
          margin: 20px auto;
          display: table-cell;
          vertical-align: middle;
          overflow: hidden;
          width: 300px;
          height: 197px;
        }

        /deep/ img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          object-fit: cover;
        }
      }
    }
  }
</style>
