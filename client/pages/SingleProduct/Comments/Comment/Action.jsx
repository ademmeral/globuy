import React from 'react'
import { showToast } from '@utils/sync';
import { useSWRConfig } from 'swr';
import { deleteComment } from '@handlers/comments';

function Action({ cid, setIsEditing }) {
  const { mutate, isLoading, isValidating, error } = useSWRConfig()

  const handleDeletion = async () => {
    const filtered = arr => arr.filter(c => c._id !== cid);
    showToast.promise(
      deleteComment(cid)
        .then( () =>
          mutate(
            `/comments`,
            data => data.filter(c => c._id !== cid),
            {
              optimisticData: prev => filtered(prev),
              populateCache: (_, prev) => filtered(prev),
              revalidate: false,
              rollbackOnError : true,
            }
          )
        ), null, 'Deleted successfully 🥲', error?.message
    )
  }

  return (
    <ul className="comment-action flex">
      <li>
        <button  type="button" className="btn-underline" onClick={() => setIsEditing(true)} disabled={isLoading || isValidating || error}>
          Edit
        </button>
      </li>
      <li>
        <button  type="button" className="btn-underline" onClick={handleDeletion} disabled={isLoading || isValidating || error}>
          Delete
        </button>
      </li>
    </ul>
  )
}

export default Action