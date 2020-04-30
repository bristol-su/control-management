<template>
    <div>
        <the-title title="Tag Position">

        </the-title>
        <b-form @submit="create">

            <b-form-group id="tag-group" label="Tag:" label-for="tag" description="Tag to tag the position with">
                    <v-position-tag-dropdown v-model="tagId"></v-position-tag-dropdown>
            </b-form-group>

            <v-button-submit :disabled="!tagChosen" :loading="loading">Tag Position</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    import Notify from "../../service/Notify";
    import VPositionTagDropdown from "../../components/common/VPositionTagDropdown";

    export default {
        name: "PositionTagsCreate",
        components: {VPositionTagDropdown, VButtonSubmit, TheTitle},
        props: {
            positionId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                tagId: null,
                loading: false
            }
        },
        methods: {
            create() {
                this.loading = true;
                this.$control.position().tag(this.positionId, this.tagId)
                    .then(() => {
                        Notify.success('Position Tagged');
                        this.$router.push({
                            name: 'position', params: {positionId: this.positionId}
                        });
                    })
            }
        },
        computed: {
            tagChosen() {
                return this.tagId !== null;
            }
        }
    }
</script>

<style scoped>

</style>