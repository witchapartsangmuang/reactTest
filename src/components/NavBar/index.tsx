import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../stores'
import { Col, Row, Card, Button, Select } from 'antd'
import { changeLng } from '../../stores/language'
import { useTranslation } from 'react-i18next';
import './index.scss'
const NavBar = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const languageList = useSelector((state: RootState) => state.languageReducer.languageList)
    const languageSelected = useSelector((state: RootState) => state.languageReducer.languageSelected)
    const selectLng = (e:string) => {
        dispatch(changeLng(e))
        i18n.changeLanguage(e)
    }
    return (
        <Row justify={'space-between'} className='navBar'>
            <Col span={3}>
                <Button onClick={() => { navigate('/') }}>{t('back')}</Button>
            </Col>
            <Col span={1} style={{minWidth:80}}>
                <Select className='changeLanguageSelect' onChange={(e)=>{ selectLng(e)}} defaultValue={languageSelected}>
                    {
                        languageList.map((lng) => (
                            <Select.Option value={lng}>{lng}</Select.Option>
                        ))
                    }

                </Select>
            </Col>
        </Row>
    )
}
export default NavBar