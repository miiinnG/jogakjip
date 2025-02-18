import Footer from "./Footer";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const showFooter = location.pathname === "/"; // PublicGroupListPage에서만 표시

  return (
    <div className="layout">
      {children}
      {showFooter && <Footer />}
    </div>
  );
}

export default Layout;