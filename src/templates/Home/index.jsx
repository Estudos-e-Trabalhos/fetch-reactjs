import React from 'react';
import './style.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';

class Home extends React.Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10
  }

  // Fazemos o fetch da api com o componentDidMount(m~etodo que é executado após a montagem do componente), de uma forma diferente
  // do que o fazemos no javascript cru,nesse caso chamando a loadPosts
  async componentDidMount() {
    await this.loadPosts()
  }

  loadPosts = async () => {

    const {page, postsPerPage} = this.state

    const postsAndPhotos = await loadPosts()

    // atualizando o estado do posts
      this.setState({ 
        posts: postsAndPhotos.slice(page, postsPerPage),
        allPosts: postsAndPhotos
      })
      
  }

  loadMorePosts = () => {
    const {
      page, 
      postsPerPage,
      allPosts,
      posts 
    } = this.state

    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })
  } 

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length

    return (
      <section className="container">
        <input type="search" />
        <br /> 
        <br />
        <Posts posts={posts} />
        <div className="button-container">
          <Button 
          text='Load more Posts'
          onClick={this.loadMorePosts}
          disabled={noMorePosts}
          />
        </div>
        
      </section>

    )
  }
}



export default Home;
