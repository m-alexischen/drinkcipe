import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';
import bellBtn from '../../images/components/bell.png';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const ctx = useContext(AuthContext);

  const isLoggedIn = ctx.isLoggedIn;
    
  return (
    <header className={classes.header}>
      <NavLink to='/' className={classes.logonav}>
        <div className={classes.logo}>DRINK-CIPE</div>
      </NavLink>
      <nav className={classes.nav}>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink to='/login' className={navData => navData.isActive ? classes.active : '' }>
                Login
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <ul>
              <li>
                <NavLink to='/recipes' className={navData => navData.isActive ? classes.active : '' }>
                  Recipes
                </NavLink>
              </li>
              <li>
                <NavLink to='/my-recipes' className={navData => navData.isActive ? classes.active : '' }>
                  My Recipes
                </NavLink>
              </li>
              <li>
                <NavLink to='/fellow-bartenders' className={navData => navData.isActive ? classes.active : '' }>
                  Fellow Bartenders
                </NavLink>
              </li>
              <li>
                <NavLink to='/profile' className={navData => navData.isActive ? classes.active : '' }>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to='/notification' className={navData => navData.isActive ? classes.active : '' }>
                  <button className={classes.bell}><img src={bellBtn} alt='' /></button>
                </NavLink>
              </li>
              <li>
                <button className={classes.logout} onClick={ctx.logout}>Logout</button>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
