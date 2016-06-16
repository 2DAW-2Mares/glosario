angular.module('starter.services', [])

.factory('rutaProyecto', function() {
  	return 'http://glosario-sails.herokuapp.com';
})
.factory('listadoDeMaterias', function() {
    return {datosGlobales: {} };  
})
.factory('terminoElegido', function() {
    return {datosGlobales: {} }; 
})
.factory('grupoElegido', function() {
  	return {datosGlobales: {} };
})



