import React, { createElement } from 'react'
import { useStoryContext } from '@contexts/StoryProvider'
import Media from './Media';
import Image from './Image';
import Text from './Text';

function View({ children, as = 'ul', ...props }) {
  const { sources, currentIndex: curr } = useStoryContext();

  return createElement(
    as,
    props,
    sources.map((s, i) => {
      const isMedia = ['audio', 'video'].some(t => s.type.startsWith(t))
      const isText = s.type.startsWith('text');
      const isImage = s.type.startsWith('image');
      
      if (!s?.type) return;
      return isMedia
        ? <Media key={i} source={s} idx={i} />
        : isImage
          ? <Image source={s} key={i} idx={i} />
          : isText
            ? <Text source={s} key={i} idx={i} />
            : null
    })[curr],
    children,
  )
}

export default View;

View.Text = Text;
View.Image = Image;
View.Media = Media;

