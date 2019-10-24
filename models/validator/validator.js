const Joi = require('@hapi/joi');

const validator = (schema) =>
   (payload) => {
    let error = schema.validate(payload).error;
    if (error) {
      let message = error.details.map(el => el.message).join('\n');
      return {
        error: message
      };
    }
    return true;
  }


module.exports = validator