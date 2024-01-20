import AddDetails from "./components/AddDetails";
import AddPersonalDetails from "./components/AddPersonalDetails";
import Details from "./components/Details";
import { useSelector } from "react-redux";


function App() {

  const userData = useSelector((state) => state.common.personalData);

  return (
    <main className="container py-5">

      {userData ? <AddDetails /> : <AddPersonalDetails />}
      <Details />
    </main>
  );
}

export default App;
