import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Image, Button } from 'antd';
import './Employee.css';

const Employee = () => {
	const { employeeId } = useParams();
	const [employee, setEmployee] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
    const getEmployeeInfo = async () => {
      const response = await fetch(`/api/employees/${employeeId}`);
      const jsonResponse = await response.json();
      if (response.status === 200) {
				setEmployee(jsonResponse.employee);
				setIsLoading(false);
			}
    };
    getEmployeeInfo();
  }, [employeeId]);

	return (
		<div>
			<Image
				width={200}
				src={employee.photo}
			/>
			<div className="employee-data">
				<div>Name</div>
				<div>{employee.name}</div>
			</div>
			<div className="employee-data">
				<div>Email</div>
				<div>{employee.email}</div>
			</div>
			<div className="employee-data">
				<div>Address</div>
				<div>{employee.address}</div>
			</div>
			<div className="employee-data">
				<div>Phone</div>
				<div>{employee.phone}</div>
			</div>
			<div className="employee-data">
				<div>Birthday</div>
				<div>{employee.dob}</div>
			</div>
			<Button>
				<Link to="/employees">Back</Link>
			</Button>
		</div>
	);
};

export default Employee;