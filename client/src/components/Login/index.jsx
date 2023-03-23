import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from "../../redux/userSlice";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
`;

const LoginWrapper = styled.div`
  height: 400px;
  width: 300px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.6rem;
  border: 1px solid gray;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Image = styled.img`
  height: 50px;
  width: 50px;
`;
const Input = styled.input``;
const Button = styled.button`
  background: red;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
`;
const SignupContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
const Signup = styled.span`
  text-align: center;
  font-size: 0.8rem;
`;
const Error = styled.span`
  color: red;
`;
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setLoginError] = useState("");
  
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axios.post("/auth/signin", {
        email: userName,
        password,
      });
      dispatch(loginSuccess(response.data));
      navigate("/");
    } catch (error) {
      setLoginError(error.response.data.message);
      dispatch(loginFailure());
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response =await axios.post("/auth/signup", {
        name: userName,
        password,
        email,
      });
      navigate("/login");
    } catch (error) {
      setLoginError(error.response.data.message);
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    await signInWithPopup(auth, provider).then((result) => {
        axios
        .post("/auth/google", {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        })
        .then((res) => {
          navigate("/");
          dispatch(loginSuccess(res.data));
        });
    });
  };
  return (
    <LoginContainer>
      <LoginWrapper>
        <Title>
          <Image src="/images/logo.png" />
          <span>Vidtube</span>
        </Title>
        {error && <Error>{error}</Error>}
        {location.pathname === "/login" ? (
          <Input
            type="text"
            id="username"
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        ) : (
          ""
        )}
        {location.pathname === "/signup" ? (
          <>
            <Input
              type="text"
              id="name"
              placeholder="name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              type="email"
              id="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        ) : (
          ""
        )}
        <Input
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={location.pathname === "/login" ? handleLogin : handleSignup}
        >
          {location.pathname === "/login" ? "Login" : "Signup"}
        </Button>
        <Button onClick={signInWithGoogle}>Sign in with google</Button>
        {location.pathname === "/login" ? (
          <SignupContainer>
            <Signup>
              Don't have an account.
              <br /> create account with us.
            </Signup>
            <Link to="/signup">
              <Button>Create Account</Button>
            </Link>
          </SignupContainer>
        ) : (
          ""
        )}
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
