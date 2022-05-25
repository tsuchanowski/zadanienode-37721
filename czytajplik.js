const fs = require("fs");
const path = require("path");

function saveData(sciezka, nazwa, nadpisac) {

  sciezka = path.join(__dirname, "dane");

  fs.readdir(path.join(__dirname, "dane"), function (err, files) {
    if (err) {
      console.log(err);
    } else {
      console.log(files);
      console.log(__dirname);

      files.forEach(function (file) {
        fs.readFile(path.join(__dirname, "dane", file), "utf-8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            fs.mkdir(path.join(__dirname, nazwa), function (err) {
              if (err && !nadpisac) {
                console.log(err);
                console.log("Folder już istnieje");
              } else {
                console.log("Stworzono nowy folder");

                let obiekt = JSON.parse(data);
                let dlugosc = obiekt.length;

                while (dlugosc--) {
                  let id = obiekt[dlugosc].id;

                  let name = obiekt[dlugosc].name;
                  let fileData =
                    "name: " +
                    obiekt[dlugosc].name +
                    "\n street: " +
                    obiekt[dlugosc].address.street +
                    "\n Zip Code: " +
                    obiekt[dlugosc].address.zipcode +
                    "\n City: " +
                    obiekt[dlugosc].address.city +
                    "\n Phone: " +
                    obiekt[dlugosc].phone;

                  fs.writeFile(path.join(__dirname, nazwa, "id-" + id + " -" + name + ".txt"), fileData, function (err) {
                    if (err)
                      console.log(err);
                    else {
                      console.log("File written successfully\n");
                    }

                  }
                  );
                }
              }
            });
          }
        }
        );
      });
    }
  });
  return sciezka;
}

module.exports = {
  saveData: saveData
}


