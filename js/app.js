$(function(){

	// Variables
	var $board = $("#board");
	var haveToShoWPossibilities = true;
	var chess;
	var possibleMoves, game_fen, tour;

	chess = new Chess();
	game_fen = chess.fen();
	tour = chess.turn();
	// Programme principal
	initializeBoard();
	addAllPieces();

	// Events
		//Déplacement de la piece
		$('body').on('click', '.case-possible',	function(){
			removePossibleCase();

			var caseFrom = $caseStart.attr('idCase');
			var caseTo = $(this).attr('idCase');
			chess.move({ from: caseFrom, to: caseTo });

			clearBoard();
			addAllPieces();

			switchPlayer();
			//showActualPlayer();
		});

		//Affichage des différentes possibilités de déplacement pour la piece sélectionnée
		$('body').on('click', '.case[isPiece]',function(){
			if(chess.turn()==tour){
				$caseStart = $(this);
				showPossibilities($(this).attr('idCase'));
			}
		});


	// functions
	function switchPlayer() {
		tour = tour=='w'?'b':'w';
	}

	function initializeBoard(){
		$board.empty();
		var casepleine = true;
		//foreach rows
		for (var i = 8; i >= 1; i--) {
			casepleine = !casepleine;
			//foreach columns
			for (var j = 1; j<=8; j++) {
				var couleurCase = casepleine ? "case-pleine" : "case-vide";
				d=document.createElement('div');
				var colName = String.fromCharCode(96+j);
				$col = $(d);
				$col.attr({
						idCase : colName + i 
					})
					.addClass('case ' + couleurCase)
					.appendTo($board);
				casepleine = !casepleine;
			};
		};
	}

	function clearBoard(){
		for (var i = 1; i <= 8; i++) {
			for (var j = 1; j<=8; j++) {
				$elt = $('[idCase=' + String.fromCharCode(96+j) + i + ']');
				$elt.html('');
			};
		};
	}

	function addAllPieces(){
		var i = 0;
		var myCase = 1;
		var myPositionString = getPositionOfFen(chess.fen()).replace(/\//g,'');
			console.log(myPositionString);
		while (i < myPositionString.length){
			if(isNaN(myPositionString[i])){
				addPiece(myCase, myPositionString[i]);
				myCase++;
			}
			else{
				myCase = myCase + parseInt(myPositionString[i]);
			}
			i++;
		};
	}

	function addPiece(caseNumber, letterPiece){
		var stringImg = getImgOfFenChar(letterPiece);
		$("#board div:nth-child(" + caseNumber + ")")
			.append(stringImg)
			.attr({
				isPiece:true
			});
	}

	function getImgOfFenChar(myChar){
		var type = getTypeOfFenCharForImg(myChar);
		var colorPath = getColorOfFenCharForImg(myChar);

		return '<img src="img/' + type + colorPath + '.png" class="img-piece">';
	}

	function getColorOfFenCharForImg(myChar){
		return myChar == myChar.toLowerCase()? '_noir' : '';
	}

	function getTypeOfFenCharForImg(myChar){
		var type = '';
		switch(myChar.toLowerCase()){
			case 'k':
				type = 'roi';
				break;
			case 'p':
				type = 'pion';
				break;
			case 'q':
				type = 'reine';
				break;
			case 'n':
				type = 'cheval';
				break;
			case 'b':
				type = 'fou';
				break;
			case 'r':
				type = 'tour';
				break;
			default :
				console.log('error : Piece not valid in fen : ' + myChar);
		}

		return type;
	}

	function getPositionOfFen(fen){
		return getFenAsTab(fen)[0];
	}

	function getFenAsTab(fen){
		return fen.split(' ');
	}

	function showPossibilities(mySquare){
		var tabPossibilities = chess.moves({square: mySquare});
		if(!tabPossibilities.length){
			$('#board-info-coup').html('Vous ne pouvez pas bouger cette piece.');	
		}
		else{
			$('#board-info-coup').html('');
			showTabPossibility(tabPossibilities);
		}
	}

	function showTabPossibility(myTab){
		removePossibleCase();
		for (var i = 0; i < myTab.length; i++) {
			var idCase = getCaseOfPossibleMove(myTab[i]);
			console.log(myTab[i]);
			$('[idCase = ' + idCase + ']').addClass('case-possible');
		};
	}

	function removePossibleCase(){
		$('.case-possible').removeClass('case-possible');
	}

	function getCaseOfPossibleMove(moveString){
		return moveString[moveString.length-2] + moveString[moveString.length-1];
	}
});