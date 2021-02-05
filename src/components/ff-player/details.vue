<template>
  <ul>
    <li
      v-for="item in playListDetails"
      flex="dir:left main:left cross:center"
      :key="item.id"
      :class="item.id === songId ? 'active' : ''"
      @click="handleClick(item)"
    >
      <span class="name">{{ item.name }}</span>
      <span class="singer">{{ item.singer }}</span>
      <span class="duration">{{ formatTime(item.duration / 1000) }}</span>
    </li>
  </ul>
</template>

<script>
import { formatTime } from '@/utils/util.song.js'
export default {
  data() {
    return {}
  },
  props: {
    playListDetails: Array,
    songId: [String, Number],
  },
  created() {
    this.formatTime = formatTime
  },
  methods: {
    handleClick(item) {
      this.$emit('click', item)
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  li {
    font-size: 13px;
    line-height: 13px;
    padding: 15px 5px;
    box-sizing: border-box;
    cursor: pointer;
    &.active {
      // background: #3b3b3b;
      span {
        color: #f00;
        font-weight: bold;
      }
    }
    &:nth-child(2n + 1) {
      background: #3a3a3a;
    }
    .name {
      flex-basis: 50%;
      color: #cbcbcb;
      @extend %text-ellipsis;
    }
    .singer {
      flex-basis: 25%;
      color: #a6a5a5;
      @extend %text-ellipsis;
    }
    .duration {
      flex-basis: 25%;
      color: #a6a5a5;
      text-align: right;
      @extend %text-ellipsis;
    }
    &:hover {
      background: #3e3e3e;
      .name,
      .singer,
      .duration {
        color: #fff;
      }
    }
  }
}
</style>
