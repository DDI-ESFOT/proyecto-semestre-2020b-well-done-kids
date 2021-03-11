import React from 'react';
import {useEffect, useState} from 'react';
import '../styles/game.css';
import {Button, Col, Input, Row, Radio} from "antd";
import GameNav from "../components/GameNav";
import Routes from "../constants/Routes";
import {Link} from "react-router-dom";
import withAuth from "../hocs/withAuth";
import {db} from '../firebase';



const Game1 = () => {

    const [questionNumber, setQuestionNumber] = useState(0);
    const [questionList, setQuestionList] = useState([]);
    const [radioState, setRadioState] = useState(0);
    const [score, setScore] = useState(0);

    const onChange = e => {
        setRadioState({
            value: e.target.value
        });
    };

    useEffect( () => {
        const getQuestions = async() => {
            db.ref('1/questions').on('value', (snapshot) => {
                const questions = [];
                snapshot.forEach((question) => {
                    const q = question.val();
                    questions.push(q);
                });
                setQuestionList(questions);
            });
        };
        getQuestions();
        return () => {
            db.ref('1/questions').off();
        };
    }, []);


    // const handleQuestionChange = (questionNumber) => {
    //     // if (questionList[questionNumber].options[radioState] === questionList[questionNumber].answer) {
    //     //     setScore(score + 1);
    //     //     setQuestionNumber(questionNumber + 1);
    //     // } else {
    //     //     console.log('opcion seleccionada', radioState)
    //     //     console.log('puntaje', score)
    //     //     console.log('numero pregunta', questionNumber)
    //     // }
    //
    // }

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };


    const handleQuestionChange = (questionNumber) => {
        console.log(value);
        if (value === questionList[questionNumber].correct_answer) {
            setScore(score + 1);
            setQuestionNumber(questionNumber + 1);
            console.log('opcion seleccionada', radioState)
            console.log('puntaje', score)
            console.log('numero pregunta', questionNumber)
        } else {
            console.log('respuesta incorrecta')
            alert('Respuesta incorrecta. La explicación completa....');
        }
        
    }
    const {value} = radioState;
    return (
        <>

            {
                score < 10 ?
                    questionList.length > 0 ?
                        <div className="Game">
                            <GameNav/>
                            <div> Puntaje: {score}</div>
                            <Row justify='center'>
                                <Col justify='center'>
                                    <h1>{questionList[questionNumber].text}</h1>
                                </Col>
                            </Row>
                            <Row justify='center'>
                                <Col>
                                    <Radio.Group onChange={onChange} value={value}>
                                        {
                                            questionList[questionNumber].options.map((option, i) => {
                                                return <Radio style={radioStyle} value={option}>
                                                    {option}
                                                </Radio>
                                            })
                                        }
                                    </Radio.Group>
                                </Col>
                            </Row>
                            <Row justify='center'>
                                <Col>
                                        <Button type="primary" onClick={() => handleQuestionChange(questionNumber)}>
                                            LISTO :)
                                        </Button>

                                </Col>
                            </Row>
                            <Row justify='center'>
                                <Col>
                                    <Link to={Routes.GAME4}>
                                        <Button type="primary">Necesito ayuda :(</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                        : 'Cargando pregunta...'
                    : 'Video'// presentan el video
            }
            </>
    );
}
export default withAuth(Game1);