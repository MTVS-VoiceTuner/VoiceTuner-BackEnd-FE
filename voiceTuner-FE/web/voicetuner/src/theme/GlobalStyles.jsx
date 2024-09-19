
// @jsxImportSource @emotion/react
import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      /* CSS reset */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html,
      body {
        height: 100%;
        font-family: 'Arial', sans-serif;
        background-color: #f8f9fa;
        color: #333;
        display: flex;
        align-items: center;
        flex-direction: column;
        overflow-x: hidden; /* 수평 스크롤 제거 */
        padding: 0;
        margin: 0;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      button {
        cursor: pointer;
      }

      /* 반응형 디자인을 위한 미디어 쿼리 */
      @media (max-width: 768px) {
        .responsive-container {
          width: 95vw; /* 작은 화면에서 너비 조정 */
          padding: 6vh 1vw; /* 작은 화면에서 더 넉넉한 패딩 */
        }
      }

      @media (max-width: 480px) {
        .responsive-container {
          width: 100vw; /* 모바일 화면에서 전체 너비 사용 */
          padding: 7vh 5vw; /* 모바일 화면에서 패딩 조정 */
        }

        h2 {
          font-size: 1.5rem; /* 제목 크기 조정 */
          margin-bottom: 2vh;
        }

        p {
          font-size: 1rem; /* 텍스트 크기 조정 */
          margin-bottom: 3vh;
        }
      }
    `}
  />
);

export default GlobalStyles;
