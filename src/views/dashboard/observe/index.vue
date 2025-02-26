<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12" :offset="0">
        <Search></Search>
      </el-col>
      <el-col :span="12" :offset="0">
        <Category></Category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Category from "@/views/dashboard/observe/category";
import Search from "@/views/dashboard/observe/search";
export default {
  name: "Observe",
  components: { Category, Search },
};
</script>

<style scoped>
</style>