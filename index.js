
/**
* Метрод проверки с хэшами
*/
function genString(len = 5){
    var text = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let alphabet_len = alphabet.length;

    for( var i=0; i < len; i++ )
        text += alphabet.charAt(Math.floor(Math.random() * alphabet_len));

    return text;
}

function genArray (strlen=8, arrsize=3, forceDuplicate=false) {
	let arr=[]
	for(i=0; i<arrsize; i++){
		arr.push(genString(strlen))
	}
	if(forceDuplicate) arr[arr.length-1]=arr[0]
	return arr
}

var sha1 = require("crypto-js/sha1");
var hash_method = (str) => {
	return sha1(str).toString()
}


function hasDupplicate_hashMethod(arr){
	let time = new Date().getTime();
	let found_duplicate = false

	/* Рабочий рассчёт */
	let i,hash, hashArr= []
	for(i=0; i<arr.length; i++){
		hash=hash_method(arr[i])

		// Если обнаружено совпадение
		if(typeof hashArr[hash] != 'undefined'){
			if(arr[i]==hashArr[hash]){
				found_duplicate=true
				break
			} else {
				throw new Error('Hash collision')
			}
		}
		hashArr[hash]=arr[i]
	}


	time = new Date().getTime() - time
	return {
		time: time,
		found_duplicate: found_duplicate
	}
}

/**
* Метрод проверки сравнением строк
*/
function hasDupplicate_compareEach(arr){
	let time = new Date().getTime();

	/* Рабочий рассчёт */
	let i,j, arrlen=arr.length
	for(i=0; i<arrlen; i++){
		for(j=i+1; j<arrlen; j++){
			if(arr[i]==arr[j]){
				found_duplicate=true
				break
			}
		}
	}

	time = new Date().getTime() - time
	return {
		time: time,
		found_duplicate: found_duplicate
	}
}

/**
* Метрод проверки построением индекса
*/
function Node(value, wordEnd=false){
	this.value=value
	this.wordEnd=wordEnd
	this.next=null
}

function Index(){
	let index={}

	this.add = (str) =>{
		console.log(str)
	}
}

function hasDupplicate_indexMethod(arr){
	let time = new Date().getTime();

	/* Рабочий рассчёт */
	/* ... */

	time = new Date().getTime() - time
	return {
		time: time,
		found_duplicate: found_duplicate
	}
}

/**
* Главный процесс
*/
let main = () => {
	console.time('Test total')

	let result={
		hashMethod: 0,
		compareMethod: 0,
		indexMethod: 0
	}

	let i,res,arr,props,program=[
		{strlen:8, arrsize:10},
	    {strlen:8, arrsize:30},
	    {strlen:8, arrsize:100},
	    //{strlen:32, arrsize:100},
	    //{strlen:64, arrsize:10000},
    ]

    /*
    // Замеряем методом с хэшами
    console.log('Замеряем методом с хэшами:')
	for(i=0; i<program.length; i++){
		props=program[i]
		arr=genArray(props.strlen, props.arrsize, true)
		
		// Замеряем методом с хэшами
		res=hasDupplicate_hashMethod(arr)
		console.log((i+1)+') ',res)
		result.hashMethod+=res.time
	}
	console.log(result)

    // Замеряем методом сравнением
    console.log('Замеряем методом сравнением:')
	for(i=0; i<program.length; i++){
		props=program[i]
		arr=genArray(props.strlen, props.arrsize, true)
		
		// Замеряем методом с хэшами
		res=hasDupplicate_compareEach(arr)
		console.log((i+1)+') ',res)
		result.compareMethod+=res.time
	}
	console.log(result)
	*/

	let index = new Index()
	index.add('bjdanwdi')
	index.add('owninwn')
	index.add('bjdanwdi')

	console.timeEnd('Test total')
}

main()