const path = require("path")
const { execSync } = require("child_process")
const package = require("./package.json")
const { version } = package

module.exports = {
    packagerConfig: {
        icon: path.resolve(__dirname, './build/icon'),
        ignore: [
            "\\.git",
            "\\.scss",
            "/build"
        ]
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: arch => {
                return {
                    authors: "Arthur Lobo",
                    name: "tetris",
                    exe: "tetris.exe",
                    setupExe: `tetris-${version}-win32-${arch}-setup.exe`,
                    setupIcon: path.resolve(__dirname, 'build', 'icon.ico'),
                    iconUrl: "https://raw.githubusercontent.com/ArthurLobopro/tetris/master/build/icon.ico",
                    noMsi: true
                }
            }
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: [
                "darwin"
            ]
        },
        {
            name: "@electron-forge/maker-deb",
            config: {
                name: "tetris.js",
                productName: "Tetris.js",
                genericName: "Tetris.js",
                description: "A simple tetris game",
                icon: path.join(__dirname, "./assets/icon.png"),
                categories: ["Game"],
                options: {
                    maintainer: "Arthur Lobo",
                    homepage: "https://github.com/ArthurLobopro/tetris.js"
                }
            },
            platforms: ["linux"]
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {},
            platforms: []
        }
    ],
    publishers: [
        {
            name: "@electron-forge/publisher-github",
            config: {
                repository: {
                    owner: "ArthurLobopro",
                    name: "tetris.js"
                },
                prerelease: false,
                draft: true
            }
        }
    ],
    hooks: {
        async generateAssets() {
            execSync("yarn sass-compiler --compile")
            execSync("yarn tsc")
        }
    }
}
