import './style.css'

export const PostCard = (post) => { 
    return (
            <div className='post'>
            <img src={post.cover} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            </div>
    )
}