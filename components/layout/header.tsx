"use client";

import { useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, ChevronsUpDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignInButton } from "../signin-form/signin-button";
import { menuItems } from "@/constants/constant";
import { Modal } from "antd";
import SignupPage from "@/app/(auth)/sign-up/page";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Notification from "../ui/notification";
import { useDispatch } from "react-redux";
import { logout } from "@/stores/slices/authSlice";
// import { useSelector } from "react-redux";
// import { RootState } from "@/stores";

function Header() {
  const pathname = usePathname();
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [customer, setCustomer] = useState({
    auth: null,
    token: null,
    fullName: null,
    password: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const customerData = localStorage.getItem("customer");
    if (customerData) {
      setCustomer(JSON.parse(customerData));
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenAccount(false);
      }
    }

    if (openAccount) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openAccount]);

  const handleCloseSignUpForm = () => {
    setSignUpModalOpen(false);
  };

  const handleLogOut = () => {
    setOpenAccount(!openAccount);
    dispatch(logout());
    localStorage.removeItem("customer");
    window.location.reload();
  };

  return (
    <header className="bg-primary py-4 px-8 flex items-center justify-between text-white relative z-50">
      <h1
        className="text-3xl font-extrabold cursor-pointer"
        onClick={() => router.push("/")}
      >
        WorkHive
      </h1>
      <nav className="hidden md:flex items-center justify-around gap-10">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className="relative group py-4 pl-6 flex items-center justify-center font-semibold cursor-pointer"
          >
            <Link href={item.path} className="font-medium text-base">
              {item.name}
            </Link>

            <span
              className={`absolute left-0 transform -translate-x-1 h-4 w-4 rounded-full bg-secondary transition-all duration-300 ${
                pathname === item.path
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            ></span>
          </li>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <Link href="/become-owner" className="font-medium hidden md:block">
          <button className="flex gap-2 text-base px-5 py-3 rounded-xl shadow border bg-secondary/60 hover:bg-fourth hover:text-white transition-colors duration-200">
            <BriefcaseBusiness /> Trở thành doanh nghiệp
          </button>
        </Link>
        {customer.token !== null && <Notification />}
        {customer.token === null ? (
          <div className="flex items-center border rounded-xl bg-secondary/60">
            <p
              onClick={() => {
                setSignInModalOpen(true);
                handleCloseSignUpForm();
                setOpenAccount(!openAccount);
              }}
              className="font-medium flex items-center hover:bg-fourth hover:text-white py-3 px-5 rounded-l-xl border-r transition-colors duration-200 cursor-pointer"
            >
              <span>Đăng nhập</span>
            </p>
            <p
              onClick={() => {
                setSignUpModalOpen(true);
                setOpenAccount(!openAccount);
              }}
              className="font-medium flex items-center hover:bg-fourth hover:text-white py-3 px-5 rounded-r-xl border-l transition-colors duration-200 cursor-pointer"
            >
              <span>Đăng ký</span>
            </p>
          </div>
        ) : (
          <div ref={dropdownRef} className="relative">
            <div
              className="group flex items-center justify-center border rounded-xl py-2 px-4 gap-4 group hover:bg-secondary cursor-pointer transition-colors duration-200"
              onClick={() => setOpenAccount(!openAccount)}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full border bg-white"
              />
              <div className="hidden md:flex flex-col justify-center items-start">
                <p className="text-sm font-semibold">{customer.fullName}</p>
              </div>
              <ChevronsUpDown size={20} />
            </div>
            {openAccount && (
              <ul className="absolute top-full right-0 z-10 mt-2 w-auto gap-3 rounded-xl bg-white shadow-xl pb-4 text-black border">
                <div className="flex items-center justify-center py-2 px-4 gap-4 bg-primary rounded-t-xl">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full border bg-white"
                  />
                  <div className="flex flex-col justify-center items-start">
                    <p className="text-sm font-semibold text-white">
                      {customer.fullName}
                    </p>
                  </div>
                </div>
                <Separator className="mb-2" />
                <Link
                  onClick={() => setOpenAccount(!openAccount)}
                  href="/checkout"
                  className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
                >
                  <span>Thanh toán</span>
                </Link>
                <Link
                  onClick={() => setOpenAccount(!openAccount)}
                  href="/profile"
                  className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
                >
                  <span>Hồ sơ</span>
                </Link>
                <Link
                  onClick={() => setOpenAccount(!openAccount)}
                  href="/purchase-history"
                  className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
                >
                  <span>Lịch sử thanh toán</span>
                </Link>
                <Link
                  onClick={() => setOpenAccount(!openAccount)}
                  href="/your-booking"
                  className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
                >
                  <span>Đặt chỗ của bạn</span>
                </Link>
                <Link
                  onClick={() => setOpenAccount(!openAccount)}
                  href="/wallet"
                  className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
                >
                  <span>Ví WorkHive</span>
                </Link>
                <li
                  onClick={handleLogOut}
                  className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
                >
                  <span>Đăng xuất</span>
                </li>
              </ul>
            )}
          </div>
        )}
        <button
          className="md:hidden flex items-center justify-center p-2"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-primary text-white flex flex-col items-center gap-4 py-4 md:hidden">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="font-medium text-base"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/become-owner"
            className="font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <button className="text-base px-5 py-3 rounded-xl shadow hover:bg-secondary bg-[#484848]">
              Trở thành doanh nghiệp
            </button>
          </Link>
        </nav>
      )}

      <Modal
        open={isSignUpModalOpen}
        onCancel={() => setSignUpModalOpen(false)}
        footer={null}
        width={900}
      >
        <SignupPage onCloseSignUpForm={handleCloseSignUpForm} />
      </Modal>

      <SignInButton
        open={isSignInModalOpen}
        onOpenChange={setSignInModalOpen}
        onCloseSignUpForm={handleCloseSignUpForm}
      />
    </header>
  );
}

export default Header;
