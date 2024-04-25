import { useRouter } from 'next/router';
import '../styles/globals.css';
import AuthProvider from '../../context/AuthContext';
import NavBar from '../components/NavBar';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isNotHomePage = router.pathname !== '/home';

  return (
    <AuthProvider>
      {isNotHomePage && <NavBar />} 
      <Component {...pageProps} />
    </AuthProvider>
  );
}
