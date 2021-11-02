import React  from 'react';
import NameInput from '../components/registername';
import PasswordInput from '../components/registerpw';
import Header from '../components/header';
import '../style/register.css';
import Request from '../requets';
import { withRouter } from 'react-router-dom';





 class Login extends React.Component{

	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.cancelToken = undefined
		this.state = {'name':undefined,
					'pw':undefined,
					'reqError':false
					
			}
	}



	// Makes a request to login the user, if have sucess, 
	// the token will be save on localstorage, and he is redirect to dashboard
	async handleClick(e){
		
			e.preventDefault()
			let req = new Request()
			let res = await req.login(this.state.name,this.state.pw)
			

			if(res[0] === true){
				
				this.setState({'reqError' : false})
				localStorage.setItem('token',res[1].token)
				this.props.history.push({pathname: `/dashboard`})				
			}else{
				this.setState({'reqError': res[1].non_field_errors})
			}		
	}


	handleChange(who,value,error,ok){
		/* Wait for:
		who => what is the field,
		value => his value,
	*/
		if(who === 'name'){
			this.setState({'name':value})
		}else if(who === 'pw'){
			this.setState({'pw':value})
		}

	}


	//If user is logged, redirect to dashboard.
	componentDidMount(){
		if(localStorage.getItem('token') !== null){
    		 this.props.history.push({pathname: `/dashboard`});
    	}
	}

	render(){


		// show errors from server
		let span = <>
			{this.state.reqError ? <strong><span className="warning-span">{this.state.reqError}</span></strong> : ''}
		</>


		return(
			<>
				<Header></Header>
				<div id='register-container'>
					<form onSubmit={this.handleClick} id='register-box'>
						<h2>Send your username and password to login.</h2>
						{span}
						<NameInput verif={this.handleChange}></NameInput>
						<PasswordInput verif={this.handleChange}></PasswordInput>
						<input type="submit" value="Send" id='can-send' className='register-input register-button'></input>	
					</form>
				</div>
				
				

			</>
		)
	}
}

export default withRouter(Login)







