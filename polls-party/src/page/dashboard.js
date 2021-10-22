import React  from 'react';
import Header from '../components/header';
import Request from '../requets';
import '../style/dashboard.css'
import { withRouter } from 'react-router-dom';




var arrowIcon = process.env.PUBLIC_URL + 'arrow-icon.svg';
 class Dashboard extends React.Component{

	constructor(props){
		super(props)
		
		this.handleClick = this.handleClick.bind(this)
		
		this.state = {'none':undefined}
	}




	handleClick(e){
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
		
		res[0] === true ? this.setState({'polls':res[1],'error':false}) : this.setState({'error':true, 'polls': false})
	}


	render(){

		

		let polls = this.state.polls
		let display = [];
		polls = polls ? this.state.polls : []
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
								<img src={arrowIcon} alt="arrow icon" className="poll-info arrow"></img>
							</div>
						

					return question
					})
				}


			</>


		} 


		


		return(
			<>
				<Header></Header>
				<main className='dashboard'>
					<h3 className="welcome">See yours created polls</h3>
					<div onClick={this.handleClick} className='hover-button newpoll-button'>New Poll</div>
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







