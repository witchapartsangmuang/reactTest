import { useState } from 'react'
import NavBar from '../../components/NavBar'
import { Col, Row, Card, Button, Select, RowProps } from 'antd'
import { CaretLeftFilled, CaretUpFilled, CaretDownFilled, CaretRightFilled } from '@ant-design/icons'
import './index.scss'
const MoveShapePage = () => {
    const [indexOgj, setIndexOgj] = useState([
        'circle',
        'square',
        'rectangle',
        'trapezoid',
        'diamond',
        'Ellipse'
    ])
    const indexInPosition: { start: number, end: number }[] = [{ start: 0, end: 2 }, { start: 3, end: 5 }]
    const [position, setPosition] = useState<RowProps['justify'][]>(['start', 'end'])

    const slideFunc = (reverse: boolean) => {
        if (reverse) {
            let swapIndex = indexOgj.slice(0, 1)[0]
            let newArr = indexOgj.filter((obj) => (obj !== swapIndex))
            newArr.push(swapIndex)
            setIndexOgj(newArr)
        } else {
            let swapIndex = indexOgj.slice(-1)[0]
            let newArr = indexOgj.filter((obj) => (obj !== swapIndex)).reverse()
            newArr.push(swapIndex)
            newArr.reverse()
            setIndexOgj(newArr)
        }
    }
    const changePositionFunc = () => {
        let swapPosition = position.slice(0, 1)[0]
        let newArr = position.filter((obj) => (obj !== swapPosition))
        newArr.push(swapPosition)
        setPosition(newArr)

    }
    const shuffleButton = () => {
        const newArr = [...indexOgj]
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = newArr[i]
            newArr[i] = newArr[j]
            newArr[j] = temp
        }
        setIndexOgj(newArr)
    }

    return (
        <>
            <NavBar />
            <Row className='containerActionButton' gutter={[16, 8]}>
                <Col span={6}>
                    <Card className='cardButton textAlignCenter' onClick={() => { slideFunc(true) }}>
                        <CaretLeftFilled className='iconSize' />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className='cardButton' onClick={() => { changePositionFunc() }}>
                        <Row>
                            <Col span={12} className='textAlignCenter'>
                                <CaretUpFilled className='iconSize' />
                            </Col>
                            <Col span={12} className='textAlignCenter'>
                                <CaretDownFilled className='iconSize' />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className='cardButton textAlignCenter' onClick={() => { slideFunc(false) }}>
                        <CaretRightFilled className='iconSize' />
                    </Card>
                </Col>
            </Row>
            {
                position.map((position, positionIndex) => (
                    <Row key={positionIndex} justify={position} className='iconCardArea' gutter={[16, 8]}>
                        {
                            indexOgj.map((obj, objIndex) => {
                                if (objIndex >= indexInPosition[positionIndex].start && objIndex <= indexInPosition[positionIndex].end) {
                                    return (
                                        <Col span={7} key={objIndex}>
                                            <Card className='cardButton textAlignCenter' onClick={shuffleButton}>
                                                <div className={obj}></div>
                                            </Card>
                                        </Col>
                                    )
                                }
                                return true
                            })
                        }
                    </Row>
                ))
            }
        </>
    )
}
export default MoveShapePage