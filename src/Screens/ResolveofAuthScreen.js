import { useContext, useEffect } from "react";
import { Context as Authcontext } from "../context/AuthContext";

const ResolveofAuthScreen = () => {
  const { tryLocalsignin } = useContext(Authcontext);

  useEffect(() => {
    tryLocalsignin();
  }, []);

  return null;
};

export default ResolveofAuthScreen;
