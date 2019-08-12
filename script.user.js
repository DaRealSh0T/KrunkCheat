// ==UserScript==
// @name         KrunkCheat
// @namespace    https://discord.gg/BeyH5Us
// @version      1.5.3
// @description  Krunker.io Cheat - ESP, Aimbot, Spinbot, and Bhop
// @author       Lemons
// @match        *://krunker.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

class Krunker {
    static patchHTML(html) {
        html = html.replace(/(<script src=".*?game.*?")(><\/script>)/, '$1 type="javascript/blocked" $2');
        html = html.replace(/<script src=".*?paypal.*?"><\/script>/, '');
        return html;
    }

    static get(url) {
        return new Promise(resolve => {
            fetch(url).then(res => res.text()).then(res => {
                return resolve(res);
            });
        });
    }

    static addGUI() {

        let htmlToInject = `
        <style>
        .label {
            display: inline;
            font-size: 75%;
            font-weight: 700;
            line-height: 1;
            color: #fff;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: .25em;
            padding: 7.5px
        }
        .label-warning {
            background-color: #5b52ea;
        }
        .pull-right {
            float: right!important;
        }
        .btn {
            display: inline-block;
            padding: 6px 12px;
            margin-bottom: 5px;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.42857;
            white-space: nowrap;
            -moz-user-select: none;
            border: 1px solid transparent;
            border-radius: 4px;
        }
        .btn, .region-message {
            text-align: center;
        }
        .btn, img {
            vertical-align: middle;
        }
        .btn-success {
            color: #fff;
            background-color: #5cb85c;
            border-color: #4cae4c;
        }

        .hackMenu {
            position: absolute;
            left: 1.5em;
            top: 10em;
            color: #e74c3c;
            padding: 20px 20px;
            border-radius: 8px;
            font-family: 'Ubuntu';
            color: #e74c3c;
            z-index: 9999999999999999;
            min-height: 10px;
            min-width: 200px;
            background-color: rgba(0,0,0,.5);
            letter-spacing: 0.05em;
            margin-bottom: 0.1em;
        }
        </style>
        <div class="hackMenu">
        <center><b style="color: #FFFFFF;">KrunkCheat</b></center>
        <hr>
        <b style="color: #FFFFFF;">Version: <span id="gameVersion" class="label label-warning pull-right" style="border-radius: 1px;"></span>
        <hr>
        <b style="color: #FFFFFF;">GUI: </b> <span class="label label-warning pull-right" style="border-radius: 1px;">DRAGGABLE</span>
        <hr>
        <b style="color: #FFFFFF;">Spinbot (J): </b> <span class="hack_spinbot label pull-right" style="border-radius: 1px;"></span>
        <br>
        <b style="color: #FFFFFF;">Aimbot (O):</b> <span class="hack_aimbot label pull-right" style="border-radius: 1px;"></span>
        <br>
        <b style="color: #FFFFFF;">Bhop (L): </b> <span class="hack_bhop label pull-right" style="border-radius: 1px;"></span>
        <br>
        <b style="color: #FFFFFF;">ESP (K): </b> <span class="hack_esp label pull-right" style="border-radius: 1px;"></span>
        `;

        $('body').append(htmlToInject);
        $('.hackMenu').draggable({ containment: "#gameUI", scroll: false });

        document.querySelector('.hack_spinbot').innerText = localStorage.spinbot ? 'ON' : 'OFF';
        document.querySelector('.hack_spinbot').style.background = localStorage.spinbot ? '#5cb85c' : '#ff0000';

        document.querySelector('.hack_aimbot').innerText = localStorage.aimbot ? 'ON' : 'OFF';
        document.querySelector('.hack_aimbot').style.background = localStorage.aimbot ? '#5cb85c' : '#ff0000';

        document.querySelector('.hack_esp').innerText = localStorage.esp ? 'ON' : 'OFF';
        document.querySelector('.hack_esp').style.background = localStorage.esp ? '#5cb85c' : '#ff0000';

        document.querySelector('.hack_bhop').innerText = localStorage.bhop ? 'ON' : 'OFF';
        document.querySelector('.hack_bhop').style.background = localStorage.bhop ? '#5cb85c' : '#ff0000';

        document.getElementById('gameVersion').innerText = window.version;

        document.getElementById('aMerger').style.display = 'none';
        document.getElementById('aContainer').style.display = 'none';

        window.addEventListener('keydown', (event) => {
            let char = event.key.toUpperCase();

            switch (char) {
                case 'J':
                    if (localStorage.spinbot) {
                        localStorage.removeItem('spinbot');
                    } else {
                        localStorage.setItem('spinbot', true);
                    }
                    document.querySelector('.hack_spinbot').innerText = localStorage.spinbot ? 'ON' : 'OFF';
                    document.querySelector('.hack_spinbot').style.background = localStorage.spinbot ? '#5cb85c' : '#ff0000';
                    break;

                case 'O':
                    if (localStorage.aimbot) {
                        localStorage.removeItem('aimbot');
                    } else {
                        localStorage.setItem('aimbot', true);
                    }
                    document.querySelector('.hack_aimbot').innerText = localStorage.aimbot ? 'ON' : 'OFF';
                    document.querySelector('.hack_aimbot').style.background = localStorage.aimbot ? '#5cb85c' : '#ff0000';
                    break;

                case 'K':
                    if (localStorage.esp) {
                        localStorage.removeItem('esp');
                    } else {
                        localStorage.setItem('esp', true);
                    }
                    document.querySelector('.hack_esp').innerText = localStorage.esp ? 'ON' : 'OFF';
                    document.querySelector('.hack_esp').style.background = localStorage.esp ? '#5cb85c' : '#ff0000';
                    break;

                case 'L':
                    if (localStorage.bhop) {
                        localStorage.removeItem('bhop');
                    } else {
                        localStorage.setItem('bhop', true);
                    }
                    document.querySelector('.hack_bhop').innerText = localStorage.bhop ? 'ON' : 'OFF';
                    document.querySelector('.hack_bhop').style.background = localStorage.bhop ? '#5cb85c' : '#ff0000';
                    break;
            }
        });
    }

