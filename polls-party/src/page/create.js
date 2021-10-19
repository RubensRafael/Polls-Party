import React  from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/header';
import '../style/create.css';
import Request from '../requets';



var addIcon = process.env.PUBLIC_URL + 'add-icon.svg';
var deleteIcon = process.env.PUBLIC_URL + 'delete-icon.svg';
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




	handleChange(e){
		let value = e.target.value
		let index = parseInt(e.target.attributes[0].value)
		let content = this.state.content
		content[index] = value
		this.setState({'content':content})
	}

	handleAddClick(e){
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

	async handleSubmit(){
		this.setState({'loading':true})
		let config = this.state.config
		let content = this.state.content
		content.splice(0,1)

		let mappedConfig = config.map((i)=>{
				return i !== '' ? i : false
		})

		let mappedContent = Object.assign({}, content)

		let poll = {
			"question" : this.state.content[0],
			"options": mappedContent,
			"config" : {
				"all_options" : mappedConfig[0],
				"no_option" : mappedConfig[1],
				"protect" : mappedConfig[2],
				"time" : parseInt(mappedConfig[3]),
			}

		}

		let routingFunction = (param) => {
				this.props.history.push({
		    		pathname: `/dashboard`,
		    		state: param
				});
			}

		let req = new Request()
		let res = await req.createPoll(localStorage.getItem('token'),JSON.parse(JSON.stringify(poll)))
		
		res[0] === true ? routingFunction() : this.setState({'error':true, 'loading': false})

	}
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
					<textarea key="0" index={i} onFocus={this.handleFocus} onChange={this.handleChange} value={this.state.content[i]} disabled={this.state.loading} name=""  cols="30" rows="7"></textarea>
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
					<section className="config-master-box">
						<div className="config-box">
	  						<input configindex="0" onChange={this.handleConfigChange} checked={this.state.config[0]} type="checkbox" id="all-options" name="all-options" disabled={this.state.loading}></input>
	  						<label for="all-options">Add the Field: "All Options" on your poll.</label>
						</div>
						<div className="config-box">
	  						<input configindex="1" onChange={this.handleConfigChange} checked={this.state.config[1]} type="checkbox" id="no-options" name="no-options" disabled={this.state.loading}></input>
	  						<label for="no-options">Add the Field: "No Option" on your poll.</label>
						</div>
						<div className="config-box">
	  						<input configindex="2" onChange={this.handleConfigChange} checked={this.state.config[2]} type="checkbox" id="protect" name="protect" disabled={this.state.loading}></input>
	  						<label for="protect">Makes required an identifier field on your poll.</label>
						</div>
						<div className="config-box">
	  						<input configindex="3" onChange={this.handleConfigChange} value={this.state.config[3]} type="number" min ="0" max="24" id="expires-in" name="expires-in" disabled={this.state.loading}></input>
	  						<label for="expires-in">Time to expires and reload the poll's code.</label>
						</div>
					</section>
					{this.state.content.length > 2 ? <div onClick={this.handleSubmit} className="send-button hover-button">Send</div> : ''}
				</main>
			</>
		)
	}

	
}

export default withRouter(Create);






