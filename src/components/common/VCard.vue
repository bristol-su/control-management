<template>
    <b-card class="my-3">
        <template v-slot:header>
            <b-card-title style="text-align: center; display: flex;">
                <h4 style="margin: auto;">{{title}}</h4>
                <span class="icons">
                    <slot name="icons">
                    </slot>
                </span>
            </b-card-title>
            <b-card-sub-title>
                {{subTitle}}
            </b-card-sub-title>
        </template>
        <b-card-text>
            <slot></slot>
        </b-card-text>
    </b-card>
</template>

<script>
    export default {
        name: "VCard",
        props: {
            title: {
                required: false,
                type: String,
                default: ''
            },
            subTitle: {
                required: false,
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
    .icons {
        margin-right: 0;
        margin-left: 0;
    }
    .icons > * {
        margin-left: 2px;
        margin-right: 2px;
    }
</style>