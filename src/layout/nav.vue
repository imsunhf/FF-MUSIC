<template>
  <div class="nav_wrap">
    <div class="laba_wrap"></div>
    <el-popover
      placement="top-start"
      title=""
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <img slot="reference" class="logo" v-show="!isLab" src="../assets/logo.jpeg" alt="" />
      <a href="mailto:imsunhf@gmail.com" target="_blank">
        <ff-icon-svg name="qp_icon_xf" ></ff-icon-svg>
      </a>
      <ff-icon-svg class="call_me" name="qp_icon_qq" @click.native="handlerClickQQ"></ff-icon-svg>
    </el-popover>
    <!-- <div class="connection" v-show="!isLab">
    </div> -->
    <div class="menu">
      <h1>MUSIC</h1>
      <ul>
        <router-link tag="li" :to="{ name: 'playList' }">发现音乐</router-link>
        <router-link tag="li" :to="{ name: 'singer' }">歌手</router-link>
        <!-- <router-link tag="li" :to="{name: 'playList'}">排行</router-link>
        <router-link tag="li" :to="{name: 'playList'}">我的收藏</router-link> -->
      </ul>
      <h1>视听</h1>
      <ul>
        <router-link tag="li" :to="{ name: 'noteJump' }">可视化 + canvas</router-link>
        <router-link tag="li" :to="{ name: 'echartsJump' }">可视化 + echarts</router-link>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import qq from '@/assets/theme/qq.jpg'
export default {
  data() {
    return {
      isLab: false,
    }
  },
  methods: {
    handlerClickQQ(){
      this.$notify({
        title: 'QQ',
        dangerouslyUseHTMLString: true,
        message: `<img style="width:100%;height: auto;" src="${qq}" />`
      });
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.path.indexOf('lab') > -1) {
          this.isLab = true
          return
        }
        this.isLab = false
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.nav_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 35px;
  box-sizing: border-box;
  background: transparent;
  .logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .laba_wrap {
    position: relative;
    width: 100px;
    height: 60px;
    margin-left: -25px;
    margin-top: -10px;
  }
  .menu {
    h1 {
      height: 18px;
      color: #fff;
      font-size: 13px;
      font-family: AvenirNext-Bold, AvenirNext;
      font-weight: bold;
      margin: 50px 0 20px 0;
    }
    ul {
      margin-bottom: 40px;
      li {
        height: 19px;
        line-height: 19px;
        margin-bottom: 14px;
        color: #b4cff2;
        font-size: 14px;
        font-family: AvenirNext-Regular, AvenirNext;
        &:hover {
          @extend %unable-select;
          // background: #f00;
          color: #f00;
        }
      }
    }
    .router-link-active {
      color: #f00;
      font-weight: bold;
    }
  }
  .connection{
    margin-top: 15px;
  }
}
</style>
<style lang="scss">
    .call_me{
      margin-left: 10px;
    }
</style>
