<template>
    <div>

    <b-form-group id="group-group" label="Group:" label-for="group" description="Group the role is in">
        <v-group-dropdown v-model="groupId"></v-group-dropdown>
    </b-form-group>

    <b-form-group id="role-group"
                  label="Role:"
                  label-for="role"
                  description="Role to give to the user"
                  v-if="selectedGroup">
        <v-role-dropdown v-model="roleId" :group-id="groupId"></v-role-dropdown>
    </b-form-group>
    </div>
</template>

<script>
    import VGroupDropdown from "../common/VGroupDropdown";
    import VRoleDropdown from "../common/VRoleDropdown";

    export default {
        name: "VFindRole",
        components: {VRoleDropdown, VGroupDropdown},
        props: {
            value: {
                required: false,
                default: null,
                type: Number
            }
        },
        data() {
            return {
                groupId: null
            }
        },
        computed: {
            selectedGroup() {
                return this.groupId !== null;
            },
            roleId: {
                get: function() {
                    return this.value;
                },
                set: function(val) {
                    this.$emit('input', val);
                }
            }
        }
    }
</script>

<style scoped>

</style>