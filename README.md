# 国税庁法人番号システムWeb APIリクエストラッパーライブラリ

このプロジェクトは、国税庁の法人番号検索ＡＰＩバージョン４のJavaScript/TypeScriptのラッパーライブラリです。

国税庁の法人番号システムWeb-APIの利用にはアプリケーション登録が必要になりますので、下記リンクをご確認の上、アプリケーションＩＤの発行を受けて下さい。

[https://www.houjin-bangou.nta.go.jp/webapi/](https://www.houjin-bangou.nta.go.jp/webapi/)

## ビルドステータス

[![Coverage Status](https://coveralls.io/repos/github/MeigetsuNet/NTACorpNumberAPIManager/badge.svg?branch=master)](https://coveralls.io/github/MeigetsuNet/NTACorpNumberAPIManager?branch=master)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/MeigetsuNet/NTACorpNumberAPIManager/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/MeigetsuNet/NTACorpNumberAPIManager/tree/master)

## インストール

```terminal
npm install ntacorpnumberapimanager
```

## ソースコード例

### 初期化

```javascript
import CorpNumberManager from 'ntacorpnumberapimanager';
const APP_ID = 'XXXXXX';

const const CorpNum = new CorpNumberManager(APP_ID);
```

### 例１：法人番号から検索する

#### コード

```javascript
const info = await CorpNum.getCorpInfoFromNum({ number: '1000011000005', contain_history: false });
console.log(info);
```

※contain_historyは省略できます

#### 出力

```json
{
    "last_update_date": "2023-09-13",
    "divide_number": "1",
    "divide_size": "1",
    "corporations": [
        {
            "corp_number": "1000011000005",
            "process": "新規",
            "correct": "訂正",
            "update_date": "2018-04-02",
            "change_date": "2015-10-05",
            "name": "国立国会図書館",
            "name_ruby": "コクリツコッカイトショカン",
            "kind": "国の機関",
            "address": {
                "text": {
                    "prefecture": "東京都",
                    "city": "千代田区",
                    "street_number": "永田町１丁目１０－１"
                },
                "code": {
                    "prefecture": "13",
                    "city": "101"
                },
                "post_code": "1000014"
            },
            "assignment_date": "2015-10-05",
            "latest": "最新情報",
            "en": {
                "name": "National Diet Library",
                "prefecture": "Tokyo",
                "city": "1-10-1,Nagatacho, Chiyoda ku"
            },
            "ignore": "検索対象"
        }
    ]
}
```

※```getCorpInfoFromNum```の第２引数にfalseを与えると、一部の値をコードで取得できます。コードの意味についてはWeb APIの仕様書を確認して下さい。

### 例２：取得期間を指定して検索する

```javascript
const From = new Date(2020, 0, 1); // 2020年1月1日
const To = new Date(2020, 0, 31); // 2020年1月31日
const info = await CorpNum.getCorpInfoFromDiff({ from: From, to: To });
console.log(info);
```

※出力の形式は[法人番号から検索する](#例１法人番号から検索する)と同じですが、複数件ある場合はcorporationsの中に複数のオブジェクトが生成されます

※```getCorpInfoFromDiff```の第２引数にfalseを与えると、一部の値をコードで取得できます。コードの意味についてはWeb APIの仕様書を確認して下さい。

#### その他指定可能なパラメーター

|パラメーター|説明|型|初期値|
|----|----|----|----|
|address_code|住所コード|string|なし（全国の法人を検索対象にします）|
|corp_type|検索対象とする法人の種類|enum型```CorpSearchType```|なし（全ての法人等を検索します）|
|divide|分割番号|number|1|

#### パラメーター```divide```について

国税庁法人番号Web API仕様書より

Web-APIの取得期間や法人名を指定して情報を取得する場合の一度に取得
することができるデータ件数を2,000件に制限するため、条件に合致するデータ
を取得する際にファイルが分割されることがある。

分割番号は、その際の分割数の分子を表すデータ項目。

次項の分割数と当該データ項目（分割番号）が一致するまでWeb-APIリクエス
ト条件の分割番号をカウントアップしてリクエストを送信することにより、条件に
合致する情報を全て取得することができる。

### 例３：法人名を指定して検索する

```javascript
const From = new Date(2020, 0, 1); // 2020年1月1日
const To = new Date(2020, 0, 31); // 2020年1月31日
const info = await CorpNum.getCorpInfoFromName({ name: '国立国会図書館' });
console.log(info);
```

※出力の形式は[法人番号から検索する](#例１法人番号から検索する)と同じですが、複数件ある場合はcorporationsの中に複数のオブジェクトが生成されます

※```getCorpInfoFromName```の第２引数にfalseを与えると、一部の値をコードで取得できます。コードの意味についてはWeb APIの仕様書を確認して下さい。

|パラメーター|説明|型|初期値|
|----|----|----|----|
|match_type|検索方法|enum型```CorpSearchMode```|Match_Front|
|target|検索対象とする法人の種類|enum型```CorpSearchTarget```|JIS1_2|
|address_code|住所コード|string|なし（全国の法人を検索対象にします）|
|corp_type|検索対象とする法人の種類|enum型```CorpSearchType```|なし（全ての法人等を検索します）|
|contain_change|法人名や所在地の変更があった法人等について過去の情報を含めて検索するかどうか|boolean|false|
|contain_close|登記記録の閉鎖等があった法人等の情報を取得するかどうか|boolean|true|
|corp_number_reserve|法人番号の指定日の範囲|{ from: Date, to: Date }|なし（全ての日付の範囲で検索します）|
|divide|分割番号|number|1|

divideについての説明は[例２取得期間を指定して検索する](#例２取得期間を指定して検索する)を参照して下さい。

## enum型の説明

## CorpSearchMode

法人名検索の際の検索方法を指定する値です。

|値|説明|
|----|----|
|Match_Front|前方一致検索。法人名の前方がキーワードと一致するものを探します。|
|Match_Part|部分一致検索。法人名の一部がキーワードと一致するものを探します。|

## CorpSearchTarget

法人名検索における検索対象および方法を指定します

|値|説明|
|----|----|
|JIS1_2|「商号又は名称」の文字が JIS 第一・第二水準のデータベースをあいまい検索|
|JIS1_4|「商号又は名称」の文字が JIS 第一～第四水準のデータベースを指定した文字そのままで検索|
|English|英語表記が登録された法人の英語表記を検索|

## CorpSearchType

検索対象となる法人の種類を選択します

|値|説明|
|----|----|
|StateAgency|国の機関|
|LocalGovernment|地方公共団体|
|RegisteredCorpEstablishedInJP|国内設立法人|
|Others|外国会社等・その他|

## テストコードについて

変換部に関しては念入りにテストを行っていますが、リクエスト部分につきましてはテストサーバーが無く、本番環境のサーバーにリクエストするしか無いため、国税庁の法人番号システムWeb APIに攻撃まがいのことをすることになってしまう関係で書いておりません。

不具合が見つかりましたらIssueで報告して下さい。

## ライセンスについて

[Meigetsu Application License](https://license.meigetsu.jp/?id=0794FD140AD3450BB4A5A44459335089)
