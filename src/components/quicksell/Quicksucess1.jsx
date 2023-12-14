import styled from "styled-components";
import { ReactComponent as QrcodeImg } from "../../img/qr코드.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import AxiosApi from "../../api/Axios";
import { useEffect, useState } from "react";
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;

  h1 {
    font-size: 30px;
    font-weight: bold;
    padding: 20px;
  }
  h3 {
    padding: 15px;
    font-size: 12px;
    font-weight: bold;
    color: gray;
  }
`;
const TitleBox1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 300px;
  border-top: 2px solid grey;
  h1 {
    display: flex;
    align-items: center;
    padding: 3% 3%;
  }
  h2 {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 800;
    width: 30%;
  }
  h3 {
    font-size: 12px;
    font-weight: bold;
    padding-left: 20px;
  }
`;

const SellButton = styled.button`
  margin: 20px;
  width: 150px;
  height: 40px;
  background-color: #776b5d;
  color: white;
  border: 0;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
`;

const Quicksucess1 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const{num}=useParams();
  const[saleList,setSaleList]=useState([]);


  useEffect(() => {
    const SaleReg = async () => {
      try {
        const resp = await AxiosApi.SaleInfo(num); //결제내역조회
        if (resp.status === 200 ){
          console.log(resp.data);
          setSaleList(resp.data);
        }else {
          console.log("정보가 존재하지 않습니다.")
          navigate("/")
      }
      } catch (e) {
            console.log(e);
      }};
      SaleReg();
    }, []);

    


  const ChangePay = (price)=>{
    return Intl.NumberFormat('en-US').format(price);
  }

  return (
    <>
      <TitleBox>
        <h1>결제가 완료되었습니다.</h1>
        <h3>
          구독 서비스 결제 감사합니다 . 최선을 다하는 멍냥멍냥이 되겠습니다.
        </h3>
        <h3>{searchParams.get("paymentKey")}</h3>
      </TitleBox>
      <TitleBox1>
        <h1>
          <h2>결제수단</h2>
          <h3>카드 결제 / 카카오페이</h3>
        </h1>
        <h1>
          <h2>결제하신 금액 </h2>
          <h3>{saleList.salesPrice}원 </h3>
        </h1>
        <h1>
          <h2>구독명 / 사료명</h2>
          <h3>{saleList.salesName} 구독 / {saleList.feedName}</h3>
        </h1>
        <h1>
          <h2>구매일자</h2>
          <h3>{saleList.salesRegDate}</h3>
        </h1>
      </TitleBox1>
      <TitleBox1 style={{ borderBottom: "2px solid grey" }}>
        <h1>
          <h2>배송지</h2>
          <h3>{saleList.salesAddr}</h3>
        </h1>
        <h1>
          <h2>배송일자</h2>
          <h3>{saleList.salesDelivery}</h3>
        </h1>
        <h1>
        <h2>정기 배송일</h2>
          <h3> 매월 {saleList.salesAutoDelivery} 일</h3>
        </h1>
      </TitleBox1>
      <QrcodeImg />
      <div>
        <SellButton onClick={() => navigate("/")}>홈으로</SellButton>
        <SellButton onClick={() => navigate("/quick/sales")}>
          구매내역
        </SellButton>
      </div>
    </>
  );
};

export default Quicksucess1;
