import React  from 'react';
import { withRouter } from 'react-router-dom';
import arrowIcon from '../icons/arrow-icon.svg';


class PollList extends React.Component {
	
	constructor(props){
		super(props)
		this.handleExactPollClick = this.handleExactPollClick.bind(this)
	}

	// Redirect to corresponding poll, when click on arrow.
	handleExactPollClick(e){
		this.props.history.push({
	    		pathname: `/poll/${e.target.attributes[0].value}`
			});
	}

	render(){
		//Set the poll list
		let polls = this.props.polls
		let display = [];
		polls = polls ? this.props.polls : []
		polls.reverse() // reverse the order to the more recents appear on top

		if(polls.length === 0){//if the array is empty
			display = <div className="dashboard-warn">Nothing here. Try create a new poll.</div>
		}else{// else, an loops will be estract all data necessary to display each poll.
			display =<>
				{
					polls.map((item,index)=>{

					let question = 
							
							<div key={item.token.token} className={index === 0 ?"list-item first-item":"list-item"}>
								<p className="poll-info poll-text">{item.question}</p>
								<div className="poll-info">{item.token.token}</div>
								<div className="poll-info">{item.total_votes}</div>
								<img token={item.token.token} onClick={this.handleExactPollClick} src={arrowIcon} alt="arrow icon" className="poll-info arrow"></img>
							</div>
						

					return question
					})
				}
			</>
		}
		
		return(
			<>
				{display}
			</>
			)
	}
}

export default withRouter(PollList)