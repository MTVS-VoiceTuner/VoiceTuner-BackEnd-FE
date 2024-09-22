import { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { getResultList } from '../apis/resultAPI';
import { useNavigate } from 'react-router-dom'; // useNavigate 사용
import 'bootstrap/dist/css/bootstrap.min.css';

const Result = () => {
  const [resultList, setResultList] = useState([]);
  const navigate = useNavigate(); // useNavigate 사용

  useEffect(() => {
    const results = getResultList();
    setResultList(results);
  }, []);

  // 버튼 클릭 시 해당 tag를 Solution 컴포넌트로 전달
  const onClickHandler = (tag) => {
    navigate(`/solution/${tag}`); // 해당 tag를 URL에 포함하여 페이지 이동
  };

  

  // 아코디언 라이브러리 설치 후 사용 
  return (
    <>
      <h2>누구누구의 결과창</h2>

      <Accordion defaultActiveKey="0"> {/*첫번째 아코디언이 열려있는지 결정 0 : true, 1 : false */}
        {/* resultList 배열의 요소를 순회하면서 렌더링한다.*/}
        {resultList.map((item, index) => (
          <Accordion.Item key={item.id} eventKey={`${index}`}> {/*각 아이템에 고유한 key값을 부여-id*/}
            <Accordion.Header>{item.title}</Accordion.Header>  {/*아코디언 제목(result title)*/}
            <Accordion.Body>{/*아코디언 내용*/}
              {item.body} {/*결과 내용 - 이미지화 또는 텍스트 */}
              <button onClick={() => onClickHandler(item.tag)}>solution</button> {/* 솔루션 이동 버튼 */}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default Result;