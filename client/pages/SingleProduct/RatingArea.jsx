import { AiFillStar } from "react-icons/ai";
import { showToast } from '@utils/sync';
import { useSWRConfig } from "swr";
import { rate } from "@handlers/ratings";
import { useUser } from "@hooks/user";
import { useRef, useState } from "react";
import classNames from 'classnames';
import { TIMEOUT_XL } from '@constants/constants'

function RatingStar({ isRated, disabled, idx, handler }) {
  return (
    <button
      disabled={disabled}
      data-star={idx}
      className={classNames('star flex', { 'rated': isRated })}
      onClick={handler}
    > <AiFillStar />
    </button>
  )
}

function RatingArea() {
  const [,,pid] = window.location.pathname.split('/');

  const timeout = useRef(0);
  
  const { data: user } = useUser('/auth');
  const { error, cache, isLoading, mutate: mutSingle } = useSWRConfig();

  if (!user) return;

  const foundRating = (cache ? cache.get(`${pid}/ratings`)?.data : [])
    .find(r => r.userId === user?._id && r.product._id === pid);

  const [givenStar, setGivenStar] = useState(
    foundRating ? foundRating.star : 0
  );

  const handleClick = async e => {

    const str = +e.currentTarget.getAttribute('data-star');
    const newRate = { product: pid, star: str, userId: user._id };
    const filtered = arr => arr.filter(r => r.userId !== user._id);
    
    showToast.dissmissAll();
    clearTimeout(timeout.current);
    showToast.loading();
    timeout.current = setTimeout(async () => {
      try {
        await mutSingle( /* product */
        `${pid}/ratings`,
        rate(newRate),
        {
          optimisticData: prev => [newRate, ...filtered(prev)],
          populateCache: (updated, prev) => [updated, ...filtered(prev)],
          revalidate: false,
          rollbackOnError: true
        }
      );
      showToast.updateSuccess('Thanks for the feedback 😊');
      } catch (err) {
        console.log(err)
        showToast.updateError(err.message);
      }
    }, TIMEOUT_XL)
    setGivenStar(str);
  }

  return (
    <div className="user-rating">
      <div className="flex stars">
        {
          [...Array(5).keys()].map(k => (
            <RatingStar 
              key={k} idx={k + 1} handler={handleClick} 
              disabled={!user || isLoading || error}
              isRated={givenStar >= (k + 1)}
            />
          ))
        }
      </div>
    </div>
  )
}

export default RatingArea