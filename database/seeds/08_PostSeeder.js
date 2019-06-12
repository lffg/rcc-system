// DEVELOPMENT SEED

const Factory = use('Factory');

class PostSeeder {
  async run() {
    await Factory.model('App/Models/Post').createMany(33);

    console.log('Posts criados.');
  }
}

module.exports = PostSeeder;
