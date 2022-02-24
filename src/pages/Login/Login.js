import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import styles from "./Login.module.css"
const clientId =
  '785480849408-946edqftlrnrjffja0lsdha60vbqkbs9.apps.googleusercontent.com';

function LoginHooks() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    console.log(res)
    // refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className={styles.button}>
      <img src="icons/google.svg" alt="google login" className={styles.icon}></img>

      <span className={styles.buttonText}>Sign in with Google</span>
    </button>
  );
}

export default LoginHooks;