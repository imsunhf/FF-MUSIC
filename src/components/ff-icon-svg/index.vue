<template>
  <svg :width="width" :height="height" aria-hidden="true">
    <use :xlink:href="icon"></use>
  </svg>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 20
    },
    height: {
      type: Number,
      default: 20
    }
  },
  computed: {
    icon () {
      return `#ff-${this.name}`
    }
  }
}
</script>

<style lang="scss" scoped>
svg{
  &:hover{
    transform: scale(1.2);
  }
}
</style>