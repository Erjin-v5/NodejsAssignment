function Game(player) {
	var result = ''
	var x = ''
	var com_win = 0
	var ply_win = 0
	var counter = 0
	if (player === 'r') {
        var result = '0 vs'
    } else if (player == 'p') {
        var result = '___ vs'
    } else if (player == 's') {
        var result = '8< vs'
    }

    var chosen = Math.floor((Math.random() * 3) + 1);

    if (chosen === 1) {
        computer = 'r'
        var result = result + ' 0'
    } else if (chosen == 2) {
        computer = 'p'
        var result = result + ' ___'
    } else {
        computer = 's'
        var result = result + ' >8'
    }
    if (player === computer) {
        var x = 'Draw!\n\rTry again!\n'
    } else if (player == 'r' && computer == 's') {
        var x = 'You won!\n\rCongratulations!\n'
        ply_win = ply_win + 1
        counter = counter + 1
    } else if (player == 'r' && computer == 'p') {
        var x = 'Computer won!\n\rLoser!\n'
        com_win = com_win + 1
        counter = counter - 1
    } else if (player == 'p' && computer == 'r') {
        var x = 'You won!\n\rCongratulations!\n'
        ply_win = ply_win + 1
        counter = counter + 1
    } else if (player == 'p' && computer == 's') {
        var x = 'Computer won!\n\rLoser!\n'
        com_win = com_win + 1
        counter = counter - 1
    } else if (player == 's' && computer == 'r') {
        var x = 'Computer won!\n\rLoser!\n'
        com_win = com_win + 1
        counter = counter - 1
    } else if (player == 's' && computer == 'p') {
        var x = 'You won!\n\rCongratulations!\n'
        ply_win = ply_win + 1
        counter = counter + 1
    }
    return result + '\n\r' + x
}

