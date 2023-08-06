const random = function(minimum, maximum) {
	if (maximum === undefined) {
		maximum = minimum;
		minimum = 0;
	}

	return Math.floor(
		(Math.random() * (maximum - minimum + 1)) + minimum
	);
}

const AllGame = require("./game.json")

choiceGame = (exclu) => {
    if(typeof exclu != "object" && exclu){
        logger.error("jeux exclu supprimer par une list"); 
        return
    }

	exclu = exclu ? exclu : [] 

    var gamesValid = (AllGame.filter(game => !exclu.includes(game)))
	// console.log(gamesValid)

    return gamesValid[random(gamesValid.length -1)]
}

exports.choiceGame = choiceGame;