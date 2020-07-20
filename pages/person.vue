<template>
  <div>
    <div class="item">
      <div class="left">昵称</div>
      <div class="right">
        <van-form>
          <van-field
            clearable
            v-model="formData.nickname"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
        </van-form>
      </div>
    </div>
    <div class="item">
      <div class="left">手机</div>
      <div class="right">{{ user_info.mobile }}</div>
    </div>
    <div class="item">
      <div class="left">地区</div>
      <div
        class="right choose"
        :class="formData.address ? 'choosed' : ''"
        @click="choose('address')"
      >
        {{
          formData.address
            ? formData.address[0] + formData.address[1]
            : "请选择"
        }}
        <svg-icon class="svgIcon" icon-class="right"></svg-icon>
      </div>
    </div>
    <div class="item">
      <div class="left">医院</div>
      <div class="right choose" :class="formData.hospital ? 'choosed' : ''">
        <svg-icon class="svgIcon" icon-class="right"></svg-icon>
        <van-field
          v-model="searchVal"
          @input="change"
          clearable
          placeholder="请搜索医院"
        />
      </div>
    </div>
    <div class="item">
      <div class="left">科室</div>
      <div
        class="right choose"
        :class="formData.department ? 'choosed' : ''"
        @click="choose('department')"
      >
        {{ formData.department ? formData.department : "请选择" }}
        <svg-icon class="svgIcon" icon-class="right"></svg-icon>
      </div>
    </div>
    <div class="item">
      <div class="left">职称</div>
      <div
        class="right choose"
        :class="formData.occup ? 'choosed' : ''"
        @click="choose('occup')"
      >
        {{ formData.occup ? formData.occup : "请选择" }}
        <svg-icon class="svgIcon" icon-class="right"></svg-icon>
      </div>
    </div>

    <div class="item">
      <div class="left">性别</div>
      <div
        class="right choose"
        :class="formData.sex ? 'choosed' : ''"
        @click="choose('sex')"
      >
        {{ formData.sex ? formData.sex : "请选择" }}
        <svg-icon class="svgIcon" icon-class="right"></svg-icon>
      </div>
    </div>
    <div class="item">
      <div class="left">出生日期</div>
      <div
        class="right choose"
        :class="formData.birthday ? 'choosed' : ''"
        @click="chooseBirthday('birthday')"
      >
        {{ formData.birthday ? formData.birthday : "请选择" }}
        <svg-icon class="svgIcon" icon-class="right"></svg-icon>
      </div>
    </div>
    

    <div class="button" @click="submit">提交</div>
    <van-popup v-model="show" position="bottom">
      <van-picker
        :title="title"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      ></van-picker>
    </van-popup>
    <van-popup v-model="birthday_show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="出生日期"
        :min-date="minDate"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import chinaData from "@/utils/china"
