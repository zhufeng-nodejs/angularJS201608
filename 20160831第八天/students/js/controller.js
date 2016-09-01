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
                    $state.go('studList',{studSem:1});
                    //{studSem:1} 传递冒号后面的参数
                    return;
                }
                alert('请先注册')
            })
        })
    }
}]);
studCtrlMod.controller('gridCtrl',  ['$scope','$http','$stateParams',function ($scope,$http,$stateParams) {
    $scope.totalServerItems = 0;
    //定义分页部分的数据
    $scope.pagingOptions={
        pageSizes:[2,4,6],//定义下拉框的内容 ，显示当前页的数据个数
        pageSize:2,//定义默认下拉框的内容
        currentPage:1,//定义默认当前页
    };
    console.log($stateParams);
    //请求当前页的数据
    $scope.getPageData=function (pageSize,page) {
        //参数 pageSize 当前页面的数据展示多少条
        //参数 page 当前展示的是哪一页
        // 请求后台的数据 student1
        $http.get('./data/student'+$stateParams.studSem+'.json').success(function (data) {

            // 最开始的时候拿获取到的所有的而数据都赋值给 $scope.student
            // $scope.student = angular.fromJson(data);

            // 现在
            // 对数据截取的开始位置在哪里
            // pageSize =2  page=1  page=2
            // 起始位置 0 2 (page-1)*pageSize
            // 结束为止 1 3  page*pageSize-1
            // 边界判断 data.length <= page*pageSize,最后的而数据为 data.length
            var start = (page-1)*pageSize;
            // slice 包前不包后，所以end 取值没有 -1
            var end = data.length <= page*pageSize?data.length:page*pageSize;
            // 获取当前页的数据
            var pageData = angular.fromJson(data).slice(start,end);
            $scope.student=pageData;
            // 设置数据的总条数
            $scope.totalServerItems = data.length;
        });
    };
    $scope.getPageData($scope.pagingOptions.pageSize,$scope.pagingOptions.currentPage);

    //监听pagingOptions的变化，来改变展示的数据
    $scope.$watch('pagingOptions',function (newVal, oldVal) {
    // pagingOptions的变化我们要做什么？
    // 获取当前页的数据
        $scope.getPageData($scope.pagingOptions.pageSize,$scope.pagingOptions.currentPage);
    },true);
    // true 深入比较 ，对于对象中的某一个属性发生改变或者数组中的某一个元素发生改变，都能触发该监听函数

    $scope.gridOptions={
        //将student数据绑定到表格中
        // 当前页展示的数据 student
        // 改变 student，来改变页面显示的数据
        data:'student',
        // 对表格每一列的定义
        // rowTemplate:'',//行模块的定义
        // 行选中取消
        enableRowSelection:false,
        columnDefs:[
            {
                field:'id',
                displayName:'序号',
                cellClass:'',//给单元格增加样式
            },
            {
                field:'name',//每一列的属性名
                displayName:'姓名',//每一列表头展示的名字
            },
            {
                field:'sex',
                displayName:'性别',
            },
            {
                field:'age',
                displayName:'年龄',
            },
            {
                field:'tel',
                displayName:'电话',
                width:'25%',//设置宽度25% 或者 100->就是100px
            },
            {
                field:'semester',
                displayName:'学期',
            },
            {
                //定义操作列
                field:'id',
                displayName:'操作',
                cellTemplate:'<div><a ui-sref="studDetail({studSem:$stateParams.studSem,studId:row.getProperty(col.field)})">详情</a></div>',           //定义单元格的模板
            //    row.getProperty(col.field) 固定写法获取field的值
            //    在html标签中需要取到$stateParams的话，可以在$rootScope定义一个变量存储，如 : $rootScope.$stateParams = $stateParams;
            }
        ],
        showFooter:true,//显示页脚的部分
        enablePaging:true,//显示分页的部分
        pagingOptions:$scope.pagingOptions,//在$scope定义这个值
        totalServerItems:'totalServerItems',//设置总条数
    }

}]);
studCtrlMod.controller('detailCtrl',['$scope','$stateParams','$http',function ($scope,$stateParams,$http) {
//    $stateParams 有两个属性名
    $http.get('./data/student'+$stateParams.studSem+'.json').success(function (data) {
        $scope.students=angular.fromJson(data);
        // $scope.students是数组
        angular.forEach($scope.students,function (item) {
            if(item.id ==$stateParams.studId){
                // 判断数据的ID值是否和参数的一致
                $scope.student = item;
                // $scope.student 对象,需要展示到页面中的
            }
        })
    })

}]);

studCtrlMod.controller('addCtrl',['$scope',function ($scope) {
    $scope.save=function (s) {
        $scope.student = s;
        console.log($scope.student)
    };
//    $scope.student 是页面中需要保存数据的对象
    $scope.reset=function () {
        $scope.student = {};
    }
}]);


