<template>
  <div>
    <el-button type="primary" size="default" v-show="$store.state.user.buttons.indexOf('btn.bb') != -1">bb</el-button>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>