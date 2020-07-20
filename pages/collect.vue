<template>
  <div class="main">
    <!-- tab栏 -->
    <van-tabs v-model="active" @change="tabChange" color="#0077C2" scrollspy sticky animated>
      <van-tab title="全部">
        <card-h5 v-for="item in list" :key="item.aid" :model="item"></card-h5>
      </van-tab>
      <van-tab title="营养基础">
        <card-h5 v-for="item in list" :key="item.aid" :model="item"></card-h5>
      </van-tab>
      <van-tab title="专家讲座">
        <card-h5 v-for="item in list" :key="item.aid" :model="item"></card-h5>
      </van-tab>
      <van-tab title="病例分享">
        <card-h5 v-for="item in list" :key="item.aid" :model="item"></card-h5>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      list: [],
      type:['', '营养基础', '专家讲座', '病例分享']
    };
  },
  created() {
    this.getCollectList();
  },
  methods: {
    // 切换tab
    tabChange(index) {
      this.active = index;
      this.getCollectList({module: this.type[index]});
    },

    // 获取收藏列表
    async getCollectList(param = {}) {
      try {
        const res = await this.api.cf_collect_list(param);
        this.list = res.result  ? res.result : [];
        // this.list = [...this.list, ...news_list];
        // if (news_list.length < 10) {
        //   this.finished = true;
        // } else {
        //   this.loading = false;
        // }
        // this.page++;
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style lang='scss' scoped>
/deep/ .van-tab__pane {
  font-size: 0.28rem;
}
</style>