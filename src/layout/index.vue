<template>
  <div class="app_wrap">
    <div class="nav">
      <s-nav></s-nav>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="player">
      <ff-player></ff-player>
    </div>
    <div class="panel" :class="isShowPanel ? 'show': 'hide'">
      <ff-panel></ff-panel>
    </div>
  </div>
</template>

<script>
import SNav from './nav'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState('common', ['isShowPanel'])
  },
  components: {
    SNav
  }
}
</script>

<style lang="scss" scoped>
.app_wrap{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  .nav{
    flex-basis: 220px;
    overflow-y: auto;
  }
  .content {
    flex: 1;
    overflow-y: auto;
    background: url(../assets/theme/bg1.jpeg);
    background-size: cover;
  }
  .player{
    height: 60px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background:linear-gradient(225deg,rgba(147,58,175,1) 0%,rgba(230,60,86,1) 100%);
    opacity:0.9;
    overflow: hidden;
    z-index: 1000;
  }
  .panel{
    position: absolute;
    width: 100%;
    height: 100%;
    // padding-bottom: 100%;
    // background: #fbfbfb;
    top: 100%;
    transition: all .5s;
    &.hide{
      transform: none;
    }
    &.show{
      transform: translateY(-100%);
    }
  }
}
</style>