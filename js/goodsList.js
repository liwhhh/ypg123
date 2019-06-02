$(function () {
  // 为搜索框显示右滑
  $('.mui-icon-search').on('tap', function () {
    mui('.mui-off-canvas-wrap').offCanvas('show');
  })

  
  // 参数
  var data = {
    // query: '',
    cid: getParameter(location.search).cid,
    pagenum: 1,
    pagesize:10,
  }
  // renderMainData()

  // 获取数据
  // 封装函数原因是,后期下拉和上拉的时候需要加载数据
  function renderMainData(callback,obj) {
    // console.log(data)
    $.ajax({
      type: 'get',
      url: '/goods/search',
      data: $.extend(data,obj),
      dataType: 'json',
      success:function (result) {
        // var html = template('goodslistTemp', result.message)
        // $('.goodslist').html(html)
        callback(result)  //请求数据直接回调
      }
    })
  }

    mui.init({
      swipeBack:false,
      pullRefresh : {
        container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {  //下拉的初始化
          height:50,//可选,默认50.触发下拉刷新拖动距离,
          auto: true,//可选,默认false.首次加载自动下拉刷新一次
          contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
          contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
          contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
          // 这个回调函数在下拉松开手之后会触发
          callback: function () { 
            data.pagenum=1
            renderMainData(function (result) {
              var html = template('goodslistTemp', result.message)
              $('.goodslist').html(html)
              mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
              // 为了防止切换分类的时候,无法再上拉,所有在每次刷新的时候将上拉加载重新启动
              mui('#refreshContainer').pullRefresh().refresh(true);
              
            })
          }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        },
        up : {
          height:50,//可选.默认50.触发上拉加载拖动距离
          auto:false,//可选,默认false.自动上拉加载一次
          contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
          contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
          callback: function () {
            data.pagenum ++
            renderMainData(function (result) {
              if (result.message.goods.length > 0) {
                var html = template('goodslistTemp', result.message)
              $('.goodslist').append(html)
              mui('#refreshContainer').pullRefresh().endPullupToRefresh();
              } else {
                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
              }
            })
          } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
      }
    
    });
  
  //?cid=5&name=jack
  function getParameter(url) {
    var obj={}
    // location.search:url中?后面的内容
    url = url.substring(1);//cid=5
    var arr = url.split('&');//['cid=5','name=jack']
    for (var i = 0; i < arr.length; i++){
      var temp = arr[i].split('=')//['cid',5]
      obj[temp[0]]=temp[1] //obj['cid']=5
    }
    return obj
  }

  $('.query_btn').on('tap', function () {
    // 展示运算符+对象解构
    var obj = {}
    obj.query = $('.query_txt').val()
    renderMainData(function (result) {
      var html = template('searchListTemp', result.message)
      $('.searchList').html(html)
    },obj)
  })
  
  
})