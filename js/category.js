$(function () {
  
  // category.html引入这个iscroll.js,然后写这个方法
  var myScroll = new IScroll('.left');
//  为左侧li绑定单击事件,一点击那个就那个在顶部
  // 原因:实现导航的跳转,发现一个问题,a标签的click事件在mui框架中不响应,所以我们需要自己重新绑定tap事件
  //默认情况下,mui不响应click点击事件,这是它的默认行为
  // 我们解决方式就是重新为所有A绑定tap
  $('.left').on('tap', 'li', function () {
    // 找到点击的这个添加这个active类.所有兄弟移出这个active类
    $(this).addClass('active').siblings().removeClass('active')
    myScroll.scrollToElement(this)
  })

})