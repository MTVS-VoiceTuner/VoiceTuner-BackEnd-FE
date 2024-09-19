import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams를 사용하여 URL 파라미터에서 tag 값을 가져옴
import axios from 'axios';
import '../components/Solution.css'; // 스타일을 적용하기 위해 별도의 CSS 파일을 사용

const Solution = () => {
    // YouTube API 검색 결과를 저장할 상태 변수
    const [videos, setVideos] = useState([]);
    const { tag } = useParams(); // URL 파라미터에서 tag 값을 가져옴
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; // 여기에 본인의 YouTube API 키를 입력하세요

    // 유튜브 검색 API 요청 함수
    const searchVideos = async (query) => {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',  // 결과의 정보 세부 내용을 포함한 필드
                    q: query,         // 검색어, 여기서는 "노래연습"과 tag를 조합
                    type: 'video',    // 비디오 유형으로만 검색
                    maxResults: 5,   // 검색 결과의 최대 개수
                    key: API_KEY,     // YouTube API 키
                },
            });
            setVideos(response.data.items); // 응답으로부터 가져온 비디오 목록을 상태 변수에 저장
        } catch (error) {
            console.error('Error fetching YouTube data', error);
        }
    };

    // 컴포넌트가 마운트되거나 tag 값이 변경될 때마다 유튜브 검색 수행
    useEffect(() => {
        if (tag) {
            const query = `노래 연습 ${tag}`; // "노래연습"과 tag를 결합하여 검색어 생성
            searchVideos(query); // 검색어로 유튜브 비디오 검색 함수 호출
        }
    }, [tag]); // tag 값이 변경될 때마다 검색 수행

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>{tag} Solution</h1> {/* 현재 검색 중인 tag를 화면에 표시 */}

            {/* 검색 결과를 화면에 출력 */}
            <div>
                {videos.map((video) => (
                    <div key={video.id.videoId} style={{ margin: '20px 0'}}>
                        {/* 비디오 제목을 출력 */}
                        {video.snippet.title}

                        {/* YouTube iframe을 통해 비디오 바로 표시 */}
                        <div className="video-container" style={{textAlign: 'center' }}> {/* 비디오를 감싸는 div */}
                            <iframe
                                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={video.snippet.title}
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Solution;
