import React  from 'react';
import { withRouter } from 'react-router-dom';

class BoxQuestion extends React.Component {

	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		//let to = e.target.children[0].lastChild.data.toLowerCase()

		let to = e.target.attributes[0].value
		
		let routingFunction = (param) => {
			this.props.history.push({
	    		pathname: `${to}`,
	    		state: param
			});
		}

		routingFunction()
	}
	render(){
		return(
			<div className="question-box">
				<h2>Ask something.</h2>
				<div value='register' onClick={this.handleClick} className="hover-button home-button">
					<h3>REGISTER</h3>
				</div>
				<div value='login'onClick={this.handleClick} className="hover-button home-button">
					<h3>LOGIN</h3>
				</div>
			</div>
		)
	}

}

export default withRouter(BoxQuestion)