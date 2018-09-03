import React from 'react';


const SelectList = ({name, label, options, initialValue, ...rest}) => {
  return ( 
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} id={name} className="form-control">
        {options.map(option => <option key={option._id} value={initialValue || option._id}>{option.name}</option> )}
      </select>
    </div>
    );
}
 
export default SelectList;