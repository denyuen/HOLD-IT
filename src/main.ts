// @ts-nocheck
/**
 * DODGE! — hold-to-survive neon PROTOZ host.
 * Restored from the live dodge-host / dodge-leaderboard Capacitor web build,
 * then branded DODGE!, with side/top-only ball spawns and a Coming soon Top 10.
 */
import "./style.css";
import { lockNativeChrome } from "./native";

var y = {
        title: `DODGE!`,
        holdToStart: `Hold Your Finger to Start`,
        gameOver: `Game Over!`,
        viewPath: `View path`,
        share: `Share`,
        copied: `Copied`,
        saved: `Saved`,
        done: `Done`,
        lifted: `Lifted`,
        hit: `Hit`,
        thumb: `Thumb`,
        ball: `Ball`,
        best: `Best`,
        newBest: `New best`,
        levelUp: `LEVEL UP`,
        beat: `Beat`,
        youBeatIt: `You beat it!`,
        soClose: `So close`,
        tied: `Tied`,
        slowMotion: `Slow motion`,
        shrink: `Shrink`,
        shield: `Shield`,
        shieldBroke: `Shield broke`,
        howToPlay: `How to play`,
        close: `Close`,
        top10: `Top 10`,
        postScore: `Post`,
        worldOne: `World #1`,
        anon: `Anon`,
        boardOffline: `Offline`,
        boardPosted: `Posted`,
        boardEmpty: `Coming soon`,
        comingSoon: `Coming soon`,
        boardAnonHint: `Posted as Anon — add a name to claim it`
    },
    te = [`Hold to survive. Don’t lift. Don’t touch the balls.`, `Keep holding through 3-2-1, then the timer starts.`, `Balls speed up and bounce off each other. Extra ball every 10s (Level Up).`, `Level 2+: neon pickups — clock, shrink, or shield. Up to two per stage. Risky to grab.`, `Game Over: View path or Share. World Top 10 is coming soon.`],
    ne = `denyuen`,
    re = [`That all you got?`, `One more. Prove it.`, `Bet you can’t beat that.`, `Again. Don’t choke.`, `That was a warmup.`, `Hold longer. I dare you.`, `Cute. Now do it for real.`, `Run it back.`],
    ie = -1;

function ae() {
    let e = re.length,
        t = Math.floor(Math.random() * e);
    return t === ie && (t = (t + 1) % e), ie = t, re[t]
}
var oe = `dodge-best-ms`,
    se = [5, 10, 15, 20, 30, 45, 60],
    ce = [3, 2, 1],
    le = 1e3,
    ue = {
        countdown: 14,
        levelUp: [18, 38, 22],
        gameOver: [55, 28, 110]
    },
    b = {
        bgTop: `#1c1738`,
        bgMid: `#0c0a18`,
        bgEdge: `#05040a`,
        ball: `#f3eefe`,
        ballCore: `#ffffff`,
        ballShade: `#9d94d4`,
        ballGlowCore: `rgba(255, 255, 255, 0.7)`,
        ballGlow: `rgba(255, 78, 208, 0.5)`,
        ballGlowIndigo: `rgba(132, 118, 255, 0.36)`,
        ballRimPink: `rgba(255, 86, 214, 0.92)`,
        ballRimIndigo: `rgba(158, 140, 255, 0.82)`,
        ballRimStroke: `rgba(255, 150, 230, 0.95)`,
        trail: `rgba(255, 244, 252, 0.92)`,
        trailGlow: `rgba(255, 72, 204, 0.58)`,
        trailIndigo: `rgba(150, 128, 255, 0.48)`,
        fingerFill: `rgba(150, 164, 255, 0.07)`,
        fingerRing: `rgba(198, 208, 255, 0.5)`,
        spark: `rgba(236, 240, 255, 0.95)`,
        glowScale: 2.35,
        trailLength: 0,
        sparkCount: 9,
        sparkLife: .4,
        fingerPath: `#5ee1e8`,
        ballPaths: [`#f5f7ff`, `#b8c4ff`, `#9ee7ff`, `#d4b5ff`, `#9fd8c5`, `#e8e2ff`],
        hitMark: `#ff6b7a`,
        watermarkAlpha: .16,
        watermarkReviewAlpha: .09,
        watermarkWidth: .48,
        levelUpMs: 950,
        countdownScale: 4,
        pickupGlass: `rgba(18, 14, 40, 0.78)`,
        pickupGlassHi: `rgba(92, 78, 160, 0.42)`,
        pickupRim: `rgba(255, 110, 214, 0.95)`,
        pickupRimInner: `rgba(186, 196, 255, 0.55)`,
        pickupGlow: `rgba(255, 80, 210, 0.4)`,
        pickupGlowIndigo: `rgba(140, 130, 255, 0.32)`,
        pickupMark: `#fff4fa`,
        pickupMarkGlow: `rgba(255, 92, 210, 0.85)`,
        shield: `rgba(94, 225, 232, 0.95)`,
        shieldGlow: `rgba(94, 225, 232, 0.28)`,
        shieldFill: `rgba(94, 225, 232, 0.08)`
    },
    x = {
        minLevel: 2,
        maxPerLevel: 2,
        pairChance: .55,
        pairPad: 48,
        boxSize: 36,
        boxRadius: 20,
        despawnMs: 7e3,
        spawnDelayMs: 1100,
        spawnJitterMs: 2400,
        slowMs: 4500,
        slowFactor: .42,
        shrinkMs: 8200,
        shrinkScale: .55,
        fingerClearance: 92,
        edgeInset: .2,
        ballOverlapPad: 6,
        centerWeight: 1.2,
        trafficWeight: 1.45,
        shieldScale: 1.48,
        shieldBreakMs: 480,
        shieldGraceMs: 900,
        shieldPush: 80
    };
b.bgEdge, b.ball;
var de = [`IRON`, `BRONZE`, `SILVER`, `GOLD`, `PLATINUM`, `EMERALD`, `DIAMOND`, `MASTER`, `GRANDMASTER`, `CHALLENGER`],
    fe = .45,
    pe = 1100,
    me = 1e4,
    S = null;

function he() {
    return window.AudioContext ?? window.webkitAudioContext
}

function ge() {
    let e = he();
    if (e) {
        if (!S) try {
            S = new e
        } catch {
            S = null;
            return
        }
        S.state === `suspended` && S.resume().catch(() => void 0)
    }
}

function _e(e, t, n, r = 0) {
    if (!S || S.state !== `running`) return;
    let i = S.currentTime + r,
        a = S.createOscillator(),
        o = S.createGain();
    a.type = `square`, a.frequency.setValueAtTime(e, i), o.gain.setValueAtTime(n, i), o.gain.exponentialRampToValueAtTime(1e-4, i + t), a.connect(o), o.connect(S.destination), a.start(i), a.stop(i + t + .012)
}

function ve(e) {
    if (S && S.state === `running`) {
        if (e === `countdown`) {
            _e(1880, .016, .07);
            return
        }
        if (e === `levelUp`) {
            _e(1320, .026, .09), _e(1560, .026, .09, .052);
            return
        }
        _e(210, .08, .13), _e(140, .12, .11, .055)
    }
}

function ye(e) {
    if (ge(), S) {
        if (S.state === `running`) {
            ve(e);
            return
        }
        S.resume().then(() => ve(e)).catch(() => void 0)
    }
}

function be(e) {
    if (typeof navigator.vibrate != `function`) return !1;
    try {
        let t = ue[e];
        return !!navigator.vibrate(t)
    } catch {
        return !1
    }
}

function xe(e) {
    be(e) || ye(e)
}

function Se(e) {
    return de[Math.min(Math.max(1, Math.floor(e)), de.length) - 1]
}
var C = 1080,
    w = 1920,
    Ce = `#07070c`,
    we = `rgba(120, 110, 255, 0.42)`,
    Te = `rgba(94, 225, 232, 0.38)`,
    Ee = `rgba(255, 80, 210, 0.4)`;

function De(e) {
    return e instanceof DOMException && e.name === `AbortError`
}

function Oe(e) {
    return e.complete && e.naturalWidth > 0 ? Promise.resolve(e) : e.complete ? Promise.resolve(null) : new Promise(t => {
        e.addEventListener(`load`, () => t(e.naturalWidth > 0 ? e : null), {
            once: !0
        }), e.addEventListener(`error`, () => t(null), {
            once: !0
        })
    })
}

function ke(e, t, n, r, i, a) {
    let o = Math.min(a, r / 2, i / 2);
    e.beginPath(), e.moveTo(t + o, n), e.arcTo(t + r, n, t + r, n + i, o), e.arcTo(t + r, n + i, t, n + i, o), e.arcTo(t, n + i, t, n, o), e.arcTo(t, n, t + r, n, o), e.closePath()
}

function Ae(e, t, n, r, i, a, o) {
    e.save(), e.shadowColor = a, e.shadowBlur = o, e.fillStyle = i, e.fillText(t, n, r), e.shadowBlur = o * .35, e.fillText(t, n, r), e.shadowBlur = 0, e.fillText(t, n, r), e.restore()
}

function je(e, t, n, r, i) {
    let a = [...t],
        o = a.map(t => e.measureText(t).width),
        s = i * Math.max(0, a.length - 1);
    for (let e of o) s += e;
    let c = n - s / 2;
    for (let t = 0; t < a.length; t++) e.fillText(a[t], c, r), c += o[t] + i
}

function Me(e, t) {
    let n = C * .78 / t.naturalWidth,
        r = t.naturalWidth * n,
        i = t.naturalHeight * n;
    e.save(), e.globalCompositeOperation = `screen`, e.globalAlpha = .14, e.drawImage(t, (C - r) / 2, w * .42 - i / 2, r, i), e.restore()
}

function Ne(e) {
    e.fillStyle = Ce, e.fillRect(0, 0, C, w);
    let t = e.createRadialGradient(C * .5, w * .18, 40, C * .5, w * .18, 620);
    t.addColorStop(0, we), t.addColorStop(1, `rgba(7, 7, 12, 0)`), e.fillStyle = t, e.fillRect(0, 0, C, w);
    let n = e.createRadialGradient(C * .16, w * .88, 20, C * .16, w * .88, 480);
    n.addColorStop(0, Ee), n.addColorStop(1, `rgba(7, 7, 12, 0)`), e.fillStyle = n, e.fillRect(0, 0, C, w);
    let r = e.createRadialGradient(C * .86, w * .78, 20, C * .86, w * .78, 420);
    r.addColorStop(0, Te), r.addColorStop(1, `rgba(7, 7, 12, 0)`), e.fillStyle = r, e.fillRect(0, 0, C, w)
}

function Pe(e, t, n, r, i) {
    let a = e.createRadialGradient(t, n, r * .12, t, n, r * 2.2);
    a.addColorStop(0, `rgba(255, 255, 255, 0.35)`), a.addColorStop(.22, i), a.addColorStop(1, `rgba(7, 7, 12, 0)`), e.fillStyle = a, e.beginPath(), e.arc(t, n, r * 2.2, 0, Math.PI * 2), e.fill();
    let o = e.createRadialGradient(t - r * .3, n - r * .35, r * .06, t, n, r);
    o.addColorStop(0, `#ffffff`), o.addColorStop(.45, `#efeafc`), o.addColorStop(1, `#9d94d4`), e.fillStyle = o, e.beginPath(), e.arc(t, n, r, 0, Math.PI * 2), e.fill()
}

function Fe(e, t, n, r, i, a, o) {
    let s = Math.min(a / Math.max(1, t), o / Math.max(1, n)),
        c = t * s,
        l = n * s,
        u = r + (a - c) / 2,
        d = i + (o - l) / 2;
    return {
        x: u + e.x * s,
        y: d + e.y * s
    }
}

