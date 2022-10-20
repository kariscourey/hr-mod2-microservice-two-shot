import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';

// async function loadData(article, port) {
//   const response = await fetch(`http://localhost:${port}/api/${article}/`);
//   // console.log(response);

//   if (response.ok) {
//     const data = await response.json();
//     // console.log(data[article]);
//     return data[article];
//   } else {
//     console.error(response);
//   }

// }

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
            {/* <Route path="new" element={<ShoeNewForm />}></Route> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
