/**
 *
 * @param {*} data EnrollMercenaryData
 */

// MercenaryEnrollForm에서 제출된 데이터를 서버의 /api/Mercenary-enroll 엔드 포인트로 전송합니다.


export async function postMercenaryEnroll(data) {
  
  // fetch : API를 사용하여 POST 요청을 보낸다.
  await fetch('/api/Mercenary-enroll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // 요청 헤더에 'Content-Type':'application/json'을 설정하여 JSON형식의 데이터르 전송한다.
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json()) // 서버의 응답을 응답을 JSON으로 파싱하고, 성공 또는 오류 메세지를 콘솔에 출력한다.
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}