import AllOrdersModal from './components/modals/AllOrders/AllOrdersModal/AllOrdersModal';
import AddNewOrderModal from './components/modals/AddNewOrder/AddNewOrderModal/AddNewOrderModal';
import { useOrders } from './hooks/useOrders';
import { useSetViewportCustomProperties } from './hooks/useSetViewPortCustomProperties';
import styles from './App.module.scss';

function App() {
  useOrders();
  useSetViewportCustomProperties();

  return (
    <div className={styles.app}>
      <AllOrdersModal />
      <AddNewOrderModal />
    </div>
  );
}

export default App;
