var board=[];
var score=0;

$(function(){	
	newGame();

	$('h1').click(function(){
		alert('eeee')
	})
});

function newGame(){
	//初始化棋盘格
	init();

	//在随机两个格子里生成数字
	generateOneNumber();
	generateOneNumber();

}

function init(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell=$('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}


	for(var i=0;i<4;i++){
		board[i]=[];
		for (var j = 0; j < 4; j++) {
			board[i][j]=0;
		}
	}

	updateBoardValue();
}

//更新棋盘的值
function updateBoardValue(){
	$('.number-cell').remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$('#grid-container').append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			var theNumberCell=$('#number-cell-'+i+'-'+j);

			if(board[i][j]==0){
				theNumberCell.css('width',0);
				theNumberCell.css('height',0);
				theNumberCell.css('top',getPosTop(i,j)+50);
				theNumberCell.css('left',getPosLeft(i,j)+50);
			}else{
				theNumberCell.css('width','100px');
				theNumberCell.css('height','100px');
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background',getNumberBackground(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
		}
	}
}


//随机生成数字并显示
function generateOneNumber(){
	if(nospace(board)){
		return false;
	}
	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
	while(true){
		if(board[randx][randy]===0){
			break;
		}
		randx=parseInt(Math.floor(Math.random()*4));
		randy=parseInt(Math.floor(Math.random()*4));
	}

	//随机一个数字
	var rand=Math.random()<0.5?2:4;

	//在位置上显示数字
	board[randx][randy]=rand;
	showNum(randx,randy,rand);

	return true;
}


$(document).keydown(function(e){
	switch(e.keyCode){ 
		case 37:       //left
			if(moveLeft()){
				generateOneNumber();
			    isgameover();
			}
			break;
		case 38:       // up
			if(moveUp()){
				generateOneNumber();
				isgameover();
			};
			break;
		case 39:       // right
			if(moveRight()){
				generateOneNumber();
				isgameover();
			};
			break;
		case 40:       // down
			if(moveDown()){
				generateOneNumber();
				isgameover();
			};
			break;
		default:       // default
			break;
	}
});

function isgameover(){

}

function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!==0){
				for(var k=0;k<j;k++){
					if(board[i][k]===0 && noBlock(i,k,j,board)){
						showMoveNum(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]===board[i][j] && noBlock(i,k,j,board)){
						showMoveNum(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						continue;
					}
				}
			}
		}
	}
	updateBoardValue();
	return true;
}


function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!==0){
				for(var k=0;k<i;k++){
					if(board[k][j]===0 && noBlock2(j,k,i,board)){
						showMoveNum(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]===board[i][j] && noBlock2(j,k,i,board)){
						showMoveNum(i,j,i,k);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						continue;
					}
				}
			}
		}
	}
	
	updateBoardValue();
	return true;
}

function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(board[i][j]!==0){
				for(var k=j+1;k<4;k++){
					if(board[i][k]===0 && noBlock(i,k,j,board)){
						showMoveNum(i,k,i,j);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]===board[i][j] && noBlock(i,k,j,board)){
						showMoveNum(i,k,i,j);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						continue;
					}
				}
			}
		}
	}
	
	updateBoardValue();
	return true;
}

function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=0;i<3;i++){
			if(board[i][j]!==0){
				for(var k=i+1;k<4;k++){
					if(board[k][j]===0 && noBlock2(j,k,i,board)){
						showMoveNum(k,j,i,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]===board[i][j] && noBlock(j,k,i,board)){
						showMoveNum(k,j,i,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						continue;
					}
				}
			}
		}
	}
	
	updateBoardValue();
	return true;
}