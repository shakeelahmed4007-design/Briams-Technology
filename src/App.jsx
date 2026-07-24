import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import { AdminProvider } from "./context/AdminContext";
import Loader from "./components/shared/Loader";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AdminProvider>
          <Loader />
          <AppRoutes />
        </AdminProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
