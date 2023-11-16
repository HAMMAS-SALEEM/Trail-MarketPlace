import React, { useRef, useState } from 'react';
import { Currency } from './Currency';
import emailjs from '@emailjs/browser';
import { useDispatch, useSelector } from 'react-redux';
import { purchaseProduct } from '../store/slices/currencySlice';
import PurchaseController from '../controllers/purchaseController';
import token from '../assets/Token.png'
import polygon2 from '../assets/polygon2.svg'
import congrats from '../assets/congrats.gif'
import { RotatingSquare } from 'react-loader-spinner';
import { ErrorPopup } from './ErrorPopup';

export const ProductModal = ({selectedProduct, handleProductPopup, product}) => {
  const [purchased, setPurchased] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false)
  const form = useRef();
  const user = useSelector(store => store.User);
  const dispatch = useDispatch();

  const title = 'Error';
  const message = 'Try again or Try later'

  const handleErrorPopup = () => setError(!error)

  const sendEmail = async (e) => {
    e.preventDefault();
    form.current[0].value = product.name
    console.log(selectedProduct);
      setSpinner(true);
    const res = await PurchaseController.buyProduct(selectedProduct)
    if(res.status === 200) {
      emailjs.sendForm('service_c7a8fas', 'template_iy1fo3l', form.current, 'E84As-WEzq5MmA-3p')
      .then((result) => {
          if(result.text) {
            setSpinner(false)
            dispatch(purchaseProduct(selectedProduct));
            setPurchased(true);
          }
      }, (error) => {
          setSpinner(false);
          setError(true);
          return error
      });
    }
  }

  return (
    <> 
      <div className="popup-product">
      {
      purchased ? <div className="purchased-item-container">
        <div className="purchased-item">
          <img src={product.img} alt="product" className="purchased-item-image" />
          <span className="purchased-item-text">PURCHASED</span>
          <img className="purchased-item-congrats-image" src={congrats} alt="congratulations text" />
        </div>
        <button type="button" onClick={handleProductPopup} className="product-modal-navigation-btn">
          <img src={polygon2} alt="polygon2" className="product-modal-navigation-btn-polygon" />
          <span className="product-modal-navigation-btn-text">HOME</span>
        </button>
      </div> :
        <>
        <div className="currency-value-container">
          <Currency userId={user.user.sub} />
        </div>
        <form ref={form} onSubmit={sendEmail} className="purchase-form">
        <div className="input-fields purchase-form-inputs">
          <input className="purchase-form-inp hidden-field" type="text" name="product_name" readOnly defaultValue={product.name}/>
          <input className="purchase-form-inp" type="text" placeholder="FULL NAME" name="user_name" required />
          <input className="purchase-form-inp" type="email" placeholder="EMAIL" name="user_email" required />
          <textarea className="purchase-form-inp" name="address" placeholder="ADDRESS" required />
        </div>
        <div className="popup-product-details">
          <img src={product.img} alt="product" className="popup-product-image" />
          <span className="popup-product-name">{product.name}</span>
          <div className="popup-product-price-container">
            <img src={token} alt="single-item-price-logo" className="single-item-price-logo" />
            <span className="single-item-price">{product.price}</span>
          </div>
          <input type="submit" value="Confirm Order" className="popup-product-submit-btn" />
          {
            spinner ? <div className="spinner-overlay">
              <RotatingSquare
              ariaLabel="rotating-square"
              visible={true}
              color="#9cc055"
              strokeWidth="10"
              />
            </div> : ''
          } 
          {
            error ? <ErrorPopup handleErrorPopup={handleErrorPopup} title={title} message={message} /> : ''
          }
        <div className="back-btn-container">
        <button type="button" onClick={handleProductPopup} className="product-modal-navigation-btn">
          <img src={polygon2} alt="polygon2" className="product-modal-navigation-btn-polygon" />
          <span className="product-modal-navigation-btn-text">HOME</span>
        </button>
        </div>
        </div>
      </form>
        </>
      }
      </div>
    </>
  );
  }