const { v4: uuidv4 } = require('uuid');

var express = require('express');
var router = express.Router();
const { todo: sql } = require('../sql/queryFile'); // sql for todo.js;
// DB設定を読み込み
const { db, execute } = require('../db/config');

try {
  router.get('/', async (req, res, next) => {
    console.log(`GET /todo ToDoデータ全取得開始`);
    // SQL結果取得用
    let results;
    // todoのリスト取得
    results = await execute(db, sql.getList);
    let todoList = [];
    todoList = results;
    // タスクリスト取得
    results = await execute(db, sql.getTask);
    let taskList = results;
    // タブのヘッダー情報取得
    results = await execute(db, sql.getTabsHeader);
    let tabsID = results;

    // 表示用にデータを整形
    // リストにタスクを紐づけ
    let todoData = todoList.map((list) => {
      list.tasks = [];
      let found = taskList.filter((task) => task.list_id === list.id);
      list.tasks = found;
      // タスクにタブヘッダー情報を紐づけ
      list.tasks.map((task) => {
        task.tabsData = [];
        let found = tabsID.filter((tab) => tab.task_id === task.id);
        task.tabsData = found;
        return task;
      });
      return list;
    });
    console.log(todoData);

    res.status(200).json({
      todoData,
    });
    console.log(`GET /todo ToDoデータ全取得終了`);
  });

  // タスク名変更
  router.put('/task/:id', async (req, res, next) => {
    console.log(`PUT /todo/task タスク名変更開始`);
    const param = {
      task_id: req.params.id,
      task_title: req.body.data.task_title,
    };
    console.log(param);
    // タスク名変更
    results = await execute(db, sql.updateTaskTitle, param);
    res.status(200).json();
    console.log(`PUT /todo/task タスク名変更終了`);
  });

  // リスト名変更
  router.put('/listName/:listId', async (req, res, next) => {
    console.log(`PUT /todo/listName リスト名変更開始`);
    // console.log(req.params);
    // console.log(req.body.data);
    const param = {
      listId: req.params.listId,
      listTitle: req.body.data.listTitle,
    };
    // リスト名変更
    results = await execute(db, sql.updateListName, param);
    console.log(`リスト名を${param.listTitle}にUPDATE`);
    res.status(200).json();
    console.log(`PUT /todo/listName リスト名変更終了`);
  });

  // 新規タスク追加
  router.post('/task', async (req, res, next) => {
    console.log(`POST /todo/task 新規タスク追加`);
    const list_id = req.body.data.list_id;
    // 既存タスクのインデックスを1つ後ろにずらす
    results = await execute(
      db,
      'update tasks set task_index = task_index + 1 where list_id = $/list_id/ returning *;',
      { list_id: list_id }
    );
    console.log(`既存タスクのインデックスをずらす:${results.length}行`);

    // 新規タスク追加
    task_id = uuidv4();
    let param = {
      task_id: task_id,
      list_id: list_id,
    };
    results = await execute(db, sql.createNewTask, param);
    console.log(`新規タスク追加：${task_id}`);

    // デフォルトのノートデータ作成
    const note_id = uuidv4();
    param = {
      note_id: note_id,
      task_id: task_id,
      note_title: '概要',
    };
    results = await execute(db, sql.createNewNote, param);
    console.log(`新規ノート作成:`, results[0]);

    // データ取得

    res.status(200).json({
      id: results[0].id,
      task_title: results[0].task_title,
    });
    console.log(`POST /todo/task 新規タスク追加終了`);
  });

  // 新規リスト追加
  router.post('/list', async (req, res, next) => {
    console.log(`POST /todo/list 新規リスト追加`);
    listId = uuidv4();
    const param = {
      list_id: listId,
    };
    // 新規リスト追加
    results = await execute(db, sql.createNewList, param);
    console.log(results);
    console.log(`新規リスト追加：${results[0].id}`);
    res.status(200).json({
      id: results[0].id,
      list_title: results[0].list_title,
      tasks: [],
    });
    console.log(`POST /todo/list 新規リスト終了`);
  });

  // ノートデータ取得
  router.get('/note/:tab_id', async (req, res, next) => {
    console.log(`GET /todo/note ノートデータ取得開始`);
    const param = {
      note_id: req.params.tab_id,
    };
    results = await execute(db, sql.getNoteContents, param);
    console.log(results);
    res.status(200).json({
      noteContents: results[0],
    });
    console.log(`GET /todo/note ノートデータ取得終了`);
  });

  // ノートの中身更新
  router.put('/note/:note_id', async (req, res, next) => {
    console.log(`PUT /todo/note ノートの中身更新開始`);
    const param = {
      note_id: req.params.note_id,
      content_json: req.body.data.content_json,
    };
    // リスト名変更
    results = await execute(db, sql.updateNoteContent, param);
    // console.log(`リスト名を${param.listTitle}にUPDATE`);
    res.status(200).json();
    console.log(`PUT /todo/note ノートの中身更新終了`);
  });

  // 新規ノート作成
  router.post('/note', async (req, res, next) => {
    console.log(`POST /todo/note 新規ノート作成`);
    note_id = uuidv4();
    console.log(req.body);
    const param = {
      task_id: req.body.data.task_id,
      note_id: note_id,
      note_title: '新規ノート',
    };
    // 新規ノート登録
    results = await execute(db, sql.createNewNote, param);
    console.log(`新規ノート登録：${results[0].id}`);
    res.status(200).json({
      task_id: results[0].task_id,
      id: results[0].id,
      note_title: results[0].note_title,
      type: 'note',
    });
    console.log(`POST /todo/note 新規ノート作成終了`);
  });

  // タブ名更新
  router.put('/tabName/:tab_id', async (req, res, next) => {
    console.log(`PUT /todo/tab タブ名更新開始`);
    console.log(req.body);

    const param = {
      note_id: req.params.tab_id,
      note_title: req.body.data.tab_title,
      type: req.body.data.type,
    };
    let results = [];
    if (param.type === 'note') {
      // ノートの名称更新
      results = await execute(db, sql.updateNoteTitle, param);
    }
    console.log(results);
    console.log(`ノート名を${results[0].note_title}にUPDATE`);
    res.status(200).json();
    console.log(`PUT /todo/tabName タブ名更新終了`);
  });

  // タブ削除
  router.delete('/tab/:tab_id', async (req, res, next) => {
    console.log(`DELETE /todo/tab タブ削除開始`);
    console.log(req.body);
    const param = {
      note_id: req.params.tab_id,
      type: req.body.data.type,
    };
    let results = [];
    if (param.type === 'note') {
      // ノート削除
      results = await execute(db, sql.deleteNote, param);
    }
    console.log(results);
    console.log(`ノート削除：${results.length}件`);
    res.status(200).json();
    console.log(`DELETE /todo/tab タブ削除終了`);
  });
} catch (error) {
  console.log(error);
}

module.exports = router;
