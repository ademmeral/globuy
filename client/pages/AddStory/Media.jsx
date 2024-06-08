import { createElement, useEffect, useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { IoMdRefresh } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { BiErrorCircle } from "react-icons/bi";
import classNames from 'classnames'
import { STORY_THUMB } from "@constants/constants";
import StoriesViewer from "@components/Stories/StoriesViewer";
import Label from "./Label";
import { showToast } from "@utils/sync";
import { STORY_SUBMIT_EVENTS as EVENTS} from '@utils/xtarget' // Intercomponent Communication

const msg = `Videos will split into chunks by 10 seconds if any of them is longer then 10 seconds.`

function Media({ pid }) {
  const ref = useRef();
  const [srcs, setSrcs] = useState([]);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   showToast.dissmissAll();
  //   showToast.warn(msg)
  // }, [])

  useEffect(() => {
    EVENTS.emit('SET_SUBMIT', !!!srcs.length);
  },[srcs])

  const handleChange = async e => {
    if (!ref.current) return;

    try {
      const media = ref.current.firstElementChild;
      if (!media) return;
      const files = e.currentTarget.files;
      const sources = [];
      for (const file of files)
        sources.push({
          src: URL.createObjectURL(file),
          type: file.type,
        });
      setSrcs(sources);
      if (sources[0].type.startsWith('image')) return;
      media.preload = 'metadata';
      media.playsInline = true;
      media.currentTime = STORY_THUMB
      await media.pause();

    } catch (err) { console.log(err) }
  };
  return (
    <header className="flex self-center">
      <figure className="add story new btn pos-rel no-flow" ref={ref}>
        {
          srcs.length ? createElement(
            srcs[0].type.startsWith('image') ? 'img' : srcs[0].type.split('/')[0],
            { 
              src: srcs.length ? srcs[0].src : '', 
              className: classNames('pos-abs', { loaded: srcs.length })
            },
            srcs[0].type.startsWith('image') ? null : <BiErrorCircle />
          ) : null
        }
        <div className="overlay pos-abs abs-full flex align-center justify-center">
          <button  type="button" className="btn" onClick={() => setShow(true)}>
            <IoPlay />
          </button>
          <Label handler={handleChange}>
            <IoMdRefresh />
          </Label>
        </div>
        <Label handler={handleChange} className="pos-abs abs-full grid content-center">
          <BiImageAdd className="muted" />
        </Label>
      </figure>
      {
        show ? <StoriesViewer sources={srcs} setShouldShow={setShow} pid={pid} /> : null
      }
    </header>
  )
}

export default Media;