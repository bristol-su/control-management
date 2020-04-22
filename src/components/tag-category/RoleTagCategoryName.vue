<template>
    <div>
        <span v-if="loading">Loading...</span>
        <span v-else-if="roleTagCategory"
              id="roleTagCategory-name"
              v-b-tooltip.hover
              :title="roleTagCategory.description">
            <router-link :to="{name: 'roleTagCategory', params: {roleTagCategoryId: roleTagCategory.id}}">
                {{roleTagCategory.name}}
            </router-link>
        </span>
        <span v-else>Error!</span>

    </div>
</template>

<script>
    export default {
        name: "RoleTagCategoryName",
        props: {
            roleTagCategoryId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                roleTagCategory: null,
                loading: false
            }
        },
        mounted() {
            this.fetchRoleTagCategory();
        },
        watch: {
            roleTagCategoryId() {
                this.fetchRoleTagCategory();
            }
        },
        methods: {
            fetchRoleTagCategory() {
                this.loading = true;
                this.$store.dispatch('roleTagCategory/loadRoleTagCategory', this.roleTagCategoryId)
                    .then(roleTagCategory => this.roleTagCategory = roleTagCategory)
                    .then(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>