import React from 'react';
 
const ListGroup = ({ items, textProperty, valueProperty, onItemSelect, selectedItem }) => {
  return (
    <ul className="list-group">
      {items.map(item => {
        console.log(valueProperty)
        return (
          <li 
            key={item[valueProperty]} 
            className={item === selectedItem ? "list-group-item active" : "list-group-item"}
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>)
        })
      }
    </ul>
  );
  /*Defining default props in order to simplfy the interfacte of the component*/
  ListGroup.defaulProps = {
    textProperty: 'name',
    valueProperty: '_id',
  }
}

export default ListGroup;