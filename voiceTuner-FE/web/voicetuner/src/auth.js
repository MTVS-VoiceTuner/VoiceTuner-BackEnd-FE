import Cookies from 'universal-cookie'
const cookies = new Cookies(); // 쿠키 사용을 선언

// 쿠키는 키:값 형태로 저장되기 때문에 cookies.set()메서드로 동일하게 키와값을 저장한다.
export function setAccessTokenToCookie(accessToken) {
    cookies.set('accessToken', accessToken, {
        sameSite: 'strict',
        path: '/', // 모든 경로에서 접근 가능하게 설정
        // maxAge나 expires 옵션을 설정하지 않음 (세션 쿠키)
    });
}

export function logout() {
    console.log('localStorage set logout!');
    window.localStorage.setItem('logout', Date.now());
    cookies.remove('refresh_token');
}