import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  // AuthProvider wraps every page, so any component can call useAuth().
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
