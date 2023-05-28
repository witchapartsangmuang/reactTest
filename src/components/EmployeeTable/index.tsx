import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../stores'
import { loadEmployeeFromLocalStorage, clearEmployeeFromLocalStorage } from '../../stores/employee'

import { Table, Button, Row, Col, Modal } from 'antd'
import type { ColumnsType, TableProps, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import type { TableRowSelection } from 'antd/es/table/interface'
import { useTranslation } from 'react-i18next'
import './index.scss'

const EmployeeTable = (props: any) => {
    interface DataType {
        key: number,
        prefix: string,
        firstName: string,
        lastName: string,
        birthDate: Date,
        nationality: string,
        idCardNumber: string,
        gender: string
        phoneNumber: {
            code: string,
            number: number
        },
        passportNumber: number | null,
        wishSalary: number
    }
    const { t, i18n } = useTranslation()
    const { getEditDataFunc, setSelectedRowKeys, selectedRowKeys, deleteAllSelectDataFunc } = props
    const dispatch = useDispatch()
    const employeeList = useSelector((state: RootState) => state.employeeReducer.employeeList)
    const empInfo = useSelector((state: RootState) => state.employeeReducer.empInfo)
    useEffect(() => {
        dispatch(loadEmployeeFromLocalStorage())
        // dispatch(clearEmployeeFromLocalStorage())
    }, [])


    const [data, setData] = useState<DataType[]>([])
    useEffect(() => {
        setData(employeeList)
    }, [employeeList])

    const columns: ColumnsType<DataType> = [
        // {
        //     title: 'คีย์',
        //     dataIndex: 'key',
        //     sorter: (a, b) => (a.id > b.id ? -1 : 1)
        // },
        {
            title: t('first name'),
            dataIndex: ['firstName'],
            sorter: (a, b) => (a.firstName > b.firstName ? -1 : 1)
        },
        {
            title: t('last name'),
            dataIndex: ['lastName'],
            sorter: (a, b) => (a.firstName > b.firstName ? -1 : 1)
        },
        {
            title: t('gender'),
            dataIndex: 'gender',
            filters: [
                {
                    text: t('Men'),
                    value: 'Men',
                },
                {
                    text: t('Female'),
                    value: 'Female',
                },
                {
                    text: t('not define'),
                    value: 'Not define',
                },
            ],
            onFilter: (value, record) => (record.gender === value),
            sorter: (a, b) => (a.gender > b.gender ? -1 : 1)
        },
        {
            title: t('phone number'),
            dataIndex: ['phoneNumber', 'number'],
            sorter: (a, b) => (a.phoneNumber > b.phoneNumber ? -1 : 1)
        },
        {
            title: t('nationality'),
            dataIndex: 'nationality',
            filters: [
                {
                    text: 'Thai',
                    value: 'Thai',
                },
                {
                    text: 'Chinese',
                    value: 'Chinese',
                },
                {
                    text: 'American',
                    value: 'American',
                },
            ],
            onFilter: (value, record) => (record.nationality === value),
            sorter: (a, b) => (a.nationality > b.nationality ? -1 : 1)
        },
        {
            title: t('manage'),
            render: (record) => {
                return (
                    <Row justify={'start'}>
                        <Col span={6}>
                            <Button key={`edit-${record.key}`} disabled={empInfo !== null} onClick={() => { getEditDataFunc(record.key) }}>{t('edit')}</Button>
                        </Col>

                    </Row>
                )
            }
        },
    ]

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = []
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false
                        }
                        return true
                    })
                    setSelectedRowKeys(newSelectedRowKeys)
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = []
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true
                        }
                        return false
                    })
                    setSelectedRowKeys(newSelectedRowKeys)
                },
            },
        ],
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        deleteAllSelectDataFunc()
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <Row justify={'center'}>
                <Col className='tableContainer' span={24}>
                    <Button className='deleteAllSelectButton' disabled={selectedRowKeys.length > 0 ? false : true} onClick={() => { setIsModalOpen(true) }}>ลบข้อมูลที่เลือกทั้งหมด</Button>
                    <Table
                        columns={columns}
                        dataSource={data.length === 0 ? [] : data}
                        rowSelection={rowSelection}
                        pagination={{
                            defaultPageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '30'],
                            position: ['bottomRight']
                        }}
                    />
                </Col>
            </Row>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure to want to delete all your selected data(s) ?</p>
            </Modal>
        </>
    )
}
export default EmployeeTable
