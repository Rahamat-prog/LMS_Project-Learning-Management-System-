const {Router} = require('express');
const upload = require('../middlewares/multerMiddleware');
const { getAllCourses, createCourse, getLecturesByCourseId } = require('../controllers/courseControllers');

const router = Router();

router.route('/').get(getAllCourses).post(upload.single('thumbnil'), createCourse);
router.get('/:id', getLecturesByCourseId);

module.exports = router;