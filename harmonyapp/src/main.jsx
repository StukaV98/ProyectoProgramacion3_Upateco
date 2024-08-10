import ReactDOM from 'react-dom/client'; 
import Router from './components/routes/Router';
import { RouterProvider } from "react-router-dom";
// import App from './App.jsx'



ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={Router} />
);

