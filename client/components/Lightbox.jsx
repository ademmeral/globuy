import { useEffect, useState } from "react";
import Thumb from "./Thumb";
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { MEDIA } from "@utils/media";
import classNames from 'classnames'
import LazyMedia from "./LazyMedia";
import { setPhotos } from "../utils/sync";
import '@styles/Lightbox.css'


function Lightbox({ photos,transform, ...props }) {
  const [curr, setCurr] = useState(0);

  const handleThumbClick = e => {
    const idx = +e.currentTarget.getAttribute('data-index');
    setCurr(idx)
  }

  const handleNextClick = () => setCurr(p => p >= photos.length - 1 ? 0 : p + 1)
  const handlePrevClick = () => setCurr(p => p < 1 ? photos.length - 1 : p - 1)

  const showcasePhotos = setPhotos('product', photos, 'SLIDER')
  const thumbPhotos = setPhotos('product', photos, 'THUMB')
  const placeholders =  setPhotos('product', photos, 'PLACEHOLDER')


  return (
    <div className="lightbox pos-rel flex" {...props}>
      <div className="thumbs flex align-center justify-center pos-abs abs-x-center">
        <button  type="button" onClick={handlePrevClick}>
          <FaArrowLeftLong />
        </button>
        <ul className="flex">
          {
            thumbPhotos.map((p, i) =>
              <Thumb
                photo={p}
                key={i}
                role="button"
                onClick={handleThumbClick} data-index={i}
                className={curr === i ? 'thumb active' : 'thumb'}
              />
            )
          }
        </ul>
        <button  type="button" onClick={handleNextClick}>
          <FaArrowRightLong />
        </button>
      </div>
      {
        showcasePhotos.map((ph, i) => (
          <figure key={i} className={classNames('showcase pos-abs', { 'hide': i !== curr })}>
            <LazyMedia fallback={placeholders[i]} source={ph} alt=""  />
          </figure>
        ))
      }
    </div>
  )
}

export default Lightbox