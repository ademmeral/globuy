import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useUser } from '@hooks/user';
import { useEffect, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import { addToFavs, delFromFavs } from '@handlers/favorites';
import { showToast } from '@utils/sync';
import { promisify } from '@utils/async';
import { toggleFav } from '@handlers/favorites.js';
import { TIMEOUT_XL } from '@constants/constants'

function FavIcon({ product }) {
  const timeout = useRef(0);

  const { data: user } = useUser('/auth');
  const { cache, mutate, isLoading, isValidating, error, ...rest } = useSWRConfig()

  const favos = user && cache ? cache.get('/favs')?.data || [] : [];
  const found = favos.find(f => f?.product?._id === product._id);
  const [togg, setTogg] = useState(!!found);
  const [disabled, setDisabled] = useState(false)

  const handleToggle = async () => {
    showToast.dissmissAll();
    clearTimeout(timeout.current);
    setDisabled(true);
    if (!user) return;
    showToast.loading();

    // updating optimistically

    if (!found) {
      await mutate('/favs', favs => {
        const ret = [{ ...found, product }, ...(favs || []).filter(f => f.product._id !== product._id)];
        setTogg(() => true)
        return ret;
      }, { revalidate: false })
    } else {
      await mutate('/favs', favs => {
        const ret = (favs || []).filter(f => f.product._id !== product._id);
        setTogg(() => false)
        return ret;
      }, { revalidate: false })
    };
    
    // async action
    timeout.current = setTimeout(async () => {
      try {
        await toggleFav({ userId: user._id, product: product._id })
        const setMsg = togg ? 'Removed successfully 🥲' : 'Added successfully 😊';
        showToast.updateSuccess(setMsg)
        setDisabled(false)
      } catch (err) { showToast.updateError(err.message); console.log(err) }

    }, TIMEOUT_XL)

  }

  return (
    <figcaption className="fav-btn pos-abs">
      <button
        type='button'
        onClick={handleToggle}
        disabled={!user || disabled || isLoading || isValidating || error}
      >{!!found ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
    </figcaption>
  )
}

export default FavIcon