import { calcRating } from "@utils/sync"
import { AiFillStar } from "react-icons/ai";
import { useRatings } from "@hooks/ratings";

function Rating({ product }) {
  const { data: ratings } = useRatings(product);
  const calculated = ratings ? calcRating(ratings) : 0;
  const width = calculated * 100 / 5;

  return (
    <div className="ratings-reviews text-no-wrap flex justify-btw align-center">
      <div className="stars-wrapper flex align-center pos-rel">
        <div className="stars flex pos-rel">
          <div className="stars-outer flex">
            {
              [...Array(5).keys()].map(k => <span key={k} className="flex"><AiFillStar /></span>)
            }
          </div>
          <div className="stars stars-inner flex pos-abs no-flow" style={{ width: `${width}%` }}>
            {
              [...Array(5).keys()].map(k => <span key={k} className="flex"><AiFillStar /></span>)
            }
          </div>
        </div>
        <small>{`(${calculated})`}</small>
      </div>
      <small>{`Reviews : ${ratings?.length || 0}`}</small>
    </div>
  )
}

export default Rating;