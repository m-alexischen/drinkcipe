import { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';
import WebSocketContext from '../../../store/websocket-context';
import bellBtn from '../../images/components/bell.png';
import notiBtn from '../../images/components/notification.png';
import { getImageURL } from '../../images/getImage/GetImageURL';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const ctx = useContext(AuthContext);
  const webCtx = useContext(WebSocketContext);

  const isLoggedIn = ctx.isLoggedIn;

  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState();

  const navigate = useNavigate();
  
  useEffect(() => {
    webCtx.subscribeHandler(notificationHandler);
  }, [])

  const removeIsReadElm = (newArr, oldArr) => {
    for(let i = 0 ; oldArr.length ; i++){
      for(let newNoti of newArr){
        if(oldArr[i].id == newNoti.id){
          oldArr.slice(i, i+1);
        }
      }
    }
  }
  const setShowNotificationHandler = (data) =>{
    if(data.unreadInvites.length > 0 || data.unreadShareRecipes.length > 0 ){
      setShowNotification(true);
    }
  }

  const notificationHandler = (data)  => {
    if(notifications == undefined){
      setNotifications(data);
      setShowNotificationHandler(data);
    }else{
        //  update local cache
        // 1. unread -> read 
        // 2. other no change
        // 1. sync invites
        removeIsReadElm(data.unreadInvites, notifications.unreadInvites);
        removeIsReadElm(data.unreadShareRecipes, notifications.unreadShareRecipes);
        notifications.unreadInvites.concat(data.unreadInvites);
        notifications.unreadShareRecipes.concat(data.unreadShareRecipes);
        setShowNotificationHandler(notifications);
        setNotifications(notifications);
    }
    
  };

  const openBellHandler = (event) => {
    event.preventDefault();

    setShowModal((prev) => !prev);
  };

  const navInviteHandler = () => {
    navigate('/fellow-bartenders/search');
  };

  const navRecipeHandler = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  const logoutHandler = () => {
    ctx.logout();
    webCtx.disconnect();
  };

  // const bellShape = () => {
  //   let isUnread = false;
  //   if(Array.isArray(notifications.unreadInvites)){
  //     for(let invite of notifications.unreadInvites){
  //         if(invite.isRead){
  //           isUnread = true;
  //         }
  //     }
  //   }
  //   if(isUnread) return <img src={notiBtn} alt='' />;
  //   if(Array.isArray(notifications.unreadShareRecipes)){
  //     for(let share of notifications.unreadShareRecipes){
  //         if(share.isRead){
  //           isUnread = true;
  //         }
  //     }
  //   }
  //   return !isUnread ? <img src={bellBtn} alt='' /> : <img src={notiBtn} alt='' />;
  // };
    
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
                <button className={classes.bell} onClick={openBellHandler}>
                  {(notifications !== undefined && showNotification) ? <img src={notiBtn} alt='' /> : <img src={bellBtn} alt='' />}
                </button>
                {showModal && 
                  <div className={classes.notifications}>
                    {(notifications !== undefined) ? 
                      <div className={classes.container}>
                        <div>
                          <h5>Invitation</h5>
                          {(!Array.isArray(notifications.unreadInvites) || !notifications.unreadInvites.length) ? 
                            <p>No New Invitation At The Moment.</p>
                          : 
                            (notifications.unreadInvites.map((invite) => {
                              if (invite.isRead === false) {
                                return (
                                  <div className={classes.image} key={invite.id}>
                                    <img src={getImageURL(invite.fromUserImageId)} alt='' />
                                    <button onClick={navInviteHandler}>{invite.fromUserName} sent you a friend request!</button>
                                  </div>
                                )
                              }
                            }))
                          }
                        </div>
                        <div>
                          <h5>Sharing</h5>
                          {(!Array.isArray(notifications.unreadShareRecipes) || !notifications.unreadShareRecipes.length) ? 
                            <p>No New Sharing At The Moment.</p>
                          : 
                            (notifications.unreadShareRecipes.map((share) => {
                              if (share.isRead === false) {
                                return (
                                  <div className={classes.image} key={share.id}>
                                    <img src={getImageURL(share.fromUserImage)} alt='' />
                                    <button onClick={() => navRecipeHandler(share.recipeId)}>{share.fromUserName} shared a recipe with you!</button>
                                  </div>
                                )
                              }
                            }))
                          }
                        </div>
                      </div>
                    : <p>No Unread Messages At The Moment.</p>}
                  </div>
                }
              </li>
              <li>
                <button className={classes.logout} onClick={logoutHandler}>Logout</button>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

