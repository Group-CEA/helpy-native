import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  ScrollView
} from "react-native";
import Alarm from "../components/alarm";
import SafeAreaView from "react-native-safe-area-view";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";
import { Context as NotificationContext } from "../context/NotificationContext";

//HOC

import { Context as LocationContext } from "../context/LocationConext";
import ContactPerson from "../components/ContactPersons";
import Symptoms from "../components/Symptoms";
import Info from "../components/Info";
import Donate from "../components/Donate";
import Activity from "../components/Activity";

const HomeScreen = (props) => {
  const { state, addLocation } = useContext(LocationContext);
  const [err, setErr] = useState(null);
  const { fetchNotification } = useContext(NotificationContext);

  let { t, locale } = props.screenProps;
  const contactperson = t("Your_Contact_Persons");

  const buttontext = t("Hold_if_you_have");
  const halten = t("Hold");
  const warning = t("Warning");
  const warningtitle = t("warningtitle");
  const yes = t("yes");
  const no = t("no");

  const titlesympt = t("Symptom");
  const fever = t("fever");
  const Cough = t("Cough");
  const Shortness = t("Shortness");
  const Dificultiy = t("Dificultiy");
  const symtext = t("symtext");
  const who = t("who");

  const howtitle = t("worktitel");
  const howtext = t("worktext");
  const share = t("workbutton");

  const supporttitle = t("suptitle");
  const supporttext = t("suptext");
  const coffe = t("coffe");

  // Activity
  const activityTitle = t("activityTitle");
  const activitySubTitle = t("activitySubTitle");
  const activityMovieTitle = t("activityMovieTitle");
  const activityStudyingTitle = t("activityStudyingTitle");
  const activitySportTitle = t("activitySportTitle");
  const activityYogaTitle = t("activityYogaTitle");
  const activityPilatesTitle = t("activityPilatesTitle");

  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 7000,
          distanceInterval: 10,
        },
        (location) => {
          const userposition = {
            coordinates: [location.coords.longitude, location.coords.latitude],
          };
          addLocation(userposition);
        }
      );
    } catch (e) {
      setErr(e);
    }
  };

  useEffect(() => {
    startWatching();
    fetchNotification();
  }, []);

  /*const contacts = await AsyncStorage.getItem('contactpersons');
    const count = JSON.parse(contacts);*/
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <ScrollView style={styles.container}>
        {err ? (
          <Text
            style={{
              marginLeft: 3,
              textAlignVertical: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 23,
              justifyContent: "center",
            }}
          >
            Please enable location Services
          </Text>
        ) : null}
        <ContactPerson
          text={contactperson}
          contact={state.contactpersons}
        ></ContactPerson>
        <Alarm
          text={buttontext}
          halten={halten}
          warning={warning}
          warningtitle={warningtitle}
          yes={yes}
          no={no}
        />
        <Symptoms
          title={titlesympt}
          fever={fever}
          Cough={Cough}
          Shortness={Shortness}
          Dificultiy={Dificultiy}
          symtext={symtext}
          who={who}
        ></Symptoms>
        <Activity
          title={activityTitle}
          subTitle={activitySubTitle}
          movieTitle={activityMovieTitle}
          studyingTitle={activityStudyingTitle}
          sportTitle={activitySportTitle}
          yogaTitle={activityYogaTitle}
          pilatesTitle={activityPilatesTitle}
        ></Activity>
        <Info title={howtitle} text={howtext} share={share}></Info>
        <Donate title={supporttitle} text={supporttext} coffe={coffe}></Donate>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",

    flex: 1,
    backgroundColor: "#DDDEE8",
  },
});

export default HomeScreen;
