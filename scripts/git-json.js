//    "posts-git-log": "mkdir -p public && touch public/posts-git.json && ./scripts/git-json.sh posts/*/*.jade > public/posts-git.json",
require('shelljs/global');
var glob = require('glob');

if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}



mkdir('-p', 'public');
var json = [];
var files = glob.sync('posts/*/*.jade');

var object = {};
var formatter = "";
var isWindows = /^win/.test(process.platform);
if (isWindows) {
  formatter = '"{%n  ^"commit^": ^"%H^",%n  ^"author^": ^"%an <%ae>^",%n  ^"date^": ^"%ad^",%n  ^"message^": ^"%s^"%n}"';
} else {
  formatter = '"{%n  \\"commit\\": \\"%H\\",%n  \\"author\\": \\"%an <%ae>\\",%n  \\"date\\": \\"%ad\\",%n  \\"message\\": \\"%s\\"%n}"';
}

for(var i=0; i<files.length; i++) {
  var file = files[i];


  var command = 'git --no-pager log -1 --pretty=format:' + formatter + ' ' + file;
  var git = exec(command, {async: false, silent: true});
  object[file] = JSON.parse(git.output);
}

var content = JSON.stringify(object);

content.to('public/posts-git.json');
exit(0);
