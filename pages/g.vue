<template lang="pug">
.GameContent
    .player
        h2 your name : 
        h2.pseudo {{game.player}}
    stats(v-if="statsMode" :stats="game.data")
    .game(v-else)
        ShowText(:text="text" :quest="HaveQuest")
        .choices
            buttonAct(v-for="value, index in quest" :key="index")
                button(@click="reponse = value") {{value}}
</template>


<style lang="sass" scoped>
.GameContent
    width: 100vw
    height: 100vh
    box-sizing: border-box
    padding: 8rem 4rem
    position: relative
    .player
        @include flex('left')
        flex-direction: column
        h2
            font-family: dosis
            font-size: 2rem
            &.pseudo
                text-transform: uppercase
                font-weight: bolder
    .game
        @include flex()
        flex-direction: column
        
        position: absolute

        $margin : 7rem
        left: $margin - 6rem
        right: $margin - 6rem
        @include screen("+lg")
            left: $margin
            right: $margin
        top: $margin + 8rem
        bottom: $margin

        .choices
            @include flex()
            max-width: 100vw
            margin-top: auto
            column-gap: 3rem
            row-gap: 1.5rem
            flex-wrap: wrap

</style>


<script>
export default {
    watch: {
        passed(newValue) {
            this.reponse = newValue
        }
    },
    data () {
        return {
            text : undefined, 
            quest : [],
            statsMode: false,
            reponse : false,
            HaveQuest: false
        }
    },

    methods: {

        timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async writeText(text, choice) {
            console.log(choice)
            if(typeof choice == 'object') {this.quest = choice; this.HaveQuest = false} 
            else {this.quest = []; this.HaveQuest = true}

            this.text = text
            this.reponse = false

            while(!this.reponse) {
                await this.timeout(500)
            }

            return new Promise(resolve => resolve(this.reponse));
        },

        async LunchNewGame (){

            this.$store.commit('localStorage/newGame', 
                await this.socket.emitP('newGame', 
                    {except : [this.game.gameFinish]}
                )
            )

            
            var tree = this.game.game 

            do {
                var end = false

                var Keys = Object.keys(tree)
                
                if(Keys.length == 1){
                    Keys = Keys[0]

                    var dialogue = keys.lstrip("text:")
                    console.table(dialogue)
                }else{
                    
                }

                await this.writeText()
            }while(end == false)
        },

        async LunchLabo (){

            if(this.game.gameFinish.length  == 0){ //start a new game

                await this.writeText("oh ! Salutation. Je ne pensais pas que vous allez vous reveiller maintenant.")
                await this.writeText("Maintenant que vous êtes là, laissez moi vous expliquer la situation.")
                await this.writeText("Ici, c'est un laboratoir. Mon laboratoire ! Le laboratoire des jeux Troll !")
                await this.writeText(`Parce que j'aime mes patients et mes patientes, donc vous y compris, je vais vous laisser passer des tests
                qui seront, amusants.
                `)
                var temp = await this.writeText(`vous aimez l'idée ?`, ['oui !', 'oui, j\'adore !'])
                console.log (temp)

                do{
                    var response = await this.writeText(`Alors vous êtes prêt.e ?`, ['oui !', 'non... Encore quelques secondes'])
                    console.log(response)
                    if(response == 'oui !') {
                        await this.writeText(`parfait !`)
                    }else{
                        await this.writeText(`Alors attendons.`)
                        
                        await this.writeText(`...`)
                        await this.writeText(`..`)
                        await this.writeText(`.`)
                    }
                }while(response != 'oui !')

                await this.writeText("Donc commençons le premier test!")

            }

            LunchNewGame()
        }
    },


    computed: {
        game(){
            return this.$store.state.localStorage.game
        },
        passed(){
            return this.$store.state.pass
        }
    },

    async mounted() {
        this.socket = this.$nuxtSocket({
            // nuxt-socket-io opts: 
            name: 'default', // Use socket "default"
            channel: '/index', // connect to '/index'

            // socket.io-client opts:
            reconnection: false
        })

        if(!this.game.game) {
            this.$store.commit('localStorage/newGame', 
                await this.socket.emitP('newGame', 
                    {except : [this.game.gameFinish]}
                )
            )
        }

        this.game.laboMode ? this.LunchLabo() : this.LunchNewGame()
    },
}
</script>