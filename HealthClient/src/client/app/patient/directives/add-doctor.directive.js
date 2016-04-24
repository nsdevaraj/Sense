(function() {
    'use strict';

    angular
        .module('app.patient')
        .directive('AddDoctor', AddDoctor);

    AddDoctor.$inject = ['$modal'];
    /* @ngInject */
    function AddDoctor($modal) {
        var directive = {
            restrict: 'A',
            scope: {
                patient: '='
            },
            link: linkFunc($modal)
        };

        return directive;
    }

    function linkFunc($modal) {
        return function(scope, el, attr, ctrl) {

            el.bind('click', function() {

                var modalInstance = $modal.open({
                    templateUrl: 'app/patient/directives/add-doctor.html',
                    controller: ModalInstanceController
                });

                modalInstance.result.then(function(doctor) {
                    scope.patient.supervisor = doctor;
                });

            });

        };
    }

    var ModalInstanceController = ['$scope',
    '$modalInstance',
    'PatientForm',
    'Vital',
    function($scope, $modalInstance, PatientForm, Vital) {

        $scope.saleLine = {};
        $scope.formFields = PatientForm.getFormFields(false);
        $scope.vitals = [];

        $scope.create = function() {
            $modalInstance.close($scope.saleLine);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss();
        };

        $scope.refreshVitals = function(search) {

            var requestParams = {};
            requestParams.limit = 10;
            requestParams.sort = 'description ASC';
            requestParams.where = {
                'description': {
                    'contains': search
                }
            };

            Vital.get(requestParams, function(response) {
                $scope.vital = response.results;
            });

        };
 

    }];

})();
