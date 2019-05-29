import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseListFilterd from './CourseListFilterd';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Sprinner';
import { toast } from 'react-toastify';

class CoursesPage extends React.Component {

    state = {
        redirectToAddPage: false,
        filterString: ''
    }

    componentDidMount() {
        let { courses, authors, actions } = this.props;
        if (courses.length === 0) {
            actions.loadCourses().catch(err => {
                alert("load courses failed " + err);
            });
        }

        if (authors.length === 0) {
            actions.loadAuthors().catch(err => {
                alert("load authors failed " + err);
            });
        }
        console.log('.....DidMount......CoursesPage');
    }

    // handleDeleteCourse = course => {
    //     toast.success('Course deleted.');
    //     this.props.actions.deleteCourse(course).catch(error => {
    //         toast.error("Delete failed. " + error.message , { autoClose : false});
    //     });
    // }

    handleSearchChange = (event) => {
        console.log("chnaged.....", event.target.value);
        this.setState({ filterString: event.target.value });
    }

    handleDeleteCourse = async course => {
        toast.success('Course deleted.');
        try {
            await this.props.actions.deleteCourse(course);
        }
        catch (error) {
            toast.error("Delete failed. " + error.message, { autoClose: false });
        }
    }

    render() {
        const filteredCourse = this.props.courses.filter(course => {
            return course.title.toLowerCase().indexOf(this.state.filterString.toLowerCase()) >= 0 ||
                course.authorName.toLowerCase().indexOf(this.state.filterString.toLowerCase()) >= 0;
        });

        return (
            <>
                {this.state.redirectToAddPage && <Redirect to="/course" />}
                <h2>{ filteredCourse.length } Courses Found</h2>
                {this.props.loading ? (
                    <Spinner />
                ) : (
                        <>
                            <button
                                style={{ marginBottom: 20 }}
                                className="btn btn-primary add-course"
                                onClick={() => this.setState({ redirectToAddPage: true })}
                            >
                                Add Course
                            </button>

                            {this.props.courses.length !== 0 ?
                                <CourseListFilterd onDeleteClick={this.handleDeleteCourse} courses={filteredCourse}
                                    onSearchChange={(event) => this.handleSearchChange(event)} /> : null
                            }
                        </>
                    )}

            </>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    //console.log('.....mapStateToProps');
    return {
        courses: state.authors.length === 0 ? [] : state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(a => a.id === course.authorId).name
            };
        }),
        authors: state.authors,
        loading: state.apiCallsInProgress > 0,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);