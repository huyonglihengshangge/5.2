angular.module("services",[])
.factory("Stuinfo",function($http,$q){

    return $http({url:"/select"});
})
