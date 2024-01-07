import "./styles.css"

export const PostCard = ({ title, body, cover, id, alt }) => (
  <div className="post" key={id}>
    <img src={cover} alt={alt} title={alt} />
    <div className="content">
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  </div>
);
