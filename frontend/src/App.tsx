import React, { useEffect, useState, Suspense } from "react";
// react redux state implementation
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import mainRoutes from "./routes/main";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Preloader from "./components/Preloader/preloader";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Dashboard = React.lazy(() => import("./components/Dashboard/dashboard"));

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <div className="App">
      {isLoading ? (
        <Preloader />
      ) : (
        <Router>
          <Header />
          <Suspense fallback={<Preloader />}>
            <Routes>
              {mainRoutes.map((prop, key) => {
                return (
                  <Route
                    path={prop.path}
                    key={key}
                    element={prop.component}
                  ></Route>
                );
              })}
              <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </Suspense>
          <Footer />
        </Router>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light"
      />
    </div>
  );
}

export default App;
