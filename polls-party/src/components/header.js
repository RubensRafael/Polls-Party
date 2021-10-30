import React  from 'react';
import '../style/header.css';
import github from '../icons/github.svg'
import logo from '../icons/logo.png'
import logout from '../icons/logout.svg'


export default class Header extends React.Component {

	render(){
		return(
			<header className="home-header">
				<a href="https://github.com/RubensRafael/Polls-Party"><img className="header-icon" src={github} alt="github-repo"></img></a>
				
				<img src={logo} alt="logo"></img>
				<img className="header-icon" src={logout} alt="logout"></img>
			</header>

			)

	}
}