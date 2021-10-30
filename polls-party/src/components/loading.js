import React  from 'react';
import '../style/loading.css'
import loadGif from '../icons/loading.gif'

export default class Loading extends React.Component {

	render(){
		return(
			<div className="loading-box">
				<img src={loadGif} alt="loading gif"></img>
			</div>

			)

	}
}