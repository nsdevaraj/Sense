/**
 * Patient.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
	name: {
      type: "string",
      required: true
    },
    address: {
      type: "string"
    },
    mobile: {
      type: "string"
    },
    supervisor: {
	   model: 'doctor'
    },  
    vital: {
	  model: 'vital'
    } 
  }
};

