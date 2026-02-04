import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';


// Route handler to render the faculty list page
const facultyListPage = (req, res) => {
    const faculty = getSortedFaculty(sortBy);
    const sortBy = req.query.sort || 'department';

    res.render('faculty', {
        title: 'Faculty Catalog',
        faculty: faculty
    });
};


// Route handler that uses route parameters to look up individual faculty
const facultyDetailPage = (req, res, next) => {
    const facultyId = req.params.facultyId;
    const facultyMember = getFacultyById(facultyId);

    // If faculty member doesn't exist, create 404 error
    if (!facultyMember) {
        const err = new Error(`Faculty member (${facultyId}) not found`);
        err.status = 404;
        return next(err);
    };


    res.render('faculty-detail', {
        title: `${facultyMember.name}`,
        faculty: facultyMember,       

    });

};


// Export the route handlers
export { facultyListPage, facultyDetailPage}