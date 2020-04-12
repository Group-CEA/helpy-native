//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trakerAPI from "../api/tracker";
import { navigate } from "../NavigationRef";

const authReducer = (state, actions) => {
  switch (actions.type) {
    case "add_error":
      return { ...state, errorMessage: actions.payload };
    case "signin":
      return { errorMessage: "", token: actions.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    case "setemail":
      return { email: actions.payload };
    case "delete":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};
const tryLocalsignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("Home");
  } else {
    navigate("loginFlow");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password, userposition }) => {
  // make api req to sign up with email and pass

  //if sign up, modify state that we are authendicated

  //if signing up fail give error
  try {
    // Send a POST request

    const response = await trakerAPI.post("/signup", {
      email,
      password,
      position: {
        type: "Point",
        coordinates: [userposition.coordinates[0], userposition.coordinates[1]],
      },
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    //navgitae to mainflow
    navigate("Home");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "something went wrong with signup",
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  // make api req to sign in with email and pass
  //if sign in, modify state that we are authendicated
  //if signing in fail give error
  try {
    const response = await trakerAPI.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });

    navigate("Home");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "something went wrong with signin",
    });
  }
};

const signout = (dispatch) => async () => {
  // some how sign out
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};
/*const getemailpass = async () =>{
    const token = await AsyncStorage.getItem('token');
    const response = await trakerAPI.get('/', 'Bearer'+token);
    dispatch({type: 'setemail', payload: response.data});
};*/

const deleteacc = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  const auth = "Bearer " + token;
  try {
    const response = await trakerAPI.post(
      "/deleteuser",
      {},
      {
        headers: {
          Authorization: auth,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }

  await AsyncStorage.removeItem("token");
  dispatch({ type: "delete" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout, clearErrorMessage, tryLocalsignin, deleteacc },
  { token: null, errorMessage: "" }
);
