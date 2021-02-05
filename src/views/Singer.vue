<template>
  <div class="singer-list">
    <!-- <ff-icon-svg v-for="i in $IconSvg" :key="i" class="icon" :name="i"></ff-icon-svg> -->
    <div class="filter" flex="dir:top main:left">
      <dl flex="dir:left" @click="handleClick($event, 'area')">
        <dt class="label">语种：</dt>
        <div>
          <dd data-area="-1" :class="{ active: area === '-1' }">全部</dd>
          <dd data-area="7" :class="{ active: area === '7' }">华语</dd>
          <dd data-area="96" :class="{ active: area === '96' }">欧美</dd>
          <dd data-area="8" :class="{ active: area === '8' }">日本</dd>
          <dd data-area="16" :class="{ active: area === '16' }">韩国</dd>
          <dd data-area="0" :class="{ active: area === '0' }">其它</dd>
        </div>
      </dl>
      <dl flex="dir:left" @click="handleClick($event, 'type')">
        <dt class="label">分类：</dt>
        <div>
          <dd data-type="-1" :class="{ active: type === '-1' }">全部</dd>
          <dd data-type="1" :class="{ active: type === '1' }">男歌手</dd>
          <dd data-type="2" :class="{ active: type === '2' }">女歌手</dd>
          <dd data-type="3" :class="{ active: type === '3' }">乐队</dd>
        </div>
      </dl>
      <dl flex="dir:left" @click="handleClick($event, 'initial')">
        <dt class="label">筛选：</dt>
        <div>
          <dd data-initial="-1" :class="{ active: initial === '-1' }">热门</dd>
          <dd
            v-for="letter in letters"
            :class="{ active: initial === letter.toLowerCase() }"
            :key="letter"
            :data-initial="letter.toLowerCase()"
          >
            {{ letter }}
          </dd>
        </div>
      </dl>
    </div>
    <div class="module">
      <ul class="list_wrap" ref="listWrap">
        <li v-for="list in singerLists" :key="list.id">
          <div class="img_wrap" @click="handleClickImg($event, list)">
            <img :data-key="list.id" v-lazy="list.img1v1Url" alt />
          </div>
          <span class="name">{{ list.name }}</span>
          <!-- <span class="time">{{list.creator.nickname}}</span> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getSingerList } from '@/api/singer'

export default {
  name: 'singer',
  data() {
    return {
      singerLists: [],
      type: '-1',
      area: '-1',
      initial: '-1',
    }
  },
  created() {
    this._getList()
    this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  },
  methods: {
    async _getList() {
      const value = await getSingerList(this.type, this.area, this.initial)
      value && value.code === 200 && (this.singerLists = value.artists)
    },
    handleClickImg(e, list) {
      this.activeId = list.id
      this.$router.push({
        name: 'singerDetails',
        params: {
          id: list.id,
        },
      })
      // this._getListDetails(list.id);
      // e.target.scrollIntoView()()
    },
    handleClick(e, type) {
      if (e.target.nodeName.toLowerCase() === 'dd') {
        this[type] = e.target.dataset[type]
      }
    },
  },
  computed: {
    condition() {
      return this.type + this.area + this.initial
    },
  },
  watch: {
    condition() {
      this._getList()
    },
  },
}
</script>

<style lang="scss" scoped>
.singer-list {
  padding: 0 84px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .filter {
    color: #fff;
    margin: 20px 0 30px;
    dl {
      margin: 10px 0;
      div{
        flex: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .label{
        flex-basis: 57px;
      }
      dd {
        color: #777;
        margin-left: 20px;

        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
    .active {
      color: #f00 !important;
    }
  }
  .module {
    transition: all 0.3s;
  }
  .list_wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: -20px;
    li {
      width: 150px;
      height: 240px;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      .img_wrap {
        width: 150px;
        height: 150px;
        overflow: hidden;
        img {
          width: 100%;
          height: auto;
          transition: all 0.7s;
          @extend %unable-select;
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
