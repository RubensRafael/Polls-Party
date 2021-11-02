import React  from 'react';
import Header from '../components/header';
import Loading from '../components/loading';
import PollList from '../components/polllist';
import Request from '../requets';
import '../style/dashboard.css'
import { withRouter } from 'react-router-dom';
import code from '../icons/code.svg';




 class Dashboard extends React.Component{

	constructor(props){
		super(props)
		
		this.handleNewPollClick = this.handleNewPollClick.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleCode = this.handleCode.bind(this)
		this.state = {'none':undefined,'loading':true,'showCode' : false}
	}

	handleCode(){
		this.setState({'showCode':true})
	}

	// redirect to exact poll, based on code on the text input.
	handleSubmit(e){
		this.props.history.push({
	    		pathname: `/poll/${e.target[0].value.toUpperCase()}`,
			});
		
	}


	// Redirect to create a new poll
	handleNewPollClick(e){
		this.props.history.push({
	    		pathname: `/create`,
			});		
		
	}



	async componentDidMount(){

	// if user is not logged, redirect to login
		if(localStorage.getItem('token') === null){
    		 this.props.history.push({pathname: `/login`});
    	}
	
    	// makes a request to receive a list of polls created by user
		let req = new Request()
		let res = await req.listPolls(localStorage.getItem('token'))
		res[0] === true ? this.setState({'polls':res[1],'error':false,'loading':false}) : this.setState({'error':true, 'polls': false,'loading':false})
	}


	render(){
		


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
					<PollList polls={this.state.polls}></PollList>
					<div onClick={this.handleCode} id='api-span'>
						{this.state.showCode === false ? <img src={code} alt="code"></img>: <>
						<span>Your API Token is: {localStorage.getItem('token')}</span>
						<a target='_blank' rel='noreferrer'  href="https://github.com/RubensRafael/polls-party-api">Learn more here</a></>}
					</div>
					
				</main>
			</>
		)
	}
}

export default withRouter(Dashboard)







