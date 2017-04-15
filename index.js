var crypto = require("crypto-js/md5");

function genString(len = 5){
    var text = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let alphabet_len = alphabet.length;

    for( var i=0; i < len; i++ )
        text += alphabet.charAt(Math.floor(Math.random() * alphabet_len));

    return text;
}

function genArray (size=3, len=8, forceDuplicate=false) {
	let arr=[]
	for(i=0; i<size; i++){
		arr.push(genString(len))
	}
	if(forceDuplicate) arr[arr.length-1]=arr[0]
	return arr
}


function hasDupplicate_hashMethod(arr){
	console.log('arr[0]: ', arr[0], typeof arr[0])
	let hash=crypto(arr[0]).toString()
	console.log('hash: ', hash)
}


let main = () => {
	console.time('Test total')

	let arr=genArray(3, 3, true)
	console.log('arr: ', arr)
	hasDupplicate_hashMethod(arr)
	console.timeEnd('Test total')
}

main()