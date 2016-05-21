
 angular.module('starter.controllers', [])
  	.controller('ultimosCtrl', function($scope, $ionicModal, $http, $location, terminoElegido) {

		var config = {
			headers:  {
		        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
		        "Access-Control-Allow-Origin": '*'
			}
		}

	    $scope.listado =[];

		$http.get("http://localhost:1337/ultimos", config)
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

			if (terminoElegido.datosGlobales.idTermino!= null && terminoElegido.datosGlobales.nombreTermino != null) {
		      	
				$location.path('/definiciones');
		    }

		}


	})

  	.controller('consultarCtrl', function ($scope, $http, $ionicModal, $location, listadoDeMaterias) {

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
		    { enunciado: "Busqueda directa", url : "busquedaDirecta"},
		    { enunciado: "Por alumno", url : "4"}
		];

		$scope.getOpciones = function(option){
    		return option;
		};


		$scope.miSeleccionOpciones = function(newValue, oldValue){
			$scope.idOpcion = newValue.id;
			$scope.nombreOpcion = newValue.enunciado;
		};


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

		$scope.miSeleccionMaterias = function(newValue, oldValue){

			$scope.idMateria = newValue.id;
			$scope.nombreMateria = newValue.materia;

			listadoDeMaterias.datosGlobales.idMateria = $scope.idMateria;
			listadoDeMaterias.datosGlobales.nombreMateria = $scope.nombreMateria;	
		}
		

     })

  	.controller('terminosPorMateriaCtrl',
  		function($scope, $ionicModal, $http, $location, listadoDeMaterias, terminoElegido) {

  		var config = {
			headers:  {
		        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
		        "Access-Control-Allow-Origin": '*'
			}
		}

  		$scope.idMateria = listadoDeMaterias.datosGlobales.idMateria;
  		$scope.nombreMateria = listadoDeMaterias.datosGlobales.nombreMateria;

  		
  		// Obtener terminos por Materia
  		
	    $scope.terminosPorMateria =[];

		$http.get("http://localhost:1337/materia/"+$scope.idMateria+"/ultimos", config)
		.success(function(data){
			$scope.terminosPorMateria = data;
			console.log(data);
		})
		.error(function(err){
			console.log(err);
		});

		$scope.select_item = function(termino){

			terminoElegido.datosGlobales.idTermino = termino.id;
			terminoElegido.datosGlobales.nombreTermino = termino.nombre;

			if (terminoElegido.datosGlobales.idTermino!= null && terminoElegido.datosGlobales.nombreTermino != null) {
		      	
				$location.path('/definiciones');
		    }
		}

  	})

  	.controller('busquedaDirectaCtrl', function($scope, $ionicModal, $http, $location, terminoElegido) {

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

			if (terminoElegido.datosGlobales.idTermino!= null && terminoElegido.datosGlobales.nombreTermino != null) {
		      	
				$location.path('/definiciones');
		    }

		}


	})


  	.controller('definicionesCtrl',
  		function($scope, $ionicModal, $http, terminoElegido) {


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

  	.controller('AppCtrl', function($scope) {
})
