import TotalIndicator from "../TotalIndicator";
import LinkItem from "@components/LinkItem";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from "@hooks/cart";

function CartLink({ isOpen }) {
  const { data } = useCart()
  return (
    <LinkItem path={'cart'} isOpen={isOpen}>
      <TotalIndicator className="indicator" total={data?.length || 0}/>
      <AiOutlineShoppingCart  />
    </LinkItem>
  )
}

export default CartLink