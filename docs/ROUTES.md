# ROUTES.md - 任務管理系統 (API 路由設計)

本系統使用 Flask 提供 RESTful API 或表單處理的路由，所有資料都儲存於 SQLite 資料庫。

## 1. 取得所有任務 (及首頁)
- **URL**: `/`
- **Method**: `GET`
- **說明**: 渲染 `index.html`，並從資料庫讀取所有任務顯示在畫面上。
- **Response**: HTML 頁面

## 2. 取得任務列表 API (供前端 AJAX 呼叫)
- **URL**: `/api/tasks`
- **Method**: `GET`
- **說明**: 回傳所有任務的 JSON 資料。
- **Response**: `[{"id": 1, "title": "任務名稱", "completed": false}, ...]`

## 3. 新增任務
- **URL**: `/api/tasks`
- **Method**: `POST`
- **說明**: 新增一筆任務到資料庫。
- **Request Body (JSON)**: `{"title": "任務內容"}`
- **Response**: `{"id": 2, "title": "任務內容", "completed": false}`

## 4. 更新任務狀態 (標記完成/未完成)
- **URL**: `/api/tasks/<int:task_id>`
- **Method**: `PUT`或`PATCH`
- **說明**: 切換指定 ID 的任務的完成狀態。
- **Request Body (JSON)**: `{"completed": true}`
- **Response**: `{"success": true}`

## 5. 刪除任務
- **URL**: `/api/tasks/<int:task_id>`
- **Method**: `DELETE`
- **說明**: 從資料庫刪除指定 ID 的任務。
- **Response**: `{"success": true}`
