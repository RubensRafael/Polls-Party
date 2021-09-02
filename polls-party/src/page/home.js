import React  from 'react';
import '../style/home.css';


/*class Any extends React.Component {
	render(){
		return(

		)
	}
}*/
var back = process.env.PUBLIC_URL + 'teste.gif';
export default class Home extends React.Component{

	render(){
		
		return(
			<>
				<Header></Header>
				<div id='background-box' style={{backgroundImage:`url(${back})`}}>
					<h1>Welcome to Polls Party!<br></br>Ask and answer everything.</h1>
				</div>	
				<main className="home-main">
					<BoxQuestion></BoxQuestion>
					<AnswerQuestion></AnswerQuestion>
				</main>
			</>
		)
	}
}

class Header extends React.Component {

	render(){
		return(
			<header className="home-header"></header>

			)

	}
}

class BoxQuestion extends React.Component {
	render(){
		return(
			<div className="question-box">
				<h2>Ask something.</h2>
				<div className="home-button">
					<h3>AAAAA</h3>
				</div>
			</div>
		)
	}

}

class AnswerQuestion extends React.Component {
	render(){
		return(
			<div className="question-box">
				<h2>Answer something.</h2>
				<div className="home-button">
					<h3>AAAAA</h3>
				</div>
			</div>
		)
	}

}
