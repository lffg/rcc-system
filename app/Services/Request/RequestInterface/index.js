const callAction = require('./_callAction');
const validateStep = require('./_validate');

const { HttpException } = use('@adonisjs/generic-exceptions');

function validate(step, payload) {
  if (![1, 2, 3].includes(parseInt(step, 10))) {
    throw new HttpException(
      `Parte inválida (${step}) para validação de requisição.`
    );
  }

  return validateStep(parseInt(step, 10), payload);
}

const create = (...params) => callAction('CREATE')(...params);
const update = (...params) => callAction('UPDATE')(...params);
const reject = (...params) => callAction('REJECT')(...params);
const approve = (...params) => callAction('APPROVE')(...params);

module.exports = {
  validate,
  create,
  update,
  reject,
  approve
};

//
//
//
//

// const callAction = require('./_callAction');
// const validateStep = require('./_validate');

// const { HttpException } = use('@adonisjs/generic-exceptions');

// exports.validate = function validate(step, payload) {
//   if (![1, 2, 3].includes(parseInt(step, 10))) {
//     throw new HttpException(
//       `Parte inválida (${step}) para validação de requisição.`
//     );
//   }

//   return validateStep(parseInt(step, 10), payload);
// };

// exports.create = (...params) => callAction('CREATE')(...params);
// exports.update = (...params) => callAction('UPDATE')(...params);
// exports.reject = (...params) => callAction('REJECT')(...params);
// exports.approve = (...params) => callAction('APPROVE')(...params);
