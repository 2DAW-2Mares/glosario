angular.module('starter.controllers', [])

	.controller('loginCtrl', function($scope, googleLogin) {

        $scope.google_data = {};
        $scope.login = function () {
            var promise = googleLogin.startLogin();
            promise.then(function (data) {
                $scope.google_data = data;
            }, function (data) {
                $scope.google_data = data;
            });
        }

		/*
	    $scope.authenticate = function(provider) {
	      $auth.authenticate(provider)
	        .then(function() {
	          $ionicPopup.alert({
	            title: 'Success',
	            content: 'You have successfully logged in!'
	          })

	          $location.path('/tab/inicio');
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
	    */
  	})

  	.controller('inicioCtrl', function ($scope, $http, $ionicModal, $location) {
  	
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


  	.controller('playCtrl', function ($scope, $http, $ionicModal, $ionicLoading, $timeout, $ionicPopup, rutaProyecto ) {
		
  		/* Código Jugar */

		$scope.getPlay = function(){

	  		$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});

		    $scope.adivinaTermino =[];

			//$http.get("http://localhost:1337/play")
			$http.get(rutaProyecto+"/play")
			.success(function(data){

				$timeout(function () {
					$ionicLoading.hide();
					$scope.adivinaTermino = data;
					console.log(data);
				}, 1000);

			})
			.error(function(err){
				console.log(err);
			});
		}

		$scope.getPlay();

  		/* Enviando respuesta */

  		$scope.miRespuesta=[];
		$scope.miRespuesta.input='';

		$scope.comprobar = function(respuestaEnviada, idTermino){

			if(respuestaEnviada.input!=null){

				$ionicLoading.show({
					content: 'Loading',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
				});

			    $http.post(rutaProyecto+"/play",{
					nombre: respuestaEnviada.input,
					id: idTermino,
					})
					.success(function(data,status,headers,config){
					
						$timeout(function () {
							$ionicLoading.hide();
							$scope.miRespuesta.input='';
							console.log(data);
							if(data == true){

								var alertPopup = $ionicPopup.alert({
									title: '¡Correcto!',
									template: 'Enhorabuena, tu respuesta es correcta, pulsa "siguiente" para continuar.',
									okText: 'Siguiente',
									okType: 'button-positive'
								});
			
								$scope.getPlay();
			
							}else{

								var confirmPopup = $ionicPopup.confirm({
									title: '¡Incorrecto!',
									template: 'Tu respuesta no es correcta, pulsa "reintentar" para probar suerte con un nuevo término.',
									okText: 'Reintentar',
									okType: 'button-dark'
								});

								confirmPopup.then(function(res) {
									if(res) {
										$scope.getPlay();
									}
								});

							}

						}, 1000);
						console.log(data);

				})
					.error(function(err,status,headers,config){
					console.log(err);
				});

			}else{
				var alertPopupPromise = $ionicPopup.alert({
					title: 'Alerta',
					template: 'Es necesario escribir un término',
					okText: 'Cerrar',
					okType: 'button-dark'
				});
			}
		}


     })

  	.controller('ultimosCtrl', function($scope, $http, $ionicModal, $location, $ionicLoading, $timeout, rutaProyecto, terminoElegido) {

		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});

	    $scope.listado =[];

		$http.get(rutaProyecto+"/ultimos")
		.success(function(data){

			$timeout(function () {
				$ionicLoading.hide();
				$scope.listado = data;
				console.log(data);

			}, 1000);

		})
		.error(function(err){
	
			$timeout(function () {
				$ionicLoading.hide();
				console.log(err);
			}, 1000);

		});

		$scope.select_item = function(termino){

			terminoElegido.datosGlobales.idTermino = termino.id;
			terminoElegido.datosGlobales.nombreTermino = termino.nombre;

			if (terminoElegido.datosGlobales.idTermino!= null && terminoElegido.datosGlobales.nombreTermino != null) {
		      	
				$location.path('/tab/definiciones');
		    }

		}

	})

	.controller('materiaCtrl', function($scope, $http, $ionicModal, $location, $ionicLoading, $timeout, rutaProyecto, listadoDeMaterias) {

		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});

		$scope.materiasDisponibles = [];

		$http.get(rutaProyecto+"/materia")
		.success(function(data){

			$timeout(function () {
				$ionicLoading.hide();
				$scope.materiasDisponibles = data;

			}, 1000);
			console.log(data);
		})
		.error(function(err){
			$timeout(function () {
				$ionicLoading.hide();
				console.log(err);
			}, 1000);
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

  	.controller('terminosPorMateriaCtrl', function($scope, $http, $ionicModal, $location, $ionicLoading, $timeout, rutaProyecto, listadoDeMaterias, terminoElegido) {

		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});

  		$scope.idMateria = listadoDeMaterias.datosGlobales.idMateria;
  		$scope.nombreMateria = listadoDeMaterias.datosGlobales.nombreMateria;

  		/* Obtener terminos por Materia */
  		
	    $scope.terminosPorMateria =[];

		$http.get(rutaProyecto+"/materia/"+$scope.idMateria+"/ultimos")
		.success(function(data){

			$timeout(function () {
				$ionicLoading.hide();
				$scope.terminosPorMateria = data;
				console.log(data);

			}, 1000);
			
		})
		.error(function(err){
			$timeout(function () {
				$ionicLoading.hide();
				console.log(err);
			}, 1000);
		});

		$scope.select_item = function(termino){

			terminoElegido.datosGlobales.idTermino = termino.id;
			terminoElegido.datosGlobales.nombreTermino = termino.nombre;

			if (terminoElegido.datosGlobales.idTermino!= null && terminoElegido.datosGlobales.nombreTermino != null) {
		      	
				$location.path('/tab/definiciones');
		    }
		}

  	})

  	.controller('busquedaDirectaCtrl', function($scope, $http, $ionicModal, $location, $ionicLoading, $timeout, $ionicPopup, rutaProyecto, terminoElegido) {

  		$scope.miBusqueda=[];
		$scope.miBusqueda.input='';

		$scope.busqueda = function(miBusqueda) {
			
			if(miBusqueda.input != ''){

				$ionicLoading.show({
					content: 'Loading',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
				});

				$scope.listado = null;

				$http.get(rutaProyecto+"/search/"+$scope.miBusqueda.input)
				.success(function(data){
					
					if(data != ''){
						$timeout(function () {
							$ionicLoading.hide();
							$scope.listado = data;

						}, 1000);				
					}else{

						$timeout(function () {
							$ionicLoading.hide();
							var alertPopupPromise = $ionicPopup.alert({
								title: 'Alerta',
								template: 'No se encontraron coincidencias',
								okText: 'Cerrar',
								okType: 'button-dark'
							});
							$scope.miBusqueda.input='';

						}, 1000);	
						
					}	
				})
				.error(function(err){
					$timeout(function () {
						$ionicLoading.hide();
						console.log(err);
					}, 1000);
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

  	.controller('definicionesCtrl', function($scope, $http, $ionicModal, $ionicHistory, $ionicPopup, $ionicLoading, $timeout, rutaProyecto, terminoElegido) {

  		
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

	    	$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});

			$http.get(rutaProyecto+"/termino/"+$scope.idTermino+"/definiciones")
			.success(function(data){

				$timeout(function () {
					$ionicLoading.hide();

					$scope.definiciones = data;

					if(data){
						if($scope.definiciones!=0){
							$scope.comprobar=true;
						}else{
							$scope.comprobar=false;
						}
					}

				}, 1000);
		
			})
			.error(function(err){
				$timeout(function () {
					$ionicLoading.hide();
					console.log(err);
				}, 1000);
			});
		}

		$scope.getDefiniciones();

		/*-- Código para crear una nueva definición --*/

		$scope.nuevaDefinicion=[];
		$scope.nuevaDefinicion.definicion='';

		$scope.crearDefinicion = function(nuevaDefinicion) { 
		
			if($scope.nuevaDefinicion.definicion!=''){

				$ionicLoading.show({
					content: 'Loading',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
				});

				$scope.nuevaDef= nuevaDefinicion.definicion;

				console.log($scope.nuevaDef);


			    $http.post(rutaProyecto+"/termino/"+$scope.idTermino+"/agregar",{
					definicion: $scope.nuevaDef
					})
					.success(function(data,status,headers,config){
					
						$timeout(function () {
							$ionicLoading.hide();

							var alertPopupPromise = $ionicPopup.alert({
								title: '¡Correcto!',
								template: 'Tu definición se ha creado correctamente',
								okText: 'Aceptar',
								okType: 'button-positive'
							});

							$scope.nuevaDefinicion.definicion='';
						    $scope.modal.hide();
							$scope.getDefiniciones();

						}, 1000);
						console.log(data);

					})
					.error(function(err,status,headers,config){
						$timeout(function () {
							$ionicLoading.hide();
							console.log(err);
						}, 1000);

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
						
						$ionicLoading.show({
							content: 'Loading',
							animation: 'fade-in',
							showBackdrop: true,
							maxWidth: 200,
							showDelay: 0
						});

						$http.put(rutaProyecto+"/definicion/"+idDefinicion+"/denunciar")
						.success(function(data,status,headers,config){


							$timeout(function () {
								$ionicLoading.hide();

								var alertPopupPromise = $ionicPopup.alert({
									title: '¡Definición Denunciada!',
									template: 'Hemos recibido tu denuncia satisfactoriamente. Pronto un profesor se encargará de evaluar el contenido de esta definición.',
									okText: 'Aceptar',
									okType: 'button-positive'
								});

								$scope.getDefiniciones();
								$ionicHistory.clearCache();

							}, 1000);
							console.log(data);

						})
							.error(function(err,status,headers,config){
								$timeout(function () {
									$ionicLoading.hide();
									console.log(err);
								}, 1000);

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

					$ionicLoading.show({
						content: 'Loading',
						animation: 'fade-in',
						showBackdrop: true,
						maxWidth: 200,
						showDelay: 0
					});

					$http.post(rutaProyecto+"/definicion/"+$scope.idSeleccionadaLista+"/valorar",{
					valoracion: $scope.valoracionConsedida
					})
					.success(function(data,status,headers,config){

						$timeout(function () {
							$ionicLoading.hide();

							var alertPopupPromise = $ionicPopup.alert({
								title: '¡Definición Valorada!',
								template: 'Hemos recibido tu valoración satisfactoriamente.',
								okText: 'Aceptar',
								okType: 'button-positive'
							});

							$scope.puntuacion.hide();
							$ionicHistory.clearCache();
							$scope.getDefiniciones();
							$scope.setRating(0);

						}, 1000);
						console.log(data);

					})
					.error(function(err,status,headers,config){
						$timeout(function () {
							$ionicLoading.hide();
							console.log(err);
						}, 1000);

					});
				 
				} else {
				 console.log('Has cambiado de opinión');
				}
			});
		}

  	})

  	.controller('usuarioCtrl', function ($scope, $http, $ionicModal, $location, $ionicPopup, $ionicHistory, $ionicLoading, $timeout, rutaProyecto, grupoElegido) {

  		
  		/*-- Código para agregar término ($ionicModal) --*/

		$ionicModal.fromTemplateUrl('templates/agregarTermino.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		/*-- Código para crear término nuevo --*/

		$scope.materiasDisponibles = [];

		/*-- Código para crear materias disponibles --*/
		$http.get(rutaProyecto+"/materia")
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

				$ionicLoading.show({
					content: 'Loading',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
				});

			    $http.post(rutaProyecto+"/termino",{
					nombre: $scope.nuevoNombre,
					materia: $scope.nuevoId
					})
				.success(function(data,status,headers,config){

					$timeout(function () {
						$ionicLoading.hide();

						var alertPopupPromise = $ionicPopup.alert({
							title: '¡Correcto!',
							template: 'Tu termino se ha creado correctamente',
							okText: 'Aceptar',
							okType: 'button-positive'
						});

						$scope.nuevoTermino.nombre='';
						$scope.nuevoTermino.id='';
					    $scope.modal.hide();
					    $ionicHistory.clearCache();

					}, 1000);
					console.log(data);
				})
				.error(function(err,status,headers,config){
					$timeout(function () {
						$ionicLoading.hide();
						console.log(err);
					}, 1000);

				});

			}else{
				var alertPopupPromise = $ionicPopup.alert({
					title: 'Alerta',
					template: 'Es necesario rellenar todos los campos',
					okText: 'Cerrar',
					okType: 'button-dark'
				});
			}

		};

		/*-- Código para seleccionar un grupo --*/

		$ionicModal.fromTemplateUrl('templates/grupos.html', {
			scope: $scope
		}).then(function(grupos) {
			$scope.grupos = grupos;
		});

		$scope.gruposExistentes = [];

		$scope.obtenerGrupo = function() {

			$http.get(rutaProyecto+"/grupo")
			.success(function(data){

				$scope.gruposExistentes = data;
				console.log(data);
				
			})
			.error(function(err){
				console.log(err);
			});
		}

		$scope.obtenerGrupo();

		$scope.buscarAlumnos = function(grupo){

			grupoElegido.datosGlobales.idGrupo = grupo.id;
			grupoElegido.datosGlobales.ensenyanza = grupo.ensenyanza;
			grupoElegido.datosGlobales.curso = grupo.curso;


			if (grupoElegido.datosGlobales.idGrupo!= null && grupoElegido.datosGlobales.ensenyanza!= null && grupoElegido.datosGlobales.curso!= null) {
		      	
				$location.path('/tab/listarAlumnos');
				$scope.grupos.hide();
		    }
		}

  	})

  	.controller('definicionesDenunciadasCtrl', function($scope, $http, $ionicHistory, $ionicPopup, $ionicLoading, $timeout, rutaProyecto) {

  		/*-- Código para obtener las definiciones denunciadas --*/
  		
	    $scope.definicionesDenunciadas =[];

	    $scope.getDefinicionesDenunciadas = function() {

	    	$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});

			$http.get(rutaProyecto+"/denunciadas/")
			.success(function(data){

				$timeout(function () {
					$ionicLoading.hide();
					$scope.definicionesDenunciadas = data;

					if(data){
						if($scope.definicionesDenunciadas!=0){
							$scope.comprobar=true;
						}else{
							$scope.comprobar=false;
						}
					}

				}, 1000);
				console.log(data);

			})
			.error(function(err){
				$timeout(function () {
					$ionicLoading.hide();
					console.log(err);
				}, 1000);
			});
		}

		$scope.getDefinicionesDenunciadas();

		/*-- Código para reestablecer la definición denunciada --*/

		$scope.recuperarDefinicion = function(idDefinicion) {

			var confirmPopup = $ionicPopup.confirm({
			title: 'Reestablecer Definición',
			template: '¿Estás seguro que deseas reestablecer esta definición?'
			});
			confirmPopup.then(function(res) {
				if(res) {

					$ionicLoading.show({
						content: 'Loading',
						animation: 'fade-in',
						showBackdrop: true,
						maxWidth: 200,
						showDelay: 0
					});

					$http.put(rutaProyecto+"/definicion/"+idDefinicion,{
					denunciado: false,
					})
					.success(function(data,status,headers,config){

						$timeout(function () {
							$ionicLoading.hide();
							var alertPopupPromise = $ionicPopup.alert({
							title: '¡Definición Reestablecida!',
							template: 'La definición se ha reestablecido correctamente.',
							okText: 'Aceptar',
							okType: 'button-positive'
							});

							$scope.getDefinicionesDenunciadas();
							$ionicHistory.clearCache();
							console.log(data);

						}, 1000);
						
					})
					.error(function(err,status,headers,config){
						$timeout(function () {
							$ionicLoading.hide();
							console.log(err);
						}, 1000);
					});
				 
				} else {
				 console.log('Has cambiado de opinión');
				}
			});

		};


		$scope.eliminarDefinicion = function(idDefinicion) {

			var confirmPopup = $ionicPopup.confirm({
			title: 'Eliminar Definición',
			template: '¿Estás seguro que deseas eliminar esta definición?'
			});
			confirmPopup.then(function(res) {
				if(res) {

					$ionicLoading.show({
						content: 'Loading',
						animation: 'fade-in',
						showBackdrop: true,
						maxWidth: 200,
						showDelay: 0
					});

					$http.delete(rutaProyecto+"/definicion/"+idDefinicion)
					.success(function(data,status,headers,config){

						$timeout(function () {
							$ionicLoading.hide();
							var alertPopupPromise = $ionicPopup.alert({
								title: '¡Definición Eliminada!',
								template: 'La definición se ha eliminado correctamente.',
								okText: 'Aceptar',
								okType: 'button-positive'
							});

							$scope.getDefinicionesDenunciadas();
							$ionicHistory.clearCache();
							console.log(data);

						}, 1000);
						
					})
					.error(function(err,status,headers,config){
						$timeout(function () {
							$ionicLoading.hide();
							console.log(err);
						}, 1000);
					});
				 
				} else {
				 console.log('Has cambiado de opinión');
				}
			});

		};

  	})	

  	.controller('listarAlumnosCtrl', function($scope, $http, $ionicLoading, $timeout, grupoElegido, rutaProyecto) {

  		/*-- Código para  cargar alumnos de un grupo --*/

  		$scope.idGrupo = grupoElegido.datosGlobales.idGrupo;
  		$scope.ensenyanza = grupoElegido.datosGlobales.ensenyanza;
  		$scope.curso = grupoElegido.datosGlobales.curso;
  		
	    $scope.Alumnos =[];

		$scope.getAlumnos = function(idGrupo) {

			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});

			$scope.alumnosEncontrados = [];

			$http.get(rutaProyecto+"/grupo/"+$scope.idGrupo+"/listarAlumnos")
			.success(function(data){

				$timeout(function () {
					$ionicLoading.hide();
					$scope.Alumnos = data;

					if(data){
						if($scope.Alumnos!=0){
							$scope.comprobar=true;
						}else{
							$scope.comprobar=false;
						}
					}
					console.log(data);

				}, 1000);

			})
			.error(function(err){
				$timeout(function () {
					$ionicLoading.hide();
					console.log(err);
				}, 1000);
			});
		} 

		$scope.getAlumnos();


	})


