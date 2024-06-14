import { AiFillStar } from "react-icons/ai";
import { useSWRConfig } from 'swr';

const Stars = ({ stars }) => {
  const { mutate } = useSWRConfig();
  const handleClick = async (e) => { 
    const params = { star: +e.currentTarget.name }
    await mutate(
      '/products/query',
      prev => [...prev.filter(obj => Object.keys(obj)[0] !== 'star'), params],
      { revalidate: false }
    )
  };
  return (
    <button  type="button" className="flex stars-btn" name={stars.length} onClick={handleClick}>
      <div className="flex">
        {stars.map(el => el)}
      </div>
      <small>{`(${stars.length > 4 ? 4.5 : stars.length}+)`}</small>
    </button>
  )
}

function ByStars() {
  const starNumbs = [5,4,3,2,1]
  const stars = starNumbs.map(
    n => [...Array(n).keys()].map((arr, i) => <AiFillStar key={i} color="var(--yellow)" />
    )
  );

  return (
    <div className="filter-by-stars flex-col">
      <button  type="button" className="heading">By Ratings</button>
      {
        stars.map((arr,i) => (
          <Stars key={i} stars={arr}/>
        ))
      }
    </div>
  )
}

export default ByStars