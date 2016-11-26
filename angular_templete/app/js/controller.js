/*------------------------------------------------------------ controller ------------------------------------------------------------*/
var appCtrl = angular.module('xiaodaiController', []);
appCtrl.controller('IndexCtrl', ['$scope', '$location', function($scope, $location) {
	$location.path('/view/todo/todolist.html');
	$scope.$apply();
}]);
/*
	月度报表Ctrl
*/
appCtrl.controller('ReportmonthCtrl', ['$rootScope', '$scope', 'Date', 'ReportService', function($rootScope, $scope, Date, ReportService) { //月度报表ctrl
	$rootScope.navtitle = '月度报表';
	$scope.curYear = Date.curYear;
	$scope.curMonth = Date.curMonth;
	//监听数据变化
	$scope.$watch('curMonth', function() {
		//加载数据
		var params = {
			year: $scope.curYear,
			month: $scope.curMonth
		};
		var promise = ReportService.getReportInfoByMonth(params);
		promise.then(function(data) {
			if (data.success) {
				$scope.report = data.obj;
			} else {
				ui.notice(data.msg, 2000, false);
			}
		}, function(erro) {
			ui.notice(erro, 2000, false);
		});
	}, true);
	//上个月
	$scope.preMonth = function(curYear, curMonth) {
			$scope.curMonth = curMonth - 1;
			if (curMonth <= 1) {
				$scope.curYear = curYear - 1;
				$scope.curMonth = 12;
			}
		}
		//下个月
	$scope.nextMonth = function(curYear, curMonth) {
		$scope.curMonth = curMonth + 1;
		if (curMonth >= 12) {
			$scope.curYear = curYear + 1;
			$scope.curMonth = 1;
		}
	};
}]);

