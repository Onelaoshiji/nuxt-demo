<template>
  <div>
    <div class="top">
      <div class="diamond">
        <img src="@/assets/pc/diamond.png" alt />
        <div class="point">
          {{num}}<span style="font-size:.43rem">分</span>
        </div>
        <div class="rule">
          积分规则
          <svg-icon class="svgIcon" icon-class="help"></svg-icon>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="option">
          <div class="name">{{item.title}}</div>
          <div class="integral">+{{item.num}}分</div>
          <div class="time">{{item.created_at.split(' ')[0].split('-').join('/') | timeFormat}}</div>
        </div>
        <div class="gap"></div>
        <div
          class="button"
          :class="list_obj[item.id] ? 'receive' : ''"
          @click="receivePoint(item)"
        >{{list_obj[item.id] ? '领取' : '已领取'}}</div>
      </div>
      <div v-if="!list.length" style="color: #aaa;font-size:.26rem">暂无积分可领取</div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
export default {
  data() {
    return {
      list: [],
      num: '',
      list_obj: {}
    };
  },
  created() {
    this.getPointList();
  },
  filters: {
    timeFormat(v) {
      const year = new Date(v).getFullYear()
      const month = new Date(v).getMonth() > 8 ? new Date(v).getMonth() + 1 : `0${new Date(v).getMonth() + 1}`
      const date = new Date(v).getDate() > 9 ? new Date(v).getDate() : `0${new Date(v).getDate()}`
      return year + '年' + month + '月' + date + '日'
    }
  },
  methods: {
    // 获取待领取积分列表
    async getPointList() {
      try {
        const res = await this.api.cf_point_list();
        this.list = res.result && res.result.list ? res.result.list : [];
        this.num = res.result.num
        this.list.forEach(item => {
          this.list_obj[item.id] = item.status == '1'
        })
      } catch (error) {
        console.log(error);
      }
    },

    // 领取积分
    async receivePoint(item) {
      if(!this.list_obj[item.id]) {
        return
      }
      try {
        const res = await this.api.cf_point({ point_id: item.id })
        this.num = Number(item.num) + Number(this.num)
        const type = res.status == '200' ? 'success' : 'error'
        this.list_obj[item.id] = false
        Toast({
          message: res.msg,
          type: type,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./css/point.scss";
</style>