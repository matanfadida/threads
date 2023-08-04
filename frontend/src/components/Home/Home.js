import Footer from "../Footer/footer";
import Post from "../Post/Post";

import classes from './Home.module.css';

const dummyPosts = [
  {
    _id: "1",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    name: "matan",
    text: "sasdasdasdasdasd",
    comments: "comments",
    likes: 50,
  },
  {
    _id: "2",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
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
    <>
    <div>
      <ul className={classes['home-ul']}>{posts}</ul>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
