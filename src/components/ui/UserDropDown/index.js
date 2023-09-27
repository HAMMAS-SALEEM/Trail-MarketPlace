import { MdArrowDropDown } from "react-icons/md";

import React, { useState } from "react";
import AuthController, {
  useCurrentuser,
} from "../../../controllers/authContoller";
import { useHandleOutsideClick } from "../../../hooks";
import { DropdownMenu, MenuList } from "../DropDown";
import { RiUser2Fill } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

const lngs = [
  { code: "en", native: "English" },
  { code: "de", native: "German" },
];

const UserDropDown = ({ setIsSideBarOpen, isSideBarOpen }) => {
  const { t, i18n } = useTranslation();
  const handleTrans = (code) => {
    i18n.changeLanguage(code);
  };
  const [isMenu, setIsMenu] = useState(false);
  const [isLng, setIsLng] = useState(false);
  const user = useCurrentuser();
  const dropdownRef = useHandleOutsideClick(() => setIsMenu(false));
  const lngRef = useHandleOutsideClick(() => setIsLng(false));
  return (
    <div className="flex gap-3 items-center">
      <div
        ref={lngRef}
        onClick={() => setIsLng(!isLng)}
        className="relative cursor-pointer !text-white"
      >
        <MdLanguage className="text-black/70 text-2xl" />
        <div>
          <DropdownMenu
            mainClass={"!top-10 2xl:!top-12 !bg-black/90"}
            isOpen={isLng}
          >
            {lngs.map((lng) => {
              const { code, native } = lng;
              return (
                <MenuList className="" onClick={() => handleTrans(code)}>
                  {native}
                </MenuList>
              );
            })}
          </DropdownMenu>
        </div>
      </div>
      <div
        ref={dropdownRef}
        onClick={() => setIsMenu(!isMenu)}
        className="rounded-full relative cursor-pointer px-2 py-1 flex  items-center justify-center border-[1px] border-black !text-white"
      >
        <img src="/Images/user.png" alt="user" width={20} height={20} />
        <MdArrowDropDown className="text-black text-lg" />
        <div>
          <DropdownMenu
            mainClass={"!top-10 2xl:!top-12 !bg-black/90"}
            isOpen={isMenu}
          >
            <MenuList>
              <div className="flex gap-2 ">
                <RiUser2Fill className="" />
                <p className="">{user?.username}</p>
              </div>
            </MenuList>
            <MenuList
              onClick={() => {
                AuthController.logout();
              }}
              icon={<BiLogIn />}
            >
              {t("logout")}
            </MenuList>
          </DropdownMenu>
        </div>
      </div>
      <div
        className="text-lg  text-black max-w-max cursor-pointer "
        onClick={() => {
          setIsSideBarOpen(!isSideBarOpen);
        }}
      >
        <FiMenu />
      </div>
    </div>
  );
};

export default UserDropDown;
