<template>
  <div class="home">
    <!-- <ff-icon-svg v-for="i in $IconSvg" :key="i" class="icon" :name="i"></ff-icon-svg> -->
    <div class="home-l" ref="homeL">
      <div class="s-button">Save to My stars</div>
      <span class="title">Katy Perry</span>
      <ul class="list_wrap" ref="listWrap">
        <li v-for="list in playLists" :key="list.id" >
          <img 
            :data-key="list.id"
            :class="{active: activeId === list.id}" 
            :src="list.coverImgUrl" alt 
            @click="e => handleClickImg(e,list)" />
          <span class="name">{{list.copywriter}}</span>
          <span class="time">2017</span>
        </li>
      </ul>
    </div>
      <div class="home-r" v-show="activeId">
        <ul>
          <transition-group enter-active-class="animate__animated animate__fadeIn">
            <li
              v-for="(music, index) in playListPreview"
              :key="music.id"
              @click="handleClickMusic(index)"
              :class="{'active': musicId === music.id}"
            >
              <span>
                <ff-icon-svg class="icon_play" v-if="musicId === music.id" name="qp_icon_portal"></ff-icon-svg>
                <span class="music__name">{{music.name}}</span>
              </span>
              <!-- <span>{{music.ar.name}}</span> -->
            </li>
          </transition-group>
        </ul>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getHighQuality, getListDetails } from "@/api/song";
import { mapState, mapMutations } from "vuex";
import { formatSongList } from "@/libs/util.song.js";
import scrollIntoView from '@/libs/utils/scrollTo.js'
export default {
  name: "home",
  data() {
    return {
      playLists: [],
      playListPreview: [],
      activeId: ''
    };
  },
  created() {
    this._getHighQuality();
  },
  methods: {
    ...mapMutations({
      setPlayListDetails: "common/setPlayListDetails",
      setCurrentIndex: "common/setCurrentIndex"
    }),
    async _getHighQuality() {
      const value = await getHighQuality()
      value && value.code === 200 && (this.playLists = value.playlists);
    },
    async _getListDetails(id) {
      const value = await getListDetails(id)
      if (!value || value.code !== 200) {
        return;
      }
      this.playListPreview = formatSongList(value.playlist.tracks);
    },
    handleClickImg(e, list) {
      this.activeId = list.id
      this.activeDom = e.target
      this._getListDetails(list.id);
      // e.target.scrollIntoView()()
    },
    handleClickMusic(index) {
      this.setPlayListDetails(this.playListPreview);
      this.setCurrentIndex(index);
    }
  },
  computed: {
    ...mapState("common", ["currentIndex", "playListDetails"]),
    musicId() {
      return (
        (this.playListDetails[this.currentIndex] &&
          this.playListDetails[this.currentIndex].id) ||
        ""
      );
    }
  },
  watch: {
    activeId () {
      this.$nextTick(() => {
        scrollIntoView(this.$refs.homeL, this.activeDom)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 0 84px;
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
  .home-l {
    flex: 1;
    overflow-y: auto;
    transition: all 0.3s;
  }
  .home-r {
    margin-top: 50px;
    flex-basis: 442px;
    overflow-y: auto;
    transition: all 0.3s;
    li {
      height: 58px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0 23px;
      font-size: 14px;
      @extend %unable-select;
      &:hover,
      &.active {
        background-color: rgba(24, 30, 40, 0.31);
        border-radius: 4px;
      }
      span {
        color: #fff;
        width: 100%;
        vertical-align: middle;
        @extend %text-ellipsis;
      }
      .icon_play {
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
  .s-button {
    width: 164px;
    height: 34px;
    line-height: 34px;
    border-radius: 17px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    font-size: 14px;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    margin-top: 160px;
  }
  .title {
    color: #fff;
    font-size: 90px;
    font-family: AvenirNext-Bold, AvenirNext;
    font-weight: bold;
  }
  .list_wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: -20px;
    li {
      width: 170px;
      height: 240px;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      img {
        width: 100%;
        height: auto;
        @extend %unable-select;
        &.active{
        border: 1px solid #f00;
      }
      }
      span {
        height: 19px;
        color: #fff;
        font-size: 14px;
        font-family: AvenirNext-Medium, AvenirNext;
        font-weight: 500;
        width: 100%;
        @extend %text-ellipsis;
        &.name {
          margin-top: 8px;
        }
        &.time {
          opacity: 0.6;
        }
      }
    }
  }
}
</style>