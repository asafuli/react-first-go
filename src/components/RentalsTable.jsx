import React, { Component } from 'react';
import Table from './common/table';

class RentalsTable extends Component {

  columns = [
    {path: 'title', label: 'Name'},
    {label: 'Rental time' ,content:""},
    {label: 'Return date', content:""},
    {path: 'dailyRentalRate', label: 'Rate'},
  ];

  onSort = () => {};
  sortColumn = '';

  render() { 
    const { movies } = this.props;
    return ( 
      <Table 
        items={movies} 
        columns={this.columns} 
        onSort={this.onSort} 
        sortColumn={this.sortColumn} 
      />
    );
  }
}

export default RentalsTable;