import axios from 'axios';

var key = 'Token ' + process.env.REACT_APP_API
export default class Request{

	async create(name,email,password){
		let response
		await axios.post('https://polls-party-api.herokuapp.com/api/v1/user/create',{
			'username': name,
			'email': email,
			'password': password
		},{headers:{'Authorization': key }})
		.then((res)=>{

			response = [true,res.data]
		})
		.catch((err)=>{
			
			response = [false,err.response.data]
		})

		return response
	}

	async login(name,password){
		let response
		await axios.post('https://polls-party-api.herokuapp.com/api-token-auth/',{
			'username': name,
			'password': password
		})
		.then((res)=>{

			response = [true,res.data]
		})
		.catch((err)=>{
			
			response = [false,err.response.data]
		})

		return response
	}


}


