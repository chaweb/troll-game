console.log("socket lancé !")

//for file .log 
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format

const logger = createLogger({
    level: 'info',
    exitOnError: false,
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: [
      new transports.File({ filename: `./logs/log.log` }),
    ],
});

const {choiceGame} = require('../io/choiceGame')


module.exports = {
    logger: logger,
    default : function Svc(socket, io) {
        return Object.freeze({
            async newGame(Game){ 
                const nameGame = choiceGame(Game.except)
                return [nameGame, require(`./game/${nameGame}.json`)]
            },

            async refreshGame(Game){
                return require(Game)
            }
            
        })
    }
};

