/// write to file
var fs = require("fs");
var txtFile = "./test.txt";

var lolz = { 1: { href: "ololo" }, 2: { href: "zomg" }, 3: { href: "ebin" } };

fs.readFile(txtFile, (err, file) => {
  var newFile = JSON.parse(file);
  newFile[6] = { eeee: "ZOMeeeeeeeeeeeeeeeeOM" };
  fs.writeFile(txtFile, JSON.stringify(newFile), err => {
    if (err) throw err;
    console.log("SAVVED"),
      fs.readFile(txtFile, (err, file) => {
        if (err) throw err;
        console.log(JSON.parse(file)[6].eeee);
      });
  });
});
/// read from file
