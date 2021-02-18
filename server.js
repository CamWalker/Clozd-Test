const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;
const seed = 'CelineDion';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/employees', async (req, res) => {
	const { page = 1, pageSize = 10 } = req.query;
	
	const { data } = await axios.get(`https://randomuser.me/api/?seed=${seed}&page=${page}&results=${pageSize}&inc=name,email,location`);
	const employees = data.results.map(employee => ({
		name: `${employee.name.first} ${employee.name.last}`,
		email: employee.email,
		cityState: `${employee.location.city}, ${employee.location.country}`
	}));
  res.send({ employees });
});

app.get('/api/employees/:employeeId', async (req, res) => {
	const { employeeId } = req.params;
	const page = Math.ceil(employeeId / 10);
	const index = employeeId - (10 * (page - 1)) - 1;
  const { data } = await axios.get(`https://randomuser.me/api/?seed=${seed}&page=${page}&results=10&inc=picture,name,email,location,phone,dob`);
	const employee = data.results[index];
	res.send({
		employee: {
			photo: employee.picture.medium,
			name: `${employee.name.first} ${employee.name.last}`,
			email: employee.email,
			address: `${employee.location.street.number} ${employee.location.street.name}
${employee.location.city}, ${employee.location.state} ${employee.location.postcode}
${employee.location.country}`,
			phone: employee.phone,
			dob: employee.dob.date,
		}
	});
});

app.listen(port, () => {
	console.log(`listening on ${port}`);
});