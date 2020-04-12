import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";

const locationReducer = (state, actions) => {
  switch (actions.type) {
    case "add_current_location":
      return { ...state, currentLocation: actions.payload };
    case "add_contact_person":
      return { ...state, count: actions.payload };
    /*case 'add_contact_person':
            return {...state, contactpersons: actions.payload};*/
    default:
      return state;
  }
};

const givecontactpersons = async (location) => {
  const contacts = await AsyncStorage.getItem("contactpersons");
  contactpersons = JSON.parse(contacts);

  //console.log(contactpersons.length);
};

const addLocation = (dispatch) => async (userlocation) => {
  //if(!(userlocation.coordinates[0] === currentLocation.coordinates[0] && userlocationcoordinates[1] === currentLocation.coordinates[1]))
  //{
  const token = await AsyncStorage.getItem("token");
  const auth = "Bearer " + token;
  try {
    const response = await trackerApi.post(
      "/currentlocation",
      {
        position: {
          type: "Point",
          coordinates: [
            userlocation.coordinates[0],
            userlocation.coordinates[1],
          ],
        },
      },
      {
        headers: {
          Authorization: auth,
        },
      }
    );
    //console.log(response.data)
    const jsoncontact = JSON.stringify(response.data);
    const countparse = JSON.parse(jsoncontact);
    const count = countparse.length;
    dispatch({ type: "add_contact_person", payload: count });

    //console.log(count);
    await AsyncStorage.setItem("contactpersons", JSON.stringify(response.data));
    //await givecontactpersons(userlocation);
  } catch (err) {
    console.log(err);
  }

  // }
  dispatch({ type: "add_current_location", payload: userlocation });
};

const deleteLocation = (dispatch) => async (userlocation) => {
  const token = await AsyncStorage.getItem("token");
  const auth = "Bearer " + token;
  try {
    const response = await trackerApi.post(
      "/deletelocation",
      {
        position: {
          type: "Point",
          coordinates: [
            userlocation.coordinates[0],
            userlocation.coordinates[1],
          ],
        },
      },
      {
        headers: {
          Authorization: auth,
        },
      }
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { addLocation, givecontactpersons, deleteLocation },
  { locations: [], currentLocation: null, count: 0, contactpersons: "" }
);
