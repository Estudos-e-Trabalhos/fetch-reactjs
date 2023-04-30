import React from 'react';
import './style.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';

class Home extends React.Component {
  state = {
    posts: []
  }

  // Fazemos o fetch da api com o componentDidMount(m~etodo que é executado após a montagem do componente), de uma forma diferente
  // do que o fazemos no javascript cru,nesse caso chamando a loadPosts
  async componentDidMount() {
   await this.loadPosts()
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts()

    // atualizando o estado do posts
      this.setState({ posts: postsAndPhotos })
      
  }
  render() {
    const { posts } = this.state

    return (
      <section className="container">
        <Posts posts={posts} />
      </section>

    )
  }
}



export default Home;
