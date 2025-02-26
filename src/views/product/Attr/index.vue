<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelector
        @getCategoryId="getCategoryId"
        :show="!isShowTable"
      ></CategorySelector>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table border stripe :data="attrList">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="200px">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                size="normal"
                v-for="(attrVal, index) in row.attrValueList"
                :key="attrVal.id"
                style="margin: 0px 20px"
                >{{ attrVal.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="200px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deleteAttr(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form
          ref="form"
          label-width="60px"
          :inline="true"
          :model="attrInfoList"
        >
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfoList.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfoList.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          border
          stripe
          style="margin: 20px 0px"
          :data="attrInfoList.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="$event.target.blur()"
                :ref="$index"
              ></el-input>
              <span
                v-else
                style="display: block"
                @click="toEdit(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}?`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          @click="saveAttrInfo"
          :disabled="attrInfoList.attrValueList.length === 0"
          >保存</el-button
        >
        <el-button size="default" @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowTable: true,
      attrInfoList: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    async getAttrList() {
      // console.log(111);
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result);

      if (result.code === 200) {
        this.attrList = result.data;
        return "ok";
      }
    },
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getAttrList();
      }
    },
    addAttrValue() {
      this.attrInfoList.attrValueList.push({
        attrId: this.attrInfoList.id,
        valueName: "",
        flag: true,
      });

      this.$nextTick(() => {
        this.$refs[this.attrInfoList.attrValueList.length - 1].focus();
      });
    },
    addAttr() {
      // alert(123);
      this.isShowTable = false;
      this.attrInfoList = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    updateAttr(row) {
      this.isShowTable = false;
      this.attrInfoList = cloneDeep(row);
      this.attrInfoList.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
      // console.log(row);
    },
    async deleteAttr(row) {
      // console.log(row);
      try {
        await this.$API.attr.reqDeleteAttr(row.id);
        this.$message({ type: "success", message: "删除成功" });
        this.getAttrList();
      } catch (error) {
        this.$message({ type: "warning", message: "删除失败" });
      }
    },
    toLook(row) {
      if (row.valueName.trim() === "") {
        this.$message("输入不能为空");
        // this.attrInfoList.attrValueList.pop();
        return;
      }

      let isRepeat = this.attrInfoList.attrValueList.some((item) => {
        if (item !== row) {
          return row.valueName === item.valueName;
        }
      });

      if (isRepeat) {
        this.$message("输入不能重复");
        // this.attrInfoList.attrValueList.pop();
        return;
      }
      row.flag = false;
    },
    toEdit(row, index) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    deleteAttrValue(index) {
      this.attrInfoList.attrValueList.splice(index, 1);
    },
    async saveAttrInfo() {
      // 需要对传入参数进行预处理
      this.attrInfoList.attrValueList = this.attrInfoList.attrValueList.filter(
        (item) => {
          if (item.valueName !== "") {
            delete item.flag;
            return true;
          }
        }
      );

      try {
        await this.$API.attr.reqSaveAttrInfo(this.attrInfoList);
        this.$message({ type: "success", message: "保存成功" });
        this.getAttrList();
        this.isShowTable = true;
      } catch (error) {
        this.$message("保存失败");
      }
    },
  },
};
</script>

<style>
</style>