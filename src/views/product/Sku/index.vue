<template>
  <div>
    <el-card shadow="always">
      <el-table border stripe :data="records">
        <el-table-column type="index" label="序号" width="80px" align="center">
        </el-table-column>
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="skuDesc" label="描述" width="width">
        </el-table-column>
        <el-table-column label="默认图片" width="160px" align="center">
          <template slot-scope="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="height: 100px; width: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量(KG)" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格(元)" width="80px">
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width" align="center">
          <template slot-scope="{ row, $index }">
            <el-button
              type="success"
              size="mini"
              @click="onSale(row)"
              icon="el-icon-bottom"
              v-if="row.isSale === 0"
            ></el-button>
            <el-button
              type="info"
              size="mini"
              @click="cancelSale(row)"
              icon="el-icon-top"
              v-else
            ></el-button>
            <el-button
              type="primary"
              size="mini"
              @click="edit"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              type="info"
              size="mini"
              @click="getSkuInfo(row)"
              icon="el-icon-info"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              @click=""
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: center"
        :current-page.sync="page"
        :page-sizes="[3, 5, 10]"
        :page-size="limit"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        :pager-count="7"
        @current-change="getSkuList"
        @size-change="handleSizeChange"
      >
      </el-pagination>

      <el-drawer :visible.sync="show" :show-close="false" size="50%">
        <el-row>
          <el-col :span="5">名称</el-col>
          <el-col :span="16">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">描述</el-col>
          <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">价格</el-col>
          <el-col :span="16">{{ skuInfo.price }}元</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">平台属性</el-col>
          <el-col :span="16">
            <template>
              <el-tag
                type="success"
                v-for="(attr, index) in skuInfo.skuAttrValueList"
                :key="attr.id"
                style="margin-right: 10px"
                >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
              >
            </template>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">商品图片</el-col>
          <el-col :span="16">
            <el-carousel height="300px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img :src="item.imgUrl" alt="" style="width: 100%;height: 100%;"/>
              </el-carousel-item> </el-carousel
          ></el-col>
        </el-row>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "sku",
  data() {
    return {
      page: 1,
      limit: 10,
      records: [],
      total: 0,
      skuInfo: {},
      show: false,
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    async getSkuList(pages = 1) {
      this.page = pages;
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      // console.log(result);
      if (result.code === 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    async onSale(sku) {
      let result = await this.$API.sku.reqOnSale(sku.id);
      if (result.code === 200) {
        sku.isSale = 1;
        this.$message({ type: "success", message: "上架成功" });
      }
    },
    async cancelSale(sku) {
      let result = await this.$API.sku.reqCancelSale(sku.id);
      if (result.code === 200) {
        sku.isSale = 0;
        this.$message({ type: "success", message: "下架成功" });
      }
    },
    edit() {
      this.$message({ type: "info", message: "正在开发中" });
    },
    async getSkuInfo(sku) {
      this.show = true;
      let result = await this.$API.sku.reqGetSkuById(sku.id);
      // console.log(result);
      if (result.code === 200) {
        this.skuInfo = result.data;
      }
    },
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}



</style>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}

.el-col {
  margin: 10px 10px;
}

/* >>>深度选择器 */
>>>.el-carousel__button {

  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}
</style>