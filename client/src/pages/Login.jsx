import Google from "../img/google.png";

const Login = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="center">
      <div className="wrapper">
        <div className="left">
          <div>
            <h3>Choose a login option</h3>
          </div>
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
