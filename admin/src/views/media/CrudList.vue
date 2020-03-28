<template>
  <div v-if="option.column" class="crud-content">
    <h3>{{option.title}}</h3>
    <avue-crud
      :data="data"
      :option="option"
      v-model="obj"
      :page.sync="page"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="pageChange"
      @sort-change="sortChange"
      @search-change="searchChange"
      @search-reset="searchReset"
    >
      <template #file="{row}">
        <div>
          <video preload="metadata" :src="row.file" alt style="height:50px;min-width: 50px;" />
        </div>
      </template>
    </avue-crud>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({})
export default class MediaList extends Vue {
  @Prop({
    type: String,
    required: true
  })
  resources!: String;
  data = [];
  obj = {};
  page = {
    total: 0,
    pagerCount: 5,
    currentPage: 1,
    pageSize: 10
    // pageSizes: [10, 20, 30, 40, 50, 100]
  };
  option: any = {
    // title: "媒体管理",
    // column: [
    //   {
    //     label: "ID",
    //     prop: "_id",
    //     addDisplay: false,
    //     editDisplay: false,
    //     row: true
    //   },
    //   { label: "名字", prop: "name", row: true },
    //   { label: "封面", prop: "post", row: true }
    // ]
  };
  query: any = {
    limit: this.page.pageSize,
    page: this.page.currentPage,
    sort: {
      updatedAt: -1
    }
  };

  async create(row, done, loading) {
    const props = this.getNeedProps(row);
    await this.$axios.post(`/${this.resources}`, { ...props });
    this.$message({ type: "success", message: "保存成功！" });
    this.getData();
    done();
  }

  async update(row, index, done, loading) {
    const props = this.getNeedProps(row);
    const { _id } = row;
    await this.$axios.put(`/${this.resources}/${_id}`, { ...props });
    this.$message({ type: "success", message: "修改成功！" });
    this.getData();
    done();
  }

  async remove(row, index) {
    const { _id } = row;
    this.$confirm("确认删除吗？", "确认删除", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(async () => {
        await this.$axios.delete(`/${this.resources}/${_id}`);
        this.$message({ type: "success", message: "删除成功" });
        this.getData();
      })
      .catch(() => {});
  }
  async getData() {
    const res = await this.$axios.get(`/${this.resources}`, {
      params: {
        query: this.query
      }
    });
    this.data = res.data.data;
    this.page.total = res.data.total;
  }

  async getOptions() {
    const res = await this.$axios.get(`/${this.resources}/options`);
    this.option = res.data;
  }
  pageChange(page) {
    this.query.page = page.currentPage;
    this.query.limit = page.pageSize;
    this.getData();
  }

  //排序方法
  sortChange({ order, prop }) {
    if (!order) {
      this.query.sort = null;
    } else {
      this.query.sort = {
        [prop]: order === "ascending" ? 1 : -1
      };
    }
    this.getData();
  }

  // 清空搜索
  searchReset() {
    this.query = {};
    this.getData();
  }

  // 搜索方法
  async searchChange(val, done) {
    for (let item in val) {
      const field = this.option.column.find(v => v.prop === item);
      if (field.regex) {
        val[item] = { $regex: val[item] };
      }
    }
    this.query.where = {
      ...val
    };
    await this.getData();
    done();
  }

  // 获取需要的字段，hidden判断
  getNeedProps(data) {
    const propList = this.option.column.reduce((pre, item) => {
      if (item.prop && !item.formHidden) pre.push(item.prop);
      return pre;
    }, []);
    let res = {};
    propList.forEach(i => (res[i] = data[i]));
    return res;
  }

  created() {
    this.getData();
    this.getOptions();
  }
}
</script>

<style lang='less'>
.avue-upload__avatar {
  height: auto;
}
</style>