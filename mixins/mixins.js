export default {
  data() {
    return {
      page: 1,
      loading: false,
      refreshing: false,
      finished: false,
      list: [],
      count: null
    }
  },
  methods: {
    onRefresh(cb) {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad(cb);
    },

    onLoad(cb) {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
        this.page = 1;
        cb();
      } else {
        if (!this.finished) {
          cb();
        } else {
          this.finished = true;
        }
      }
    }
  },
}