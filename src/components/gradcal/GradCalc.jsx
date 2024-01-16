import React, { useEffect, useState } from 'react';
import { Row, Card, Table, Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdAddCircleOutline } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { CiCalculator1 } from "react-icons/ci";
import { FaSave } from "react-icons/fa";


function GradCalc() {
    const initialSubject = { subject: '', score1: '', score2: '', grade: '', isMajor: false };
    const [subjects, setSubjects] = useState([initialSubject]);
    const [totalScore1, setTotalScore1] = useState(0);
    const [totalScore2, setTotalScore2] = useState(0);
    const [totalGrade, setTotalGrade] = useState(0);

    const handleAddRow = () => {
        setSubjects([...subjects, initialSubject]);
    };

    const handleReset = () => {
        setSubjects([initialSubject]);
        setTotalScore1(0);
        setTotalScore2(0);
        setTotalGrade(0);
    };

    const handleScore1Change = (index, value) => {
        // 입력값을 정수로 변환하고 범위를 0에서 100으로 제한합니다.
    const parsedValue = parseInt(value, 10);
    const clampedValue = Math.min(Math.max(parsedValue, 0), 100);

    // subjects 배열을 복제하고 변경된 값으로 업데이트합니다.
    const newSubjects = [...subjects];
    newSubjects[index].score1 = clampedValue;
    setSubjects(newSubjects);
    };

    
    const handleScore2Change = (index, value) => {
    // 입력값을 정수로 변환하고 범위를 1에서 3으로 제한합니다.
    const parsedValue = parseInt(value, 10);
    const clampedValue = Math.min(Math.max(parsedValue, 1), 3);

    // subjects 배열을 복제하고 변경된 값으로 업데이트합니다.
    const newSubjects = [...subjects];
    newSubjects[index].score2 = clampedValue;
    setSubjects(newSubjects);
    };

    useEffect(() => {
        calculateTotal1();
        //calculateTotal2();
    }, [subjects]);

    const calculateTotal1 = () => {
        const sum1 = subjects.reduce((acc, subject) => acc + subject.score1, 0);
        setTotalScore1(sum1);
        const sum2 = subjects.reduce((acc, subject) => acc + subject.score2, 0);
      setTotalScore2(sum2);


        
        // 학점 변환 기준을 정의합니다. 필요에 따라 수정 가능합니다.
        const gradingSystem = {
            A: 90,
            B: 80,
            C: 70,
            D: 60,
            F: 0,
        };

        // 총점에 대응하는 학점을 찾습니다.
        let totalGrade = Object.keys(gradingSystem).find(grade => (sum1/subjects.length) >= gradingSystem[grade]);   ///grade 뒷부분에서 학점계산 로직 작성하기
        totalGrade = totalGrade || 'F'; // 학점이 없으면 'F'로 기본 설정합니다.
        setTotalGrade(totalGrade);
    };


/*
    const calculateTotal2 = () => {
      const sum2 = subjects.reduce((acc, subject) => acc + subject.score2, 0);
      setTotalScore2(sum2);
      // 학점 변환 기준을 정의합니다. 필요에 따라 수정 가능합니다.
      const gradingSystem = {
          A: 90,
          B: 80,
          C: 70,
          D: 60,
          F: 0,
      };

      // 총점에 대응하는 학점을 찾습니다.
      let totalGrade = Object.keys(gradingSystem).find(grade => sum2 >= gradingSystem[grade]);
      totalGrade = totalGrade || 'F'; // 학점이 없으면 'F'로 기본 설정합니다.
      setTotalGrade(totalGrade);
  };
*/
    return (
        <div className='my-5 mx-5 m-5 p-3'>
            <h1 className='text-center mb-5'>학점 계산기</h1>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <Card className='p-3'>
                        <div className='Button text-end my-2'>
                            {/* <Button variant="success" size="sm">
                                계산하기 <CiCalculator1 />
                            </Button> */}
                        </div>
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className='text-center'>과목</th>
                                        <th className='text-center'>점수</th>
                                        <th className='text-center'>학점</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjects.map((subject, index) => (
                                        <tr key={index}>
                                            <td className='text-center'>
                                                <Form.Control />
                                            </td>
                                            <td className='text-center'>
                                                <Form.Control
                                                    type="number"
                                                    value={subject.score1}
                                                    onChange={(e) => handleScore1Change(index, e.target.value)}
                                                />
                                            </td>
                                            <td className='text-center'>
                                                <Form.Control
                                                    type="number"
                                                    value={subject.score2}
                                                    onChange={(e) => handleScore2Change(index, e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className='Button text-end'>
                                <Button id="add" style={{ marginLeft: '5px', borderRadius: '20px',  fontSize: '13px', color: 'black' }} variant="warning px-3" size="sm" onClick={handleAddRow}>
                                    <MdAddCircleOutline /> 추가
                                </Button>
                                <Button className="ms-2" id="reset"  style={{ backgroundColor: 'dark', borderRadius: '20px', fontSize: '13px', color: 'black' }} variant="outline-warning px-3" size="sm" onClick={handleReset}>
                                    초기화 <GrPowerReset />
                                </Button>
                                <hr />
                            </div>
                            <div className='text-end'>
                                <Table>
                                    <tr>
                                        <th className='text-center'> 총 점수</th>
                                        <th className='text-center'>{totalScore1}</th>
                                        <th className='text-center'> 이수 학점</th>
                                        <th className='text-center'>{totalScore2}</th>
                                        <th className='text-center'>등급</th>
                                        <th className='text-center'>{totalGrade}</th>
                                    </tr>
                                </Table>
                            </div>
                            <div className='text-end my-2'>
                                {/* <Button id="save" variant="primary px-5" type="submit">
                                    저장하기 <FaSave />
                                </Button> */}
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default GradCalc;