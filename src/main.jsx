import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { AuthLayout, Login, SignUp, Home, AllPosts, AddPost, EditPost, Post } from "./components/index.js";
// import Signup from "./components/Signup.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/login",
//         element: (
//           <AuthLayout authentication={false}>
//             <Login />
//           </AuthLayout>
//         ),
//       },

//       {
//         path: "/signup",
//         element: (
//           <AuthLayout authentication={false}>
//             <SignUp />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/all-posts",
//         element: (
//           <AuthLayout authentication>
//             <AllPosts />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/add-post",
//         element: (
//           <AuthLayout authentication>
//             {" "}
//             <AddPost />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/edit-post/:slug",
//         element: (
//           <AuthLayout authentication>
//             {" "}
//             <EditPost />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/post/:slug",
//         element: <Post />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route
                path="/login"
                element={
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                }
            />
            <Route
                path="/signup"
                element={
                    <AuthLayout authentication={false}>
                        <SignUp />
                    </AuthLayout>
                }
            />
            <Route
                path="/all-posts"
                element={
                    <AuthLayout authentication>
                        <AllPosts />
                    </AuthLayout>
                }
            />
            <Route
                path="/add-post"
                element={
                    <AuthLayout authentication>
                        <AddPost />
                    </AuthLayout>
                }
            />
            <Route
                path="/edit-post/:slug"
                element={
                    <AuthLayout authentication>
                        <EditPost />
                    </AuthLayout>
                }
            />
            <Route path="/post/:slug" element={<Post />} />
        </Route>
    )
);

export default router;

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
