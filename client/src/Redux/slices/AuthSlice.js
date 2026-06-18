import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

// handle the user store data which is stored in the locastorage |  
// localStorage data can theoretically get corrupted (manually edited in devtools, a bug in an older version of your app leaving stale/malformed data, etc.):
// This guarantees that even if localStorage somehow has garbage in it, your app boots into a safe, logged-out-looking state instead of crashing on the very first render
function getStoredData() {
    try {
        const storeData = localStorage.getItem('data');
        return storeData ? JSON.parse(storeData) : {};
    } catch (error) {
        console.error("unbale to parse the local storage stored data", error);
        return {};
    }
}
const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

const initialState ={
    isLoggedIn: storedIsLoggedIn === 'true',
    role: localStorage.getItem('role') || "",
    data: getStoredData()
};

// create AsyncThunk for signup 
export const createAccount = createAsyncThunk("/auth/signup", async(data) => {
    try {
        const res =  axiosInstance.post('user/register', data);
        toast.promise(res, {
            loading: "Wait! your account is creating",
            success: (data) => {
                return data?.data?.message
            },
            error: "failed to create account"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


// create AsyncThunk for signin  
export const login = createAsyncThunk("/auth/login", async (data, thunkAPI) => { // // The first is your payload (data), the second is an object containing dispatch, getState, rejectWithValue, signal, etc.
    try {
        // Initiating the API Request | Important: Axios methods return a Promise. Notice there's no await here — res is not the response yet, it's the pending Promise itself This is intentional, and it's why the next part works the way it does.
        const res = axiosInstance.post('user/login', data); 
        console.log("res", res)
        toast.promise(res, { // takes a Promise and automatically shows different toast messages depending on what happens to it:
            loading: "Wait! authentication is progress",
            success: (data) => {
                return data?.data?.message
            },
            error: "failed to login"
        })
        // Now you also wait for that same Promise to resolve (you can await the same Promise multiple times/places — it doesn't re-trigger the request, it just waits for the one request already in flight).
        // .data pulls out just the body your Express backend actually sent (the part you care about) and discards Axios's wrapper info (status, headers, etc.). | This is what gets returned from the thunk → which becomes action.payload → which is why your component could check response.payload.success.
        return (await res).data; 

    } catch (error) {
        toast.error(error?.response?.data?.message || "something went wrong");
        //This tells Redux the action failed and passes the error payload down
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
})


// This is the Redux slice — the piece that defines what actually happens to your global state when the login thunk succeeds.
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("data");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("role");
            state.isLoggedIn = false;
            state.data = {};
            state.role = "";
        }
    }, // where you'd define synchronous state changes, triggered by actions you create yourself (e.g., a manual logout action). It's empty here ({}), meaning this slice currently has no manual reducers — all its logic comes from reacting to other actions (like your thunk).
    extraReducers: (builder) => {  //  where you handle actions that came from outside this slice, most commonly thunks created with createAsyncThunk. This is exactly where login.fulfilled is handled.
       builder.addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role)
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role
       })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;


