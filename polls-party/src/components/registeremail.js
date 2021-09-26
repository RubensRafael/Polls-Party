import React  from 'react';


export default class EmailInput extends React.Component {

		constructor(props){
			super(props)
			this.handleChange = this.handleChange.bind(this)
		}

		handleChange(e){
			let inputEmail = e.target.value
			let regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
			

			if(!(regex.test(inputEmail))){
				//se o email não passar
				
				this.props.verif('email',undefined,'Follow the example: example@host.com',false)
			}else{
				//se passar
				
				this.props.verif('email',inputEmail,false,true)

				
			}
		}


		


	render(){
		return(
			<input  onChange={this.handleChange} placeholder="example@host.com" id='input-email' type="text"></input>
		)
	}

}