import AddDetails from "./components/AddDetails";
import AddPersonalDetails from "./components/AddPersonalDetails";
import Details from "./components/Details";
import { useSelector } from "react-redux";


function App() {

  // const [formShow, setFormShow] = useState(false);
  // const [productCall, setProductCall] = useState(false);
  // const dispatch = useDispatch()
  // const productState = useSelector((state) => state.common.productState);
  const userData = useSelector((state) => state.common.personalData);

  // function productCallback() {
  //   console.log("productCallback");
  // }


  return (
    <main className="container py-5">

      {userData ? <AddDetails /> : <AddPersonalDetails />}
      <Details />
      {/* {JSON.stringify(useSelector((state) => state.common.personalData))} */}
    </main>
  );
}

export default App;
