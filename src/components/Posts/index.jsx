import { PostCard } from "../PostCard";

export const Posts = ({ posts }) => (
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
)