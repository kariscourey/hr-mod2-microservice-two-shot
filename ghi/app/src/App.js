import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import ShoeForm from './ShoeForm';

function App() {

  // let shoes=loadData("shoes", 8080);
  // console.log(shoes);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="shoes">
            {/* <Route path="" element={<ShoesList shoes={loadData("shoes", 8080)} />}></Route> */}
            <Route path="" element={<ShoesList />}></Route>
            <Route path="new" element={<ShoeForm />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
