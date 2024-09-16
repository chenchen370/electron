<template>
  <div id="login_container"></div>
</template>

<script setup>
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
// 钉钉登录~

/*
 * 解释一下goto参数，参考以下例子：
 * var url = encodeURIComponent('http://localhost.me/index.php?test=1&aa=2');
 * var goto = encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=SuiteKey&response_type=code&scope=snsapi_login&state=STATE&redirect_uri='+url)
 */

function ddLogin() {
  let url = 'http://' + location.host + '/login'
  let appid = 'dingqvldaruemmst63rk'
  let goto = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`
  //生成钉钉二维码图片
  const obj = DDLogin({
    id: 'login_container', //这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
    goto: encodeURIComponent(goto), //请参考注释里的方式
    style: 'border:none;margin: 0 auto; background-color:inherit',
    width: '420',
    height: '355'
  })
  //获取loginTmpCode
  const handleMessage = function (event) {
    const origin = event.origin
    if (origin == 'https://login.dingtalk.com') {
      //判断是否来自ddLogin扫码事件。
      const loginTmpCode = event.data
      console.log('loginTmpCode', loginTmpCode)
      //获取到loginTmpCode后就可以在这里构造跳转链接进行跳转了
      //此步拿到临时loginTmpCode换取正式code 当前页面打开URL页面
      window.location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}&loginTmpCode=${loginTmpCode}`
    }
  }
  if (typeof window.addEventListener != 'undefined') {
    window.addEventListener('message', handleMessage, false)
  } else if (typeof window?.attachEvent != 'undefined') {
    window?.attachEvent('onmessage', handleMessage)
  }
}

onMounted(() => {
  ddLogin()
})

onMounted(() => {
  //code是登录所需最终参数  判断当前的路由有没有携带关于code参数 有的话直接进行登录阶段
  const { code, state } = route?.query
  if (code && state) {
    //登录接口
    const params = {
      code,
      state
    }
    handleCodeLogin(params)
  }
})

function handleCodeLogin(params) {
  // 调用action的登录方法
  userStore
    .ddLogin(params)
    .then(() => {
      const query = route.query
      const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})

      router.push({ path: '/' })
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped></style>
