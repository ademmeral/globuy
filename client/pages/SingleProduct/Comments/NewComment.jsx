import { useComments } from '@hooks/comments';
import { useUser } from '@hooks/user';
import { addComment } from '@handlers/comments';
import { showToast } from '@utils/sync'
import { useSWRConfig } from 'swr';

function NewComment({ children, ...props }) {
  const pid = window.location.pathname.split('/')[2];
  const { mutate: mutAll, isLoading, isValidating, error } = useSWRConfig();

  const { data: user } = useUser('/auth')
  if (!user) return;
  
  const handleSubmit = async e => {
    e.preventDefault();
    const title = e.target.querySelector('input').value;
    const content = e.target.querySelector('textarea').value;
    const newComment = { title, content, productId: pid, user: user._id }
    const filtered = arr => {
      return arr.filter(c => c.user._id !== user._id).filter(i => i)
    };

    showToast.promise(
      addComment(newComment)
        .then(created => {
          mutAll(
            `${pid}/comments`,
            created,
            {
              optimisticData: prev => [created, ...filtered(prev)],
              populateCache: (_, prev) => [created, ...filtered(prev)],
              revalidate: false,
              rollbackOnError : true,
            }
          )
        }), null, 'Created successfully 😊', error?.message
    )
  }

  return (
    <form className="new-comment flex-col" {...props} onSubmit={handleSubmit}>
      <header className="flex-col">
        <input name="title" placeholder="Title..." min={1} max={160} />
        <textarea name="content" placeholder="Comment..." min={1} max={640} />
      </header>
      <footer className="m-center flex align-center">
        {
          children ? children : (
            <button type="submit" className="btn btn-red submit-btn" disabled={isLoading || isValidating || error}>
              Add
            </button>
          )
        }
      </footer>
    </form>
  )
}

export default NewComment