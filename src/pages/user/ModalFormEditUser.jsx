import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { updateUser } from '../Store/Slices/Users';
import { ModalValidations } from '../Hooks/ModalValidations';

const ModalFormEditUser = (props) => {
	const { user } = props;

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		getDateUser();
	};

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm();

	const getDateUser = () => {
		setValue('name', user.name);
		setValue('lastname', user.lastname);
		setValue('role', user.role);
		setValue('email', user.email);
		setValue('userName', user.userName);
		setValue('password', user.password);
	};

	const onSubmit = async (data) => {
		try {
			data._id = user._id;
			const success = await updateUser(data);
			if (success) {
				reset();
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button variant="info " size="lg" onClick={handleShow}>
				Editar Usuario
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Crear Usuario</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-3" controlId="name">
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								{...register('name', { required: true })}
								type="text"
								placeholder="Enter name"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="lastname">
							<Form.Label>Apellidos</Form.Label>
							<Form.Control
								{...register('lastname', { required: true })}
								type="text"
								placeholder="Enter last name"
							/>
							{errors.password && <h5>password is required</h5>}
						</Form.Group>
						<Form.Group className="mb-3" controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								{...register('email', { required: true })}
								type="text"
								placeholder="Enter email"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="userName">
							<Form.Label>Usuario</Form.Label>
							<Form.Control
								{...register('userName', { required: true })}
								type="text"
								placeholder="Enter username"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="role">
							<Form.Label>Role</Form.Label>
							<Form.Select
								aria-label="Default select example"
								{...register('role', { required: true })}
								type="text"
								placeholder="Enter Role"
							>
								<option value="user">user</option>
								<option value="moderator">moderator</option>
								<option value="admin">admin</option>
							</Form.Select>
						</Form.Group>
						<ModalValidations
							title="Resetear contraseña"
							body={`¿Seguro que quieres resetear la contraseña de ${user.name}?`}
							funtionProps={updateUser}
							userID={user._id}
							option="resetPassword"
							nameButton="Resetear"
						/>
						<Button className="ms-5" size="lg" variant="info" type="submit" id="submit">
							Actualizar Usuario
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export { ModalFormEditUser };
