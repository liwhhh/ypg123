$(function () {
  
  // category.html引入这个iscroll.js,然后写这个方法


  // 渲染页面动态结构
  render();

  // 所有分类数据
  var cateData
  
  // 创建渲染函数,实现数据的动态渲染
  // 判断缓存数据是否存在且有效,如果有效则直接使用缓存,如果无效则发送请求
  function render() {
    // 获取本地数据.判断是否超时,如果没有超时就直接使用本地数据进行数据结构的动态渲染
   cateData = JSON.parse(localStorage.getItem('pyg_cateData'))
    if (cateData && Date.now() - cateData.time < 24 * 60 * 60 * 1000) {
      // 使用 本地存储进行数据的渲染
      leftCateList()
      rightCateList(0);//默认0
     
    }
     // 如果超时,则再次发起ajax请求
    else {
      getCateList();//重新获取数据
    }
  }

  //发送请求获取分类数据
  // $.ajax({
  //   type: "get",
  //   url: "/categories",
  //   dataType: 'json',
  //   success: function (result)  {
  //     console.log(result)
  //   }
  // })
  function getCateList() {
    $('body').addClass('loadding')
    $.get('/categories', function (result) {
      // console.log(result)
      // $(document.body).append(response)
      if (result.meta.status == 200) {
        // 将数据存储到本地存储
        // 1.客户端和服务器的数据交互只能是字符串
        // 2.文件的读取和写入只能是字符串
        // 3.本地存储的写入和获取也只能是字符串
        cateData={ 'list': result.message, time: Date.now()}
        localStorage.setItem('pyg_cateData', JSON.stringify(cateData))
        // console.log(cateData)
        // 动态生成左侧导航项结构-一级分类
        leftCateList()
        // 动态生成右侧二级分类数据
        rightCateList(0)
      }
    }, 'json')
  }
  // 动态渲染的数据的思路
  // 1.获取本地数据,判断是否有数据,同时判断数据是否有效
  // 2.如果有效,则直接使用本地数据进行渲染,
  // 如果无效,则重新发起ajax请求,进行数据的获取,同时数据存储到本地存储
  
    // 动态生成左侧导航项结构-一级分类
  function leftCateList() {
    var html = template('leftnavTemp', cateData)
    // console.log(html)
    $('.left ul').html(html)

    var myScroll = new IScroll('.left');
    //  为左侧li绑定单击事件,一点击那个就那个在顶部
      // 原因:实现导航的跳转,发现一个问题,a标签的click事件在mui框架中不响应,所以我们需要自己重新绑定tap事件
      //默认情况下,mui不响应click点击事件,这是它的默认行为
      // 我们解决方式就是重新为所有A绑定tap
      $('.left').on('tap', 'li', function () {
        // 找到点击的这个添加这个active类.所有兄弟移出这个active类
        $(this).addClass('active').siblings().removeClass('active')
        myScroll.scrollToElement(this)
        //动态渲染二级分类数据  //添加这个就会触发右边的索引值
        var index = $(this).index(); //左边的这个所有给右边
        rightCateList(index)
      })

    }
  
    // 动态生成右侧二级分类数据
  function rightCateList(index) {
    console.log(cateData.list[index])
    var html = template('rightListTemp', cateData.list[index])
    $('.rightList').html(html);//动态生成之后

    // 获取img的数条长度
    var imgcount = $('.rightList img').length
    console.log(imgcount)
    // 触发加载事件
    $('.rightList img').on('load', function () {
      imgcount--;
      // 如果图片加载完成后就执行
      if (imgcount == 0) {
        $('body').removeClass('loadding')
        // 使用iscroll实现滑动效果
        var iscroll = new IScroll('.right');
      }
    })

   }






})