import React, { useRef } from 'react';
import { Currency } from './Currency';
// import emailjs from '@emailjs/browser';
// import { useDispatch } from 'react-redux';
// import { purchaseProduct } from '../store/slices/currencySlice';
// import PurchaseController from '../controllers/purchaseController';
import token from '../assets/Token.png'
import polygon2 from '../assets/polygon2.svg'

export const ProductModal = ({selectedProduct, handleProductPopup, product}) => {
  const form = useRef();
  // const user = useSelector(store => store.User);
  // const dispatch = useDispatch();

  const sendEmail = async (e) => {
    e.preventDefault();
    console.log(selectedProduct);
    // if(form.current[0].value === product.name){
    // const res = await PurchaseController.buyProduct(selectedProduct)
    // if(res.status === 200) {
      // emailjs.sendForm('service_c7a8fas', 'template_iy1fo3l', form.current, 'E84As-WEzq5MmA-3p')
      // .then((result) => {
          // if(result.text) {
            // dispatch(purchaseProduct(selectedProduct));
            // handleProductPopup()
          // }
      // }, (error) => {
          // console.log(error.text);
      // });
    // }
  // } else {
    // console.log('Kindly write the correct name')
  // }
  };

  return (
    <div className="popup-product">
      <div className="currency-value-container">
        <Currency userId='5d66d6b9-b8e5-476f-8248-27ca7cf75be1' />
      </div>
      <form ref={form} onSubmit={sendEmail} className="purchase-form">
        <div className="input-fields purchase-form-inputs">
          <input className="purchase-form-inp hidden-field" type="text" name="product_name" readOnly defaultValue={product.name}/>
          <input className="purchase-form-inp" type="text" placeholder="FULL NAME" name="user_name" />
          <input className="purchase-form-inp" type="email" placeholder="EMAIL" name="user_email" />
          <textarea className="purchase-form-inp" name="address" placeholder="ADDRESS" />
        </div>
        <div className="popup-product-details">
          <img src={product.img} alt="product" className="popup-product-image" />
          <span className="popup-product-name">{product.name}</span>
          <div className="popup-product-price-container">
            <img src={token} alt="single-item-price-logo" className="single-item-price-logo" />
            <span className="single-item-price">{product.price}</span>
          </div>
        <input type="submit" value="Place Order" className="popup-product-submit-btn" />
        <div className="back-btn-container">
        <button type="button" onClick={handleProductPopup} className="product-modal-navigation-btn">
          <img src={polygon2} alt="polygon2" className="product-modal-navigation-btn-polygon" />
          <span className="product-modal-navigation-btn-text">HOME</span>
        </button>
        </div>
        </div>
      </form>
    </div>
  );
};