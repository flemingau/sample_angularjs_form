'use strict';

var mod = angular.module( 'sampleAngularApp.main', ['ngRoute']);

mod.controller('MainCtrl', function ( $scope, $http, $cookieStore ) {

	$scope.student = {};
	$scope.invalidEmail = false;
	$scope.submitSuccessful = angular.isDefined( $cookieStore.get('promoUser') );
	$scope.successfulResponse = JSON.stringify( $cookieStore.get('promoUser') );

	/*
	 * Validate form's Email input is not blank and valid
	 */
	$scope.validateEmail = function() {

      var emailPattern =  new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i);
      var validEmail = emailPattern.test( $scope.student.email );

      if( validEmail ) {
      	$scope.invalidEmail = false;
        $scope.submitEmail();
      } else {
        $scope.invalidEmail = true;
        $scope.errorMessage = angular.isUndefined($scope.student.email) ? 'Email cannot be blank' : 'Email is not valid';
      }
	   
	};

	/*
	 * Submit E-mail to defined address (/join) with validated email address and wait for response
	 */
	$scope.submitEmail = function() {
		$http.defaults.useXDomain = true;
		var headers = { 'Content-type':'application/json' };
		var params = JSON.stringify({ email:$scope.student.email });
		var postLocal = $http.post('/join', params, { headers: headers } );

		postLocal.success(function(data, status, headers, config) {
	      // Display success response messages in console
	      console.log('data success', data);
	      console.log('status success', status);
	      console.log('headers success', headers);
	      console.log('config success', config);

	      $cookieStore.put('promoUser', data);
	      $scope.successfulResponse = JSON.stringify( $cookieStore.get('promoUser') );
	      $scope.submitSuccessful = angular.isDefined( $cookieStore.get('promoUser') );
	     
	    }).
	    error(function(data, status, headers, config) {
	      // Display error response messages in console
	      console.log('data error', data);
	      console.log('status error', status);
	      console.log('headers error', headers);
	      console.log('config error', config);
	    });
	};
});
