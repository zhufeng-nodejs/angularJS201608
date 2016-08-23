var filterMod=angular.module('filterMod',[]);
// 用来实现过滤器方法的封装
// filterMod.filter('zfpx',function (orderByFilter) {
//     return function (input) {
//         var newArr=[];
//         for(var i=0;i<input.length;i++){
//             var cur=input[i];
//             if(newArr.indexOf(cur)===-1){
//                 newArr.push(cur);
//             }
//         }
//         return orderByFilter(newArr);
//     }
// })
filterMod.filter('zfpx',function ($filter) {
    return function (input) {
        var newArr=[];
        for(var i=0;i<input.length;i++){
            var cur=input[i];
            if(newArr.indexOf(cur)===-1){
                newArr.push(cur);
            }
        }
        return $filter('orderBy')(newArr);
    }
})