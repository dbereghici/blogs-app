import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
    const logout = () => {
      window.open("http://localhost:5000/auth/logout", "_self");
    };

    return (
        <div className="navbar">

            <Link className="link" to="/">
                Blogs App
            </Link>
            {
                user ? (
                    <ul>
                        <li className="listItem">{user.displayName}</li>
                        <li className="listItem" onClick={logout}>
                        Logout
                        </li>
                    </ul>
                ) : (

                    <Link className="link" to="login">
                        Login
                    </Link>
                )
            }
        </div>
    )
}

export default Navbar;
