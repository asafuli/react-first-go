import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ totalCount, pageSize, onPageChange, currentPage }) => {

  const paginationSize = Math.ceil(totalCount / pageSize);
  //init array with range using lodash
  const pages = _.range(1, paginationSize + 1);
  /* The naive way
  for (let i=0; i<=paginationSize;i++){
    pages.push(i + 1);
  }
  */
  if (paginationSize === 1){
    return null;
  } else {
    return ( 
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(e => {
          return <li 
                    key={e} 
                    className={e === currentPage ? "page-item active" : "page-item"}  
                    onClick={() => onPageChange(e)}
                  >
                    <a 
                      className="page-link" 
                      href="#!">{e}
                    </a>
                  </li>
          }) 
        }
      </ul>
    </nav>);
  }
}

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
}
 
export default Pagination;