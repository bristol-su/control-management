<template>
    <div>
        <the-title title="Tag Role">

        </the-title>
        <b-form @submit.prevent="create">

            <b-form-group id="tag-group" label="Tag:" label-for="tag" description="Tag to tag the role with">
                    <v-role-tag-dropdown v-model="tagId"></v-role-tag-dropdown>
            </b-form-group>

            <v-button-submit :disabled="!tagChosen" :loading="loading">Tag Role</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    import Notify from "../../service/Notify";
    import VRoleTagDropdown from "../../components/common/VRoleTagDropdown";

    export default {
        name: "RoleTagsCreate",
        components: {VRoleTagDropdown, VButtonSubmit, TheTitle},
        props: {
            roleId: {
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
                this.$control.role().tag(this.roleId, this.tagId)
                    .then(() => {
                        Notify.success('Role Tagged');
                        this.$router.push({
                            name: 'role', params: {roleId: this.roleId}
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