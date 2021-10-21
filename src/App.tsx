import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { claim } from "./auth/auth.models";
import AuthenticationContext from "./auth/AuthenticationContext";
import { getClaims } from "./auth/handleJWT";
import Menu from "./Menu";
import routes from "./route-config";
import configureInterceptor from "./utils/httpInterceptors";
import configureValidation from "./utils/Validation";

configureValidation(); // Calling Uppercase validation.ts - global StringSchema

configureInterceptor(); //Configuring auth token in client side, config.headers.Autherization => token

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(getClaims());
  }, []);

  function isAdmin() {
    return (
      claims.findIndex(
        (claim) => claim.name === "role" && claim.value === "admin"
      ) > -1
    );
  }

  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <Menu />
        <div className="container">
          <Switch>
            {/* <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/genres">
              <IndexGenres />
            </Route> */}
            {routes.map((route) => (
              <Route key={route.path} path={route.path} exact={route.exact}>
                {route.isAdmin && !isAdmin() ? (
                  <>you are not allowed to see this page</>
                ) : (
                  <route.component />
                )}
              </Route>
            ))}
          </Switch>
        </div>
        <footer className="bd-footer py-5 mt-6 bg-light">
          <div className="container">
            React Movies {new Date().getFullYear().toString()}
          </div>
        </footer>
      </AuthenticationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
