var myApp = angular.module('myApp', []);
myApp.controller('myCtrl',['$scope',function ($scope) {
    // $scope.expander={
    //     title:'珠峰培训',
    //     content:'七年专注，有口皆碑'
    // }
    $scope.expanders=[
        {
            title:'珠峰培训',
            content:'七年专注，有口皆碑'
        },
        {
            title:'珠峰培训',
            content:'七年专注，有口皆碑'
        },
        {
            title:'珠峰培训',
            content:'七年专注，有口皆碑'
        }
    ]
}]);

myApp.directive('myExpander',function () {
    return {
        template:'<div class="expanderTitle" ng-click="toggle()">{{title}}</div>' +
        '<span ng-transclude class="expanderBody" ng-show="show"></span>',
        transclude:true,
        scope:{
            title:'='
        },
        require:'^accordion',
        link:function (scope, element, attrs,controller) {
            controller.addScope(scope);
            scope.show=false;
            scope.toggle=function () {
                scope.show=!scope.show;
                controller.changeShow(scope);
            }
        }
    }
});

myApp.directive('accordion',function () {
    return {
        controller:['$scope','$element','$attrs',function ($scope,$element,$attrs) {
        //  $scope,$element,$attrs 名字不可以改变
            var expanderScope=[];
            this.addScope=function (a) {
                expanderScope.push(a);
            };
            this.changeShow=function (curScope) {
                angular.forEach(expanderScope,function (item) {
                    if(item!=curScope){
                        item.show=false;
                    }
                })
            }

        }]
    }
});







