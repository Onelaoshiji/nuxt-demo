<template>
  <div class="main" ref="main">
    <!-- 视频 -->
    <div class="video">
      <video
        :src="article.upfiles"
        controls
        :poster="'http://7n.m-visitor.medsci.cn/cf/' + article.thumb"
        @play="play"
        @pause="pause"
      ></video>
    </div>

    <!-- 视频简介 -->
    <div class="content">
      <div class="title">{{ article.article_title }}</div>
      <div class="read">{{ article.visitnum }}人看过</div>
      <div class="desc">{{ article.desc }}</div>
      <div class="down" ref="down" @click="click" v-if="article.desc > 200">
        <svg-icon class="svgIcon" icon-class="down"></svg-icon>
      </div>
    </div>

    <!-- 教授简介 -->
    <div class="professor">
      <div class="desc">
        <div class="avatar">
          <img
            :src="
              article.tags
                ? 'http://7n.m-visitor.medsci.cn/cf/' + article.tags
                : '@/assets/h5/avattar.png'
            "
            alt
          />
        </div>
        <div class="name">{{ article.author }}</div>
        <div class="message" @click="leaveMessage(article.article_id)">
          <svg-icon class="svgIcon" icon-class="pen"></svg-icon>专家留言
        </div>
        <div class="experience">{{ article.department }}</div>
      </div>

      <!-- 任职经历 -->
      <div class="serve">
        <template v-for="(item, index) in serve">
          <div :key="index">
            <span style="font-weight: bold" v-if="!index">曾任：</span>
            <span>{{ item }}</span>
            <br />
          </div>
        </template>
      </div>
    </div>

    <!-- 内容和评论 -->
    <div class="commen">
      <van-tabs
        v-model="active"
        @change="tabChange"
        color="#0077C2"
        title-active-color="#0077C2"
        line-width="0.6rem"
      >
        <van-tab title="内容">
          <div class="box" v-html="article.content"></div>
        </van-tab>
        <van-tab title="评论">
          <div class="list">
            <div
              class="item"
              v-for="(item, index) in comment_list"
              :key="index"
            >
              <div class="avatar">
                <img src="@/assets/pc/user.png" alt />
              </div>
              <div class="name">{{ item.nickname }}</div>
              <div class="commont">{{ item.content }}</div>
              <div class="time">{{ item.created_at.split(" ")[0] }}</div>
              <div
                class="like"
                @click="
                  commentlikes(item, 'comment', likes_comment_obj[index], index)
                "
              >
                <svg-icon
                  class="svgIcon"
                  v-if="likes_comment_obj[index]"
                  icon-class="like"
                />
                <svg-icon class="svgIcon" v-else icon-class="like-active" />
                {{ item.num }}
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 底部评论 -->
    <div class="footer" v-if="active">
      <van-search
        class="search"
        disabled
        shape="round"
        placeholder="有何高见，说来听听..."
        @click="showDisscuss"
      >
        <div slot="left-icon">
          <svg-icon class="svgIcon" icon-class="search"></svg-icon>
        </div>
      </van-search>
      <div class="collect" @click="collect">
        <svg-icon
          v-if="!collect_obj[article.aid]"
          class="svgIcon"
          icon-class="collect"
        ></svg-icon>
        <svg-icon
          v-if="collect_obj[article.aid]"
          class="svgIcon"
          icon-class="collect-active"
        ></svg-icon>
        <br />
        <span>收藏</span>
      </div>
      <div
        class="likes"
        @click="likes(article_id, 'article', article.point_status)"
      >
        <svg-icon
          v-if="!likes_obj[article.aid]"
          class="svgIcon"
          icon-class="like"
        ></svg-icon>
        <svg-icon
          v-if="likes_obj[article.aid]"
          class="svgIcon"
          icon-class="like-active"
        ></svg-icon>
        <br />
        <span>点赞 {{ article.pointnum }}</span>
      </div>
    </div>

    <!-- 小调研按钮 -->
    <div
      class="diaoyan"
      @click="goResearch(article.aid)"
      @touchstart="down"
      @touchmove.prevent="move"
      @touchend="up"
      ref="diaoyan"
    >
      <div class="diaoyan-content">
        <svg-icon class="svgIcon" icon-class="diaoyan"></svg-icon>
        <br />
        小调研
      </div>
    </div>

    <!-- 发布评论 -->
    <div class="discuss" v-if="show" @click.self="show = false">
      <div class="discuss-content">
        <div class="discuss-title">评论</div>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="评论审核通过后显示"
          show-word-limit
        />
        <div class="discuss-submit" @click="submitSiscuss">发布</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant"
