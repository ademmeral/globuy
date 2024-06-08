import React, { createContext, createElement, useState } from 'react'
import StoryProvider from '@contexts/StoryProvider';
import StickList, { StickOuter } from './StickList';
import Controllers from './Controllers';
import View from './View';
import Indicators from './Indicators';

function Player({ children, as = 'div', sources, config, ...props }) {
  const [isActive, setIsActive] = useState(true),
  [currentIndex, setCurrentIndex] = useState(0),
  [isMuted, setIsMuted] = useState(false),
  [isBuffering, setIsBuffering] = useState(false);

  const value = {
    isActive, setIsActive,
    currentIndex, setCurrentIndex,
    isMuted, setIsMuted,
    isBuffering, setIsBuffering,
    sources, config,
  };
  
  return createElement(
    as,
    props,
    <StoryProvider value={value}>
      {children}
    </StoryProvider>
  )
}

export default Player;

Player.StickList = StickList;
Player.Stick = StickOuter;
Player.Controllers = Controllers;
Player.Indicators = Indicators;
Player.View = View;