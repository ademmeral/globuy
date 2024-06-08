import React, { useRef, useState } from 'react'
import StoryViewer from './StoriesViewer'

function Story({ story }) {
  if (!story) return;
  const { media, product: { photos, title, _id } } = story,
  [shouldShow, setShow] = useState(false)
  const sources = media.map(m => ({ src: m.secure_url, type: m.resource_type }))

  return (
    <li>
      {
        shouldShow 
          ? <StoryViewer sources={sources} setShouldShow={setShow} pid={_id}/> 
          : null
      }
      <div className="story pos-rel">
      <div className="rainbow pos-abs abs-full"/>
      <figure className="media pos-abs no-flow" role='button' onClick={() => setShow(true)}>
        {
          media[0].resource_type === 'image' 
          ? <img src={media[0].secure_url} alt={title} /> 
          : (
            <video src={media[0].secure_url} crossOrigin='anonymous'>
              <h4>{"(!)"}</h4>
            </video>
          )
        } 
      </figure>
      </div>
    </li>
  )
}

export default Story