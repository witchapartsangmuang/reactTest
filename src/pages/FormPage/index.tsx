import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../stores'
import NavBar from '../../components/NavBar'
import EmployeeTable from '../../components/EmployeeTable'
import EmployeeForm from '../../components/EmployeeForm'
import { Col, Row, Card, Form, Input, Button, Checkbox, Select, Space, DatePicker, Radio, Typography, Modal, InputNumber } from 'antd'
import { addEmployee, getEmployeeInfo, editEmployeeInfo, clearEmployeeInfo, deleteAllEmployeeSelect } from '../../stores/employee'
import moment from 'moment'
import './index.scss'
const FormPage = () => {
    const dispatch = useDispatch()
    // use for check form display
    const empInfo = useSelector((state: RootState) => state.employeeReducer.empInfo)
    // uses for set initialValues in form
    const phoneNumberList = useSelector((state: RootState) => state.formSelectorReducer.phoneCodeList)
    const prefixList = useSelector((state: RootState) => state.formSelectorReducer.prefixList)
    const nationalityList = useSelector((state: RootState) => state.formSelectorReducer.nationalityList)
    // for use in EmployeeTable
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const getEditData = async (key: number) => {
        await dispatch(getEmployeeInfo(key))
    }
    const deleteAllSelectData = () => {
        dispatch(deleteAllEmployeeSelect(selectedRowKeys))
    }
    return (
        <>
            <NavBar />
            <Row className='formPageContainer' justify='center'>
                <Col span={12}>
                    <Card bordered={true} style={{ minWidth: '900px' }}>
                        { empInfo === null && 
                        <EmployeeForm initialValues={{
                            prefix: prefixList[0],
                            nationality: nationalityList[0],
                            phoneNumber: {
                            code: phoneNumberList[0].id
                            }}}
                        />
                        }
                        { empInfo !== null && 
                        <EmployeeForm initialValues={{
                            prefix: empInfo.prefix,
                            firstName: empInfo.firstName,
                            lastName: empInfo.lastName,
                            birthDate: moment(empInfo.birthDate),
                            nationality: empInfo.nationality,
                            idCardNumber: empInfo.idCardNumber,
                            gender: empInfo.gender,
                            phoneNumber: {
                                code: empInfo.phoneNumber.code,
                                number: empInfo.phoneNumber.number
                            },
                            passportNumber: empInfo.passportNumber,
                            wishSalary: empInfo.wishSalary
                            }}
                        />
                            }
                    </Card>
                </Col>
            </Row >
            <EmployeeTable
                getEditDataFunc={getEditData}
                setSelectedRowKeys={setSelectedRowKeys}
                deleteAllSelectDataFunc={deleteAllSelectData}
                selectedRowKeys={selectedRowKeys}
            />
        </>
    )
}
export default FormPage