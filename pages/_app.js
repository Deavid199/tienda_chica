import { Provider } from 'react-redux';
import { store } from '@/store/store';
import "@/styles/globals.css";
import { AuthProvider } from '@/context/AuthProvider';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  )
}
