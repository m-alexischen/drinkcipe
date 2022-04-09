import { useContext } from "react";
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import AuthContext from "./store/auth-context";
import Layout from './components/layout/Layout/Layout';
import StartingPage from './pages/StartingPage/StartingPage';
import Login from './pages/Login/Login';
import Recipes from './pages/Recipes/Recipes/Recipes';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
import Comments from './components/comments/comments/Comments';
import AddYourTwist from './pages/AddYourTwist/AddYourTwist';
import FellowBartenders from './pages/FellowBartenders/FellowBartenders/FellowBartenders';
import Profile from './pages/Profile/Profile';
import EditInfo from "./pages/Profile/EditInfo";
import PageNotFound from './pages/PageNotFound';

const App = () => {
  const ctx = useContext(AuthContext);

  const isLoggedIn = ctx.isLoggedIn;

  return (
    <Layout>
      <Routes>
        {!isLoggedIn && <Route path='*' element={<Navigate replace to='/' />}/>}
        {!isLoggedIn && <Route path='/' element={<StartingPage />}/>}
        {!isLoggedIn && <Route path='/login' element={<Login />}/>}
        {isLoggedIn && <Route path='/*' element={<Navigate replace to='/recipes' />}/>}
        {isLoggedIn && <Route path='/recipes' element={<Recipes />}/>}
        {isLoggedIn && (
          <Route path='/recipes/:recipeId' element={<RecipeDetail />}>
            <Route
              path=''
              element={
                <div className='centered'>
                  <Link className='btn--flat' to={`comments`}>
                    Load Comments
                  </Link>
                </div>
              }
            />
            <Route path={`comments`} element={<Comments />} />
          </Route>
        )}
        {isLoggedIn && <Route path='/add-your-twist' element={<AddYourTwist />}/>}
        {isLoggedIn && <Route path='/fellow-bartenders' element={<FellowBartenders />}/>}
        {isLoggedIn && <Route path='/profile' element={<Profile />} />}
        {isLoggedIn && <Route path='/profile/edit-info' element={<EditInfo />} />}
        {isLoggedIn && <Route path='*' element={<PageNotFound />} />}
      </Routes>
    </Layout>
  );
};

export default App;
