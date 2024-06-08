
function StoryList() {
  return (
    <ul className="flex story-list">
      {
        [...Array(8).keys()].map(k => (
          <li className="skeleton circle story" key={k}></li>
        ))
      }
    </ul>
  )
}

export default StoryList