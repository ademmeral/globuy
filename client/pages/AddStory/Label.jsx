import { useState } from "react";

function Label({ children, handler, files, ...props }) {
  return (
    <label htmlFor="story-file" {...props}>
      {children}
      <input
        type="file" accept="video/*,image/*"
        multiple name="media" id="story-file"
        hidden onChange={handler}
      />
    </label>
  )
}

export default Label;