export const PostCard = (post) => { 
    return (
            <div className='post'>
            <img src={post.cover} alt={post.title} />
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            </div>

    )
}