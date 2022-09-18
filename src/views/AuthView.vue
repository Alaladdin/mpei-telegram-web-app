<template>
    <el-form
        class="flex flex-col px-2 space-y-2"
        @submit.prevent="!isLoginBtnDisabled && loginUser()"
    >
        <el-input
            v-model="username"
            :disabled="isLogining"
            required
        >
            <template #prepend>
                username
            </template>
        </el-input>

        <el-input
            v-model="password"
            type="password"
            :disabled="isLogining"
            required
        >
            <template #prepend>
                password
            </template>
        </el-input>

        <el-button
            :loading="isLogining"
            :disabled="isLoginBtnDisabled"
            @click="loginUser"
        >
            login
        </el-button>
    </el-form>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
    name: 'auth-view',
    data: () => ({
        authStore : useAuthStore(),
        username  : '',
        password  : '',
        isLogining: false,
    }),
    computed: {
        isLoginBtnDisabled() {
            return !this.username.trim() || !this.password.trim() || this.isLogining;
        },
    },
    methods: {
        ...mapActions(useAuthStore, ['login']),

        loginUser() {
            const loginData = { username: this.username, password: this.password };

            this.isLogining = true;

            this.login(loginData)
                .then(() => {
                    this.$router.push('/');
                })
                .finally(() => {
                    this.isLogining = false;
                });
        },
    },
});
</script>
