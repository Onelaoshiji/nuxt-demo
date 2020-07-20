import request from '@/utils/request'

export default {
  // 登录cf/login
  cf_login: params => {
    return request.post(`/cf/login`, params)
  },

  // 发送登录验证码cf/send-login-code
  cf_login_code: params => {
    return request.post(`/cf/send-login-code`, params)
  },

  // 获取个人中心数据cf/get-user-center
  get_user_center: params => {
    return request.get(`/cf/get-user-center`, {
      params,
    })
  },

  // 编辑资料cf/update-user
  update_user: params => {
    return request.post(`/cf/update-user`, params)
  },

  // 评论
  cf_comment: params => {
    return request.post("/cf/comment", params)
  },

  // 获取评论列表
  cf_comment_list: params => {
    return request.get("/cf/comment-list", { params })
  },

  // 评论点赞cf/comment-up
  comment_like: params => {
    return request.post("/cf/comment-up", params)
  },

  // 收藏cf/collect
  cf_collect: params => {
    return request.post("/cf/collect", params)
  },

  // 收藏列表
  cf_collect_list: params => {
    return request.get("/cf/collect-list", { params })
  },

  // 待领取积分列表
  cf_point_list: params => {
    return request.get("/cf/point-list", { params })
  },

  // 领取积分
  cf_point: params => {
    return request.post("/cf/point", params)
  },

  // 获取我的学习cf/get-my-study?month=6&years=2020
  cf_get_my_study: params => {
    return request.get("/cf/get-my-study", { params })
  },

  // 文章列表https://api.center.medsci.cn/MedSciVisit/show-course-list
  show_course_list: params => {
    return request.get(`/cf/get-article-list?`, { params })
  },

  // 获取项目分类http://api.center.medsci.cn/MedSciVisit/show-subject-list?project_id=68
  show_subject_list: params => {
    return request.get(
      `http://api.center.medsci.cn/MedSciVisit/show-course-list?subject_id=${params}`
    )
  },

  // 获取文章详情cf/get-article-info?aid=489
  article_detail: params => {
    return request.get(`/cf/get-article-info?aid=${params}`)
  },

  // 获取文章调研cf/get-survey-list
  cf_get_survey_list: params => {
    return request.get(`/cf/get-survey-list`, { params })
  },

  // 提交调研
  cf_survey_save: params => {
    return request.post(`/cf/survey-save`, params)
  },

  // 产生带领取积分cf/add-point
  cf_add_point: params => {
    return request.post(`/cf/add-point`, params)
  },

  // 获取下拉框选项列表
  cf_get_attribute: params => {
    return request.get(`/cf/get-attribute`, { params })
  },

  // 记录观看日志
  cf_add_article_log: params => {
    return request.post('/cf/add-article-log', params)
  }
}
