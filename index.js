
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

var md5 = require("crypto-js/md5");
var hash_method = (str) => {
	return md5(str).toString()
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
function Node(value, wordEnd=false, prev){
	this.value=value
	//this.prev=prev
	this.wordEnd=wordEnd
	this.branches={}
}

function Index(){
	this.root={
		branches: {}
	}

	this.add = (str) =>{
		let i,current,last=str.length-1,ptr=this.root
        
        // Перебор символов в строке
		for(i=0; i<str.length; i++){
            // Проверяем создана ли  ветка
            if(typeof ptr.branches[str[i]]=='undefined'){
                // если нет, то создаём новую
                let node=new Node(str[i], (i==last?1:0), ptr)
                ptr.branches[str[i]]=node;
                ptr=node;
                //console.log('Новый узел', node)
            } else {
                current=ptr.branches[str[i]]
                if(i==last){
                    current.wordEnd++
                }
                if(current.wordEnd>1) throw {message: 'Совпали концы', found_duplicate: true}
                ptr=current
            }
		}
		// console.log(str)
	}
}

function hasDupplicate_indexMethod(arr){
	let found_duplicate=false, time = new Date().getTime();
    
    let index = new Index()
	/* Рабочий рассчёт */
	let i,arrlen=arr.length
    try{
        for(i=0; i<arrlen; i++){
            index.add(arr[i])
        }
    }catch(obj){
        if(obj.found_duplicate) found_duplicate=true
    }

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

    // переменные
	let i,res,arr,props,program
    
    // Генерируем массивы для тестирования
    program=[
		{strlen:8, arrsize:10},
	    {strlen:8, arrsize:30},
	    {strlen:8, arrsize:100},
	    {strlen:32, arrsize:100},
	    {strlen:64, arrsize:10000},
    ]
    
    tasks=[] // Набор массивов для тестирования
    for(i=0; i<program.length; i++){
		props=program[i]
		arr=genArray(props.strlen, props.arrsize, true)
        tasks.push(arr)
    }

    
    // Замеряем методом с хэшами
    console.log('Замеряем методом с хэшами:')
	for(i=0; i<tasks.length; i++){
		arr=tasks[i]
		
		// Замеряем методом с хэшами
		res=hasDupplicate_hashMethod(arr)
		console.log((i+1)+') ',program[i], res)
		result.hashMethod+=res.time
	}
	console.log(result)

    // Замеряем методом сравнением
    console.log('Замеряем методом сравнением:')
	for(i=0; i<tasks.length; i++){
		arr=tasks[i]
		
		// Замеряем методом с хэшами
		res=hasDupplicate_compareEach(arr)
		console.log((i+1)+') ',program[i], res)
		result.compareMethod+=res.time
	}
	console.log(result)
    
    // Замеряем методом индексирования
    console.log('Замеряем методом индексирования:')
	for(i=0; i<tasks.length; i++){
		arr=tasks[i]
		
		// Замеряем методом с хэшами
		res=hasDupplicate_indexMethod(arr)
		console.log((i+1)+') ',program[i], res)
		result.indexMethod+=res.time
	}

    console.log('=============')
    console.log('Methods total')
    for(k in result){
        console.log(k,"\t", result[k]+'ms')
    }
    console.log(' ')

	console.timeEnd('Test total')
}

main()