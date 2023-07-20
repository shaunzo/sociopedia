import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  console.log(posts);

  const getPosts = async () => {
    const response = await fetch(`${BASE_URL}/post`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
};

const getUserPosts = async () => {
    try {
      const response = await fetch(
          `${BASE_URL}/post/${userId}`,
          {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
          }
          );
          const data = await response.json();
          dispatch(setPosts({ posts: data }));
    } catch(err) {
      console.error('Error fetching user posts...', err)
    }
    };
    
    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          createdAt
        }) => (

          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            createdAt={createdAt}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;