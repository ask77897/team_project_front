import React, { useEffect } from 'react';
import axios from 'axios';

const UniversityList = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = '182d16ae47f512d7f7416deff20ed926';
        const apiUrl = `https://api-campusinfo.hrdkorea.or.kr/openapi-data/service/campusInfoService/getUniversityList?apiKey=${'182d16ae47f512d7f7416deff20ed926'}&perPage=10`;

        const response = await axios.get(apiUrl);

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
    </div>
  );
};

export default UniversityList;
