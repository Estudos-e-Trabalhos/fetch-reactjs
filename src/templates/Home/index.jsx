import React, { useCallback, useEffect, useState } from 'react';
import './style.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {

  // state = {
  //   posts: [],
  //   allPosts: [],
  //   page: 0,
  //   postsPerPage: 10,
  //   searchValue: ''
  // }

  // aqui retorna posts e uma função que seta posts, em seu useState temos um valor inicial

  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')

  const noMorePosts = page + postsPerPage >= allPosts.length

  const filteredPosts = !!searchValue ? allPosts.filter(post => {
    return post.title.toLowerCase().includes(
      searchValue.toLocaleLowerCase()
    )
  }) : posts

  

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {

    const postsAndPhotos = await loadPosts()

    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)

  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage)
    // quando o valor da dependencia muda o useEffect é chamado denovo
  }, [handleLoadPosts, postsPerPage])

  const loadMorePosts = () => {
    // const {
    //   page,
    //   postsPerPage,
    //   allPosts,
    //   posts
    // } = this.state - como estamos no escopo da função, isso não é mais necessario

    
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    setPosts(posts)
    setPage(nextPage)

  }

  const handleChange = (e) => {
    const { value } = e.target

    setSearchValue(value)

  }
  
    return (
    <section className="container">
      <div className="search-container">
      { /* 
        !! - converte o valor após os sinais em booleanos 
        string vazia - false
        string com conteudo - true
        após isso com os && pedidos para que ele verifique
        se o valor for verdade E faça oq tiver dentro dos parenteses
        */ }
        {!!searchValue && (
          <h1>Search Value: {searchValue}</h1>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>


      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}
      {filteredPosts.length === 0 && (
        <p>Nenhum post encontrado</p>
      )}
      <div className="button-container">
        {/* ! - caso tenha buscas o botão ira sumir */}
        {!searchValue && (
          <Button
            text='Load more Posts'
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}

      </div>

    </section>

  )
}

// class Home extends React.Component {
  /* no estado estamos salvando as coisas na mémoria
  - diferença entre state e props
  na maioria dos casos temos estados e passamos props a ele
  o estado eu posso passar para baixo, ou seja, 
  nesse caso temos uma home e essa home controla o estado global,
  porem eu posso enviar o estado aos demais componentes
  recebendo como props, assim que o estado mudar as propriedades também
  mudam.
  as props e o estado são privadas, porém podemos passar ela a componentes
  state - salva coisas na memoria com possibilidade de passa-las para frente, state cuida da rederização
  props - são recebidas, se o state mudar elas mudam, porém se a prop mudar não irá 
  acontecer nada com o state

  não é possivel suber o state para o componente pai, apenas ir para frente, do componente maior ao menor
  */
  // state = {
  //   posts: [],
  //   allPosts: [],
  //   page: 0,
  //   postsPerPage: 10,
  //   searchValue: ''
  // }

  // Fazemos o fetch da api com o componentDidMount(m~etodo que é executado após a montagem do componente), de uma forma diferente
  // do que o fazemos no javascript cru,nesse caso chamando a loadPosts
  // async componentDidMount() {
  //   await this.loadPosts()
  // }

  // loadPosts = async () => {

  //   const { page, postsPerPage } = this.state

  //   const postsAndPhotos = await loadPosts()

    // atualizando o estado do posts
  //   this.setState({
  //     // fatia o array de acordo com o numero da pagina e o numero de posts por pagina 
  //     posts: postsAndPhotos.slice(page, postsPerPage),
  //     allPosts: postsAndPhotos
  //   })
  // }

  // loadMorePosts = () => {
  //   const {
  //     page,
  //     postsPerPage,
  //     allPosts,
  //     posts
  //   } = this.state

    // se a pagina começa no 0 e o número de posts é 2
    // na proxima pagina teremos o valor dos posts + os posts 
    // por pagina (2 + 2 = 4 posts) concatenado com os posts já existentes
    // const nextPage = page + postsPerPage
    // fatia de inicio os pots da pagina anterio (inicio em 2) e em termimo
    // do número de posts da pagina anteior + o numero de posts por pagina (2, 4 inicialmente)
    // const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    // envia os proximos posts para o aray de posts
  //   posts.push(...nextPosts)

  //   this.setState({ posts, page: nextPage })
  // }

  // handleChange = (e) => {
  //   const { value } = e.target

  //   this.setState({
  //     searchValue: value
  //   })
  // }

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state
//     const noMorePosts = page + postsPerPage >= allPosts.length

//     const filteredPosts = !!searchValue ? allPosts.filter(post => {
//       return post.title.toLowerCase().includes(
//         searchValue.toLocaleLowerCase()
//       )
//     }) : posts

    
//   }
// }



export default Home;
