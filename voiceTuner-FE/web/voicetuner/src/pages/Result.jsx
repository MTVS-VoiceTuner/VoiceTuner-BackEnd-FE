import { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'; // 쿠키 사용
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from '@emotion/styled';



const cookies = new Cookies();

// 스타일 추가
const FullSizeContainer = styled.div`
  width: 100vw;   /* 화면의 전체 너비 */
  height: 100vh;  /* 화면의 전체 높이 */
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AccordionWrapper = styled.div`
  width: 100%;    /* 부모 컨테이너에 맞게 전체 너비를 차지 */
  height: 100%;   /* 부모 컨테이너에 맞게 전체 높이를 차지 */
  max-width: 800px; /* 선택적으로 최대 너비를 설정 */
`;

const TextWrapper = styled.div`
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap; /* 웹에서도 텍스트 자동 개행 */
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center; /* 버튼을 가운데 정렬 */
  margin-top: 10px; /* 버튼 위에 여백 추가 */
`;

const Result = () => {
  const [resultList, setResultList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      const token = cookies.get('accessToken');

      if (!token) {
        console.error('토큰이 존재하지 않습니다.');
        return;
      }

      try {
        const response = await fetch('http://125.312.216.190:8080/solution/result', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('결과를 가져오는데 실패했습니다.');
        }

        const data = await response.json();
        setResultList(data);

        console.log(data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchResults();
  }, []);

  const onClickHandler = (ai_short_answer) => {
    navigate(`/solution/${ai_short_answer}`);
  };

  return (
    <FullSizeContainer>
      <h2>VoiceTuner</h2>

      <AccordionWrapper>
        <Accordion defaultActiveKey="0">
          {resultList.map((key, index) => (
            <Accordion.Item key={key.solutionId} eventKey={`${index}`}>
              <Accordion.Header>{key.ai_short_answer}</Accordion.Header>
              <Accordion.Body>
                <TextWrapper>
                  <h5>Solution:</h5>
                  <p>{key.ai_answer}</p>
                </TextWrapper>
                <ButtonWrapper>
                  <button
                    className="btn btn-primary"
                    onClick={() => onClickHandler(key.ai_short_answer)}
                  >
                    solution 보기
                  </button>
                </ButtonWrapper>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </AccordionWrapper>
    </FullSizeContainer>
  );
};

export default Result;
