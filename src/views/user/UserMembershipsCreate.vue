<template>
    <div>
        <the-title title="Create Membership">

        </the-title>
        <b-form @submit.prevent="create">

            <b-form-group id="group-group" label="Group:" label-for="group" description="Group to make the user a member of">
                    <v-group-dropdown v-model="groupId"></v-group-dropdown>
            </b-form-group>

            <v-button-submit :disabled="!groupChosen" :loading="loading">Create Membership</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VGroupDropdown from "../../components/common/VGroupDropdown";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    import Notify from "../../service/Notify";

    export default {
        name: "UserMembershipsCreate",
        components: {VButtonSubmit, VGroupDropdown, TheTitle},
        props: {
            userId: {
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
                this.$control.user().addGroup(this.userId, this.groupId)
                    .then(() => {
                        Notify.success('Membership created');
                        this.$router.push({
                            name: 'user', params: {userId: this.userId}
                        });
                    })
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