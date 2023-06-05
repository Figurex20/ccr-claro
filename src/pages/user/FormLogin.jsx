import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import '../../styles/css/custom.css';

//Socket
import { socketConnect } from '../Store/Slices/Sockets';

//redux
import { login } from '../Store/Slices/Users';

export const FormLogin = () => {
	const navigate = useNavigate();

	//headers
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const newLogin = {
				userName: data.user,
				password: data.password,
			};

			const result = await login(newLogin);
			const user = result.data.user;
			const role = result.data.role;

			sessionStorage.setItem('token', result.data.token);
			sessionStorage.setItem('user', result.data.user);
			sessionStorage.setItem('role', result.data.role);
			sessionStorage.setItem('idUser', result.data.id);
			console.log(result.data.resetPassword);

			if (result.data.resetPassword) {
				sessionStorage.setItem('resetPassword', result.data.resetPassword);
				navigate('/changepassword');
				return;
			}

			reset();
			navigate('/');
		} catch (error) {
			// alert('SweetAlert 2 en React JS);
			// Swal.fire('Error', 'Correo o Contraseña incorrecta', 'error');
			alert(error.response.data.message);
			console.log(error.response.data.message);
		}
	};

	return (
		<div className=" login  ">
			<div className="">
				<Form onSubmit={handleSubmit(onSubmit)} className="fs-2">
					<Form.Group className="mb-3 login-items login-group" controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							{...register('user', { required: true })}
							type="text"
							placeholder="Enter email"
							className="login-items-control login-email"
						/>
					</Form.Group>

					<Form.Group className="mb-3 login-group" controlId="Password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							{...register('password', { required: true })}
							type="password"
							placeholder="Password"
							className="login-items-control login-password"
						/>
						{errors.password && <h5>password is required</h5>}
					</Form.Group>
					<Button variant="primary fs-5" type="submit" id="submit">
						Login
					</Button>
				</Form>
				<Link className="navbar-brand me-5" to="/formlogin/recoverpassword">
					Recuperar Contraseña
				</Link>
			</div>
		</div>
	);
};
