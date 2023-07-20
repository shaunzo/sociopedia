import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    Delete
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
  import * as moment from 'moment';
  import Loader from "components/Loader";
  import { setPosts } from "state";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    createdAt
  }) => {
    const [isComments, setIsComments] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const {_id} = useSelector((state) => state.user);
    const createdDate = moment(createdAt).toDate();
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const BASE_URL = process.env.REACT_APP_BASE_URL;


    const confirmDeletePost = () => {
      setIsConfirmDeleteOpen(true)
    }

    const deletePost = async (postId) => {
      try {
        setIsConfirmDeleteOpen(false);
        setIsBusy(true);
        const response = await fetch(`${BASE_URL}/post/${postId}/delete`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
  
        const result = await response.json();

        setIsBusy(false);

        const upatedPosts = posts.filter((i) => i._id !== result.id);

        dispatch(setPosts({ posts: upatedPosts }));

      } catch (err) {
        setIsBusy(false);
        console.error('Error deleting post', err);
      }
    }

    const handleCloseDialog = () => {
      setIsConfirmDeleteOpen(false);
    }
  
    const patchLike = async () => {
      const response = await fetch(`${BASE_URL}/post/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };
  
    return (
      <WidgetWrapper m="2rem 0" position={`relative`}>
        { isBusy ?
          <Box
            position={`absolute`}
            left={`0`}
            right={`0`}
            top={`0`}
            bottom={`0`}
            bgcolor={`rgba(0, 0, 0, 0.6)`}
            display={`flex`}
            zIndex={10}
            justifyContent={`center`}
            alignItems={`center`}>
            <Loader/>
          </Box> : <></>
        }

            <Friend
              friendId={postUserId}
              name={name}
              subtitle={location}
              userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
              {description}
            </Typography>

            <Typography style={{fontStyle: `italic`}} color={palette.grey[600]} sx={{ mt: "1rem" }}>
              Posted on {moment(createdDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}
            </Typography>

            {picturePath && (
              <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src={`${BASE_URL}/assets/${picturePath}`}
              />
            )}
            <FlexBetween mt="0.25rem">
              <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                  <IconButton onClick={patchLike}>
                    {isLiked ? (
                      <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </IconButton>
                  <Typography>{likeCount}</Typography>
                </FlexBetween>
      
                <FlexBetween gap="0.3rem">
                  <IconButton onClick={() => setIsComments(!isComments)}>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography>{comments.length}</Typography>
                </FlexBetween>
              </FlexBetween>

              <Box>
                { postUserId === _id ?
                  <IconButton onClick={confirmDeletePost}>
                    <Delete />
                  </IconButton>
                : <></> }
        
                <IconButton>
                  <ShareOutlined />
                </IconButton>
              </Box>
            </FlexBetween>
            {isComments && (
              <Box mt="0.5rem">
                {comments.map((comment, i) => (
                  <Box key={`${name}-${i}`}>
                    <Divider />
                    <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                      {comment}
                    </Typography>
                  </Box>
                ))}
                <Divider />
              </Box>
            )}

            <Dialog
            open={isConfirmDeleteOpen}
            keepMounted
            onClose={handleCloseDialog}
            aria-describedby="confirm"
            >
              <DialogTitle sx={{display: `flex`, alignItems: `center`}}><Delete /> Delete</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure that you want to delete this post?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
              <Button onClick={() => setIsConfirmDeleteOpen(false)}>No</Button>
              <Button onClick={() => deletePost(postId)}>Yes</Button>
            </DialogActions>
            </Dialog>
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;