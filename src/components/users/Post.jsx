import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import './Post.css';

const Post = () => {
    const [zodecode, setZonecode] = useState('');
    const [address, setAddress] = useState('');
    const [isOpen, setIsOpen] = useState('false');

    const handlePostcodeClick = () => {
        setIsOpen((isOpen) => !isOpen);
      };

    const handleComplete = (data) => {
        const { address, zonecode } = data;
        setZonecode(zonecode);
        setAddress(address);
      };

    const closeHandler = (state) => {
        setIsOpen(true);
    };
    
    return (
        <div style={{ marginLeft: '30px' }}>
            <div className="address_search">
                <input style={{ width: '400px' }} className="user_enroll_text1" placeholder=" 우편번호" type="text" required={true} name="address1" value={zodecode} />
                <Button style={{ marginLeft: '5px', borderRadius: '10px' }} onClick={handlePostcodeClick}>주소찾기</Button><br />
                <input style={{ width: '500px', marginTop: '10px'}} className="user_enroll_text2" placeholder=" 주소" type="text" name="address2" value={address}/><br />
                <input style={{ width: '500px', marginTop: '10px'}} className="user_enroll_text3" placeholder=" 상세주소" type="text" name="address3"/>
            </div>
            <div style={{ marginLeft: '120px', marginTop: '10px', width: '200px' }}>
                {!isOpen && (<div><DaumPostcode
                    autoClose
                    onComplete={handleComplete}
                    onClose={closeHandler}
                />
                </div>
                )}
            </div>
        </div>
    );
};

export default Post;
