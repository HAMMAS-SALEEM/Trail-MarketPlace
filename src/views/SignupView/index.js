import { useFormik } from "formik";
import React, { useState } from "react";
import { signupSchema } from "../../validations";
import { PasswordInput, TextInput } from "../../components/ui/Input";
import { MdEmail, MdPassword } from "react-icons/md";
import { RiUserSmileFill } from "react-icons/ri";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import AuthController from "../../controllers/authContoller";
import { useNavigate } from "react-router-dom";
import ToastController from "../../controllers/toastController";
import { useTranslation } from "react-i18next";
import "./SignupView.css";
import Navbar from "../../components/module/Navbar";

const lngs = [
  { code: "en", native: "English" },
  { code: "de", native: "German" },
];

const SignupView = () => {
  const { t, i18n } = useTranslation();
  const handleTrans = (code) => {
    i18n.changeLanguage(code);
  };

  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const { errors, getFieldProps, touched, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (data) => {
      setProcessing(true);
      data = {
        username: data?.username,
        email: data?.email,
        password: data?.password,
      };
      AuthController.signup(data)
        .then((res) => {
          setProcessing(false);
          ToastController.success("Check your Mail To Proceed Further!");
          setTimeout(() => {
            navigate("/");
          }, 300);
        })
        .catch((err) => {
          ToastController.error(err);
          setProcessing(false);
        });
    },
  });

  return (
    <div>
      <Navbar/>
      <div className="w-full p-5 flex items-center justify-center">
        <div className="max-w-[400px] w-full flex flex-col">
          <h2 className=" text-xl text-black font-bold">
            {t("account_form_title")}
          </h2>
          <p className="mb-5 text-sm text-gray-600 font-medium">
            {t("account_form_desc")}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative w-full">
              <TextInput
                lable={t("username_label")}
                placeHolder={t("username_placeholder")}
                wrapperClass={`w-full`}
                icon={RiUserSmileFill}
                name={`username`}
                {...getFieldProps(`username`)}
              />
              <span className="text-[#CC2936] tracking-wide absolute  left-2 text-[10px] -bottom-5 ">
                {touched["username"] && errors["username"]}
              </span>
            </div>
            <div className="relative w-full">
              <TextInput
                lable={t("email_label")}
                placeHolder={t("email_placeholder")}
                wrapperClass={`w-full`}
                icon={MdEmail}
                name={`email`}
                {...getFieldProps(`email`)}
              />
              <span className="text-[#CC2936] tracking-wide absolute  left-2 text-[10px] -bottom-5 ">
                {touched["email"] && errors["email"]}
              </span>
            </div>
            <div className="relative w-full">
              <PasswordInput
                lable={t("password_label")}
                placeHolder={t("password_placeholder")}
                wrapperClass={`w-full`}
                icon={MdPassword}
                name={`password`}
                {...getFieldProps(`password`)}
              />
              <span className="text-[#CC2936] tracking-wide absolute  left-2 text-[10px] -bottom-5 ">
                {touched["password"] && errors["password"]}
              </span>
            </div>
            <div className="relative w-full">
              <PasswordInput
                lable={t("confirm_password_label")}
                placeHolder={t("confirm_password_placeholder")}
                wrapperClass={`w-full`}
                icon={MdPassword}
                name={`confirmPassword`}
                {...getFieldProps(`confirmPassword`)}
              />
              <span className="text-[#CC2936] tracking-wide absolute  left-2 text-[10px] -bottom-5 ">
                {touched["confirmPassword"] && errors["confirmPassword"]}
              </span>
            </div>
            <Button
              type={`submit`}
              loading={processing}
              title={t("sign_up_btn")}
              loadTitle={t(`sign_up_btn_loading`)}
              className={`mt-3`}
            ></Button>
          </form>
          <span className="mt-10 text-gray-600 text-sm text-center">
            {t("have_account")}{" "}
            <Link className="ml-1 text-black font-bold" to={`/`}>
              {t("login_btn")}
            </Link>
          </span>
        </div>
        {/* <div className="language-trns-btn-container">
          {lngs.map((lng) => {
            const { code, native } = lng;
            return <button className='language-translator-btn' onClick={() => handleTrans(code)}>{native}</button>;
          })}
        </div> */}
      </div>
    </div>
  );
};

export default SignupView;
