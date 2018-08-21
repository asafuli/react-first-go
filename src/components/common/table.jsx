import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

const Table = ({columns, onSort, sortColumn, items}) => {
  
  return (
    <table className="table">
        <TableHeader 
          columns={columns} 
          onSort={onSort} 
          sortColumn={sortColumn}
        />
        <TableBody 
          columns={columns} 
          items={items}
        />
      </table>
  );
}
export default Table;