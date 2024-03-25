import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home center">
            <h3>Please login in order to use the app</h3>
            <div>
                <Link className="link login-btn" to="/login">
                    Login
                </Link>
            </div>
        </div>
    )
}

export default Home
