import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Home", to: "home", current: true },
  { name: "About", to: "about", current: false},
];

const handleScroll = (section) => {
  const Section = document.getElementById(section);
  console.log(Section);
  Section?.scrollIntoView({ behavior: "smooth" });
};

export default function MyNavbar() {
  return (
   
    <div className="flex bg-gradient-to-b from-black to-gray-800 justify-center w-full ">
      <Disclosure
        as="nav"
        className="border border-cyan-300 shadow-2xl w-full rounded-xl fixed z-10 mt-2 backdrop-blur-lg md:backdrop-blur-md "
      >
        <div className= " w-full flex items-center justify-center">
          <div className="relative w-4/5 flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden ">
              <DisclosureButton className="custom-btn group relative inline-flex items-center justify-center rounded-md">
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>

            {/* Logo */}
            <div className="flex flex-shrink-0 items-center">
              <div className="text-3xl text-slate-300">CPGA</div>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:flex sm:space-x-4">
              {navigation.map((item) => (
                <NavLink
                  onClick={() => handleScroll(item.to)}
                  key={item.name}
                  aria-current={item.current ? "page" : undefined}
                  className="text-white hover:bg-gray-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Login and Signup Buttons */}
            <div className="hidden sm:flex gap-4">
              <NavLink to="/login" className="custom-btn ">
                Login
              </NavLink>
              <NavLink to="/register" className="custom-btn">
                Signup
              </NavLink>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <DisclosurePanel className="sm:hidden w-full flex flex-col items-center">
          <div className="w-4/5">
            {navigation.map((item) => (
              <NavLink
                onClick={() => handleScroll(item.to)}
                key={item.name}
                aria-current={item.current ? "page" : undefined}
                className="text-white hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-left font-medium"
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink to="/login" className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
              Login
            </NavLink>
            <NavLink to="/register" className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
              Signup
            </NavLink>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
