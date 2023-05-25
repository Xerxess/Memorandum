// 一个简单的文件读写
const fs = require('fs')
const path = require('path')
const jsonfile = require('jsonfile')
const jsonminify = require("jsonminify")
var watch = require('node-watch')
const { setTimeout } = require('timers')

function isDirectory(fileName) {
    if (fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory();
}

function isFile(fileName) {
    if (fs.existsSync(fileName)) return fs.statSync(fileName).isFile();
}

var readJsonFromFile = function (fileLocation) {
    const data = fs.readFileSync(fileLocation, 'utf8')
    return JSON.parse(jsonminify(data))
}

/**
 * 生成pages.json
 * @param {*} data 
 */
const setPagesJsonFile = function (data) {
    const file = 'pages.json'
    jsonfile.writeFile(file, data, function (err) {
        if (err) console.error(err)
    })
}

const createPagesJson = function () {
    const pagesData = {}
    const conditionFile = 'build/main/condition.json'
    const pagesFile = 'build/main/pages.json'
    const globalStyleFile = 'build/main/globalStyle.json'
    const tabBarFile = 'build/main/tabBar.json'

    pagesData.condition = readJsonFromFile(conditionFile)
    pagesData.pages = readJsonFromFile(pagesFile)

    {
        const filePaths = ["pages"]
        const subPackages = []
        filePaths.forEach(function (filePath) {
            const files = fs.readdirSync(filePath)
            files.forEach(function (dir) {
                if (isDirectory(path.join(filePath, dir))) {
                    var pagesFile = path.join(filePath, dir, 'pages.json')
                    if (isFile(pagesFile)) {
                        subPackages.push(readJsonFromFile(pagesFile))
                    }
                }
            })
        })
        pagesData.subPackages = subPackages
    }

    pagesData.globalStyle = readJsonFromFile(globalStyleFile)
    pagesData.tabBar = readJsonFromFile(tabBarFile)

    setPagesJsonFile(pagesData)
}

createPagesJson()

fs.readFile('build/main/conf.js', 'utf8', (e, data) => {
    if (e) throw e;
    fs.writeFile('conf.js', data, (err) => {
        if (err) throw err;
        console.log('conf.js 生成成功');
    });
});


if (process.argv[process.argv.length - 1] !== 'build') {
    let clearBuild
    watch('build/main', { recursive: true, filter: /\.json$/ }, function (evt, name) {
        if (clearBuild) clearTimeout(clearBuild)
        clearBuild = setTimeout(() => {
            console.log('%s changed.', name)
            createPagesJson()
        }, 20)
    });

    watch('pages', { recursive: true, filter: /\.json$/ }, function (evt, name) {
        if (clearBuild) clearTimeout(clearBuild)
        clearBuild = setTimeout(() => {
            console.log('%s changed.', name)
            createPagesJson()
        }, 20)
    });

    watch('build/main', { recursive: true, filter: /conf\.js$/ }, function (evt, name) {
        fs.readFile('build/main/conf.js', 'utf8', (e, data) => {
            if (e) throw e;
            fs.writeFile('conf.js', data, (err) => {
                if (err) throw err;
                console.log('conf.js 生成成功');
            });
        });
    });

    console.log('--已启用文件监听--')
} else {
    console.log('编译成功,请查看pages.json')
}