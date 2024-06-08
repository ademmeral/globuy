import { createContext, createElement, useContext } from "react"

const TableContext = createContext(null);

function Table({ children, as = 'table', data = [], ...props }) {

  return createElement(
    as,
    props,
    <TableContext.Provider value={{ data : data}}>
      {children}
    </TableContext.Provider>
  )  
}

function Caption({children, as = 'caption', ...props}){
  return createElement(
    as,
    props,
    children
  )
}

function Head({ children, as = 'thead', ...props }) {
  return createElement(
    as,
    props,
    children
  )
}

function Body({children, as = 'tbody', ...props}){
  return createElement(
    as,
    props,
    children
  )
}

function Foot({children, as = 'tfoot', ...props}){
  return createElement(
    as,
    props,
    children
  )
}

function Row({children, as = 'tr', ...props}){
  return createElement(
    as,
    props,
    children
  )
}
function Title({children, as = 'th', ...props}){
  return createElement(
    as,
    props,
    children
  )
}
function Text({children, as = 'td', ...props}){
  return createElement(
    as,
    props,
    children
  )
}

Table.Caption = Caption;
Table.Head = Head;
Table.Body = Body;
Table.Foot = Foot;
Table.Row = Row;
Table.Title = Title; // column
Table.Text = Text; // column



export default Table