import React  from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/header';
import '../style/poll.css';




class Poll extends React.Component{

	constructor(props){
		super(props)
		this.state = {'poll':{
    "id": 2,
    "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis, velit non volutpat hendrerit, nulla diam volutpat ex, vel ultricies justo nibh finibus nisl. Etiam congue, quam vitae consequat bibendum, nisi lectus egestas magna, vel mollis ex nunc quis turpis. In sit amet elit lorem. Pellentesque aliquam nisi tempus, eleifend orci at, sagittis lorem. Nunc molestie aliquam velit, luctus malesuada nibh porttitor sit amet. Ut sodales scelerisque metus eu condimentum. Sed nec odio scelerisque arcu gravida consequat. Sed pellentesque hendrerit venenatis. Nunc lacinia at elit ac bibendum. Etiam ultrices augue sed rutrum efficitur. Aliquam at luctus nibh. Donec egestas, nisl quis iaculis mattis, tortor mauris ullamcorper leo, a luctus libero diam at nibh. In viverra velit eget venenatis pulvinar.",
    "total_votes": 6,
    "options": [
        {
            "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis, velit non volutpat hendrerit, nulla diam volutpat ex,",
            "votes": 1,
            "id": 3
        },
        {
            "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis, velit non volutpat hendrerit, nulla diam volutpat ex,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis, velit non volutpat hendrerit, nulla diam volutpat ex,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis, velit non volutpat hendrerit, nulla diam volutpat ex,",
            "votes": 3,
            "id": 4
        },
        {
            "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis, velit non volutpat hendrerit, nulla diam volutpat ex, vel ultricies justo nibh finibus nisl. Etiam congue, quam vitae consequat bibendum, nisi lectus egestas magna, vel mollis ex nunc quis turpis. In sit amet elit lorem. Pellentesque aliquam nisi tempus, eleifend orci at, sagittis lorem. Nunc molestie aliquam velit, luctus malesuada nibh porttitor sit amet. Ut sodales scelerisque metus eu condimentum. Sed nec odio scelerisque arcu gravida consequat. Sed pellentesque hendrerit venenatis. Nunc lacinia at elit ac bibendum. Etiam ultrices augue sed rutrum efficitur. Aliquam at luctus nibh. Donec egestas, nisl quis iaculis mattis, tortor mauris ullamcorper leo, a luctus libero diam at nibh. In viverra velit eget venenatis pulvinar.",
            "votes": 2,
            "id": 5
        }
    ],
    "expires_in": null,
    "token": {
        "token": "48EQAF"
    },
    "protect": false
}
}
	}

	render(){
		
		let question = this.state.poll.question
		let options = this.state.poll.options
		let totalVotes = this.state.poll.total_votes
		let checked = localStorage.getItem('checked') !== null  ? true : false;
		return(
			<>
				<Header></Header>
				<main className="poll-box">
					<div className="question-container">
						<h2 className="question-content"><b>{question}</b></h2>
					</div>
					{options.map((i)=>{
						let percentage = (i.votes * 100) / totalVotes;

						return(
							<div option-id={i.id} className="option-container">
								<h4 option-id={i.id} className="option-content">{i.answer}</h4>
								{checked ? <div className="option-count" style={{width: percentage + '%'}}><h4><b>{percentage.toFixed(2)}%</b></h4></div> : ''}
							</div>)
					})}
				</main>
			</>
		)
	}

	componentDidMount(){

	}
}

export default withRouter(Poll);






