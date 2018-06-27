var date=new Date();
document.getElementById('date').setAttribute('value',date);
function display() {
	// body...
	console.log(document.getElementById('date').value);
}