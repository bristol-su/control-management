<template>
    <div>
        <the-title title="Tag a User">

        </the-title>
        <b-form @submit.prevent="create">

            <b-form-group id="user-group" label="User:" label-for="user" description="User to add the tag to">
                <v-user-dropdown id="user" v-model="userId"></v-user-dropdown>
            </b-form-group>

            <v-button-submit :disabled="!userChosen" :loading="loading">Tag User</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VUserDropdown from "../../components/common/VUserDropdown";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    import Notify from "../../service/Notify";
    export default {
        name: "UserTagUserCreate",
        components: {VButtonSubmit, VUserDropdown, TheTitle},
        props: {
            userTagId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                userId: null,
                loading: false
            }
        },
        methods: {
            create() {
                this.loading = true;
                this.$control.userTag().tagUser(this.userTagId, this.userId)
                    .then(() => {
                        Notify.success('User Tagged');
                        this.$router.push({
                            name: 'userTag', params: {userTagId: this.userTagId}
                        });
                    })
                    .catch(() => this.loading = false);
            }
        },
        computed: {
            userChosen() {
                return this.userId !== null;
            }
        }
    }
</script>

<style scoped>

</style>