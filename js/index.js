var item={
  img:'./img/bottomicon.png', //图片
  info:'弹幕文字信息幕文字信息', //文字
  href:'http://www.badidu.com', //链接
  close:false, //显示关闭按钮
  speed:8, //延迟,单位秒,默认8
  bottom:0, //距离底部高度,单位px,默认随机
  color:'#fff', //颜色,默认白色
  old_ie_color:'#000000', //ie低版兼容色,不能与网页背景相同,默认黑色
}
// setInterval(function () {
  $('.image-container').barrager(item);

// },2000)

var url = 'http://192.168.1.216:8688/athena/activity/getProductActivityInfo'

// fetchData()
init()
function fetchData() {
  axios.get(url, {
    params: {
      activityCode: '202008191217444dlEAe'
    }
  }).then(function (response) {
      console.log(response.data.data)
      renderPage(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    });
}

var endTime = ''
function renderPage(data) {
  getTopImage(data.topUrl)
  endTime = data.endTime
  countTime()
  cardList(data)
  memberImg(data.rightUrl)
  vipcontent(data.contentUrl)
  detail(data.activityDesc)
}

//获取顶图
function getTopImage(topUrl){
  $('.image-img').attr('src',JSON.parse(topUrl).url)
}

//倒计时
function countTime() {
  var date = new Date();
  var now = date.getTime();
  var endDate = new Date(endTime);//设置截止时间
  var end = endDate.getTime();
  var leftTime = end - now; //时间差
  var d, h, m, s, ms;
  if(leftTime >= 0) {
    d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
    h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
    m = Math.floor(leftTime / 1000 / 60 % 60);
    s = Math.floor(leftTime / 1000 % 60);
    ms = Math.floor(leftTime % 1000);
    if(ms < 100) {
      ms = "0" + ms;
    }
    if(s < 10) {
      s = "0" + s;
    }
    if(m < 10) {
      m = "0" + m;
    }
    if(h < 10) {
      h = "0" + h;
    }
  } else {
    console.log('已截止')
  }
  $('._d').text(d)
  $('._h').text(h)
  $('._m').text(m)
  $('._s').text(s)
  var timer = setTimeout(countTime, 1000);
}

//
function cardList(data) {
  data.activityMemberList.forEach(element=>{
    let name = ''
    if(element.mcode === "hbbackend01"){
      name = '月卡'
    }else if(element.mcode === "hbbackend03"){
      name = '季卡'
    }else if(element.mcode === "hbbackend12"){
      name = '年卡'
    }

    let item =  `
      <div class="item">
          <span class="cardname">${name}</span>
          <span class="pricebox">
          <span class="discountprice">
          限时特惠价：
          </span>
          <span class="price">${element.discountPrice}</span>
            <span class="oldprice">原价：￥${element.marketPrice}</span>
          </span>
          <div class="openstatue "></div>
      </div>
    `
    $('.cardtype').append(item)

    if (data.activityStatus){
      $('.openstatue').addClass("open")
    }else{
      $('.openstatue').addClass("close")
    }
  })
}

function memberImg(rightUrl) {
  $('.memberimg').attr('src',JSON.parse(rightUrl).url)
}

function vipcontent(contentUrl) {
  $('.contentimg').attr('src',JSON.parse(contentUrl).url)
}

function detail(activityDesc) {
  $('.desctext').html(activityDesc.replace(/\n/g,'<br>'))
}


function init() {
  $('.icon-close').off().click(function () {
    $('.loginbox').css('display','none')
  })

  $(document).on("click",'.openstatue',function(){
    $('.loginbox').css('display','block')
  });

}
