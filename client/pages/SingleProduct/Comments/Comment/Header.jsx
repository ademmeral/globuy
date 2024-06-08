import React from 'react'
import Thumb from "@components/Thumb"
import { XDate } from "@utils/xdate";
import { useUser } from '@hooks/user'
import CommentAction from './Action'

function CommentHeader({ setIsEditing, comment }) {
  const { data: currUser } = useUser('/auth')
  const { user: { firstname, lastname }, createdAt, updatedAt } = comment;

  const isUserComment = comment.user._id === currUser._id
  const isEdited = createdAt !== updatedAt;
  const formatted = XDate.fromNow(comment.updatedAt);

  return (
    <header className="flex align-center justify-btw">
      <div className="left flex align-center">
        <Thumb photo={comment.user.photo} account='user' className='flex align-center'>
          <h4>{`${firstname} ${lastname}`}</h4>
        </Thumb>
        <time dateTime={updatedAt} className="flex align-center">
          <small>{formatted}</small>
          <small className="muted">{isEdited ? `(Edited)` : null}</small>
        </time>
      </div>
      {
        isUserComment
          ? <CommentAction setIsEditing={setIsEditing} cid={comment._id} /> 
          : null
      }
    </header>
  )
}

export default CommentHeader