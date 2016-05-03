angular.module('starter.services', [])
  .factory('ListFactory', function($http) {

    var list = [];
    var listStore = localStorage.getItem("list");
    if (listStore != null && listStore != '' && angular.isArray(angular.fromJson(listStore))) {
      list = angular.fromJson(listStore);
    }
    var listSrv = {
      setList: function(newList) {
        list = newList;
        localStorage.setItem("list", angular.toJson(list));
        return true;
      },
      getList: function() {
      	$http.get("http://jsonplaceholder.typicode.com/todos")
		.success(function(data){
			list = data;
			console.log(list);
		})
		.error(function(err){
			console.log(err);
		});

        if (list != null) {
          return list;
        } else {
          return [];
        }
      }
    };
    return listSrv;
  });