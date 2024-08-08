import Componente from "./Componente";
import Artista from "./Artista";
import Footer from "./Footer";
import Login from "./Login";

function App() {

  return (
    <div>
      <Componente></Componente>
      <Login/>
      <h1>Welcome to app music</h1>
      <Artista></Artista>
      <footer><Footer></Footer></footer>
    </div>
  )

}

export default App;