
 angular.module('starter.controllers', [])
  	.controller('ultimosCtrl', function(googleLogin, $scope, $ionicModal, $http) {

	    // Load the add / change dialog from the given template URL
	    $ionicModal.fromTemplateUrl('templates/add-change-dialog.html', function(modal) {
	      $scope.addDialog = modal;
	      }, {
	        scope: $scope,
	        animation: 'slide-in-up'
	      });


	      $scope.showAddChangeDialog = function(action) {
	        $scope.action = action;
	        $scope.addDialog.show();
	      };

	      $scope.leaveAddChangeDialog = function() {
	        // Remove dialog 
	        $scope.addDialog.remove();
	        // Reload modal template to have cleared form
	        $ionicModal.fromTemplateUrl('templates/add-change-dialog.html', function(modal) {
	          $scope.addDialog = modal;
	        }, {
	          scope: $scope,
	          animation: 'slide-in-up'
	        });
	      };

	      $scope.leftButtons = [];
	      var addButton = {};
	      addButton.type = "button-clear";
	      addButton.content = '<i class="icon ion-ios7-plus-outline"></i>';
	      addButton.tap = function(e) {
	        $scope.showAddChangeDialog('add');
	      }
	      $scope.leftButtons.push(addButton);

	      // Define item buttons
	      $scope.itemButtons = [{
	        text: 'Delete',
	        type: 'button-assertive',
	        onTap: function(item) {
	          $scope.removeItem(item);
	        }
	      }, {
	        text: 'Edit',
	        type: 'button-calm',
	        onTap: function(item) {
	          $scope.showEditItem(item);
	        }
	      }];

	      var mitoken = googleLogin.validateToken();
	      console.log('Hola: '+ mitoken);


		var config = {
			headers:  {
		        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
		        "Access-Control-Allow-Origin": '*'
			}
		}

	    // Get list
	    $scope.listado =[];

		$http.get("http://localhost:1337/termino", config)
		.success(function(data){
			$scope.listado = data;
			console.log(data);
		})
		.error(function(err){
			console.log(err);
		});


	})

  	.controller('google', function ($scope, googleLogin) {
            $scope.google_data = {};
            $scope.login = function () {
                var promise = googleLogin.startLogin();
                promise.then(function (data) {
                    $scope.google_data = data;
                }, function (data) {
                    $scope.google_data = data;
                });
            }
     })


  	.controller('consultarCtrl', function ($scope, $location) {
        $scope.selectables = [
		    { enunciado: "Ultimos terminos", url : "ultimos"},
		    { enunciado: "Por materia", url : "2"},
		    { enunciado: "Busqueda directa", url : "3"},
		    { enunciado: "Por alumno", url : "4"}
		];

		$scope.getOpt = function(option){
    	return option.url;
		};

     });
