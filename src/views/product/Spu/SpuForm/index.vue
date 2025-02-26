<template>
  <div>
    <el-form
      ref="form"
      label-width="80px"
      :inline="false"
      size="normal"
      :model="spu"
    >
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌" size="normal">
        <el-select
          placeholder="请选择品牌"
          clearable
          filterable
          @change=""
          v-model="spu.tmId"
        >
          <el-option
            v-for="(tm, index) in trademarkList"
            :key="tm.id"
            :value="tm.id"
            :label="tm.tmName"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述" size="normal">
        <el-input
          placeholder="SPU描述"
          size="normal"
          clearable
          type="textarea"
          rows="4"
          v-model="spu.description"
          @change=""
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片" size="normal">
        <el-upload
          action="dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性" size="normal">
        <el-select
          :placeholder="`还有${unSelectedSaleAttrList.length}未选择`"
          clearable
          filterable
          v-model="attrIdAndAttrName"
        >
          <el-option
            v-for="(item, index) in unSelectedSaleAttrList"
            :key="item.id"
            :value="`${item.id}:${item.name}`"
            :label="item.name"
          >
          </el-option>
        </el-select>

        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus"
          @click="addSaleAttr"
          :disabled="!attrIdAndAttrName"
          >添加销售属性</el-button
        >
        <el-table border stripe :data="spu.spuSaleAttrList">
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="160px">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
                @keyup.enter.native="$event.target.blur()"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="160px">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.saleAttrName}?`"
                @onConfirm="spu.spuSaleAttrList.splice($index, 1)"
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
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="$emit('changeScene', {scene: 0, flag: '修改'});Object.assign(_data, $options.data());">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: "",
        spuImageList: [
          //   {
          //     id: 0,
          //     imgName: "string",
          //     imgUrl: "string",
          //     spuId: 0,
          //   },
        ],
        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId: 0,
          //     id: 0,
          //     saleAttrName: "string",
          //     spuId: 0,
          //     spuSaleAttrValueList: [
          //       {
          //         baseSaleAttrId: 0,
          //         id: 0,
          //         isChecked: "string",
          //         saleAttrName: "string",
          //         saleAttrValueName: "string",
          //         spuId: 0,
          //       },
          //     ],
          //   },
        ],
      },
      trademarkList: [],
      value: "",
      baseSaleAttrList: [], //对应 视频中的saleAttrList
      spuImageList: [],
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      attrIdAndAttrName: "",
    };
  },
  computed: {
    unSelectedSaleAttrList() {
      return this.baseSaleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name !== item1.saleAttrName;
        });
      });
    },
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async getSpuById(spuId) {
      let result = await this.$API.spu.reqSpuInfo(spuId);

      if (result.code === 200) {
        this.spu = result.data;
        return "ok";
      }
    },
    async getTrademark() {
      let result = await this.$API.spu.reqTrademarkList();

      //   console.log(result);
      if (result.code === 200) {
        this.trademarkList = result.data;

        return "ok";
      }
    },
    async getBaseSaleAttrList() {
      let result = await this.$API.spu.reqBaseSaleAttrList();
      //   console.log(result);

      if (result.code === 200) {
        this.baseSaleAttrList = result.data;
        return "ok";
      }
    },
    async getSpuImageList(spuId) {
      let result = await this.$API.spu.reqSpuImageList(spuId);

      // console.log(result);

      if (result.code === 200) {
        this.spuImageList = result.data;
        this.spuImageList.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        return "ok";
      }
    },
    initSpuDataWhenUpdate(row) {
      this.getSpuById(row.id);
      this.getTrademark();
      this.getBaseSaleAttrList();
      this.getSpuImageList(row.id);
    },
    initSpuDataWhenAdd(category3Id) {

      this.spu.category3Id = category3Id;
      this.getTrademark();
      this.getBaseSaleAttrList();
    },
    addSaleAttr() {
      // if (this.saleAttrList.some((item) => item.attrName === this.attrValue)) {
      //   this.$message({ type: "warning", message: "不能添加重复的属性" });
      // } else {
      //   this.saleAttrList.push({
      //     attrName: this.attrValue,
      //     attrValueList: [],
      //   });
      // }
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      this.attrIdAndAttrName = "";
    },
    deleteSaleAttr(index) {
      this.saleAttrList.splice(index, 1);
    },
    async onSubmit() {
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url,
        };
      });
      let result = await this.$API.spu.reqAddOrUpdateSpuInfo(this.spu);
      // console.log(result);
      if (result.code === 200) {
        this.$message({ type: "success", message: "保存成功" });
        this.$emit("changeScene", {scene: 0, flag: this.spu.id?'修改':'添加'});
      }
      Object.assign(this._data, this.$options.data());
    },
    showInput(row) {
      // console.log(row);
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() === "") {
        this.$message({ type: "warning", message: "属性值不能为空" });
        row.inputVisible = false;
        return;
      }
      let result = row.spuSaleAttrValueList.some(
        (item) => item.saleAttrValueName === inputValue
      );
      if (result) {
        row.inputVisible = false;
        this.$message({ type: "warning", message: "属性值不能重复" });
        return;
      }
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible = false;
    },
    handlerSuccess(response, file, fileList) {
      this.spuImageList = fileList;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>