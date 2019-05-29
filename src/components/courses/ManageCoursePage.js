import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Sprinner from '../common/Sprinner';
import { toast } from 'react-toastify';
import NotFound from '../PageNotFound';

export function ManageCoursePage(props) {
    let { courses, authors, loadCourses, loadAuthors, saveCourse, history } = props;
    //console.log('2-------', props);
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    //console.log('3-------', course, setCourse);
    useEffect(() => {
        console.log('>>> Running useEffect');
        //debugger;
        if (courses.length === 0) {
            loadCourses().catch(err => {
                alert("load courses failed " + err);
            });
        } else {
            //console.log('>>>> Courses already loaded');
            setCourse({ ...props.course });
        }

        if (authors.length === 0) {
            loadAuthors().catch(err => {
                alert("load authors failed " + err);
            });
        }
    }, [props.course]);

    const handleChanage = (event) => {
        const { name, value } = event.target;
        setCourse(pervCourse => ({
            ...pervCourse,
            [name]: name == 'authorId' ? parseInt(value, 10) : value
        }));
    }

    const formIsValide = () => {
        const {title, authorId, category} = course;
        const errors = {};

        if(!title) errors.title = 'Title is required';
        if(!authorId) errors.author = 'Author is required';
        if(!category) errors.category = 'Category is required';

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSave = (event) => {
        event.preventDefault();
        if (!formIsValide()) return;
        setSaving(true);
        saveCourse(course).then(() => {
            toast.success('Course Saved.');
            history.push("/courses");
        }).catch( error => {
            setSaving(false);
            setErrors({ onSave: error.message });
        });
    }


    return (
        props.course ? (
            props.loading ? (<Sprinner />) :
            (
                <CourseForm course={course} errors={errors} authors={authors}
                    onChange={handleChanage} onSave={handleSave} 
                    saving={saving} history={history}/>
                    
            )
        ) : <NotFound />
        

    );

}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null

}

const mapStateToProps = (state, ownProps) => {
    console.log('---------', state);
    let slug = ownProps.match.params.slug;
    let course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        course: course,
        courses: state.courses,
        authors: state.authors,
        loading: state.apiCallsInProgress > 0
    };
}

const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors,
    saveCourse: courseActions.saveCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);