// 1.创建模块
// index.html 的模块是studentApp，所以其他的模块必须注入到这个模块中
var studentApp = angular.module('studentApp', ['ui.router','studCtrlMod']);
//angularJS执行的第一个方法
studentApp.run(function ($rootScope,$state) {
    $rootScope.$state=$state;
//    全局可以注入$state这个服务,其他页面不需要引入ui.router模块
});

// 2.配置路由
studentApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider.state('login',{
    //    首页为 login
        url:'/login',
        templateUrl:'./templs/login.html'
    //    需要写一个login.html
    }).state('studList',{
    //    列表页为 studList
        url:'/studList',
        views:{
            '':{
                templateUrl:'./templs/studList.html'
            },
            'studSemester@studList':{
                templateUrl:'./templs/studSemester.html'
            },
            'studGrid@studList':{
                templateUrl:'./templs/studGrid.html'
            }
        }

    }).state('studAdd',{
    //    新增页为 studAdd
        url:'/studAdd',
        templateUrl:'./templs/studAdd.html'
    }).state('studDetail',{
        url:'/studDetail',
        templateUrl:'./templs/studDetail.html'
    })
});