export default {
  methods: {
    async cf_get_attribute_hospital(param = {}) {
      const params = {
        type: 'hospital',
        keyword: ''
      }
      const res = await this.api.cf_get_attribute(Object.assign(params,param))
      return Promise.resolve(res.result)
    },

    async cf_get_attribute_occup() {
      const params = {
        type: 'occup',
        keyword: ''
      }
      const res = await this.api.cf_get_attribute(params)
      return Promise.resolve(res.result)
    },

    async cf_get_attribute_department() {
      const params = {
        type: 'department',
        keyword: ''
      }
      const res = await this.api.cf_get_attribute(params)
      return Promise.resolve(res.result)
    },
  },
}