function showNum(i,j,rand){
	var numberCell=$('#number-cell-'+i+'-'+j);
	numberCell.css('background',getNumberBackground(rand));
	numberCell.css('color',getNumberColor(rand));
	numberCell.text(rand);

	numberCell.animate({
		width:'100px',
		height:'100px',
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);
}

function showMoveNum(fromx,fromy,tox,toy){

	var numberCell = $('#number-cell-' + fromx + '-' + fromy );

	numberCell.animate({
		top:getPosTop( tox , toy ),
        left:getPosLeft( tox , toy )
	},200);
}