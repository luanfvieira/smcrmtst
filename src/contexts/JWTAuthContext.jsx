import { createContext, useEffect, useReducer } from "react";
import axios from "src/utils/axios";
import PropTypes from "prop-types";
import api from "src/utils/api";
import notificationsApi from "src/utils/notificationsApi";

const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("@smart-posto:accessToken", accessToken);

    const userData = JSON.parse(
      window.localStorage.getItem("@smart-posto:userData")
    );

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    api.defaults.headers.common["x-company"] = userData?.companySelected?.id;

    notificationsApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    notificationsApi.defaults.headers.common["x-company"] =
      userData?.companySelected?.id;
  } else {
    localStorage.removeItem("@smart-posto:accessToken");

    delete api.defaults.headers.common.Authorization;
    delete notificationsApi.defaults.headers.common.Authorization;

    delete api.defaults.headers.common["x-company"];
    delete notificationsApi.defaults.headers.common["x-company"];
  }
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialAuthState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  update: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem(
          "@smart-posto:accessToken"
        );
        const userData = JSON.parse(
          window.localStorage.getItem("@smart-posto:userData")
        );

        if (accessToken && userData) {
          setSession(accessToken);

          const user = {
            id: userData.id,
            avatarName: userData.user.substring(0, 1).toUpperCase(),
            email: userData.email,
            user: userData.user,
            name: userData.user,
            username: userData.user,
            companies: userData.companies,
            companySelected: userData?.companySelected
              ? userData?.companySelected
              : userData?.companies[0],
            roles: userData.roles,
          };

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const update = async (company) => {
    const user = JSON.parse(
      window.localStorage.getItem("@smart-posto:userData")
    );

    const userData = {
      ...user,
      companySelected: company,
    };

    localStorage.setItem("@smart-posto:userData", JSON.stringify(userData));
    const accessToken = window.localStorage.getItem("@smart-posto:accessToken");
    setSession(accessToken);

    dispatch({
      type: "LOGIN",
      payload: {
        user: userData,
      },
    });
  };

  const login = async (userLogin, password) => {
    const response = await api.post(
      "/config/login",
      {
        user: userLogin,
        pass: password,
      },
      {
        headers: {
          "x-key": "@s8e!HgI!ySek$CIJw6Ys$EZJ0o@ZP4dHnP2o33%C9E9TkE%wr",
        },
      }
    );

    const { token, userData } = response.data;

    if (userData?.changePass) {
      //Temporário ajustar algo do react
      const url = window.location.origin;

      return document.location.assign(
        `${url}/change-password?user=${userData.user}`
      );
    }

    const user = {
      id: userData.id,
      avatarName: userData.user.substring(0, 1).toUpperCase(),
      email: userData.email,
      username: userData.user,
      user: userData.user,
      name: userData.user,
      companies: userData?.companies,
      companySelected: userData?.companies[0],
      roles: userData.roles,
    };

    localStorage.setItem("@smart-posto:userData", JSON.stringify(user));
    setSession(token);

    dispatch({
      type: "LOGIN",
      payload: {
        user: user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  const register = async (email, name, password) => {
    const response = await axios.post("/api/account/register", {
      email,
      name,
      password,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem("@smart-posto:accessToken", accessToken);
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        update,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
