<template>
    <div>
        <the-title title="Tag a Group">

        </the-title>
        <b-form @submit.prevent="create">

            <b-form-group id="group-group" label="Group:" label-for="group" description="Group to add the tag to">
                <v-group-dropdown id="group" v-model="groupId"></v-group-dropdown>
            </b-form-group>

            <v-button-submit :disabled="!groupChosen" :loading="loading">Tag Group</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VGroupDropdown from "../../components/common/VGroupDropdown";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    import Notify from "../../service/Notify";
    export default {
        name: "GroupTagGroupCreate",
        components: {VButtonSubmit, VGroupDropdown, TheTitle},
        props: {
            groupTagId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                groupId: null,
                loading: false
            }
        },
        methods: {
            create() {
                this.loading = true;
                this.$control.groupTag().tagGroup(this.groupTagId, this.groupId)
                    .then(() => {
                        Notify.success('Group Tagged');
                        this.$router.push({
                            name: 'groupTag', params: {groupTagId: this.groupTagId}
                        });
                    })
                    .catch(() => this.loading = false);
            }
        },
        computed: {
            groupChosen() {
                return this.groupId !== null;
            }
        }
    }
</script>

<style scoped>

</style>