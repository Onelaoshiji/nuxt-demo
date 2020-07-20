<template>
  <div class="main">
    <div>
      <div class="item" v-for="(item ,index) in list" :key="index">
        <template v-if="item.type === 'radio'">
          <div class="title">
            {{index+1}}、{{item.title}}
            <span class="require" v-if="item.required">*</span>
          </div>
          <van-radio-group v-model="answer[index].value">
            <van-radio :name="val" v-for="(val, key) in item.value" :key="key">{{val}}</van-radio>
          </van-radio-group>
        </template>
        <template v-if="item.type === 'checkbox'">
          <div class="title">
            {{index+1}}、{{item.title}}
            <span class="require" v-if="item.required">*</span>
          </div>
          <van-checkbox-group v-model="answer[index].value">
            <van-checkbox :name="val" v-for="(val, key) in item.value" :key="key">{{val}}</van-checkbox>
          </van-checkbox-group>
        </template>
        <template v-if="item.type === 'text'">
          <div class="title">
            {{index+1}}、{{item.title}}
            <span class="require" v-if="item.required">*</span>
          </div>
          <van-field v-model="answer[index].value" type="textarea" placeholder="请输入" />
        </template>
        <template v-if="item.type === 'select'">
          <div class="title">
            {{index+1}}、{{item.title}}
            <span class="require" v-if="item.required">*</span>
          </div>
          <div class="selectbox" @click="selectChange(item,index)">
            {{answer[index].value ? answer[index].value : '请选择'}}
            <div class="arrow"></div>
          </div>
        </template>
      </div>
    </div>
    <div class="btn" @click="submit">提交</div>
    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        title="标题"
        :columns="columns"
        @cancel="show = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
      list: [], // 调研列表
      answer: [], // 调研答案
      can_submit: true, // 判断是否可以提交
      columns: [],
      index: "",
      survey_id: '' //调研id
    };
  },
  created() {
    this.getSurvey();
  },
  methods: {
    // 下拉选项变化
    selectChange(val, key) {
      this.show = true;
      this.columns = val.value;
      this.index = key;
    },

    // 提交调研答案
    submit() {
      // 防止频繁点击
      if (!this.can_submit) {
        Toast({
          type: "fail",
          message: `请不要频繁提交`
        });
        return;
      }

      // 判断是否有必填项未填写
      let flag = this.answer.every((item, index) => {
        if (this.list[index].required == 1 && item.value === "") {
          Toast({
            type: "fail",
            message: `必填项,第${index + 1}题未填写`
          });
        } else if (this.list[index].required == 1 && !item.value.length) {
          Toast({
            type: "fail",
            message: `必填项,第${index + 1}题未填写`
          });
        }
        return !(
          this.list[index].required &&
          item.value === "" &&
          item.value.length
        );
      });

      if (flag) {
        this.can_submit = false;
        const params = {
          sid: this.survey_id,
          options: JSON.stringify(this.answer)
        };
        this.api.cf_survey_save(params).then(res => {
          if (res.status == 200) {
            Toast({
              type: "success",
              message: "提交成功",
              onClose: () => {
                this.$router.go(-1)
              }
            });
          }
          this.can_submit = true;
        });
      }
    },

    onConfirm(v) {
      this.show = false
      this.answer[this.index].value = v;
    },

    // 获取调研列表
    async getSurvey() {
      try {
        const res = await this.api.cf_get_survey_list({ aid: this.$route.query.id });
        this.survey_id = res.result.survey.id
        this.list =
          res.result && res.result.survey && res.result.survey.options
            ? JSON.parse(res.result.survey.options)
            : [];
        this.answer =
          res.result && res.result.surveylog && res.result.surveylog.options
            ? JSON.parse(res.result.surveylog.options)
            : [];
        if(!this.answer.length) {
          this.answer = this.list.map(item => {
            return {
              hash: item.hash,
              value: ''
            }
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./css/research.scss";
</style>