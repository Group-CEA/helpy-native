import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const Authform = ({
  headerText,
  errorMessage,
  onSubmit,
  buttontext,
  conpasserror,
  passwordtext,
  confirmpass,
  emailerrors,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [userposition, setloc] = useState("");
  const [showindicator, setShowind] = useState(false);
  const [passworderror, setPassworderorr] = useState(false);
  const [emailerror, setemailerror] = useState(false);

  const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    _getLocationAsync();
  }, []);

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("error permission not granted");
    }

    let location = await Location.getCurrentPositionAsync({});
    const userposition = {
      type: "Point",
      coordinates: [location.coords.longitude, location.coords.latitude],
    };
    setloc(userposition);
    //console.log(userposition)
  };

  return (
    <>
      <Spacer>
        <Spacer />
        <Spacer />
        <Text h3 style={{ marginTop: 59 }}>
          {headerText}
        </Text>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {emailerror ? (
        <Text style={styles.errorMessage}>{emailerrors}</Text>
      ) : null}
      <Spacer />
      <Input
        label={passwordtext}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <Input
        label={confirmpass}
        value={password2}
        onChangeText={setPassword2}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      {passworderror ? (
        <Text style={styles.errorMessage}>{conpasserror}</Text>
      ) : null}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          buttonStyle={{ backgroundColor: "#FF6366" }}
          title={buttontext}
          onPress={() => {
            if (emailFormat.test(email)) {
              if (password === password2) {
                onSubmit({ email, password, userposition });
                setShowind(true);
              } else {
                setPassworderorr(true);
              }
            } else {
              setemailerror(true);
            }
          }}
        />
      </Spacer>
      {showindicator && !errorMessage ? (
        <ActivityIndicator size="large" color="#FA5858" />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
});

export default Authform;
