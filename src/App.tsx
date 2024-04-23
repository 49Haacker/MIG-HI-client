import { BrowserRouter, useLocation } from "react-router-dom";
import CustomerRouter from "./routes/CustomerRoutes";
import { useEffect } from "react";
import AdminRoutes from "./routes/AdminRoutes";

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const title =
      path === "/"
        ? "Home"
        : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
    document.title = `MIG-HI - ${title}`;
  }, [location]);

  return null;
};

// scroll set on top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  // const isAdminPath = window.location.pathname.startsWith("/admin");

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <TitleUpdater />

        {/* {isAdminPath ? <AdminRoutes /> : <CustomerRouter />} */}

        <CustomerRouter />
        <AdminRoutes />
      </BrowserRouter>
    </>
  );
};

export default App;
