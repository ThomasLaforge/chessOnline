<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<title>ChessOnline</title>
	<link rel="stylesheet" href="css/app.css">
</head>
<body>
	<div class="container">
		<div class="popupStart">
			<h1>ChessOnline</h1>
			<p>Bonjour et bienvenue sur ChessOnline, veuillez saisir le prénom des deux joueurs.</p>
			<div class="form-name-players">
					<label for="name-player-1">Joueur 1: </label>
					<input type="text" id="name-player-1">
					<label for="name-player-2">Joueur 2: </label>			
					<input type="text" id="name-player-2">
					<input id='btn-start-game' type="submit" value="Commencer la partie">
			</div>
		</div>
		<div class="game-interface" id="game-interface">
			<h1>Jeu d'échec en ligne</h1>
			<div class="board" id="board"></div>
			<div id="p1-name"></div>
			<div id="p2-name"></div>
			<input type="button" value="New Game" class="btn" id="btn-new-game"/>
		</div>
	</div>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="js/board.js"></script>
	<script src="js/app.js"></script>
</body>
</html>