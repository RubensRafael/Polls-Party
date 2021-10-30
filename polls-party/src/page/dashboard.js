import React  from 'react';
import Header from '../components/header';
import Loading from '../components/loading';
import Request from '../requets';
import '../style/dashboard.css'
import { withRouter } from 'react-router-dom';
import arrowIcon from '../icons/arrow-icon.svg';



 class Dashboard extends React.Component{

	constructor(props){
		super(props)
		
		this.handleNewPollClick = this.handleNewPollClick.bind(this)
		this.handleExactPollClick = this.handleExactPollClick.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		
		this.state = {'none':undefined,'loading':true}
	}

	handleSubmit(e){
		this.props.history.push({
	    		pathname: `/poll/${e.target[0].value.toUpperCase()}`,
			});
		
	}

	handleExactPollClick(e){
		this.props.history.push({
	    		pathname: `/poll/${e.target.attributes[0].value}`,
			});
	}

	handleNewPollClick(e){
		let routingFunction = (param) => {
			this.props.history.push({
	    		pathname: `/create`,
	    		state: param
			});
		}
		routingFunction()
    	

		
		
	}



	async componentDidMount(){

		
		let routingFunction = (param) => {
			this.props.history.push({
	    		pathname: `/login`,
	    		state: param
			});
		}

		if(localStorage.getItem('token') === null){
    		 routingFunction()
    	}
	

		let req = new Request()
		let res = await req.listPolls(localStorage.getItem('token'))
		
		res[0] === true ? this.setState({'polls':res[1],'error':false,'loading':false}) : this.setState({'error':true, 'polls': false,'loading':false})
	}


	render(){

		

		let polls = this.state.polls
		let display = [];
		polls = polls ? this.state.polls : []
		polls.reverse()
		if(polls.length === 0){
			display = <div className="dashboard-warn">Nothing here. Try create a new poll.</div>
		}else{
			display =<>
				{
					polls.map((item,index)=>{

					let question = 
							
							<div  className={index === 0 ?"list-item first-item":"list-item"}>
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
				{this.state.loading ? <Loading></Loading> : ''}
				<Header></Header>
				<main className='dashboard'>
					<h3 className="welcome">See yours created polls</h3>
					<div onClick={this.handleNewPollClick} className='hover-button newpoll-button'>New Poll</div>
					<form onSubmit={this.handleSubmit} className='dashboard-form'>
						<input id="code-input" className='dashboard-input' type="text" maxLength='6' placeholder="Input a code" ></input>
						<input type="submit" className='dashboard-input go' value="GO!"></input>
					</form>
					{display}
				</main>
			</>
		)
	}
}

export default withRouter(Dashboard)







