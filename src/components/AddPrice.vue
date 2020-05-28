<template>
    <div class="add">
        <div class="add__container">
            <form @submit.prevent method="post">
                <div class="switch">
                    <label>削除モード
                        <input type="checkbox" v-model="isChecked">
                        <span class="lever"></span>
                    </label>
                </div>
                <div class="row">
                    <div class="input-field col s3">
                        <i class="add__icon ion-ios-calendar-outline"></i>
                        <input v-model="date" type="date">
                    </div>
                    <div class="input-field col s2">
                        <i class="add__icon ion-ios-clock-outline"></i>
                        <input v-model="start" type="number" v-if="!isChecked" placeholder="始値">
                    </div>
                    <div class="input-field col s2">
                        <i class="add__icon ion-arrow-graph-up-right"></i>
                        <input v-model="high" type="number" v-if="!isChecked" placeholder="高値">
                    </div>
                    <div class="input-field col s2">
                        <i class="add__icon ion-arrow-graph-down-right"></i>
                        <input v-model="low" type="number" v-if="!isChecked" placeholder="安値">
                    </div>
                    <div class="input-field col s2">
                        <i class="add__icon ion-ios-flag-outline"></i>
                        <input v-model="close" type="number" v-if="!isChecked" placeholder="終値">
                    </div>
                    <div class="col s1">
                        <button class="add__btn" v-if="!isChecked" v-on:click="register"><i class="add__btn ion-ios-checkmark-outline"></i></button>
                        <button class="add__btn" v-else v-on:click="remove"><i class="add__btn ion-trash-a"></i></button>
                    </div>
                </div>
            </form>
            <div>
                <p v-if="feedback" class="red-text center">{{ feedback }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'

export default {
    data() {
        return {
            date: null,
            start: null,
            high: null,
            low: null,
            close: null,
            feedback: null,
            isChecked: false
        }
    },
    methods: {
        register: async function() {
            if(this.date && this.start && this.high && this.low && this.close){
                if(this.start < 1 || this.high < 1 || this.low < 1 || this.close < 1){
                    this.feedback = '0円以下の金額が存在します。'
                    return
                }
                this.feedback = null;

                //https://qiita.com/amamamaou/items/b6cb39739bba4abf4544
                let params = new URLSearchParams();
                params.append('cd', this.$route.params.id);
                params.append('date', this.date);
                params.append('start', this.start);
                params.append('high', this.high);
                params.append('low', this.low);
                params.append('close', this.close);
                
                await Axios.post('http://127.0.0.1:8000/add/', params)
                .then(function (res) {
                    //https://qiita.com/akamt/items/a970179edbb6fa7f3504
                    alert('データ更新に成功しました。')
                    this.$router.go({path: this.$router.currentRoute.path, force: true})
                }.bind(this))
                .catch(function (error) {
                    alert('データ更新に失敗しました。')
                });
            } else {
                this.feedback = '全ての値を入力してください。(日付、始値、高値、安値、終値)'
                return;
            }
        },
        remove: async function() {
            if(this.date){
                this.feedback = null;

                let params = new URLSearchParams();
                params.append('cd', this.$route.params.id);
                params.append('date', this.date);
                
                await Axios.post('http://127.0.0.1:8000/remove/', params)
                .then(function (res) {
                    alert('データ削除に成功しました。')
                    this.$router.go({path: this.$router.currentRoute.path, force: true})
                }.bind(this))
                .catch(function (error) {
                    alert('データ削除に失敗しました。')
                });
            } else {
                this.feedback = '日付を入力してください。'
                return;
            }
        },
    }
}
</script>

<style>
.add {
    padding: 14px;
    border-bottom: 1px solid #e7e7e7;
}

.switch {
    text-align: right;
}

.add__container {
    margin: 0 auto;
    text-align: center;
}

.add__btn {
    font-size: 50px;
    background: none;
    border: none;
    color: #0D47A1;
    cursor: pointer;
    line-height: 1.5;
}

.add__icon {
    font-size: 30px;
    background: none;
    border: none;
    color: #0D47A1;
    display: inline-block;
    line-height: 1.1;
    margin: 10px;
}

.add__btn:active { transform: translateY(2px); }

.add__btn:focus { outline: none; }

</style>