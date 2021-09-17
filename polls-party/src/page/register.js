import React  from 'react';
import NameInput from '../components/registername';
import EmailInput from '../components/registeremail';
import PasswordInput from '../components/registerpw';
import Header from '../components/header';
import '../style/register.css';





export default class Register extends React.Component{



	render(){

		return(
			<>
				<Header></Header>
				<main id='register-box'>
					<h2>Fill up the fields to register your account!</h2>
					<NameInput></NameInput>
					<EmailInput></EmailInput>
					<PasswordInput></PasswordInput>
					<div id='register-button'><h2>Send</h2></div>	
				</main>
				
				
				

			</>
		)
	}
}







