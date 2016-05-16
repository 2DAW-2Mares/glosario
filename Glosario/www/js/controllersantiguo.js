
 angular.module('starter.controllers', [])
  	.controller('ultimosCtrl', function(googleLogin, $scope, $ionicModal, $http, $location, terminoElegido) {

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


		var config = {
			headers:  {
		        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
		        "Access-Control-Allow-Origin": '*'
			}
		}

	    $scope.listado =[];

		$http.get("http://localhost:1337/termino", config)
		.success(function(data){
			$scope.listado = data;
			console.log(data);
		})
		.error(function(err){
			console.log(err);
		});

		$scope.select_item = function(termino){	
			terminoElegido.datosGlobales.idTermino = termino.id;
			terminoElegido.datosGlobales.nombreTermino = termino.nombre;
			//console.log(terminoElegido.datosGlobales.idTermino);
		}


	})

  	.controller('consultarCtrl', function ($scope,$rootScope, $http, $ionicModal, $location, listadoDeMaterias, ServicioDefiniciones) {

  		var config = {
			headers:  {
		        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
		        "Access-Control-Allow-Origin": '*'
			}
		}

  		/*-- Seleccion de Opciones --*/

        $scope.selectables = [
		    { enunciado: "Ultimos terminos", url : "ultimos"},
		    { enunciado: "Por materia", url : "terminosPorMateria"},
		    { enunciado: "Busqueda directa", url : "3"},
		    { enunciado: "Por alumno", url : "4"}
		];

		$scope.getOpciones = function(option){
    		return option;
		};


		$scope.miSeleccionOpciones = function(newValue, oldValue){
			$scope.idOpcion = newValue.id;
			$scope.nombreOpcion = newValue.enunciado;
		};
	
		

		/*-- OPCION 1: Ultimos --*/


		$scope.listado =[];

		$http.get("http://localhost:1337/termino", config)
		.success(function(data){
			$scope.listado = data;
			console.log(data);
		})
		.error(function(err){
			console.log(err);
		});

		$scope.getTerminos = function(option){

			return option;
    		//return "nombre:"+option.nombre +",id:"+ option.id;
		};

		$scope.miSeleccionTerminos = function(newValue, oldValue){

			$scope.idTermino = newValue.id;
			$scope.nombreTermino = newValue.nombre;

			ServicioDefiniciones.datosGlobales.idTermino = $scope.idTermino;
			ServicioDefiniciones.datosGlobales.nombreTermino = $scope.nombreTermino;
		}


		/*-- OPCION 2: Por Materias --*/

		$scope.materiasElegidas = [];

		$http.get("http://localhost:1337/materia", config)
		.success(function(data){
			$scope.materiasElegidas = data;
			console.log(data);
		})
		.error(function(err){
			console.log(err);
		});
		
		$scope.getMaterias = function(option){
    		return option;
		};

		$rootScope.misTerminos =[];

		$scope.miSeleccionMaterias = function(newValue, oldValue){

			$scope.idMateria = newValue.id;
			$scope.nombreMateria = newValue.materia;

			listadoDeMaterias.datosGlobales.idMateria = $scope.idMateria;
			listadoDeMaterias.datosGlobales.nombreMateria = $scope.nombreMateria;
				
			$http.get("http://localhost:1337/materia/"+$scope.idMateria+"/ultimos", config)
			.success(function(data){
				$rootScope.misTerminos = data;
				console.log(data);
			})
			.error(function(err){
				console.log(err);
			});
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




  		$scope.idMateria2 = listadoDeMaterias.datosGlobales;
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

  	})


  	.controller('definicionesCtrl',
  		function($scope, $ionicModal, $http, ServicioDefiniciones,terminoElegido) {


  		//$scope.idTermino = ServicioDefiniciones.datosGlobales.idTermino;
  		//$scope.nombreTermino = ServicioDefiniciones.datosGlobales.nombreTermino;
  		$scope.idTermino = terminoElegido.datosGlobales.idTermino;
  		$scope.nombreTermino = terminoElegido.datosGlobales.nombreTermino;

  		var config = {
			headers:  {
		        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
		        "Access-Control-Allow-Origin": '*'
			}
		}
  		// Obtener definiciones
  		
	    $scope.definiciones =[];

		$http.get("http://localhost:1337/termino/"+$scope.idTermino+"/definiciones", config)
		.success(function(data){
			$scope.definiciones = data;
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