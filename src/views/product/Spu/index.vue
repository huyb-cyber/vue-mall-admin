<template>
  <div>
    <el-card shadow="always" style="margin: 20px 0px">
      <CategorySelector
        @getCategoryId="getCategoryId"
        :show="scene !== 0"
      ></CategorySelector>
    </el-card>
    <el-card shadow="always">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="default"
          @click="addSpu"
          :disabled="!category3Id"
          >添加SPU</el-button
        >
        <el-table border style="margin: 20px 0px" :data="spuList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column label="spu描述" width="width" prop="description">
          </el-table-column>
          <el-table-column label="操作" width="width" prop="prop">
            <template slot-scope="{ row, $index }">
              <HintButton
                type="success"
                size="mini"
                icon="el-icon-plus"
                title="添加sku"
                @click="addSku(row)"
              />
              <HintButton
                type="warning"
                size="mini"
                icon="el-icon-edit"
                title="修改spu"
                @click="updateSpu(row)"
              />
              <HintButton
                type="info"
                size="mini"
                icon="el-icon-info"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              />

              <el-popconfirm
                :title="`确定删除${row.spuName}?`"
                @onConfirm="deleteSpu(row)"
              >
                <HintButton
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                  title="删除spu"
                ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <SpuForm v-show="scene === 1" @changeScene="changeScene" ref="spuForm" />
      <SkuForm
        v-show="scene === 2"
        @changeScenes="changeScenes"
        ref="skuForm"
      />
      <el-pagination
        v-show="scene === 0"
        style="text-align: center"
        @size-change="sizeChange"
        @current-change="getSpuList"
        :current-page.sync="page"
        :page-sizes="[3, 5, 10]"
        :page-size="limit"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        :pager-count="7"
      >
      </el-pagination>
    </el-card>

    <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table :data="skuList" border stripe v-loading="loading">
        <el-table-column 
          prop="skuName"
          label="名称"
          width="width">
        </el-table-column>
        <el-table-column 
          prop="price"
          label="价格"
          width="width">
        </el-table-column>
        <el-table-column 
          prop="weight"
          label="重量"
          width="width">
        </el-table-column>
        <el-table-column 
          label="默认图片"
          width="width">
          <template slot-scope="{row, $index}">
            <img :src="row.skuDefaultImg" alt="" style="height: 100px;width: 100px;">
          </template>
        </el-table-column>
      </el-table>
      
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "@/views/product/Spu/SpuForm";
import SkuForm from "@/views/product/Spu/SkuForm";
import { Loading } from "element-ui";

export default {
  name: "Spu",
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      category1Id: "",
      category2Id: "",
      category3Id: "",
      spuList: [],
      scene: 0,
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      loading: true,
    };
  },
  methods: {
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
        this.getSpuList();
      }
    },
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;

      // try {
      //   let result = await this.$API.spu.reqSpuList(page, limit, category3Id);

      //   // console.log(result);
      //   if (result.code === 200) {

      //     this.spuList = result.data.records;
      //     return 'ok';
      //   }
      // } catch (error) {

      //   return Promise.reject('fail');
      // }
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      // console.log(result);
      if (result.code === 200) {
        this.spuList = result.data.records;
        this.total = result.data.total;
        return "ok";
      }
    },
    sizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    addSpu() {
      this.scene = 1;
      this.$refs.spuForm.initSpuDataWhenAdd(this.category3Id);
    },
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spuForm.initSpuDataWhenUpdate(row);
      // console.log(row);
    },
    changeScene({ scene, flag }) {
      this.scene = scene;
      if (flag === "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    async deleteSpu(row) {
      console.log(row);
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      // console.log(result);
      if (result.code === 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.spuList.length > 1 ? this.page : this.page - 1);
        return "ok";
      }
    },
    addSku(row) {
      this.scene = 2;
      this.$refs.skuForm.initSkuData(this.category1Id, this.category2Id, row);
    },
    changeScenes(scene) {
      this.scene = scene;
      // console.log(scene);
    },
    async handler(spu) {

      this.dialogTableVisible = true;
      this.spu = spu;
      let result = await this.$API.spu.reqSkuList(spu.id);
      // console.log(result);
      if (result.code === 200) {

        this.skuList = result.data
        this.loading = false;
      }
    },
    close(done) {

      this.loading = true;
      this,this.skuList = [];
      done();
    }
  },
  components: {
    SpuForm,
    SkuForm,
  },
};
</script>

<style>
</style>