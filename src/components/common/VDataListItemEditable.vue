<template>
    <v-data-list-item :title="title">
        <slot name="editing" :newValue="newValue" :updateValue="updateValue" v-if="isInEditingMode">
            <b-input type="text" :value="newValue" @input="updateValue"></b-input>
        </slot>
        <slot name="loading" v-else-if="isLoading">
            <b-spinner label="Saving Changes"></b-spinner> Saving Changes...
        </slot>
        <slot v-else>
            <div>
                {{value}}
            </div>
        </slot>

        <template v-slot:top-right>
            <span v-if="isInEditingMode">
                <span class="clickable" @click="save" :disabled="isLoading">
                    <i class="fa fa-save" style="color: green;"></i> Save
                </span>
                <span class="clickable" @click="editing = false" :disabled="isLoading">
                    <i class="fa fa-ban" style="color: red;"></i> Cancel
                </span>
            </span>
            <span v-else>
                <span class="clickable" @click="editing = true"><i class="fa fa-edit"></i> Edit</span>
            </span>
        </template>

    </v-data-list-item>
</template>

<script>
    import VDataListItem from "./VDataListItem";

    export default {
        name: "VDataListItemEditable",
        components: {VDataListItem},
        props: {
            title: {
                required: true,
                type: String
            },
            value: {
                required: false,
                type: [String, Number],
                default: null
            }
        },
        data() {
            return {
                editing: false,
                loading: false,
                newValue: null
            }
        },
        mounted() {
            this.newValue = this.value;
        },
        methods: {
            save() {
                if(this.newValue !== this.value) {
                    this.loading = true;
                    this.$emit('update', this.newValue);
                    setTimeout(this.resetLoading, 1000);
                }
                this.editing = false;
            },
            updateValue(val) {
                if(val === '') {
                    val = null;
                }
                this.newValue = val;
            },
            resetLoading() {
                this.loading = false;
            }
        },
        watch: {
            value(val) {
                this.loading = false;
                this.newValue = val;
            }
        },
        computed: {
            isInEditingMode() {
                return this.editing;
            },
            isLoading() {
                return this.loading;
            }
        },

    }
</script>

<style scoped>
    .clickable {
        cursor: pointer;
    }
</style>