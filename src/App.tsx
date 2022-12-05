import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ListAlbum from './components/album/ListAlbum';
import CreateEditAlbum from './components/album/CreateEditAlbum';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListAlbum />,
  },
  {
    path: "/create/:albumId",
    element: <CreateEditAlbum />,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
