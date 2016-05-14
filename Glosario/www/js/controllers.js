
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


  	.controller('consultarCtrl', function ($scope,$rootScope, $http, $ionicModal, $location, listadoDeMaterias) {


        $scope.selectables = [
		    { enunciado: "Ultimos terminos", url : "ultimos"},
		    { enunciado: "Por materia", url : "terminosPorMateria"},
		    { enunciado: "Busqueda directa", url : "3"},
		    { enunciado: "Por alumno", url : "4"}
		];

		$scope.getOpt = function(option){
    	return option.url;
		};

		var config = {
			headers:  {
		        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
		        "Access-Control-Allow-Origin": '*'
			}
		}

		$scope.materiasElegidas = [];

		$http.get("http://localhost:1337/materia", config)
		.success(function(data){
			$scope.materias = data;
			$scope.materiasElegidas = data;
			console.log(data);
		})
		.error(function(err){
			console.log(err);
		});
		
		$scope.getMaterias = function(option){
    		return option.id;
		};

		$scope.miSeleccion = function(newValue, oldValue){

			$scope.loquesea = JSON.stringify(newValue);
			listadoDeMaterias.datosGlobales.idMateria = $scope.loquesea;
		}
		
	

		

     })

  	.controller('materiaCtrl', function($scope, $ionicModal, $http, $location, listadoDeMaterias) {

  		var config = {
			headers:  {
		        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
		        "Access-Control-Allow-Origin": '*'
			}
		}
  		// Obtener materias
  		$scope.someModel = null;
	    $scope.materias =[];

	    $scope.miMateriaSeleccionada={ id:0};
		
		console.log($scope.miMateriaSeleccionada);

		$http.get("http://localhost:1337/materia", config)
		.success(function(data){
			$scope.materias = data;
			//listadoDeMaterias.datosGlobales.datos = data;
			console.log(data);
		})
		.error(function(err){
			console.log(err);
		});



		//listadoDeMaterias.datosGlobales.datos = $scope.miMateriaSeleccionada;

  	})

  	.controller('terminosPorMateriaCtrl',
  		function($scope, $ionicModal, $http, listadoDeMaterias) {




  		$scope.idMateria2 = listadoDeMaterias.datosGlobales.idMateria;
		//console.log($scope.idMateria2.idMateria);

  		var config = {
			headers:  {
		        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
		        "Access-Control-Allow-Origin": '*'
			}
		}
  		// Obtener materias
  		
  		var materias;
	    $scope.terminos =[];

		$http.get("http://localhost:1337/materia/"+$scope.idMateria2+"/ultimos", config)
		.success(function(data){
			$scope.terminos = data;
			console.log(data);
		})
		.error(function(err){
			console.log(err);
		});
		
  	});