import Nav from "@components/Nav/Nav"
import { Outlet } from 'react-router-dom';
import { useUser } from '@hooks/user';
import { useClientLocation } from '@hooks/location';
import { useCurrency } from '@hooks/currencies';


const CurrentUser = () => {
  const user = useUser('/auth');
  return null;
}
const Location = () => {
  const location = useClientLocation();
  return null;
}
const Currencies = () => {
  const currencies = useCurrency();
  return null;
}

function App() {

  return (
    <main className="App flex">
      <Nav />
      <CurrentUser />
      <Location />
      <Currencies />
      <Outlet /> 
    </main>
  )
}

export default App