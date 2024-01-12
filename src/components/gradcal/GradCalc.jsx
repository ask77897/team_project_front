import React, { useEffect, useState } from 'react';
import { Row, Card, Table, Form, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdAddCircleOutline } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { CiCalculator1 } from "react-icons/ci";
import { FaSave } from "react-icons/fa";

function App() {
    const initialSubject = { subject: '', score: '', grade: '', isMajor: false };
    const [subjects, setSubjects] = useState([initialSubject]);

    const handleAddRow = () => {
      setSubjects([...subjects, initialSubject]);
    };
  
    const handleReset = () => {
      setSubjects([initialSubject]);
    };
  
    const handleCheckboxChange = (index) => {
      const newSubjects = [...subjects];
      newSubjects[index].isMajor = !newSubjects[index].isMajor;
      setSubjects(newSubjects);
    };
////////////////////////////////////위에는 학점 테이블 추가, 삭제 버튼


	const GradeInsert = () => {
	//const { gid } = useParams();
	const [gradecalc, setGradecalc] = useState({
			uid: '',
			gid: 0,
			courses: '',
			grade: '',
			score: '',
			base: '',

		});

		const { uid, gid, courses, grade, score, base } = gradecalc;
		const navi = useNavigate();

		const getGradecalc = async () => {
			const res = await axios.post('/gradecalc/insert')
			console.log(res.data)
			setGradecalc(res.data);
		}

		useEffect(() => {
			if (gid) {
				getGradecalc();
			}
		
		}, [gid]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

  return (
    <div className='my-5 mx-5 m-5 p-3 content_texts'>
        <h1 className='text-center mb-5'>Grade Calculator</h1>
            <Row className='justify-content-center' >
                <Col md={6}>
                    <Card className='p-3'>
                        <div className='Button text-end my-2'>
                            <Button variant="success" size="sm">
                                Calculate <CiCalculator1 /> 
                            </Button>
                        </div>
						<div onSubmit={handleSubmit}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th className='text-center'>과목</th>
                            <th className='text-center'>점수</th>
                            <th className='text-center'>학점</th>
                            <th className='text-center'>전공</th>
                        </tr>
                        </thead>

                        <tbody>
                            {subjects.map((subject, index) => (
                                <tr key={index}>
                                <td className='text-center'>
                                    <Form.Control/>
                                </td>
                                <td className='text-center'>
                                    <Form.Control />
                                </td>
                                <td className='text-center'>
                                    <Form.Control />
                                </td>
                                <td className='text-center'>
                                    <input type="checkbox"/>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
			
                        <div className='Button text-end'>
                            <Button id="add" variant="warning px-3" size="sm" onClick={handleAddRow}>
                                <MdAddCircleOutline /> Add
                            </Button>
                            <Button className="ms-2"id="reset" variant="secondary" size="sm" onClick={handleReset}>
                                Reset <GrPowerReset />
                            </Button>
                            <hr />
                        </div>
                            <div className='text-end'>
                            <Table>
                                <tr>
                                <th className='text-center'>총점수</th>
                                <th className='text-center'>0</th>
                                <th className='text-center'>이수학점</th>
                                <th className='text-center'>0</th>
                                <th className='text-center'>학점변환</th>
                                <th className='text-center'>0</th>
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

export default App;