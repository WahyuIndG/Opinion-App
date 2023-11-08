import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import NewDiscussModal from './components/NewDiscussModal';
import SearchPage from './pages/SearchPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DetailPage from './pages/DetailPage';
import { setAuthUserAsyncThunk } from './states/authUser/action';
import NotFoundPage from './pages/NotFoundPage';
import Loading from './components/Loading';
import MobileNavBar from './components/MobileNavBar';
import DesktopNavbar from './components/DesktopNavBar';
import BottomNavBar from './components/BottomNavBar';

function App() {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  const toggleDiscussModal = () => {
    if (authUser === null) {
      alert('you need to login first');
      return navigate('/login');
    }
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    dispatch(setAuthUserAsyncThunk());
  }, [dispatch]);

  return (
    <>
      <Loading />
      <div className="min-h-screen bg-dkBackground text-dkText font-poppins">
        <div className="w-full md:max-w-7xl m-auto ">
          <header className="fixed top-0 left-0 right-0 ">
            <DesktopNavbar toggleDiscussModal={toggleDiscussModal} />
            <MobileNavBar />
          </header>
          <main className="max-[768px]:w-full max-[968px]:w-[500px] w-[570px] max-[768px]:px-4 pt-20 m-auto">
            <Routes>
              <Route path="/" element={<HomePage toggleDiscussModal={toggleDiscussModal} />} />
              <Route path="/post/:postId" element={<DetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search/:userId" element={<ProfilePage self={false} />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              {authUser && <Route path="/profile" element={<ProfilePage self />} />}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <NewDiscussModal showModal={showModal} onClose={toggleDiscussModal} />
          </main>
          <footer className="md:hidden block fixed z-10 bottom-0 left-0 right-0">
            <BottomNavBar toggleDiscussModal={toggleDiscussModal} />
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
