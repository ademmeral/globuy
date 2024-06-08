import { BiErrorCircle } from "react-icons/bi";
import '@styles/Error.css';

function Error({ error }) {
  console.log(error)
  return (
    <div className="error">
      <header className="flex align-center">
        <h3>{`An error has occured 😒 : `}</h3>
        <h4>{error.name}</h4>
        <BiErrorCircle />
      </header>
      <p>{error.message}</p>
    </div>
  )
}

export default Error