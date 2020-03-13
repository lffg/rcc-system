const { TABLE_NAMES } = require('./00_Init');

const Database = use('Database');

class Finish {
  async run() {
    const COLUMN_NAME = 'id';

    for (const table of TABLE_NAMES) {
      await Database.raw(
        `SELECT setval('${table}_${COLUMN_NAME}_seq', (SELECT max("${COLUMN_NAME}") FROM "${table}"));`
      );
    }

    console.log('Sequências ajustadas.');
  }
}

module.exports = Finish;
