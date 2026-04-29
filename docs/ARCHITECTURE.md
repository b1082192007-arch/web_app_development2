# 系統架構 (ARCHITECTURE) - 任務管理系統

## 1. 架構總覽
本系統採用傳統的 Client-Server 架構：
- **前端 (Client)**: HTML, CSS, Vanilla JavaScript
- **後端 (Server)**: Python Flask
- **資料庫 (Database)**: SQLite (`tasks.db`)

## 2. 元件說明
- **Flask Server**: 負責處理使用者的 HTTP 請求 (GET, POST, PUT, DELETE)，操作資料庫，並回傳渲染後的 HTML 頁面或 JSON 資料。
- **SQLite Database**: 單一檔案的輕量級資料庫，負責持久化儲存任務資料。
- **前端 JavaScript**: 負責發送非同步請求 (AJAX) 給後端 API 以動態更新任務清單，處理 UI 互動（如標記完成、刪除任務），不需要每次操作都重新載入整個頁面。

## 3. 資料流向
1. 使用者在畫面上輸入任務並按下 Enter，前端發送 POST 請求至 `/api/tasks`。
2. Flask 接收到請求後，將資料寫入 SQLite，回傳新增成功的 JSON 資料。
3. 前端收到回覆後，動態將新任務插入至 DOM 中。
4. 其他操作 (標記完成、刪除) 亦依循此邏輯，前端發送請求，後端更新 DB，前端更新 UI。
