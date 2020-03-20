var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ここから書き始める

//メソッドオーバーライドの設定
var methodOverride = require('method-override');
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

//データベースの設定
const mysql = require('mysql');
// MySQLとのコネクションの作成
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  database: 'ToDoList'
});

//一覧表示
app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM todos',
    (error, results) => {
      console.log(results);
      res.render('index.ejs', { todos: results } );
    }
  );
});

// 新規作成
app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO todos (title,text) VALUES (?,?)',
    [req.body.todoTitle,req.body.todoText],
    (error, results) => {
      res.redirect('/');
    }
  );
});

//編集
app.get('/edit/:id',(req,res)=>{
  connection.query(
    'SELECT * FROM todos WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {todo: results[0]});
    }
  )
});

//更新
app.put('/update/:id',(req,res)=>{
  connection.query(
    'UPDATE todos SET title = ?, text = ? WHERE id = ?',
    [req.body.editTitle,req.body.editText, req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
})

//削除（完了）
app.delete('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM todos WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
