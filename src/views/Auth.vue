<template>
    <div class="flex items-center justify-center w-full h-[100vh]">
        <!-- login -->
        <div class="border-2 border-primary rounded-lg p-5 w-1/4 flex flex-col items-center" v-if="isLoginFormActive">
            <p class="text-2xl font-medium mb-10">Log In</p>
            <InputText type="text" size="normal" class="w-full mb-2" placeholder="Email ID" v-model="email" />
            <InputText type="text" size="normal" class="w-full mb-4" placeholder="Password" v-model="password" />
            <LButton size="normal" class="w-full" @click="login">Log in</LButton>
            <p class="mt-5">Don't have an account?
                <span class="text-primary cursor-pointer" @click="isLoginFormActive = false">Sign Up</span>
            </p>
        </div>
        <!-- signup -->
        <div class="border-2 border-primary rounded-lg p-5 w-1/4 flex flex-col items-center" v-else>
            <p class="text-2xl font-medium mb-10">Sign Up</p>
            <InputText type="text" size="normal" class="w-full mb-2" placeholder="Name" v-model="name" />
            <InputText type="text" size="normal" class="w-full mb-2" placeholder="Email ID" v-model="email" />
            <InputText type="text" size="normal" class="w-full mb-4" placeholder="Password" v-model="password" />
            <LButton size="normal" class="w-full" @click="signup" :loading="isLoading">Create New Account</LButton>
            <p class="mt-5">Already have an account?
                <span class="text-primary cursor-pointer" @click="isLoginFormActive = true">Log In</span>
            </p>
        </div>
    </div>
</template>
<script>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

export default {
    name: "AuthPage",
    components: {
        InputText,
        LButton: Button,
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            isLoginFormActive: true,
            isLoading: false,
        }
    },
    methods: {
        async signup() {
            if (!this.email || !this.password) {
                alert("Please enter email and password")
            }
            const data = {
                "email": this.email,
                "emailVisibility": true,
                "password": this.password,
                "passwordConfirm": this.password,
                "name": this.name
            };
            this.isLoading = true;

            try {
                await this.$pb.collection('users').create(data);
                alert("User registration successful. Login to continue")
                this.isLoading = false;
                this.isLoginFormActive = true;
            } catch (error) {
                alert(error.response?.message ?? "Unknown error");
                this.isLoading = false;
            }
        },
        async login() {
            if (!this.email || !this.password) {
                alert("Please enter email and password")
            }
            this.isLoading = true;

            try {
                await this.$pb.collection('users').authWithPassword(this.email, this.password);
                alert("Login successful. Welcome back")
                this.isLoading = false;
                this.$router.push('/');
            } catch (error) {
                alert(error.response?.message ?? "Unknown error");
                this.isLoading = false;
            }
        }
    }
}
</script>