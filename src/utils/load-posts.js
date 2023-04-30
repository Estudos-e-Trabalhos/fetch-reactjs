export const loadPosts = async () =>{
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

      return postsAndPhotos
}