import React  from 'react';
import { withRouter } from 'react-router-dom';
import BoxQuestion from '../components/boxquestion';
import AnswerQuestion from '../components/boxanswer';
import Header from '../components/header';
import '../style/home.css';




var back = process.env.PUBLIC_URL + 'teste.gif';
class Home extends React.Component{



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
	//If user is logged, redirect to dashboard
	componentDidMount(){		

		if(localStorage.getItem('token') !== null){
    		 this.props.history.push({pathname: `/dashboard`});
    	}
	}
}

export default withRouter(Home);






