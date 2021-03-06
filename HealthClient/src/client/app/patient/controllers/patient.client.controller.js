(function () {
    'use strict';

    angular
        .module('app.patient')
        .controller('PatientController', PatientController);

    PatientController.$inject = ['logger',
        '$stateParams',
        '$location',
        'Patient',
        'TableSettings',
		'PatientForm',
        'Doctor',
		'Vital'];
    /* @ngInject */
    function PatientController(logger,
        $stateParams,
        $location,
        Patient,
        TableSettings,
		PatientForm,
        Doctor,
		Vital) {

        var vm = this;

        vm.tableParams = TableSettings.getParams(Patient);
        vm.patient = {};
		vm.selectedDoctor = null;
		vm.selectedVital = null;
		vm.doctors = [];
		vm.vitals = [];
	
		Doctor.get('', function(response) {
			vm.doctors = response.results;
		});

		Vital.get('', function(response) {
			vm.vitals = response.results;
		});
		
		vm.setDoctor = function() {
			vm.patient.supervisor = vm.selectedDoctor;
        };
		
		vm.setVital = function() {
			console.log(vm.selectedVital)
			vm.patient.vital = vm.selectedVital;
        };
		
        vm.setFormFields = function(disabled) {
            vm.formFields = PatientForm.getFormFields(disabled);
        };
		
        vm.create = function() {
            // Create new Patient object
            var patient = new Patient(vm.patient);

            // Redirect after save
            patient.$save(function(response) {
                logger.success('Patient created');
                $location.path('patient/' + response.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        // Remove existing Patient
        vm.remove = function(patient) {

            if (patient) {
                patient = Patient.get({patientId:patient.id}, function() {
                    patient.$remove(function() {
                        logger.success('Patient deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.patient.$remove(function() {
                    logger.success('Patient deleted');
                    $location.path('/patient');
                });
            }

        };

        // Update existing Patient
        vm.update = function() {
            var patient = vm.patient;

            patient.$update(function() {
                logger.success('Patient updated');
                $location.path('patient/' + patient.id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
            });
        };

        vm.toViewPatient = function() {
            vm.patient = Patient.get({patientId: $stateParams.patientId});
            vm.setFormFields(true);
        };
	 

        vm.toEditPatient = function() {
            vm.patient = Patient.get({patientId: $stateParams.patientId});
            vm.setFormFields(false);
        };

        activate();

        function activate() {
            //logger.info('Activated Patient View');
        }
    }

})();
