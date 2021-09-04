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
      <el-button @click="deleteBlog" v-if="!isDeleting">批量删除</el-button>
      <span v-else>
        <el-button @click="toDeleteBlog">删除</el-button>
        <el-button @click="deleteBlog">取消</el-button>
      </span>
    </div>
    <div v-for="(item,index) in blog" class="one-collect">
      <div class="one-note-box">
        <el-checkbox v-model="item.checked" class="check-box" v-if="isDeleting"></el-checkbox>
        <OneBlog :avatarUrl="item.userPicture" :blogId="item.id" :username="item.username" :likes="item.likes">
        <span slot="username">{{item.username}}</span>
        <span slot="date">{{item.creatTime}}</span>
        <div slot="=title">{{item.title}}</div>
        <div slot="content" v-html="item.content">{{item.content}}</div>
        <span slot="views">{{item.view}}</span>
      </OneBlog>
      </div>
    </div>
    <Empty :text="'暂无数据'" v-if="blog.length===0"></Empty>
  </div>
</template>

<script>
  import Empty from "../common/Empty";
  import {getDraft} from "../../api/user/EditorController/getDraft";
  import OneBlog from "../common/OneBlog";
  import {allTags} from "../../api/user/BlogController/allTags";
  import {deleteBlog} from "../../api/user/BlogController/deleteBlog";
  export default {
    name: "MyDraft",
    components:{
      OneBlog,
      Empty
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
    data(){
      return{
        value: "",
        tags: [{
          id:-1,
          name:"全部"
        }],
        blogSave: [],
        blog: [],
        defaultAvatar: this.$global.defaultAvatar,
        avatar: this.$store.state.portraitPath,
        //删除
        checked: ["false"],
        isDeleting:false
      }
    },
    methods: {
      toAll() {
        this.blog = this.blogSave
      },
      toTags(item, index) {
        this.blog = this.blog.filter(value => value.type = item, index)
      },
      toDeleteBlog(){
        for(var i=0; i<this.blog.length; i++){
          if(this.blog[i].checked){
            deleteBlog(this.blog[i].id).then(res => {
              console.log("deleteBlog",res)
              if (res.status === 200) {
                if (res.data.code === 200) {
                  this.$message.success("删除成功")
                  this.blog.splice(i,1)
                  location.reload();
                  // this.tags.push.apply(this.tags, res.data.data);
                } else {
                }
              } else {
              }
            }).catch(err => {
              console.log(err)
            });
          }
        }
        this.isDeleting=!this.isDeleting
      },
      deleteBlog(){
        this.isDeleting=!this.isDeleting
      },
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
      getDraft(this.$store.state.username).then(res=>{
        console.log("getDraft",res)
        if (res.data.code===200){
          this.blog = res.data.data.reverse().filter(item => {
            item["checked"]=false
            return item
          })
          this.blogSave =  res.data.data.reverse().filter(item => {
            item["checked"]=false
            return item
          })
        }
      }).catch(err=>{})
    }
  }
</script>

<style lang="scss" scoped>
  .my-note{
    margin: 20px auto;
    .one-collect{
      display: flex;
      flex-direction: row;
      justify-content:center;
      margin: 20px auto;
      .one-note-box{
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content:center;
      }
      .check-box{
        /*margin: auto;*/
        /*margin-left: 100px;*/
      }
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
