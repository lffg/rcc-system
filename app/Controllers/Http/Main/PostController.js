'use strict'

const Post = use('App/Models/Post')

class PostController {
  /**
   * Shows all the posts.
   *
   * @param {object} ctx
   */
  async index ({ view }) {
    const posts = await Post.query()
      .where({ is_hidden: false })
      .with('user')
      .fetch()

    return view.render('pages.posts.index', { posts: posts.toJSON() })
  }

  /**
   * Show the page to create a new post.
   *
   * @param {object} ctx
   */
  async create () {
    return 1
  }

  async store () {
  }

  /**
   * Shows a post.
   *
   * @param {object} ctx
   */
  async show ({ params: { slug }, view }) {
    const post = await Post.query()
      .where({ slug })
      .with('user', (builder) => {
        builder.with('position').withCount('posts')
      })
      .firstOrFail()

    return view.render('pages.posts.show', { post: post.toJSON() })
  }

  async edit () {
    return 1
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = PostController
