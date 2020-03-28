<template>
  <div class="media-edit">
    <h4>{{isNew?'创建':'编辑'}}列表</h4>
    <ele-form v-model="data" :form-desc="fileds" :request-fn="submit"></ele-form>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class MediaEdit extends Vue {
  @Prop({
    default: "",
    type: String
  })
  id;
  get isNew() {
    return !this.id;
  }

  data = {};

  fileds = {
    name: { label: "名称", type: "input" },
    post: { label: "封面", type: "input" }
  };

  async getData() {
    const res = await this.$axios.get(`/media/${this.id}`);
    this.data = res.data;
  }

  async submit(data) {
    const url = this.isNew ? "/media" : "/media/" + this.id;
    const method = this.isNew ? "post" : "put";
    await this.$axios[method](url, data);
    this.$message({ type: "success", message: "保存成功！" });
    this.$router.go(-1);
  }

  created() {
    this.isNew ? null : this.getData();
  }
}
</script>

<style>
</style>