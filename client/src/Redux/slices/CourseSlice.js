import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: []
}

// get all courses  | createAsyncThunk is used for asynchronous operations like API calls.
export const getAllCourses = createAsyncThunk("/courses/get", async () => {
    try {
        const request = axiosInstance.get("/courses")
        toast.promise(request, {
            loading: "Loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses"
        })

        const response = await request;
        console.log('response', response);
        return response.data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch courses")
        throw error
    }
})


// to create courses 
export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const response = axiosInstance.post("/courses", formData);
        toast.promise(response, {
            loading: "Creating new course",
            success: "Course created successfully",
            error: "Failed to create course"
        });

        return (await response).data

    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {  // This is where the thunk result is handled.
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
                // console.log("course", action.payload)
                state.courseData = [...action.payload]
            }
        })
    }
})



export default courseSlice.reducer;