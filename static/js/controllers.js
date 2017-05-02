angular.module("controllers",["services"])
.controller("main",["$scope","$http","Stuinfo",function($scope,$http,Stuinfo){
        Stuinfo.then(function(data){
           Stuinfo.data=data.data;
            $scope.data=data.data;
        })


       $scope.del=function(id){
           $scope.data.forEach(function(obj,index){
               if(obj.id==id){
                   $http({url:"del",params:{id:id}}).then(function(e){
                    if(e.data=="ok") {
                        $scope.data.splice(index, 1);
                    }
                   })

               }

           })
       }
}]).controller("edit",["$scope","Stuinfo","$routeParams","$http",function($scope,Stuinfo,$routeParams,$http){

    Stuinfo.then(function(){
        var id=$routeParams.id;

        Stuinfo.data.forEach(function(obj,index){
            if(obj.id==id){
                $scope.data=obj;

            }
        })

    $scope.$watch("data",function(){
        Stuinfo.data.forEach(function(obj,index){
            if(obj.id==id){

                Stuinfo.data[index]=$scope.data;
                console.log( $scope.data);

            }
        })

    },true)
    })

    $scope.submit=function(id){

        var info={};
        Stuinfo.data.forEach(function(obj,index){
                if(obj.id==id){
                    info=obj;
                }
        })
        $http({url:"/editCon",params:info}).then(function(e){
                alert(e.data);
        })
    }



}])