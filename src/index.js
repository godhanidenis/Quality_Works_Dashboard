import React from "react";
import ReactDOM from "react-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { createStore, applyMiddleware, Store, compose } from "redux";
import axios from "axios";
import appConfig from "./config";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import rootReducer from "./store/reduces/index";
import { persistStore, persistReducer } from "redux-persist";
import "./assest/fonts/helveticaneue.ttf";


const getExpirationDate = (jwtToken) => {
    if (!jwtToken) {
        return null;
    }
    const tokenDetails = jwt_decode(jwtToken, { complete: true });
    return (tokenDetails && tokenDetails.exp && tokenDetails.exp * 1000) || null || undefined;
};

const isExpired = (exp) => {
    if (!exp) {
        return false;
    }
    return Date.now() > exp;
};

const getToken = async (_token) => {
    if (!_token) {
        return null;
    }
    if (isExpired(getExpirationDate(_token))) {
        try {
            const updatedToken = await axios.post(
                `${appConfig.appUrl}/api/refresh_token/`
            );
            localStorage.setItem("token", updatedToken);
            return updatedToken
        } catch (err) {
            return {
                success: false,
                message: (err) || "something went wrong"
            };
        }
    }
    return _token;
};

axios.interceptors.request.use(async (config) => {
    // const token = localStorage.getItem("token")
    const token = config.headers.headers
    const token2 = await getToken(token)
    if (!token2?.data?.data?.access_token) {
        return config;
    } else {
        localStorage.setItem('token', token2?.data?.data?.access_token)
        config.headers.Authorization = token2?.data?.data?.access_token
        return config;
    }
})

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (403 === error.response?.status) {
        // localStorage.clear();
        // sessionStorage.clear();
        function deleteAllCookies() {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        }
        // deleteAllCookies()
        // window.location.reload();
    } else {
        return Promise.reject(error);
    }
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] ) || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
