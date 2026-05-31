const Course = require('../models/courseModel');
const AppError = require('../utils/errorUtils');
const uploadOnCloudinary = require('../utils/cloudinary');

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).select('-lectures');
        // console.log('courses ->', courses);

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
        const { title, description, category, lectures } = req.body;

        if (!title || !description || !category) {
            return next(new AppError('title, description, category and createBy are required', 400));
        }

        const createdBy = req.user._id; // ← From JWT token via isLoging middleware
        // console.log('✅ Step 3: createdBy from auth:', createdBy);
        // create instance of course 
        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
            lectures: lectures || [],
            thumbnail: {
                public_id: " ",
                secure_url: " "
            }
        })
        if (!course) {
            return next(new AppError('Course could not created, please try againg', 500));
        }
        // console.log("course data", course);

        if (req.file) {
            // console.log("req.file", req.file);
            const result = await uploadOnCloudinary(req.file.path);
            // console.log("result", result);

            if (!result) {
                return next(new AppError('file is not uploaded, kindly try again', 500));
            }
            course.thumbnail.public_id = result.public_id
            course.thumbnail.secure_url = result.secure_url
        }

        // save course inside db
        await course.save();

        return res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course
        });
    } catch (error) {
        return next(new AppError(error.message || 'Course creation failed', 500));
    }
}


// update course 
const updateCourse = async (req, res, next) => {
    try {
        // destructures id from url 
        const { id } = req.params;
        // console.log("id -> ", id )
        // find the course by the id in db
        const course = await Course.findByIdAndUpdate(
            id,
            { $set: req.body },
            { runValidators: true } // new data will be update which is come fom req.body
        );
        // console.log("course is -> ", course)
        if (!course) {
            return next(new AppError('course is not found in the database', 500));
        }

        return res.status(200).json({
            success: true,
            message: "Course is updated successfully",
            course

        })
    } catch (error) {
        return next(new AppError('course is not exist', 400));
    }

}

// remove course 
const removeCourse = async (req, res, next) => {
    try {
        // destructured the id from the url 
        const { id } = req.params;
        // find the course in db by id
        const course = await Course.findById(id)

        if (!course) {
            return next(new AppError('course is not found in the database', 500));
        }
        // remove the course from the db
        await Course.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "course is deleted successfully"
        })
    } catch (error) {
        return next(new AppError('course is not found in the database', 500));

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

const addLactureTocourseById = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { id } = req.params;

        // find the course by id 
        const course = await Course.findById(id)
        // console.log('couse->', course);
        // if course is not found 
        if (!course) {
            return next(new AppError(error.message, 500));
        }
        // create instance 
        const lectureData = {
            title,
            description,
            lectureThumbnail: {}
        }
        // console.log('inside lectureDat->', lectureData);
        if (req.file) {
            // console.log("req.file", req.file);
            const result = await uploadOnCloudinary(req.file.path);
            // console.log("result", result);

            if (!result) {
                return next(new AppError('file is not uploaded, kindly try again', 500));
            }
            lectureData.lectureThumbnail.public_id = result.public_id
            lectureData.lectureThumbnail.secure_url = result.secure_url

            await course.lectures.push(lectureData);
            course.numberOfLactures = course.lectures.length;

            // save the course in the db
            await course.save();

            return res.json({
                success: true,
                message: "Lecture is added successfully to the course",
                course
            })
        }

    } catch (error) {
        return next(new AppError('Lecture is not found, please try again', 500));
    }
}

module.exports = { getAllCourses, createCourse, getLecturesByCourseId, updateCourse, removeCourse, addLactureTocourseById };