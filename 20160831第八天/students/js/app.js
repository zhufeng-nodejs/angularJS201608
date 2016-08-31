// 1.创建模块
var studentApp = angular.module('studentApp', ['ui.router']);
// 2.配置路由
studentApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/login')
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