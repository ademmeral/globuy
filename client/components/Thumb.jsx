import { MEDIA } from "@utils/media";

function Thumb({ children, alt = '', photo, account = 'product', ...props }) {

  return (
    <figure {...props}>
      <div>
        {
          !photo
            ? <div className="thumb thumb-fb shadow" />
            : <img src={photo} alt={alt} className="thumb shadow" />
        }
      </div>
      <figcaption className="fade link-text">{children}</figcaption> 
    </figure>
  )
}

export default Thumb