/*
	代办列表ctrl
*/
appCtrl.controller('TodolistCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'LoanInfoService', function($rootScope, $scope, $state, $stateParams, LoanInfoService) { //代办列表ctrl
	$rootScope.navtitle = '我的待办';
	$scope.hide = true; //默认隐藏
	var userCode = $stateParams.userCode;
	sessionStorage.setItem("userCode", userCode);
	//加载数据
	var params = {
		userCode: userCode
	}
	var promise = LoanInfoService.getToDo(params);
	promise.then(function(data) {
		if (data.success) {
			$scope.list = data.obj;
			if ($scope.list.length > 0) {
				$scope.hide = true; //默认隐藏
			} else {
				$scope.hide = false; //默认隐藏
			}
		} else {
			ui.notice(data.obj, 2000, false);
		}
	}, function(erro) {
		ui.notice(erro, 2000, false);;
	});

	//事件
	$scope.toDetail = function(loanid) {
		$state.go('tododetail', {
			loan_id: loanid
		});
	}
}]);
/*
	详情ctrl
*/
appCtrl.controller('TododetailCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'LoanInfoService', function($rootScope, $scope, $state, $stateParams, LoanInfoService) { //详情ctrl
	var loan_id = $stateParams.loan_id;
	var userCode = sessionStorage.getItem("userCode", userCode);
	// console.log(loan_id)
	var params = {
		loanId: loan_id
	};
	var promise = LoanInfoService.getBaseDetail(params);
	promise.then(function(data) {
		if (data.success) {
			$scope.data = data.obj;
			// console.log(data.obj);
			if (data.obj.step_id == -1) {
				$rootScope.navtitle = '贷款预审';
			} else {
				$rootScope.navtitle = '贷款审批';
			}
		} else {
			ui.notice(data.msg, 2000, false);
		}
	}, function(erro) {
		ui.notice(erro, 2000, false);
	});

	//事件
	$scope.toApprove = function() {
		$state.go('todoapprove', {
			loan_id: loan_id
		});
	}
	$scope.pass = function() {
		ui.prompt('审批意见', function(z) {
			if (z) {
				var params = {
					comment: z,
					loanId: loan_id,
					action: 'pass'
				}
				var promise = LoanInfoService.preJudictionPass(params);
				promise.then(function(data) {
					if (data.success) {
						ui.notice('操作成功', 2000, false);
						$state.go('todolist', {
							userCode: userCode
						});
					} else {
						ui.notice(data.msg, 2000, false);
						$window.history.go(-1);
					}
				}, function(erro) {
					ui.notice('出错啦，请稍后重试', 2000, false);
				});
			}
		}, true);
	};
	$scope.reject = function() {
		ui.prompt('审批意见', function(z) {
			if (z) {
				var params = {
					comment: z,
					loanId: loan_id,
					action: 'reject'
				}
				var promise = LoanInfoService.preJudictionPass(params);
				promise.then(function(data) {
					if (data.success) {
						ui.notice('操作成功', 2000, false);
						$state.go('todolist', {
							userCode: userCode
						});
					} else {
						ui.notice(data.msg, 2000, false);
					}
				}, function(erro) {
					ui.notice('出错啦，请稍后重试', 2000, false);
				});
			}
		}, true);
	};
	$scope.return = function() {
		ui.prompt('审批意见', function(z) {
			if (z) {
				var params = {
					comment: z,
					loanId: loan_id,
					action: 'return'
				}
				var promise = LoanInfoService.preJudictionPass(params);
				promise.then(function(data) {
					if (data.success) {
						ui.notice('操作成功', 2000, false);
						$state.go('todolist', {
							userCode: userCode
						});
					} else {
						ui.notice(data.msg, 2000, false);
					}
				}, function(erro) {
					ui.notice('出错啦，请稍后重试', 2000, false);
				});
			}
		}, true);
	};
	$scope.toguarinfo = function() {
		$state.go('todoguarinfo', {
			loan_id: loan_id
		});
	};
	$scope.tocollectplan = function() {
		$state.go('todocollectplan', {
			loan_id: loan_id
		});
	};
	$scope.toaccountlist = function() {
		$state.go('todoaccountlist', {
			loan_id: loan_id
		});
	}
	$scope.toimgpackage = function() {
		$state.go('todoimgpackage', {
			type:2,
			id: loan_id
		});
	}
	$scope.getPersonBeanInfo = function() {
		$state.go('todoinfo', {
			loan_cust_id: $scope.data.loan_cust_id,
			cust_class_id: $scope.data.cust_class_id
		});
	}
}]);
/*
	贷款签批ctrl
*/
appCtrl.controller('TodoapproveCtrl', ['$window', '$rootScope', '$scope', '$state', '$stateParams', 'LoanInfoService', 'WeiXin', function($window, $rootScope, $scope, $state, $stateParams, LoanInfoService, WeiXin) { //贷款签批ctrl
	$rootScope.navtitle = '贷款签批';
	var loan_id = $stateParams.loan_id;
	var userCode = sessionStorage.getItem("userCode", userCode);
	try {
		var params1 = {
			loanId: loan_id
		};
		var promise1 = LoanInfoService.getHistoryApproveByLoanId(params1);
		promise1.then(function(data) {
			if (data.success) {
				$scope.data = data.obj;
				// console.log(data.obj);
				if(data.obj.length==0){
					$scope.show=true;
				}
			} else {
				ui.notice(data.msg, 2000, false);
			}
		}, function(erro) {
			ui.notice(erro, 2000, false);
		});

		var params2 = {
			loanId: loan_id,
			actionId: 11,
			userCode: userCode
		}
		var promise2 = LoanInfoService.getMyApproveMsg(params2);
		promise2.then(function(data) {
			if (data.success) {
				$scope.data2 = data.obj;
				// console.log(data.obj);
			} else {
				ui.notice(data.msg, 2000, false);
				$window.history.go(-1);
			}
		}, function(erro) {
			ui.notice(erro, 2000, false);
		});
		//事件
		$scope.pass = function() {
			var comment = $scope.comment;
			if (comment == undefined || comment.toString().trim() == '') {
				ui.notice('审批意见不能为空', 2000, false);
				return;
			}
			var imgpath = "";
			var a = angular.element(document.getElementById("imgshow")).children();
			for(i=0;i<a.length;i++){
				var b = a[i].getAttribute("data-nosrcpath");
				if(b != null && b != 'null'){
					imgpath = b + a[i].getAttribute("id") + ",";
				}
			}
			var params = {
				userCode: userCode,
				apprIdea: comment,
				loanId: loan_id,
				hdfAffixId:imgpath,
				actionId: 11,
				type: 'pass'
			}
			var promise = LoanInfoService.approveProcess(params);
			promise.then(function(data) {
				if (data.success) {
					ui.notice('操作成功', 2000, false);
					$state.go('todolist', {
						userCode: userCode
					});
				} else {
					ui.notice(data.msg, 2000, false);
				}
			}, function(erro) {
				ui.notice('出错啦，请稍后重试', 2000, false);
			});
		};
		$scope.reject = function() {
			var comment = $scope.comment;
			if (comment == undefined || comment.toString().trim() == '') {
				ui.notice('审批意见不能为空', 2000, false);
				return;
			}
			var params = {
				userCode: userCode,
				apprIdea: comment,
				loanId: loan_id,
				actionId: 11,
				type: 'reject'
			}
			var promise = LoanInfoService.approveProcess(params);
			promise.then(function(data) {
				if (data.success) {
					ui.notice('操作成功', 2000, false);
					$state.go('todolist', {
						userCode: userCode
					});
				} else {
					ui.notice(data.msg, 2000, false);
				}
			}, function(erro) {
				ui.notice('出错啦，请稍后重试', 2000, false);
			});
		}
		$scope.return = function() {
			var comment = $scope.comment;
			if (comment == undefined || comment.toString().trim() == '') {
				ui.notice('审批意见不能为空', 2000, false);
				return;
			}
			var params = {
				userCode: userCode,
				apprIdea: comment,
				loanId: loan_id,
				actionId: 11,
				type: 'abandon'
			}
			var promise = LoanInfoService.approveProcess(params);
			promise.then(function(data) {
				if (data.success) {
					ui.notice('操作成功', 2000, false);
					$state.go('todolist', {
						userCode: userCode
					});
				} else {
					ui.notice(data.msg, 2000, false);
				}
			}, function(erro) {
				ui.notice('出错啦，请稍后重试', 2000, false);
			});
		}
		$scope.toattach = function(id) {
		$state.go('todoimginfo', {
			type:2,
			package_id: id
		});
	}
		$scope.upload = function() { //上传图片
			WeiXin.uploadProImg();
		}
	} catch (e) {
		ui.notice(e, 2000, false);
	}
}]);

