import { useState } from "react";
import ProductsLayout from "@components/Products/Layout"
import Featured from "@components/Featured"
import StoryList from "@components/Stories/StoryList";
import { FaTimes } from 'react-icons/fa'
import { useUser } from '@hooks/user'
import '@styles/Home.css'

function OppInfo(){
  const { data: user } = useUser('/auth');
  const [show, setShow] = useState(true);

  if (!show || !user) return;
  return (
    <div className="opp-info flex justify-btw align-center">
    <h4 className="opp-title text-center">
      {`Add the story of the the product you have gotten before\, 
      get likes, views then get discount according to the interaction!`}
    </h4>
    <button className="btn" onClick={() => setShow(false)}>
      <FaTimes />
    </button>
  </div>
  )
}

function Home() {
  
  return (
    <section className="home-section section">
      <OppInfo />
      <div className="home-container container flex-col">
        <StoryList />
        <Featured>
          <h2>Picked for You</h2>
        </Featured>
        <ProductsLayout />
      </div>
    </section> 
  )
}

export default Home