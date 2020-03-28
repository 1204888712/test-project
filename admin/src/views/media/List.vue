<template>
  <div>
    <h4>媒体列表</h4>
    <div class="buttons-group">
      <el-button type="primary" @click="$router.push('/media/create')" size="small">新增</el-button>
    </div>
    <el-table :data="data" border stripe>
      <el-table-column
        v-for="(col, name) in columns"
        :prop="name"
        :key="name"
        :label="col.label"
        :width="col.width"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button type="primary" size="mini" @click="$router.push(`/media/edit/${row._id}`)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteItem(row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class MediaList extends Vue {
  data = [];

  columns = {
    _id: { label: "ID" },
    name: { label: "名字" },
    post: { label: "封面" }
  };

  async getData() {
    const res = await this.$axios.get("/media");
    this.data = res.data.data;
  }

  async deleteItem(id:any) {
    this.$confirm("确认删除", "", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(async () => {
        await this.$axios.delete(`/media/${id}`);
        this.$message({ type: "success", message: "删除成功" });
        this.getData();
      })
      .catch(() => {});
  }

  created() {
    this.getData();
  }
}
</script>

<style>
</style>