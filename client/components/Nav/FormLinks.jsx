import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import LinkItem from "../LinkItem";

function FormLinks() {
  return (
    <div className="flex-col">
      <LinkItem path='login' text='Login'>
        <AiOutlineLogin />
      </LinkItem>
      <LinkItem path='register' text='Register'>
        <AiOutlineUserAdd />
      </LinkItem>
    </div>
  )
}

export default FormLinks