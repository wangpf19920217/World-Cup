/**
 * 微信分享
 */
$(function() {
    var data = { url: location.href.split('#')[0] };
        $.ajax({
        type: "POST",
        url: "/wxcron/signjsapi",
        data: JSON.stringify(data),
        contentType: "application/json;charset=UTF-8"
    })
    .done(function( data ) {
        wx.config({
        debug: true,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        });
    });    
});
    
wx.ready(function() {
    wx.onMenuShareTimeline({
        title: '趁热猜',
        link: 'http://app.chinatelecom.com.cn/activity/wxauth/activity/worldcup2018',
        imgUrl: 'http://app.chinatelecom.com.cn/a/worldcup2018/image/cup2018.png',
        success: function () { 
            // alert("成功分享");
        },
        cancel: function () { 
            // alert("取消分享");
        }
    });
    
    wx.onMenuShareAppMessage({
        title: '趁热猜',
        desc: '2018世界杯火热竞猜中',
        link: 'http://app.chinatelecom.com.cn/activity/wxauth/activity/worldcup2018',
        imgUrl: 'http://app.chinatelecom.com.cn/a/worldcup2018/image/cup2018.png',
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

wx.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    // alert("接口验证失败了");
    // alert(res);
});
