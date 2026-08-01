import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailPage from "../../features/activities/detail/ActivityDetailPage";
import Counter from "../../features/counter/Counter";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path:'activities', element: <ActivityDashboard/>},
            {path:'createActivity', element: <ActivityForm key='create'/>},
            {path:'activities/:id', element: <ActivityDetailPage/>},
            {path:'manage/:id', element: <ActivityForm/>},
            {path:'counter', element: <Counter/>},
        ]
    }
])