import React  from 'react';


export default class NameInput extends React.Component {

	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e){


			let inputName = e.target.value
			let regex = new RegExp('[^A-Za-z0-9._@+-]')
			

			if(regex.test(inputName)){
				//se o nome não passar
				
				this.props.verif('name',undefined,'Only letters, numbers and . _ @ + -',false)
			}else{
				//se o nome passar
				this.props.verif('name',inputName,false,true)
			}
	}
	
	render(){

		
		return(
			<>
				<input onChange={this.handleChange} placeholder="Input your name here." id='input-name' type="text"></input>
				
			</>
			

		)
	}

}