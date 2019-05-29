import React from 'react';
import PropTypes from 'prop-types';

function Paginator(props) {
    let { totalCount, itemsPerPage, onPageClick, currPage } = props;
    const pages = Math.ceil(totalCount / itemsPerPage);
    //console.log('*********', totalCount, itemsPerPage, pages);
    const list = [];

    for (var i = 1; i <= pages; i++) {
        list.push(i);
    }

    const handleClick = (event, idx) => {
        onPageClick(event, idx);
    }

    //console.log("......currPage:", currPage);
    return (
        <div className="paginationWrapper">
            <div className="pagination">
                {list.map(item => <a key={item}
                    onClick={(event) => handleClick(event, item)}
                    className={currPage === item ? 'active' : ''}>{item}</a>)}
            </div>
        </div>
    );

}

Paginator.propTypes = {
    totalCount: PropTypes.number,
    itemsPerPage: PropTypes.number,
    onPageClick: PropTypes.func,
    currPage: PropTypes.number
}

export default Paginator;