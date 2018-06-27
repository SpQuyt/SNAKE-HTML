function Node(_pos_x, _pos_y){
	this.pos_x = _pos_x,
	this.pos_y = _pos_y,
	this.next = null
}

function List(){
	this.dx = 0,
	this.dy = 0,
	this.head = new Node(),
	this.length = 0,
	this.addToLast = function(anode){
		curnode = this.head;

		if (curnode.next == null){
			curnode.next = anode;
		}
		else{
			while(curnode.next != null){
				curnode = curnode.next;
			}
			curnode.next = anode;
			this.length++;
		}
	},
	this.deleteLast = function(){
		after = this.head;
		to_del = this.head;
		while (to_del.next != null){
			after = to_del;
			to_del = to_del.next;
		}
		map[to_del.pos_x][to_del.pos_y] = ' ';
		after.next = null;
		delete to_del;
	}
	this.move = function(){
		temp = new Node();
		temp.pos_x = this.head.next.pos_x + this.dx;
		temp.pos_y = this.head.next.pos_y + this.dy;
		temp.next = this.head.next;
		this.head.next = temp;
		if (map[temp.pos_x][temp.pos_y] != '◦'){
			this.deleteLast();
		}
		else{
			this.length++;
			generate_food()
		}
		update_snake();
	}
}

snake = new List();
snake.addToLast(new Node(6,6));

var quoc = document.getElementById("quoc");
var point = document.getElementById("point");
var rule = document.getElementById("rule");
var namepoint = document.getElementById("namepoint");
// var brick = "╝╚╗╔║═";
var output = '';
var map = [	['╔','═','═','═','═','═','═','═','═','═','═','═','═','═','╗'],
			['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
			['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
			['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
			['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
			['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
			['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
			['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
			['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
			['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
			['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
			['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
			['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
			['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
			['╚','═','═','═','═','═','═','═','═','═','═','═','═','═','╝']];

			map.push()
// var len = 31;
// var map = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

// map[0][0] = '╔'; map[0][len] = '╗'; map[len][0] = '╚'; map [len][len] = '╝';
// for (var i = 1; i <= len-1; i++){
// 	map[0][i] = '═';
// 	map[len-1][i] = '═';
// 	map[i][0] = '║';
// 	map[i][len-1] = '║';
// }
// for (var i = 1; i <= len-2; i++){
// 	for (var j = 1; j <= len-2; j++){
// 		map[i][j] = ' ';
// 	}
// }
function generate_food(){
	var _pos_x;
	var _pos_y;
	while(1){
		_pos_x = Math.floor((Math.random() * 13) + 1);
		_pos_y = Math.floor((Math.random() * 13) + 1);
		if (map[_pos_x][_pos_y] != '☺' && map[_pos_x][_pos_y] != '☼'){
			map[_pos_x][_pos_y] = '◦';
			break;
		}
	}
}

function display(){
	output = '';
	for (var i = 0; i < 15; i++){
		for (var j = 0; j < 15; j++){
			output += map[i][j]; 
		}
		output += '<br>';
		quoc.innerHTML = output;
		point.innerHTML = snake.length;
	}
}

function update_snake(){
	temp = snake.head;
	while (temp != null){
		if (temp == snake.head){
			temp = temp.next;
			map[temp.pos_x][temp.pos_y] = '☺';
			temp = temp.next;
		}
		else{
			map[temp.pos_x][temp.pos_y] = '☼';
			temp = temp.next;
		}
	}
	display();
}

function running(){
	document.addEventListener("keydown", (event) => {
	    switch (event.keyCode) {
	    	case 39:
	    		snake.dx = 0;
	    		snake.dy = 1;
	    		break;
	    	case 37:
	    		snake.dx = 0;
	    		snake.dy = -1;
	    		break;
	    	case 38:
	    		snake.dx = -1;
	    		snake.dy = 0;
	    		break;
	    	case 40:
	    		snake.dx = 1;
	    		snake.dy = 0;
	    		break;
	    }
	});

	var time1 =  setInterval(loopSnake, 100);
	function loopSnake() {
		if (map[snake.head.next.pos_x][snake.head.next.pos_y] == '☼') {
			clearInterval(time1);
			setTimeout(function(){ alert("YOU LOSE... PRESS F5 TO PLAY AGAIN."); }, 5);
		}
		else if (snake.head.next.pos_x == 14 || snake.head.next.pos_x == 0 || snake.head.next.pos_y == 14 || snake.head.next.pos_y == 0)
		{
			clearInterval(time1);
			setTimeout(function(){ alert("YOU LOSE... PRESS F5 TO PLAY AGAIN."); }, 5);
		}
		else if (snake.length == 0){

			alert("Congratulation! YOU WIN.");
			wish();
			clearInterval(time1);
		}
		else{
			snake.move();
		}
	}
}

function wish(){


	var line1 = "Hi Hello. HAPPY BIRTHDAY TO YOU. I know it sounds so awkward, but I couldn't make it on your birthday. This is still a prototype webgame page, so the graphics are too ugly, I know. Just to say, I wanna wish you a happy birthday, I wanna make everything normal as it used to be. I want us, to be friend, again. Of course it's up to your decision. Hope to see your reply soon. April's FOOL mADafAkA! Best wishes, Q."
	quoc.innerHTML = namepoint.innerHTML = point.innerHTML = '';
	var strlen = line1.length;
	var count = 0;
	output = '';

	alert("After you close this textbox, press SPACEBAR to continue...");
	document.addEventListener("keypress", (event) => {
	    switch (event.keyCode) {
	    	case 32:
	    		nhau = setInterval(loopwish, 50);
	    		break;
	    }
	});

	function loopwish(){
		if (line1[count] == ','){
			output += line1[count];
			output += '<br>';
			output += '&nbsp&nbsp&nbsp';
			count++;
			rule.innerHTML = output;
			clearInterval(nhau);
		}
		else if (line1[count] == '.' || line1[count] == '?' || line1[count] == "!"){
			output += line1[count];
			output += '<br>';
			output += '<br>';
			count++;
			rule.innerHTML = output;
			clearInterval(nhau);
		}
		else if (count == line1.length){
			clearInterval(nhau);
		}
		else{
			output += line1[count];
			rule.innerHTML = output;
			count++;
		}
	}
}

document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
    	case 13:
    		start();
    		break;
    }
});

function start(){
	rule.innerHTML = '';
	namepoint.innerHTML = 'POINTS: ';
	generate_food();
	update_snake();
	running();
}