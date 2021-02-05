<template>
  <div class="play-list">
    <!-- <ff-icon-svg v-for="i in $IconSvg" :key="i" class="icon" :name="i"></ff-icon-svg> -->
     <el-carousel height="150px" type="card">
      <el-carousel-item v-for="(item, index) in banner" :key="item.targetId + '_'+ index">
        <img :src="item.imageUrl" alt="">
      </el-carousel-item>
    </el-carousel>
    <div class="module">
      <p class="title">热门推荐</p>
      <!-- <i class="el-icon el-icon-arrow-right"></i> -->
      <ff-loading v-if="topListsLoading" />
      <ul class="list_wrap" ref="listWrap">
        <li v-for="list in topLists" :key="list.id" :id="list.id">
          <div
            class="img_wrap"
            :class="{ active: activeId === list.id }"
            @click="(e) => handleClickImg(e, list)"
          >
            <img :data-key="list.id" v-lazy="list.picUrl" alt />
          </div>
          <span class="name">{{ list.name }}</span>
          <span class="time">{{ list.copywriter }}</span>
        </li>
      </ul>
    </div>

    <div class="module">
      <p class="title">精品歌单</p>
      <ff-loading v-if="HighListsLoading" />

      <!-- <i class="el-icon el-icon-arrow-right"></i> -->
      <ul class="list_wrap" ref="listWrap">
        <li v-for="list in HighLists" :key="list.id" :id="list.id">
          <div
            class="img_wrap"
            :class="{ active: activeId === list.id }"
            @click="(e) => handleClickImg(e, list)"
          >
            <img :data-key="list.id" v-lazy="list.coverImgUrl" alt />
          </div>
          <span class="name">{{ list.name }}</span>
          <span class="time">{{ list.creator.nickname }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getPersonalized, getPlaylistHigh } from '@/api/song'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  
  name: 'playList',
  data() {
    return {
      topLists: [],
      HighLists: [],
      playListPreview: [],
      activeId: '',
      topListsLoading: false,
      HighListsLoading: false,
    }
  },
  created() {
    this._getList()
    console.log(this.getBanner, 's')
    this.getBanner()
  },
  methods: {
    ...mapMutations({
      setPlayListDetails: 'common/setPlayListDetails',
      setCurrentIndex: 'common/setCurrentIndex',
    }),
    ...mapActions({
      getBanner: 'common/getBanner'
    }),
    async _getList() {
      this.HighListsLoading = true
      this.topListsLoading = true
      const value = await getPersonalized().finally(() => {
        this.topListsLoading = false
      })
      this.topLists = value.result

      const highV = await getPlaylistHigh().finally(() => {
        this.HighListsLoading = false
      })
      this.HighLists = highV.playlists
    },
    handleClickImg(e, list) {
      this.activeId = list.id
      this.activeDom = e.target
      this.$router.push({
        name: 'playListDetails',
        params: {
          id: list.id,
        },
      })
      // this._getListDetails(list.id);
      // e.target.scrollIntoView()()
    },
    handleClickMusic(index) {
      this.setPlayListDetails(this.playListPreview)
      this.setCurrentIndex(index)
    },
  },
  computed: {
    ...mapState('common', ['currentIndex', 'playListDetails', 'banner']),
    musicId() {
      return (
        (this.playListDetails[this.currentIndex] &&
          this.playListDetails[this.currentIndex].id) ||
        ''
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.play-list {
  max-width: 1080px;
  padding: 30px 84px 60px 84px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .el-carousel{
    img{
      height: 100%;
      width: auto;
    }
  }
  .module {
    transition: all 0.3s;
    .title {
      font-size: 25px;
      color: #ff0;
      font-weight: bold;
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 10;
    }
  }
  .list_wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: -20px;
    li {
      position: relative;
      width: 20%;
      padding: 20px;
      padding-top: 19%;
      margin-bottom: 20px;
      // margin-left: 20px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .img_wrap {
        position: absolute;
        top: 0;
        width: 100%;
        padding-top: 90%;
        // height: 170px;
        // width: 170px;
        overflow: hidden;
        img {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          transition: all 0.7s;
          @extend %unable-select;
          &.active {
            border: 1px solid #f00;
          }
          &:hover {
            transform: scale(1.5);
          }
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
          // margin-top: 8px;
        }
        &.time {
          opacity: 0.6;
        }
      }
    }
  }
}
</style>
