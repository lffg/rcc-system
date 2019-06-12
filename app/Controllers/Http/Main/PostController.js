const Post = use('App/Models/Post');

class PostController {
  /**
   * Mostra todas as notícias (posts):
   *
   * @method GET
   */
  async index({ view }) {
    const posts = await Post.query()
      .where({ is_hidden: false })
      .with('user')
      .fetch();

    return view.render('pages.posts.index', { posts: posts.toJSON() });
  }

  /**
   * Mostra a página para criar uma nova notícia.
   *
   * @method GET
   */
  async create() {
    return 1;
  }

  /**
   * Mostra a página para salvar uma notícia.
   *
   * @method POST
   */
  async store() {}

  /**
   * Mostra uma notícia.
   *
   * @method GET
   */
  async show({ params: { slug }, view }) {
    const post = await Post.query()
      .where({ slug })
      .with('user', (builder) => {
        builder.with('position').withCount('posts');
      })
      .firstOrFail();

    return view.render('pages.posts.show', { post: post.toJSON() });
  }

  /**
   * Mostra a página com o formulário para editar uma notícia.
   *
   * @method GET
   */
  async edit() {
    return 1;
  }

  /**
   * Atualiza a notícia.
   *
   * @method POST
   */
  async update() {}

  /**
   * Remove uma notícia.
   *
   * @method GET
   */
  async destroy() {}
}

module.exports = PostController;
