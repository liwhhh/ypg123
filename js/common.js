$(function () {
  const baseURL='https://api.zbztb.cn/api/public/v1'
  // 添加zepto拦截器:它的作用是可以让每个ajax请求都经过这个函数进行处理
  $.ajaxSettings.beforeSend = function (xhr,obj) {
    // 在这里拼接url
    obj.url=baseURL+ obj.url
    
  }
  $.ajaxSettings.complete = function () {
    
  }
})