var app = angular.module('app',['ui.router','xiaodaiController','xiaodaiService','xiaodaiFilter']);

//路由配置
app.config(function ($stateProvider, $urlRouterProvider,$httpProvider) {
	 $httpProvider.defaults.useXDomain = true;     
	 // $httpProvider.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8;charset=UTF-8";
	$urlRouterProvider.otherwise('/todolist');
	$stateProvider.state('index',{
		url:'/index',
		templateUrl:'index.html',
		controller:'IndexCtrl'
	}).state('todolist',{
		url:'/todolist/:userCode',
		templateUrl:'view/todo/todolist.html',
		controller:'TodolistCtrl'
	}).state('tododetail',{
		url:'/todopre/:loan_id',
		templateUrl:'view/todo/tododetail.html',
		controller:'TododetailCtrl'
	}).state('todoinfo',{
		url:'/todoinfo/:loan_cust_id/:cust_class_id',
		templateUrl:'view/todo/todoinfo.html',
		controller:'TodoinfoCtrl'
	}).state('todosettleinfo',{
		url:'/todosettleinfo/:person_id',
		templateUrl:'view/todo/todosettleinfo.html',
		controller:'SettleInfoCtrl'
	}).state('todopersondebit',{
		url:'/todopersondebit/:cust_id/:cust_type',
		templateUrl:'view/todo/todopersondebit.html',
		controller:'PersonDebitCtrl'
	}).state('todoapprove',{
		url:'/todoapprove/:loan_id',
		templateUrl:'view/todo/todoapprove.html',
		controller:'TodoapproveCtrl'
	}).state('todoguarinfo',{
		url:'/todoguarinfo/:loan_id',
		templateUrl:'view/todo/todoguarinfo.html',
		controller:'GuarinfoCtrl'
	}).state('todocollectplan',{
		url:'/todocollectplan/:loan_id',
		templateUrl:'view/todo/todocollectplan.html',
		controller:'CollectPlanListCtrl'
	}).state('todoaccountlist',{
		url:'/todoaccountlist/:loan_id',
		templateUrl:'view/todo/todoaccountlist.html',
		controller:'AccountListCtrl',
	}).state('todoimgpackage',{
		url:'/todoimgpackage/:type/:id',
		templateUrl:'view/todo/todoimgpackage.html',
		controller:'ImgpackageCtrl'
	}).state('todoimginfo',{
		url:'/todoimginfo/:type/:package_id',
		templateUrl:'view/todo/todoimginfo.html',
		controller:'ImgInfoCtrl'
	}).state('reportmonth',{
		url:'/reportmonth',
		templateUrl:'view/report/reportmonth.html',
		controller:'ReportmonthCtrl'
	})
	.state('500',{
		url:'/500',
		templateUrl:'view/erro/500.html',
	})
}).run(['$rootScope', '$log','WeiXin',function($rootScope, $log,WeiXin){
	/*----------------------------------------------微信客户端START---------------------------------------------*/
	//初始化微信操作
	// WeiXin.needWeixin();
	//WeiXin.hideBridge();

	/*----------------------------------------------微信客户端END---------------------------------------------*/
	//设置默认头信息
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    	WeiXin.initWXJSSign();
        $log.debug('successfully changed states') ;
        // WeiXin.ready();
       /* $log.debug('event', event);
        $log.debug('toState', toState);
        $log.debug('toParams', toParams);
        $log.debug('fromState', fromState);
        $log.debug('fromParams', fromParams);*/

        //自定义路由存储机制，目的实现返回状态
    });
    
    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
        $log.error('The request state was not found: ' + unfoundState);
    });
    
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
        $log.error('An error occurred while changing states: ' + error);
        
        // $log.debug('event', event);
        // $log.debug('toState', toState);
        // $log.debug('toParams', toParams);
        // $log.debug('fromState', fromState);
        // $log.debug('fromParams', fromParams);
    });
    }]);
