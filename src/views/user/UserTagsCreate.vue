<template>
    <div>
        <the-title title="Tag User">

        </the-title>
        <b-form @submit="create">

            <b-form-group id="tag-group" label="Tag:" label-for="tag" description="Tag to tag the user with">
                    <v-user-tag-dropdown v-model="tagId"></v-user-tag-dropdown>
            </b-form-group>

            <v-button-submit :disabled="!tagChosen" :loading="loading">Tag User</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    import Notify from "../../service/Notify";
    import VUserTagDropdown from "../../components/common/VUserTagDropdown";

    export default {
        name: "UserTagsCreate",
        components: {VUserTagDropdown, VButtonSubmit, TheTitle},
        props: {
            userId: {
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
                this.$control.user().tag(this.userId, this.tagId)
                    .then(() => {
                        Notify.success('User Tagged');
                        this.$router.push({
                            name: 'user', params: {userId: this.userId}
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