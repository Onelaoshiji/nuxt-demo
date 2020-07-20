<template>
  <div class="main">
    <!-- 轮播图 -->
    <van-swipe @change="onChange">
      <van-swipe-item>
        <img class="banner-image" src="@/assets/pc/banner.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img class="banner-image" src="@/assets/pc/banner.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img class="banner-image" src="@/assets/pc/banner.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img class="banner-image" src="@/assets/pc/banner.jpg" alt />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          <div class="indicator" :class="current === 0 ? 'active' : ''"></div>
          <div class="indicator" :class="current === 1 ? 'active' : ''"></div>
          <div class="indicator" :class="current === 2 ? 'active' : ''"></div>
          <div class="indicator" :class="current === 3 ? 'active' : ''"></div>
        </div>
      </template>
    </van-swipe>

    <!-- 导航 -->
    <div class="nav">
      <div class="item">
        <svg-icon class="svgIcon" icon-class="my-home"></svg-icon>
        <div class="title">首页</div>
      </div>
      <div class="item" @click="goCourseList">
        <svg-icon class="svgIcon" icon-class="my-classmate"></svg-icon>
        <div class="title">精品课程</div>
      </div>
      <div class="item" @click="goMy">
        <svg-icon class="svgIcon" icon-class="my-center"></svg-icon>
        <div class="title">个人中心</div>
      </div>
    </div>

    <!-- 课程列表 -->
    <div class="list">
      <div class="titles">
        <div class="name">课程推荐</div>
        <div class="more" @click="goCourseList">
          查看更多
          <svg-icon class="svgicon" icon-class="right"></svg-icon>
        </div>
      </div>
      <div>
        <my-card v-for="item in course_list" :key="item.id" :model="item"></my-card>
      </div>
    </div>
  </div>
</template>

<script>
import myCard from "~/components/my-card.vue";
export default {
  data() {
    return {
      current: 0,
      page: 1,
      course_list: []
    };
  },
  components: { myCard },
  mounted() {
    this.getCourseList()
  },
  methods: {
    onChange(val) {
      this.current = val;
      console.log(this.page)
    },

    // 前往课程列表
    async goCourseList() {
      this.$router.push({
        path: '/list'
      })
    },

    // 前往个人中心
    goMy() {
      this.$router.push({
        path: '/my'
      })
    },

    // 获取课程列表
    async getCourseList(param = {}) {
      const params = {
        module: '',
        page: this.page,
        keyword: '',
        is_top: 1
      }
      try {
        const res = await this.api.show_course_list(Object.assign(params, param));
        const course_list = res.result ? res.result : []
        this.course_list = [...this.course_list, ...course_list]
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100vw;
  max-width: 750px;
  min-height: 100vh;
  background: #F4F4F5;

  /* 轮播图样式 */
  .banner-image {
    width: 7.5rem;
  }

  .custom-indicator {
    width: 7.5rem;
    height: 0.06rem;
    position: absolute;
    bottom: 0.12rem;
    left: 0;
    background: transparent;
    display: flex;
    justify-content: center;

    .indicator {
      width: 0.3rem;
      height: 0.06rem;
      border-radius: 0.03rem;
      background: #fff;
      opacity: 0.6;
      margin: 0 0.1rem;
    }

    .active {
      opacity: 1;
    }
  }

  .nav {
    width: 7.5rem;
    height: 1.88rem;
    display: flex;
    box-sizing: border-box;
    padding: 0.3rem 0;
    justify-content: space-around;
    margin-bottom: 0.15rem;
    background: #FFF;

    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .svg-icon {
        font-size: 0.82rem;
      }

      .title {
        font-size: 0.22rem;
        margin-top: 0.15rem;
      }
    }
  }

  /* 列表样式 */
  .list {
    background: #fff;
    .titles {
      display: flex;
      align-items: center;

      .name {
        height: 0.9rem;
        flex: 1;
        color: #101010;
        font-size: 0.32rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(16, 16, 16, 1);
        padding-left: 0.26rem;
        text-align: left;
        line-height: .90rem;
      }

      .more {
        height: 0.9rem;
        flex: 1;
        font-size: 0.26rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(170, 170, 170, 1);
        // padding-right: 0.34rem;
        line-height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: .50rem;
        position: relative;

        .svg-icon {
          font-size: 0.5rem;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          vertical-align: middle;
        }
      }
    }

    .item {
      padding: 0.25rem 0;
      margin: 0 .25rem;
      width: 7.00rem;
      height: 2.04rem;
      display: grid;
      grid-template-rows: auto 1fr 0.33rem;
      grid-template-columns: 2.18rem repeat(2, 1fr);
      grid-row-gap: 0.05rem;
      grid-column-gap: 0.17rem;
      border-bottom: .01rem solid #F7F7F7;

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
        height: 100%;
        font-size: 0.28rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(50, 50, 50, 1);
        justify-self: start;
        align-self: start;
        text-align: left;
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

    .item:first-child {
      padding-top: 0;
      height: 1.79rem;
    }

    .item:last-child {
      border: none;
    }
  }
}

/deep/.van-swipe .van-swipe-item {
  width: 7.5rem;
}
</style>
