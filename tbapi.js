(function(){
	var tbapiListener = [];
	window.addEventListener("message", function(event) {
		if (event.source != window || event.data.direction != "out")
			return;
		if (typeof tbapiListener[event.data.type] != 'undefined') tbapiListener[event.data.type](event.data.response);
	}, false);
	window.tbapi = {
		requestAccess : function(){
			return new Promise(function (resolve, reject) {
				tbapiListener["requestAccess"] = resolve;
				window.postMessage({ direction : "in", type : "requestAccess"}, "*");
			});
		},
		haveAccess : function(){
			return new Promise(function (resolve, reject) {
				tbapiListener["haveAccess"] = resolve;
				window.postMessage({ direction : "in", type : "haveAccess"}, "*");
			});
		},
		getActiveAccount : function(){
			return new Promise(function (resolve, reject) {
				tbapiListener["getActiveAccount"] = resolve;
				window.postMessage({ direction : "in", type : "getActiveAccount"}, "*");
			});
		},
		getAllAccounts : function(){
			return new Promise(function (resolve, reject) {
				tbapiListener["getAllAccounts"] = resolve;
				window.postMessage({ direction : "in", type : "getAllAccounts"}, "*");
			});
		},
		initiateTransaction : function(source, destination, amount, fee, parameters, gas_limit, storage_limit){
			return new Promise(function (resolve, reject) {
				tbapiListener["initiateTransaction"] = resolve;
				if (!source || !destination || !amount) throw "Missing required arguments";
				var dd = {
					source : source,
					destination : destination,
					amount : amount
				}
				if (typeof parameters != 'undefined') dd.parameters = parameters;
				if (typeof gas_limit != 'undefined') dd.gas_limit = gas_limit;
				if (typeof storage_limit != 'undefined') dd.storage_limit = storage_limit;
				if (typeof fee != 'undefined') dd.fee = fee;

				window.postMessage({ direction : "in", type : "initiateTransaction", data:dd
				}, "*");
			});
		},
		signData : function(d){
			throw "Not yet supported";
			return new Promise(function (resolve, reject) {
				tbapiListener["signData"] = resolve;
				window.postMessage({ direction : "in", type : "signData", data:d}, "*");
			});
		}
	}
	if (typeof window.tbapiOnload != "undefined"){
		window.tbapiOnload();
	}
})();
