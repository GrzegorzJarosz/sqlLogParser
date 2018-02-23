//parser
function parselog(logu, vals){
	let flag = 1;
	let ind = 0;

	while(flag > 0){
		let ifPyt = logu.search(/\?/g);
		if(ifPyt >= 0){
			logu = logu.replace('?', vals[ind]);
			ind++;
		}else{
			flag = -1;
		}
	}
	return logu;
};



module.exports.parseFile= function(item){
	let finalAr;
	let startParams = item.indexOf('[params');

	let arrParams = item.slice(startParams,-1).split(',').map((a)=>{
		let mypos = a.indexOf(')');
		return a.slice(mypos+1).trim();
	}); // arr with params

	let startCommand = item.search(/(SELECT | INSERT | UPDATE | DELETE | CREATE )\S*/g);

	let mainSql = item.slice(startCommand,startParams);
	//console.log(mainSql);

	finalAr = parselog(mainSql, arrParams);

	return finalAr;
}
