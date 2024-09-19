import { useState, useEffect } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
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

  return (
    <Accordion defaultActiveKey="0">
      {resultList.map((item, index) => (
        <Accordion.Item key={item.id} eventKey={`${index}`}>
          <Accordion.Header>{item.title}</Accordion.Header>
          <Accordion.Body>
            {item.body}
            <button onClick={() => onClickHandler(item.tag)}>solution</button>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Result;