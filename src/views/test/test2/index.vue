<template>
  <div>
    <el-button type="primary" size="default" v-show="$store.state.user.buttons.indexOf('btn.cc') != -1">cc</el-button>
    <el-button type="primary" size="default" v-show="$store.state.user.buttons.indexOf('btn.dd') != -1">dd</el-button>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>