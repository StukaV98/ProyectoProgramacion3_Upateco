import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Router from './components/routes/Router.jsx';



ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={Router} />
);

