# [Stock](http://52.193.231.43:80)

## 概要
2018年度に日本株式市場に新規上場した銘柄を中心に、株価のチャートや出来高の推移などを見ることができるサービスです。
(※株価データは本物ではありませんので、ご容赦ください)


一覧画面から各銘柄の詳細を見る際は、ログインが必要です。
![movie](https://user-images.githubusercontent.com/53656269/83327839-e69e3980-a2b9-11ea-9b68-cda30f43dd09.gif)

データの追加、修正、削除が可能です。
![movie2](https://user-images.githubusercontent.com/53656269/83328466-2e26c480-a2be-11ea-9210-a57739f18507.gif)
![movie3](https://user-images.githubusercontent.com/53656269/83328229-81981300-a2bc-11ea-8678-33c266bb3265.gif)

## 使用技術

### UI
* firebase
* vue.js

### WebAPI
* golang
* supervisor(Goバイナリのデーモン化に使用)

### データベース
* MySQL(AWS RDS)

### Webサーバ
* NGINX(AWS EC2)

## フロントエンド(Vue)

### [firebase](https://firebase.google.com/?hl=ja)
サインイン、ログイン機能にはfirebaseの機能を使用しました。

### [ApenCharts](https://apexcharts.com/vue-chart-demos/candlestick-charts/)
チャートの表示にはApexChartsというオープンソースの機能を使用しました。

## バックエンド

### [supervisor](http://supervisord.org/)
API機能をデーモン化する為、Supervisorを使用しました。
 
## データベース(MySQL)

### [MySQL](https://www.mysql.com/jp/)
データベース部分にはAWSのMySQL5.7を使用しました。

## インフラ(AWS)
AWS EC2(Amazon Linux AMI)を使用しました。
