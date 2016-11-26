/*---------------------------------------------- service ----------------------------------------------*/
// 全局变量
var BASEURL = "自己的url";
var windowUrl = "跳转的url,具体看怎么用";
var BASEERRO = '网路连接失败,请稍后重试';

var appService = angular.module('xiaodaiService', ['ngResource']).config([function() {

}]);
//日期类服务
appService.factory('Date', [function() {
	var data = {};
	var curDate = new Date();
	data.curYear = curDate.getFullYear();
	data.curMonth = curDate.getMonth() + 1;
	data.curDate = curDate.getDate();
	data.curDay = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六')[curDate.getDay()];
	data.curHour = curDate.getHours() < 10 ? '0' + curDate.getHours() : curDate.getHours();
	data.curMinuete = curDate.getMinutes() < 10 ? '0' + curDate.getMinutes() : curDate.getMinutes();
	data.curSecond = curDate.getSeconds() < 10 ? '0' + curDate.getSeconds() : curDate.getSeconds();
	return data;
}]);

/*
远程连接服务 params 为对象 形式{ctrlUrl:'report',methodUrl:'getReportInfoByMonth'}格式
参数说明：ctrlUrl:springmvc控制器url  methorUrl：对象方法url,
说明：传递参数的形式可以使用restful风格，本次没有使用
具体使用方法参照：https://zhuanlan.zhihu.com/p/21669664
isArray:true:数组 false:对象
可根据需要扩展默认方法
*/
appService.factory('Remote', ['$resource', function($resource) {
	return $resource(BASEURL + "/:ctrlUrl/:methodUrl", {}, {
		save: {
			method: 'POST',
			params: {
				ctrlUrl: '@ctrlUrl',
				methodUrl: '@methodUrl'
			},
			isArray: false
		}
	});
}]);

/*
	报表接口 ReportService
*/
appService.factory('ReportService', ['$q', 'Remote', function($q, Remote) {

	return {
		getReportInfoByMonth: function(params) {
			var delay = $q.defer();
			params.ctrlUrl = 'report';
			params.methodUrl = 'getReportInfoByMonth';
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		}
	};
}]);

/*
	贷款信息接口 LoanInfoService
*/
appService.factory('LoanInfoService', ['$q', 'Remote', function($q, Remote) {

	return {
		getToDo: function(params) { //待办列表
			var delay = $q.defer();
			var params2 = {};
			params.ctrlUrl = 'loan';
			params.methodUrl = 'getToDo';
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		},
		getBaseDetail: function(params) { //详情
			var delay = $q.defer();
			params.ctrlUrl = 'loan';
			params.methodUrl = 'getBaseDetail';
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		},
		getHistoryApproveByLoanId: function(params) { //历史审批信息
			var delay = $q.defer();
			params.ctrlUrl = 'loan';
			params.methodUrl = 'getHistoryApproveByLoanId';
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		},
		getMyApproveMsg: function(params) { //查询我的审批信息
			var delay = $q.defer();
			params.ctrlUrl = 'loan';
			params.methodUrl = 'getMyApproveMsg';
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		},
		preJudictionPass: function(params) {
			var delay = $q.defer();
			params.ctrlUrl = "loan";
			params.methodUrl = "preJudictionPass";
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		},
		approveProcess: function(params) {
			var delay = $q.defer();
			params.ctrlUrl = "loan";
			params.methodUrl = "approveProcess";
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		}
	};
}]);

/*
	个人信息CustomerService
*/
appService.factory('CustomerService', ['$q', 'Remote', function($q, Remote) {

	return {
		getPersonBeanInfo: function(params, classtype) { //贷款端查询用户详情
			var delay = $q.defer();
			params.ctrlUrl = 'custom';
			if (classtype == 0) {
				params.methodUrl = 'getBaseCusInfo';
			} else {
				params.methodUrl = 'getCorpCustInfo';
			}
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		},
		getSettleInfo: function(params) { //查询结算信息
			var delay = $q.defer();
			params.ctrlUrl = 'custom';
			params.methodUrl = 'getSettleInfo';
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		},
		getPersonDebitList: function(params) { //查询结算信息
			var delay = $q.defer();
			params.ctrlUrl = 'custom';
			params.methodUrl = 'getPersonDebitList';
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		},
		getImagePackageList: function(params) { //影像资料
			params.ctrlUrl = 'contract';
			params.methodUrl = 'getImagePackageList';
			var delay = $q.defer();
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		}
	};
}]);


/*
	合同相关
*/
appService.factory('ContractService', ['$q', 'Remote', function($q, Remote) {

	return {
		getGuaranteeList: function(params) { //担保资料
			params.ctrlUrl = 'contract';
			params.methodUrl = decodeURI('getGuaranteeList');
			var delay = $q.defer();
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		},
		getCollectPlanList: function(params) { //还款计划
			params.ctrlUrl = 'contract';
			params.methodUrl = 'getCollectPlanList';
			var delay = $q.defer();
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				elay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		},
		getAccountList: function(params) { //还款计划
			params.ctrlUrl = 'contract';
			params.methodUrl = 'getAccountList';
			var delay = $q.defer();
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				elay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		},
		getImagePackageList: function(params) { //影像资料
			params.methodUrl = 'getImagePackageList';
			var delay = $q.defer();
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		},
		getImageInfoList: function(params, type) { //影像资料路径
			if (type == 1) {
				params.ctrlUrl = 'contract';
				params.methodUrl = 'getImageInfoList';
			} else if (type == 2) {
				params.ctrlUrl = 'loan';
				params.methodUrl = 'getAffixInfoList';
			}
			var delay = $q.defer();
			Remote.get(params, function(data) {
				delay.resolve(data);
			}, function(erro) {
				delay.reject(BASEERRO);
				console.log("出错原因:" + erro.status);
			});
			return delay.promise;
		}
	};
}])

