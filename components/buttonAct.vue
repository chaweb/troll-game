<template lang="pug">
.item
    .back
    slot
</template>

<style lang="sass" scoped>

.item
    color: $light-text
    width: fit-content
    min-width: 8rem
    
    position: relative
    @include flex()
    .back
        position: absolute
        z-index: -1
        background: #fff
        width: 100%
        height: 100%
        padding: 1rem .5rem
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26)
        border-radius: 5px
        
        transform: skew(-21deg)
        cursor: pointer
    > * 
        width: 100%
        height: 100%
        padding: 1rem 2rem
        text-align: center
        white-space: nowrap
        &.nuxt-link-exact-active
            cursor: default
            pointer-events: none
    &:hover
        color: $primary
        transform: scale(1.2)
</style>