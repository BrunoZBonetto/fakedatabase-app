import DataGenerator from './components/DataGenerator';
import { ToastProvider } from './components/Toast';
import { LocaleProvider } from './hooks/useLocale';

function App() {
  return (
    <LocaleProvider>
      <ToastProvider>
        <DataGenerator />
      </ToastProvider>
    </LocaleProvider>
  );
}

export default App;
