<template>
    <div>
        <the-title title="Tag Group">

        </the-title>
        <b-form @submit="create">

            <b-form-group id="tag-group" label="Tag:" label-for="tag" description="Tag to tag the group with">
                    <v-group-tag-dropdown v-model="tagId"></v-group-tag-dropdown>
            </b-form-group>

            <v-button-submit :disabled="!tagChosen" :loading="loading">Tag Group</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    import Notify from "../../service/Notify";
    import VGroupTagDropdown from "../../components/common/VGroupTagDropdown";

    export default {
        name: "GroupTagsCreate",
        components: {VGroupTagDropdown, VButtonSubmit, TheTitle},
        props: {
            groupId: {
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
                this.$control.group().tag(this.groupId, this.tagId)
                    .then(() => {
                        Notify.success('Group Tagged');
                        this.$router.push({
                            name: 'group', params: {groupId: this.groupId}
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