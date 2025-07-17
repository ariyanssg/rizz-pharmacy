import Routes from './Routes';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Routes />
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;