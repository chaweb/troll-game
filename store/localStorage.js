export const state = () => ({
    game: {
      player : "player",
      game : undefined,
      gameFinish : [],
      data: {
        death : 0, 
        charism : 0
      },
      history : undefined,
      laboMode: true
    }
})

export const mutations = {
  renamePlayer(state, namePlayer) {
    state.game.player = namePlayer
  },

  newGame(state, nameGame) {
    [state.game.game, state.game.history] = nameGame
    state.game.laboMode = false
  },

  finishGame(state) {
    state.game.gameFinish.puch(state.game.game)
    state.game.game = undefined
  }, 

  updateData(state, data) {
    state.game.data = data
  },

  
  changeMode(state, mode) {
    state.game.mode = mode
  }
}