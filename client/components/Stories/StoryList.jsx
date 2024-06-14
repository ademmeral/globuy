import { useStories } from "../../hooks/stories";
import Scroll from "../Scroll"
import Error from "@components/Error"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import AddStory from "./Add";
import Story from "./Story";
import StoryListSkeleton from '@components/Skeletons/StoryList'
import '@styles/Stories/Stories.css'
import { useUser } from "../../hooks/user";

function StoryList() {
  const {data: user} = useUser('/auth');
  if (!user) return;
  
  const params = [{ page: 1, limit: 10 }];
  const { data: stories, isLoading, isValidating, error } = useStories(params);
  
  if (isLoading || isValidating) return <StoryListSkeleton />
  else if (error) return <Error error={error} />
  return (
    <Scroll as='div' className='stories-wrapper wrapper pos-rel'>
      <Scroll.ButtonPrev className='arrow arrow-prev btn pos-abs abs-y-center'>
        <FaAngleLeft />
      </Scroll.ButtonPrev>
      <Scroll.ButtonNext className='arrow arrow-next btn pos-abs abs-y-center'>
        <FaAngleRight />
      </Scroll.ButtonNext>
      <Scroll.List className='story-list flex align-center'>
        <AddStory />
        {
          (stories || []).map((s,i) => (
            <Story key={i} story={s} />
          ))
        }
      </Scroll.List>
    </Scroll>
  )
}

export default StoryList