let routingFunction = (param) => {
			this.props.history.push({
	    		pathname: `/dashboard`,
	    		state: param
			});
		}

export default routingFunction;