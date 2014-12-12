$(function(){

// Variables
var $board = $("#board");

// Events
	//Déplacement de la piece
	$('body').on('click', '.case-possible',	function(){
		var caseEnd = $(this);
		$('.case-possible').removeClass('case-possible');

		//reset des deux pieces
		caseStart.empty().removeAttr('isPiece type color');
		caseEnd.empty().removeAttr('isPiece type color');

		//Affichage de la piece dans sa position finale
		caseEnd.append(myPiece.getPath())
			   .attr({
					isPiece:true,
					type: myPiece.type,
					color: myPiece.color
				})
		;

		switchPlayer();
		showActualPlayer();
	});

	//Affichage des différentes possibilités de déplacement pour la piece sélectionnée
	$('body').on('click', '.case[isPiece]',function(){
		if($(this).attr('color')==tour){
			caseStart = $(this);
			if(!haveToShoWPossibilities){
				haveToShoWPossibilities = true;
			}
			else{
				//createPiece
				myPiece = new Piece(caseStart.attr('type'),caseStart.attr('row'),caseStart.attr('col'),caseStart.attr('color'));
				myPiece.showPossibilities();
			}
		}
	});
});

// function
function switchPlayer() {
	tour = tour=='white'?'black':'white';
}