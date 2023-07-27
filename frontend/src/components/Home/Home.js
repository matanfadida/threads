import Post from "../Post/Post";

const dummyPosts = [
  {
    _id: "1",
    image: "image",
    name: "matan",
    text: "sasdasdasdasdasd",
    comments: "comments",
    likes: 50,
  },
  {
    _id: "2",
    image: "image2",
    name: "matan2",
    text: "sasdasdasdasdasd2",
    comments: "comments2",
    likes: 52,
  },
];

const Home = (props) => {
  const posts = dummyPosts.map((post) => {
    return (
      <Post
        key={post._id}
        _id={post._id}
        image={post.image}
        name={post.name}
        text={post.text}
        comments={post.comments}
        likes={post.likes}
      />
    );
  });

  return (
    <div>
      <ul>{posts}</ul>
    </div>
  );
};

export default Home;
