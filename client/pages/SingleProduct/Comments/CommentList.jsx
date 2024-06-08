import React from 'react'
import NewComment from "./NewComment";
import Comment from "./Comment/Comment";
import { useComments } from '@hooks/comments';
import { useUser } from '@hooks/user';
import { useLocation } from "react-router"

function CommentList({ children }) {
  const pid = window.location.pathname.split('/')[2];
  const { data: currUser } = useUser('/auth')
  const { data: comments } = useComments(pid);

  const found = currUser && (comments || []).find(c => c.user._id === currUser._id);
  const filtered = found && comments ? comments.filter(c => c.user._id !== currUser._id) : comments;

  return (
    <>
      {
        !found
          ? <NewComment />
          : (
            <h3 className="text-center">
              You already have a comment right below, which you can edit or delete anytime 😉
            </h3>
          )
      }
      <ul className="comment-list flex-col">

        {found ? <Comment comment={found} key={found._id}/> : null}
        {
          filtered?.map(c => (
            <Comment comment={c} key={c._id} />
          ))
        }
      </ul>
    </>
  )
}

export default CommentList