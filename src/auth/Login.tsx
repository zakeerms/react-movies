import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { urlAccounts } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { authenticationResponse, userCredentials } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJWT";

export default function Login() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  const history = useHistory();
  async function login(credentials: userCredentials) {
    try {
      const response = await axios.post<authenticationResponse>(
        `${urlAccounts}/login`,
        credentials
      );
      saveToken(response.data);
      update(getClaims());
      console.log(response.data);

      history.push("/");
    } catch (error) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }
  return (
    <>
      <h3>Login</h3>
      <DisplayErrors errors={errors} />
      <AuthForm
        model={{ email: "", password: "" }}
        onSubmit={async (values) => await login(values)}
      />
    </>
  );
}
