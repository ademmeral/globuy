import RatingArea from "../RatingArea";
import CommentList from "./CommentList";
import Unauth from "./Unauth";
import { useUser } from "@hooks/user";

function Comments() {
  const { data: currUser } = useUser('/auth')
  
  return (
    <div className="comments flex-col">
      <Unauth user={currUser} />
      <RatingArea user={currUser} />
      <CommentList user={currUser} />
    </div>
  )
}

export default Comments