# ドタバタフットサル（テスト版）

スマホを横持ちして遊ぶ、コミカルな5人制フットサル。1人1キャラを操作し、最大10人でオンライン協力・対戦ができます。

## 知り合いとテスト対戦する

| 端末 | 入れ方 |
|---|---|
| iPhone / Android（すぐ遊べる） | **Web版** https://mitsuru-alt.github.io/dotabata-futsal/ を Safari / Chrome で開く → 共有メニューから「ホーム画面に追加」するとアプリのように全画面で起動 |
| Android（アプリ版） | **APK** https://github.com/mitsuru-alt/dotabata-futsal/releases/download/test/dotabata-test.apk をダウンロード → 「提供元不明のアプリ」を許可してインストール |

Web版とアプリ版はそのまま一緒に遊べます。

### 対戦のしかた
1. ホスト役が「みんなで遊ぶ」→ キャラを決める →「部屋をつくる」
2. 「招待する」を押して LINE などで送る（4文字の部屋コードでも参加できる）
3. 招待された人はリンクを開いて「みんなで遊ぶ」→「参加する」
4. ロビーで協力／対戦・ポジションを決めて、ホストが「キックオフ！」

### テストで見てほしいこと
- つながるか（Wi-Fi 同士／モバイル回線同士／混在）
- カクつき・遅れの体感（ホストから遠い人ほど遅れやすい）
- 途中で抜けたとき・電話が来たときの挙動

### 注意
- 試合はホストの端末で動いています。**ホストはアプリを閉じたり画面を切り替えたりしないでね**（止まります）。
- みんな同じバージョンで遊ぶ必要があります。更新後は Web版を再読み込み／APK を入れ直してください。
- 通信は P2P（WebRTC、PeerJS の公開サーバー経由で接続）。社内 Wi-Fi など一部の回線ではつながらないことがあります。

## 開発

```
npm ci
npm run build          # src/index.html → www/（Web版）
npx cap sync           # www を Android / iOS プロジェクトへ反映
npm run peer:local     # ローカル用の接続サーバー（:9000）
```

- ゲーム本体は `src/index.html` の1ファイル。`www/index.html` はビルドで生成されます。
- ローカルテスト: `www` を配信して `index.html?peer=localhost:9000` で開くとローカル接続サーバーを使います。
- `main` に push すると GitHub Actions が Web版（Pages）と Android APK（Releases の `test`）を自動で更新します。
- iOS アプリ版は `ios/` にあり、ビルドには Mac（Xcode）と Apple Developer Program が必要です。

※ `android/app/dotabata-test.keystore` はテスト配布専用の鍵です。ストア公開用の鍵は別に作り、リポジトリに入れないこと。
