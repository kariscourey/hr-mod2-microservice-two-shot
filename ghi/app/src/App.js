import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './HatsList';
import HatsForm from './HatsForm';
// import Hats from './Hats';
import ShoesList from './ShoesList';
import ShoeForm from './ShoeForm';
import Shoe from './Shoe';


function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="hats">
            <Route path="" element={<HatsList />}></Route>
              {/* <Route path=":HatsId" element={<Hats />}></Route> */}
            <Route path="new" element={<HatsForm />}></Route>
          </Route>
          <Route path="shoes">
            <Route path="" element={<ShoesList />}></Route>
              <Route path=":shoeId" element={<Shoe />}></Route>
            <Route path="new" element={<ShoeForm />}></Route>
            <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
