<template>
  <div class="header" flex="dir:left main:right cross:center">
     <el-input
     ref="input"
        class="search-song"
        placeholder="搜索。。。"
        prefix-icon="el-icon-search"
        @focus="handleFocus"
        @blur="handleBlur"
        @click.native="handleClick"
        v-model="input">
      </el-input>
      <ff-search ref="search" :searchResult="searchResult" @closed="handleClosed"/>
  </div>
</template>
<script>
import FfSearch from '@/components/ff-search'
import {getSearchSuggest} from '@/api/song'
export default {
  data(){
    return {
      input: '',
      isShowSearch: false,
      searchResult: null
    }
  },
  methods:{
    handleFocus(){
      this.isFocus = true
    },
    handleBlur(){
      this.isFocus = false
      // this.$refs.search.hide()
    },
    handleClick(){
      this.isFocus && this.$refs.search.show()
    },
    handleClosed(){
      setTimeout(() => {
        this.$refs.input.blur()
      })
    }
  },
  watch: {
    input(v){
      if (v) {
        getSearchSuggest(v).then(res => {
          this.searchResult = res.result
        })
      } else {
        this.searchResult = []
      }
    }
  },
  components: {
    FfSearch
  }
}
</script>

<style lang="scss" scoped>
.header{
  padding: 0 10px;
  box-sizing: border-box;
  .search-song{
    height: 30px;
    width: 150px;
    border-radius: 15;
    z-index: 200000;
    overflow: hidden;
    ::v-deep.el-input__inner{
      border-radius: 15px;
      height: 30px;
      background: #252525;
    }
    ::v-deep.el-input__icon{
      line-height: 30px;
    }
  }
}
</style>