export default {
  data() {
    return {
      loading: false,
      active: 0,
      actived: true,
      show: false,
      message: "",
      article: {},
      comment_list: [], // 评论列表
      serve: "", // 任职经历
      timer: "",
      article_id: "", // 文章id
      likes_obj: {},
      collect_obj: {},
      likes_comment_obj: {},
      playStart: "",
      playEnd: "",
      playTime: 0,
      position: {
        x: 0,
        y: 0,
      },
      can_drug: false,
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
    }
  },
  created() {
    this.article_id = this.$route.query.id
    this.getArticleDetail()
    this.timer = setTimeout(() => {
      this.addPoint()
    }, 60 * 1000)
  },
  methods: {
    click() {
      if (this.$refs.down.style.getPropertyValue("--deg")) {
        this.$refs.down.style.setProperty("--deg", "")
      } else {
        this.$refs.down.style.setProperty("--deg", 180)
      }
    },

    tabChange() {},

    // 专家留言
    leaveMessage() {
      this.$router.push({
        path: "/commen",
        query: {
          id: this.article_id,
        },
      })
    },

    // 前往小调研
    goResearch(id) {
      this.$router.push({
        path: "/research",
        query: {
          id,
        },
      })
    },

    // 显示评论框
    showDisscuss() {
      this.show = true
    },

    // 收藏
    async collect() {
      try {
        const res = await this.api.cf_collect({ article_id: this.article_id })
        if (res.status === 200) {
          if (!this.collect_obj[this.article.aid]) {
            Toast({
              type: "success",
              message: "收藏成功",
            })
          } else {
            Toast({
              type: "success",
              message: "收藏取消",
            })
          }
          this.collect_obj[this.article.aid] = !this.collect_obj[
            this.article.aid
          ]
        }
      } catch (error) {
        if (error === "/") {
          this.$router.push(error)
        }
      }
    },

    // 文章点赞
    async likes(id, type) {
      try {
        const params = {
          comment_id: id,
          event_type: type,
        }

        const res = await this.api.comment_like(params)
        if (res.status === 200) {
          if (!this.likes_obj[this.article.aid]) {
            this.article.pointnum = Number(this.article.pointnum) + 1
            Toast({
              type: "success",
              message: "点赞成功",
            })
          } else {
            this.article.pointnum = Number(this.article.pointnum) - 1
            Toast({
              type: "success",
              message: "点赞取消",
            })
          }
          this.likes_obj[this.article.aid] = !this.likes_obj[this.article.aid]
        }
      } catch (error) {
        if (error === "/") {
          this.$router.push(error)
        }
      }
    },

    // 评论点赞
    async commentlikes(item, type, status, index) {
      try {
        const params = {
          comment_id: item.id,
          event_type: type,
        }
        const res = await this.api.comment_like(params)
        if (res.status === 200) {
          this.likes_comment_obj[index] = !status
          if (!this.likes_comment_obj[index]) {
            this.comment_list[index].num =
              Number(this.comment_list[index].num) + 1
            Toast({
              type: "success",
              message: "点赞成功",
            })
          } else {
            this.comment_list[index].num =
              Number(this.comment_list[index].num) - 1
            Toast({
              type: "success",
              message: "点赞取消",
            })
          }
        }
      } catch (error) {
        if (error === "/") {
          this.$router.push(error)
        }
      }
    },

    // 发布品论内容
    async submitSiscuss() {
      const params = {
        pid: this.article_id,
        classify: "comment",
        content: this.message,
      }
      try {
        const res = await this.api.cf_comment(params)
        this.show = false
        if (res.status === 200) {
          Toast({
            type: "success",
            message: "评论成功",
            onClose: () => {
              this.message = ""
            },
          })
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 文章详情
    async getArticleDetail() {
      try {
        const res = await this.api.article_detail(this.article_id || 489)
        this.article = res.result
        this.article.collections = JSON.parse(this.article.collections)
        this.article.content = this.article.content.replace(
          /<img/g,
          '<img width="100%"'
        )
        this.article.content = this.article.content.replace(
          /<p>/g,
          '<p style="padding-bottom:.15rem">'
        )
        this.article.content = this.article.content.replace(
          /<video/g,
          '<video width="100%"'
        )
        this.serve = this.article.collections[0].value
        this.likes_obj = {
          [this.article.aid]: this.article.point_status,
        }
        this.collect_obj = {
          [this.article.aid]: this.article.collect_status,
        }
        this.getCommentList()
      } catch (error) {
        console.log(error)
      }
    },

    // 获取评论列表
    async getCommentList() {
      try {
        const res = await this.api.cf_comment_list({ pid: this.article_id })
        this.comment_list = res.result && res.result.length ? res.result : []
        this.comment_list.forEach((item, index) => {
          this.likes_comment_obj[index] = !item.usercomment
        })
      } catch (error) {
        console.log(error)
      }
    },

    // 浏览文章超过五分钟获取积分
    async addPoint() {
      const params = {
        point_type: 1,
        article_id: this.article.aid,
      }
      try {
        const res = await this.api.cf_add_point(params)
        if (res.status === 200) {
          Toast.$message({
            type: "success",
            message: "积分增加",
          })
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 视频播放
    play() {
      this.playStart = new Date().getTime()
    },

    // 视频暂停
    pause() {
      this.playEnd = new Date().getTime()
      this.playTime += this.playEnd - this.playStart
    },

    // 记录视频播放时长
    async recordPlayTime() {
      const params = {
        article_id: this.article_id,
        time: Math.ceil(this.playTime / 1000),
      }
      await this.api.cf_add_article_log(params)
    },

    // 小调研拖拽
    down() {
      this.can_drug = true
      var touch
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      let moveDiv = this.$refs.diaoyan
      this.position.x = touch.clientX
      this.position.y = touch.clientY
      this.dx = moveDiv.offsetLeft
      this.dy = moveDiv.offsetTop
    },

    move() {
      let oWidth =
        document.body.clientWidth || document.documentElement.clientWidth
      let oHeight =
        document.body.clientHeight || document.documentElement.clientHeight
      let moveDiv = this.$refs.diaoyan
      if (this.can_drug) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        this.nx = touch.clientX - this.position.x
        this.ny = touch.clientY - this.position.y
        this.xPum = this.dx + this.nx
        this.yPum = this.dy + this.ny
        this.xPum =
          this.xPum < 0
            ? 0
            : this.xPum > oWidth - moveDiv.offsetWidth
            ? oWidth - moveDiv.offsetWidth
            : this.xPum
        this.yPum =
          this.yPum < 0
            ? 0
            : this.yPum > oHeight - moveDiv.offsetHeight
            ? oHeight - moveDiv.offsetHeight
            : this.yPum
        moveDiv.style.left = this.xPum + "px"
        moveDiv.style.top = this.yPum + "px"
      }
    },

    up() {
      this.can_drug = false
      this.$refs.main.removeEventListener("touchmove", function() {
        event.preventDefault()
      })
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer)
    if (!this.playEnd) {
      this.playEnd = new Date().getTime()
      this.playTime += this.playEnd - this.playStart
    }
    if (this.playStart) {
      this.recordPlayTime()
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./css/detail.scss";
</style>
