# 🗓️ OpenCalendar

**OpenCalendar** は、「URL ひとつで誰とでも予定を共有できる」シンプルで直感的なカレンダーアプリです。
まだまだ未完成ですが、今後はデータ永続化・権限管理などを追加「オープンな予定共有プラットフォーム」を目指します。

<img width="1236" height="818" alt="Screenshot 2025-10-21 at 16 34 10" src="https://github.com/user-attachments/assets/36fbb79b-c4cf-4bc8-99e1-53332ea3f9cd" />

## 🚀 特徴

- **ログイン不要ですぐ使える**

  - アプリを開いた瞬間にカレンダーが表示され、すぐ予定を作成可能。

- **シンプルな操作性**

  - イベントの追加・編集・削除が直感的。

- **（将来的には）外部カレンダーとの連携**
  - Google カレンダーに登録済みの予定も見れる

## 🌱 今後の展望

OpenCalendar は、今後「**誰でも、どこからでも参加できるカレンダー**」を目指して進化していきます。

### 🔹 Phase 1：データの永続化と共有 ID の導入

- カレンダーごとに固有の `calendarId` を発行。
- URL（例：`https://open-calendar.app/c/[id]`）で共有可能。
- サーバー上にデータを保存し、有効期限つきで永続化。

### 🔹 Phase 2：権限設定と共有機能

- 共有リンクを通して閲覧・編集の権限を設定可能。
- ログイン不要でも、共有 URL を開くだけで共同利用できる。
- 将来的には「Owner」「Editor」「Viewer」などのロールを追加予定。

### 🔹 Phase 3：ログインユーザー特典

- ログインユーザーはデータを永久保存可能。
- 複数カレンダーの管理・切り替え機能。
- 将来的には Google カレンダー連携や通知機能も視野に。

### 🔹 Phase 4：UI/UX 強化

- PWA 対応でスマホからも快適に利用。
- カスタムテーマ対応（ライト / ダーク / ミニマル）。
- ドラッグ操作で予定作成などのインタラクティブ機能を追加予定。

## 💡 コンセプトメッセージ

> 「ログイン不要で、手軽に誰とでも予定を共有。」
> 「会議も旅行も、URL ひとつでスケジュール共有。」
> **OpenCalendar は、“つながる”予定共有ツールです。**

## ⚙️ 技術スタック

- **Frontend**: React / TypeScript / FullCalendar
- **Styling**: Tailwind CSS
- **Hosting**: Render(予定)
- \*\*Storage: LocalStorage
- **(Next)** Firebase / Supabase for persistence

## 📦 Getting Started

### リポジトリのクローン

```sh
git clone https://github.com/Ashtan666/open-calendar.git
```

### プロジェクトフォルダに移動

```sh
cd open-calendar
```

### 依存ファイルのインストール

```sh
npm install
```

### localhost に起動

```sh
npm run dev
```

👉 http://localhost:3000 にアクセスして画面を開ける！

## 📌 ライセンス (License)

This project is licensed under the **MIT License**.
You’re free to use, modify, and distribute it with proper attribution.

本プロジェクトは **MIT ライセンス** のもとで公開されています。詳細は[LICENSE](./LICENSE)ファイルを参照してください。
