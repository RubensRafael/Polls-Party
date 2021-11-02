import React  from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/header';
import '../style/create.css';
import Request from '../requets';
import addIcon from '../icons/add-icon.svg';
import deleteIcon from '../icons/delete-icon.svg';




class Create extends React.Component{

	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleAddClick = this.handleAddClick.bind(this)
		this.handleDeleteClick = this.handleDeleteClick.bind(this)
		this.handleFocus = this.handleFocus.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleConfigChange = this.handleConfigChange.bind(this)
		this.state = {'content':['Input your question here.'],'active':0, 'config':['','','',''] ,'loading':false,'error':false}
	}



	// Update the list of content, when any field change, based on the position of the field
	handleChange(e){
		let value = e.target.value //value
		let index = parseInt(e.target.attributes[0].value)//position
		let content = this.state.content
		content[index] = value
		this.setState({'content':content})
	}
	// Add a new textarea, just appending a new value on the array of contents
	// The value will be setted on the position where was clicked + 1
	handleAddClick(e){
		let index = parseInt(e.target.attributes[0].value) + 1 // position
		let content = this.state.content
		content.splice(index,0,"Input an option here.") // insert new default textarea on the position
		this.setState({'content':content,'active':index})// set this position like 'active' , to receive the 'add' and 'delete' buttons

	}
	// Remove a textarea, just deleting her value on the array of contents
	handleDeleteClick(e){
		let index = parseInt(e.target.attributes[0].value)// position
		let content = this.state.content
		let newActive = index === 0 ? 0 : content.length - 2 // set the textarea with the buttons 'add' and 'delete'
		// this makes impossible remove the first textarea, because she is the question
		index === 0 ? content.splice(index,1,'Input your question here.') : content.splice(index,1)
		this.setState({'content':content,'active':newActive})
	}

	// Active the atual textarea 
	handleFocus(e){
		let index = parseInt(e.target.attributes[0].value)
		this.setState({'active':index})
	}

	// get the config and the content and makes a request to create the poll, after, redirect to dashboard
	async handleSubmit(){
		this.setState({'loading':true})
		let config = this.state.config
		let content = this.state.content
		

		let mappedConfig = config.map((i)=>{
				return i !== '' ? i : false
		})// adjust the config

		let mappedContent = Object.assign({}, content.slice(1))// Remove the question from content

		let poll = {
			"question" : content[0],//question, first item from content
			"options": mappedContent,//all options
			"config" : {
				"all_options" : mappedConfig[0],//true or false
				"no_option" : mappedConfig[1], //true or false
				"protect" : mappedConfig[2], //true or false
				"time" : parseInt(mappedConfig[3]), // time to expires the poll
			}

		}

		let req = new Request()
		let res = await req.createPoll(localStorage.getItem('token'),JSON.parse(JSON.stringify(poll)))
		
		res[0] === true ? this.props.history.push({pathname: `/dashboard`}) : this.setState({'error':true, 'loading': false})

	}

	// set the config, when change
	handleConfigChange(e){
		
		let index = parseInt(e.target.attributes[0].value)
		let config = this.state.config

		if(index < 3){
			config.splice(index,1,e.target.checked)
		}else if(parseInt(e.target.value) > 0 && parseInt(e.target.value) < 24){
			config.splice(index,1,e.target.value)
		}else{
			config.splice(index,1,'')
		}

		this.setState({'config':config})
		


	}

	componentDidMount(){
		// if user is not logged, redirect to login
		if(localStorage.getItem('token') === null){
    		 this.props.history.push({pathname: `/login`});
    	}

	}

	render(){
		// Set the options list. based on loop on the 'content' state, in order
		let display = []

		for(let i=0;i<this.state.content.length;i++){
			
			let div = <>
				<div key={i} className="textarea-box">
					<textarea  index={i} className="write-area" maxLength="255" onFocus={this.handleFocus} onChange={this.handleChange} value={this.state.content[i]} disabled={this.state.loading} name=""  cols="30" rows="7"></textarea>
					{ i === this.state.active ? <div className="add-or-del-box">
						<div index={i} onClick={this.handleAddClick} className="add-button control-button">
							<h4 index={i} >Add Option </h4>
							<img index={i} src={addIcon} alt="add-icon"></img>
						</div>
						<div index={i} onClick={this.handleDeleteClick} className="del-button control-button">
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
				<main className="create-box">
					<h3 className="create-title">What will be the question for today?</h3>
					{display}
					<section className="config-master-box">
						<div className="config-box">
	  						<input configindex="0" onChange={this.handleConfigChange} checked={this.state.config[0]} type="checkbox" id="all-options" name="all-options" disabled={this.state.loading}></input>
	  						<label htmlFor="all-options">Add the Field: "All Options" on your poll.</label>
						</div>
						<div className="config-box">
	  						<input configindex="1" onChange={this.handleConfigChange} checked={this.state.config[1]} type="checkbox" id="no-options" name="no-options" disabled={this.state.loading}></input>
	  						<label htmlFor="no-options">Add the Field: "No Option" on your poll.</label>
						</div>
						<div className="config-box">
	  						<input configindex="2" onChange={this.handleConfigChange} checked={this.state.config[2]} type="checkbox" id="protect" name="protect" disabled={this.state.loading}></input>
	  						<label htmlFor="protect">Makes required an identifier field on your poll.</label>
						</div>
						<div className="config-box">
	  						<input configindex="3" onChange={this.handleConfigChange} value={this.state.config[3]} className="config-input" type="number" min ="0" max="24" id="expires-in" name="expires-in" disabled={this.state.loading}></input>
	  						<label htmlFor="expires-in">Time to expires and reload the poll's code.</label>
						</div>
					</section>
					{this.state.content.length > 2 ? <div onClick={this.handleSubmit} className="send-button hover-button">Send</div> : ''}
				</main>
			</>
		)
	}

	
}

export default withRouter(Create);






