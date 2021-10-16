import React  from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/header';
import '../style/create.css';




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
				<div key={i}>
					<textarea key="0" index={i} onFocus={this.handleFocus} onChange={this.handleChange} value={this.state.content[i]} name=""  cols="30" rows="10"></textarea>
					{ i === this.state.active ? <div>
						<button index={i} onClick={this.handleAddClick} key="1">add</button>
						<button index={i} onClick={this.handleDeleteClick} key="2">delete</button>
					</div>: ''}
				</div>
			</>
			
			display.push(div)
		}
		
		
		return(
			<>
				<Header></Header>
				<main>
					{display}
					{this.state.content.length > 2 ? <div>enviar</div> : ''}
				</main>
			</>
		)
	}

	
}

export default withRouter(Create);