import department from "@/utils/department"
import { Toast } from "vant"
import mixin from "./mixin/data"
export default {
  data() {
    return {
      show: false,
      birthday_show: false,
      minDate: new Date("1945-01-01"),
      currentDate: new Date(),
      title: "",
      type: "",
      sex: [
        {
          text: "男",
        },
        {
          text: "女",
        },
      ],
      columns: [],
      address: [],
      department: [],
      formData: {
        nickname: "",
        sex: "",
        birthday: "",
        hospital: "",
        address: "",
        department: "",
        occup: "",
      },
      user_info: {}, // 用户信息
      searchVal: "", // 搜索关键字
      can_send: true, // 防止多次提交
    }
  },
  mixins: [mixin],
  created() {
    department.forEach(item => {
      this.department.push({
        text: item.name,
      })
    })
    chinaData.forEach(item => {
      let children = []
      this.address.push({
        text: item.provinceName,
        children,
      })
      item.citys.forEach(v => {
        children.push({
          text: v,
        })
      })
    })
    this.getUserData()
    
    
  },
  methods: {
    // 请选择
    choose(type) {
      this.show = true
      this.columns = []
      this.type = type
      switch (type) {
        case "occup":
          this.title = "职业"
          this.cf_get_attribute_occup().then(res => {
            this.columns = res.map(item => {
              return {
                text: item.vocation,
              }
            })
          })
          break
        case "department":
          this.title = "科室"
          this.cf_get_attribute_department().then(res => {
            this.columns = res.map(item => {
              return {
                text: item.departments,
              }
            })
          })
          break
        case "hospital":
          this.title = "医院"
          break
        case "sex":
          this.title = "性别"
          this.columns = this.sex
          break
        case "birthday":
          this.title = "出生日期"
          break
        case "address":
          this.title = "地区"
          this.columns = this.address
          break
        default:
          break
      }
    },

    chooseBirthday() {
      this.type = "birthday"
      this.birthday_show = true
    },

    onConfirm(v) {
      this.show = false
      this.birthday_show = false
      if (this.type === "birthday") {
        const year = new Date(v).getFullYear()
        const month =
          new Date(v).getMonth() + 1 > 9
            ? new Date(v).getMonth() + 1
            : `0${new Date(v).getMonth() + 1}`
        const date =
          new Date(v).getDate() > 9
            ? new Date(v).getDate()
            : `0${new Date(v).getDate()}`
        this.formData[this.type] = year + "-" + month + "-" + date
      } else if (v.length && typeof v !== "string") {
        this.formData[this.type] = v
      } else {
        this.formData[this.type] = v.text
      }
      if (this.type === "hospital") {
        this.searchVal = v.text
      }
    },
    onCancel() {
      this.show = false
      this.birthday_show = false
      this.searchVal = ""
    },

    // 获取用户数据
    async getUserData() {
      try {
        const res = await this.api.get_user_center()
        this.user_info = res.result ? res.result : {}
        this.formData.mobile = this.user_info.mobile
        this.formData.nickname = this.user_info.nickname
        this.formData.occup = this.user_info.occup
        this.formData.department = this.user_info.department
        this.formData.hospital = this.user_info.hospital
        this.searchVal = this.user_info.hospital
        this.formData.sex = this.user_info.sex
        this.formData.birthday = this.user_info.birthday
        this.formData.address = JSON.parse(this.user_info.address)
      } catch (val) {
        this.$router.push(val)
      }
    },

    async change(v) {
      this.choose("hospital")
      const res = await this.cf_get_attribute_hospital({ keyword: v })
      this.columns = res.map(item => {
        return {
          text: item.hospital,
        }
      })
    },

    async submit() {
      const params = this.formData
      if (params.birthday) {
        const year = new Date(params.birthday).getFullYear()
        const month =
          new Date(params.birthday).getMonth() + 1 > 9
            ? new Date(params.birthday).getMonth() + 1
            : `0${new Date(params.birthday).getMonth() + 1}`
        const date =
          new Date(params.birthday).getDate() > 9
            ? new Date(params.birthday).getDate()
            : `0${new Date(params.birthday).getDate()}`
        params.birthday = `${year}-${month}-${date}`
      }
      if (!this.can_send) {
        Toast({
          showClose: true,
          message: "请不要频繁提交",
          type: "fail",
        })
        return
      }
      try {
        this.can_send = false
        const res = await this.api.update_user(params)
        if (res.status === 200) {
          Toast.success("提交成功")
        }
        this.can_send = true
      } catch (error) {
        console.log(error)
        this.can_send = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  width: 7.5rem;
  height: 0.84rem;
  border-bottom: 0.01rem solid #f0f0f0;
  display: flex;
  font-size: 0.28rem;
  color: #333;
  line-height: 0.84rem;

  .left {
    flex: 1;
  }
  .right {
    flex: 3;
  }

  .left {
    padding-left: 0.3rem;
    text-align-last: left;
  }

  .right {
    text-align: right;
    position: relative;
    padding-right: 0.5rem;
  }

  .choose {
    color: #aeadb2;
    padding-right: 0.5rem;
  }

  .choosed {
    color: #333;
  }

  .svgIcon {
    font-size: 0.5rem;
    vertical-align: top;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}

.button {
  width: 6.8rem;
  height: 0.9rem;
  margin: 0 auto;
  margin-top: 0.64rem;
  background: rgba(47, 146, 238, 1);
  opacity: 1;
  border-radius: 0.45rem;
  color: #fff;
  line-height: 0.9rem;
  font-size: 0.29rem;
  text-align: center;
}

/deep/ .van-cell {
  padding: 0;
  height: calc(100% - 0.02rem);
}
/deep/ .van-field__body {
  text-align: right;
  position: relative;
  z-index: 2;
}

/deep/ .van-field__control {
  text-align: right;
  height: 0.82rem;
  background: transparent;
  font-size: 0.28rem;
}

/deep/ .van-field__error-message {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 0.82rem;
  z-index: 1;
  line-height: 0.83rem;
}
</style>
