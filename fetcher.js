/* 
 Take a URL as a command-line argument as well as a local file path and download the resource to the specified path.
 IE
 > node fetcher.js http://www.example.edu/ ./index.html
Downloaded and saved 3261 bytes to ./index.html

Features / Tasks  (+ === Done, > WiP or ToDo)
+Take user input w. process ARGV
+Parse out Input, URL & filePath

+Put Input into request to call up data
+Use Callback to Save the Body to the specified file

>Saved Message  >> Need Files size

Edge Cases
 > File Path Exists > Use Readline to catch error and cfm overwrite
 > Invalid File Path
 + HTTP Error Handlind (!= 200)

*/

// Modules to be used
const request = require('request');
const fs = require('fs');

// Take user input w. process ARGV
const argInput = process.argv.splice(2)
// Parse out Input, URL & filePath
const URL = argInput[0];
const filePath = argInput[1];


//Function to write/Save File
const saveFile = function (toSave) {
  fs.writeFile(filePath, toSave, /*{ flag: 'wx' },*/(err) => {
    console.log("PROCESSING...");
    if (err) {
      console.log("FS Write ERROR");
      return false;
    }
    //Get File Size and 
    const fileStats = fs.statSync(filePath);
    return console.log(`Downloaded and saved ${fileStats.size} bytes to ${filePath}`)
  });
}

// Put Input into request to call up data
request(URL, (error, response, body) => {
  if (response.statusCode === 200) {
    // Use Callback to Save the Body to the specified file
    saveFile(body);
  } else {
    console.log("Status code", response.statusCode);
  };
});

