angular.module('starter.controllers', [])

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
  	})

  	.controller('consultarCtrl', function ($scope, $http, $ionicModal, $location, $ionicPopup, listadoDeMaterias) {
  	
	

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

			$location.path('/tab/'+$scope.urlOpcion);
		};

     })

  	

  	.controller('usuarioCtrl', function ($scope, $http, $ionicModal, $location, $ionicPopup, $ionicHistory, listadoDeMaterias) {

  		
  		/*-- Código para agregar término ($ionicModal) --*/

		$ionicModal.fromTemplateUrl('templates/agregarTermino.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		/*-- Código para crear término nuevo --*/

		$scope.materiasDisponibles = [];

		/*-- Es necesario cargar la lista de materias para asignar una al nuevo término --*/
		$http.get("http://localhost:1337/materia")
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
					})
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
			    $ionicHistory.clearCache();

			}else{
				var alertPopupPromise = $ionicPopup.alert({
					title: 'Alerta',
					template: 'Es necesario rellenar todos los campos',
					okText: 'Cerrar',
					okType: 'button-dark'
				});
			}

		};

  	})

  	.controller('ultimosCtrl', function($scope, $ionicModal, $http, $location, terminoElegido) {

	    $scope.listado =[];

		$http.get("http://localhost:1337/ultimos")
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
		      	
				$location.path('/tab/definiciones');
		    }

		}

	})

	.controller('materiaCtrl', function($scope, $ionicModal, $http, $location, listadoDeMaterias) {

		$scope.materiasDisponibles = [];

		$http.get("http://localhost:1337/materia")
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
		      	
				$location.path('/tab/terminosPorMateria');
		    }
		}

	})

  	.controller('terminosPorMateriaCtrl', function($scope, $ionicModal, $http, $location, listadoDeMaterias, terminoElegido) {


  		$scope.idMateria = listadoDeMaterias.datosGlobales.idMateria;
  		$scope.nombreMateria = listadoDeMaterias.datosGlobales.nombreMateria;

  		/* Obtener terminos por Materia */
  		
	    $scope.terminosPorMateria =[];

		$http.get("http://localhost:1337/materia/"+$scope.idMateria+"/ultimos")
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
		      	
				$location.path('/tab/definiciones');
		    }
		}

  	})

  	.controller('busquedaDirectaCtrl', function($scope, $ionicModal, $http, $location, $ionicPopup,terminoElegido) {

		$scope.busqueda = function(miBusqueda) {
			console.log(miBusqueda);
			if(miBusqueda){
				$scope.valorIntroducido = miBusqueda;
				$scope.listado = null;

				$http.get("http://localhost:1337/search/"+$scope.valorIntroducido)
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
		      	
				$location.path('/tab/definiciones');
		    }

		}


	})

  	.controller('definicionesCtrl', function($scope, $ionicModal, $http, $ionicHistory, $ionicPopup, terminoElegido) {

  		/*-- Código para agregar definición ($ionicModal) --*/

  		$ionicModal.fromTemplateUrl('templates/agregarDefinicion.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

  		$scope.idTermino = terminoElegido.datosGlobales.idTermino;
  		$scope.nombreTermino = terminoElegido.datosGlobales.nombreTermino;

  		/*-- Código para obtener una nueva definición --*/
  		
	    $scope.definiciones =[];

	    $scope.getDefiniciones = function() {

			$http.get("http://localhost:1337/termino/"+$scope.idTermino+"/definiciones")
			.success(function(data){
				$scope.definiciones = data;
				console.log(data);
			})
			.error(function(err){
				console.log(err);
			});
		}

		$scope.getDefiniciones();

		/*-- Código para crear una nueva definición --*/

		$scope.nuevaDefinicion=[];
		$scope.nuevaDefinicion.definicion='';

		$scope.crearDefinicion = function(nuevaDefinicion) {        
		
			console.log(nuevaDefinicion);


			if($scope.nuevaDefinicion.definicion!=''){

				$scope.nuevaDef= nuevaDefinicion.definicion;

				console.log($scope.nuevaDef);


			    $http.post("http://localhost:1337/termino/"+$scope.idTermino+"/agregar",{
					definicion: $scope.nuevaDef
					})
					.success(function(data,status,headers,config){
					console.log(data);

					var alertPopupPromise = $ionicPopup.alert({
						title: '¡Correcto!',
						template: 'Tu definicion se ha creado correctamente',
						okText: 'Aceptar',
						okType: 'button-positive'
					});

					$scope.nuevaDefinicion.definicion='';
				    $scope.modal.hide();
					$scope.getDefiniciones();
				})
					.error(function(err,status,headers,config){
					console.log(err);
				});

			}else{
				var alertPopupPromise = $ionicPopup.alert({
					title: 'Alerta',
					template: 'Es necesario escribir una definición',
					okText: 'Cerrar',
					okType: 'button-dark'
				});
			}

		};

		/*-- Código para denunciar una definición --*/

		$scope.denunciarDefinicion = function(idDefinicion, denunciaDefinicion) {
	
			if(denunciaDefinicion == false){

				var confirmPopup = $ionicPopup.confirm({
				title: 'Denunciar Definición',
				template: '¿Estás seguro que deseas denunciar esta definición?'
				});
				confirmPopup.then(function(res) {
					if(res) {

						$http.put("http://localhost:1337/definicion/"+idDefinicion+"/denunciar")
						.success(function(data,status,headers,config){
							console.log(data);

							var alertPopupPromise = $ionicPopup.alert({
								title: '¡Definición Denunciada!',
								template: 'Hemos recibido tu denuncia satisfactoriamente. Pronto un profesor se encargará de evaluar el contenido de esta definición.',
								okText: 'Aceptar',
								okType: 'button-positive'
							});

							$scope.getDefiniciones();
							
						})
							.error(function(err,status,headers,config){
							console.log(err);
						});
					 
					} else {
					 console.log('Has cambiado de opinión');
					}
				});

			}else if(denunciaDefinicion == true){

				var alertPopupPromise = $ionicPopup.alert({
					title: '¡Definición Denunciada!',
					template: 'Esta definición ya ha sido denunciada. ',
					okText: 'Aceptar',
					okType: 'button-positive'
				});

			}

		};

		/*-- Código para valorar una definición --*/


		$ionicModal.fromTemplateUrl('templates/agregarPuntuacion.html', {
			scope: $scope
		}).then(function(puntuacion) {
			$scope.puntuacion = puntuacion;
		});


		$scope.ratingArr = [{
			value: 1,
			icon: 'ion-ios-star-outline'
		},
		{
			value: 2,
			icon: 'ion-ios-star-outline'
		},
		{
			value: 3,
			icon: 'ion-ios-star-outline'
		},
		{
			value: 4,
			icon: 'ion-ios-star-outline'
		},
		{
			value: 5,
			icon: 'ion-ios-star-outline'
		}];

		$scope.setRating = function(val){

			var rtgs= $scope.ratingArr;

			for (var i = 0; i<rtgs.length; i++) {
				if(i< val){
					rtgs[i].icon = 'ion-ios-star';

				}else{
					rtgs[i].icon = 'ion-ios-star-outline';

				}	
			}

			$scope.valorSeleccionado=val;
		}

		$scope.valoracion = function(idDefinicion, denunciaDefinicion){

			$scope.idDefinicionSeleccionada = idDefinicion;

			/*
			$http.get("http://localhost:1337/definicion/"+$scope.idDefinicionSeleccionada+"/valoraciones")
			.success(function(data){
				$scope.comprobandoValoracion = data;
				console.log($scope.comprobandoValoracion);

				if($scope.comprobandoValoracion == 0){
			*/
					if(denunciaDefinicion == false){

						$scope.puntuacion.show($scope.idDefinicionSeleccionada);

					}else if(denunciaDefinicion == true){

						var alertPopupPromise = $ionicPopup.alert({
							title: '¡Definición Denunciada!',
							template: 'Esta definición ha sido denunciada. No es posible asignar una puntuación hasta su posterior revisión. ',
							okText: 'Aceptar',
							okType: 'button-positive'
						});
					}
			/*
				}else{

					var alertPopupPromise = $ionicPopup.alert({
					title: '¡Definición ya valorada!',
					template: 'Esta definición ya ha sido valorada.',
					okText: 'Aceptar',
					okType: 'button-positive'
					});

				}
			})
			.error(function(err){
				console.log(err);
			});

			*/
		}

		$scope.valorarDefinicion = function(val, idDefinicionSeleccionada){

			$scope.valoracionConsedida = val;
			$scope.idSeleccionadaLista = idDefinicionSeleccionada;

			var confirmPopup = $ionicPopup.confirm({
			title: 'Valorar Definición',
			template: '¿Estás seguro que deseas aginar esta puntuación?'
			});
			confirmPopup.then(function(res) {
				if(res) {

					$http.post("http://localhost:1337/definicion/"+$scope.idSeleccionadaLista+"/valorar",{
					valoracion: $scope.valoracionConsedida
					})
					.success(function(data,status,headers,config){
						console.log(data);

						var alertPopupPromise = $ionicPopup.alert({
							title: '¡Definición Valorada!',
							template: 'Hemos recibido tu valoración satisfactoriamente.',
							okText: 'Aceptar',
							okType: 'button-positive'
						});
						
						$scope.puntuacion.hide();
						$scope.getDefiniciones();
						
					})
						.error(function(err,status,headers,config){
						console.log(err);
					});
				 
				} else {
				 console.log('Has cambiado de opinión');
				}
			});
		}

  	})

