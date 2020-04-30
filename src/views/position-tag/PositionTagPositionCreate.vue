<template>
    <div>
        <the-title title="Tag a Position">

        </the-title>
        <b-form @submit="create">

            <b-form-group id="position-group" label="Position:" label-for="position" description="Position to add the tag to">
                <v-position-dropdown id="position" v-model="positionId"></v-position-dropdown>
            </b-form-group>

            <v-button-submit :disabled="!positionChosen" :loading="loading">Tag Position</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VPositionDropdown from "../../components/common/VPositionDropdown";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    import Notify from "../../service/Notify";
    export default {
        name: "PositionTagPositionCreate",
        components: {VButtonSubmit, VPositionDropdown, TheTitle},
        props: {
            positionTagId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                positionId: null,
                loading: false
            }
        },
        methods: {
            create() {
                this.loading = true;
                this.$control.positionTag().tagPosition(this.positionTagId, this.positionId)
                    .then(() => {
                        Notify.success('Position Tagged');
                        this.$router.push({
                            name: 'positionTag', params: {positionTagId: this.positionTagId}
                        });
                    })
                    .catch(() => this.loading = false);
            }
        },
        computed: {
            positionChosen() {
                return this.positionId !== null;
            }
        }
    }
</script>

<style scoped>

</style>