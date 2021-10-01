import React  from 'react';
import NameInput from '../components/registername';
import EmailInput from '../components/registeremail';
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




	async handleClick(){
		
			
			let req = new Request()
			let res = await req.login(this.state.name,this.state.pw)
			console.log(res)

			if(res[0] === true){
				
				this.setState({'reqError' : false})
				localStorage.setItem('token',res[1].token)
				let routingFunction = (param) => {
					this.props.history.push({pathname: `/dashboard`,state: param});
				}
				routingFunction()
			}else{
				this.setState({'reqError': res[1].non_field_errors})
			}		
	}


	handleChange(who,value,error,ok){
		
		if(who === 'name'){
			this.setState({'name':value})
		}else if(who === 'pw'){
			this.setState({'pw':value})
		}

	}



	render(){



		let span = <>
			{this.state.reqError ? <strong><span className="warning-span">{this.state.reqError}</span></strong> : ''}
		</>


		return(
			<>
				<Header></Header>
				<main id='register-box'>
					<h2>Send your username and password to login.</h2>
					{span}
					<NameInput verif={this.handleChange}></NameInput>
					<PasswordInput verif={this.handleChange}></PasswordInput>
					<div onClick={this.handleClick} id='can-send' className='hover-button register-button'><h2>Send</h2></div>	
				</main>
				
				
				

			</>
		)
	}
}

export default withRouter(Login)







