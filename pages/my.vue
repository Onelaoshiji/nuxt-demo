<template>
  <div>
    <div class="top">
      <div class="banner">
        <img class="image" src="@/assets/pc/my-banner.png" alt="">
      </div>
      <div class="user">
        <div class="header-image">
          <div class="image"></div>
        </div>
        <div class="name">{{nickname}}</div>
        <div class="mobile">{{mobile}}</div>
      </div>
    </div>

    <div class="list">
      <div class="item" @click="goPerson">
        <div class="icon">
          <svg-icon class="svgIcon" icon-class="my-info"></svg-icon>
        </div>
        <div class="name">个人信息</div>
        <div class="flex-gap"></div>
        <div class="right">
          <svg-icon class="svgIcon" icon-class="right" />
        </div>
      </div>
      <div class="item" @click="goPoint">
        <div class="icon">
          <svg-icon class="svgIcon" icon-class="my-point"></svg-icon>
        </div>
        <div class="name">我的积分</div>
        <div class="flex-gap"></div>
        <div class="right">
          <svg-icon class="svgIcon" icon-class="right" />
        </div>
      </div>
      <div class="item" @click="goStudy">
        <div class="icon">
          <svg-icon class="svgIcon" icon-class="my-study"></svg-icon>
        </div>
        <div class="name">我的学习</div>
        <div class="flex-gap"></div>
        <div class="right">
          <svg-icon class="svgIcon" icon-class="right" />
        </div>
      </div>
      <div class="item" @click="goCollect">
        <div class="icon">
          <svg-icon class="svgIcon" icon-class="my-collect"></svg-icon>
        </div>
        <div class="name">我的收藏</div>
        <div class="flex-gap"></div>
        <div class="right">
          <svg-icon class="svgIcon" icon-class="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: '',
      mobile: ''
    };
  },
  created () {
    this.getUserData()
  },
  methods: {
    // 个人信息
    goPerson() {
      this.$router.push('/person')
    },

    // 我的积分
    goPoint() {
      this.$router.push('/point')
    },

    // 我的学习
    goStudy() {
      this.$router.push('/study')
    },

    // 我的收藏
    goCollect() {
      this.$router.push('/collect')
    },

    // 获取用户数据
    async getUserData() {
      try {
        const res = await this.api.get_user_center();
        this.user_info = res.result ? res.result : {};
        this.mobile = this.user_info.mobile;
        this.nickname = this.user_info.nickname;
      } catch (val) {
        console.log(val)
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import './css/my.scss'
</style>