/*-----------------------------------------------------合同相关--------------------------------------------------*/

/*
	担保资料
*/
appCtrl.controller('GuarinfoCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'ContractService', function($rootScope, $scope, $state, $stateParams, ContractService) {
	$rootScope.navtitle = '担保资料';
	$scope.hide = true;
	var loan_id = $stateParams.loan_id;
	var params = {
		loan_id: loan_id
	}
	var promise = ContractService.getGuaranteeList(params);
	promise.then(function(data) {
			if (data.success) {
				$scope.data = data.obj;
				if (data != null && data.obj.length > 0) {
					$scope.hide = true;
				} else {
					$scope.hide = false;
				}
			} else {
				ui.notice(data.obj, 2000, false);
			}
		},
		function(erro) {
			ui.notice(erro, 2000, false);
		});
}])

/*
	还款计划
*/
appCtrl.controller('CollectPlanListCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'ContractService', function($rootScope, $scope, $state, $stateParams, ContractService) {
	$rootScope.navtitle = '还款计划';
	$scope.hide = true;
	var loan_id = $stateParams.loan_id;
	var params = {
		loan_id: loan_id
	}
	var promise = ContractService.getCollectPlanList(params);
	promise.then(function(data) {
		if (data.success) {
			$scope.data = data.obj;
			if (data != null && data.obj.length > 0) {
				$scope.hide = true;
			} else {
				$scope.hide = false;
			}
		} else {
			ui.notice(data.obj, 2000, false);
		}
	}, function(erro) {
		ui.notice(erro, 2000, false);
	});
}])

/*
	关联账户
*/
appCtrl.controller('AccountListCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'ContractService', function($rootScope, $scope, $state, $stateParams, ContractService) {
	$rootScope.navtitle = '关联账户';
	$scope.hide = true;
	var loan_id = $stateParams.loan_id;
	var params = {
		loan_id: loan_id
	}
	var promise = ContractService.getAccountList(params);
	promise.then(function(data) {
		if (data.success) {
			$scope.data = data.obj;
			if (data != null && data.obj.length > 0) {
				$scope.hide = true;
			} else {
				$scope.hide = false;
			}
		} else {
			ui.notice(data.obj, 2000, false);
		}
	}, function(erro) {
		ui.notice(erro, 2000, false);
	});
}])

/*
	影像资料
*/
appCtrl.controller('ImgpackageCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'ContractService', function($rootScope, $scope, $state, $stateParams, ContractService) {
	$rootScope.navtitle = '影像资料';
	$scope.hide = true;
	var id = $stateParams.id;
	var type = $stateParams.type;
	var params = {};
	if (type == 1) {
		params.cust_id = id;
		params.ctrlUrl = 'custom';
	} else {
		params.loan_id = id;
		params.ctrlUrl = 'contract';
	}
	var promise = ContractService.getImagePackageList(params);
	promise.then(function(data) {
		if (data.success) {
			$scope.data = data.obj;
			// console.log(data.obj);
			if (data != null && data.obj.length > 0) {
				$scope.hide = true;
			} else {
				$scope.hide = false;
			}
		} else {
			ui.notice(data.obj, 2000, false);
		}
	}, function(erro) {
		ui.notice(erro, 2000, false);
	});

	$scope.todetail = function(package_id) { //查看资料详情
		$state.go('todoimginfo', {
			type:1,
			package_id: package_id
		});
	}
}])

