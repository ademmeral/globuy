import { createContext, createElement, useContext, useState } from "react"
import { flatten } from "@utils/sync";

const MenuContext = createContext(null);

function Menu({children, as = 'div', ...props}) {
  const state = useState(false);

  if ('className' in props && typeof props.className === 'function')
    props.className = props.className(state);

  return createElement(
    as, 
    props, 
    <MenuContext.Provider value={state}>
      {
        flatten(children)
          .map(c => typeof c === 'function' ? c(state) : c)
      }
    </MenuContext.Provider>
  );
}

function Button({children, ...props}){
  const state = useContext(MenuContext);

  return createElement(
    'button', 
    { ...props, onFocus: () => state.setIsOpen(p => !p) }, 
    ...flatten(children).map(c => typeof c === 'function' ? c(state) : c)
  );
}
function List({children, as = 'menu', ...props}){
  const state = useContext(MenuContext);
  const style = { display: state.isOpen ? '' : 'none' };
  const setStyle = 'style' in props ? { ...props.style, ...style } : style;

  return createElement(
    as, 
    { ...props, style: setStyle }, 
    ...flatten(children).map(c => typeof c === 'function' ? c(state) : c)
  );
}

Menu.Button = Button
Menu.List = List;

export default Menu