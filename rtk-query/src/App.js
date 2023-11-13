import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PostScreen from "./Screen/PostScreen";
import SinglePost from './Screen/SinglePost';
import EditPost from './Screen/EditPost';


const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostScreen/>}/>
          <Route path="/single-post/:itemId" element={<SinglePost/>}/>
          <Route path="/edit-post/:itemId" element={<EditPost/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
