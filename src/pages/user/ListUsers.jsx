import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ModalFormCreateUser } from './ModalFormCreateUser';
import { Table } from 'react-bootstrap';
import { ModalValidations } from '../Hooks/ModalValidations';

//Redux
import { fetchAllUsers, deleteUser } from '../Store/Slices/Users';
import { useDispatch, useSelector } from 'react-redux';
import { ModalFormEditUser } from './ModalFormEditUser';

const ListUsers = () => {
	const dispatch = useDispatch();
	const { list } = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(fetchAllUsers);
	}, []);

	return (
		<>
			<div className="d-grid gap-2">
				<ModalFormCreateUser />
			</div>
			<Table>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Informacion</th>
						<th>Editar</th>
						<th>Eliminar</th>
					</tr>
				</thead>
				<tbody>
					{list.map((user) => (
						<tr key={user._id} className={' fs-6'}>
							<th>
								<h6>Nombre: {user.name.toUpperCase()}</h6>
								<h6>Apellidos: {user.lastname.toUpperCase()}</h6>
							</th>
							<th>
								<h6>Usuario: {user.userName}</h6>
								<h6>Role: {user.role.toUpperCase()}</h6>
								<h6>Email: {user.email.toUpperCase()}</h6>
							</th>
							<th>
								<ModalFormEditUser user={user} />
							</th>

							<th>
								<ModalValidations
									funtionProps={deleteUser}
									userID={user._id}
									title="Eliminar usuario"
									body={`¿Seguro que quieres eliminar el usuario: ${user.name}?`}
									nameButton="Eliminar"
								/>
							</th>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export { ListUsers };
