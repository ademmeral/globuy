import React from 'react'
import { lineClamp as compact } from '@utils/sync';

function CommentFooter({ comment }) {
  const [maxText, setMaxText] = React.useState(
    comment 
      ? comment.content.length > 160 
        ? 160 
        : comment?.content?.length 
      : 160
  );
  
  const { title, content } = comment;
  const handleClick = () => {
    if (maxText >= content.length)
      setMaxText(160)
    else setMaxText(p => p + 160);
  }

  return (
    <footer className="flex-col">
      <article className="flex-col">
        <h3>{title}</h3>
        <p>{compact(content, maxText)}</p>
      </article>
      <button  type="button" className="read-more-btn btn-underline" onClick={handleClick}>
        {!content || content.length === maxText ? null : content.length > maxText ? 'Read more' : 'Read less'}
      </button>
    </footer>
  )
}

export default CommentFooter