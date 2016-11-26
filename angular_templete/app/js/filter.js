var appFilter = angular.module('xiaodaiFilter',[]);

appFilter.filter('trustHtml',['$sce',function($sce){//开启安全机制，用来显示从数据库中加载的样式，angularjs默认style是不安全的，所以会以文本方式显示
	return function(input){
		return $sce.trustAsHtml(input);
	}
}]);

appFilter.filter('formatPercent',function(){/* 格式化百分数 */
	return function(input){
		var out = "";
		if(null != input && "" != input && undefined != input){
			out = input*100;
			return out;
		}
		return "";
	}
}).filter('formatMonth',function(){/* 格式化日期为yyyy-MM-dd格式 */
	return function(input){
			if(input == null){
				return input;
			}
			if(input<10){
				return "0"+input;
			}
			return input;
		}
}).filter('formatMoney',function(){/* 格式化money单位为万元，且保留一位小数 */
	return function(input){
		if(input==null){
			return input = 0;
		}
		input = (input/10000).toString();
		if(input.indexOf('.')==-1 || input.charAt(input.indexOf('.')+1)=='0'){
			return input;
		}else{
			return input = input.substring(0,input.indexOf('.')=1);
		}
	}
});

