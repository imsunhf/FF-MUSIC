<template>
  <div class="app_wrap" :class="{ isHide: isLab }">
    <div class="header">
      <ff-header />
    </div>
    <div class="nav">
      <s-nav class="layout_nav"></s-nav>
    </div>
    <ff-song-loading v-if="songLoading" class="song-loading" />
    <div class="content" :class="{ 'has-bg': !isLab }">
      <transition name="fade">
        <keep-alive :include="['playList', 'singer']">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <div class="player" >
      <ff-player></ff-player>
    </div>
    <div class="panel" :class="isShowPanel ? 'show' : 'hide'">
      <ff-panel></ff-panel>
    </div>
  </div>
</template>

<script>
import SNav from './nav'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      bg: ['noteJump'],
      isLab: false,
    }
  },
  methods: {
    ...mapMutations({
      setPlayStatus: 'common/setPlayStatus',
    }),
  },
  computed: {
    ...mapState('common', ['isShowPanel', 'songLoading']),
  },
  components: {
    SNav,
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to && to.meta.isLab) {
          this.isLab = true
          this.setPlayStatus(false)
        } else if ( from && from.meta.isLab) {
          this.isLab = false
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.app_wrap {
  min-width: 1130px;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgba(21, 27, 37, 1) 0%,
    rgba(28, 33, 43, 1) 100%
  );
  &.isHide {
    padding-top: 0;
    .header{
      height: 0;
      overflow: hidden;
    }
    .player{
      height: 0;
    }
  }
  .header{
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background: #2b2b2b;
    z-index: 100;
  }
  .song-loading {
    position: fixed;
    top: 0;
    left: 50%;
    color: #fff;
    background: transparent;
    z-index: 1000;
  }
  .nav {
    flex-basis: 180px;
    overflow-y: auto;
    background: #202020;
    .layout_nav {
      position: relative;
      z-index: 2;
    }
  }
  .content {
    flex: 1;
    overflow-y: auto;
    // background: url(../assets/theme/CMYK__RGB.png);
    background: #202020;
    background-size: cover;
    transition: all 0.3s;
    &.has-bg {
      background: #252525;
    }
  }
  .player {
    height: 60px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1000;
    transition: all 0.15s;
  }
  .panel {
    position: absolute;
    width: 100%;
    height: 100%;
    // padding-bottom: 100%;
    // background: #fbfbfb;
    top: 100%;
    transition: all 0.5s;
    z-index: 10;
    &.hide {
      transform: none;
    }
    &.show {
      transform: translateY(-100%);
    }
  }
}
</style>
