import { useEffect, useState } from "react";
import { Center } from "../../components/PublicStyle";
import QuickMenu from "../../components/quicksell/QuickMenu";
import styled from "styled-components";
import AxiosApi from "../../api/Axios";
import Slider from "react-slick";

const SellBox = styled.div`
  min-width: 1000px;
  width: 100%;
  @media (max-width: 768px) {
    height: 75vh;
    min-height: 450px;
  }
  .slideBox{
    padding: 2%;
  }
`;


const TitleBox = styled.div`
  width: 100%;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333333;
  h1 {
    font-size: calc(2em + 1vw);
    line-height: 1.5;
    font-weight: bold;
  }
  p {
    font-size: calc(1em + 1vw);
    padding: 2%;
  }

  @media screen and (max-width: 768px) {
    h1 {
      font-size: 1.3em;
    }
    p {
      font-size: 1em;
    }
  }
`;

const Quickmain = () => {
  const [type, setType] = useState("DOG");
  const [feedList, setFeedList] = useState();

  useEffect(() => {
    const FeedsList = async () => {
      try {
        console.log(type);
        const resp = await AxiosApi.FeedList(type); //전체 조회
        if (resp.status === 200) {
          setFeedList(resp.data);
          console.log(resp.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    FeedsList();
  }, [type]);

  const onselect = (sel) => {
    setType(sel);
  };

  const settings = {
    slide: "div",
    autoplay: false, // 자동 스크롤 사용 여부
    pauseOnHover: true,
    autoplaySpeed: 2000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    infinite: false, // 무한
    dots: false, //
    speed: 20,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    responsive: [
      {
        breakpoint: 1280, //화면 사이즈 960px일 때
        settings: {
          slidesToShow: 3, //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
        },
      },
      {
        breakpoint: 768, //화면 사이즈 768px일 때
        settings: {
          centerMode: true, // 중앙 정렬을 위해 추가
          autoplay: true,
          slidesToShow: 1, //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
        },
      },
    ],
  };

  return (
    <div>
      <Center>
        <TitleBox>
          <h1>PETMEMOIR와 함께 하는 귀여운 내 애완동물 관리하기! </h1>
          <h1> 맴버쉽을 통하여 이제 사료, 간식 걱정없이 키우세요! </h1>
          <p>🔻🔻 나만의 구독 서비스를 원한다면 선택해주세요 🔻🔻 </p>
        </TitleBox>
        <SellBox>
          <Slider {...settings}>
            <div className="slideBox">
            <QuickMenu
              title={"ONE MONTH FREE"}
              list1={"멍냥 일기 작성 무제한"}
              list2={"반려동물 등록 최대 1마리"}
              list3={"체험판 간식 무료 배송"}
              list4={"그밖의 다양한 기능"}
              dataList={feedList}
              title2={"첫달 무료 체험"}
              onSelected={onselect}
            />
            </div>
            <div className="slideBox">
            <QuickMenu
              title={"STANDARD"}
              list1={"멍냥 일기 작성 무제한"}
              list2={"반려동물 등록 최대 3마리"}
              list3={"STANDARD  정기배송"}
              list4={"그밖의 다양한 기능"}
              dataList={feedList}
              title2={"99,000원/월"}
              onSelected={onselect}
            />
            </div>
            <div className="slideBox">
            <QuickMenu
              title={"PREMIUM"}
              list1={"멍냥 일기 작성 무제한"}
              list2={"반려동물 등록 무제한"}
              list3={"PREMIUM 정기배송"}
              list4={"그밖의 다양한 기능"}
              dataList={feedList}
              title2={"129,000원/월"}
              onSelected={onselect}
            />
            </div>
          </Slider>
        </SellBox>
      </Center>
    </div>
  );
};

export default Quickmain;
