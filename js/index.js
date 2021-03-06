$(function () {
  banner();
  nav();
  goodsList();



})
// 生成首页动态轮播图
function banner() {
    //动态生成轮播图结构
    $.ajax({
      type: 'get',
      url: '/home/swiperdata',
      dataType: 'json',
      success: function (result) {
        // console.log(result)
        if (result.meta.status == 200) {
          // 只要获取数据成功了,才有必要生成动态结构
          // 生成图片结构
          var html = template('pyg_bannerTemp', result)
          $('.pyg_indexbanner').html(html)
  
          // 生成点标记结构
          var indiHTML = template('indicatorTemp', result)
          $('.mui-slider-indicator').html(indiHTML)
          //如果轮播图是动态生成就需要重新手动初始化
          mui('.mui-slider').slider({
            interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
          });
        }
      }

    })
}

//这个是四个图片 分类 秒杀拍 超市购 母婴品
// 获取首页分类菜单数据
function nav() {
  $.ajax({
    type: 'get',
    url: '/home/catitems',
    dataType: 'json',
    success: function (result) {
      // console.log(result)
      if (result.meta.status == 200) {
        var navHtml = template('pyg_navImg', result)
         $('.pyg_nav').html(navHtml)
     }
    }
  })
}

//// 生成首页商品列表
function goodsList() {
  $.ajax({
    type: 'get',
    url: '/home/goodslist',
    dataType: 'json',
    success: function (result) {
      // console.log(result)
      var html = template('prolistTemp', result)
      $('.pyg_goodsList').html(html)
    }
  })
}