import axios from 'axios';


export default class Request{

	async safeCreat(name,email){
		await axios.post('https://polls-party-api.herokuapp.com/api/v1/user/verif',{
			'username': name,
			'email': email,
		},{headers:{'Authorization':'Token '}})
		.then((res)=>{
			return [true,res.data]
		})
		.catch((err)=>{
			return [false,err.res.data]
		})
	}
	safeCreate(name,email){
		console.log(name,email)
		return [true,{'email':false}]
	}


	create(){
		return [false]
	}
}


