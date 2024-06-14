import React, { useState } from 'react'
import StoryPlayer from "@components/Stories/Player";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { MdVolumeOff, MdVolumeUp, MdPlayArrow, MdPause } from "react-icons/md";
import { FaTimes, FaHeart, FaEye, FaRegHeart } from "react-icons/fa";
import { IoMdHeart, IoMdHeartEmpty, IoMdEye } from "react-icons/io";
import { NavLink } from 'react-router-dom'
import '@styles/Stories/Displayer.css';

function StoriesViewer({ sources, setShouldShow, pid }) {

  return (
    <div role='dialog' className="overlay pos-fixed abs-full flex align-center justify-center">
      <button type="button" className='close-btn pos-abs' onClick={() => setShouldShow(false)}>
        <FaTimes />
      </button>
      <StoryPlayer sources={sources} className='player flex-col pos-rel'>
        <StoryPlayer.StickList className='stick-list flex' />
        <div className="controller flex justify-btw align-center">
          <StoryPlayer.Controllers.Prev>
            <FaAngleLeft />
          </StoryPlayer.Controllers.Prev>
          <div className="action-btns flex">
            <StoryPlayer.Controllers.PlayPause >
              {
                ({ isActive }) => isActive ? <MdPause /> : <MdPlayArrow />
              }
            </StoryPlayer.Controllers.PlayPause>
            <StoryPlayer.Controllers.Audio>
              {
                ({ isMuted }) => isMuted ? <MdVolumeOff /> : <MdVolumeUp />
              }
            </StoryPlayer.Controllers.Audio>
          </div>
          <StoryPlayer.Controllers.Next>
            <FaAngleRight />
          </StoryPlayer.Controllers.Next>
        </div>
        <StoryPlayer.View as='div' className='view flex pos-rel'>
          <div className="buttons reset-finish pos-abs abs-full flex">
            <StoryPlayer.Controllers.Reset className='reset unvisible' />
            <StoryPlayer.Controllers.Finish className='finish unvisible' />
          </div>
        </StoryPlayer.View>
        {
          pid ? (
            <StoryPlayer.Indicators className="action-buttons grid align-center">
              <StoryPlayer.Indicators.Likes className='btn'>
                {
                  ({ isLiked }) => isLiked ? (
                    <>
                      <IoMdHeart />
                      <span>{55}</span>
                    </>
                  ) : (
                    <>
                      <IoMdHeartEmpty />
                      <span>{54}</span>
                    </>
                  )
                }
              </StoryPlayer.Indicators.Likes >
              <StoryPlayer.Indicators.Views className='btn'>
                <IoMdEye />
                <span>{860}</span>
              </StoryPlayer.Indicators.Views>
              <NavLink to={`/products/${pid}`} className='link grid align-center'>
                View Product
              </NavLink>
            </StoryPlayer.Indicators>
          ) : null
        }
      </StoryPlayer>
    </div>
  )
}

export default StoriesViewer