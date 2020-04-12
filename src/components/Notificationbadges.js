import React, { useContext } from "react";
import IconWithBadge from "./IconWithBadge";
import { Context as NotificationContext } from "../context/NotificationContext";

const Notificationbadges = (props) => {
  const { state } = useContext(NotificationContext);
  let count;
  if (state.notification) {
    count = [state].length;
  }
  return <IconWithBadge {...props} badgeCount={count} />;
};
export default Notificationbadges;
