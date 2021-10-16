import React  from 'react';
import Header from '../components/header';
import Request from '../requets';
import '../style/dashboard.css'
import { withRouter } from 'react-router-dom';





 class Dashboard extends React.Component{

	constructor(props){
		super(props)
		
		this.handleClick = this.handleClick.bind(this)
		
		this.state = {'none':undefined}
	}




	handleClick(e){
		e.preventDefault()
		
		
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
								<p className="poll-info">{item.question}</p>
								<div className="poll-info">{item.token.token}</div>
								<div className="poll-info">{item.total_votes}</div>
								<div className="poll-info">entrar</div>
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
					<div className='hover-button newpoll-button'>New Poll</div>
					<form onSubmit={this.handleClick} className='dashboard-input'>
						<input id="code-input" type="text" maxLength='6' placeholder="Input a code" ></input>
						<input type="submit" value="GO!"></input>
					</form>
					{display}
				</main>
			</>
		)
	}
}

export default withRouter(Dashboard)







