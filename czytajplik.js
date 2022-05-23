const fs = require('fs');
const path = require('path');

function saveData(nazwa) {

    fs.readdir(path.join(__dirname, 'dane'), function (err, files) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(files);

            files.forEach(function (file) {
                fs.readFile(path.join(__dirname, 'dane', file), 'utf-8', function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {

                        fs.mkdir(path.join(__dirname, nazwa), function (err) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log('Stworzono nowy folder');
                            
                        var id = "";
                        var name = "";
                        var obiekt = JSON.parse(data);
                        let dlugosc = obiekt.length;

                        while (dlugosc--) {

                            var id = obiekt[dlugosc].id;

                            var name = obiekt[dlugosc].name;
                            let fileData = "name: " + obiekt[dlugosc].name + "\n street: " + obiekt[dlugosc].address.street + "\n Zip Code: " + obiekt[dlugosc].address.zipcode + "\n City: " + obiekt[dlugosc].address.city + "\n Phone: ";
                            
                            fs.writeFile(path.join(__dirname, nazwa, 'id-' + id + ' -' + name + '.txt'), fileData, function (err) {

                                if (err.code === 'EEXIST') {
                                    console.log('Plik już istnieje');
                                    return;
                                }
                            })

                        }
                    }
                })
            }
        })
        }
    )}
})
}

console.log(saveData('Folder'));
console.log('2-read-write-users.json');