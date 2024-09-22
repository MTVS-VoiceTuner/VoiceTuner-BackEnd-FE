import { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'; // 쿠키 사용
import 'bootstrap/dist/css/bootstrap.min.css';

const cookies = new Cookies();

const Result = () => {
  const [resultList, setResultList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      const token = cookies.get('accessToken'); // 쿠키에서 토큰 가져오기
      console.log("accessoken : " + token)

      if (!token) {
        console.error('토큰이 존재하지 않습니다.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/solution/find-song', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // 헤더에 토큰 추가
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('결과를 가져오는데 실패했습니다.');
        }

        const data = await response.json();
        setResultList(data); // 가져온 데이터를 상태에 저장

      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchResults();
  }, []);

  const onClickHandler = (tag) => {
    navigate(`/solution/${tag}`);
  };

  return (
    <>
      <h2>누구누구의 결과창</h2>

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
    </>
  );
};

export default Result;