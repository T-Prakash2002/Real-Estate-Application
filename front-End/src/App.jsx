import "./App.css";
import Navbar from "./components/Navbar";
import { UserContext, UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        
      </UserContextProvider>
    </>
  );
}

export default App;
