'use strict';

var mod = angular.module( 'sampleAngularApp.join', ['ngRoute', 'ngMockE2E']);

/*
 * Mocking the backend for /join
 */
mod.run(function( $httpBackend ) {
  $httpBackend.whenGET(/^views\//).passThrough();

  //Mock response for POST to /join endpoint
  $httpBackend.whenPOST('/join').respond(function(method, url, data) {
    var jsonData = angular.fromJson(data);
	var response = { 'id':1, 'email':jsonData.email };
	return [200, response, {}];
  });

});