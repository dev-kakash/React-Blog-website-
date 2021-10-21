import { useSelector } from "react-redux";
import "./App.css";
import Blogs from "./components/Blogs";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import { selectSignedIn } from "./features/userSlice";

function App() {
  const isSignedIn = useSelector(selectSignedIn);
  return (
    <div className="App">
      <NavBar />
      <HomePage />
      {isSignedIn && <Blogs />}
    </div>
  );
}

export default App;
