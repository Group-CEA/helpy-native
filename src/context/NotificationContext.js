import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";

const notifiReducer = (state, action) => {
  switch (action.type) {
    case "fetch_notifi":
      return action.payload;
    default:
      return state;
  }
};

const fetchNotification = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  const auth = "Bearer " + token;
  const response = await trackerApi.get("/notification", {
    headers: {
      Authorization: auth,
    },
  });
  //console.log(response.data);
  dispatch({ type: "fetch_notifi", payload: response.data });
};

const alarm = (dispatch) => async (notification) => {
  const token = await AsyncStorage.getItem("token");
  const auth = "Bearer " + token;
  //console.log(auth);
  //A contact person is infected. Keep calm and stay at home for at least 2 weeks. If you have symptoms, hold the button
  await trackerApi.post(
    "/alarm",
    {
      notification:
        "Eine Kontaktperson ist infiziert. Bleib ruhig und bleib mindestens 2 Wochen zu Hause. Wenn Sie Symptome haben, halten Sie die Taste gedrückt.\n \nA contact person is infected. Keep calm and stay at home for at least 2 weeks. If you have symptoms, hold the button",
    },
    {
      headers: {
        Authorization: auth,
      },
    }
  );
};

export const { Provider, Context } = createDataContext(
  notifiReducer,
  { fetchNotification, alarm },
  []
);
