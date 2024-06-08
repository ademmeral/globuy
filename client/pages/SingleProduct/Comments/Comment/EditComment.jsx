import { showToast, id } from '@utils/sync';
import { updateComment } from '@handlers/comments';
import { useSWRConfig } from 'swr';

function EditComment({ state : [comment, setComment], setIsEditing }) {
  const { mutate, isLoading, isValidating, error } = useSWRConfig(comment.user._id);

  const handleSave = async e => {
    e.preventDefault();
    const title = e.target.querySelector('input').value;
    const content = e.target.querySelector('textarea').value;
    const willBeUpdated = { 
      title, content, 
      user : comment.user._id, productId : comment.productId
    };

    try {
      setComment(p => ({ ...p, content, title })) // optimistic data LoL ^__^
      // throw new Error('Example error ^_^')
      await showToast.promise(
        updateComment(comment._id, willBeUpdated) // populateCache ^___^
      );
      setIsEditing(false)
    } catch (err) {
      console.log(err)
    }
    
  }

  return (
    <form className='edit-comment flex-col' onSubmit={handleSave}>
      <header className='flex-col'>
        <input type="text" name='title' defaultValue={comment.title} />
        <textarea name="content" className='hide-scroll' defaultValue={comment.content} />
      </header>
      <footer className='flex justify-end align-center'>
        <button disabled={isLoading || isValidating || error} className='btn-underline'>Save</button>
        <button type='button' disabled={isLoading || isValidating || error} className='btn-underline' onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </footer>
    </form>
  )
}

export default EditComment