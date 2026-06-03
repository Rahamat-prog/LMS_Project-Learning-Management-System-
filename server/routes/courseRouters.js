const {Router} = require('express');
const upload = require('../middlewares/multerMiddleware');
const { getAllCourses, createCourse, getLecturesByCourseId, updateCourse, removeCourse, addLactureTocourseById } = require('../controllers/courseControllers');
// console.log('createCourse type:', typeof createCourse);
// console.log('createCourse:', createCourse);
const {isLoging, authorizedRoles, authorizeSubscriber} = require('../middlewares/authMiddleware');

const router = Router();

router.route('/')
    .get(getAllCourses)
    .post(isLoging, authorizedRoles('ADMIN') , upload.single('thumbnail'), createCourse)
   
router.route('/:id')
    .get(isLoging, authorizeSubscriber, getLecturesByCourseId)
    .put(isLoging,authorizedRoles('ADMIN'), updateCourse)
    .delete(isLoging, authorizedRoles('ADMIN'), removeCourse)
    .post(isLoging, authorizedRoles('ADMIN'), upload.single('lectureThumbnail'),addLactureTocourseById)

module.exports = router;