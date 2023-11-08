import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import NavigationBar from './components/NavigationBar';
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

function App() {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);

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
        <div className="max-w-7xl m-auto px-4">
          <header className="fixed top-0 left-0 right-0 bg-[rgba(16,16,16,0.8)] backdrop-blur-md">
            <NavigationBar toggleDiscussModal={toggleDiscussModal} />
          </header>
          <main className="max-w-[570px] m-auto pt-20">
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
        </div>
      </div>
    </>
  );
}

export default App;
