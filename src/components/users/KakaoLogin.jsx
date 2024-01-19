import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";


const KakaoLogin = () => {
    const REST_API_KEY = "b1c8c7cf7c907713ad7eab624830d666";
    const REDIRECT_URI = "http://localhost:3000/users/kakaoLogin";
    const CLIENT_SECRET = "a9WrSxojKHq5rb7tu8p4T6qNAeMPJhIA";
    const code = new URL(window.location.href).searchParams.get("code");

    const navigate = useNavigate();

    useEffect(() => {

        const getToken = async () => {
            const payload = qs.stringify({
                grant_type: "authorization_code",
                client_id: REST_API_KEY,
                redirect_uri: REDIRECT_URI,
                code: code,
                client_secret: CLIENT_SECRET,
            });

            try {
                const res = await axios.post(
                    "https://kauth.kakao.com/oauth/token",
                    payload
                );

                //setAccessToken(res.data.access_token);
                getProfile(res.data.access_token);

                navigate("/");
            } catch (err) {
                console.error("에러");
                console.error(err);
            }
        };

        const getProfile = async (accessToken) => {
            try {
                const data = await axios.post(
                    'https://kapi.kakao.com/v2/user/me',
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );

                sessionStorage.setItem('kakaoName', data.data.properties.nickname);
                sessionStorage.setItem('kakaoImage', data.data.properties.profile_image);

                console.log(data);

            } catch (err) {
                console.error(err);
            }
        };

        getToken();
    }, [code, navigate]);

    return null;
};

export default KakaoLogin;
