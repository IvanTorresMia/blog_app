import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/auth/sign-in/SignIn";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Tasks from "./pages/tasks/Tasks";
import Blogs from "./pages/blogs/Blogs";
import CreateBlog from "./pages/blogs/components/CreateBlog";
import ViewBlog from "./pages/blogs/components/ViewBlog";
import UpdateBlog from "./pages/blogs/components/UpdateBlog";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "tasks",
                element: <Tasks />,
            },
            {
                path: "blog",
                element: <Blogs />,
            },
            {
                path: "create-blog",
                element: <CreateBlog />,
            },
            {
                path: "view-blog",
                element: <ViewBlog />,
            },
            {
                path: "update-blog",
                element: <UpdateBlog />,
            },
        ],
    },
    {
        path: "/sign-in",
        element: <SignIn />,
    },
]);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