function Ie(e, t, n, r, i, a, o, s, c, l) {
    if (t.length === 0) return;
    let u = t.map(e => Fe(e, i, a, o, s, c, l));
    if (e.lineJoin = `round`, e.lineCap = `round`, e.strokeStyle = n, e.fillStyle = n, u.length === 1) {
        e.globalAlpha = .22, e.beginPath(), e.arc(u[0].x, u[0].y, r + 1, 0, Math.PI * 2), e.fill(), e.globalAlpha = 1;
        return
    }
    e.globalAlpha = .16, e.lineWidth = r, e.beginPath(), e.moveTo(u[0].x, u[0].y);
    for (let t = 1; t < u.length; t++) e.lineTo(u[t].x, u[t].y);
    e.stroke();
    let d = Math.max(1, Math.floor(u.length * .72));
    e.globalAlpha = .32, e.lineWidth = r + .6, e.beginPath(), e.moveTo(u[d - 1].x, u[d - 1].y);
    for (let t = d; t < u.length; t++) e.lineTo(u[t].x, u[t].y);
    e.stroke();
    let f = u[u.length - 1];
    e.globalAlpha = .36, e.beginPath(), e.arc(f.x, f.y, r + 1, 0, Math.PI * 2), e.fill(), e.globalAlpha = 1
}

