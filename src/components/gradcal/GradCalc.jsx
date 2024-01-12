import React, { useEffect, useState } from 'react';
import { Row, Card, Table, Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdAddCircleOutline } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { CiCalculator1 } from "react-icons/ci";
import { FaSave } from "react-icons/fa";

function GradCalc() {
    const initialSubject = { subject: '', score: '', grade: '', isMajor: false };
    const [subjects, setSubjects] = useState([initialSubject]);
    const [totalScore, setTotalScore] = useState(0);
    const [totalGrade, setTotalGrade] = useState(0);

    const handleAddRow = () => {
        setSubjects([...subjects, initialSubject]);
    };

    const handleReset = () => {
        setSubjects([initialSubject]);
        setTotalScore(0);
        setTotalGrade(0);
    };

    const handleScoreChange = (index, value) => {
        const newSubjects = [...subjects];
        newSubjects[index].score = parseInt(value, 10) || 0;
        setSubjects(newSubjects);
    };

    const calculateTotal = () => {
        const sum = subjects.reduce((acc, subject) => acc + subject.score, 0);
        setTotalScore(sum);

        // Define a basic grading system, you can customize it as needed
        const gradingSystem = {
            A: 90,
            B: 80,
            C: 70,
            D: 60,
            F: 0,
        };

        // Find the corresponding grade based on the total score
        let totalGrade = Object.keys(gradingSystem).find(grade => sum >= gradingSystem[grade]);
        totalGrade = totalGrade || 'F'; // Default to 'F' if no grade is found
        setTotalGrade(totalGrade);
    };

    useEffect(() => {
        calculateTotal();
    }, [subjects]);

    return (
        <div className='my-5 mx-5 m-5 p-3'>
            <h1 className='text-center mb-5'>Grade Calculator</h1>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <Card className='p-3'>
                        <div className='Button text-end my-2'>
                            <Button variant="success" size="sm">
                                Calculate <CiCalculator1 />
                            </Button>
                        </div>
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className='text-center'>과목</th>
                                        <th className='text-center'>점수</th>
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
                                                    value={subject.score}
                                                    onChange={(e) => handleScoreChange(index, e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className='Button text-end'>
                                <Button id="add" variant="warning px-3" size="sm" onClick={handleAddRow}>
                                    <MdAddCircleOutline /> Add
                                </Button>
                                <Button className="ms-2" id="reset" variant="secondary" size="sm" onClick={handleReset}>
                                    Reset <GrPowerReset />
                                </Button>
                                <hr />
                            </div>
                            <div className='text-end'>
                                <Table>
                                    <tr>
                                        <th className='text-center'>총 점수</th>
                                        <th className='text-center'>{totalScore}</th>
                                        <th className='text-center'>학점</th>
                                        <th className='text-center'>{totalGrade}</th>
                                    </tr>
                                </Table>
                            </div>
                            <div className='text-end my-2'>
                                <Button id="save" variant="primary px-5" type="submit">
                                    Save <FaSave />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default GradCalc;