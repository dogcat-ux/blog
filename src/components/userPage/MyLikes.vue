<template>
  <div class="my-note">
    <div class="my-note-header">
      <el-select v-model="value" placeholder="分区">
        <el-option
          v-for="item in tags"
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    </div>
    <div v-for="(item,index) in blog" class="one-collect">
      <OneBlog :avatarUrl="item.userPicture" :blogId="item.id" :username="item.username" :likes="item.likes">
        <span slot="username">{{item.username}}</span>
        <span slot="date">{{item.creatTime}}</span>
        <div slot="=title">{{item.title}}</div>
        <div slot="content" v-html="item.content">{{item.content}}</div>
<!--        <span slot="likes">{{item.likes}}</span>-->
        <span slot="views">{{item.view}}</span>
      </OneBlog>
    </div>
    <Empty :text="'暂无数据'" v-if="blog.length===0"></Empty>
  </div>
</template>

<script>
  import Empty from "../common/Empty";
  import {getUserLikes} from "../../api/user/UserController/getUserLikes";
  import OneBlog from "../common/OneBlog";
  import {allTags} from "../../api/user/BlogController/allTags";
  export default {
    name: "MyLikes",
    components:{
      OneBlog,
      Empty
    },
    data(){
      return {
        value: "",
        tags: [{
          id:-1,
          name:"全部"
        }],
        blogSave: [],
        blog: [],
        defaultAvatar: this.$global.defaultAvatar,
        avatar: this.$store.state.portraitPath
      }
    },
    watch: {
      value: function (newVal, oldVal) {
        this.blog=[]
        if (newVal==="全部"){
          this.blog = this.blogSave
        }else {
          this.blog = this.blogSave.filter(value => {
            if (value.type===newVal){
              return value
            }
          })
        }
        console.log("newVal:", newVal);
        console.log("oldVal:", oldVal);
      }
    },
    methods: {
      toAll() {
        this.blog = this.blogSave
      },
      toTags(item, index) {
        this.blog = this.blog.filter(value => value.type = item, index)
      }
    },
    created(){
      allTags().then(res => {
        console.log("allTags", res)
        if (res.status === 200) {
          if (res.data.code === 200) {
            // this.tags = res.data.data
            this.tags.push.apply(this.tags, res.data.data);
          } else {
            this.$message.error("失败")
          }
        } else {
          this.$message.error("可能出了点问题")
        }
      }).catch(err => {
        console.log(err)
      });
      getUserLikes(this.$store.state.username).then(res=>{
        if (res.data.code===200){
          this.blog=res.data.data.reverse()
          this.blogSave=res.data.data.reverse()
        }
      }).catch(err=>{
      })
    }
  }
</script>

<style lang="scss" scoped>
  .my-note{
    margin: 20px auto;
    .one-collect{
      margin: 20px auto;
    }
    .my-note-header {
      width: 100%;
      height: 50px;
      text-align: left;
      padding-left: 110px;
      .el-select{
      }
    }
    .one-blog{
      background-color: var(--color-main2);
    }
  }
</style>
