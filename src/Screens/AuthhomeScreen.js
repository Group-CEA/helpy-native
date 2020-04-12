import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Text } from "react-native-elements";
import gif from "../../assets/stayathomeg.gif";

const AuthhomeScreen = ({ navigation, screenProps }) => {
  let { t } = screenProps;
  const signinbuttom = t("signin");
  const signupbuttom = t("signup");
  const Together = t("togheter");
  const Fight = t("fight");
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.Container}>
      <Image
        source={gif}
        style={{
          height: windowWidth,
          width: windowHeight / 2,
          justifyContent: "center",
          alignSelf: "center",
        }}
      />
      <Text
        style={{
          fontSize: 45,
          fontWeight: "bold",
          color: "black",
          alignSelf: "center",
        }}
      >
        {Together}
      </Text>
      <Text
        style={{
          fontSize: 25,
          marginHorizontal: 20,
          marginTop: 10,
          color: "black",
          letterSpacing: 1,
          alignSelf: "center",
        }}
      >
        {Fight}
      </Text>

      <View style={styles.downcontainer}>
        <TouchableOpacity
          elevation={10}
          style={styles.buttom2}
          onPress={() => navigation.navigate("signup")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {signupbuttom}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          elevation={10}
          style={styles.buttom}
          onPress={() => navigation.navigate("signin")}
        >
          <Text style={{ color: "black", fontWeight: "bold" }}>
            {signinbuttom}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

AuthhomeScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    //'#f95574'
    //'#f955'
    //'#'
  },
  Textcontainer: {
    margin: 25,
    display: "flex",
    flex: 2,
    borderRadius: 20,
    //justifyContent:'space-evenly',
    justifyContent: "center",
    alignItems: "center",
    alignContent: "stretch",
    //backgroundColor:'#FF6366',
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  downcontainer: {
    margin: 20,
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  buttom: {
    display: "flex",
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 100,
    /*borderColor:'#FF6366',
        borderLeftWidth:3,
        borderRightWidth:3,*/
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3e3e3",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttom2: {
    display: "flex",
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 100,
    /*borderColor:'#FF6366',
        borderLeftWidth:3,
        borderRightWidth:3,*/
    height: 60,
    backgroundColor: "#FF6366",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default AuthhomeScreen;
