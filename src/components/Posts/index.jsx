import { PostCard } from "../PostCard";
import "./styles.css"

const Posts = ({ posts }) => (
  <div className="posts">
    {posts.map((post) => (
      <PostCard
        key={post.id}
        id={post.id}
        alt={post.alt}
        cover={post.cover}
        title={post.title}
        body={post.body}
      />
    ))}
  </div>
);

export default Posts;
