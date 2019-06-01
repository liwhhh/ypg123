$(function () {
  // 默认情况下,mui不响应click单击事件,这是它的默认行为
  // 我们解决方式就是重新为所有A绑定tap   tabbar跳转页面
  mui('body').on('tap', 'a', function (e) {
    e.preventDefault()
    window.top.location.href = this.href;
  })

  const baseURL='https://api.zbztb.cn/api/public/v1'
  // 添加zepto拦截器:它的作用是可以让每个ajax请求都经过这个函数进行处理
  // beforeSend:每次发送ajax请求都必须经过的处理函数
  $.ajaxSettings.beforeSend = function (xhr, obj) {
    $('body').addClass('loading')
    // 在这里拼接url
    obj.url=baseURL+ obj.url
    
  }
  // complete:请求完成时触发
  $.ajaxSettings.complete = function () {
    $('body').removeClass('loadding')
  }
})