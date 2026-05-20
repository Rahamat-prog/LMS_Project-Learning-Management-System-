const Course = require('../models/courseModel');
const AppError = require('../utils/errorUtils');
const uploadOnCloudinary = require('../utils/cloudinary');

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).select('-lectures');
        console.log('courses ->', courses);

        return res.status(200).json({
            success: true,
            message: 'All courses',
            courses
        })
    } catch (error) {
        return next(new AppError('Course is not fetch', 400));
    }
}

const createCourse = async (req, res, next) => {
    try {
        const { title, description, category, createBy, lectures } = req.body;

        if (!title || !description || !category || !createBy) {
            return next(new AppError('title, description, category and createBy are required', 400));
        }

        let thumbnil = req.body.thumbnil;

        
        const courseData = {
            title,
            description,
            category,
            createBy,
            thumbnil: {
                public_id: "sample_id",
                secure_url: "https://example.com/sample.jpg"
            }
        };
        
        console.log("course data", courseData);

        if (req.file) {
            console.log("req.file", req.file);
            const result = await uploadOnCloudinary(req.file.path);
            // console.log("result", result);
            thumbnil = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };
        }

        if (!thumbnil || !thumbnil.public_id || !thumbnil.secure_url) {
            return next(new AppError('Course thumbnail is required. Upload a file or provide thumbnil object with public_id and secure_url.', 400));
        }


        if (lectures) {
            courseData.lectures = typeof lectures === 'string' ? JSON.parse(lectures) : lectures;
            courseData.numberOfLactures = Array.isArray(courseData.lectures) ? courseData.lectures.length : 0;
        }

        const course = await Course.create(courseData);

        return res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(err => err.message).join(', ');
            return next(new AppError(message, 400));
        }

        return next(new AppError(error.message || 'Course creation failed', 500));
    }
}


const getLecturesByCourseId = async (req, res, next) => {
    try {
        const { id } = req.params;
        // console.log('course id', id);

        const course = await Course.findById(id);
        // console.log('courses details', course);
        if (!course) {
            return next(new AppError('Invalid course id', 400));
        }

        res.status(200).json({
            success: true,
            message: 'Course lectures fetched successfully',
            lectures: course.lectures,
        })
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

module.exports = { getAllCourses, createCourse, getLecturesByCourseId };