/*
	查看影像资料详情
*/
appCtrl.controller('ImgInfoCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'ContractService', function($rootScope, $scope, $state, $stateParams, ContractService) {
	$rootScope.navtitle = '资料详情';
	$scope.baseurl = "http://xiaodai.smtcloud.com";
	$scope.hide = true;
	var package_id = $stateParams.package_id;
	var type = $stateParams.type;
	var params = {};
	if(type==1){
		params.package_id = package_id;
	}else if(type==2){
		params.proc_id = package_id;
	}
	var promise = ContractService.getImageInfoList(params,type);
	promise.then(function(data) {
		if (data.success) {
			$scope.data = data.obj;
			// console.log(data.obj);
			var pics = []; //存储图片文件
			var others = []; //存储非图片文件
			for (i = 0; i < data.obj.length; i++) {
				if (data.obj[i].isPic) {
					pics.push(data.obj[i]);
				} else {
					others.push(data.obj[i]);
				}
			}
			$scope.pics = pics;
			$scope.other = others;
			if($scope.pics.length==0){
				$scope.show1=true;
			}
			if($scope.other.length==0){
				$scope.show2=true;
			}
		} else {
			ui.notice(data.obj, 2000, false);
		}
	}, function(erro) {
		ui.notice(erro, 2000, false);
	});
}])

/*-----------------------------------------------------用户个人基本信息--------------------------------------------------*/

/*
	个人基本信息
*/
appCtrl.controller('TodoinfoCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'CustomerService', function($rootScope, $scope, $state, $stateParams, CustomerService) { //个人基本信息
	$rootScope.navtitle = '基本信息';
	var custId = $stateParams.loan_cust_id;
	var custClass = $stateParams.cust_class_id;
	$scope.custClass = custClass;
	var params = {
		custId: custId
	}
	var promise = CustomerService.getPersonBeanInfo(params, $scope.custClass);
	promise.then(function(data) {
		if (data.success) {
			$scope.data = data.obj;
			// console.log(data.obj);
		} else {
			ui.notice(data.msg, 2000, false);
		}
	}, function(erro) {
		ui.notice(data.erro, 2000, false);
	});

	//事件
	$scope.toSettleInfo = function() {
		$state.go('todosettleinfo',{person_id:$scope.data.person_info_id});
	};
	$scope.toPersonDebitList = function() {
		$state.go('todopersondebit',{cust_id:custId,cust_type:custClass});
	}
	$scope.toimgpackage = function() {
		$state.go('todoimgpackage', {
			type:1,
			id: custId
		});
	}
}]);

/*
	个人结算详情
*/
appCtrl.controller('SettleInfoCtrl', ['$rootScope','$scope','$stateParams', 'CustomerService',function ($rootScope,$scope,$stateParams,CustomerService) {
	$rootScope.navtitle = '结算信息';
	$scope.hide = true;
	var personId = $stateParams.person_id;
	var params = {
		personId: personId
	};
	var promise = CustomerService.getSettleInfo(params);
	promise.then(function(data) {
		if(data.success){
			$scope.data = data.obj;
			if (data != null && data.obj.length > 0) {
				$scope.hide = true;
			} else {
				$scope.hide = false;
			}
		}else{
			ui.notice(data.msg, 2000, false);
		}
	}, function(erro) {
		ui.notice(erro, 2000, false);
	});

}])
/*
	关联贷款
*/
appCtrl.controller('PersonDebitCtrl', ['$rootScope','$scope','$stateParams', 'CustomerService',function ($rootScope,$scope,$stateParams,CustomerService) {
	$rootScope.navtitle = '关联贷款';
	$scope.hide = true;
	var cust_id = $stateParams.cust_id;
	var cust_type = $stateParams.cust_type;
	var params = {
		cust_id: cust_id,
		cust_type:cust_type
	};
	var promise = CustomerService.getPersonDebitList(params);
	promise.then(function(data) {
		if(data.success){
			$scope.data = data.obj;
			if (data != null && data.obj.length > 0) {
				$scope.hide = true;
			} else {
				$scope.hide = false;
			}
		}else{
			ui.notice(data.obj, 2000, false);
		}
	}, function(erro) {
		ui.notice(erro, 2000, false);
	});

}])

