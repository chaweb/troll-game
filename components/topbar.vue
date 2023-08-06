<template lang="pug">
.topbar(:class="opened? 'opened' : ''")
    buttonAct
        input(type="checkbox" v-model="opened").check#opened
        label(for="opened") {{opened ? 'ouvrir':'fermer'}} menu


    transition(name="btn-menu")
        buttonAct(style="--delay: .3s" v-if="!(opened && sLg)")
                nuxtLink(to="/")
                    |acceuil
    transition(name="btn-menu")
        buttonAct(style="--delay: .32s" v-if="!(opened && sLg)")
                nuxtLink(to="/g")
                    |jouer !
    transition(name="btn-menu")
        buttonAct(style="--delay: .34s" v-if="!(opened && sLg)")
                nuxtLink(to="/account")
                    |mon compte

    .break
    transition(name="btn-menu")
        buttonAct(style="--delay: .36s" v-if="!(opened && sLg)")
                button(@click="changeColors()" ).navbar__color
                    | theme : {{$colorMode.preference === 'system' ? 'système' : ($colorMode.preference === 'dark' ? 'noir' : 'blanc') }}
</template>

<script>
export default {
    methods: {
        changeColors(){
            this.$colorMode.preference = this.themes[(this.themes.indexOf(this.$colorMode.preference)+1)%(this.themes.length)]
        },
        debug(){
            
            console.log(this.sLg && this.opened)
        }
    },
    data () {
        return {
            themes: ["system", "dark", "light"],
            opened: false,
            mounted: false,
            show: false
        }
    },
    computed: {
        sLg() {
            return this.$breakpoints.sLg
        }
    }
}
</script>

<style lang="sass" scoped>

.topbar
    .check
        display: none
    position: absolute
    width: 100vw
    padding: 1.5rem 3rem
    @include flex('left')
    column-gap: 1rem
    z-index: 10000
    .break
        margin: 0 auto
    @include screen('-lg')
        flex-direction: column
        row-gap: 1rem
        .opened
            height: 100vh
    @include screen('+lg')
        .item:first-child
            display: none
    .item:not(:first-child)
        @include screen('-lg')
            &.btn-menu-
                &enter-active
                    animation: ease-out var(--delay) btn-menu
                &leave-active 
                    animation: ease-out var(--delay) btn-menu reverse

@keyframes btn-menu 
    0%
        transform: translateX(-1500px)
    
    80%
        transform: translateX(50px)
    100%
        transform: translateX(0)
    


</style>
