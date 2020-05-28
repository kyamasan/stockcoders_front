<template>
    <div class="login container">
        <form @submit.prevent="easyLogin" class="card-panel">
            <h2 class="center purple-text text-lighten-1">簡単ログイン</h2>
            <div class="field center">
                <div>
                    <button class="waves-effect waves-light btn-large blue darken-4">テストユーザでログイン</button>
                </div>
            </div>
        </form>
        <form @submit.prevent="login" class="card-panel">
            <h2 class="center purple-text text-lighten-1">ログイン</h2>
            <div class="field">
                <label for="email">Email(テスト用アドレス: test@example.com)</label>
                <input id="email" type="email" v-model="email" value="test@example.com">
            </div>
            <div class="field">
                <label for="password">Password(テスト用パスワード: password)</label>
                <input id="password" type="password" v-model="password" value="password">
            </div>
            <p v-if="feedback" class="red-text center">{{ feedback }}</p>
            <div class="field center">
                <div>
                    <button class="waves-effect waves-light btn-large blue darken-4">ログイン</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Login',
    data(){
        return {
            email: null,
            password: null,
            feedback: null
        }
    },
    methods: {
        login() {
            if(this.email && this.password){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    this.$router.push({ name: 'List' })
                }).catch(err => {
                    this.feedback = err.message;
                })
                this.feedback = null;
            } else {
                this.feedback = 'Please fill in both fields'
            }
        },
        easyLogin() {
            firebase.auth().signInWithEmailAndPassword('test@example.com', 'password').then(cred => {
                this.$router.push({ name: 'List' })
            }).catch(err => {
                this.feedback = err.message;
            })
        }
    }
}
</script>

<style>
.login{
    max-width: 400px;
    margin-top: 60px;
}
.card-panel:hover{
    background-color:#cce9ff;
}
.login h2{
    font-size: 2.4em;
}
.login .field{
    margin-bottom: 16px;
}
</style>