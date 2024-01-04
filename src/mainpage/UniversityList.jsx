import React, { useEffect } from 'react';
import axios from 'axios';

const UniversityList = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 키를 발급받아서 여기에 넣어주세요
        const apiKey = '182d16ae47f512d7f7416deff20ed926';
        const apiUrl = `https://api-campusinfo.hrdkorea.or.kr/openapi-data/service/campusInfoService/getUniversityList?apiKey=${'182d16ae47f512d7f7416deff20ed926'}&perPage=10`;

        const response = await axios.get(apiUrl);

        // 실제 데이터는 response.data에 있을 것입니다.
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* 가져온 데이터를 이용하여 UI를 렌더링하는 부분 추가 */}
      <h1>대학교 정보</h1>
    </div>
  );
};

export default UniversityList;
