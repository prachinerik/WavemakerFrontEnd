import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Container, Box } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  first_name: string | null;
  last_name: string | null;
  email: string;
  password: string;
}

interface IProps {
  isLoginDone: boolean;
}

function Login(props: IProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  // const [isLoginDone, setIsLoginDone] = useState(false);

  const postData = async () => {
    try {
      const dataToSend: User = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      };

      sessionStorage.setItem("email", email);

      const response: AxiosResponse = await axios.post(
        "http://localhost:8080/posts/insertIntoUsers",
        dataToSend
      );
      console.log("userId " + response.data["message"]);
      sessionStorage.setItem("userId", response.data["message"]);
      // Process the response data
    } catch (error) {
      console.log("error");
    }
  };

  const handleLogin = () => {
    postData();

    navigate("/survey");
  };

  return (
    <>
      <Container className="inputblock">
        <Box>
          {props.isLoginDone}
          <h1 className="title">Wavemakers</h1>
          <div className="textBlock">
            <div className="userinput1">
              <TextField
                className="firstname"
                variant="outlined"
                label="firstname"
                type="name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></TextField>
            </div>
            <div className="userinput1">
              <TextField
                className="lastname"
                variant="outlined"
                label="lastname"
                type="name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></TextField>
            </div>
            <div className="userinput1">
              <TextField
                className="username"
                variant="outlined"
                label="username"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
            </div>
            <div className="userinput2">
              <TextField
                className="password"
                variant="outlined"
                label="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
            </div>
          </div>
          <div className="btnSignup">
            <Button type="submit" variant="contained" onClick={handleLogin}>
              Signup
            </Button>
          </div>
        </Box>
      </Container>
    </>
  );
}
export default Login;
