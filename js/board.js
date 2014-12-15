$(function(){
	//Définition de types / Objets
	function Case(row,col){
		this.row = row;
		this.col = col;
	}
	function Piece(type,row,col,color) {
		//Constructeur / Variables
    	this.type 	= type; //pion, roi, reine, tour , cheval, fou
    	this.row 	= parseInt(row);
    	this.col 	= parseInt(col);
    	this.color 	= color; //white , black

    	//Méthodes
	    	//affichage des possibilités de déplacement pour une pièce donnée
	    	this.findPossibilities = function(){
	    		//variables
	    		var tab = [];
	    		var signeColor = this.color =='black'?-1:1;
	    		//clear
	    		$('.case-possible').removeClass('case-possible');
	    		switch(this.type) {
					case 'pion':
						if(caseFree(this.row-1*signeColor, this.col)){
		    				tab.push({row : this.row-1*signeColor, col : this.col});
						}
		    			if(this.row==7 && caseFree(this.row-2, this.col) && this.color == 'white'){
		    				tab.push({row : this.row-2, col : this.col});
		    			}
		    			if(this.row==2 && caseFree(this.row+2, this.col) && this.color == 'black'){
		    				tab.push({row : this.row+2, col : this.col});
		    			}
		    			if(!caseFree(this.row-1*signeColor,this.col-1*signeColor)){ if(!caseSameColor(this.color, this.row-1*signeColor, this.col-1*signeColor)){
		    				tab.push({row : this.row-1*signeColor, col : this.col-1*signeColor});
		    			}}
		    			if(!caseFree(this.row-1*signeColor,this.col+1*signeColor)){ if(!caseSameColor(this.color, this.row-1*signeColor, this.col+1*signeColor)){
		    				tab.push({row : this.row-1*signeColor, col : this.col+1*signeColor});
		    			}}
						break;
					case 'roi':
						if(caseFree(this.row-1, this.col-1) || !caseSameColor(this.color, this.row-1, this.col-1)){
							tab.push({row : this.row-1, col : this.col-1});
						}
						if(caseFree(this.row-1, this.col) || !caseSameColor(this.color, this.row-1, this.col)){
							tab.push({row : this.row-1, col : this.col});
						}
						if(caseFree(this.row-1, this.col+1) || !caseSameColor(this.color, this.row-1, this.col+1)){
							tab.push({row : this.row-1, col : this.col+1});
						}
						if(caseFree(this.row, this.col-1) || !caseSameColor(this.color, this.row, this.col-1)){
							tab.push({row : this.row, col : this.col-1});
						}
						if(caseFree(this.row, this.col+1) || !caseSameColor(this.color, this.row, this.col+1)){
							tab.push({row : this.row, col : this.col+1});
						}
						if(caseFree(this.row+1, this.col-1) || !caseSameColor(this.color, this.row+1, this.col-1)){
							tab.push({row : this.row+1, col : this.col-1});
						}
						if(caseFree(this.row+1, this.col) || !caseSameColor(this.color, this.row+1, this.col)){
							tab.push({row : this.row+1, col : this.col});
						}
						if(caseFree(this.row+1, this.col+1) || !caseSameColor(this.color, this.row+1, this.col+1)){
							tab.push({row : this.row+1, col : this.col+1});
						}
						
						
						break;
					case 'reine':
						//comme la tour
						//up => col fixed
						var i=1;
						while(caseFree(this.row-i,this.col) && this.row-i>0){
							tab.push({row : this.row-i, col : this.col});
							i++;
						}
						if(!caseSameColor(this.color, this.row-i, this.col) && this.row-i>0	){
							tab.push({row : this.row-i, col : this.col});
						}
						//down => col fixed
						var i=1;
						while(caseFree(this.row+i,this.col) && this.row+i<9) {
							tab.push({row : this.row+i, col : this.col});
							i++;
						}
						if(!caseSameColor(this.color, this.row+i, this.col) && this.row+i<9){
							tab.push({row : this.row+i, col : this.col});
						}
						//left => row fixed
						var i=1;
						while(caseFree(this.row,this.col-i) && this.col-i>0){
							tab.push({row : this.row, col : this.col-i});
							i++;
						}
						if(!caseSameColor(this.color, this.row, this.col-i) && this.col-i>0){
							tab.push({row : this.row, col : this.col-i});
						}
						//right => row fixed
						var i=1;
						while(caseFree(this.row,this.col+i) && this.col+i<9) {
							tab.push({row : this.row, col : this.col+i});
							i++;
						}
						if(!caseSameColor(this.color, this.row, this.col+i) && this.col+i<9){
							tab.push({row : this.row, col : this.col+i});
						}

						//Comme un fou
						//up and left
						var i=1;
						while(caseFree(this.row-i,this.col-i) && this.row-i>0 && this.col-i>0){
							tab.push({row : this.row-i, col : this.col-i});
							i++;
						}
						if(!caseSameColor(this.color, this.row-i, this.col-i) && this.row-i>0 && this.col-i>0){
							tab.push({row : this.row-i, col : this.col-i});
						}
						//down and right
						var i=1;
						while(caseFree(this.row+i,this.col+i) && this.row+i<9 && this.col+i<9) {
							tab.push({row : this.row+i, col : this.col+i});
							i++;
						}
						if(!caseSameColor(this.color, this.row+i, this.col+i) && this.row+i<9 && this.col+i<9){
							tab.push({row : this.row+i, col : this.col+i});
						}
						//left and down
						var i=1;
						while(caseFree(this.row+i,this.col-i) && this.col-i>0 && this.row+i<9){
							tab.push({row : this.row+i, col : this.col-i});
							i++;
						}
						if(!caseSameColor(this.color, this.row+i, this.col-i) && this.col-i>0 && this.row+i<9){
							tab.push({row : this.row+i, col : this.col-i});
						}
						//right and up
						var i=1;
						while(caseFree(this.row-i,this.col+i) && this.col+i<9 && this.row-i>0) {
							tab.push({row : this.row-i, col : this.col+i});
							i++;
						}
						if(!caseSameColor(this.color, this.row-i, this.col+i) && this.col+i<9 && this.row-i>0){
							tab.push({row : this.row-i, col : this.col+i});
						}
						break;
					case 'tour':
						//up => col fixed
						var i=1;
						while(caseFree(this.row-i,this.col) && this.row-i>0){
							tab.push({row : this.row-i, col : this.col});
							i++;
						}
						if(!caseSameColor(this.color, this.row-i, this.col) && this.row-i>0	){
							tab.push({row : this.row-i, col : this.col});
						}
						//down => col fixed
						var i=1;
						while(caseFree(this.row+i,this.col) && this.row+i<9) {
							tab.push({row : this.row+i, col : this.col});
							i++;
						}
						if(!caseSameColor(this.color, this.row+i, this.col) && this.row+i<9){
							tab.push({row : this.row+i, col : this.col});
						}
						//left => row fixed
						var i=1;
						while(caseFree(this.row,this.col-i) && this.col-i>0){
							tab.push({row : this.row, col : this.col-i});
							i++;
						}
						if(!caseSameColor(this.color, this.row, this.col-i) && this.col-i>0){
							tab.push({row : this.row, col : this.col-i});
						}
						//right => row fixed
						var i=1;
						while(caseFree(this.row,this.col+i) && this.col+i<9) {
							tab.push({row : this.row, col : this.col+i});
							i++;
						}
						if(!caseSameColor(this.color, this.row, this.col+i) && this.col+i<9){
							tab.push({row : this.row, col : this.col+i});
						}
						break;
					case 'cheval':
						if(caseFree(this.row-2, this.col-1) || !caseSameColor(this.color, this.row-2, this.col-1)){
							tab.push({row : this.row-2, col : this.col-1});
						}
						if(caseFree(this.row-2, this.col+1) || !caseSameColor(this.color, this.row-2, this.col+1)){
							tab.push({row : this.row-2, col : this.col+1});
						}
						if(caseFree(this.row+2, this.col-1) || !caseSameColor(this.color, this.row+2, this.col-1)){
							tab.push({row : this.row+2, col : this.col-1});
						}
						if(caseFree(this.row+2, this.col+1) || !caseSameColor(this.color, this.row+2, this.col+1)){
							tab.push({row : this.row+2, col : this.col+1});
						}
						if(caseFree(this.row+1, this.col+2) || !caseSameColor(this.color, this.row+1, this.col+2)){
							tab.push({row : this.row+1, col : this.col+2});
						}
						if(caseFree(this.row+1, this.col-2) || !caseSameColor(this.color, this.row+1, this.col-2)){
							tab.push({row : this.row+1, col : this.col-2});
						}
						if(caseFree(this.row-1, this.col+2) || !caseSameColor(this.color, this.row-1, this.col+2)){
							tab.push({row : this.row-1, col : this.col+2});
						}
						if(caseFree(this.row-1, this.col-2) || !caseSameColor(this.color, this.row-1, this.col-2)){
							tab.push({row : this.row-1, col : this.col-2});
						}
						break;
					case 'fou':
						//up and left
						var i=1;
						while(caseFree(this.row-i,this.col-i) && this.row-i>0 && this.col-i>0){
							tab.push({row : this.row-i, col : this.col-i});
							i++;
						}
						if(!caseSameColor(this.color, this.row-i, this.col-i) && this.row-i>0 && this.col-i>0){
							tab.push({row : this.row-i, col : this.col-i});
						}
						//down and right
						var i=1;
						while(caseFree(this.row+i,this.col+i) && this.row+i<9 && this.col+i<9) {
							tab.push({row : this.row+i, col : this.col+i});
							i++;
						}
						if(!caseSameColor(this.color, this.row+i, this.col+i) && this.row+i<9 && this.col+i<9){
							tab.push({row : this.row+i, col : this.col+i});
						}
						//left and down
						var i=1;
						while(caseFree(this.row+i,this.col-i) && this.col-i>0 && this.row+i<9){
							tab.push({row : this.row+i, col : this.col-i});
							i++;
						}
						if(!caseSameColor(this.color, this.row+i, this.col-i) && this.col-i>0 && this.row+i<9){
							tab.push({row : this.row+i, col : this.col-i});
						}
						//right and up
						var i=1;
						while(caseFree(this.row-i,this.col+i) && this.col+i<9 && this.row-i>0) {
							tab.push({row : this.row-i, col : this.col+i});
							i++;
						}
						if(!caseSameColor(this.color, this.row-i, this.col+i) && this.col+i<9 && this.row-i>0){
							tab.push({row : this.row-i, col : this.col+i});
						}
						break;
					default:
						console.log('piece non répertoriée');
				}

				return tab;
			}

			this.showPossibilities = function(){
				var tabPossibilities = this.findPossibilities();
				if(!tabPossibilities.length){
					$('#board-info-coup').html('Vous ne pouvez pas bouger cette piece.');	
				}
				else{
					$('#board-info-coup').html('');
					showTabPossibility(tabPossibilities);
				}
			}

			//Générer l'image html de la piece
			this.getPath = function(){
				var colorPath = '';
				if(this.color == 'black'){
					colorPath= '_noir';
				}
				return '<img src="img/' + this.type + colorPath + '.png" class="img-piece">';
			}
		
		// private functions
			function showTabPossibility(tabPossibilities){
				for (var i = 0; i < tabPossibilities.length; i++) {
					$('.case[row='+ tabPossibilities[i].row +'][col=' + tabPossibilities[i].col + ']').addClass('case-possible');
				};
			}

			function caseFree(row,col){
				return !$('.case[isPiece][row=' + row + '][col=' + col + ']').length;
			}

			//Test si la color de la piece de départ et la meme que la couleur de la piece positionnée en (row,col)
			function caseSameColor(color,row,col){
				return $('.case[row=' + row + '][col=' + col + ']').attr('color') == color;
			}
	}

	//Variables globales
	var $board = $("#board");
	haveToShoWPossibilities = true;
	tabPieces = new Array();

	$('#game-interface').hide();

	var tour1_w		=	new Piece("tour",1,1,'black');		var cavalier1_w	=	new Piece("cheval",1,2,'black');
	var fou1_w 		= 	new Piece("fou",1,3,'black');		var reine_w 	=	new Piece("reine",1,4,'black');
	var roi_w 		= 	new Piece("roi",1,5,'black');		var fou2_w 		= 	new Piece("fou",1,6,'black');
	var cavalier2_w = 	new Piece("cheval",1,7,'black');	var tour2_w 	= 	new Piece("tour",1,8,'black');
	var tour1_b		=	new Piece("tour",8,1,'white');		var cavalier1_b	=	new Piece("cheval",8,2,'white');
	var fou1_b 		= 	new Piece("fou",8,3,'white');		var reine_b 	=	new Piece("reine",8,4,'white');
	var roi_b 		= 	new Piece("roi",8,5,'white');		var fou2_b 		= 	new Piece("fou",8,6,'white');
	var cavalier2_b = 	new Piece("cheval",8,7,'white');	var tour2_b 	= 	new Piece("tour",8,8,'white');

	tabPieces.push(tour1_b,cavalier1_b,fou1_b,reine_b,roi_b,fou2_b,cavalier2_b,tour2_b,tour1_w,cavalier1_w,fou1_w,reine_w,roi_w,fou2_w,cavalier2_w,tour2_w);
	for (var i = 1; i <= 8; i++) {
		thisPionWhite = new Piece("pion",2,i,'black');
		thisPionBlack = new Piece("pion",7,i,'white');
		tabPieces.push(thisPionWhite);
		tabPieces.push(thisPionBlack);
	};

	//Functions
	function fenToPieces(){
		console.log(chess);
	}

	function initBoard(){
		chess = new Chess();
		console.log(chess);
		$board.empty();
		var casepleine = true;
		//foreach rows
		for (var i = 1; i <= 8; i++) {
			casepleine = !casepleine;
			//foreach columns
			for (var j = 1; j<=8; j++) {
				var couleurCase = casepleine ? "case-pleine" : "case-vide";
				d=document.createElement('div');
				// String.fromCharCode(97) => "a"
				$col = $(d);
				$col.attr({
						row : i,
						col : j
					})
					.addClass('case ' + couleurCase)
					.appendTo($board);
				casepleine = !casepleine;
			};
		};

		for(var i= 0; i < tabPieces.length; i++){
			var maPiece = tabPieces[i];
			$('.case[row='+ maPiece.row +'][col=' + maPiece.col + ']')
				.append(maPiece.getPath())
				.attr({
					isPiece:true,
					type: maPiece.type,
					color: maPiece.color
				})
			;
		}
	}

	//Match
	function startGame(){
		$('#game-interface').show();
		initBoard();
		startMatch();
		$('#p1-name').html(nomP1);
		$('#p2-name').html(nomP2);
	}

	function switchPlayer() {
		tour = tour=='white'?'black':'white';
	}

	function showActualPlayer(){
		var msgActualPlayer;
		if(tour == 'white'){
			msgActualPlayer = 'Aux blancs à jouer';
			$('#player-2').css("border", "");
			$('#player-1').css('border','1px solid blue');
		}
		else{
			msgActualPlayer = 'Aux noirs à jouer';
			$('#player-1').css("border", "");
			$('#player-2').css('border','1px solid blue');
		}

		$('board-info-turn').html(msgActualPlayer);
	}

	function switchOrientation(){
		console.log('switch orientation');
	}

//Events

	$('body').on('submit', '#form-name-players', function(event){
 		event.preventDefault();
		nomP1 = $('#name-player-1').val();
		nomP2 = $('#name-player-2').val();
		if(nomP1.length>0 && nomP2.length>0){
			startGame();
			$('.popupStart').hide();
		}
	});

	//Initialisation du plateau
	$('body').on('click', '#btn-new-game', function(){
		initBoard();
		startMatch();
	});

	$('body').on('click', '#btn-save-game', function(){
		showFen();
	});

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