<template>
    <div>
        <div class="auth container">
            <h2 class="text-center py-5">Sign In</h2>
            <div v-if="error" class="alert alert-danger mb-3" role="alert">
                {{error}}
            </div>
            <form @submit.prevent="login">
                <div class="form-group">
                    <input v-model="form.email" type="text" name="email" placeholder="Email"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                    <has-error :form="form" field="email"></has-error>
                </div>

                <div class="form-group">
                    <input v-model="form.password" type="password" name="password" placeholder="Password"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }" autocomplete>
                    <has-error :form="form" field="password"></has-error>
                </div>

                <button :disabled="form.busy" type="submit" class="btn btn-primary">Log In</button>
            </form>
        </div>
    </div>
</template>

<script>
    import { setAuthorization } from "../../helpers/general";
    export default {
        name: "login",
        data() {
            return {
                form: new Form({
                    email: '',
                    password: ''
                }),
                error: "",
            };
        },
        methods: {
            login(){
                this.form.post('/api/auth/login')
                .then((res)=>{
                    setAuthorization(res.data.access_token);
                    this.$store.commit("loginSuccess", res.data);
                    this.$router.push({path: '/home'});
                })
                .catch(({err})=>{
                    this.error = '';
                    this.error = 'The given data was invalid';
                })
            }
        }
    }
</script>

<style scoped>
    form,.alert{
        max-width: 500px;
        margin:auto;
    }
</style>