import React from "react";
import { Card } from "react-native-shadow-cards";
import {
  Text,
  Share,
  TouchableOpacity,
} from "react-native";

function Info(props) {
  const howtitle = props.title;
  const howtext = props.text;
  const share = props.share;

  function onShare() {
    try {
      const result = Share.share({
        title: "Download Helpy to fight against Corona",
        message: "https://helpy-landing.now.sh/",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Card
      elevation={20}
      cornerRadius={19}
      style={{ padding: 30, margin: 20, marginBottom: 0 }}
    >
      <Text
        style={{
          fontSize: 30,
          marginBottom: 10,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {howtitle}
      </Text>

      <Text style={{ fontSize: 20, paddingTop: 20 }}>{howtext}</Text>

      <TouchableOpacity
        style={{
          borderRadius: 19,
          padding: 20,
          marginTop: 20,
          backgroundColor: "#2F2E41",
        }}
        onPress={() => onShare()}
      >
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {share}
        </Text>
      </TouchableOpacity>
    </Card>
  );
}

export default Info;
