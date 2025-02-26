<template>
  <div>
    <el-form ref="form" label-width="80px" :inline="false" size="normal">
      <el-form-item label="SPU名称" size="normal">
        <span>{{ spu.spuName }}</span>
      </el-form-item>

      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="价格(元)"
          type="number"
          v-model="skuInfo.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" type="number" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          placeholder="规格描述"
          type="textarea"
          rows="4"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form label-width="80px" :inline="true" size="normal">
          <el-form-item
            :label="attr.attrName"
            size="normal"
            v-for="(attr, index) in attrInfoList"
            :key="attr.id"
            style="margin-bottom: 10px"
          >
            <el-select
              v-model="attr.attrIdAndAttrValueId"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="(attrValue, index) in attr.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attrValue.attrId}:${attrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="80px" :inline="true" size="normal">
          <el-form-item
            :label="saleAttr.saleAttrName"
            size="normal"
            v-for="(saleAttr, index) in spuSaleAttrList"
            :key="saleAttr.id"
            style="margin-bottom: 10px"
          >
            <el-select
              v-model="saleAttr.saleAttrIdAndSaleAttrValueId"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表" size="normal">
        <el-table
          border
          stripe
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" prop="prop" width="60px">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                size="default"
                @click="changeDefault(row)"
                v-if="row.isDefault === 0"
                >设为默认</el-button
              >
              <el-button type="success" plain disabled v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      spu: {},
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      skuInfo: {
        // 从父组件那里获取的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 通过v-model数据双向绑定获取的数据
        skuName: "",
        price: "",
        weight: "",
        skuDesc: "",
        // 需要自己传入的
        skuDefaultImg: "",
        skuImageList: [
          // {
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   spuImgId: 0,
          // },
        ],
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   id: 0,
          // },
        ],
        skuSaleAttrValueList: [
          // {
          //   saleAttrId: 0,
          //   saleAttrValueId: 0,
          // },
        ],
      },
      imgList: [],
    };
  },
  methods: {
    async getSpuImageList(spuId) {
      let result = await this.$API.spu.reqSpuImageList(spuId);

      if (result.code === 200) {
        let tmp = result.data;
        tmp.forEach((item) => {
          item.isDefault = 0;
        });
        this.spuImageList = tmp;
        return "ok";
      }
    },
    async getSpuSaleAttrList(spuId) {
      let result = await this.$API.spu.reqSpuSaleAttrList(spuId);

      if (result.code === 200) {
        this.spuSaleAttrList = result.data;
        return "ok";
      }
    },
    async getAttrInfoList(category1Id, category2Id, category3Id) {
      let result = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );

      if (result.code === 200) {
        this.attrInfoList = result.data;
        return "ok";
      }
    },
    initSkuData(category1Id, category2Id, row) {
      this.skuInfo.category3Id = row.category3Id;
      this.skuInfo.spuId = row.id;
      this.skuInfo.tmId = row.tmId;
      this.spu = row;
      // console.log(row);
      this.getSpuImageList(row.id);
      this.getSpuSaleAttrList(row.id);
      this.getAttrInfoList(category1Id, category2Id, row.category3Id);
    },
    handleSelectionChange(params) {
      this.imgList = params;
    },
    changeDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });

      row.isDefault = 1;
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    cancel() {
      this.$emit("changeScenes", 0);
      Object.assign(this._data, this.$options.data());
    },
    async onSubmit() {
      const { attrInfoList, imgList, spuSaleAttrList, skuInfo } = this;

      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndAttrValueId) {
          const [attrId, attrValueId] = item.attrIdAndAttrValueId.split(":");
          prev.push({ attrId, valueId:attrValueId });
        }

        return prev;
      }, []);

      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.saleAttrIdAndSaleAttrValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.saleAttrIdAndSaleAttrValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }

        return prev;
      }, []);

      // 整理图片数据
      skuInfo.skuImageList = imgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });

      let result = await this.$API.spu.reqSaveSkuInfo(skuInfo);
      // console.log(result);

      if (result.code === 200) {
        this.$message({ type: "success", message: "添加SKU成功" });
        this.$emit("changeScenes", 0);
      }

      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style>
</style>