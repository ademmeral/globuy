import TotalIndicator from "@components/TotalIndicator";
import LinkItem from "@components/LinkItem";
import { AiOutlineHeart } from 'react-icons/ai';
import { useFavs } from "@hooks/favorites";

function FavoritesLink() {
  const { data: favs, user } = useFavs();

  if (!user) return;
  return (
    <LinkItem path={'favorites'}>
      <TotalIndicator className="indicator" total={favs?.length || 0} />
      <AiOutlineHeart />
    </LinkItem>
  )
}

export default FavoritesLink