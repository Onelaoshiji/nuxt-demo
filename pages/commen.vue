<template>
  <div class="main">
    <van-field
      v-model="message"
      autosize
      :rows="6"
      type="textarea"
      placeholder="感谢你使用，可以任何想要告诉我们……"
    />
    <div class="discuss-submit" @click="submitSiscuss">发布</div>
  </div>
</template>

<script>
import {Toast} from 'vant'
export default {
  data() {
    return {
      message: ''
    };
  },
  methods: {
    async submitSiscuss() {
      const params = {
        pid: this.$route.query.id,
        classify: 'bbs',
        content: this.message
      }
      try {
        const res = await this.api.cf_comment(params);
        if(res.status === 200) {
          Toast({
            type: 'success',
            message: '评论成功',
            onClose: () => {
              this.message = ''
              this.$router.go(-1)
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
};
</script>

<style lang='scss' scoped>
.main {
  background: #FFF;
}
.discuss-submit {
  width: 6.8rem;
  height: .9rem;
  background: #2F92EE;
  color: #FFF;
  text-align: center;
  font-weight: bold;
  line-height: .9rem;
  margin: 0 auto;
  font-size: .29rem;
  border-radius: .45rem;
}
</style>