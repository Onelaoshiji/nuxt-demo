<template>
  <div>
    <div class="login">
      <img src="@/assets/pc/banner.jpg" alt />

      <div class="login-form">
        <van-form>
          <van-field
            v-model="mobile"
            center
            clearable
            placeholder="手机号码"
            :rules="[
              {
                validator,
                message: '请输入正确手机号',
                trigger: 'onChange'
              }
            ]"
          />
        </van-form>
        <div class="gap" />
        <van-field v-model="code" center clearable placeholder="验证码">
          <template #button>
            <div class="btn" :class="reset ? 'reset' : ''" @click="getCode">
              {{ message }}
            </div>
          </template>
        </van-field>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import validate from "@/utils/validate";
import Cookie from "js-cookie";
import { Toast } from "vant";
export default {
  data() {
    return {
      mobile: "",
      code: "",
      value: 0,
      message: "获取验证码",
      reset: false,
      validate: false
    };
  },
  methods: {
    validator(v) {
      return validate.isPhoneNum(v), (this.validate = validate.isPhoneNum(v));
    },
    // 获取验证码
    getCode() {
      if (!this.validate) {
        return;
      }
      if (!this.reset) {
        this.message = `60秒后重新获取`;
        this.reset = true; // 按钮置灰
        this.api.cf_login_code({ mobile: this.mobile }, { headers: 123 });
        this.timing();
      }
    },

    // 计时
    timing() {
      let s = 60;
      clearInterval(timer);
      var timer = setInterval(() => {
        // 开始计时
        s--;
        this.message = `${s}秒后重新获取`;
        if (s === 0) {
          clearInterval(timer);
          this.reset = false;
          this.message = "获取验证码";
        }
      }, 1000);
    },

    login() {
      if (!this.validate) {
        return;
      }
      // 验证手机号码非空
      if (!this.mobile) {
        Toast({
          message: "请填写手机号",
          type: "warning"
        });
        return;
      }

      // 验证验证码非空
      if (!this.code) {
        Toast({
          message: "请填写验证码",
          type: "warning"
        });
        return;
      }
      let params = {
        mobile: this.mobile,
        mobile_code: this.code,
        login_type: "h5",
        success_dialog: true,
        error_dialog: true
      };
      this.api.cf_login(params).then(res => {
        if (res.status === 200) {
          this.$router.replace("/");
          Cookie.set("token", res.result.token);
          Cookie.set("userid", res.result.uid);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./css/login.scss";
</style>
