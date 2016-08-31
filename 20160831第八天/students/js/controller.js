// 用来写页面中用到的控制器
var studCtrlMod = angular.module('studCtrlMod', ['ngGrid']);
studCtrlMod.controller('loginCtrl',['$scope','$http','$state',function ($scope,$http,$state) {
    console.log($state);
    $scope.login=function () {
    //    获取输入的内容
        $scope.userInfo={
            name:$scope.user_name,
            password:$scope.user_password
        };
        // 取出后台的数据 $http 封装的就是 ajax请求
        $http.get('./data/user.json').success(function (data) {
            //将数据保存在这里
            $scope.user = angular.fromJson(data);
            angular.forEach($scope.user,function (item) {
                if(item.email==$scope.userInfo.name&&item.password==$scope.userInfo.password){
                    //$state.go可以实现页面的跳转， $state是ui.router的一个服务
                    $state.go('studList');
                    return;
                }
                alert('请先注册')
            })
        })
    }
}]);
studCtrlMod.controller('gridCtrl',['$scope','$http',function ($scope,$http) {
    // 请求后台的数据 student1
    $http.get('./data/student1.json').success(function (data) {

        $scope.student=angular.fromJson(data);
        console.log($scope.student)
    });

    $scope.gridOptions={
        //将student数据绑定到表格中
        data:'student'
    }

}]);

