const path = require("path")

const package = require("./package.json")
const { version } = package

module.exports = {
    packagerConfig: {
        name: 'tetris',
        icon: path.resolve(__dirname, 'build'),
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
            config: {}
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {}
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
    ]
}
