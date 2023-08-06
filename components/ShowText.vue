<template lang="pug">
button(@click="quest ? passed = true : ''" v-if="ShowText != ''").text 
    |{{ShowText}}
</template>

<style lang="sass" scoped>
.text
    font-family: 'Silkscreen', cursive
    font-size: 1.5rem
    user-select: none

    background: #DEF
    padding: 10px 5px
    border: 3px #000 solid
    @include dark
        border-color: #fff
        background: #123

</style>

<script>
export default {
    methods: {
        timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
    },

    

    watch: {
        async text(newText) {
            this.passed = false
            while(this.ShowText.length != 0){
                if(!this.passed){
                    this.ShowText = this.ShowText.slice(0, -1)
                    await this.timeout(5)
                }else{this.ShowText = ''}
            }
            !this.passed ? await this.timeout(1000) : ''

            this.passed = false

            for(let i = 0; i < newText.length; i++){
                if(!this.passed){
                    this.ShowText = newText.substr(0, i)

                    this.ShowText.substr(-1).match(/[!.?,]/g) ? await this.timeout(200) : await this.timeout(50)
                }
            }
            this.ShowText = newText

            while(this.ShowText == newText) {
                await this.timeout(500)
                if(this.quest && this.passed){
                    this.$store.commit('pass')
                }
            }
        }

    },
    data () {
        return {
            ShowText : '',
            passed : false
        }
    },
    props: {
        text: { 
            type: String,
            default: "",
            required: true
        },
        quest: { 
            type: Boolean,
            default: false,
            required: false
        },
    },
}
</script>