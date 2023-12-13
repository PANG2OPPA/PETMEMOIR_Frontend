import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import styled from "styled-components";
const BtnStyle = styled.button`
  display: block;
  width: 35%;
  height: 50px;
  border: none;
  background-color: #776B5D;
  border-radius: 10px;
  color: white;
  font-size: 1.2em;
  margin: 0 auto;
`;

const selector = "#payment-widget";
const clientKey = "test_ck_26DlbXAaV06nMWvP60zd8qY50Q9R";
const customerKey = "test_sk_PBal2vxj81vQ6xeZRBye35RQgOAN";

const TossPage = (props) => {
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const{payPrice}=props;
  const [price, setPrice] = useState();

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: price },
        { variantKey: "DEFAULT" }
      );
      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
      
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);


  const ChangePay = (price)=>{
    return Intl.NumberFormat('en-US').format(price);
  }
  return (
    <div style={{margin:"0 auto"}}>
      <div id="payment-widget" />
      <BtnStyle
        onClick={async () => {
          setPrice(payPrice);
          const paymentWidget = paymentWidgetRef.current;
          try {
            await paymentWidget?.requestPayment({
              orderId: nanoid(),
              orderName: "토스 티셔츠 외 2건",
              customerName: "김토스",
              customerEmail: "customer123@gmail.com",
              successUrl: `${window.location.origin}/quick/sucess`,
              failUrl: `${window.location.origin}/quick/sucess`,
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {ChangePay(payPrice)}원결제하기
      </BtnStyle>
    </div>
  );
};
// default 로 이미 사용이 한번되서 에러
export { TossPage };