function Le(e, t) {
    let n = 1640,
        r = Math.min(904 / Math.max(1, t.playW), n / Math.max(1, t.playH));
    Ie(e, t.finger, b.fingerPath, 3.1 * r, t.playW, t.playH, 88, 140, 904, n);
    let i = t.hit ?? t.lift;
    if (!i) return;
    let a = Fe(i, t.playW, t.playH, 88, 140, 904, n);
    if (e.save(), e.lineCap = `round`, e.lineWidth = Math.max(2.4, 3.2 * r), t.hit) {
        let t = 11 * r;
        e.strokeStyle = b.hitMark, e.beginPath(), e.moveTo(a.x - t, a.y - t), e.lineTo(a.x + t, a.y + t), e.moveTo(a.x + t, a.y - t), e.lineTo(a.x - t, a.y + t), e.stroke(), e.beginPath(), e.arc(a.x, a.y, 18 * r, 0, Math.PI * 2), e.strokeStyle = `rgba(255, 107, 122, 0.45)`, e.lineWidth = Math.max(1.6, 2 * r), e.stroke()
    } else e.strokeStyle = `#9aa0bf`, e.beginPath(), e.arc(a.x, a.y, 16 * r, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.moveTo(a.x, a.y - 7 * r), e.lineTo(a.x, a.y + 7 * r), e.stroke();
    e.restore()
}

function Re(e, t, n, r, i) {
    e.save(), ke(e, t, n, r, i, 0), e.fillStyle = `rgba(8, 8, 16, 0.62)`, e.fill();
    let a = e.createLinearGradient(t, n, t, n + i);
    a.addColorStop(0, `rgba(255, 255, 255, 0.1)`), a.addColorStop(.18, `rgba(255, 255, 255, 0.03)`), a.addColorStop(1, `rgba(94, 225, 232, 0.04)`), e.fillStyle = a, e.fill(), e.strokeStyle = `rgba(255, 150, 230, 0.35)`, e.lineWidth = 1.6, e.stroke(), (t > 0 || n > 0) && (e.strokeStyle = `rgba(94, 225, 232, 0.22)`, e.lineWidth = 1, ke(e, t + 8, n + 8, r - 16, i - 16, 18), e.stroke()), e.restore()
}

function ze(e) {
    switch (e) {
        case `IRON`:
            return {
                metalDark: `#1c1c1e`, metalMid: `#4a4a4e`, metalLight: `#8e8e93`, accent: `#6c6c70`, glow: `rgba(150, 150, 158, 0.16)`, gem: `#2c2c30`, gemHi: `#6a6a70`, ink: `#d8d8dc`, banner: `#3a3a3e`
            };
        case `BRONZE`:
            return {
                metalDark: `#2a1408`, metalMid: `#8a4a22`, metalLight: `#d08a4a`, accent: `#5a2810`, glow: `rgba(176, 88, 32, 0.28)`, gem: `#4a2010`, gemHi: `#e0a060`, ink: `#f0d0b0`, banner: `#5a2814`
            };
        case `SILVER`:
            return {
                metalDark: `#2c3640`, metalMid: `#8a98a8`, metalLight: `#f2f6fa`, accent: `#6a7a8a`, glow: `rgba(210, 224, 240, 0.32)`, gem: `#3a4858`, gemHi: `#dce6f0`, ink: `#f4f8fc`, banner: `#3a4854`
            };
        case `GOLD`:
            return {
                metalDark: `#4a2e06`, metalMid: `#c49228`, metalLight: `#ffe27a`, accent: `#e8b84a`, glow: `rgba(255, 196, 72, 0.42)`, gem: `#7a4e0c`, gemHi: `#fff3b0`, ink: `#fff6d0`, banner: `#6a420c`
            };
        case `PLATINUM`:
            return {
                metalDark: `#0a2e30`, metalMid: `#3a8a88`, metalLight: `#c8fff6`, accent: `#5ad4c8`, glow: `rgba(90, 220, 210, 0.44)`, gem: `#164848`, gemHi: `#e4fffa`, ink: `#e8fffa`, banner: `#0e3c3c`
            };
        case `EMERALD`:
            return {
                metalDark: `#042414`, metalMid: `#1a8a48`, metalLight: `#7affb0`, accent: `#2ee07a`, glow: `rgba(46, 224, 122, 0.46)`, gem: `#083820`, gemHi: `#d4ffe4`, ink: `#dcffea`, banner: `#0a3820`
            };
        case `DIAMOND`:
            return {
                metalDark: `#061e3a`, metalMid: `#3a88d0`, metalLight: `#d4f0ff`, accent: `#5ab8ff`, glow: `rgba(90, 184, 255, 0.5)`, gem: `#0c3868`, gemHi: `#ffffff`, ink: `#eef8ff`, banner: `#0a2c50`
            };
        case `MASTER`:
            return {
                metalDark: `#1e0c38`, metalMid: `#8848d0`, metalLight: `#f0d4ff`, accent: `#c070ff`, glow: `rgba(192, 112, 255, 0.52)`, gem: `#341058`, gemHi: `#faecff`, ink: `#faecff`, banner: `#2a1048`
            };
        case `GRANDMASTER`:
            return {
                metalDark: `#3a060c`, metalMid: `#c02838`, metalLight: `#ffc070`, accent: `#ff4a4a`, glow: `rgba(255, 74, 74, 0.56)`, gem: `#5a0814`, gemHi: `#ffe0a0`, ink: `#ffe8c4`, banner: `#480810`
            };
        case `CHALLENGER`:
            return {
                metalDark: `#2e1e06`, metalMid: `#e8c050`, metalLight: `#fff6d0`, accent: `#3de8ff`, glow: `rgba(255, 220, 80, 0.64)`, gem: `#0c3c6a`, gemHi: `#ffffff`, ink: `#fff8e4`, banner: `#3a2808`
            }
    }
}

function Be(e) {
    switch (e) {
        case `IRON`:
            return `rgba(140, 140, 148, 0.4)`;
        case `BRONZE`:
            return `rgba(196, 96, 36, 0.46)`;
        case `SILVER`:
            return `rgba(200, 220, 240, 0.42)`;
        case `GOLD`:
            return `rgba(255, 196, 72, 0.5)`;
        case `PLATINUM`:
            return `rgba(70, 220, 210, 0.48)`;
        case `EMERALD`:
            return `rgba(46, 224, 122, 0.46)`;
        case `DIAMOND`:
            return `rgba(80, 180, 255, 0.5)`;
        case `MASTER`:
            return `rgba(176, 96, 255, 0.5)`;
        case `GRANDMASTER`:
            return `rgba(255, 64, 72, 0.5)`;
        case `CHALLENGER`:
            return `rgba(255, 220, 80, 0.52)`
    }
}

function Ve(e, t, n, r) {
    e.beginPath();
    for (let i = 0; i < t * 2; i++) {
        let a = i * Math.PI / t - Math.PI / 2,
            o = i % 2 == 0 ? r : n,
            s = Math.cos(a) * o,
            c = Math.sin(a) * o;
        i === 0 ? e.moveTo(s, c) : e.lineTo(s, c)
    }
    e.closePath()
}

function He(e, t, n) {
    let r = e.createLinearGradient(-t, -t, t, t);
    return r.addColorStop(0, n.metalLight), r.addColorStop(.22, n.metalMid), r.addColorStop(.48, n.metalDark), r.addColorStop(.72, n.metalMid), r.addColorStop(1, n.metalLight), r
}

function Ue(e, t, n, r) {
    e.save(), e.scale(n, n);
    let i = n => {
        e.beginPath(), e.moveTo(n * 38, -6), e.quadraticCurveTo(n * 108, -52, n * 152, -10), e.quadraticCurveTo(n * 118, 4, n * 92, 2), e.quadraticCurveTo(n * 128, 18, n * 146, 36), e.quadraticCurveTo(n * 96, 16, n * 40, 14), e.closePath();
        let i = e.createLinearGradient(n * 40, -48, n * 152, 36);
        i.addColorStop(0, t.metalLight), i.addColorStop(.45, t.metalMid), i.addColorStop(1, t.metalDark), e.fillStyle = i, e.fill(), e.strokeStyle = t.accent, e.lineWidth = 2, e.stroke();
        for (let i = 0; i < r; i++) {
            let a = (i + 1) / (r + 1);
            e.beginPath(), e.moveTo(n * (48 + a * 28), -4 + a * 6), e.quadraticCurveTo(n * (100 + a * 30), -28 + a * 18, n * (130 + a * 16), 8 + a * 18), e.strokeStyle = t.metalLight, e.globalAlpha = .45, e.lineWidth = 1.2, e.stroke(), e.globalAlpha = 1
        }
    };
    i(1), i(-1), e.restore()
}

function We(e, t, n) {
    let r = r => {
        e.beginPath(), e.moveTo(r * 46, -8), e.quadraticCurveTo(r * n, -32, r * (n + 14), 0), e.quadraticCurveTo(r * n, 24, r * 48, 12), e.closePath();
        let i = e.createLinearGradient(r * 46, -20, r * n, 16);
        i.addColorStop(0, t.metalLight), i.addColorStop(1, t.metalDark), e.fillStyle = i, e.fill(), e.strokeStyle = t.metalLight, e.lineWidth = 1.6, e.stroke()
    };
    r(1), r(-1)
}

function Ge(e, t, n, r) {
    e.beginPath(), e.moveTo(-32, -42);
    for (let t = 0; t < n; t++) {
        let i = -32 + t / n * 32 * 2,
            a = -32 + (t + 1) / n * 32 * 2,
            o = (i + a) / 2,
            s = t === Math.floor(n / 2);
        e.lineTo(o, s ? r : r + 16), e.lineTo(a, -42)
    }
    e.closePath();
    let i = e.createLinearGradient(0, r, 0, -42);
    i.addColorStop(0, t.metalLight), i.addColorStop(1, t.metalMid), e.fillStyle = i, e.fill(), e.strokeStyle = t.accent, e.lineWidth = 2, e.stroke(), e.beginPath(), e.arc(0, r, 5.5, 0, Math.PI * 2), e.fillStyle = t.gemHi, e.fill()
}

function Ke(e, t) {
    e.beginPath(), e.moveTo(0, -26), e.lineTo(20, 0), e.lineTo(0, 26), e.lineTo(-20, 0), e.closePath(), e.fillStyle = t.gemHi, e.globalAlpha = .38, e.fill(), e.globalAlpha = 1, e.strokeStyle = t.accent, e.lineWidth = 1.6, e.stroke()
}

function qe(e, t) {
    e.beginPath(), e.moveTo(-14, -18), e.lineTo(14, -18), e.lineTo(20, 0), e.lineTo(14, 18), e.lineTo(-14, 18), e.lineTo(-20, 0), e.closePath(), e.fillStyle = t.gemHi, e.globalAlpha = .3, e.fill(), e.globalAlpha = 1, e.strokeStyle = t.accent, e.lineWidth = 1.6, e.stroke()
}

function Je(e, t, n, r, i) {
    e.beginPath(), e.moveTo(-i, n), e.lineTo(-i + 18, n - 21), e.lineTo(i - 18, n - 21), e.lineTo(i, n), e.lineTo(i - 18, n + 21), e.lineTo(-i + 18, n + 21), e.closePath();
    let a = e.createLinearGradient(0, n - 21, 0, n + 21);
    a.addColorStop(0, r.metalMid), a.addColorStop(.5, r.banner), a.addColorStop(1, r.metalDark), e.fillStyle = a, e.fill(), e.strokeStyle = r.metalLight, e.lineWidth = 2, e.stroke(), e.fillStyle = r.ink, e.font = `800 26px ui-sans-serif, system-ui, sans-serif`, e.textAlign = `center`, e.textBaseline = `middle`, e.fillText(t, 0, n + 1)
}

function Ye(e, t, n, r) {
    let i = Se(t),
        a = ze(i),
        o = de.indexOf(i),
        s = o >= 3,
        c = o >= 6,
        l = o >= 7,
        u = o >= 8,
        d = i === `CHALLENGER`;
    if (e.save(), e.translate(n, r), e.shadowColor = a.glow, e.shadowBlur = 10 + o * 3, u) {
        let t = e.createRadialGradient(0, 0, 18, 0, 0, d ? 128 : 116);
        t.addColorStop(0, a.metalLight), t.addColorStop(.42, a.accent), t.addColorStop(1, `rgba(0,0,0,0)`), e.fillStyle = t, Ve(e, d ? 16 : 12, d ? 58 : 54, d ? 126 : 112), e.fill()
    }
    c ? Ue(e, a, u ? 1.1 : 1, u ? 4 : 3) : s && We(e, a, 96 + o * 4), l && Ge(e, a, u ? 5 : 3, d ? -84 : u ? -76 : -70);
    let f = d ? 76 : 70;
    e.beginPath(), e.arc(0, 0, f, 0, Math.PI * 2), e.fillStyle = He(e, f, a), e.fill(), e.lineWidth = 3.2, e.strokeStyle = a.metalLight, e.stroke(), e.beginPath(), e.arc(0, 0, f - 2.4, -Math.PI * .92, Math.PI * .12), e.strokeStyle = `rgba(255,255,255,0.62)`, e.lineWidth = 2.6, e.stroke(), e.beginPath(), e.arc(0, 0, f - 2.4, Math.PI * .38, Math.PI * 1.12), e.strokeStyle = `rgba(0,0,0,0.5)`, e.lineWidth = 2.4, e.stroke(), e.beginPath(), e.arc(0, 0, f - 9, 0, Math.PI * 2), e.strokeStyle = a.metalDark, e.lineWidth = 2.4, e.stroke(), o >= 2 && (e.beginPath(), e.arc(0, 0, f - 16, 0, Math.PI * 2), e.strokeStyle = a.accent, e.globalAlpha = .7, e.lineWidth = 1.4, e.stroke(), e.globalAlpha = 1);
    let p = 6 + o;
    for (let t = 0; t < p; t++) {
        let n = t / p * Math.PI * 2 - Math.PI / 2,
            r = f - 4.5;
        e.beginPath(), e.arc(Math.cos(n) * r, Math.sin(n) * r, o >= 5 ? 2.5 : 2.1, 0, Math.PI * 2), e.fillStyle = a.metalLight, e.fill(), e.strokeStyle = a.metalDark, e.lineWidth = 1, e.stroke()
    }
    let m = e.createRadialGradient(-12, -16, 4, 0, 8, 46);
    m.addColorStop(0, a.gemHi), m.addColorStop(.4, a.gem), m.addColorStop(1, a.metalDark), e.beginPath(), e.arc(0, 0, 46, 0, Math.PI * 2), e.fillStyle = m, e.fill(), e.strokeStyle = a.metalDark, e.lineWidth = 2, e.stroke(), e.beginPath(), e.arc(0, 0, 42.5, 0, Math.PI * 2), e.strokeStyle = a.accent, e.globalAlpha = .55, e.lineWidth = 1.3, e.stroke(), e.globalAlpha = 1, i === `DIAMOND` || i === `CHALLENGER` ? Ke(e, a) : i === `EMERALD` ? qe(e, a) : (e.beginPath(), e.ellipse(-10, -12, 11, 7, -.5, 0, Math.PI * 2), e.fillStyle = `rgba(255,255,255,0.28)`, e.fill()), e.shadowBlur = 0, Je(e, i, 96, a, i === `GRANDMASTER` ? 188 : i === `CHALLENGER` ? 172 : 146), e.fillStyle = a.metalLight, e.font = `700 18px ui-sans-serif, system-ui, sans-serif`, e.textAlign = `center`, e.textBaseline = `middle`, e.fillText(`LV ${t}`, 0, 132), e.restore()
}

function Xe(e) {
    e.save(), e.strokeStyle = `rgba(255, 110, 214, 0.4)`, e.shadowColor = `rgba(255, 80, 210, 0.28)`, e.shadowBlur = 6, e.lineWidth = 1.4, e.strokeRect(2, 2, 1076, 1916), e.shadowBlur = 0, e.strokeStyle = `rgba(94, 225, 232, 0.28)`, e.lineWidth = .8, e.strokeRect(8, 8, 1064, 1904), e.restore()
}

function Ze(e, t, n) {
    let r = Math.max(1, n.playW),
        i = Math.max(1, n.playH),
        a = document.createElement(`canvas`);
    a.width = C, a.height = Math.max(1, Math.round(C * i / r));
    let o = a.getContext(`2d`);
    if (!o) return a;
    o.setTransform(a.width / C, 0, 0, a.height / w, 0, 0), o.textAlign = `center`, o.textBaseline = `middle`, Ne(o), t && Me(o, t), Le(o, n);
    let s = Se(e.level),
        c = o.createRadialGradient(C / 2, 840, 30, C / 2, 840, 560);
    c.addColorStop(0, Be(s)), c.addColorStop(.55, `rgba(7, 7, 12, 0.08)`), c.addColorStop(1, `rgba(7, 7, 12, 0)`), o.fillStyle = c, o.fillRect(0, 0, C, w), Pe(o, 170, 280, 18, `rgba(255, 90, 210, 0.32)`), Pe(o, 940, 1848, 20, `rgba(94, 225, 232, 0.26)`), Re(o, 0, 0, C, w), Xe(o), o.fillStyle = `rgba(186, 196, 255, 0.78)`, o.shadowColor = `rgba(168, 180, 255, 0.4)`, o.shadowBlur = 16, o.font = `700 48px ui-sans-serif, system-ui, sans-serif`, je(o, y.title, C / 2, 168, 20), o.shadowBlur = 0, o.font = `italic 600 30px ui-sans-serif, system-ui, sans-serif`, Ae(o, e.tease, C / 2, 236, `#ffb3e4`, `rgba(255, 80, 210, 0.4)`, 12), o.font = `700 26px ui-sans-serif, system-ui, sans-serif`, o.fillStyle = `rgba(186, 196, 255, 0.7)`, je(o, `SURVIVED`, C / 2, 380, 12), o.font = `700 320px ui-monospace, "SF Mono", Menlo, Consolas, monospace`, Ae(o, e.score, C / 2, 640, `#fff4fa`, `rgba(94, 225, 232, 0.45)`, 40), o.font = `600 30px ui-sans-serif, system-ui, sans-serif`, o.fillStyle = `rgba(94, 225, 232, 0.88)`, je(o, `SECONDS`, C / 2, 860, 10);
    let l = e.balls === 1 ? y.ball.toUpperCase() : `${y.ball.toUpperCase()}S`;
    if (o.font = `600 24px ui-sans-serif, system-ui, sans-serif`, o.fillStyle = `rgba(212, 220, 255, 0.72)`, o.shadowBlur = 0, o.fillText(`${s}  ·  LEVEL ${e.level}  ·  ${e.balls} ${l}`, C / 2, 940), e.isNewBest) {
        let e = y.newBest.toUpperCase();
        o.font = `700 24px ui-sans-serif, system-ui, sans-serif`;
        let t = o.measureText(e).width + 72,
            n = (C - t) / 2;
        o.save(), o.shadowColor = `rgba(255, 214, 120, 0.55)`, o.shadowBlur = 14, o.fillStyle = `rgba(255, 214, 120, 0.14)`, ke(o, n, 1e3, t, 52, 999), o.fill(), o.strokeStyle = `rgba(255, 231, 163, 0.85)`, o.lineWidth = 2, o.stroke(), o.restore(), o.fillStyle = `#ffe7a3`, o.fillText(e, C / 2, 1027)
    }
    let u = e.isNewBest ? 1120 : 1056;
    return o.font = `600 36px ui-sans-serif, system-ui, sans-serif`, Ae(o, `Can you beat ${e.score}s?`, C / 2, u, `#ffe9fb`, `rgba(255, 80, 210, 0.45)`, 14), Ye(o, e.level, C / 2, 1340), o.font = `500 24px ui-sans-serif, system-ui, sans-serif`, o.fillStyle = `rgba(180, 184, 210, 0.75)`, o.fillText(ne, C / 2, 1588), o.font = `600 18px ui-sans-serif, system-ui, sans-serif`, o.fillStyle = `rgba(94, 225, 232, 0.55)`, o.fillText(`PROTOZ`, C / 2, 1632), a
}

function Qe(e) {
    return new Promise((t, n) => {
        e.toBlob(e => {
            e ? t(e) : n(Error(`png`))
        }, `image/png`)
    })
}

function $e(e, t) {
    let n = URL.createObjectURL(e),
        r = document.createElement(`a`);
    r.href = n, r.download = t, r.rel = `noopener`, document.body.append(r), r.click(), r.remove(), window.setTimeout(() => URL.revokeObjectURL(n), 1500)
}

function et(e, t) {
    return `Can you beat my ${e}s in ${t}?`
}
async function tt(e) {
    let {
        blob: t,
        score: n,
        title: r,
        url: i
    } = e, a = et(n, r), o = `${a} ${i}`, s = r.toLowerCase().replace(/[^a-z0-9]+/g, `-`).replace(/^-|-$/g, ``), c = new File([t], `${s}-${n}s.png`, {
        type: `image/png`
    }), l = {
        title: r,
        text: a,
        url: i,
        files: [c]
    }, u = {
        title: r,
        text: a,
        url: i
    };
    if (typeof navigator.share == `function`) {
        try {
            if (!navigator.canShare || navigator.canShare(l)) return await navigator.share(l), `shared`
        } catch (e) {
            if (De(e)) return `aborted`
        }
        try {
            if (!navigator.canShare || navigator.canShare(u)) return await navigator.share(u), `shared`
        } catch (e) {
            if (De(e)) return `aborted`
        }
    }
    try {
        return await navigator.clipboard.writeText(o), `copied`
    } catch {}
    try {
        return $e(t, c.name), `downloaded`
    } catch {
        return `copied`
    }
}
var nt = `dodge-board-name`,
    rt = ``;

function it() {
    if (typeof window < `u`) {
        let e = window.location.origin.replace(/\/+$/, ``),
            t = window.location.hostname,
            n = window.location.port;
        if (rt === e || t.endsWith(`workers.dev`) || (t === `localhost` || t === `127.0.0.1`) && n !== `43147`) return ``;
        if (!rt) return t.endsWith(`workers.dev`) ? `` : null
    }
    return rt || null
}

function at() {
    let e = it();
    return e === null ? `` : e === `` ? typeof window < `u` ? window.location.origin : `` : e
}

function ot() {
    try {
        return localStorage.getItem(nt) ?? ``
    } catch {
        return ``
    }
}

function st(e) {
    try {
        e ? localStorage.setItem(nt, e) : localStorage.removeItem(nt)
    } catch {}
}

function ct(e) {
    if (!e || typeof e != `object`) return null;
    let t = e.scores;
    if (!Array.isArray(t)) return null;
    let n = [];
    for (let e of t) {
        if (!e || typeof e != `object`) continue;
        let t = e,
            r = Number(t.time_ms ?? t.timeMs);
        if (!Number.isFinite(r) || r < 1) continue;
        let i = typeof t.name == `string` ? t.name : ``;
        n.push({
            name: i,
            timeMs: r
        })
    }
    return n
}
async function lt(_e, _t) {
    return null
}

function ut() {
    return lt(`/leaderboard`)
}

function dt(e, t) {
    return lt(`/score`, {
        method: `POST`,
        headers: {
            "Content-Type": `application/json`
        },
        body: JSON.stringify({
            timeMs: Math.round(e),
            name: t
        })
    })
}
var T = document.querySelector(`#stage`),
    E = document.querySelector(`#timer`),
    D = document.querySelector(`#overlay`),
    ft = document.querySelector(`#brand`),
    pt = document.querySelector(`#challenge`),
    mt = document.querySelector(`#banner`),
    ht = document.querySelector(`#tease`),
    gt = document.querySelector(`#final-score`),
    _t = document.querySelector(`#compare`),
    vt = document.querySelector(`#callout`),
    yt = document.querySelector(`#best`),
    bt = document.querySelector(`#hint`),
    xt = document.querySelector(`#how-to-open`),
    St = document.querySelector(`#how-to`),
    Ct = document.querySelector(`#how-to-title`),
    wt = document.querySelector(`#how-to-list`),
    Tt = document.querySelector(`#how-to-close`),
    Et = document.querySelector(`#world-one`),
    Dt = document.querySelector(`#board-open`),
    Ot = document.querySelector(`#board`),
    kt = document.querySelector(`#board-title`),
    At = document.querySelector(`#board-modal-rows`),
    jt = document.querySelector(`#board-modal-status`),
    Mt = document.querySelector(`#board-close`),
    Nt = document.querySelector(`#board-strip`),
    Pt = document.querySelector(`#board-strip-title`),
    Ft = document.querySelector(`#board-rows`),
    It = document.querySelector(`#board-form`),
    Lt = document.querySelector(`#board-name`),
    Rt = document.querySelector(`#board-submit`),
    zt = document.querySelector(`#board-status`),
    Bt = document.querySelector(`#view-path`),
    Vt = document.querySelector(`#share-score`),
    Ht = document.querySelector(`#share-stage`),
    Ut = document.querySelector(`#share-card-img`),
    Wt = document.querySelector(`#review-bar`),
    Gt = document.querySelector(`#review-score`),
    Kt = document.querySelector(`#review-done`),
    qt = document.querySelector(`#credit`),
    Jt = document.querySelector(`#legend`),
    Yt = document.querySelector(`#score-pop`),
    O = document.querySelector(`#tool-toast`),
    k = document.querySelector(`#level-up`),
    Xt = document.querySelector(`#countdown`),
    Zt = document.querySelector(`#flash`),
    Qt = document.querySelector(`#watermark`),
    A = T.getContext(`2d`),
    j = `idle`,
    M = 0,
    N = 0,
    $t = 1,
    P = [],
    F = [],
    I = [],
    en = null,
    tn = 0,
    L = 0,
    R = 0,
    z = !1,
    B = null,
    V = !1,
    H = 0,
    nn = 0,
    rn = 0,
    an = 0,
    on = 15,
    sn = 0,
    U = 0,
    W = 0,
    cn = 0,
    G = [],
    ln = `lift`,
    un = null,
    dn = 0,
    K = !1,
    q = null,
    fn = 0,
    pn = 0,
    mn = 0,
    J = [],
    hn = 1,
    gn = 0,
    _n = [],
    vn = 0,
    yn = 0,
    bn = 0,
    xn = 0,
    Sn = 0,
    Cn = null,
    wn = ``,
    Tn = 0,
    En = 0,
    Dn = 0;

function On() {
    let e = window.visualViewport;
    return {
        w: Math.max(1, Math.round(e?.width ?? window.innerWidth)),
        h: Math.max(1, Math.round(e?.height ?? window.innerHeight))
    }
}

function kn() {
    let {
        w: e,
        h: t
    } = On();
    $t = Math.min(window.devicePixelRatio || 1, 3), M = e, N = t, T.width = Math.round(e * $t), T.height = Math.round(t * $t), T.style.width = `${e}px`, T.style.height = `${t}px`, A.setTransform($t, 0, 0, $t, 0, 0), ii();
    for (let e of P) e.x = Y(e.x, 15, M - 15), e.y = Y(e.y, 15, N - 15);
    if (z) {
        let e = An(L, R);
        L = e.x, R = e.y
    }
}

function Y(e, t, n) {
    return Math.max(t, Math.min(n, e))
}

function An(e, t) {
    return {
        x: Y(e, 28, M - 28),
        y: Y(t, 28, N - 28)
    }
}

function X(e, t, n, r) {
    return Math.hypot(e - n, t - r)
}

function jn(e) {
    if (e.length <= 2e3) return;
    let t = [];
    for (let n = 0; n < e.length; n += 2) t.push(e[n]);
    e.length = 0, e.push(...t)
}

function Mn(e, t, n) {
    let r = e[e.length - 1];
    r && r.x === t && r.y === n || (e.push({
        x: t,
        y: n
    }), jn(e))
}

function Nn() {
    Mn(G, L, R)
}

function Pn() {
    G = [], un = null, ln = `lift`
}

function Fn() {
    try {
        let e = localStorage.getItem(`dodge-best-ms`) ?? localStorage.getItem(`flex-io-best-ms`),
            t = e ? Number(e) : 0;
        return Number.isFinite(t) ? t : 0
    } catch {
        return 0
    }
}

function In(e) {
    try {
        localStorage.setItem(oe, String(e))
    } catch {}
}

function Ln() {
    return dn <= 0 ? `` : `${y.best} ${$(dn)}`
}

function Rn() {
    let e = b.watermarkWidth;
    Qt.style.width = `${Math.round(e*100)}vw`, Qt.style.opacity = String(j === `review` ? b.watermarkReviewAlpha : b.watermarkAlpha)
}

function zn() {
    document.body.classList.remove(`is-shaking`), Zt.classList.remove(`is-on`, `is-shield`), document.body.offsetWidth, document.body.classList.add(`is-shaking`), Zt.classList.add(`is-on`), mn = performance.now() + 300
}
var Bn = {
    L: [`1000`, `1000`, `1000`, `1000`, `1000`, `1000`, `1111`],
    E: [`1111`, `1000`, `1110`, `1000`, `1000`, `1000`, `1111`],
    V: [`10001`, `10001`, `10001`, `01010`, `01010`, `00100`, `00100`],
    U: [`10001`, `10001`, `10001`, `10001`, `10001`, `10001`, `01110`],
    P: [`11110`, `10001`, `10001`, `11110`, `10000`, `10000`, `10000`],
    1: [`010`, `110`, `010`, `010`, `010`, `010`, `111`],
    2: [`01110`, `10001`, `00001`, `00110`, `01000`, `10000`, `11111`],
    3: [`01110`, `10001`, `00001`, `01110`, `00001`, `10001`, `01110`],
    " ": [`00`, `00`, `00`, `00`, `00`, `00`, `00`]
};

function Vn(e, t, n) {
    let r = 0,
        i = [...t].map(e => Bn[e] ?? Bn.L);
    for (let e of i) r += (e[0]?.length ?? 0) + 1;
    --r;
    let a = r * n + 4,
        o = 7 * n + 4;
    e.width = a, e.height = o;
    let s = e.getContext(`2d`);
    if (!s) return;
    s.clearRect(0, 0, a, o);
    let c = [],
        l = 0;
    for (let e of i) {
        let t = e[0]?.length ?? 0;
        for (let r = 0; r < 7; r++) {
            let i = e[r] ?? ``;
            for (let e = 0; e < t; e++) i[e] === `1` && c.push({
                x: 2 + (l + e) * n,
                y: 2 + r * n
            })
        }
        l += t + 1
    }
    s.fillStyle = `#05040a`;
    for (let e of c) s.fillRect(e.x - 1, e.y - 1, n + 2, n + 2);
    s.fillStyle = `#fff4fa`;
    for (let e of c) s.fillRect(e.x, e.y, n, n)
}

function Hn() {
    Vn(k, y.levelUp, 4), k.style.animationDuration = `${b.levelUpMs}ms`, k.classList.remove(`is-on`), k.offsetWidth, k.classList.add(`is-on`), tn = performance.now() + b.levelUpMs, document.body.classList.remove(`is-level-up`), document.body.offsetWidth, document.body.classList.add(`is-level-up`), window.setTimeout(() => {
        document.body.classList.remove(`is-level-up`)
    }, b.levelUpMs), xe(`levelUp`)
}

function Un() {
    return String(ce[En] ?? 1)
}

function Wn() {
    Vn(Xt, Un(), b.countdownScale), Xt.style.animationDuration = `${le}ms`, Xt.classList.remove(`is-on`), Xt.offsetWidth, Xt.classList.add(`is-on`), xe(`countdown`)
}

function Gn() {
    Xt.classList.remove(`is-on`)
}

function Kn() {
    St.classList.add(`is-hidden`)
}

function qn() {
    j === `idle` && (Ct.textContent = y.howToPlay, Tt.textContent = y.close, St.classList.remove(`is-hidden`))
}

function Jn() {
    Ot.classList.add(`is-hidden`)
}

function Yn(e) {
    return e.name.trim() || y.anon
}

function Xn(e, t) {
    e.replaceChildren(), t.slice(0, 10).forEach((t, n) => {
        let r = document.createElement(`li`),
            i = document.createElement(`span`);
        i.textContent = String(n + 1);
        let a = document.createElement(`span`);
        a.textContent = Yn(t);
        let o = document.createElement(`span`);
        o.textContent = `${$(t.timeMs)}s`, r.append(i, a, o), e.append(r)
    })
}

function Z(e, t, n = !1) {
    e.textContent = t, e.classList.toggle(`is-off`, n)
}
async function Zn(e, t) {
    e.replaceChildren();
    Z(t, y.comingSoon);
    return null
}
async function Qn() {
    Et.textContent = ``
}
async function $n() {
    j === `idle` && (kt.textContent = y.top10, Mt.textContent = y.close, Ot.classList.remove(`is-hidden`), await Zn(At, jt))
}
async function er(_e) {
    Nt.classList.add(`is-hidden`);
    Ft.replaceChildren();
    It.classList.add(`is-hidden`);
    Z(zt, ``)
}
async function tr() {
    Z(zt, y.comingSoon)
}

function nr(e, t) {
    ge(), j = `countdown`;
    let n = An(e, t);
    L = n.x, R = n.y, z = !0, P = [], F = [], I = [], tn = 0, En = 0, Dn = performance.now(), E.textContent = `0.0`, D.classList.add(`is-hidden`), D.classList.remove(`is-start`, `is-over`), Wt.classList.add(`is-hidden`), Jt.classList.add(`is-hidden`), Yt.classList.add(`is-hidden`), O.classList.add(`is-hidden`), k.classList.remove(`is-on`), qt.classList.remove(`is-hidden`), Wn(), Kn(), Jn(), Gt.classList.add(`is-hidden`), document.body.classList.remove(`is-review`), Rn()
}

function rr() {
    Gn(), gr()
}

function ir(e) {
    if (j === `countdown` && !(e - Dn < 1e3)) {
        if (En += 1, En >= ce.length) {
            Gn(), Hr(L, R);
            return
        }
        Dn = e, Wn()
    }
}

function ar(e) {
    let t = Math.floor(e / 1e3);
    t !== pn && (pn = t, se.includes(t) && (Yt.textContent = `${t}`, Yt.classList.remove(`is-hidden`, `is-pop`), Yt.offsetWidth, Yt.classList.add(`is-pop`), E.classList.remove(`is-pop`), E.offsetWidth, E.classList.add(`is-pop`)))
}

function or() {
    let e = Y((wr() - 400) / (pe - 400), 0, 1),
        t = Y((P.length - 1) / 5, 0, 1);
    return Y(e * .55 + t * .45, 0, 1)
}

function sr(e, t, n = `dot`) {
    let r = document.createElement(`span`);
    r.className = `chip`;
    let i = document.createElement(`span`);
    i.className = n === `x` ? `swatch is-x` : `swatch`, n === `dot` && (i.style.background = e, i.style.color = e), r.append(i, document.createTextNode(t)), Jt.append(r)
}

function cr() {
    Jt.replaceChildren(), sr(b.fingerPath, y.thumb), ln === `hit` ? sr(b.hitMark, y.hit, `x`) : sr(`#9aa0bf`, y.lifted)
}

function lr() {
    let e = new URLSearchParams(window.location.search).get(`beat`);
    if (e == null || e === ``) return null;
    let t = Number(e);
    return !Number.isFinite(t) || t < 0 || t > 9999 ? null : Math.round(t * 1e3)
}

function ur(e) {
    let t = new URL(window.location.href);
    return t.search = ``, t.hash = ``, t.searchParams.set(`beat`, $(e)), t.searchParams.set(`from`, ne), t.toString()
}

function dr() {
    return q == null ? `` : `${y.beat} ${$(q)}s`
}

function fr(e) {
    if (q == null) return ``;
    let t = $(e),
        n = $(q);
    return e > q ? y.youBeatIt : e === q ? `${y.tied} ${n}s` : `${y.soClose} — ${t} vs ${n}`
}
async function pr() {
    let e = $(W),
        t = ur(W);
    if (Cn || await hr(W), !Cn) return;
    let n = await tt({
        blob: Cn,
        score: e,
        title: y.title,
        url: t
    });
    n !== `aborted` && n !== `shared` && (Vt.textContent = n === `downloaded` ? y.saved : y.copied, window.setTimeout(() => {
        Vt.textContent = y.share
    }, 1200))
}

function mr() {
    Ht.classList.add(`is-hidden`), Ht.classList.remove(`is-pending`), Ut.removeAttribute(`src`), Cn = null, wn &&= (URL.revokeObjectURL(wn), ``)
}
async function hr(e) {
    let t = ++Tn;
    Ht.classList.remove(`is-hidden`), Ht.classList.add(`is-pending`);
    let n = await Oe(Qt);
    if (t !== Tn || j !== `lost`) return;
    let r = $(e),
        i = Math.max(1, P.length),
        a = await Qe(Ze({
            score: r,
            level: i,
            balls: i,
            isNewBest: K,
            tease: ht.textContent || ae(),
            url: ur(e)
        }, n, {
            playW: M,
            playH: N,
            finger: G,
            hit: ln === `hit` ? un : null,
            lift: ln === `lift` ? G[G.length - 1] ?? null : null
        }));
    t === Tn && j === `lost` && (wn && URL.revokeObjectURL(wn), Cn = a, wn = URL.createObjectURL(a), Ut.src = wn, Ut.alt = `${y.title} ${r}s`, Ht.classList.remove(`is-pending`))
}

function gr() {
    j = `idle`, P = [], F = [], I = [], tn = 0, U = 0, K = !1, E.textContent = `0.0`, ft.textContent = y.title, mt.textContent = ``, ht.textContent = ``, gt.textContent = ``, pt.textContent = dr(), _t.textContent = ``, vt.textContent = ``, yt.textContent = Ln(), bt.textContent = y.holdToStart, bt.classList.remove(`is-hidden`), D.classList.remove(`is-hidden`, `is-over`, `is-best`, `is-won`), D.classList.add(`is-start`), Wt.classList.add(`is-hidden`), Jt.classList.add(`is-hidden`), Yt.classList.add(`is-hidden`), O.classList.add(`is-hidden`), Gn(), Kn(), Jn(), Gt.classList.add(`is-hidden`), document.body.classList.remove(`is-review`), qt.classList.remove(`is-hidden`), Rn(), mr(), Nt.classList.add(`is-hidden`), Qn()
}

function _r(e) {
    j = `lost`, ft.textContent = y.title, mt.textContent = y.gameOver, ht.textContent = ae(), gt.textContent = $(e), pt.textContent = ``, _t.textContent = fr(e), vt.textContent = K ? y.newBest : ``, yt.textContent = K ? `` : Ln(), bt.textContent = y.holdToStart, bt.classList.remove(`is-hidden`), Wt.classList.add(`is-hidden`), Jt.classList.add(`is-hidden`), O.classList.add(`is-hidden`), D.classList.remove(`is-hidden`, `is-start`, `is-over`), D.classList.toggle(`is-best`, K), D.classList.toggle(`is-won`, q != null && e > q), D.offsetWidth, D.classList.add(`is-over`), k.classList.remove(`is-on`), Gn(), Kn(), Jn(), Gt.classList.add(`is-hidden`), document.body.classList.remove(`is-review`), qt.classList.remove(`is-hidden`), Rn(), hr(e), er(e)
}

function vr() {
    j = `review`, H = performance.now() + 1e3, V = !0, D.classList.add(`is-hidden`), D.classList.remove(`is-over`, `is-start`), O.classList.add(`is-hidden`);
    let e = $(W);
    E.textContent = e, Gt.textContent = e, Gt.classList.remove(`is-hidden`), cr(), Jt.classList.remove(`is-hidden`), Wt.classList.remove(`is-hidden`), qt.classList.add(`is-hidden`), document.body.classList.add(`is-review`), Rn()
}

function yr(e, t) {
    let n = Q() + 4,
        r = Q() * 2 + 8,
        i = ["top", "left", "right"];
    let a = edge => {
        if (edge === "top") return {
            x: n + Math.random() * Math.max(1, M - n * 2),
            y: n
        };
        if (edge === "left") return {
            x: n,
            y: n + Math.random() * Math.max(1, N * .72 - n)
        };
        return {
            x: M - n,
            y: n + Math.random() * Math.max(1, N * .72 - n)
        }
    };
    for (let o = 0; o < 64; o++) {
        let s = a(i[Math.floor(Math.random() * i.length)]);
        if (X(s.x, s.y, e, t) < 119) continue;
        let c = !0;
        for (let e of P)
            if (X(s.x, s.y, e.x, e.y) < r) {
                c = !1;
                break
            }
        if (c) return s
    }
    return {
        x: M / 2,
        y: n
    }
}

function br(e) {
    let t = Math.random() * Math.PI * 2;
    return {
        vx: Math.cos(t) * e,
        vy: Math.sin(t) * e
    }
}

function xr(e, t, n) {
    I.push({
        x: e,
        y: t,
        life: 1,
        kind: n
    });
    let r = n === `ball` ? `rgba(255, 168, 240, 0.95)` : n === `spawn` ? `rgba(255, 120, 220, 0.95)` : `rgba(186, 210, 255, 0.92)`,
        i = n === `spawn` ? 16 : 8,
        a = n === `spawn` ? 220 : 140;
    for (let n = 0; n < i; n++) {
        let n = Math.random() * Math.PI * 2,
            i = 40 + Math.random() * a;
        F.push({
            x: e,
            y: t,
            vx: Math.cos(n) * i,
            vy: Math.sin(n) * i,
            life: 1,
            color: r
        })
    }
}

function Sr(e, t, n) {
    let r = n ?? b.spark;
    for (let n = 0; n < b.sparkCount + 8; n++) {
        let n = Math.random() * Math.PI * 2,
            i = 48 + Math.random() * 140;
        F.push({
            x: e,
            y: t,
            vx: Math.cos(n) * i,
            vy: Math.sin(n) * i,
            life: 1,
            color: r
        })
    }
    xr(e, t, `spawn`)
}

function Cr(e, t, n, r = !0) {
    let {
        x: i,
        y: a
    } = yr(e, t);
    let o, s;
    let pad = Q() + 8;
    if (a <= pad) {
        let ang = Math.PI / 2 + (Math.random() - .5) * .9;
        o = Math.cos(ang) * n, s = Math.sin(ang) * n
    } else if (i <= pad) {
        let ang = (Math.random() - .5) * .9;
        o = Math.cos(ang) * n, s = Math.sin(ang) * n
    } else if (i >= M - pad) {
        let ang = Math.PI + (Math.random() - .5) * .9;
        o = Math.cos(ang) * n, s = Math.sin(ang) * n
    } else {
        ({
            vx: o,
            vy: s
        } = br(n))
    }
    return r && Sr(i, a), {
        x: i,
        y: a,
        vx: o,
        vy: s,
        trail: [{
            x: i,
            y: a
        }],
        ignoreCollideUntil: Sn
    }
}

function wr() {
    let e = U / 1e3,
        t = 400 + 15 * e + fe * e * e,
        n = Math.min(pe, t);
    return performance.now() < vn ? n * x.slowFactor : n
}

function Q() {
    return performance.now() < yn ? 15 * x.shrinkScale : 15
}

function Tr(e) {
    return e === `slow` ? y.slowMotion : e === `shrink` ? y.shrink : y.shield
}

function Er() {
    let e = [`slow`, `shrink`, `shield`];
    for (let t = e.length - 1; t > 0; t--) {
        let n = Math.floor(Math.random() * (t + 1)),
            r = e[t];
        e[t] = e[n], e[n] = r
    }
    return e
}

function Dr() {
    let e = Math.random() < x.pairChance ? x.maxPerLevel : 1;
    return Er().slice(0, Y(e, 1, x.maxPerLevel))
}

function Or(e) {
    return e === `slow` ? `rgba(255, 210, 130, 0.95)` : e === `shrink` ? b.pickupMarkGlow : b.shield
}

function kr(e) {
    O.textContent = Tr(e), O.classList.remove(`is-hidden`, `is-pop`), O.offsetWidth, O.classList.add(`is-pop`)
}

function Ar() {
    let e = x.boxSize / 2,
        t = Math.max(e + 12, M * x.edgeInset),
        n = Math.max(e + 72, N * x.edgeInset),
        r = t,
        i = M - t,
        a = n,
        o = N - n,
        s = 24 + x.boxRadius + x.fingerClearance,
        c = Q() + x.boxRadius + x.ballOverlapPad,
        l = x.boxRadius * 2 + x.pairPad,
        u = M / 2,
        d = N * .52,
        f = (e, t) => {
            for (let n of P)
                if (X(e, t, n.x, n.y) < c) return !0;
            return !1
        },
        p = (e, t) => {
            for (let n of J)
                if (X(e, t, n.x, n.y) < l) return !0;
            return !1
        },
        m = (e, t) => {
            let n = 0;
            for (let r of P) {
                n += 1 / (X(e, t, r.x, r.y) + 28);
                let i = r.x + r.vx * .55,
                    a = r.y + r.vy * .55,
                    o = Wr(r.x, r.y, i, a, e, t);
                n += .9 / (X(o.x, o.y, e, t) + 36)
            }
            return n
        },
        ee = (e, t) => {
            let n = Math.hypot(M, N) * .5;
            return (1 - X(e, t, u, d) / n) * x.centerWeight + m(e, t) * x.trafficWeight
        },
        h = [];
    for (let e = 0; e < 80; e++) {
        let e = (Math.random() + Math.random()) / 2,
            t = (Math.random() + Math.random()) / 2,
            n = r + e * Math.max(1, i - r),
            c = a + t * Math.max(1, o - a);
        X(n, c, L, R) < s || f(n, c) || p(n, c) || h.push({
            x: n,
            y: c,
            score: ee(n, c)
        })
    }
    if (h.length > 0) {
        h.sort((e, t) => t.score - e.score);
        let e = h.slice(0, Math.min(8, h.length));
        return e[Math.floor(Math.random() * e.length)]
    }
    let g = u - L,
        _ = d - R,
        v = Math.hypot(g, _);
    if (v < 8) {
        let e = 0,
            t = 0;
        for (let n of P) e += n.x, t += n.y;
        P.length > 0 && (g = e / P.length - L, _ = t / P.length - R, v = Math.hypot(g, _)), v < 8 && (g = 0, _ = 1, v = 1)
    }
    let y = {
        x: Y(L + g / v * s, r, i),
        y: Y(R + _ / v * s, a, o)
    };
    for (let e of J) {
        if (X(y.x, y.y, e.x, e.y) >= l) continue;
        let t = y.x - e.x,
            n = y.y - e.y,
            s = Math.hypot(t, n) || 1;
        y = {
            x: Y(e.x + t / s * l, r, i),
            y: Y(e.y + n / s * l, a, o)
        }
    }
    return y
}

function jr(e, t) {
    if (j !== `playing` || J.length >= x.maxPerLevel) return;
    let {
        x: n,
        y: r
    } = Ar();
    J.push({
        x: n,
        y: r,
        kind: t,
        bornAt: e
    }), Sr(n, r, Or(t))
}

function Mr(e) {
    let t = P.length;
    t < x.minLevel || t <= hn || (hn = t, _n = Dr(), gn = e + x.spawnDelayMs + Math.random() * x.spawnJitterMs)
}

function Nr(e, t) {
    let n = J.indexOf(t);
    if (n < 0) return;
    J.splice(n, 1);
    let {
        x: r,
        y: i,
        kind: a
    } = t;
    if (a === `slow`) vn = e + x.slowMs, kr(a);
    else if (a === `shrink`) yn = e + x.shrinkMs, kr(a);
    else if (a === `shield`) {
        bn = 1;
        let t = P.find(e => $r(e));
        t ? Kr(e, t) : kr(a)
    }
    Sr(r, i, Or(a))
}

function Pr(e) {
    if (Mr(e), gn > 0 && e >= gn) {
        gn = 0;
        for (let t of _n) jr(e, t);
        _n = []
    }
    for (let t = J.length - 1; t >= 0; t--) e - J[t].bornAt >= x.despawnMs && J.splice(t, 1);
    if (!z) return;
    let t = null,
        n = 24 + x.boxRadius;
    for (let e of J) {
        let r = X(e.x, e.y, L, R);
        r < n && (t = e, n = r)
    }
    t && Nr(e, t)
}

function Fr(e, t) {
    let n = x.boxSize / 2,
        r = Math.sin(t / 170 + e.x * .04) * 2.4,
        i = .5 + .5 * Math.sin(t / 220),
        a = e.x,
        o = e.y + r,
        s = 1 - (t - e.bornAt) / x.despawnMs,
        c = s < .14 ? Y(s / .14, 0, 1) : 1;
    A.save(), A.globalAlpha = c, A.fillStyle = `rgba(0, 0, 0, 0.3)`, A.beginPath(), A.ellipse(a, o + n * .95, n * .52, n * .16, 0, 0, Math.PI * 2), A.fill();
    let l = A.createRadialGradient(a, o, n * .15, a, o, n * 1.9);
    l.addColorStop(0, b.pickupGlow), l.addColorStop(.42, b.pickupGlowIndigo), l.addColorStop(1, `rgba(80, 60, 180, 0)`), A.globalAlpha = c * (.72 + i * .28), A.fillStyle = l, A.beginPath(), A.arc(a, o, n * 1.9, 0, Math.PI * 2), A.fill(), A.globalAlpha = c;
    let u = A.createRadialGradient(a - n * .28, o - n * .34, n * .08, a, o, n);
    u.addColorStop(0, `rgba(236, 230, 255, 0.34)`), u.addColorStop(.38, b.pickupGlassHi), u.addColorStop(1, b.pickupGlass), A.fillStyle = u, A.beginPath(), A.arc(a, o, n, 0, Math.PI * 2), A.fill(), A.strokeStyle = b.pickupRimInner, A.lineWidth = 1.3, A.beginPath(), A.arc(a, o, n - 2.4, 0, Math.PI * 2), A.stroke(), A.shadowColor = b.pickupMarkGlow, A.shadowBlur = 7 + i * 7, A.strokeStyle = b.pickupRim, A.lineWidth = 2.1, A.beginPath(), A.arc(a, o, n - .7, 0, Math.PI * 2), A.stroke(), A.shadowBlur = 0, A.fillStyle = `rgba(255, 255, 255, 0.48)`, A.beginPath(), A.ellipse(a - n * .28, o - n * .32, n * .2, n * .13, -.55, 0, Math.PI * 2), A.fill(), A.shadowColor = Or(e.kind), A.shadowBlur = 9 + i * 7, A.strokeStyle = b.pickupMark, A.fillStyle = b.pickupMark, A.lineCap = `round`, A.lineJoin = `round`, Ir(e.kind, a, o, n), A.shadowBlur = 0, A.restore()
}

function Ir(e, t, n, r) {
    if (e === `slow`) {
        Lr(t, n, r);
        return
    }
    if (e === `shrink`) {
        Rr(t, n, r);
        return
    }
    zr(t, n, r)
}

function Lr(e, t, n) {
    let r = t + n * .02,
        i = n * .4;
    A.lineWidth = 1.85, A.beginPath(), A.arc(e, r, i, 0, Math.PI * 2), A.stroke(), A.beginPath(), A.moveTo(e, r), A.lineTo(e, r - i * .62), A.moveTo(e, r), A.lineTo(e + i * .46, r + i * .14), A.stroke(), A.beginPath(), A.moveTo(e, r - i + 1.2), A.lineTo(e, r - i - 2.2), A.stroke()
}

function Rr(e, t, n) {
    let r = t + n * .02;
    A.lineWidth = 1.7, A.beginPath(), A.arc(e, r, n * .42, 0, Math.PI * 2), A.stroke(), A.beginPath(), A.arc(e, r, n * .16, 0, Math.PI * 2), A.fill();
    let i = n * .5,
        a = n * .28;
    A.lineWidth = 1.55, A.beginPath(), A.moveTo(e, r - i), A.lineTo(e, r - a), A.moveTo(e, r + i), A.lineTo(e, r + a), A.moveTo(e - i, r), A.lineTo(e - a, r), A.moveTo(e + i, r), A.lineTo(e + a, r), A.stroke()
}

function zr(e, t, n) {
    let r = t - n * .4,
        i = t + n * .06,
        a = t + n * .5,
        o = n * .36;
    A.lineWidth = 1.8, A.beginPath(), A.moveTo(e, r), A.lineTo(e + o, r + n * .14), A.lineTo(e + o, i), A.quadraticCurveTo(e + o * .55, a - n * .04, e, a), A.quadraticCurveTo(e - o * .55, a - n * .04, e - o, i), A.lineTo(e - o, r + n * .14), A.closePath(), A.stroke(), A.globalAlpha *= .88, A.fill()
}

function Br() {
    return 1 + Math.floor(U / me)
}

function Vr() {
    let e = Br(),
        t = wr(),
        n = !1;
    for (; P.length < e;) P.push(Cr(L, R, t)), n = !0;
    n && Hn()
}

function $(e) {
    return (e / 1e3).toFixed(1)
}

function Hr(e, t) {
    let n = An(e, t);
    L = n.x, R = n.y, z = !0, F = [], I = [], tn = 0, Pn(), P = [Cr(n.x, n.y, 400)], Mn(G, n.x, n.y), sn = performance.now(), U = 0, W = 0, pn = 0, fn = 0, K = !1, J = [], hn = 1, gn = 0, _n = [], vn = 0, yn = 0, bn = 0, xn = 0, Sn = 0, E.textContent = `0.0`, E.classList.remove(`is-pop`), Yt.classList.add(`is-hidden`), O.classList.add(`is-hidden`), Jt.classList.add(`is-hidden`), D.classList.add(`is-hidden`), D.classList.remove(`is-start`, `is-over`), Wt.classList.add(`is-hidden`), k.classList.remove(`is-on`), Gn(), Kn(), Gt.classList.add(`is-hidden`), document.body.classList.remove(`is-review`), qt.classList.remove(`is-hidden`), j = `playing`, Rn()
}

function Ur(e, t) {
    let n = e - L,
        r = t - R,
        i = Math.hypot(n, r) || 1;
    return {
        x: L + n / i * 24,
        y: R + r / i * 24
    }
}

function Wr(e, t, n, r, i, a) {
    let o = n - e,
        s = r - t,
        c = o * o + s * s,
        l = 0;
    return c > 0 && (l = Y(((i - e) * o + (a - t) * s) / c, 0, 1)), {
        x: e + o * l,
        y: t + s * l
    }
}

function Gr(e) {
    let t = e.x - L,
        n = e.y - R,
        r = Math.hypot(t, n) || 1,
        i = t / r,
        a = n / r,
        o = 24 + Q() + x.shieldPush;
    e.x = L + i * o, e.y = R + a * o;
    let s = Math.max(wr() * 1.2, Math.hypot(e.vx, e.vy) * 1.15);
    e.vx = i * s, e.vy = a * s, Jr(e)
}

function Kr(e, t) {
    bn = 0, Sn = e + x.shieldGraceMs, xn = e + x.shieldBreakMs;
    for (let e of P) e.ignoreCollideUntil = Sn;
    Gr(t), Sr(L, R, `rgba(160, 255, 255, 0.95)`), O.textContent = y.shieldBroke, O.classList.remove(`is-hidden`, `is-pop`), O.offsetWidth, O.classList.add(`is-pop`), Zt.classList.remove(`is-on`, `is-shield`), Zt.offsetWidth, Zt.classList.add(`is-shield`, `is-on`), mn = e + 280
}

function qr(e, t = null) {
    j === `playing` && (Nn(), ln = e, un = t, W = U, K = W > dn, K && (dn = W, In(dn)), V = z, E.textContent = $(U), e === `hit` && zn(), xe(`gameOver`), _r(U))
}

function Jr(e) {
    let t = Q();
    e.x < t ? (e.vx < 0 && xr(t, e.y, `wall`), e.x = t, e.vx = Math.abs(e.vx)) : e.x > M - t && (e.vx > 0 && xr(M - t, e.y, `wall`), e.x = M - t, e.vx = -Math.abs(e.vx)), e.y < t ? (e.vy < 0 && xr(e.x, t, `wall`), e.y = t, e.vy = Math.abs(e.vy)) : e.y > N - t && (e.vy > 0 && xr(e.x, N - t, `wall`), e.y = N - t, e.vy = -Math.abs(e.vy))
}

function Yr(e, t) {
    let n = Math.hypot(e.vx, e.vy) || 1;
    e.vx = e.vx / n * t, e.vy = e.vy / n * t
}

function Xr(e, t, n, r) {
    let i = t.x - e.x,
        a = t.y - e.y,
        o = i * i + a * a;
    if (o >= n * n && o > 0) return;
    let s = Math.sqrt(o),
        c, l;
    s < 1e-8 ? (c = 1, l = 0, s = 0) : (c = i / s, l = a / s);
    let u = n - s;
    if (u > 0) {
        let n = u / 2;
        e.x -= c * n, e.y -= l * n, t.x += c * n, t.y += l * n
    }
    let d = (t.vx - e.vx) * c + (t.vy - e.vy) * l;
    d >= 0 || (e.vx += d * c, e.vy += d * l, t.vx -= d * c, t.vy -= d * l, r && xr((e.x + t.x) / 2, (e.y + t.y) / 2, `ball`))
}

function Zr(e) {
    let t = P.length;
    if (t < 2) return;
    let n = Q() * 2;
    for (let e = 0; e < 3; e++)
        for (let r = 0; r < t; r++) {
            let i = P[r];
            for (let a = r + 1; a < t; a++) Xr(i, P[a], n, e === 0)
        }
    for (let t of P) Jr(t), Yr(t, e)
}

function Qr(e, t, n) {
    if (!(ei(t, n, e.x, e.y) || $r(e))) return !1;
    let r = performance.now();
    if (bn > 0) return Kr(r, e), !1;
    if (r < Sn || r < e.ignoreCollideUntil) return Gr(e), !1;
    let i = Wr(t, n, e.x, e.y, L, R);
    return qr(`hit`, Ur(i.x, i.y)), !0
}

function $r(e) {
    return X(e.x, e.y, L, R) < Q() + 24
}

function ei(e, t, n, r) {
    let i = Q() + 24,
        a = Wr(e, t, n, r, L, R);
    return X(a.x, a.y, L, R) < i
}

function ti(e, t) {
    if (ge(), !V && j !== `playing` && j !== `countdown`) {
        if (j === `review`) {
            _r(W), V = !0;
            return
        }
        if (z = !0, j === `lost`) {
            gr(), V = !0;
            return
        }
        nr(e, t)
    }
}

function ni(e, t) {
    if (!z) return;
    let n = An(e, t);
    L = n.x, R = n.y, (j === `playing` || j === `countdown`) && Mn(G, n.x, n.y)
}

function ri() {
    if (z = !1, B = null, V = !1, j === `countdown`) {
        rr();
        return
    }
    j === `playing` && qr(`lift`)
}

function ii() {
    let e = T.getBoundingClientRect();
    nn = e.left, rn = e.top
}

function ai(e) {
    return {
        x: e.clientX - nn,
        y: e.clientY - rn
    }
}

function oi(e) {
    try {
        T.setPointerCapture(e)
    } catch {}
}

function si(e) {
    try {
        T.hasPointerCapture(e) && T.releasePointerCapture(e)
    } catch {}
}

function ci(e) {
    if (!z) return;
    let t = typeof e.getCoalescedEvents == `function` ? e.getCoalescedEvents() : null,
        n = t && t.length > 0 ? t : [e];
    for (let e = 0; e < n.length; e++) {
        let {
            x: t,
            y: r
        } = ai(n[e]);
        ni(t, r)
    }
}

function li(e) {
    return e instanceof Element && !!e.closest(`button, #actions, #review-bar, #how-to-card, #board-card, #board-strip, #start-links, input`)
}

function ui(e, t) {
    for (let n = 0; n < e.length; n++) {
        let r = e[n];
        if (r && r.identifier === t) return r
    }
}

function di(e) {
    if (li(e.target) || (e.preventDefault(), e.pointerType === `touch` && (H = performance.now() + 1e3), B !== null) || e.pointerType === `mouse` && e.button !== 0 || e.pointerType === `mouse` && performance.now() < H) return;
    ii(), B = e.pointerId, oi(e.pointerId);
    let {
        x: t,
        y: n
    } = ai(e);
    ti(t, n)
}

function fi(e) {
    B !== null && e.pointerId === B && (e.preventDefault(), ci(e))
}

function pi(e) {
    B !== null && e.pointerId === B && (e.preventDefault(), e.pointerType === `touch` && (H = performance.now() + 1e3), si(e.pointerId), ri())
}

function mi(e) {
    B !== null && e.pointerId === B && ri()
}

function hi(e) {
    if (li(e.target) || (e.preventDefault(), H = performance.now() + 1e3, B !== null)) return;
    let t = e.changedTouches[0];
    if (!t) return;
    ii(), B = t.identifier;
    let {
        x: n,
        y: r
    } = ai(t);
    ti(n, r)
}

function gi(e) {
    if (B === null) return;
    e.preventDefault(), H = performance.now() + 1e3;
    let t = ui(e.touches, B);
    if (t) {
        let {
            x: e,
            y: n
        } = ai(t);
        ni(e, n);
        return
    }
    for (let t = 0; t < e.changedTouches.length; t++) {
        let n = e.changedTouches[t];
        if (n && n.identifier === B) {
            let {
                x: e,
                y: t
            } = ai(n);
            ni(e, t);
            return
        }
    }
}

function _i(e) {
    if (B !== null) {
        e.preventDefault(), H = performance.now() + 1e3;
        for (let t = 0; t < e.changedTouches.length; t++) {
            let n = e.changedTouches[t];
            if (n && n.identifier === B) {
                ri();
                return
            }
        }
    }
}

function vi() {
    return performance.now() >= H
}

function yi(e) {
    if (li(e.target) || !vi() || e.button !== 0) return;
    e.preventDefault(), ii();
    let {
        x: t,
        y: n
    } = ai(e);
    ti(t, n)
}

function bi(e) {
    if (!vi() || !z) return;
    e.preventDefault();
    let {
        x: t,
        y: n
    } = ai(e);
    ni(t, n)
}

function xi(e) {
    li(e.target) || vi() && (e.button === 0 || e.type !== `mouseup`) && (z || V) && (e.preventDefault(), ri())
}

function Si() {
    A.clearRect(0, 0, M, N);
    let e = performance.now(),
        t = .5 + .5 * Math.sin(e / 920),
        n = j === `playing` ? an : 0,
        r = M * .5,
        i = N * .36,
        a = A.createRadialGradient(r, i, 20, r, i, Math.max(M, N) * .72);
    a.addColorStop(0, `rgba(92, 70, 180, ${.1+t*.06+n*.12})`), a.addColorStop(.45, `rgba(40, 18, 70, ${.06+n*.08})`), a.addColorStop(1, `rgba(5, 4, 10, 0)`), A.fillStyle = a, A.fillRect(0, 0, M, N);
    let o = A.createRadialGradient(M * .18, N * .12, 10, M * .18, N * .12, M * .55);
    o.addColorStop(0, `rgba(255, 70, 190, ${.07+t*.05+n*.08})`), o.addColorStop(1, `rgba(255, 70, 190, 0)`), A.fillStyle = o, A.fillRect(0, 0, M, N);
    let s = A.createRadialGradient(M * .86, N * .78, 8, M * .86, N * .78, M * .5);
    s.addColorStop(0, `rgba(80, 220, 230, ${.06+(1-t)*.05+n*.06})`), s.addColorStop(1, `rgba(80, 220, 230, 0)`), A.fillStyle = s, A.fillRect(0, 0, M, N), e < tn && (A.fillStyle = `rgba(255, 70, 200, ${(1-(1-(tn-e)/b.levelUpMs))*.16})`, A.fillRect(0, 0, M, N));
    let c = A.createRadialGradient(r, N * .46, Math.min(M, N) * .18, r, N * .46, Math.max(M, N) * .72);
    c.addColorStop(0, `rgba(5, 4, 10, 0)`), c.addColorStop(.62, `rgba(5, 4, 10, ${.08+t*.06})`), c.addColorStop(1, `rgba(5, 4, 10, ${.42+t*.1+n*.12})`), A.fillStyle = c, A.fillRect(0, 0, M, N)
}

function Ci() {
    if (en) return en;
    let e = document.createElement(`canvas`);
    e.width = 128, e.height = 128;
    let t = e.getContext(`2d`);
    if (!t) return e;
    let n = t.createImageData(128, 128);
    for (let e = 0; e < n.data.length; e += 4) {
        let t = 160 + Math.random() * 80;
        n.data[e] = t, n.data[e + 1] = t, n.data[e + 2] = t, n.data[e + 3] = 22 + Math.random() * 28
    }
    return t.putImageData(n, 0, 0), en = e, e
}

function wi() {
    let e = Ci();
    A.save(), A.globalAlpha = j === `playing` ? .11 : .06, A.globalCompositeOperation = `overlay`;
    let t = performance.now() / 70 % e.width;
    for (let n = -e.height; n < N + e.height; n += e.height)
        for (let r = -e.width; r < M + e.width; r += e.width) A.drawImage(e, r + t, n);
    A.restore()
}

function Ti() {
    for (let e of I) {
        let t = 1 - e.life,
            n = (e.kind === `spawn` ? 18 : 10) + t * (e.kind === `spawn` ? 70 : 36);
        A.save(), A.globalAlpha = Math.max(0, e.life) * (e.kind === `spawn` ? .7 : .85), A.strokeStyle = e.kind === `ball` ? `rgba(255, 150, 230, 0.95)` : e.kind === `spawn` ? `rgba(255, 90, 210, 0.9)` : `rgba(200, 220, 255, 0.9)`, A.lineWidth = Math.max(1.1, 3.2 * e.life), A.beginPath(), A.arc(e.x, e.y, n, 0, Math.PI * 2), A.stroke(), A.restore()
    }
}

function Ei(e) {
    let t = on,
        n = e.x,
        r = e.y,
        i = t * b.glowScale * (1 + an * .22),
        a = A.createRadialGradient(n, r, t * .1, n, r, i);
    a.addColorStop(0, b.ballGlowCore), a.addColorStop(.16, b.ballGlow), a.addColorStop(.48, b.ballGlowIndigo), a.addColorStop(1, `rgba(70, 50, 150, 0)`), A.fillStyle = a, A.beginPath(), A.arc(n, r, i, 0, Math.PI * 2), A.fill();
    let o = A.createRadialGradient(n - t * .12, r - t * .18, t * .35, n, r, t * 1.14);
    o.addColorStop(0, `rgba(255, 255, 255, 0)`), o.addColorStop(.58, `rgba(255, 255, 255, 0)`), o.addColorStop(.78, b.ballRimPink), o.addColorStop(.9, b.ballRimIndigo), o.addColorStop(1, `rgba(90, 70, 200, 0.08)`), A.fillStyle = o, A.beginPath(), A.arc(n, r, t * 1.14, 0, Math.PI * 2), A.fill();
    let s = A.createRadialGradient(n - t * .32, r - t * .38, t * .05, n, r, t);
    s.addColorStop(0, b.ballCore), s.addColorStop(.2, `#f7f3ff`), s.addColorStop(.58, b.ball), s.addColorStop(1, b.ballShade), A.fillStyle = s, A.beginPath(), A.arc(n, r, t, 0, Math.PI * 2), A.fill(), A.strokeStyle = b.ballRimIndigo, A.lineWidth = 2.1, A.beginPath(), A.arc(n, r, t - .35, 0, Math.PI * 2), A.stroke(), A.strokeStyle = b.ballRimStroke, A.lineWidth = 1.15, A.beginPath(), A.arc(n, r, t - 1.35, 0, Math.PI * 2), A.stroke(), A.fillStyle = `rgba(255, 255, 255, 0.96)`, A.beginPath(), A.ellipse(n - t * .3, r - t * .36, t * .24, t * .14, -.55, 0, Math.PI * 2), A.fill(), A.fillStyle = `rgba(255, 168, 230, 0.32)`, A.beginPath(), A.ellipse(n + t * .22, r + t * .28, t * .2, t * .11, .45, 0, Math.PI * 2), A.fill()
}

function Di() {
    if (!z) return;
    let e = fn,
        t = 24 * (1 + e * 1.55),
        n = A.createRadialGradient(L, R, 2.88, L, R, t * (1.55 + e * .85));
    n.addColorStop(0, `rgba(255, 236, 255, ${.16+e*.42})`), n.addColorStop(.28, `rgba(255, 110, 210, ${.1+e*.38})`), n.addColorStop(.62, `rgba(150, 164, 255, ${.08+e*.18})`), n.addColorStop(1, `rgba(120, 140, 255, 0)`), A.fillStyle = n, A.beginPath(), A.arc(L, R, t * (1.55 + e * .85), 0, Math.PI * 2), A.fill(), e > .08 && (A.strokeStyle = `rgba(255, 210, 120, ${.35+e*.55})`, A.lineWidth = 2 + e * 3.4, A.beginPath(), A.arc(L, R, 30 + e * 10, 0, Math.PI * 2), A.stroke(), A.strokeStyle = `rgba(255, 80, 200, ${.2+e*.45})`, A.lineWidth = 1.2, A.beginPath(), A.arc(L, R, 38 + e * 16, 0, Math.PI * 2), A.stroke()), A.strokeStyle = e > .08 ? `rgba(255, 236, 180, ${.75+e*.25})` : b.fingerRing, A.lineWidth = 1.6 + e * 2.8, A.beginPath(), A.arc(L, R, 24, 0, Math.PI * 2), A.stroke();
    let r = performance.now();
    if (bn > 0) {
        let e = .5 + .5 * Math.sin(r / 140),
            t = 24 * x.shieldScale;
        A.fillStyle = b.shieldFill, A.beginPath(), A.arc(L, R, t, 0, Math.PI * 2), A.fill(), A.strokeStyle = `rgba(94, 225, 232, ${.55+e*.4})`, A.lineWidth = 2.6, A.beginPath(), A.arc(L, R, t, 0, Math.PI * 2), A.stroke(), A.strokeStyle = `rgba(200, 255, 255, ${.28+e*.3})`, A.lineWidth = 1.2, A.beginPath(), A.arc(L, R, t + 4 + e * 2.2, 0, Math.PI * 2), A.stroke()
    } else if (r < xn) {
        let e = 1 - (xn - r) / x.shieldBreakMs;
        A.save(), A.globalAlpha = Math.max(0, 1 - e);
        let t = 24 * x.shieldScale * (1 + e * .85);
        A.strokeStyle = b.shield, A.lineWidth = 3.2 * (1 - e), A.beginPath(), A.arc(L, R, t, 0, Math.PI * 2), A.stroke();
        for (let n = 0; n < 6; n++) {
            let r = n / 6 * Math.PI * 2 + e * 1.4,
                i = t * .72,
                a = t * (1.15 + e * .35);
            A.beginPath(), A.moveTo(L + Math.cos(r) * i, R + Math.sin(r) * i), A.lineTo(L + Math.cos(r) * a, R + Math.sin(r) * a), A.stroke()
        }
        A.restore()
    }
}

function Oi() {
    for (let e of F) A.globalAlpha = Math.max(0, e.life), A.fillStyle = e.color ?? b.spark, A.beginPath(), A.arc(e.x, e.y, 1.7, 0, Math.PI * 2), A.fill();
    A.globalAlpha = 1
}

function ki(e, t, n) {
    if (e.length === 0) return;
    if (e.length === 1) {
        let r = e[0];
        A.fillStyle = t, A.beginPath(), A.arc(r.x, r.y, n + 1, 0, Math.PI * 2), A.fill();
        return
    }
    A.lineJoin = `round`, A.lineCap = `round`, A.strokeStyle = t, A.lineWidth = n, A.globalAlpha = .38, A.beginPath(), A.moveTo(e[0].x, e[0].y);
    for (let t = 1; t < e.length; t++) A.lineTo(e[t].x, e[t].y);
    A.stroke();
    let r = Math.max(1, Math.floor(e.length * .72));
    A.globalAlpha = .95, A.lineWidth = n + .4, A.beginPath(), A.moveTo(e[r - 1].x, e[r - 1].y);
    for (let t = r; t < e.length; t++) A.lineTo(e[t].x, e[t].y);
    A.stroke(), A.globalAlpha = 1;
    let i = e[e.length - 1];
    A.fillStyle = t, A.beginPath(), A.arc(i.x, i.y, n + .8, 0, Math.PI * 2), A.fill()
}

function Ai(e) {
    let {
        x: t,
        y: n
    } = e;
    A.strokeStyle = b.hitMark, A.lineWidth = 3, A.lineCap = `round`, A.beginPath(), A.moveTo(t - 11, n - 11), A.lineTo(t + 11, n + 11), A.moveTo(t + 11, n - 11), A.lineTo(t - 11, n + 11), A.stroke(), A.beginPath(), A.arc(t, n, 18, 0, Math.PI * 2), A.strokeStyle = `rgba(255, 107, 122, 0.45)`, A.lineWidth = 2, A.stroke()
}

function ji(e) {
    let {
        x: t,
        y: n
    } = e;
    A.strokeStyle = `#9aa0bf`, A.lineWidth = 3, A.lineCap = `round`, A.beginPath(), A.arc(t, n, 16, 0, Math.PI * 2), A.stroke(), A.beginPath(), A.moveTo(t, n - 7), A.lineTo(t, n + 7), A.stroke()
}

function Mi(e, t, n, r, i) {
    let a = Math.min(i, n / 2, r / 2);
    A.beginPath(), A.moveTo(e + a, t), A.arcTo(e + n, t, e + n, t + r, a), A.arcTo(e + n, t + r, e, t + r, a), A.arcTo(e, t + r, e, t, a), A.arcTo(e, t, e + n, t, a), A.closePath(), A.stroke()
}

function Ni() {
    let e = M - 16,
        t = N - 16;
    if (e < 24 || t < 24) return;
    let n = j === `playing` ? an : .2,
        r = (.78 + .22 * Math.sin(performance.now() / 640)) * (.45 + n * .55);
    A.save(), A.lineJoin = `round`, A.lineCap = `round`, A.shadowBlur = 8 + n * 4, A.shadowColor = `rgba(255, 80, 210, ${.32+r*.14})`, A.strokeStyle = `rgba(94, 225, 232, ${.55+r*.12})`, A.lineWidth = 1.25, Mi(8, 8, e, t, 22), A.restore()
}

function Pi() {
    if (ki(G, b.fingerPath, 3.1), ln === `hit` && un) Ai(un);
    else if (ln === `lift`) {
        let e = G[G.length - 1];
        e && ji(e)
    }
}

function Fi() {
    an = j === `playing` ? or() : 0, on = Q();
    let e = j === `playing` ? an : j === `review` ? .22 : 0;
    if (document.body.style.setProperty(`--frame-heat`, e.toFixed(3)), Si(), j === `review`) {
        Pi(), wi(), Ni();
        return
    }
    if (j === `countdown`) {
        Di(), wi();
        return
    }
    if (j !== `playing`) {
        wi();
        return
    }
    Di();
    for (let e of P) Ei(e);
    for (let e of J) Fr(e, performance.now());
    Oi(), Ti(), wi(), Ni()
}

function Ii(e) {
    for (let t = F.length - 1; t >= 0; t--) {
        let n = F[t];
        n.x += n.vx * e, n.y += n.vy * e, n.vx *= .9, n.vy *= .9, n.life -= e / b.sparkLife, n.life <= 0 && F.splice(t, 1)
    }
    for (let t = I.length - 1; t >= 0; t--) {
        let n = I[t];
        n.life -= e / .28, n.life <= 0 && I.splice(t, 1)
    }
}

function Li(e) {
    let t = wr();
    for (let n of P) {
        Yr(n, t);
        let r = n.x,
            i = n.y;
        if (n.x += n.vx * e, n.y += n.vy * e, Jr(n), Qr(n, r, i)) return
    }
    if (j === `playing`) {
        Zr(t);
        for (let e of P) {
            if (Qr(e, e.x, e.y)) return;
            let t = X(e.x, e.y, L, R) - (Q() + 24);
            t > 0 && t < 18 && (fn = Math.max(fn, 1 - t / 18))
        }
    }
}

function Ri(e) {
    let t = Math.min(.05, (e - cn) / 1e3);
    cn = e, j === `countdown` && (E.textContent = `0.0`, ir(e)), j === `playing` && (U = e - sn, E.textContent = $(U), ar(U), Vr(), Pr(e), Li(t), j === `playing` && (Nn(), Ii(t), fn = Math.max(0, fn - t * 2.6))), document.body.classList.toggle(`is-playing`, j === `playing`), document.body.classList.toggle(`is-over`, j === `lost`), mn && e > mn && (document.body.classList.remove(`is-shaking`), Zt.classList.remove(`is-on`, `is-shield`), mn = 0), Fi(), requestAnimationFrame(Ri)
}

function zi(e, t) {
    e.addEventListener(`click`, e => {
        e.preventDefault(), e.stopPropagation(), H = performance.now() + 1e3, V = !0, t()
    })
}

function Bi() {
    let e = {
        passive: !1
    };
    typeof PointerEvent == `function` ? (window.addEventListener(`pointerdown`, di, e), window.addEventListener(`pointermove`, fi, e), window.addEventListener(`pointerup`, pi, e), window.addEventListener(`pointercancel`, pi, e), T.addEventListener(`lostpointercapture`, mi)) : (window.addEventListener(`touchstart`, hi, e), window.addEventListener(`touchmove`, gi, e), window.addEventListener(`touchend`, _i, e), window.addEventListener(`touchcancel`, _i, e), window.addEventListener(`mousedown`, yi), window.addEventListener(`mousemove`, bi), window.addEventListener(`mouseup`, xi), window.addEventListener(`mouseleave`, xi)), window.addEventListener(`contextmenu`, e => e.preventDefault()), window.addEventListener(`gesturestart`, e => e.preventDefault()), window.addEventListener(`resize`, kn), window.visualViewport?.addEventListener(`resize`, kn), window.visualViewport?.addEventListener(`scroll`, kn), zi(Bt, () => {
        j === `lost` && vr()
    }), zi(Vt, () => {
        j === `lost` && pr()
    }), zi(Kt, () => {
        j === `review` && _r(W)
    }), zi(xt, () => {
        j === `idle` && qn()
    }), zi(Tt, () => {
        Kn()
    }), zi(Dt, () => {
        j === `idle` && (Kn(), $n())
    }), zi(Mt, () => {
        Jn()
    }), It.addEventListener(`submit`, e => {
        e.preventDefault(), e.stopPropagation(), H = performance.now() + 1e3, V = !0, tr()
    })
}
document.title = y.title, xt.textContent = y.howToPlay, Ct.textContent = y.howToPlay, Tt.textContent = y.close, Dt.textContent = y.top10, kt.textContent = y.top10, Pt.textContent = y.top10, Mt.textContent = y.close, Rt.textContent = y.postScore;
for (let e of te) {
    let t = document.createElement(`li`);
    t.textContent = e, wt.append(t)
}
dn = Fn(), q = lr(), lockNativeChrome(), kn(), gr(), Bi(), cn = performance.now(), requestAnimationFrame(Ri);
