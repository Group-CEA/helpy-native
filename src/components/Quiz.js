import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";

const Quiz = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 25, paddingTop: 30 }}
        onPress={() =>
          Linking.openURL(
            "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
          )
        }
      >
        For more information visit:{" "}
        <Text style={{ color: "blue" }}> www.who.int</Text>
      </Text>

      <Text
        style={{
          fontSize: 30,
          marginBottom: 10,
          paddingTop: 80,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        How Helpy works{" "}
      </Text>
      <Text style={{ fontSize: 20, textAlign: "justify" }}>
        If you press the red button, all persons with whom you have had contact
        over 50 meters will be notified. You will also be notified when someone
        pushes the red button.
      </Text>

      <TouchableOpacity style={styles.card} onPress={() => onShare()}>
        <Text style={styles.text}>Share Helpy</Text>
      </TouchableOpacity>

      <Image></Image>

      <Text
        style={{ fontSize: 25, paddingTop: 60 }}
        onPress={() =>
          Linking.openURL("https://www.paypal.com/pools/c/8ny5af3B7u")
        }
      >
        Support the service:{" "}
        <Text style={{ color: "blue" }}>www.paypal.com</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 20,
  },
  card: {
    marginTop: 30,

    height: 80,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 30,
    display: "flex",
    flex: 1,

    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    elevation: 30,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
});

export default Quiz;
