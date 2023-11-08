/* eslint-disable indent */
import { useNavigate, useLocation } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { TfiGithub } from 'react-icons/tfi';

import dkLogoOnly from '../../Public/Images/dkLogoOnly.png';

function MobileNavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = location.pathname.split('/').length === 3;

  const goBack = () => {
    navigate(-1);
  };

  return (
    <nav className="md:hidden flex w-full p-2 justify-between items-center bg-[rgba(16,16,16,0.8)] backdrop-blur-md">
      <button
        className={`${
          showBackButton ? 'visible opacity-100' : 'invisible opacity-0'
        } transition-all duration-200 grid place-items-center hover:bg-[#1c1c1c] p-3 rounded-full`}
        onClick={goBack}
      >
        <BiArrowBack className="text-[28px]" />
      </button>

      <img src={dkLogoOnly} alt="Opinion Logo" className="h-8" />

      <a
        href="https://github.com/WahyuIndG/Opinion-App"
        target="blank"
        className="px-2 text-dkinactive hover:text-dkText transition-all duration-100"
      >
        <TfiGithub className="text-[28px] " />
      </a>
    </nav>
  );
}

export default MobileNavBar;
