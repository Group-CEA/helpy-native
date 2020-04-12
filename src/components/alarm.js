import React, { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { Card } from "react-native-shadow-cards";
import { Context as NotificationContext } from "../context/NotificationContext";

import icon from "../img/alarm.png";

const Alarm = (props) => {
  const [dialogVisible, setdialogVisible] = useState(false);
  const { state, alarm } = useContext(NotificationContext);
  const text = props.text;
  const halten = props.halten;
  const warning = props.warning;
  const warningtitle = props.warningtitle;
  const yes = props.yes;
  const no = props.no;

  return (
    <Card
      elevation={20}
      cornerRadius={19}
      style={{ padding: 10, marginLeft: 20, marginRight: 20 }}
    >
      <Text
        style={{
          display: "flex",
          flex: 1,
          padding: 10,
          alignSelf: "center",
          color: "#2F2E41",
          fontWeight: "bold",
          fontSize: 30,
        }}
      >
        {text}
      </Text>
      <TouchableOpacity
        onLongPress={() => setdialogVisible(true)}
        style={styles.buttom}
      >
        <Image source={icon} style={styles.buttomimage}></Image>
        <Text
          style={{
            alignSelf: "center",
            color: "#000",
            fontWeight: "bold",
            fontSize: 20,
            opacity: 0.8,
          }}
        >
          {halten}
        </Text>
      </TouchableOpacity>

      <ConfirmDialog
        title={warningtitle}
        message={warning}
        visible={dialogVisible}
        onTouchOutside={() => setdialogVisible(false)}
        positiveButton={{
          enable: false,
          title: `${yes}`,
          onPress: () => {
            alarm();
            setdialogVisible(false);
          },
        }}
        negativeButton={{
          title: `${no}`,
          onPress: () => setdialogVisible(false),
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 30,
    margin: 40,
    height: 300,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 30,
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5E5E",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 30,
  },
  text: {
    padding: 20,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  buttom: {
    display: "flex",
    flex: 1,
    marginHorizontal: 30,
    marginTop: 45,
    marginBottom: 30,
    alignSelf: "center",
    borderRadius: 70,
    backgroundColor: "#FF6366",
    width: 130,
    height: 130,
    borderWidth: 4,
    borderColor: "#B44747",
    justifyContent: "center",
    paddingBottom: 5,
  },
  buttomimage: {
    resizeMode: "contain",
    alignSelf: "center",
    flex: 0.7,
    opacity: 0.6,
  },
});

export default Alarm;
