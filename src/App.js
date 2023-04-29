import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    posts: []
  }

  // Fazemos o fetch da api com o componentDidMount, de uma forma diferente
  // do que o fazemos no javascript cru
  componentDidMount() {
    this.loadPosts()
  }

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')

    // aqui usamos a desestruturação pedindo os posts que estão dentro da response
    // como se tivesse pedindo especificamente e a tornando uma variavel ao mesmo tempo
    const [posts] = await Promise.all([postsResponse])
    console.log(posts)

    const postsJson = await posts.json()
    console.log(postsJson)

    this.setState({ posts: postsJson })
  }

  render() {
    const { posts } = this.state

    return (
      <section className='container'>
        <div className="posts">
          {posts.map(post => (
            <div key={post.id} className='post-content'>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          ))
          }
        </div>
      </section>

    )
  }
}



export default App;
