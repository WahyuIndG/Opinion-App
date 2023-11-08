import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import dkLogo from '../../Public/Images/dkLogo.png';
import { BiArrowBack } from 'react-icons/bi';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { TfiGithub } from 'react-icons/tfi';

const users = [
  {
    id: '1',
    name: 'Dimas Saputra',
    email: 'dimasSaputra@gmail.com',
  },
  {
    id: '2',
    name: 'Dimas Anggara',
    email: 'dimasSaputra@gmail.com',
  },
  {
    id: '3',
    name: 'Roby Saputra',
    email: 'dimasSaputra@gmail.com',
  },
];

const NavigationBar = ({ toggleDiscussModal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authUser } = useSelector((states) => states);
  const active = location.pathname;

  const showBackButton = location.pathname.split('/').length === 3 ? true : false;

  const goBack = () => {
    navigate(-1);
  };

  return (
    <nav className="max-w-7xl m-auto px-4 flex justify-between items-center p-1">
      <img src={dkLogo} alt="Opinion Logo" className="h-8" />

      <div className="flex relative w-[570px] -ml-11 overflow-hidden">
        <div
          className={`${
            showBackButton ? 'visible left-0 opacity-100' : 'visible -left-10 opacity-0'
          } top-0  absolute h-full grid place-items-center transition-all duration-300`}
        >
          <button className="grid place-items-center hover:bg-[#1c1c1c] p-3 rounded-full" onClick={goBack}>
            <BiArrowBack className="text-[28px]" />
          </button>
        </div>
        <ul className="w-full flex justify-center">
          <Link
            to="/"
            className={`hover:bg-[#1c1c1c] py-5 ${
              showBackButton ? 'px-5' : 'px-8'
            } rounded-lg transition-all duration-300`}
          >
            {active === '/' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" id="home">
                <path
                  className="fill-dkText"
                  d="M6.64373233,18.7821107 L6.64373233,15.7152449 C6.64371685,14.9380902 7.27567036,14.3067075 8.05843544,14.3018198 L10.9326107,14.3018198 C11.7188748,14.3018198 12.3562677,14.9346318 12.3562677,15.7152449 L12.3562677,15.7152449 L12.3562677,18.7732212 C12.3562498,19.4472781 12.9040221,19.995083 13.5829406,20 L15.5438266,20 C16.4596364,20.0023291 17.3387522,19.6427941 17.9871692,19.0007051 C18.6355861,18.3586161 19,17.4867541 19,16.5775231 L19,7.86584638 C19,7.13138763 18.6720694,6.43471253 18.1046183,5.96350064 L11.4429783,0.674268354 C10.2785132,-0.250877524 8.61537279,-0.22099178 7.48539114,0.745384082 C7.48539114,0.745384082 0.967012253,5.96350064 0.967012253,5.96350064 C0.37274068,6.42082162 0.0175522924,7.11956262 0,7.86584638 L0,16.5686336 C0,18.463707 1.54738155,20 3.45617342,20 L5.37229029,20 C5.69917279,20.0023364 6.01348703,19.8750734 6.24547302,19.6464237 C6.477459,19.417774 6.60792577,19.1066525 6.60791706,18.7821107 L6.64373233,18.7821107 Z"
                  transform="translate(2.5 2)"
                ></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" id="home">
                <path
                  fill="none"
                  className="stroke-dkinactive"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.20"
                  d="M6.65721519,18.7714023 L6.65721519,15.70467 C6.65719744,14.9246392 7.29311743,14.2908272 8.08101266,14.2855921 L10.9670886,14.2855921 C11.7587434,14.2855921 12.4005063,14.9209349 12.4005063,15.70467 L12.4005063,15.70467 L12.4005063,18.7809263 C12.4003226,19.4432001 12.9342557,19.984478 13.603038,20 L15.5270886,20 C17.4451246,20 19,18.4606794 19,16.5618312 L19,16.5618312 L19,7.8378351 C18.9897577,7.09082692 18.6354747,6.38934919 18.0379747,5.93303245 L11.4577215,0.685301154 C10.3049347,-0.228433718 8.66620456,-0.228433718 7.51341772,0.685301154 L0.962025316,5.94255646 C0.362258604,6.39702249 0.00738668938,7.09966612 0,7.84735911 L0,16.5618312 C0,18.4606794 1.55487539,20 3.47291139,20 L5.39696203,20 C6.08235439,20 6.63797468,19.4499381 6.63797468,18.7714023 L6.63797468,18.7714023"
                  transform="translate(2.5 2)"
                ></path>
              </svg>
            )}
          </Link>
          <Link
            to="/search"
            className={`hover:bg-[#1c1c1c] py-5 ${
              showBackButton ? 'px-5' : 'px-8'
            } rounded-lg transition-all duration-300`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" id="search">
              <g
                fill="none"
                fillRule="evenodd"
                className={active === '/search' ? 'stroke-dkText' : 'stroke-dkinactive'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.20"
                transform="translate(2 2)"
              >
                <circle cx="9.767" cy="9.767" r="8.989"></circle>
                <line x1="16.018" x2="19.542" y1="16.485" y2="20"></line>
              </g>
            </svg>
          </Link>
          <button
            onClick={toggleDiscussModal}
            className={`hover:bg-[#1c1c1c] py-5 ${
              showBackButton ? 'px-5' : 'px-8'
            } rounded-lg transition-all duration-300`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              id="write"
              className="fill-dkinactive"
            >
              <path d="m7.11 11.52-.71 4.94c-.074.59.29 1.14 1.14 1.14l4.94-.71a.996.996 0 0 0 .57-.28c.079-.079 7.83-7.823 7.9-7.91 3.442-3.802-1.975-8.989-5.65-5.65-.087.07-7.832 7.822-7.91 7.9a.996.996 0 0 0-.28.57ZM18 4.02A1.974 1.974 0 0 1 20 6a1.932 1.932 0 0 1-.4 1.18L16.82 4.4A1.935 1.935 0 0 1 18 4.02Zm-8.96 8.11 6.34-6.33 2.82 2.82-6.33 6.34-3.3.47Z"></path>
              <path d="M19 13.125V17a3.003 3.003 0 0 1-3 3H7a3.003 3.003 0 0 1-3-3V8a3.003 3.003 0 0 1 3-3h3.969a1 1 0 0 0 0-2H7a5.006 5.006 0 0 0-5 5v9a5.006 5.006 0 0 0 5 5h9a5.006 5.006 0 0 0 5-5v-3.875a1 1 0 0 0-2 0Z"></path>
            </svg>
          </button>
          <Link
            to="/leaderboard"
            className={`hover:bg-[#1c1c1c] py-5 ${
              showBackButton ? 'px-5' : 'px-8'
            } rounded-lg transition-all duration-300`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              id="leaderboard"
              className={active === '/leaderboard' ? 'fill-dkText' : 'fill-dkinactive'}
            >
              <path d="M22,7H16.333V4a1,1,0,0,0-1-1H8.667a1,1,0,0,0-1,1v7H2a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V8A1,1,0,0,0,22,7ZM7.667,19H3V13H7.667Zm6.666,0H9.667V5h4.666ZM21,19H16.333V9H21Z"></path>
            </svg>
          </Link>
          {authUser ? (
            <Link
              to="/profile"
              className={`hover:bg-[#1c1c1c] py-5 ${
                showBackButton ? 'px-5' : 'px-8'
              } rounded-lg transition-all duration-300`}
            >
              {active === '/profile' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" id="profile">
                  <path
                    className="fill-dkText"
                    d="M5.84846399,13.5498221 C7.28813318,13.433801 8.73442297,13.433801 10.1740922,13.5498221 C10.9580697,13.5955225 11.7383286,13.6935941 12.5099314,13.8434164 C14.1796238,14.1814947 15.2696821,14.7330961 15.73685,15.6227758 C16.0877167,16.317132 16.0877167,17.1437221 15.73685,17.8380783 C15.2696821,18.727758 14.2228801,19.3149466 12.4926289,19.6174377 C11.7216312,19.7729078 10.9411975,19.873974 10.1567896,19.9199288 C9.43008411,20 8.70337858,20 7.96802179,20 L6.64437958,20 C6.36753937,19.9644128 6.09935043,19.9466192 5.83981274,19.9466192 C5.05537891,19.9062698 4.27476595,19.8081536 3.50397353,19.6530249 C1.83428106,19.3327402 0.744222763,18.7633452 0.277054922,17.8736655 C0.0967111971,17.5290284 0.00163408158,17.144037 0.000104217816,16.752669 C-0.00354430942,16.3589158 0.0886574605,15.9704652 0.268403665,15.6227758 C0.72692025,14.7330961 1.81697855,14.1548043 3.50397353,13.8434164 C4.27816255,13.6914539 5.06143714,13.5933665 5.84846399,13.5498221 Z M8.00262682,-1.16351373e-13 C10.9028467,-1.16351373e-13 13.2539394,2.41782168 13.2539394,5.40035587 C13.2539394,8.38289006 10.9028467,10.8007117 8.00262682,10.8007117 C5.10240696,10.8007117 2.75131423,8.38289006 2.75131423,5.40035587 C2.75131423,2.41782168 5.10240696,-1.16351373e-13 8.00262682,-1.16351373e-13 Z"
                    transform="translate(4 2)"
                  ></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" id="profile">
                  <g
                    fill="none"
                    fillRule="evenodd"
                    className="stroke-dkinactive"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.20"
                    transform="translate(4 2.5)"
                  >
                    <circle cx="7.579" cy="4.778" r="4.778"></circle>
                    <path d="M5.32907052e-15,16.2013731 C-0.00126760558,15.8654831 0.0738531734,15.5336997 0.219695816,15.2311214 C0.677361723,14.3157895 1.96797958,13.8306637 3.0389178,13.610984 C3.81127745,13.4461621 4.59430539,13.3360488 5.38216724,13.2814646 C6.84083861,13.1533327 8.30793524,13.1533327 9.76660662,13.2814646 C10.5544024,13.3366774 11.3373865,13.4467845 12.1098561,13.610984 C13.1807943,13.8306637 14.4714121,14.270023 14.929078,15.2311214 C15.2223724,15.8479159 15.2223724,16.5639836 14.929078,17.1807781 C14.4714121,18.1418765 13.1807943,18.5812358 12.1098561,18.7917621 C11.3383994,18.9634099 10.5550941,19.0766219 9.76660662,19.1304349 C8.57936754,19.2310812 7.38658584,19.2494317 6.19681255,19.1853548 C5.92221301,19.1853548 5.65676678,19.1853548 5.38216724,19.1304349 C4.59663136,19.077285 3.8163184,18.9640631 3.04807112,18.7917621 C1.96797958,18.5812358 0.686515041,18.1418765 0.219695816,17.1807781 C0.0745982583,16.8746908 -0.000447947969,16.5401098 5.32907052e-15,16.2013731 Z"></path>
                  </g>
                </svg>
              )}
            </Link>
          ) : (
            <Link
              to="/login"
              className={`hover:bg-[#1c1c1c] py-5 ${
                showBackButton ? 'px-5' : 'px-8'
              } rounded-lg transition-all duration-300`}
            >
              <FaSignInAlt
                className={`mt-[2px] text-[27px] ${
                  active === '/login' ? 'text-inherit' : active === '/register' ? 'text-inherit' : 'text-dkinactive'
                }`}
              />
            </Link>
          )}
        </ul>
      </div>

      <a href="https://github.com/WahyuIndG/Opinion-App" target="blank">
        <TfiGithub className="text-[28px] text-dkText mr-2" />
      </a>
    </nav>
  );
};

export default NavigationBar;
