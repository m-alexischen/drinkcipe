import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Profile = () => {
    const ctx = useContext(AuthContext);

    fetch('http://localhost:8080/api/recipe/user/{userId}', {
        method: 'POST',
        body: JSON.stringify({
            idToken: ctx.token,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return res.json().then((data) => {
                let errorMessage = 'Please enter valid information!';
                
                throw new Error(errorMessage);
            });
        };
    });

    return (
        <div>
            {/* <div className={classes.header}>
                Hello, ${currentUser.username}!
            </div>
            <NavLink to='/profile/edit-info'>
                <button className={classes.button}>
                    Edit Info
                </button> 
            </NavLink>
            <p>
                TOKEN: {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
                ID: {currentUser.id}
            </p>
            <p>
                EMAIL: {currentUser.email}
            </p>
            <ul>
                AUTHORITIES:
                {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul> */}
            <p>You have 4 recipes published!</p>
        </div>
    );
};

export default Profile;