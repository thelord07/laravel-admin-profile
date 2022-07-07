<script setup>
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import JetAuthenticationCard from "@/Jetstream/AuthenticationCard.vue";
import JetAuthenticationCardLogo from "@/Jetstream/AuthenticationCardLogo.vue";
import JetButton from "@/Jetstream/Button.vue";
import JetInput from "@/Jetstream/Input.vue";
import JetCheckbox from "@/Jetstream/Checkbox.vue";
import JetLabel from "@/Jetstream/Label.vue";
import JetValidationErrors from "@/Jetstream/ValidationErrors.vue";
import AuthLayout from "../../Layouts/Auth.vue";
import imageLogin from "@/assets/img/personal/image-login.png";

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: "",
    password: "",
    remember: false,
});

const submit = () => {
    form.transform((data) => ({
        ...data,
        remember: form.remember ? "on" : "",
    })).post(route("login"), {
        onFinish: () => form.reset("password"),
    });
};
</script>

<template>
    <Head title="Log in" />
    <AuthLayout>


        <div class="container mx-auto px-4 h-full ">
                <img :src="imageLogin" class="relative" style="width:20%; height: auto; margin-left: 40%; " />
            <div class="flex content-center items-center justify-center h-full">
                <div class="w-full lg:w-4/12 px-4">
                    <div
                        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
                    >
                        <div class="flex-auto px-4 lg:px-10 py-10 pt-10">
                            <JetValidationErrors class="mb-4" />

                            <div
                                v-if="status"
                                class="mb-4 font-medium text-sm text-green-600"
                            >
                                {{ status }}
                            </div>

                            <form @submit.prevent="submit">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Email
                                    </label>
                                    <JetInput
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        class="order-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        required
                                        autofocus
                                        placeholder="Email"
                                    />
                                </div>

                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Password
                                    </label>

                                    <JetInput
                                        id="password"
                                        v-model="form.password"
                                        type="password"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        required
                                        placeholder="Password"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="inline-flex items-center cursor-pointer"
                                    >
                                        <JetCheckbox
                                            v-model:checked="form.remember"
                                            name="remember"
                                            class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                        />
                                        <span
                                            class="ml-2 text-sm font-semibold text-blueGray-600"
                                            >Remember me</span
                                        >
                                    </label>
                                </div>

                                <div class="text-center mt-6">
                                    <JetButton
                                        class="justify-center bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        :class="{
                                            'opacity-25': form.processing,
                                        }"
                                        :disabled="form.processing"
                                    >
                                        Log in
                                    </JetButton>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="flex flex-wrap mt-6 relative">
                        <div class="w-1/2">
                            <Link
                                v-if="canResetPassword"
                                :href="route('password.request')"
                                class="text-blueGray-200"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthLayout>
</template>
