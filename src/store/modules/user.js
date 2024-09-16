import { login, logout, getInfo, ddLogin } from '@/api/info'
import { getToken, setToken, removeToken } from '@/utils/auth'
import defAva from '@/assets/images/profile.jpg'
import JSEncrypt from 'jsencrypt'

const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApRwJKyBOwVZ1F/Zq7kEe
s9yRcKb3Umyuv/ap0HTZqFpioa9havwLMRY3GLiCg/6kgE4A1yx2FsKWYimXjUIR
4hKNOWeHzJXrJYdUTd3ZMhMeycH7yApFRm8Y/N4IJ6kssHe6+074/IHS01x17GAd
Nf/zMe2shFaIsNFAdDtg98zB/eHbljnn5ZHsR6FwHJ7xso3hK46pG3lvrVIKQyc8
uK2AcxYl06EjBclvyBDiv8LDak4OQ3NG+QwJfO9PHk23L+augjBI1fBgCfoyISvB
owB9Ck3jdgAG7+mjsAhpQ46WbxcmZA9Iah9+A7tOPSTDB97ich4/rbFys0pWdNpb
YQIDAQAB`;

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  }),
  actions: {
    // 登录
    login(userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid

      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(publicKey)

      const pwd = encrypt.encrypt(password);
      const pwd_base64 =  encodeURIComponent( pwd)
      console.log("pwd_base64",pwd_base64)
      return new Promise((resolve, reject) => {
        login(username, pwd_base64, code, uuid)
          .then(res => {
            setToken(res.token)
            this.token = res.token
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    ddLogin(info) {
      return new Promise((resolve, reject) => {
        ddLogin(info)
          .then(res => {
            setToken(res.token)
            this.token = res.token
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(res => {
            const user = res.user
            const avatar = user.avatar == '' || user.avatar == null ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar

            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.user.roles
              console.log('aa', res)
              this.permissions = res.permissions
            } else {
              this.roles = ['ROLE_DEFAULT']
            }
            this.name = user.userName
            this.avatar = avatar
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
})

export default useUserStore
