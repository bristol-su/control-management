<template>
    <div id="app">
        <b-container>
            <b-row style="margin-top: 15px; margin-bottom: 15px;">
                <b-col>
                    <b-nav justified pills>
                        <b-nav-item :to="{name: 'users'}" active-class="active">Users</b-nav-item>
                        <b-nav-item :to="{name: 'groups'}" active-class="active">Groups</b-nav-item>
                        <b-nav-item :to="{name: 'roles'}" active-class="active">Roles</b-nav-item>
                        <b-nav-item :to="{name: 'positions'}" active-class="active">Positions</b-nav-item>
                        <b-nav-item-dropdown
                                id="tags-dropdown"
                                right
                                text="Tags"
                        >
                            <b-nav-item :to="{name: 'userTags'}" active-class="active">Users</b-nav-item>
                            <b-nav-item :to="{name: 'groupTags'}" active-class="active">Groups</b-nav-item>
                            <b-nav-item :to="{name: 'roleTags'}" active-class="active">Roles</b-nav-item>
                            <b-nav-item :to="{name: 'positionTags'}" active-class="active">Positions</b-nav-item>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown
                                id="tag-category-dropdown"
                                right
                                text="Tag Categories"
                        >
                            <b-nav-item :to="{name: 'userTagCategories'}" active-class="active">Users</b-nav-item>
                            <b-nav-item :to="{name: 'groupTagCategories'}" active-class="active">Groups</b-nav-item>
                            <b-nav-item :to="{name: 'roleTagCategories'}" active-class="active">Roles</b-nav-item>
                            <b-nav-item :to="{name: 'positionTagCategories'}" active-class="active">Positions</b-nav-item>
                        </b-nav-item-dropdown>
                    </b-nav>
                </b-col>
            </b-row>
            <b-row style="margin-top: 15px; margin-bottom: 15px;">
                <b-col>
                    <hr/>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <router-view/>

                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
