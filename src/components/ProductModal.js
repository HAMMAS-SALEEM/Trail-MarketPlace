import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useDispatch } from 'react-redux';
import { purchaseProduct } from '../store/slices/currencySlice';
import PurchaseController from '../controllers/purchaseController';

export const ProductModal = ({selectedProduct, handleProductPopup, productName, description}) => {
  const form = useRef();
  const dispatch = useDispatch();

  const sendEmail = async (e) => {
    e.preventDefault();
    if(form.current[0].value === productName){
    const res = await PurchaseController.buyProduct(selectedProduct)
    if(res.status === 200) {
      emailjs.sendForm('service_c7a8fas', 'template_iy1fo3l', form.current, 'E84As-WEzq5MmA-3p')
      .then((result) => {
          if(result.text) {
            dispatch(purchaseProduct(selectedProduct));
            handleProductPopup()
          }
      }, (error) => {
          console.log(error.text);
      });
    }
  } else {
    console.log('Kindly write the correct name')
  }
  };

  return (
    <div className="popup-product">
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="product_name" readOnly defaultValue={productName}/>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Shipping Address</label>
        <textarea name="address" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};