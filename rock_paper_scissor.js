var player = ''
var com_win = 0
var ply_win = 0
var counter = 0


while (player !== 'q') {
    var player = {}
    if (player === 'q') {
        break
    }
    if (player !== 's' && player !== 'p' && player !== 'r') {
        console.log('Please Enter Correctly, rock (r), paper (p), or scissors (s)\n')
        continue
    }
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
        console.log(result + ' 0')
    } else if (chosen == 2) {
        computer = 'p'
        console.log(result + ' ___')
    } else {
        computer = 's'
        console.log(result + ' >8')
    }

    if (player === computer) {
        console.log('Draw!\n')
    } else if (player == 'r' && computer == 's') {
        console.log('Player wins\n')
        ply_win = ply_win + 1
        counter = counter + 1
    } else if (player == 'r' && computer == 'p') {
        console.log('Computer wins!\n')
        com_win = com_win + 1
        counter = counter - 1
    } else if (player == 'p' && computer == 'r') {
        console.log('Player wins!\n')
        ply_win = ply_win + 1
        counter = counter + 1
    } else if (player == 'p' && computer == 's') {
        console.log('Computer wins!\n')
        com_win = com_win + 1
        counter = counter - 1
    } else if (player == 's' && computer == 'r') {
        console.log('Computer wins!\n')
        com_win = com_win + 1
        counter = counter - 1
    } else if (player == 's' && computer == 'p') {
        console.log('Player wins!\n')
        ply_win = ply_win + 1
        counter = counter + 1
    }
}


    var com_time = ''
    var ply_time = ''

    if (com_win > 1) {
        com_time = 's'
    }
    if (ply_win > 1) {
        ply_time = 's'
    }
    if (com_win > ply_win) {
        console.log('\nComputer won ' + com_win + ' time' + com_time)
        console.log('Player won ' + ply_win + ' time' + ply_time)
        console.log('Computer won!')
        console.log('Score Updated: ' + counter)
    } else if (ply_win > com_win) {
        console.log('\nComputer won ' + com_win + ' time' + com_time)
        console.log('Player won ' + ply_win + ' time' + ply_time)
        console.log('Player won!')
        console.log('Score Updated: ' + counter)
    } else {
        console.log('\nComputer won ' + com_win + ' time' + com_time)
        console.log('Player won ' + ply_win + ' time' + ply_time)
        console.log('Draw!')
        console.log('Score Updated: ' + counter)
    }
