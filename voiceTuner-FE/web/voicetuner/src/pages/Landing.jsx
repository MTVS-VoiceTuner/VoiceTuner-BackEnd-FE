import { useNavigate } from 'react-router-dom';


function Landing() {
  const navigate = useNavigate();

  const goLoginPage = () => {
    navigate('/login');
  };

  const goResultPage = () => {
    navigate("/result");
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Landing Page</h1>
      <button onClick={goLoginPage}>로그인 페이지로 이동</button>
      <button onClick={goResultPage}>결과 페이지로 이동</button>
    </div>
  );
};

export default Landing;