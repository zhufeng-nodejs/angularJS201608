var directiveMod = angular.module('directiveMod', []);
directiveMod.directive('myDrag',function () {
    return {
        restrict:'ECA',
//            默认的是EA
        link:function (scope, element, attrs) {
            element.on('mousedown',function (e) {
                e.preventDefault();
                // var disX=e.pageX-element[0].offsetLeft;
                var disX=e.pageX-element.offset().left;
//                   轻量级的jQuery中没有offset()方法，转为原声JS对象 element[0]
                var disY=e.pageY-element[0].offsetTop;
                angular.element(document).on('mousemove',function (e) {
                    var curX=e.pageX-disX;
                    var curY=e.pageY-disY;
                    element.css({
                        left:curX+'px',
                        top:curY+'px'
                    })
                });
                angular.element(document).on('mouseup',function () {
                    angular.element(document).off();
                })
            })
        }
    }
});
directiveMod.directive('myModel',function () {
    return {
        link:function (scope, element, attrs) {
//                1.拿到input的内容  element.val()
//                2.拿到myModel后面定义的变量的名字 attrs['myModel']
//                3.在scope上定义变量 scope[attrs['myModel']]
            element.on('keyup',function () {
                scope[attrs['myModel']] = element.val();
                scope.$apply();
//                  脏值查询，实现双向数据绑定
            })

        }
    }


})