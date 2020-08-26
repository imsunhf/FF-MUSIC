<template>
  <div class="nav_wrap">
    <img src="../assets/logo.jpeg" alt="">

    <div class="menu">
      <h1>MUSIC</h1>
      <ul>
        <li>Discover</li>
        <li>Rising</li>
        <li>Inspiration</li>
        <li>My stars</li>
      </ul>
      <ul>
        <li>Songs</li>
        <li>Artists</li>
        <li>Albums</li>
        <li>Radio</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.nav_wrap{
  width: 100%;
  height: 100%;
  padding: 35px;
  box-sizing: border-box;
  background:linear-gradient(180deg,rgba(21,27,37,1) 0%,rgba(28,33,43,1) 100%);
  img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .menu{
    h1{
      height: 18px;
      color: #fff;
      font-size:13px;
      font-family:AvenirNext-Bold,AvenirNext;
      font-weight:bold;
      margin: 50px 0 20px 0;
    }
    ul{
      margin-bottom: 40px;
      li{
        height: 19px;
        line-height: 19px;
        margin-bottom: 14px;
        color: #B4CFF2;
        font-size:14px;
        font-family:AvenirNext-Regular,AvenirNext;
        &:hover{
          @extend %unable-select;
          // background: #f00;
          color: #f00;
        }
      }
    }
  }
}
</style>