import CommentFooter from "./Footer";
import { useState } from "react";
import EditComment from "./EditComment";
import CommentHeader from "./Header";

function Comment({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [_comment, setComment] = useState({ ...comment })
  
  if (isEditing) return <EditComment state={[_comment, setComment]} setIsEditing={setIsEditing}/>;
  return (
    <div className="comment flex-col">
      <CommentHeader setIsEditing={setIsEditing} comment={_comment} />
      <CommentFooter comment={_comment} />
    </div>
  )
}

export default Comment