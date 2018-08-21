import React, { Component } from 'react';
import _ from 'lodash';

class tableBody extends Component {
  /*Component interface
    Columns: Array
    Items: Array
  */
  renderCell = (item, col) => {
    if (col.content){
      return col.content(item);
    } else {
      return _.get(item, col.path);
    }
  }

  genereateKey = (item, col) => item._id + (col.path||col.key);

  render() { 
    const {items, columns} = this.props;
    
    return (
      <tbody>
        {items.map(item => 
          <tr key={item._id}>
            {columns.map(col => <td key={this.genereateKey(item, col)}>{this.renderCell(item, col)}</td>)}
          </tr>
        )}
      </tbody>
    );
  }
}
 
export default tableBody;