import React  from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/header';
import '../style/create.css';



var addIcon = process.env.PUBLIC_URL + 'add-icon.svg';
var deleteIcon = process.env.PUBLIC_URL + 'delete-icon.svg';
class Create extends React.Component{

	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleAddClick = this.handleAddClick.bind(this)
		this.handleDeleteClick = this.handleDeleteClick.bind(this)
		this.handleFocus = this.handleFocus.bind(this)
		this.state = {'content':['Input your question here.'],'active':0}
	}


	handleChange(e){
		let value = e.target.value
		let index = parseInt(e.target.attributes[0].value)
		let content = this.state.content
		content[index] = value
		this.setState({'content':content})
	}

	handleAddClick(e){
		console.log(e.target.attributes[0])
		let index = parseInt(e.target.attributes[0].value) + 1
		let content = this.state.content
		content.splice(index,0,"Input an option here.")
		this.setState({'content':content,'active':index})

	}

	handleDeleteClick(e){
		let index = parseInt(e.target.attributes[0].value)
		let content = this.state.content
		let newActive = index === 0 ? 0 : content.length - 2
		index === 0 ? content.splice(index,1,'Input your question here.') : content.splice(index,1)
		this.setState({'content':content,'active':newActive})
	}

	handleFocus(e){
		let index = parseInt(e.target.attributes[0].value)
		this.setState({'active':index})
	}
	componentDidMount(){
			let routingFunction = (param) => {
				this.props.history.push({
		    		pathname: `/login`,
		    		state: param
				});
			}

			if(localStorage.getItem('token') === null){
	    		 routingFunction()
	    	}
		}

	render(){
		
		let display = []

		for(let i=0;i<this.state.content.length;i++){
			
			let div = <>
				<div className="textarea-box" key={i}>
					<textarea key="0" index={i} onFocus={this.handleFocus} onChange={this.handleChange} value={this.state.content[i]} name=""  cols="30" rows="7"></textarea>
					{ i === this.state.active ? <div className="add-or-del-box">
						<div index={i} onClick={this.handleAddClick} key="1"className="add-button control-button">
							<h4 index={i} >Add Option </h4>
							<img index={i} src={addIcon} alt="add-icon"></img>
						</div>
						<div index={i} onClick={this.handleDeleteClick} key="2" className="del-button control-button">
							<h4 index={i}>Delete Option </h4>
							<img index={i} src={deleteIcon} alt="deleteIcon"></img>
						</div>
					</div>: ''}
				</div>
			</>
			
			display.push(div)
		}
		
		
		return(
			<>
				<Header></Header>
				<main>
					<h3>What will be the question for today?</h3>
					{display}
					{this.state.content.length > 2 ? <div className="send-button hover-button">Send</div> : ''}
				</main>
			</>
		)
	}

	
}

export default withRouter(Create);






