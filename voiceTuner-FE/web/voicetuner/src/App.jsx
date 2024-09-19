import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from './theme/GlobalStyles';
import theme from './theme/theme';
import Landing from './pages/Landing';
// import Footer from './components/layout/Footer';
import AppContainer from './components/layout/AppContainer/AppContainer';
import Login from './pages/Login';
import Result from './pages/Result';
import Solution from './pages/Solution';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/result" element={<Result />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="/solution/:tag" element={<Solution />} /> {/* tag를 URL 파라미터로 전달 */}
          </Routes>
        </AppContainer>
        {/* <Footer /> */}
      </Router>
    </ThemeProvider>
  );
};

export default App;