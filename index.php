<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<title>ChessOnline</title>
	<link rel="stylesheet" href="css/app.css">
</head>
<body>
	<div class="container">
		<!-- <div class="popupStart">
			<h1>ChessOnline</h1>
			<p>Bonjour et bienvenue sur ChessOnline, veuillez saisir le prénom des deux joueurs.</p>
			<form id="form-name-players" class="form-name-players">
				<label for="name-player-1">Joueur 1: </label>
				<input type="text" id="name-player-1" autofocus>
				<label for="name-player-2">Joueur 2: </label>			
				<input type="text" id="name-player-2">
				<input id='btn-start-game' type="submit" value="Commencer la partie">
			</form>
		</div> -->
		<div class="game-interface" id="game-interface">
			<h1>Jeu d'échec en ligne</h1>
			<div class="board" id="board"></div>
<!-- 
			<div class="board-info-players">
				<div id="player-1">
					<h3>Joueur 1 :</h3>
					<div id="p1-name"></div>
				</div>
				<div id="player-2">
					<h3>Joueur 2 :</h3>
					<div id="p2-name"></div>
				</div>
			</div> -->

			<div class="clear"></div>

<!-- 			<div class="board-info">
	<input type="button" value="Restart" class="btn" id="btn-new-game"/>
	<input type="button" value="Save" class="btn" id="btn-save-game"/>
	<div id="board-info-coup" class="board-info-coup"></div>
	<div id="board-info-turn" class="board-info-turn"></div>
</div> -->

		</div>

	</div>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="js/chess.min.js"></script>
	<script src="js/app.js"></script>
</body>
</html>