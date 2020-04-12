import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Linking,
} from "react-native";
import { Context as Authcontext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import Spacer from "../components/Spacer.js";

const SignupScreen = ({ screenProps }) => {
  const { state, signup, clearErrorMessage } = useContext(Authcontext);
  let { t } = screenProps;
  const signupbuttom = t("signup");
  const signuptext = t("siguptext");
  const already = t("alreadyhav");
  const passwordtext = t("passtext");
  const confirmpass = t("confirmpass");
  const conpasserror = t("conpasserror");
  const emailerrors = t("emailerror");

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NavigationEvents onWillBlur={clearErrorMessage} />
        <Spacer>
          <AuthForm
            headerText={signuptext}
            errorMessage={state.errorMessage}
            onSubmit={signup}
            buttontext={signupbuttom}
            loadingvalue={false}
            passwordtext={passwordtext}
            confirmpass={confirmpass}
            conpasserror={conpasserror}
            emailerrors={emailerrors}
          />
        </Spacer>
        <Text
          onPress={() => Linking.openURL("https://helpy-landing.now.sh/agb")}
          style={{ marginHorizontal: 15, marginBottom: 15 }}
        >
          Durch das Klicken auf Registrierung stimmen Sie den{" "}
          <Text style={{ color: "blue" }}>
            Allgemeinen Geschäftsbedingungen
          </Text>{" "}
          zu
        </Text>
        <NavLink textTitle={already} navigatelin="signin" />
      </View>
    </SafeAreaView>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
  Image: {
    marginTop: 40,
    height: 400,
    width: 412,
    right: 1,
    resizeMode: "stretch",
    position: "absolute",
    top: 310,
    opacity: 0.8,
    shadowColor: "black",
    shadowOffset: { height: 2 },
    shadowOpacity: 0.9,
  },
  link: {
    marginHorizontal: 15,
  },
});

export default SignupScreen;
