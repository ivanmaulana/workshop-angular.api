var connection = require('../connection');

function Todo() {

  this.get = function(req, res) {
    connection.acquire(function(err, con) {
      con.query('select * from todo', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.post = function(req, res) {
      connection.acquire(function(err, con) {
        var query = 'INSERT INTO todo(nama, harga, detail) VALUES (?, ?, ?)';
        var data = [req.nama, req.harga, req.detail];

        con.query(query, data, function(err, result) {
          con.query('select * from todo', function(err, result) {
              con.release();
              res.send(result);
          });
        })
      })
  }

}

module.exports = new Todo();
