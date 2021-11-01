import React  from 'react';
import '../style/header.css';
import github from '../icons/github.svg'
import logo from '../icons/logo.png'
import logout from '../icons/logout.svg'
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
	constructor(props){
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout(){
		localStorage.removeItem('token');
		this.props.history.push({pathname:'/'})
	}
	render(){
		return(
			<header className="home-header">
				<a href="https://github.com/RubensRafael/Polls-Party"><img className="header-icon" src={github} alt="github-repo"></img></a>
				
				<img src={logo} alt="logo"></img>
				{localStorage.getItem('token') !== null ? <img onClick={this.handleLogout} className="header-icon" src={logout} alt="logout"></img>: <div></div>}
			</header>

			)

	}
}

export default withRouter(Header)