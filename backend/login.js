const path = require( 'path' );
const session = require( 'express-session' );
const store = require( 'better-express-store' );
const acl = require( './acl' );
const passwordEncryptor = require( './passwordEncryptor' );
const passwordField = 'password';

module.exports = function (app, db) {
  app.use(session({
    secret: 'someUnusualStringThatIsUniqueForThisProject',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' },
    store: store({ dbPath: './backend/database/webshop.db' })
  }));

  app.post('/api/login', (req, res) => {
    if (!acl('login', req)) {
      res.status(405);
      res.json({ error: 'Not allowed' });
    }
    req.body[passwordField] =
      passwordEncryptor(req.body[passwordField]);
    let stmt = db.prepare(`
      SELECT * FROM customers
      WHERE email = :email AND password = :password
    `);
    let result = stmt.all(req.body)[0] || { error: 'No such user.' };
    delete result.password;
    if (!result.error) {
      req.session.user = result;
    }
    res.json(result);
  });

  app.get('/api/login', (req, res) => {
    if (!acl('login', req)) {
      res.status(405);
      res.json({ error: 'Not allowed' });
    }
    res.json(req.session.user || { error: 'Not logged in' });
  });

  app.delete('/api/login', (req, res) => {
    if (!acl('login', req)) {
      res.status(405);
      res.json({ error: 'Not allowed' });
    }
    delete req.session.user;
    res.json({ success: 'logged out' });
  });

}
