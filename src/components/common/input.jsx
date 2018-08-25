import React from 'react';

/*Since we have a repeating pattern of :

        value={value}
        onChange={onChange}
        type={type}

  we can use Rest + spread operators,
  it will allow us no to modify our code
  in case we want in the future to add 
  additional props which will follow 
  the same pattern of props={props}
*/
const Input = ({name, label, error, ...rest}) => {
  return ( 
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input 
        {...rest}
        name={name} 
        id={name}       
        className="form-control" 
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
   );
}
 
export default Input;