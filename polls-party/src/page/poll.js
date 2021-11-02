import React  from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/header';
import Loading from '../components/loading';
import '../style/poll.css';
import Request from '../requets';
import view from '../icons/view.svg';
import notView from '../icons/not-view.svg';






class Poll extends React.Component{

	constructor(props){
		super(props)
		this.handleVote = this.handleVote.bind(this)
		this.handleControlChange = this.handleControlChange.bind(this)
		this.handleRequest = this.handleRequest.bind(this)
		this.handleInsightsToggle = this.handleInsightsToggle.bind(this)
		this.state = {'error':false,'control':'','loading':true,'showInsight':false}
	}

	handleInsightsToggle(){
		this.setState({'showInsight':!(this.state.showInsight)})
	}


	async handleVote(e){

		this.setState({'loading':true})
		let id = e.target.attributes[0].value
		let pollCode = this.props.match.params.code



		if(localStorage.getItem(pollCode) !== null){
			return
		}// if user already voted, do nothing
		

		let req = new Request()
		
		if(this.state.poll.protect === true){// if the polls have protection, get the control field

			if(this.state.control.length > 0){// if control field is not empty
				let data = {
					'token': pollCode,
					'id': id,
					'control_field': this.state.control
				}
				let res = await req.votePoll(localStorage.getItem('token'),JSON.parse(JSON.stringify(data)))

				if(res[0]){
					localStorage.setItem(pollCode,true)
					this.setState({'error':false,'loading':false})
					this.handleRequest()
				}else{
					this.setState({'error':res[1].error,'loading':false})
				}

				
			}else{// if is empty, remenber the user
				this.setState({'loading':false})
				document.getElementById('control-field').focus()
			}
		}else{// if poll not have protection
			let data = {
					'token': pollCode,
					'id': id
				}
				let res = await req.votePoll(localStorage.getItem('token'),JSON.parse(JSON.stringify(data)))
				if(res[0]){
					localStorage.setItem(pollCode,true)
					this.setState({'error':false,'loading':false})
					this.handleRequest()// this call makes the poll update on screen
				}else{
					this.setState({'error':res[1].error,'loading':false})
				}

		}


		
		
	}

	handleControlChange(e){
		this.setState({'control':e.target.value})
	}


	// Makes the request to get a poll
	async handleRequest(){

		
		let req = new Request()
		let res = await req.viewPoll(localStorage.getItem('token'),this.props.match.params.code)

		if(res[0] === true && res.length === 3){
			this.setState({'poll':res[1],'insights':res[2],'error':false,'loading':false})
		}else if(res[0] === true && res.length !== 3){
			this.setState({'poll':res[1],'error':false,'loading':false})
		}else if(res[0] === false){
			this.setState({'error':res[1].error,'loading':false})
		}
	}


	// Makes the request to get a poll
	async componentDidMount(){
		this.handleRequest()
	}

	// Makes the request to get a poll, avery time that state update, if user already voted
	componentDidUpdate(){

		if(localStorage.getItem(this.props.match.params.code) !== null){
			setTimeout(this.handleRequest,3000)			
		}
		
	}





	

	render(){
		

		var firstLoad;
		var insights;

		try {
			var question = this.state.poll.question // get the question text
			var options = this.state.poll.options.sort((a,b)=>a.id-b.id)//ordering the options
			var totalVotes = this.state.poll.total_votes // the percentagem is calculated based on this value
			var protect = this.state.poll.protect //if true, an input will appear
			firstLoad = false
		}catch(e){
			if (e instanceof TypeError){
				firstLoad = true // in the first load the render have nothing to show, because the request is on mount
				//pass
			}
		}
		
		try{
			insights = this.state.insights.sort((a,b)=>a.id-b.id)

		}catch(e){
			if (e instanceof TypeError){
				insights = false
			}
		}
		


		let checked = localStorage.getItem(this.props.match.params.code) !== null  ? true : false;// check if this user already voted, is useful to show the percentage
		return(

			
			<>
				{this.state.loading ? <Loading></Loading> : ''}
				
				<Header></Header>

				
				<main className="poll-box">
				
					{this.state.error !== false ? <span className="poll-error-span">{this.state.error}</span> : ''}

					

					{firstLoad === false && this.state.error === false && this.state.showInsight === false ? <> <div className="question-container">
						<h2 className="question-content"><b>{question}</b></h2>
					</div>

					{protect === true ? <>
						<label htmlFor="control-field">Input your name here:</label>
						<input onChange={this.handleControlChange} disabled={this.state.loading} value={this.state.control} type="text" name="control-field" id="control-field"></input>
						</> : ''}

					{options.map((i)=>{
						let percentage = (i.votes * 100) / totalVotes;

						return(
							<div option-id={i.id} key={i.id} onClick={this.handleVote} className="option-container">
								<h4 option-id={i.id} className="option-content">{i.answer}</h4>
								{checked ? <div className="option-count" style={{width: percentage + '%'}}><h4><b>{percentage.toFixed(2)}%</b></h4></div> : ''}
							</div>)

					})} </>: ''}

					{insights ? <img className="insight-icon" onClick={this.handleInsightsToggle} src={this.state.showInsight ? notView : view } alt="view-button"></img> : ''}

					{this.state.showInsight ? <>
							
							{insights.map((item)=>{
								return(

										<table>
											<tr>
												<td className="td-header">{item.answer}</td>
											</tr>
											<tr>
												<td className="td-votes">{item.votes} Votes</td>
											</tr>
											<div id="div-space"></div>
											{item.controllers.map((item)=>{
												return(<tr><td>{item.control_field}</td></tr>)
											})}
										</table>

									)
								})
							}
						

					</>: ''}
				</main>
			</>
		)
	}


}

export default withRouter(Poll);