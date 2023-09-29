import React, { useState } from "react";
import { TextInput, PasswordInput } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { MdEmail,MdPassword } from "react-icons/md";
import { useFormik } from "formik";
import { loginSchema } from "../../validations";
import { Link } from "react-router-dom";
import AuthController from "../../controllers/authContoller";
import ToastController from "../../controllers/toastController";
import { useTranslation } from "react-i18next";
import Logo from "../../components/module/Logo";
import Navbar from "../../components/module/Navbar";

const lngs = [
  { code: "en", native: "English" },
  { code: "de", native: "German" },
];

const LoginView = () => {
  const {t
    , i18n
  } = useTranslation();
  const handleTrans = (code) => {
    i18n.changeLanguage(code);
  };

  const [processing, setProcessing] = useState(false)
  const { errors, getFieldProps, touched, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (data) => {
      setProcessing(true)
      AuthController.logIn(data).then(res => {
        setProcessing(false)
        ToastController.success("Login Successfully!")
      }).catch(err => {
        setProcessing(false)
        ToastController.error(err)

      })
    }
  });

  return (
    <div className="w-full">
    <Navbar/>
    <div className="w-full  p-5 flex items-center justify-center">
      <div className="max-w-[400px]  w-full flex flex-col">
        <h2 className=" text-xl text-black font-bold">{t('welcomeback')}</h2>
        <p className="mb-5 text-sm text-gray-600 font-medium">
        {t('signin')}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative w-full">
            <TextInput
              lable={t('email_label')}
              placeHolder={t('email_placeholder')}
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
              lable={t(`password_label`)}
              placeHolder={t('password_placeholder')}
              wrapperClass={`w-full`}
              icon={MdPassword}
              name={`password`}
              {...getFieldProps(`password`)}
            />
            <span className="text-[#CC2936] tracking-wide absolute  left-2 text-[10px] -bottom-5 ">
              {touched["password"] && errors["password"]}
            </span>
          </div>
          <Button type={`submit`} title={t('sign_in_btn')} loading={processing} loadTitle={t('sign_in_btn_loading')} className={`mt-3`}></Button>
        </form>
        <span className="mt-10 text-gray-600 text-sm text-center">
        {t('no_account')} <Link className="ml-1 text-black font-bold" to={`/signup`}>{t('create_account_btn')}</Link>
        </span>
        <div className="flex gap-3 mt-5 items-center justify-center">
          {lngs.map((lng) => {
            const { code, native } = lng;
            return <button className="bg-black px-4 py-2 font-bold text-xs text-white rounded-md" onClick={() => handleTrans(code)}>{native}</button>;
          })}
        </div>
      </div>
     
    </div>
    </div>
  );
};

export default LoginView;
