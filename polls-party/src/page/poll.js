import React  from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/header';
import '../style/poll.css';
import Request from '../requets';
import axios from 'axios';




class Poll extends React.Component{

	constructor(props){
		super(props)
		this.handleVote = this.handleVote.bind(this)
		this.handleControlChange = this.handleControlChange.bind(this)
		this.handleRequest = this.handleRequest.bind(this)
		this.handleInsightsToggle = this.handleInsightsToggle.bind(this)
		this.state = {'error':false,'control':'','loading':false,'showInsight':false}
	}

	handleInsightsToggle(){
		this.setState({'showInsight':!(this.state.showInsight)})
	}
	async handleVote(e){

		this.setState({'loading':true})
		let id = e.target.attributes[0].value
		let pollCode = this.props.match.params.code



		if(localStorage.getItem(pollCode) !== null){
			console.log('retrn')
			return
		} 
		

		let req = new Request()
		
		if(this.state.poll.protect === true){

			if(this.state.control.length > 0){
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

				
			}else{
				this.setState({'loading':false})
				document.getElementById('control-field').focus()
			}
		}else{
			let data = {
					'token': pollCode,
					'id': id
				}
				let res = await req.votePoll(localStorage.getItem('token'),JSON.parse(JSON.stringify(data)))
				if(res[0]){
					localStorage.setItem(pollCode,true)
					this.setState({'error':false,'loading':false})
					this.handleRequest()
				}else{
					this.setState({'error':res[1].error,'loading':false})
				}

		}


		
		
	}

	handleControlChange(e){
		this.setState({'control':e.target.value})
	}

	async handleRequest(){

		//let cancelToken = axios.CancelToken;
		//let source = cancelToken.source();
		let req = new Request()
		let res = await req.viewPoll(localStorage.getItem('token'),this.props.match.params.code)

		if(res[0] === true && res.length === 3){
			this.setState({'poll':res[1],'insights':res[2],'error':false})
		}else if(res[0] === true && res.length !== 3){
			this.setState({'poll':res[1],'error':false})
		}else if(res[0] === false){
			this.setState({'error':res[1].error})
		}
	}
	async componentDidMount(){
		console.log('chama')	
		this.handleRequest()
	}

	componentDidUpdate(){

		if(localStorage.getItem(this.props.match.params.code) !== null){
			setTimeout(this.handleRequest,3000)			
		}
		
	}





	

	render(){
		

		var firstLoad;
		var insights;

		try {
			var question = this.state.poll.question
			var options = this.state.poll.options.sort((a,b)=>a.id-b.id)
			var totalVotes = this.state.poll.total_votes
			var protect = this.state.poll.protect
			firstLoad = false
		}catch(e){
			if (e instanceof TypeError){
				firstLoad = true
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
		


		let checked = localStorage.getItem(this.props.match.params.code) !== null  ? true : false;
		return(

			
			<>
				<Header></Header>

				
				<main className="poll-box">
				
					{this.state.error !== false ? <span className="poll-error-span">{this.state.error}</span> : ''}

					{firstLoad === false && this.state.error === false && this.state.showInsight === false ? <> <div className="question-container">
						<h2 className="question-content"><b>{question}</b></h2>
					</div>
					{protect === true ? <>
						<label for="control-field">Input your name here:</label>
						<input onChange={this.handleControlChange} disabled={this.state.loading} value={this.state.control} type="text" name="control-field" id="control-field"></input>
						</> : ''}
					{options.map((i)=>{
						let percentage = (i.votes * 100) / totalVotes;

						return(
							<div option-id={i.id} onClick={this.handleVote} className="option-container">
								<h4 option-id={i.id} className="option-content">{i.answer}</h4>
								{checked ? <div className="option-count" style={{width: percentage + '%'}}><h4><b>{percentage.toFixed(2)}%</b></h4></div> : ''}
							</div>)
					})} </>: ''}

					{insights ? <div onClick={this.handleInsightsToggle}>A</div> : ''}

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
							})}
						

					</>: ''}
				</main>
			</>
		)
	}


}

export default withRouter(Poll);

	/*
	[
    {
        "answer": "Input an option here.",
        "votes": 0,
        "controllers": []
    },
    {
        "answer": "Input an option here.",
        "votes": 1,
        "controllers": [
            {
                "control_field": "UM"
            }
        ]
    }
]
	*/




/*{
    "question": "SAPDL",
    "total_votes": 2,
    "options": [
        {
            "answer": "Terceira",
            "votes": 0,
            "id": 101
        },
        {
            "answer": "Quarta",
            "votes": 0,
            "id": 102
        },
        {
            "answer": "Primeira",
            "votes": 1,
            "id": 99
        },
        {
            "answer": "Segunda",
            "votes": 1,
            "id": 100
        }
    ],
    "protect": true
}


[
    {
        "answer": "Terceira",
        "votes": 0,
        "controllers": []
    },
    {
        "answer": "Quarta",
        "votes": 0,
        "controllers": []
    },
    {
        "answer": "Primeira",
        "votes": 1,
        "controllers": [
            {
                "control_field": "ONE"
            }
        ]
    },
    {
        "answer": "Segunda",
        "votes": 1,
        "controllers": [
            {
                "control_field": "SECOND"
            }
        ]
    }
]*/