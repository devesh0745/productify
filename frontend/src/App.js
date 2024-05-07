import './App.css';
import ProductForm from "./components/ProductForm/ProductForm";
import {Provider} from "react-redux";
import { store } from './redux/store';

function App() {
  return (
    <div id='main-div' className="App">
      <Provider store={store}>
        <h1 id='product-main-heading'>PRODUCTIFY</h1>
        <ProductForm />
      </Provider>
    </div>
  );
}

export default App;
