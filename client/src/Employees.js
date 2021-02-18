import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'antd';
import './Employees.css';

const Employees = () => {
	const history = useHistory();
	const [employees, setEmployees] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	

  useEffect(() => {
    const getInitialEmployees = async () => {
      const response = await fetch(`/api/employees?page=${page}`);
      const jsonResponse = await response.json();
      if (response.status === 200) {
				setEmployees(jsonResponse.employees);
				setIsLoading(false);
			}
    };
    getInitialEmployees();
  }, [page]);

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Location',
			dataIndex: 'cityState',
			key: 'cityState',
		},
	];

  return (
    <Table
			columns={columns}
			dataSource={employees}
			loading={isLoading}
			pagination={{
				total: 5000,
				onChange: (newPage) => {
					if (page !== newPage) {
						setPage(newPage);
					}
				},
				current: page,
			}}
			onRow={(record, index) => ({
				onClick: () => {
					const employeeId = (index + 1) + (10 * (page - 1))
					history.push(`/employees/${employeeId}`);
				},
				className: 'employees-table-row'
			})}
		/>
  );
};

export default Employees;
