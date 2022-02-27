import React from "react";
import { useGoogleLogin } from "react-google-login";
import styles from "./Login.module.css";
import axiosInstance from "../../services/api";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useRoomClientContext } from "../../services/RoomClientContext";
const clientId =
  "785480849408-946edqftlrnrjffja0lsdha60vbqkbs9.apps.googleusercontent.com";

function LoginHooks() {
  const history = useHistory();
  const { handleCurUser } = useRoomClientContext();
  const onSuccess = async (res) => {
    console.log("Login Success: currentUser:", res.profileObj);

    try {
      const { data } = await axiosInstance.post("/user/auth", {
        provider: "Google",
        accessToken: res.accessToken,
      });

      localStorage.setItem("confrenz-token", data.token);
      handleCurUser(data.user);
      const roomId = uuidv4();
      history.push(`/${roomId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className={styles.button}>
      <img
        src="icons/google.svg"
        alt="google login"
        className={styles.icon}
      ></img>

      <span className={styles.buttonText}>Sign in with Google</span>
    </button>
  );
}

export default LoginHooks;