/*
	微信service
*/
appService.factory('WeiXin', ['$q', '$location', 'Remote', function($q, $location, Remote) {
	var imglength = 9;
	var index = 0;
	function uploadoneimg(localId,index) {
		var filename = "affix";
		var serverpicid = "";
		wx.uploadImage({
			localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
			isShowProgressTips: 1, // 默认为1，显示进度提示
			success: function(res) {
				serverpicid = res.serverId; // 返回图片的服务器端ID
				if (serverpicid == "" || serverpicid == "undefined" || serverpicid == null) {
					ui.notice("拍摄错误，请重新拍摄", 2000, false);
				} else {
					var params = {
						ctrlUrl: 'wechat',
						methodUrl: 'uploadImg',
						mediaid: serverpicid,
						filename: filename,
						filepath: 'upfiles',
						APPKEY: "Secret_Products"
					}
					Remote.get(params, function(data) {
						addImgLi(data.absurl, windowUrl + data.path,index);
					}, function(erro) {
						console.log(erro);
					});
				}
			},
			fail: function(res) {
				ui.notice("上传失败，请检查网络", 2000, false);
			}

		});
	}

	function addImgLi(pathnosrc, src,index) {
		try {
			var str = "<span id='imgshow"+index+"' class='imgdiv'><img class='img-responsive imgview-item' data-nosrcpath='"+pathnosrc+"'  src='"+src+"'/><img onclick=\"javascript:document.getElementById('imgshow"+index+"').remove();\" class='img-responsive signsub' src='img/psing2.png'/></span>";
			angular.element(document.getElementById("imgview")).prepend(str);
			var count = angular.element(document.getElementById("imgview")).children().length;
			if (count == imglength) {
				angular.element(document.getElementById("addbtn")).hide();
			}
		} catch (e) {
			console.log(e);
		}
	}
	return {
		needWeixin: function() {
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = ua.indexOf('micromessenger') != -1;
			if (!isWeixin) {
				document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/connect/zh_CN/htmledition/style/wap_err1a9853.css">';
				document.body.innerHTML = '<div class="page_msg"><div class="inner"><span class="msg_icon_wrp"><i class="icon80_smile"></i></span><div class="msg_content"><h4>请在微信客户端打开链接</h4></div></div></div>';
			}
		},
		hideBridge: function() {
			if (typeof WeixinJSBridge == "undefined") {
				if (document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', onBridgeReady,
						false);
				} else if (document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				}
			} else {
				WeixinJSBridge.call('hideOptionMenu');
			}
		},
		initWXJSSign: function() {
			console.log($location.absUrl());
			var url = encodeURIComponent($location.absUrl().substring(0, $location.absUrl().indexOf("#")));
			console.log(url);
			var params = {
				ctrlUrl: 'wechat',
				methodUrl: 'getWXJSSign',
				url: url,
				APPKEY: 'Secret_Products'
			}
			Remote.get(params, function(data) {
				var jstoken = data.jstoken;
				var appid = jstoken.appId;
				var timestamp = jstoken.timestamp;
				var nonceStr = jstoken.nonceStr;
				var signature = jstoken.signature;
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: appid, // 必填，企业号的唯一标识，此处填写企业号corpid
					timestamp: timestamp, // 必填，生成签名的时间戳
					nonceStr: nonceStr, // 必填，生成签名的随机串
					signature: signature, // 必填，签名，见附录1
					jsApiList: ['closeWindow',
							'hideOptionMenu',
							'hideMenuItems',
							'chooseImage',
							'previewImage',
							'uploadImage',
							'getLocation',
							'startRecord',
							'stopRecord',
							'uploadVoice',
							'uploadVoice',
							'scanQRCode',
							'showMenuItems',
							'onMenuShareTimeline',
							'onMenuShareAppMessage'
						] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				wx.ready(function() {
					wx.hideOptionMenu();
					wx.showMenuItems({
						menuList: []
							// 要隐藏的菜单项，所有menu项见附录3
					});
				});
			}, function(erro) {
				console.log(erro);
			});

		},
		uploadProImg: function() { //上传图片
			var count = angular.element(document.getElementById("imgview")).children().length;
			count = imglength - count;
			if (count == 0) {
				showMsgPar('最多可选择' + imglength + '张');
				return;
			}
			var localpicid = "";
			wx.chooseImage({
				count: count, // 默认5
				sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function(res) {
					localpicid = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					//上传照片
					for (var i = 0; i < localpicid.length; i++) {
						uploadoneimg(localpicid[i],index);
						index++;
					}
				},
				fail: function(res) {
					console.log(res);
				}
			});
		},
		ready:function(){
			wx.ready(function() {
					wx.hideOptionMenu();
					wx.showMenuItems({
						menuList: []
							// 要隐藏的菜单项，所有menu项见附录3
					});
				});
		}
	}
}]);