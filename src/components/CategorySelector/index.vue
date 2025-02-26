<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="categoryForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="categoryForm.category1Id"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="categoryForm.category2Id"
          @change="handler2"
          :disabled="show"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="categoryForm.category3Id"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in list2"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reqCategory1List } from "@/api/product/attr";
import { Level } from "chalk";
export default {
  name: "CategorySelector",
  props: ["show"],
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      categoryForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  methods: {
    async getCategory1List() {
      let result = await this.$API.attr.reqCategory1List();
      if (result.code === 200) {
        this.list1 = result.data;
        return "ok";
      }
    },
    async handler1() {
      this.list2 = [];
      this.list3 = [];
      this.categoryForm.category2Id = "";
      this.categoryForm.category3Id = "";
      const { category1Id } = this.categoryForm;
      this.$emit("getCategoryId", { categoryId: category1Id, level: 1 });
      let result = await this.$API.attr.reqCategory2List(category1Id);

      if (result.code === 200) {
        this.list2 = result.data;
      }
    },
    async handler2() {
      this.list3 = [];
      this.categoryForm.category3Id = "";
      const { category2Id } = this.categoryForm;
      this.$emit("getCategoryId", { categoryId: category2Id, level: 2 });
      let result = await this.$API.attr.reqCategory3List(category2Id);

      if (result.code === 200) {
        this.list3 = result.data;
      }
    },
    async handler3() {
      const { category3Id } = this.categoryForm;
      this.$emit("getCategoryId", { categoryId: category3Id, level: 3 });
    },
  },
  mounted() {
    this.getCategory1List();
  },
};
</script>

<style>
</style>