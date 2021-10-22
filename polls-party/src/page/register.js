import React  from 'react';
import NameInput from '../components/registername';
import EmailInput from '../components/registeremail';
import PasswordInput from '../components/registerpw';
import Header from '../components/header';
import '../style/register.css';
import Request from '../requets';
import { withRouter } from 'react-router-dom';





 class Register extends React.Component{

	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.cancelToken = undefined
		this.state = {'name':undefined,'nameError':undefined,'nameIsOk':false,
					'email':undefined,'emailError':undefined,'emailIsOk':false,
					'pw':undefined,'pwError':undefined,'pwIsOk':false,
					'reqError':false
					
			}
	}




	async handleClick(e){
		e.preventDefault()
		if(this.state.nameIsOk === true && this.state.emailIsOk === true && this.state.pwIsOk === true){
			
			let req = new Request()
			let res = await req.create(this.state.name,this.state.email,this.state.pw)
			

			if(res[0] === true){
				
				this.setState({'reqError' : false})
				let routingFunction = (param) => {
					this.props.history.push({pathname: `/dashboard`,state: param});
				}
				routingFunction()
			}else{
				this.setState({'reqError': res[1].error})
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

	componentDidMount(){
		let routingFunction = (param) => {
			this.props.history.push({
	    		pathname: `/dashboard`,
	    		state: param
			});
		}

		if(localStorage.getItem('token') !== null){
    		 routingFunction()
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
				<div id='register-container'>
					<form onSubmit={this.handleClick} id='register-box'>
						<h2>Fill up the fields to register your account!</h2>
						{span}
						<NameInput verif={this.handleChange}></NameInput>
						<EmailInput verif={this.handleChange}></EmailInput>
						<PasswordInput verif={this.handleChange}></PasswordInput>
						<input type="submit" value="Send" id={clickOpen ? 'can-send' : ''} className='register-input register-button'></input>	
					</form>
				</div>
				
				

			</>
		)
	}
}

export default withRouter(Register)







