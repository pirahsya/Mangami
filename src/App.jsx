import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
        <Toaster
          position="bottom-right"
          toastOptions={{
            className:
              "dark:bg-zinc-800 dark:text-zinc-100 bg-white text-zinc-900",
          }}
        />
      </Layout>
    </BrowserRouter>
  );
}
