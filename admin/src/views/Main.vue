<template>
  <el-container>
    <el-aside width="200px">
      <!-- Aside content -->
      <!-- 菜单 -->
      <el-menu style="height:100vh" mode="vertical" :default-active="$route.path" router>
        <el-submenu
          v-for="(item, index) in menus.items"
          :index="index + 1  + ''"
          :key="`menu-item-${index}`"
        >
          <template slot="title">{{item.title}}</template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :index="subItem.path"
            :key="`menu-item-${index}-${subIndex}`"
          >{{subItem.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height>
        <!-- Header content -->
        <h3>NEST</h3>
      </el-header>
      <el-main height>
        <!-- Main content -->
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Main extends Vue {
  menus = {
    items: [
      {
        title: "内容管理",
        items: [
          {
            title: "首页",
            path: "/"
          },
          {
            title: "媒体管理",
            path: "/media/list"
          },
          {
            title: "文件管理",
            path: "/episodes/list"
          }
        ]
      },
      {
        title: "运营管理",
        items: [
          {
            title: "用户管理",
            path: "/operation/user"
          }
        ]
      }
    ]
  };
}
</script>
<style lang='less' scoped>
</style>
