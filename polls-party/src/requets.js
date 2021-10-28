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

	async listPolls(user_token){
		let response
		await axios.get('https://polls-party-api.herokuapp.com/api/v1/polls/question-token-total_votes',{headers:{'Authorization': `Token ${user_token}`}})
		.then((res)=>{

			response = [true,res.data]
			
		})
		.catch((err)=>{
			
			response = [false,err.response.data]
		})
		

		return response
	}

	async createPoll(user_token,poll){
		let response
		await axios.post('https://polls-party-api.herokuapp.com/api/v1/polls/question',poll,{headers:{'Authorization': `Token ${user_token}`}})
		.then((res)=>{

			response = [true,res.data]
			
		})
		.catch((err)=>{
			
			response = [false,err.response.data]
		})
		
		return response
	}

	async viewPoll(user_token,poll_token){
		let config = user_token === null ? {} : {headers:{'Authorization': `Token ${user_token}`}}
		let response
		await axios.get(`https://polls-party-api.herokuapp.com/api/v1/polls/${poll_token}/question-options-total_votes-protect`,config)
		.then((res)=>{
			
			response = res.data.poll === undefined ?  [true,res.data] : [true,res.data.poll,res.data.insights]
			
		})
		.catch((err)=>{
			
			response = [false,err.response.data]
			
		})
		
		return response
	}

	async votePoll(user_token,data){
		let config = user_token === null ? {} : {headers:{'Authorization': `Token ${user_token}`}}
		let response
		await axios.post(`https://polls-party-api.herokuapp.com/api/v1/polls/vote/question-options-total_votes-protect`,data,config)
		.then((res)=>{
			
			response = res.data.poll === undefined ?  [true,res.data] : [true,res.data.poll,res.data.insights]
			
			
		})
		.catch((err)=>{
			
			response = [false,err.response.data]
			
		})
		
		return response
	}


}