    static patchGame(code) {

        code = code.replace(/{if\(this\.target\){.*?}},/g, `
            {
                window.controller = this;

                if (this.target) {
                    this.object.rotation.y = this.target.yD;
                    this.pitchObject.rotation.x = this.target.xD;

                    const half = Math.PI / 2;
                    this.pitchObject.rotation.x = Math.max(-half, Math.min(half, this.pitchObject.rotation.x));

                    this.yDr = this.pitchObject.rotation.x % Math.PI;
                    this.xDr = this.object.rotation.y % Math.PI;
                }
            }, this.camLookAt =
        `);

        code = code.replace(/this\.procInputs=function\(\w+,\w+,\w+\)\{/g, `
            $&

            let aimBot = document.querySelector('.hack_aimbot').innerText === 'ON';

            let targets = game.players.list.filter(player => {
                if (player.team && player.team === this.team) return;
                if (!player.active) return;
                if (!player.inView) return;
                if (player.isYou) return;
                return true;
            });

            let nearestTargets = targets.sort((p1, p2) => {
                var d1 = Math.hypot(this.x - p1.x, this.y - p1.y, this.z - p1.z);
                var d2 = Math.hypot(this.x - p2.x, this.y - p2.y, this.z - p2.z);
                return d1 - d2;
            });

            if (!!window.spinTicks && this.lastSpin && Date.now() - this.lastSpin > 750) {
                window.spinTicks = 0;
            }

            if (this.active && aimBot && nearestTargets.length > 0) {
                let target = nearestTargets.shift();
                let spinBot = document.querySelector('.hack_spinbot').innerText === 'ON';
                let distance = Math.hypot(this.x - target.x, this.y - target.y, this.z - target.z);

                let yPos = target.y + target.height - target.headScale - target.crouchVal * (target.height / 4) - (this.recoilAnimY * 0.3) * 25;

                let xPos = target.x - this.recoilX;
                let zPos = target.z - this.recoilZ;

                if (!spinBot || window.spinTicks > 4) {
                    controller.camLookAt(xPos, yPos, zPos);
                    controller.mouseDownR = 1;

                    if (this.aimVal < 0.1) {
                        controller.mouseDownL = +!controller.mouseDownL;
                    }
                } else if (spinBot) {
                    window.spinTicks++;

                    controller.object.rotation.y += 5;
                    controller.xDr += 5;

                    this.lastSpin = Date.now();
                    window.spinLocked = true;
                }
            } else if (controller.target) {
                controller.target = null;
                controller.mouseDownL = 0;
                controller.mouseDownR = 0;
            } else {
                window.spinTicks = 0;
                window.spinLocked = false;
            }
        `);

        code = code.replace(/this\.xDire=\(t\[2\]\|\|0\)\.round\(3\),this\.yDire=\(t\[3\]\|\|0\)\.round\(3\)/, 'this.xDire=(window.controller.object.rotation.y % Math.PI2).round(3),this.yDire=(window.controller.pitchObject.rotation.x % Math.PI2).round(3)');
        code = code.replace(/,(\w+.yDr=\(\w+.pitchObject.rotation.x%Math.PI2\).round\(3\),\w+.xDr=\(\w+.object.rotation.y%Math.PI2\).round\(3\))/g, ';if (!window.spinLocked) {$1}');
        code = code.replace(/\(\w+\.singlePlayer\?(Object\.keys\(\w+\.store\.skins\)\.map\(t=>t={ind:parseInt\(\w+\),cnt:1}\)):\w+\.skins\)/g, '$1');
        code = code.replace(/if\((!\w+\.inView)\)continue;/g, 'if ($1 && document.querySelector(".hack_esp").innerText === "OFF") continue;');
        code = code.replace(/!(\w+)\.transparent/g, '$& && (!$1.penetrable || !this.players.list.find(a => a.isYou).weapon.pierce)');
        code = code.replace(/(\w+)\.getAngleDist\(t\[2\],this\.xDire\);/, '$1.getAngleDist(this.xDire,this.xDire);');
        code = code.replace(/check2\((\w+)\)/g, '$1 * 500 - 13 / 10 ** 1.5 / Math.max($1, 100) + Math.min($1, 30)');
        code = code.replace(/(\w+)\.getAngleDist\(t\[3\],this\.yDire\)/, '$1.getAngleDist(this.yDire, this.yDire)');
        code = code.replace(/((\w+)\.meleeIndex)=(.*?),/g, '$1 = $2.isYou ? localStorage.meleeIndex : $3,');
        code = code.replace(/((\w+)\.skins)=(\w+)/g, '$1 = $2.isYou ? [localStorage.currentSkin, -1] : $3');
        code = code.replace(/\w+\.exports\.obj=function\((\w+,){8}\w+\){/g, '$& window.game = this;');
        code = code.replace(/(\w+\.exports\.camChase(Trn|Spd|Sen))=.*?,/g, '$1 = Infinity,');
        code = code.replace(/_\.config\.nameTags\|\|_\.mode\.hideNames\|\|/g, '');
        code = code.replace(/\w+\.exports\.camChaseDst=.*?,/g, '$1 = 0,');
        code = code.replace(/this\.newGeo=function\(t\){/g, '$& return;');
        code = code.replace(/;if\(L\|\|E.singlePlayer\)/g, ';if (true)');
        code = code.replace(/\.1<=((\w+)\.avgSpn)/g, 'Infinity < $1');
        code = code.replace(/CLICK TO PLAY/g, 'CLICK TO HACK');

        code += `
            (function() {
                var i = 0;

                setInterval(() => {
                    if (!window.game) {
                        location.reload();
                    }
                }, 500);

                window._selectSkin = window.selectSkin;
                window.selectSkin = function(id) {
                    localStorage.setItem('currentSkin', id);
                    return _selectSkin.apply(this, arguments);
                }

                function jump() {
                    var e = document.createEvent('HTMLEvents');
                    e.keyCode = 32;
                    e.initEvent(++i % 2 > 0 ? 'keyup' : 'keydown', false, true);
                    window.dispatchEvent(e);
                }

                setInterval(() => {
                    if (document.querySelector(".hack_bhop").innerText === "OFF") return;
                    var me = game.players.list.find(a => a.isYou);
                    if (me && me.onGround) jump();
                }, 50);
            })();
        `;

        return code;
    }
}

(async function () {
    if (window.location.pathname !== '/') return;

    const html = await Krunker.get('https://krunker.io');

    let errMessage = 'Join our discord for updated script - discord.gg/BeyH5Us';

    try {
        window.version = html.match(/v[0-9.]{2,}/).shift().slice(1);
        if (window.version !== '1.5.3') return alert(errMessage);
        // Modifying anything can lead to a hacker flagged account
    } catch (err) {
        return alert(errMessage);
    }

    const build = html.match(/(?<=build=)[^"]+/)[0];
    const gameURL = `https://krunker.io/js/game.${build}.js?build=${build}`;

    const code = await Krunker.get(gameURL);

    var page = Krunker.patchHTML(html);
    var gameJS = Krunker.patchGame(code);

    document.open();
    document.write(page);
    document.close();

    try {
        eval(gameJS);
    } catch (err) {
        location.reload();
    }

    Krunker.addGUI();
})();
