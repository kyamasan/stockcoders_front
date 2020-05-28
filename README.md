# [StockCoders](https://stockcoders.appspot.com)

## 概要
2018年度に日本株式市場に新規上場した銘柄を中心に、株価のチャートや出来高の推移などを見ることができるサービスです。
銘柄一覧を表示する一覧画面から、各銘柄の詳細画面に遷移して、価格(始値、安値、高値、終値)と出来高をグラフィカルに表示します。

![movie](https://user-images.githubusercontent.com/53656269/73695867-56425480-471e-11ea-9858-597e6ccd3434.gif)

## 機能(使用技術)

* Login機能(firebase) ※テストユーザのみ使用可能
* 銘柄表示機能(★Vue.js)
* チャート表示機能(★ApexCharts.js)
* データ取得機能(★Golang)
* データベース(★MySQL)
* インフラ基盤(★Google Cloud Platform)

## 全体図

![stockcoder](https://user-images.githubusercontent.com/53656269/73697843-eda9a680-4722-11ea-8a8f-7f513b99a8d3.png)

## フロントエンド(Vue)

### SPA
　本サービスには、SPA(シングルページアプリケーション)技術が採用されています。
一覧画面から各銘柄を表示する際に、
ネットワーク通信を行わずにページ遷移することが可能です。

### [ApenCharts](https://apexcharts.com/vue-chart-demos/candlestick-charts/)
価格、出来高チャートの表示にはApexChartsというオープンソースの機能を使用しました。

#### 書いたQiita記事
* [Vue.jsで株価チャートを表示する良さげなツールを紹介(APEXCHARTS)](https://qiita.com/_kyamasan/items/44079d4b5a9c9c913521)

## バックエンド(Golang)

　バックエンド部分には後述するマイクロサービスで使用されることが多いGolangを採用しました。
 
#### 書いたQiita記事
 * [GolangとDBを接続して株価データをチャート表示する](https://qiita.com/_kyamasan/items/a105cd97269feea7a30a)

## データベース(MySQL)

　データベース部分にはGoogle Cloud PlatformのMySQL5.7を採用しました。

　価格、出来高以外の、日々の変更が少ないと思われる情報(会社名、発行済株式数等)は、全てcontents.jsonで管理しています。データベースには必要最小限の情報のみ格納することで、サービス全体の通信料を減らし、ユーザの操作感を損なわないようにしています。

　選択された銘柄コード(例 9434:ソフトバンク)をキーに、MySQLからデータを取得します。
 
#### 書いたQiita記事
 
　[GolangでMySql(GCP)に接続する方法](https://qiita.com/_kyamasan/items/51f7abb43e976ed07f5a)
 
　[GCPの無料枠でMySqlのインスタンスを作成し、MySql WorkBenchから接続する](https://qiita.com/_kyamasan/items/0f8cb9d2549838dca8f1)

## インフラ(GCP)

　[フロントエンド](https://github.com/kyamasan/stockcoder)と[バックエンド](https://github.com/kyamasan/go_webserver)はデプロイ環境を完全に独立させて管理しています。

#### 書いたQiita記事

　[gcloud app deployしたアプリが動かずにかなりハマった話](https://qiita.com/_kyamasan/items/008437fee4578239a39c)
 
## 注意点

※通信料削減の為、一度確認した株価データはストレージに保存されます。削除の手順は以下の通りです。

1.F12>Applicationタブをクリック
2.LocalStorageをクリックして、削除ボタンを押す。

![cache](https://user-images.githubusercontent.com/53656269/73586761-29f7bf80-44f5-11ea-8d30-496cbb817f32.jpg)
