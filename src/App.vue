<template>
    <div id="control-app">
        <b-container>
            <the-header></the-header>
            <b-row>
                <b-col>
                    <transition name="fade" mode="out-in">
                        <router-view/>
                    </transition>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TheHeader from "./components/common/TheHeader";
    export default {
        components: {TheHeader}
    }
</script>

<style>
    #control-app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }


    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>