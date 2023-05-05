angular.module('myApp', []).controller('myController', function ($scope) {
    angular.element(document).ready(function () {
      angular.element('#show').on('click', function () {
        angular.element('.card-reveal').slideToggle('slow');
      });
  
      angular.element('.card-reveal .close').on('click', function () {
        angular.element('.card-reveal').slideToggle('slow');
      });
    });
  });