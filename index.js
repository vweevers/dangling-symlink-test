debug('absolute:  symlink("%s", "%s")', link.to, link.from)
debug('relative:  symlink("%s", "%s")', to, from)

mkdirp(path.dirname(link.from), function(err) {

fs.symlink(link.to, link.from, 'junction', function(err) {
  if (err) return next(new Error('Error linking ' +from+ ' to ' + to + ':\n' + err.message))
  next(null, link)
})
