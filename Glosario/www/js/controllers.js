
 angular.module('starter.controllers', [])
  	.controller('listExampleCtrl', function( $scope, $ionicModal, $http) {

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

	    // Get list
	    $scope.listado =[];

		$http.get("http://localhost:1337/termino")
		.success(function(data){
			$scope.listado = data;
			console.log(data);
		})
		.error(function(err){
			console.log(err);
		});


	})
