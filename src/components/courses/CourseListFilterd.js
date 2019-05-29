import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Paginator from "./Paginator";

const CourseListFilterd = ({ courses, onDeleteClick, onSearchChange }) => {
  const ITEMS_PER_PAGE = 5;
  const [begIdx, setBegIdx] = useState(0);
  const [currpage, setCurrpage] = useState(1);

  const handlePageClick = (event, idx)=> {
    //console.log('clicked page....', event.target, idx);
    setCurrpage(idx);
    setBegIdx((idx - 1) * ITEMS_PER_PAGE);
  }

  const handleDeleteClick = (course) => {
    console.log('---- course to delete:',course);
    console.log('---- begin index:',courses[courses.length - 1]);
    // If the deleted page is the only item in curr page
    //    then change the page to prev page.
    if(course.id === courses[begIdx].id && course.id === courses[courses.length - 1].id) {
      const newPage = currpage - 1;
      setCurrpage(newPage);
      setBegIdx((newPage - 1) * ITEMS_PER_PAGE);
    }
    onDeleteClick(course);
  }

  return (
    <>
      <div className="filter-list">
        <form>
          <fieldset className="form-group">
            <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={onSearchChange} />
          </fieldset>
        </form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {courses.filter(
            (course, idx) => {
              //console.log('>>>>', course.title, idx, begIdx);
              if(idx >= begIdx && idx < begIdx + ITEMS_PER_PAGE){
                return true;
              }
              return false;
            }
          )
          .map(course => {
            return (
              <tr key={course.id}>
                <td>
                  <a
                    className="btn btn-light"
                    href={"http://pluralsight.com/courses/" + course.slug}
                  >
                    Watch
              </a>
                </td>
                <td>
                  <Link to={"/course/" + course.slug}>{course.title}</Link>
                </td>
                <td>{course.authorName}</td>
                <td>{course.category}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteClick(course)}>
                    Delete
                </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Paginator totalCount={courses.length} itemsPerPage={ITEMS_PER_PAGE} 
                 onPageClick={(event, idx) => handlePageClick(event, idx)} currPage={currpage}/>
    </>
  );
}

CourseListFilterd.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired
};

export default CourseListFilterd;
