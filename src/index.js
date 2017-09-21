module.exports = function zeros(expression) {
	var result = expression.split('*').reduce(function(previousValue, currentValue) {
		var factorial = 1;
		if(currentValue.indexOf("!!") !== -1){
			currentValue = parseInt(currentValue.replace(/!!/g,''));
			var zero = 1
			if(currentValue % 2 === 0)
				var zero = 2;
			for(zero; zero <= currentValue; zero += 2)
				factorial = multiply(factorial,zero);
		}
		else if(currentValue.indexOf("!") !== -1){
			currentValue = parseInt(currentValue.replace(/!/g,''));
			for(var zero = 1; zero <= currentValue; zero++)
				factorial = multiply(factorial,zero);
		}
		
		if(previousValue == 0)
			return factorial;
		else
			return multiply(previousValue,factorial);	
	}, 0);

	result = result.toString();
	var zero = 0;
	for(var i = result.length-1; i >= 0; i--)
		if(result[i] == "0")
			zero++;
		else
			break;
	return zero;
}

function multiply(first, second) {
	first = first.toString().split("").map(Number).reverse();
	second = second.toString().split("").map(Number).reverse();
	
	var result = Array.from(first).concat(Array.from(second)).fill(0);
	for (var i = 0; i < first.length; i++)
		for (var j = 0; j < second.length; j++)
			result[i+j] = result[i+j] + first[i] * second[j];
	
	for (i = 0; i < result.length-1; i++) {
		result[i+1] = result[i+1] + Math.floor(result[i] / 10);
		result[i] = result[i] % 10;
	}
	result.reverse();
	
	while(result[0] === 0) 
		result.shift();
	return result.join("") || "0";
}