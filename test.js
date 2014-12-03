var test   = require('tape')
  , path   = require('path')
  , fs     = require('fs')
  , tmpDir = path.join(__dirname, 'tmp')
  , mkdirp = require('mkdirp')
  , rimraf = require('rimraf')
  , after  = require('after')

test('relative symlink', function(t){
  prepare(function (err){
    var link = path.join(tmpDir, 'a/link')

    // relative to "a" (link's parent dir)
    var target = '../actual' 

    console.log('symlink("%s", "%s")', target, link)

    fs.symlink(target, link, 'junction', function(err){
      if (err) console.log(err)
      
      t.ok(fs.existsSync(path.join(link, 'b')))
      t.end()
    })
  })

  function prepare(done) {
    rimraf(tmpDir, function(){
      var next = after(2, done)
      mkdirp(path.join(tmpDir, 'a'), next)
      mkdirp(path.join(tmpDir, 'actual/b'), next)
    })
  }
})
