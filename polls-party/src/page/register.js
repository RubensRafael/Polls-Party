import React  from 'react';
import NameInput from '../components/registername';
import EmailInput from '../components/registeremail';
import PasswordInput from '../components/registerpw';
import Header from '../components/header';
import '../style/register.css';
import Request from '../requets'





export default class Register extends React.Component{

	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.createUser = this.createUser.bind(this)
		this.cancelToken = undefined
		this.state = {'name':undefined,'nameError':undefined,'nameIsOk':false,
					'email':undefined,'emailError':undefined,'emailIsOk':false,
					'pw':undefined,'pwError':undefined,'pwIsOk':false,
					'reqError':false
					
			}
	}


	createUser(){
		let req = new Request()
		let res = req.create(this.state.name,this.state.email,this.state.pw)

		if(res[0] === true){
			console.log('redireciona carai')
			this.setState({'reqError' : false})
		}else{
			this.setState({'reqError':'Something error hapens, try again'})
		}
	}

	handleClick(){
		if(this.state.nameIsOk === true && this.state.emailIsOk === true && this.state.pwIsOk === true){
			
			let req = new Request()
			let res = req.safeCreate(this.state.email)
			
			if(res[0] === true){

				res[1].email ? this.setState({'emailIsOk':false,'emailError':'Email adress alredy exists.','reqError' : false}) : this.createUser()
			}else{
				this.setState({'reqError':'Something error hapens, try again'})
			}
		}
		
	}
	handleChange(who,value,error,ok){
		
		if(who === 'name'){
			this.setState({'name':value,'nameError':error,'nameIsOk':ok})
		}else if (who === 'email'){
			this.setState({'email':value,'emailError':error,'emailIsOk':ok})
		}else if(who === 'pw'){
			this.setState({'pw':value,'pwError':error,'pwIsOk':ok})
		}
		
		

	}





	render(){

		let clickOpen
		if(this.state.nameIsOk === true && this.state.emailIsOk === true && this.state.pwIsOk === true){
			clickOpen = true
		}else{
			clickOpen = false
		}

		let span = <>
			{this.state.nameError ? <strong><span className="warning-span">{this.state.nameError}</span></strong> : ''}
			{this.state.emailError ? <strong><span className="warning-span">{this.state.emailError}</span></strong> : ''}
			{this.state.pwError ? <strong><span className="warning-span">{this.state.pwError}</span></strong> : ''}
			{this.state.reqError ? <strong><span className="warning-span">{this.state.reqError}</span></strong> : ''}
		</>


		return(
			<>
				<Header></Header>
				<main id='register-box'>
					<h2>Fill up the fields to register your account!</h2>
					{span}
					<NameInput verif={this.handleChange}></NameInput>
					<EmailInput verif={this.handleChange}></EmailInput>
					<PasswordInput verif={this.handleChange}></PasswordInput>
					<div onClick={this.handleClick} id={clickOpen ? 'can-send' : ''} className='hover-button register-button'><h2>Send</h2></div>	
				</main>
				
				
				

			</>
		)
	}
}






