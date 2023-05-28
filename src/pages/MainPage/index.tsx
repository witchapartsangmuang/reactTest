import { Col, Row, Card, Typography } from 'antd'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NavBar from '../../components/NavBar'
import { useTranslation } from 'react-i18next';
const MainPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()
    const changeSite = (url: string) => {
        navigate(url)
    }
    return (
        <>
            <NavBar />
            <Row justify='center' style={{ paddingLeft: '21%', paddingRight: '21%', marginTop: 300 }}>
                <Col span={10} style={{ minWidth: 350, marginBottom: 10 }}>
                    <Card title={t('Test 1')} style={{ width: 300, borderRadius: 0 }} onClick={() => { changeSite('/MoveShape') }}>
                        <Typography.Text>{t('Website Layout')}</Typography.Text>
                    </Card>
                </Col>
                <Col span={10} style={{ minWidth: 350, marginBottom: 10 }}>
                    <Card title={t('Test 2')} style={{ width: 300, borderRadius: 0 }} onClick={() => { changeSite('/Form') }}>
                        <Typography.Text>{t('Form Layout')}</Typography.Text>

                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default MainPage