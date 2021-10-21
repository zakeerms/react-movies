import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { urlAccounts } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { authenticationResponse, userCredentials } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJWT";

export default function Register() {
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  async function register(credentials: userCredentials) {
    try {
      const response = await axios.post<authenticationResponse>(
        `${urlAccounts}/create`,
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
      <h3>Register</h3>
      <DisplayErrors errors={errors} />
      <AuthForm
        model={{ email: "", password: "" }}
        onSubmit={async (values) => await register(values)}
      />
    </>
  );
}
