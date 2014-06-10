var chars = "abcdefghijklnmopqrstuvwxz";
var width = 0;
var height = 0;
var columnCount = 120;
var rowCount = 0;
var lines = {};
var lineFillAmount = 0;

function getDimensions() {
	width = $('body').width();
	height = $('body').height();
	columnCount = Math.floor(width/16);
}

function buildGrid() {
	var columnWidth = Math.floor(width/columnCount);
	rowCount = Math.floor(height/(columnWidth*1.25));
	lineFillAmount = ((rowCount/2-8) > 0 ? Math.round(rowCount/2-8) : 0);
	console.log(rowCount);
	$('<div/>',{id:'grid'}).appendTo('body');
	for (var r = 1; r <= rowCount; r++){
		for (var c = 1; c <= columnCount; c++) {
			$('<div />',{id:r+'-'+c,text:chars[Math.round(Math.random() * (chars.length-1))]}).css({'width':columnWidth+'px','font-size':Math.floor(columnWidth*2)+'px'}).appendTo('#grid');
		}
	}
}

function changeLetters() {
	var letters = $('#grid div[class]');
	var changeCount = letters.length/10;
	for(var i = 0; i <= changeCount; i++) {
		$(letters[Math.floor(Math.random()*letters.length-1)]).text(chars[Math.round(Math.random() * (chars.length-1))]);
	}
}

function drawLine(id) {
	line = lines[id];
	for(var i = 1;i <= line.row;i++) {
		var c = 
		$('#'+i+'-'+line.column).removeClass(getClass(line.row-i-1));
		if (c != "") $('#'+i+'-'+line.column).addClass(getClass(line.row-i));
	}
	if (line.row == rowCount+35) {
		clearInterval(line.interval);
		delete lines[id];
	} else {
		line.row++;
	}
}

function getClass(rowDiff) {
	var c = "";
	if (rowDiff == 0) c = "color1";
	if (rowDiff == 1) c = "color2";
	if (rowDiff == 2) c = "color3";
	if (rowDiff == 3) c = "color4";
	if (rowDiff >= 4 && rowDiff <= 30) c = "color5";
	if (rowDiff == 31) c = "color6";
	if (rowDiff == 32) c = "color7";
	if (rowDiff == 33) c = "color8";
	if (rowDiff == 34) c = "color9";
	return c;
}

function maybeAddLine() {
	var randId = Date.now();
	var line = {};
	line.column = Math.floor(Math.random() * columnCount) + 1;
	line.row = 1;
	line.interval = setInterval(function(){
		drawLine(randId);
	},Math.floor(Math.random()*900)+100);
	lines[randId] = line;
}

function init() {
	$.each(lines,function(index,line){
		clearInterval(line.interval);
		delete lines[index];
	});
	$('#grid').empty();
	getDimensions();
	buildGrid();
	var changeLetterInterval = setInterval(changeLetters, 100);
	var maybeAddLineInterval = setInterval(maybeAddLine, 24000/columnCount);
}

$(function() {
	init();
	$(window).resize(function() {
		init();
	});
});