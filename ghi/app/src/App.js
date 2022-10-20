import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './HatsList';
import HatsForm from './HatsForm';
import Hats from './Hats';


function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="Hats">
            <Route path="" element={<HatsList />}></Route>
              <Route path=":HatsId" element={<Hats />}></Route>
            <Route path="new" element={<HatsForm />}></Route>
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
