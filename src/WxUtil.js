import axios from "axios";
import REST_URLS from "./RestUrl";


function signWxConfig() {
  const url = window.location.href.split('#')[0];
  axios.post(REST_URLS.signjsapi, {
    url: url,
  })
  .then(response => {
    const { appId, timestamp, nonceStr, signature, } = response.data;
    window.wx.config({
      debug: false,
      appId: appId,
      timestamp: timestamp,
      nonceStr: nonceStr,
      signature: signature,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    });
  })
  .catch(error => {
    console.log(error);
  });

  window.wx.ready(function() {
    window.wx.onMenuShareTimeline({
        title: '趁热猜',
        link: 'http://app.chinatelecom.com.cn/activity/wxauth/activity/worldcup2018',
        imgUrl: 'http://app.chinatelecom.com.cn/a/worldcup2018/image/shareImg.png',
        success: function () { 
            // alert("成功分享");
        },
        cancel: function () { 
            // alert("取消分享");
        }
    });
    
    window.wx.onMenuShareAppMessage({
        title: '趁热猜',
        desc: '2018世界杯火热竞猜中',
        link: 'http://app.chinatelecom.com.cn/activity/wxauth/activity/worldcup2018',
        imgUrl: 'http://app.chinatelecom.com.cn/a/worldcup2018/image/shareImg.png',
        type: 'link',
        dataUrl: '',
        success: function () { 
            // alert("分享成功");
        },
        cancel: function () { 
            // alert("取消分享");
        }
    });
  });

  window.wx.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    // alert("接口验证失败了");
    // alert(res);
  });
  
}

export { signWxConfig };
