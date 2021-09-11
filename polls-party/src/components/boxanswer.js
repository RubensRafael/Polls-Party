import React  from 'react';
import { withRouter } from 'react-router-dom';

class AnswerQuestion extends React.Component {
	render(){
		return(
			<div className="question-box">
				<h2>Answer something.</h2>
				<input id="code-input" type="text" maxLength='6'></input>
				<div className="home-button">
					<h3>AAAAA</h3>
				</div>
			</div>
		)
	}

}

export default withRouter(AnswerQuestion)