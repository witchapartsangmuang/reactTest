import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../stores'
import NavBar from '../../components/NavBar'
import { Col, Row, Card, Form, Input, Button, Checkbox, Select, Space, DatePicker, Radio, Typography, Modal, InputNumber } from 'antd'
import EmployeeTable from '../../components/EmployeeTable'
import { addEmployee, getEmployeeInfo, editEmployeeInfo, clearEmployeeInfo, deleteAllEmployeeSelect } from '../../stores/employee'
import moment from 'moment'
import './index.scss'
import { useTranslation } from 'react-i18next'
interface PhoneCode {
    id: string
    maxlength: number
    pfix: string
}

const EmployeeForm = (props: any) => {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const { initialValues } = props
    // use for edit data
    const empInfo = useSelector((state: RootState) => state.employeeReducer.empInfo)
    // use for Select
    const phoneNumberList = useSelector((state: RootState) => state.formSelectorReducer.phoneCodeList)
    const prefixList = useSelector((state: RootState) => state.formSelectorReducer.prefixList)
    const nationalityList = useSelector((state: RootState) => state.formSelectorReducer.nationalityList)
    // use for check length phone number
    const [phoneNumberSelect, setPhoneCodeSelect] = useState<PhoneCode>(phoneNumberList[0])
    const selectPhoneCodeFunc = (e: string) => {
        setPhoneCodeSelect(phoneNumberList.filter((phoneNumber: any) => (phoneNumber.id === e))[0])
    }
    // use for actions form
    const [idCardNumber, setIdCardNumber] = useState<string>('')
    const [idCardNumberError, setIdCardNumberError] = useState<boolean>(false)

    const clearFormValue = async () => {
        await dispatch(clearEmployeeInfo())
        await setPhoneCodeSelect(phoneNumberList[0])
        form.resetFields()
        setIdCardNumber('')
        setIdCardNumberError(false)

    }
    const validateidCardNumber = () => {
        if (idCardNumber.length === 17) {
            setIdCardNumberError(false)
            return true
        } else {
            setIdCardNumberError(true)
            return false
        }
    }
    const onChangeIdCardNumber = (val:any) => {
        setIdCardNumber(idCardNumberformatValue(val))
        setIdCardNumberError(false)
    }
    const onFinish = (formData: any) => {
        if (validateidCardNumber()) {
            if (empInfo === null) {
                dispatch(addEmployee({
                    formData,
                    idCardNumber
                }))
            } else {
                dispatch(editEmployeeInfo({
                    editKey: empInfo.key,
                    formData: formData,
                    idCardNumber: idCardNumber
                }))
            }
            clearFormValue()
        }

    }
    const onFinishFailed = (errorInfo: any) => {
        validateidCardNumber()
        console.log('Failed:', errorInfo)
    }



    // idCardNumber format
    const idCardNumberformatValue = (value: any) => {
        const digits = value.replace(/\D/g, '')
        console.log('digits', digits)
        const formattedValue = digits.replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5')
        console.log(formattedValue)
        return formattedValue
    }
    useEffect(() => {
        if (empInfo !== null) {
            selectPhoneCodeFunc(empInfo.phoneNumber.code)
            setIdCardNumber(idCardNumberformatValue(empInfo.idCardNumber))
        }
    }, [empInfo])
    return (
        <Form
            form={form}
            name='basic'
            initialValues={initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
        >
            <Row justify={'space-between'}>
                <Col span={5}>
                    <Form.Item
                        label={t('prefix')}
                        name='prefix'
                        rules={[{ required: true, message: 'prefix is required' }]}
                    >
                        <Select>
                            {
                                prefixList.map((prefix: any, index: number) => (
                                    <Select.Option key={index} value={prefix}>{prefix}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={9}>
                    <Form.Item
                        label={t('first name')}
                        name='firstName'
                        rules={[{ required: true, message: 'Please input your firstName!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={9}>
                    <Form.Item
                        label={t('last name')}
                        name='lastName'
                        rules={[{ required: true, message: 'Please input your lastName!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={'start'}>
                <Col span={7}>
                    <Form.Item
                        label={t('birth date')}
                        name='birthDate'
                        rules={[{ required: true, message: 'Please select your birth date!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        label={t('nationality')}
                        name='nationality'
                        rules={[{ required: true, message: 'Please input your nationality!' }]}
                    >
                        <Select>
                            {
                                nationalityList.map((nationality: any, index: number) => (
                                    <Select.Option key={index} value={nationality}>{t(nationality)}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={'start'}>
                <Col span={19}>
                    <Row style={{ height: 55 }}>
                        <Col span={4} style={{ minWidth: 125 }}>
                            <Typography style={{ marginTop: 5 }}><span style={{ color: 'red' }}>* </span>{t('ID card number')} : </Typography>

                        </Col>
                        <Col span={16}>
                            <Input
                                className='inputHideArrows'
                                style={{ borderColor: idCardNumberError === false ? '#D9D9D9' : 'red' }}
                                value={idCardNumber}
                                onChange={(e) => { onChangeIdCardNumber(e.target.value) }}
                                maxLength={13}
                            />
                            <Typography style={{ color: 'red', display: idCardNumberError === false ? 'none' : 'block' }}>Please input your ID card number!</Typography>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify={'start'}>
                <Col span={10}>
                    <Form.Item
                        label={t('gender')}
                        name='gender'
                        rules={[{ required: true, message: 'Please select your gender!' }]}
                    >
                        <Radio.Group>
                            <Radio value='Men'>{t('Men')}</Radio>
                            <Radio value='Female'>{t('Female')}</Radio>
                            <Radio value='Not define'>{t('not define')}</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item>
                        <Row justify={'start'}>
                            <Col span={3}><Typography style={{ marginTop: 5 }}><span style={{ color: 'red' }}>* </span>{t('phone number')}</Typography></Col>
                            <Col span={3}>
                                <Form.Item
                                    name={['phoneNumber', 'code']}
                                    noStyle
                                >
                                    <Select onSelect={(e) => { selectPhoneCodeFunc(e) }}>
                                        {
                                            phoneNumberList.map((phoneNumber: any, index: number) => (
                                                <Select.Option key={index} value={phoneNumber.id}>{phoneNumber.id}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={2} style={{ textAlign: 'center' }}>
                                <Typography style={{ fontSize: '20px' }}> - </Typography>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    name={['phoneNumber', 'number']}
                                    noStyle
                                    rules={[
                                        { required: true, message: 'Please input your phone number!' },
                                        { min: phoneNumberSelect.maxlength, max: phoneNumberSelect.maxlength, message: `Please input your ${phoneNumberSelect.maxlength} digits phone number!` }
                                    ]}
                                >
                                    <Input className='inputHideArrows' type='number' maxLength={phoneNumberSelect.maxlength} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={11}>
                    <Form.Item
                        label={t('passport ID')}
                        name='passportNumber'
                        rules={[
                            { min: 9, message: `passport number must have 9 digits` }
                        ]}
                    >
                        <Input className='inputHideArrows' maxLength={9} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item

                        label={t('salary')}
                        name='wishSalary'
                        rules={[
                            { required: true, message: 'Please input your salary!' }
                        ]}
                    >
                        <InputNumber className='inputHideArrows' min={0} style={{ width: 200 }}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' onClick={() => { clearFormValue() }}>
                            {t('clear')}
                        </Button>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            {empInfo === null ? t('save') : t('edit')}
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}
export default EmployeeForm