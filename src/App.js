import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import Layout from './components/layout/layout';
import { Provider } from 'react-redux';
import store from './store/index';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/order' element={<OrderPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
