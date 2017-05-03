angular.module("route",["ngRoute"])
    .config(["$routeProvider",function(route){
        route.when("/",{
            templateUrl:"/tpl/main.html",
            controller:"main"
        }).when("/edit/:id",{
            templateUrl:"/tpl/edit.html",
            controller:"edit"
        }).when("/add",{
            templateUrl:"/tpl/add.html",
            controller:"add"
        })

    }])