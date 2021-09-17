import React  from 'react';


export default class EmailInput extends React.Component {


	render(){
		return(
			<input placeholder="example@host.com" id='input-email' type="email"></input>
		)
	}

}