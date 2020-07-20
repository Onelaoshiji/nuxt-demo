<template>
  <div>
    <!-- 搜索 -->
    <van-search
      v-model="search_key"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="search"
      @clear="clear"
    />

    <!-- tab栏 -->
    <van-tabs
      v-model="active"
      @change="tabChange"
      color="#0077C2"
      :offset="100"
    >
      <van-tab title="全部">
        <van-pull-refresh
          v-model="refreshing"
          @refresh="onRefresh(getCourseLilst)"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad(getCourseLilst)"
          >
            <my-card
              v-for="item in list"
              :key="item.id"
              :model="item"
            ></my-card>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="营养基础">
        <van-pull-refresh
          v-model="refreshing"
          @refresh="onRefresh(getCourseLilst)"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad(getCourseLilst)"
          >
            <my-card
              v-for="item in list"
              :key="item.id"
              :model="item"
            ></my-card>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="专家讲座">
        <van-pull-refresh
          v-model="refreshing"
          @refresh="onRefresh(getCourseLilst)"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad(getCourseLilst)"
          >
            <my-card
              v-for="item in list"
              :key="item.id"
              :model="item"
            ></my-card>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="病例分享">
        <van-pull-refresh
          v-model="refreshing"
          @refresh="onRefresh(getCourseLilst)"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad(getCourseLilst)"
          >
            <my-card
              v-for="item in list"
              :key="item.id"
              :model="item"
            ></my-card>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import myCard from "~/components/my-card";
import mixin from "~/mixins/mixins";
export default {
  data() {
    return {
      search_key: '',
      active: 0
    };
  },
  components: { myCard },
  mixins: [mixin],
  methods: {
    // 搜索
    search(v) {
      this.list = [];
      this.page = 1;
      this.search_key = v;
      this.getCourseLilst({ keyword: v });
    },

    // 清空搜索内容
    clear() {
      this.search_key = "";
    },

    // 切换tab
    tabChange(index) {
      switch (index) {
        case 0:
          this.type = "";
          break;
        case 1:
          this.type = "营养基础";
          break;
        case 2:
          this.type = "专家讲座";
          break;
        case 3:
          this.type = "病例分享";
          break;
        default:
          break;
      }
      this.active = index;
      this.list = [];
      this.page = 1;
      this.finished = false
      this.getCourseLilst();
    },

    // 获取课程列表
    async getCourseLilst(param = {}) {
      const params = {
        module: this.type,
        page: this.page,
        keyword: ""
      };
      try {
        const res = await this.api.show_course_list(
          Object.assign(params, param)
        );
        const news_list = res.result ? res.result : [];
        this.list = [...this.list, ...news_list];
        if (news_list.length < 5) {
          this.finished = true;
        } else {
          this.loading = false;
        }
        this.page++;
        this.count = res.count;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .van-tab__pane {
  font-size: 0.28rem;
}
.none {
  font-size: 0.24rem;
  color: #aaa;
  line-height: 0.8rem;
}
</style>
