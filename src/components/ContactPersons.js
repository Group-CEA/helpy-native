import React, { useContext } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { Context as LocationContext } from "../context/LocationConext";

//import {Card} from 'react-native-shadow-cards';

import contact from "../img/contact2.png";

const ContactPersons = (props) => {
  // Contacts = props.contact;
  const { state } = useContext(LocationContext);
  // const text = props.text.contactperson;
  //console.log(props);
  let count = 0;
  if (state.count > 1) {
    count = state.count - 1;
  }
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={contact}></Image>

      <Text
        style={{
          padding: 20,
          fontSize: 30,
          fontWeight: "bold",
          color: "#2F2E41",
          textAlign: "center",
        }}
      >
        {props.text}
      </Text>

      <Text
        style={{
          fontSize: 120,
          marginBottom: 30,
          fontWeight: "bold",
          color: "#FF6366",
          textAlign: "center",
        }}
      >
        {count}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    flex: 1,
    display: "flex",
    padding: 10,
    margin: 20,
    borderRadius: 19,
  },
  image: {
    width: null,
    resizeMode: "contain",
    height: 220,
  },
});

export default ContactPersons;
/*<Card elevation={20} cornerRadius={19} style={{ marginTop: 20 ,padding: 10, margin: 20 }}>
                    <Image style={{ //resizeMode: 'center', alignSelf: 'center', width: "60%", opacity: 0.4, marginTop: -200 
}} source={contact}>

            </Card>*/
