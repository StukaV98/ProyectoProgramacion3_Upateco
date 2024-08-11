import ReactDOM from 'react-dom/client'; 
import Router from './components/routes/Router';
import { RouterProvider } from "react-router-dom";
import 'bulma/css/bulma.min.css';


ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={Router} />
);

