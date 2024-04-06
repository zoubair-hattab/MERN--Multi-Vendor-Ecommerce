import React, { useState } from 'react';
import Header from '../components/layout/Header';
import SideBar from '../components/profile/SideBar';
import ProfileContent from '../components/profile/ProfileContent';

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className="container grid grid-cols-12  gap-6 py-16  relative">
        <div className="col-span-2  md:w-full md:col-span-4 lg:col-span-3 ">
          <SideBar active={active} setActive={setActive} />
        </div>

        <div className="col-span-10 md:col-span-8 lg:col-span-9 ">
          <ProfileContent active={active} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
