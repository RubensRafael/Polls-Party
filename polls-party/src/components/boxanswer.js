import React  from 'react';
import { withRouter } from 'react-router-dom';

class AnswerQuestion extends React.Component {

	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleRedirect = this.handleRedirect.bind(this)
		this.state = {'code': '' }
	}

	handleChange(e){
		
		
		this.setState({'code': e.target.value},()=>{
			//pass
		})
	}
	handleRedirect(){
		
		this.props.history.push({
	    		pathname: `/poll/${this.state.code.toUpperCase()}`,
			});
	}
	render(){
		return(
			<div className="question-box">
				<h2>Answer something.</h2>
				<input onChange={this.handleChange} value={this.state.code} id="code-input" type="text" maxLength='6'></input>
				<div onClick={this.handleRedirect} className="hover-button home-button">
					<h3>GO</h3>
				</div>
			</div>
		)
	}

}

export default withRouter(AnswerQuestion)