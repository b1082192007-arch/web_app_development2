# DB_DESIGN.md - 任務管理系統

## 資料庫名稱
`tasks.db` (SQLite)

## 資料表: `tasks`

這個資料表負責儲存所有的待辦任務與其狀態。

| 欄位名稱    | 資料型態  | 說明             | 約束條件              |
|------------|----------|----------------|---------------------|
| `id`       | INTEGER  | 任務的唯一識別碼 | PRIMARY KEY, AUTOINCREMENT |
| `title`    | TEXT     | 任務標題或內容   | NOT NULL            |
| `completed`| BOOLEAN  | 任務是否已完成   | DEFAULT 0 (未完成)    |

## 關聯性
本專案為輕量級系統，因此只有單一資料表，無其他資料表的關聯。
