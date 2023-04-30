import React from 'react';
import './App.css';
import { PostCard } from './components/PostCard';

class App extends React.Component {
  state = {
    posts: []
  }

  // Fazemos o fetch da api com o componentDidMount(m~etodo que é executado após a montagem do componente), de uma forma diferente
  // do que o fazemos no javascript cru,nesse caso chamando a loadPosts
  componentDidMount() {
    this.loadPosts()
  }

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const fotosResponsea = fetch('https://jsonplaceholder.typicode.com/photos') 
    // aqui usamos a desestruturação pedindo os posts que estão dentro da response
    // como se tivesse pedindo especificamente e a tornando uma variavel ao mesmo tempo
    const [posts, photos] = await Promise.all([postsResponse, fotosResponsea])
    // promise.all recebe um iteravel de promessas e retorna uma unica prompromessas

    // conversão para JSON
    const postsJson = await posts.json()
    const photosJson = await photos.json()

    // metodo zip 
      const postsAndPhotos = postsJson.map((post, index) => {
        return { ...post, cover: photosJson[index].url}
      })

    // atualizando o estado do posts
      this.setState({ posts: postsAndPhotos })
      
  }
  render() {
    const { posts } = this.state

    return (
      <section className='container'>
        <div className="posts">
          {posts.map(post => (
            // nesse caso o postcard não tem filhos, porem tem atributos
            // os passamos como tags html que serão recebidos do outro lado 
            // pelo props
            <PostCard 
                key={post.id}
                title={post.title}
                body={post.body}
                id={post.id}
                cover={post.cover}
              // post={post} - podemos tamb~em passar o objeto completo
              />
          ))
          }
        </div>
      </section>

    )
  }
}



export default App;
