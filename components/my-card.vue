<template>
  <div class="item" @click="goArticle(model.aid)">
    <div class="image">
      <img :src="model.files?'http://7n.m-visitor.medsci.cn/cf/'+ model.files:'@/assets/h5/list-banner.jpg'" alt />
    </div>
    <div class="title">{{model.article_title ? model.article_title : model.title}}</div>
    <div class="time">{{(model.created_at ? model.created_at : updated_at).split(' ')[0].split('-').join('/') | dateFormat}}</div>
    <div class="read">{{model.visitnum}}人看过</div>
  </div>
</template>

<script>
export default {
  name: "my-card",
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  filters: {
    dateFormat(v) {
      const date = new Date(v);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return year + "年" + month + "月" + day + "日";
    }
  },
  methods: {
    // 跳转文章详情
    goArticle(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.item {
  padding: 0.25rem 0;
  margin: 0 0.25rem;
  width: 7rem;
  height: 2.04rem;
  display: grid;
  grid-template-rows: auto 1fr 0.33rem;
  grid-template-columns: 2.18rem repeat(2, 1fr);
  grid-row-gap: 0.05rem;
  grid-column-gap: 0.17rem;
  border-bottom: 0.01rem solid #f7f7f7;

  .image {
    grid-row: 1/4;
    grid-column: 1/2;

    img {
      width: 100%;
      height: 100%;
      border-radius: 0.1rem;
    }
  }

  .title {
    grid-row: 1/2;
    grid-column: 2/4;
    width: 100%;
    font-size: 0.28rem;
    line-height: 1.5em;
    height: 3em;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(50, 50, 50, 1);
    justify-self: start;
    align-self: start;
    text-align: left;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .time {
    grid-row: 3/4;
    grid-column: 2/3;
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 0.33rem;
    color: rgba(170, 170, 170, 1);
    justify-self: start;
    align-self: center;
  }

  .read {
    grid-row: 3/4;
    grid-column: 3/4;
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 0.33rem;
    color: rgba(170, 170, 170, 1);
    justify-self: end;
    align-self: center;
  }
}
</style>