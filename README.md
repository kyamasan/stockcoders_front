# [Stock](http://52.193.231.43:80)

## 概要
2018年度に日本株式市場に新規上場した銘柄を中心に、株価のチャートや出来高の推移などを見ることができるサービスです。


一覧画面から各銘柄の詳細を見る際は、ログインが必要です。
![movie](https://user-images.githubusercontent.com/53656269/83327839-e69e3980-a2b9-11ea-9b68-cda30f43dd09.gif)

データの追加、修正、削除も可能です。
![movie2](https://user-images.githubusercontent.com/53656269/83328229-81981300-a2bc-11ea-8678-33c266bb3265.gif)

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

## 全体図

![stockcoder](https://user-images.githubusercontent.com/53656269/73697843-eda9a680-4722-11ea-8a8f-7f513b99a8d3.png)

## フロントエンド(Vue)

### SPA
　本サービスには、SPA(シングルページアプリケーション)技術が採用されています。
一覧画面から各銘柄を表示する際に、
ネットワーク通信を行わずにページ遷移することが可能です。

### [ApenCharts](https://apexcharts.com/vue-chart-demos/candlestick-charts/)
価格、出来高チャートの表示にはApexChartsというオープンソースの機能を使用しました。

## バックエンド(Golang)

　バックエンド部分には後述するマイクロサービスで使用されることが多いGolangを採用しました。
 API機能をSupervisorでデーモン化しています。
 
## データベース(MySQL)

　データベース部分にはAWSのMySQL5.7を採用しました。

## インフラ(AWS)

　[フロントエンド](https://github.com/kyamasan/stockcoder)と[バックエンド](https://github.com/kyamasan/go_webserver)はデプロイ環境を完全に独立させて管理しています。
