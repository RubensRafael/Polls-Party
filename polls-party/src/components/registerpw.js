import React  from 'react';


export default class PasswordInput extends React.Component {


	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e){
		let inputPw = e.target.value
		if(inputPw.length < 6){
			this.props.verif('pw',undefined,'An password only can be acepted with minimum 6 characters.',false)
		}else{
			this.props.verif('pw',inputPw,false,true)
		}
	}

	
	render(){
		return(
			<input onChange={this.handleChange} placeholder="Input your password here." id='input-pass' className="register-input" type="password"></input>
		)
	}

}