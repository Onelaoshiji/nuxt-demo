<template>
  <div>
    <div class="main">
      <nuxt />
    </div>
    <div class="footer">
      <div class="item" @click="activeChange(1)">
        <svg-icon class="icon" :icon-class="active === 1 ? 'zhiboyugao-active' : 'zhiboyugao'"></svg-icon>
        <div class="txt">直播预告</div>
      </div>
      <div class="item" @click="activeChange(2)">
        <svg-icon class="icon" :icon-class="active === 2 ? 'zhibozhong-active' : 'zhibozhong'"></svg-icon>
        <div class="txt">直播中</div>
      </div>
      <div class="item" @click="activeChange(3)">
        <svg-icon class="icon" :icon-class="active === 3 ? 'woyaozhibo-active' : 'woyaozhibo'"></svg-icon>
        <div class="txt">我要直播</div>
      </div>
      <div class="item" @click="activeChange(4)">
        <svg-icon class="icon" :icon-class="active == 4 ? 'zhibohuifang-active' : 'zhibohuifang'"></svg-icon>
        <div class="txt">直播回放</div>
      </div>
      <div class="item" @click="activeChange(5)">
        <svg-icon class="icon" :icon-class="active === 5 ? 'wode-active' : 'wode'"></svg-icon>
        <div class="txt">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "my-layout",
  data() {
    return {
      active: 1
    };
  },
  methods: {
    ...mapActions(["SetActive"]),

    activeChange(active) {
      this.active = active;
      this.SetActive(active)
    }
  }
};
</script>

<style scoped>
.main {
  height: calc(100vh - 1.46rem);
}
/* 页脚tab样式 */
.footer {
  width: 7.5rem;
  display: grid;
  padding-bottom: 0.2rem;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 0.06rem 1fr 0.08rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 -0.06rem 0.15rem #eeeeee;
  justify-items: center;
  background: #fff;
}

/* tab内样式 */
.item {
  /* padding: ; */
  display: grid;
  justify-items: center;
  background: #fff;
  width: 100%;
  grid-row: 2/3;
}

/* tab文字样式 */
.txt {
  font-size: 0.2rem;
  width: 100%;
  color: rgba(87, 107, 149, 1);
  text-align: center;
}

.icon {
  font-size: 0.8rem;
}
</style>