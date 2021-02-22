import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		width: '100%',
		overflowX: 'auto',
		
	},
	table: {
		minWidth: 650
	},
	btnCheck: {
		color: 'blue',
		'&:hover': {
			color: 'green'
		}
	}

});

export default function SimpleTable() {

	const classes = useStyles();

	const [data, setData] = useState([]);
	
	useEffect(() => {
		const fetchUsers = async () => {
			const response = await fetch(
				'https://localhost:44375/v1/provider'
			).then(res => res.json());
			setData(response);
			
			return [data];
		};
		fetchUsers()
	}, []);

	return (
		<Container maxWidth="xl">
			<Paper className={classes.root}>
				<Typography variant="h6" id="tableTitle" style={{color: "#050505"}}>
					Lista de Fornecedores
				</Typography>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
                            <TableCell align="center">Nome</TableCell>
							<TableCell align="center">Idade</TableCell>
                            <TableCell align="center">Física/Júridica</TableCell>
                            <TableCell align="center">CPF/CNPJ</TableCell>
                            <TableCell align="center">Empresa</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{data.map((item, key) => (	
						<TableRow key={key}>
							<TableCell align="center">{item.register}</TableCell>
							<TableCell align="center">{item.name}</TableCell>
							<TableCell align="center">{item.birth}</TableCell>
                            <TableCell align="center">{item.typePerson}</TableCell>
                            <TableCell align="center">{item.cpf}</TableCell>
                            <TableCell align="center">{item.company}</TableCell>				
						</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		</Container>
	);
}
