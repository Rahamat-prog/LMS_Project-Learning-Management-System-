import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: []
}

// get all courses 
export const getAllCourses = createAsyncThunk("/courses/get", async () => {
    try {
        const request = axiosInstance.get("/courses")
        toast.promise(request, {
            loading: "Loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses"
        })

        const response = await request;
        return response.data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch courses")
        throw error
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
                // console.log("course", action.payload)
                state.courseData = [...action.payload]
            }
        })
    }
})



export default courseSlice.reducer;