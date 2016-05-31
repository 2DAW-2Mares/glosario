angular.module('starter.controllers', [])
  	.controller('consultarCtrl', function ($scope, $http, $ionicModal, $location, $ionicPopup, listadoDeMaterias) {
  	
		var config = {
			headers:
			{
		        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
		        "Access-Control-Allow-Origin": '*'
			}
		}

		/*-- Código para agregar término ($ionicModal) --*/

		$ionicModal.fromTemplateUrl('templates/menu.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		/*-- Código para crear término nuevo --*/

		$scope.materiasDisponibles = [];

		$http.get("http://localhost:1337/materia", config)
		.success(function(data){
			$scope.materiasDisponibles = data;
			console.log(data);
		})
		.error(function(err){
			console.log(err);
		});

		$scope.nuevoTermino=[];
		$scope.nuevoTermino.nombre='';
		$scope.nuevoTermino.id='';

		$scope.crearTermino = function(nuevoTermino) {        
		
			console.log(nuevoTermino);

			if($scope.nuevoTermino.nombre!='' && $scope.nuevoTermino.id!=''){

				$scope.nuevoNombre= nuevoTermino.nombre;
				$scope.nuevoId= nuevoTermino.id;

			    $http.post("http://localhost:1337/termino",{
					nombre: $scope.nuevoNombre,
					materia: $scope.nuevoId
					},config)
					.success(function(data,status,headers,config){
					console.log(data);
				})
					.error(function(err,status,headers,config){
					console.log(err);
				});

				var alertPopupPromise = $ionicPopup.alert({
					title: '¡Correcto!',
					template: 'Tu termino se ha creado correctamente',
					okText: 'Aceptar',
					okType: 'button-positive'
				});

			    $scope.modal.hide();
			    $scope.toggleDrawer();

			}else{
				var alertPopupPromise = $ionicPopup.alert({
					title: 'Alerta',
					template: 'Es necesario rellenar todos los campos',
					okText: 'Cerrar',
					okType: 'button-dark'
				});
			}

		};

  		/*-- Seleccion de Opciones --*/

        $scope.selectables = [
		    { enunciado: "Ultimos terminos", url : "ultimos"},
		    { enunciado: "Por materia", url : "materia"},
		    { enunciado: "Busqueda directa", url : "busquedaDirecta"}
		];

		$scope.getOpciones = function(option){
    		return option;
		};

		$scope.miSeleccionOpciones = function(newValue, oldValue){
			$scope.idOpcion = newValue.id;
			$scope.nombreOpcion = newValue.enunciado;
			$scope.urlOpcion = newValue.url;

			$location.path('/'+$scope.urlOpcion);
		};

     })

  	.controller('ultimosCtrl', function($scope, $ionicModal, $http, $location, $ionicHistory, terminoElegido) {

  		/* Botón Volver a consultar*/
  		$scope.volverConsultar = function() {
    		$location.path('/consultar');
  		}

		var config = {
			headers:
			{
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

	.controller('materiaCtrl', function($scope, $ionicModal, $http, $location, $ionicHistory, listadoDeMaterias) {

  		/* Botón Volver a consultar*/
  		$scope.volverConsultar = function() {
    		$location.path('/consultar');
  		}

		var config = {
			headers:
			{
		        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
		        "Access-Control-Allow-Origin": '*'
			}
		}

		$scope.materiasDisponibles = [];

		$http.get("http://localhost:1337/materia", config)
		.success(function(data){
			$scope.materiasDisponibles = data;
			console.log(data);
		})
		.error(function(err){
			console.log(err);
		});
		
		$scope.miSeleccionMaterias = function(materia){

			$scope.idMateria = materia.id;
			$scope.nombreMateria = materia.materia;

			listadoDeMaterias.datosGlobales.idMateria = $scope.idMateria;
			listadoDeMaterias.datosGlobales.nombreMateria = $scope.nombreMateria;

			if (listadoDeMaterias.datosGlobales.idMateria!= null && listadoDeMaterias.datosGlobales.nombreMateria != null) {
		      	
				$location.path('/terminosPorMateria');
		    }
		}

	})

  	.controller('terminosPorMateriaCtrl', function($scope, $ionicModal, $http, $location, listadoDeMaterias, terminoElegido) {

  		/* Botón Volver a consultar*/
  		$scope.volverConsultar = function() {
    		$location.path('/materia');
  		}

  		var config = {
			headers:

			{
		        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
		        "Access-Control-Allow-Origin": '*'
			}
		}

  		$scope.idMateria = listadoDeMaterias.datosGlobales.idMateria;
  		$scope.nombreMateria = listadoDeMaterias.datosGlobales.nombreMateria;

  		/* Obtener terminos por Materia */
  		
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

  	.controller('busquedaDirectaCtrl', function($scope, $ionicModal, $http, $location, $ionicPopup,terminoElegido) {

  		/* Botón Volver a consultar*/
  		$scope.volverConsultar = function() {
    		$location.path('/consultar');
  		}

		var config = {
			headers:  {
		        'Authorization': 'Basic YWRtaW46YWRtaW4xMjM0',
		        "Access-Control-Allow-Origin": '*'
			}
		}

		
		$scope.busqueda = function(miBusqueda) {
			console.log(miBusqueda);
			if(miBusqueda){
				$scope.valorIntroducido = miBusqueda;
				$scope.listado = null;

				$http.get("http://localhost:1337/search/"+$scope.valorIntroducido, config)
				.success(function(data){
					
					if(data != ''){
						$scope.listado = data;
						
					}else{
						var alertPopupPromise = $ionicPopup.alert({
							title: 'Alerta',
							template: 'No se encontraron coincidencias',
							okText: 'Cerrar',
							okType: 'button-dark'
						});
					}	
				})
				.error(function(err){
					console.log(err);
				});
			}else{

				var alertPopupPromise = $ionicPopup.alert({
					title: 'Alerta',
					template: 'Debes escribir algo',
					okText: 'Cerrar',
					okType: 'button-assertive'
				});
			}

		}

		$scope.select_item = function(termino){

			terminoElegido.datosGlobales.idTermino = termino.id;
			terminoElegido.datosGlobales.nombreTermino = termino.nombre;

			if (terminoElegido.datosGlobales.idTermino!= null && terminoElegido.datosGlobales.nombreTermino != null) {
		      	
				$location.path('/definiciones');
		    }

		}


	})

  	.controller('definicionesCtrl',
  		function($scope, $ionicModal, $http,$ionicHistory, $ionicPopup, terminoElegido) {

  		/* Botón Volver */
  		$scope.volver = function() {
    		$ionicHistory.goBack();
  		}

  		/*-- Código para agregar definición ($ionicModal) --*/

  		$ionicModal.fromTemplateUrl('templates/agregarDefinicion.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

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

	    $scope.getDefiniciones = function() {

			$http.get("http://localhost:1337/termino/"+$scope.idTermino+"/definiciones", config)
			.success(function(data){
				$scope.definiciones = data;
				console.log(data);
			})
			.error(function(err){
				console.log(err);
			});
		}

		$scope.getDefiniciones();		

		/*-- Código para crear término nuevo --*/

		$scope.nuevaDefinicion=[];
		$scope.nuevaDefinicion.definicion='';

		$scope.crearDefinicion = function(nuevaDefinicion) {        
		
			console.log(nuevaDefinicion);


			if($scope.nuevaDefinicion.definicion!=''){

				$scope.nuevaDef= nuevaDefinicion.definicion;

				console.log($scope.nuevaDef);


			    $http.post("http://localhost:1337/termino/"+$scope.idTermino+"/agregar",{
					definicion: $scope.nuevaDef
					},config)
					.success(function(data,status,headers,config){
					console.log(data);
					$scope.getDefiniciones();
				})
					.error(function(err,status,headers,config){
					console.log(err);
				});

				var alertPopupPromise = $ionicPopup.alert({
					title: '¡Correcto!',
					template: 'Tu definicion se ha creado correctamente',
					okText: 'Aceptar',
					okType: 'button-positive'
				});

			    $scope.modal.hide();

			}else{
				var alertPopupPromise = $ionicPopup.alert({
					title: 'Alerta',
					template: 'Es necesario escribir una definición',
					okText: 'Cerrar',
					okType: 'button-dark'
				});
			}

		};

  	})

  	.controller('loginCtrl', function($scope, $ionicPopup, $auth, $location) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $ionicPopup.alert({
            title: 'Success',
            content: 'You have successfully logged in!'
          })

          $location.path('/consultar');
        })
        .catch(function(response) {
          $ionicPopup.alert({
            title: 'Error',
            content: response.data ? response.data || response.data.message : response
          })

        });
    };


    $scope.logout = function() {
      $auth.logout();
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  });
