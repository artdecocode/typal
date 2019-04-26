#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');
const path = require('path');             
const t = (a, b, c, d, e) => {
  d = void 0 === d ? !1 : d;
  e = void 0 === e ? !1 : e;
  const f = c ? new RegExp(`^-(${c}|-${b})`) : new RegExp(`^--${b}`);
  b = a.findIndex(g => f.test(g));
  if (-1 == b) {
    return {argv:a};
  }
  if (d) {
    return {value:!0, argv:[...a.slice(0, b), ...a.slice(b + 1)]};
  }
  d = b + 1;
  c = a[d];
  if (!c || "string" == typeof c && c.startsWith("--")) {
    return {argv:a};
  }
  e && (c = parseInt(c, 10));
  return {value:c, argv:[...a.slice(0, b), ...a.slice(d + 1)]};
}, aa = a => {
  const b = [];
  for (let c = 0; c < a.length; c++) {
    const d = a[c];
    if (d.startsWith("-")) {
      break;
    }
    b.push(d);
  }
  return b;
}, ba = () => {
  var a = v;
  return Object.keys(a).reduce((b, c) => {
    const d = a[c];
    if ("string" == typeof d) {
      return b[`-${d}`] = "", b;
    }
    c = d.command ? c : `--${c}`;
    d.short && (c = `${c}, -${d.short}`);
    let e = d.description;
    d.default && (e = `${e}\nDefault: ${d.default}.`);
    b[c] = e;
    return b;
  }, {});
};
const v = {source:{description:"The path to the source file or directory with files to embed types into.", command:!0}, output:{description:"The destination where to save output.\nIf not passed, the file will be overwritten.\nIf `-` is passed, prints to stdout.", short:"o"}, closure:{description:"Whether to generate types in _Closure_ mode.", boolean:!0, short:"c"}, externs:{description:"Whether to generate externs for _GCC_.", boolean:!0, short:"e"}, migrate:{description:"Extracts types from JavaScript source code and saves them\ninto the types.xml file specified in the output option.", 
boolean:!0, short:"m"}, help:{description:"Print the help information and exit.", boolean:!0, short:"h"}, version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, w = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = aa(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce((e, f) => {
    var g = Object.assign({}, e);
    e = e.h;
    g = (delete g.h, g);
    if (0 == e.length && d) {
      return Object.assign({}, {h:e}, g);
    }
    const h = a[f];
    let l;
    if ("string" == typeof h) {
      ({value:l, argv:e} = t(e, f, h));
    } else {
      try {
        const {short:k, boolean:m, number:n, command:p, multiple:q} = h;
        p && q && c.length ? (l = c, d = !0) : p && c.length ? (l = c[0], d = !0) : {value:l, argv:e} = t(e, f, k, m, n);
      } catch (k) {
        return Object.assign({}, {h:e}, g);
      }
    }
    return void 0 === l ? Object.assign({}, {h:e}, g) : Object.assign({}, {h:e}, g, {[f]:l});
  }, {h:b});
}(v), x = w.source, y = w.output, ca = w.closure, da = w.externs, ea = w.migrate, fa = w.help, ha = w.version;
function ia(a = {usage:{}}) {
  const {usage:b = {}, description:c, line:d, example:e} = a;
  a = Object.keys(b);
  const f = Object.values(b), [g] = a.reduce(([k = 0, m = 0], n) => {
    const p = b[n].split("\n").reduce((q, r) => r.length > q ? r.length : q, 0);
    p > m && (m = p);
    n.length > k && (k = n.length);
    return [k, m];
  }, []), h = (k, m) => {
    m = " ".repeat(m - k.length);
    return `${k}${m}`;
  };
  a = a.reduce((k, m, n) => {
    n = f[n].split("\n");
    m = h(m, g);
    const [p, ...q] = n;
    m = `${m}\t${p}`;
    const r = h("", g);
    n = q.map(u => `${r}\t${u}`);
    return [...k, m, ...n];
  }, []).map(k => `\t${k}`);
  const l = [c, `  ${d || ""}`].filter(k => k ? k.trim() : k).join("\n\n");
  a = `${l ? `${l}\n` : ""}
${a.join("\n")}
`;
  return e ? `${a}
  Example:

    ${e}
` : a;
}
;const {createReadStream:ja, createWriteStream:ka, lstat:z, readdir:la} = fs;
var ma = stream;
const {Transform:A, Writable:na} = stream;
const B = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, oa = (a, b = !1) => B(a, 2 + (b ? 1 : 0)), D = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:pa} = os;
const E = /\s+at.*(?:\(|\s)(.*)\)?/, qa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, ra = pa(), F = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(qa.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(E);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(E, (g, h) => g.replace(h, h.replace(ra, "~"))) : f).join("\n");
};
function sa(a, b, c = !1) {
  return function(d) {
    var e = D(arguments), {stack:f} = Error();
    const g = B(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = F(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function G(a) {
  var {stack:b} = Error();
  const c = D(arguments);
  b = oa(b, a);
  return sa(c, b, a);
}
;const ta = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class ua extends na {
  constructor(a) {
    var b = a || {}, c = Object.assign({}, b);
    const d = void 0 === b.binary ? !1 : b.binary, e = void 0 === b.rs ? null : b.rs;
    b = (delete c.binary, delete c.rs, c);
    const {F:f = G(!0), proxyError:g} = a || {}, h = (l, k) => f(k);
    super(b);
    this.a = [];
    this.D = new Promise((l, k) => {
      this.on("finish", () => {
        let m;
        d ? m = Buffer.concat(this.a) : m = this.a.join("");
        l(m);
        this.a = [];
      });
      this.once("error", m => {
        if (-1 == m.stack.indexOf("\n")) {
          h`${m}`;
        } else {
          const n = F(m.stack);
          m.stack = n;
          g && h`${m}`;
        }
        k(m);
      });
      e && ta(this, e).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get b() {
    return this.D;
  }
}
const H = async a => {
  var b = void 0 === b ? {} : b;
  ({b:a} = new ua(Object.assign({}, {rs:a}, b, {F:G(!0)})));
  return await a;
};
async function I(a) {
  a = ja(a);
  return await H(a);
}
;async function J(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = G(!0), d = ka(a);
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
    }).on("close", e).end(b);
  });
}
;function K(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function L(a, b, c) {
  const d = G(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const {length:e} = a;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((f, g) => {
    const h = (k, m) => k ? (k = d(k), g(k)) : f(c || m);
    let l = [h];
    Array.isArray(b) ? (b.forEach((k, m) => {
      K(e, m);
    }), l = [...b, h]) : 1 < Array.from(arguments).length && (K(e, 0), l = [b, h]);
    a(...l);
  });
}
;const {join:M} = path;
async function va(a, b) {
  b = b.map(async c => {
    const d = M(a, c);
    return {lstat:await L(z, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const wa = a => a.lstat.isDirectory(), xa = a => !a.lstat.isDirectory();
async function N(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await L(z, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await L(la, a);
  b = await va(a, b);
  a = b.filter(wa);
  b = b.filter(xa).reduce((c, d) => {
    var e = d.lstat.isDirectory() ? "Directory" : d.lstat.isFile() ? "File" : d.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return Object.assign({}, c, {[d.relativePath]:{type:e}});
  }, {});
  a = await a.reduce(async(c, d) => {
    var {path:e, relativePath:f} = d;
    c = await c;
    d = await N(e);
    return Object.assign({}, c, {[f]:d});
  }, {});
  return {content:Object.assign({}, b, a), type:"Directory"};
}
const O = (a, b) => {
  let c = [], d = [];
  Object.keys(a).forEach(f => {
    const {type:g} = a[f];
    "File" == g ? c.push(M(b, f)) : "Directory" == g && d.push(f);
  });
  const e = d.reduce((f, g) => {
    const {content:h} = a[g];
    g = O(h, M(b, g));
    return [...f, ...g];
  }, []);
  return [...c, ...e];
};
const P = (a, b, c, d) => {
  if (!a) {
    throw Error("The name of the property is not given");
  }
  a = `${d ? `${d}.` : ""}${a}`;
  if (null === b) {
    return a;
  }
  b = Number.isInteger(b) || !0 === b || !1 === b || ["number", "boolean"].includes(c) ? b : `"${b}"`;
  return `${a}=${b}`;
}, ya = ({number:a, I:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", za = a => `/**
${a}
 */
`, Q = a => ` * @suppress {nonStandardJsDocs}
${a}`, R = (a, b) => `${a ? "" : "var "}${a ? `${a}.` : ""}${b}`;
const S = new RegExp(`(${/[A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7B9\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{10300}-\u{1031F}\u{1032D}-\u{10340}\u{10342}-\u{10349}\u{10350}-\u{10375}\u{10380}-\u{1039D}\u{103A0}-\u{103C3}\u{103C8}-\u{103CF}\u{10400}-\u{1049D}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10860}-\u{10876}\u{10880}-\u{1089E}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{10900}-\u{10915}\u{10920}-\u{10939}\u{10980}-\u{109B7}\u{109BE}\u{109BF}\u{10A00}\u{10A10}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A60}-\u{10A7C}\u{10A80}-\u{10A9C}\u{10AC0}-\u{10AC7}\u{10AC9}-\u{10AE4}\u{10B00}-\u{10B35}\u{10B40}-\u{10B55}\u{10B60}-\u{10B72}\u{10B80}-\u{10B91}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10D00}-\u{10D23}\u{10F00}-\u{10F1C}\u{10F27}\u{10F30}-\u{10F45}\u{11003}-\u{11037}\u{11083}-\u{110AF}\u{110D0}-\u{110E8}\u{11103}-\u{11126}\u{11144}\u{11150}-\u{11172}\u{11176}\u{11183}-\u{111B2}\u{111C1}-\u{111C4}\u{111DA}\u{111DC}\u{11200}-\u{11211}\u{11213}-\u{1122B}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A8}\u{112B0}-\u{112DE}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133D}\u{11350}\u{1135D}-\u{11361}\u{11400}-\u{11434}\u{11447}-\u{1144A}\u{11480}-\u{114AF}\u{114C4}\u{114C5}\u{114C7}\u{11580}-\u{115AE}\u{115D8}-\u{115DB}\u{11600}-\u{1162F}\u{11644}\u{11680}-\u{116AA}\u{11700}-\u{1171A}\u{11800}-\u{1182B}\u{118A0}-\u{118DF}\u{118FF}\u{11A00}\u{11A0B}-\u{11A32}\u{11A3A}\u{11A50}\u{11A5C}-\u{11A83}\u{11A86}-\u{11A89}\u{11A9D}\u{11AC0}-\u{11AF8}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C2E}\u{11C40}\u{11C72}-\u{11C8F}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D30}\u{11D46}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D89}\u{11D98}\u{11EE0}-\u{11EF2}\u{12000}-\u{12399}\u{12480}-\u{12543}\u{13000}-\u{1342E}\u{14400}-\u{14646}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16AD0}-\u{16AED}\u{16B00}-\u{16B2F}\u{16B40}-\u{16B43}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16E40}-\u{16E7F}\u{16F00}-\u{16F44}\u{16F50}\u{16F93}-\u{16F9F}\u{16FE0}\u{16FE1}\u{17000}-\u{187F1}\u{18800}-\u{18AF2}\u{1B000}-\u{1B11E}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D6C0}\u{1D6C2}-\u{1D6DA}\u{1D6DC}-\u{1D6FA}\u{1D6FC}-\u{1D714}\u{1D716}-\u{1D734}\u{1D736}-\u{1D74E}\u{1D750}-\u{1D76E}\u{1D770}-\u{1D788}\u{1D78A}-\u{1D7A8}\u{1D7AA}-\u{1D7C2}\u{1D7C4}-\u{1D7CB}\u{1E800}-\u{1E8C4}\u{1E900}-\u{1E943}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2F800}-\u{2FA1D}][\x2D\.0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7B9\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{10300}-\u{1031F}\u{1032D}-\u{10340}\u{10342}-\u{10349}\u{10350}-\u{10375}\u{10380}-\u{1039D}\u{103A0}-\u{103C3}\u{103C8}-\u{103CF}\u{10400}-\u{1049D}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10860}-\u{10876}\u{10880}-\u{1089E}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{10900}-\u{10915}\u{10920}-\u{10939}\u{10980}-\u{109B7}\u{109BE}\u{109BF}\u{10A00}\u{10A10}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A60}-\u{10A7C}\u{10A80}-\u{10A9C}\u{10AC0}-\u{10AC7}\u{10AC9}-\u{10AE4}\u{10B00}-\u{10B35}\u{10B40}-\u{10B55}\u{10B60}-\u{10B72}\u{10B80}-\u{10B91}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10D00}-\u{10D23}\u{10F00}-\u{10F1C}\u{10F27}\u{10F30}-\u{10F45}\u{11003}-\u{11037}\u{11083}-\u{110AF}\u{110D0}-\u{110E8}\u{11103}-\u{11126}\u{11144}\u{11150}-\u{11172}\u{11176}\u{11183}-\u{111B2}\u{111C1}-\u{111C4}\u{111DA}\u{111DC}\u{11200}-\u{11211}\u{11213}-\u{1122B}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A8}\u{112B0}-\u{112DE}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133D}\u{11350}\u{1135D}-\u{11361}\u{11400}-\u{11434}\u{11447}-\u{1144A}\u{11480}-\u{114AF}\u{114C4}\u{114C5}\u{114C7}\u{11580}-\u{115AE}\u{115D8}-\u{115DB}\u{11600}-\u{1162F}\u{11644}\u{11680}-\u{116AA}\u{11700}-\u{1171A}\u{11800}-\u{1182B}\u{118A0}-\u{118DF}\u{118FF}\u{11A00}\u{11A0B}-\u{11A32}\u{11A3A}\u{11A50}\u{11A5C}-\u{11A83}\u{11A86}-\u{11A89}\u{11A9D}\u{11AC0}-\u{11AF8}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C2E}\u{11C40}\u{11C72}-\u{11C8F}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D30}\u{11D46}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D89}\u{11D98}\u{11EE0}-\u{11EF2}\u{12000}-\u{12399}\u{12480}-\u{12543}\u{13000}-\u{1342E}\u{14400}-\u{14646}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16AD0}-\u{16AED}\u{16B00}-\u{16B2F}\u{16B40}-\u{16B43}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16E40}-\u{16E7F}\u{16F00}-\u{16F44}\u{16F50}\u{16F93}-\u{16F9F}\u{16FE0}\u{16FE1}\u{17000}-\u{187F1}\u{18800}-\u{18AF2}\u{1B000}-\u{1B11E}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D6C0}\u{1D6C2}-\u{1D6DA}\u{1D6DC}-\u{1D6FA}\u{1D6FC}-\u{1D714}\u{1D716}-\u{1D734}\u{1D736}-\u{1D74E}\u{1D750}-\u{1D76E}\u{1D770}-\u{1D788}\u{1D78A}-\u{1D7A8}\u{1D7AA}-\u{1D7C2}\u{1D7C4}-\u{1D7CB}\u{1E800}-\u{1E8C4}\u{1E900}-\u{1E943}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2F800}-\u{2FA1D}]*/u.source})(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, 
"u"), Aa = new RegExp(`\\s*((?:${S.source.replace(/\(\[/g, "(?:[")}\\s*)*)`, "u");
const Ba = a => {
  const b = {};
  a.replace(new RegExp(S.source, "gu"), (c, d, e, f) => {
    c = f || e;
    c = void 0 === c ? !0 : c;
    b[d] = "true" == c ? !0 : "false" == c ? !1 : /^\d+$/.test(c) ? parseInt(c, 10) : c;
  });
  return b;
};
const Ca = (a, b) => {
  a = a.exec(b);
  if (!a) {
    return a;
  }
  [, ...a] = a;
  return a;
}, T = (a, b) => {
  a = new RegExp(`<${a}${Aa.source}?(?:${/\s*\/>/.source}|${(new RegExp(`>([\\s\\S]+?)?</${a}>`)).source})`, "gu");
  const c = [];
  for (var d; d = Ca(a, b);) {
    if (!d.length) {
      continue;
    }
    const [e = "", f = ""] = d;
    d = e.replace(/\/$/, "").trim();
    d = {u:Ba(d), content:f};
    c.push(d);
  }
  return c;
};
function Da(a) {
  var b = Ea;
  const c = [];
  a.replace(Fa, (d, ...e) => {
    d = e.slice(0, e.length - 2).reduce((f, g, h) => {
      h = b[h];
      if (!h || void 0 === g) {
        return f;
      }
      f[h] = g;
      return f;
    }, {});
    c.push(d);
  });
  return c;
}
;function Ga(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h, "default":l, closure:k}) {
  if (!c) {
    throw Error("Property does not have a name.");
  }
  a.name = c;
  b && (a.description = b.trim());
  a.type = ya({number:g, I:d, boolean:e, type:h});
  k ? a.c = k : a.c = a.type;
  void 0 !== l && (a.a = !0);
  a.a && (a.default = l);
  if (f || a.a) {
    a.optional = !0;
  }
}
function U(a, b = null, c = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = P(a.name, a.default, a.type, b);
  return `{${c ? a.c : a.type}} ${a.optional ? `[${b}]` : b}${`${a.description ? ` ${a.description}` : ""}${a.a ? ` Default \`${a.default}\`.` : ""}`}`;
}
function Ha(a, b = !1) {
  return ` * @prop ${U(a, null, b)}`;
}
function Ia(a, b, c = "", d = !1) {
  a = U(a, b, d);
  return `${c} * @param ${a}`;
}
class Ja {
  constructor() {
    this.description = this.name = null;
    this.type = "*";
    this.c = null;
    this.a = !1;
    this.default = null;
    this.optional = !1;
  }
}
;function Ka(a, b, {name:c, type:d, desc:e, spread:f, noExpand:g, link:h, closure:l, constructor:k, "extends":m, "interface":n, record:p}, q) {
  if (!c) {
    throw Error("Type does not have a name.");
  }
  a.name = c;
  d && (a.type = d);
  l ? a.c = l : a.c = a.type;
  e && (a.description = e.trim());
  a.C = !!f;
  a.s = !!g;
  h && (a.link = h);
  !0 === k && (a.isConstructor = k);
  !0 === n && (a.a = n);
  !0 === p && (a.b = p);
  m && (a.extends = m);
  b && (a.f = T("prop", b).map(({content:r, u}) => {
    const C = new Ja;
    Ga(C, r, u);
    return C;
  }));
  q && (a.g = q);
}
function La(a) {
  var b = [];
  a.description && b.push(` * ${a.description}`);
  a.extends && b.push(` * @extends {${a.extends}}`);
  b.push(` * @${a.G}`);
  b = `/**
${b.join("\n")}
 */
`;
  b += R(a.g, a.name);
  const c = a.f.map(d => {
    var e = [];
    if (d.description) {
      let f = ` * ${d.description}`;
      d.default && (f += ` Default \`${d.default}\`.`);
      e.push(f);
    }
    e.push(` * @type {${d.optional ? `(${d.c}|undefined)` : d.c}}`);
    e = e.join("\n");
    e = `/**
${e}
 */
`;
    return e += R(`${a.i}.prototype`, d.name);
  });
  return [b, ...c].join("\n");
}
function V(a, b) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return b ? `${a.j}${c}` : c;
}
function Ma(a, b) {
  var c = ` * @typedef {${(b ? a.c : a.type) || "Object"}}${` ${V(a, b)}${a.description ? ` ${a.description}` : ""}`}`;
  a = a.f ? a.f.map(d => Ha(d, b)) : [];
  c = [c, ...a].join("\n");
  b && (c = Q(c));
  return `/**
${c}
 */
`;
}
function W(a, b = !1) {
  const c = a.description ? ` ${a.description}` : "", d = !!a.extends, e = Ma(a, b), f = [];
  if (a.g && b) {
    let g = ` * @typedef {${a.i}} ${a.name}${c}`;
    b && (g = Q(g));
    g = `/**
${g}
 */
`;
    f.push(g);
  }
  d && (a = ` * @typedef {${a.extends} & ${V(a, b)}} ${b ? a.i : a.name}${c}`, b && (a = Q(a)), a = `/**
${a}
 */
`, f.push(a));
  f.push(e);
  return f.join("");
}
function Na(a, b, c, d = "", e = !1, f = !1) {
  const g = a.description ? ` ${a.description}` : "", h = a.C ? X(a.f) : f ? a.i : a.name;
  c = `${d} * @param {${e ? "!" : ""}${h}} ${c ? `[${b}]` : b}${g}`;
  a = a.f && !a.s ? a.f.map(l => Ia(l, b, d, f)) : [];
  return [c, ...a].join("\n");
}
class Oa {
  constructor() {
    this.name = "";
    this.link = this.s = this.C = this.description = this.c = this.type = null;
    this.f = [];
    this.g = null;
    this.b = this.a = this.isConstructor = !1;
    this.extends = null;
  }
  get H() {
    return this.isConstructor || this.a || this.b;
  }
  get G() {
    if (this.isConstructor) {
      return "constructor";
    }
    if (this.a) {
      return "interface";
    }
    if (this.b) {
      return "record";
    }
    throw Error("Unknown prototype type (not constructor or interface).");
  }
  get j() {
    return this.g ? `${this.g}.` : "";
  }
  get i() {
    return `${this.j}${this.name}`;
  }
}
const X = (a = [], b = !1) => `{ ${a.map(c => {
  const d = b ? c.c : c.type;
  let e = c.name, f = d;
  c.optional && !b ? e = `${c.name}?` : c.optional && b && (f = `(${d}|undefined)`);
  return `${e}: ${f}`;
}).join(", ")} }`;
function Pa(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const Y = (a, b) => {
  if (!(b instanceof Error)) {
    throw b;
  }
  [, , a] = a.stack.split("\n", 3);
  a = b.stack.indexOf(a);
  if (-1 == a) {
    throw b;
  }
  a = b.stack.substr(0, a - 1);
  const c = a.lastIndexOf("\n");
  b.stack = a.substr(0, c);
  throw b;
};
async function Qa(a, b) {
  b instanceof ma ? b.pipe(a) : a.end(b);
  return await H(a);
}
class Z extends A {
  constructor(a, b) {
    super(b);
    this.j = (Array.isArray(a) ? a : [a]).filter(Pa);
    this.a = !1;
    this.s = b;
  }
  async replace(a, b) {
    const c = new Z(this.j, this.s);
    b && Object.assign(c, b);
    a = await Qa(c, a);
    c.a && this.brake();
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  brake() {
    this.a = !0;
  }
  async reduce(a) {
    return await this.j.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.a) {
        return b;
      }
      if ("string" == typeof d) {
        b = b.replace(c, d);
      } else {
        const e = [];
        let f;
        const g = b.replace(c, (h, ...l) => {
          f = Error();
          try {
            if (this.a) {
              return e.length ? e.push(Promise.resolve(h)) : h;
            }
            const k = d.call(this, h, ...l);
            k instanceof Promise && e.push(k);
            return k;
          } catch (k) {
            Y(f, k);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            Y(f, h);
          }
        } else {
          b = g;
        }
      }
      return b;
    }, `${a}`);
  }
  async _transform(a, b, c) {
    try {
      const d = await this.reduce(a);
      this.push(d);
      c();
    } catch (d) {
      a = F(d.stack), d.stack = a, c(d);
    }
  }
}
;function Ra() {
  var a = Sa;
  let b = "";
  const c = new A({transform(d, e, f) {
    let g;
    for (b += d.toString(); (d = a.exec(b)) && (c.push(d), g = d, a.global);) {
    }
    g && (b = b.slice(g.index + g[0].length));
    f();
  }, objectMode:!0});
  return c;
}
;function Ta(a, b) {
  b = b.reduce((c, d) => Object.assign({}, c, {[d.i]:d}), {});
  a.v = Object.assign({}, a.v, b);
}
class Ua extends Z {
  constructor(a, b) {
    b = void 0 === b ? {} : b;
    super(a);
    this.v = {};
    this.on("types", c => {
      Ta(this, c);
    });
    this.on("namespace", c => {
      this.b.includes(c) || this.b.push(c);
    });
    this.B = b;
    this.b = [];
    this.m = console.log;
  }
  get types() {
    return this.v;
  }
}
;function Va(a, {name:b, from:c, link:d, ns:e}) {
  a.name = b;
  a.a = c;
  a.link = d;
  a.b = e || a.a;
}
function Wa(a, b = !0) {
  return ` * @typedef {import('${a.a}').${a.name}} ${b ? `${a.b}.${a.name}` : a.name}`;
}
class Xa {
  constructor() {
    this.a = this.name = this.b = "";
    this.link = null;
  }
}
;const Ya = a => {
  a = T("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:b, u:{namespace:c, ns:d = c}}] = a, e = void 0 == d ? void 0 : d;
  a = T("type", b).map(({content:g, u:h}) => {
    const l = new Oa;
    Ka(l, g, h, e);
    return l;
  });
  const f = T("import", b).map(({u:g}) => {
    const h = new Xa;
    Va(h, g);
    return h;
  });
  return {g:d, types:a, imports:f};
};
const Za = (a, b) => {
  b = b.map(c => W(c, !0));
  a = a.map(c => `/**
${Q(Wa(c))}
 */
`);
  return [...b, ...a].join("");
}, $a = (a, b, c) => {
  a = [...a.map(d => {
    {
      let e;
      d.c ? e = ` * @typedef {${d.c}}` : d.H || (e = ` * @typedef {${X(d.f, !0)}}`);
      e ? (d.description && (e = ` * ${d.description}\n${e}`), e = `/**
${e}
 */
`, d = e += R(d.g, d.name)) : d = La(d);
    }
    return d;
  })].join("\n");
  return `${b && !c.includes(b) ? `/** @const */
var ${b} = {}
` : ""}${a}`;
};
const bb = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, c) {
  const {o:d, w:e} = this.B;
  try {
    this.m("Detected type marker: %s", c);
    const f = await I(c), {g = null, types:h, imports:l} = Ya(f);
    this.emit("types", h);
    let k;
    d ? k = Za(l, h) : e ? (k = $a(h, g, this.b) + "\n", g && this.emit("namespace", g)) : k = ab(l, h);
    return `/* ${b} ${c} */\n${k}`;
  } catch (f) {
    return this.m("(%s) Could not process typedef-js: %s", c, f.message), a;
  }
}}, ab = (a, b) => {
  b = b.map(c => W(c));
  a = a.map(c => Wa(c, !1)).map(za).join("");
  b = b.join("");
  return `${a}${b}`.replace(cb, " * @typedef");
}, cb = / \*\/\n\/\*\*\n \* @typedef/g;
const db = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?.*)*)/gm, replacement(a, b, c, d, e) {
  const {o:f} = this.B, g = /^!/.test(c), h = g ? c.replace(/^!/, "") : c;
  c = Object.values(this.types).find(({name:l, i:k}) => f ? k == h : l == h);
  return c ? Na(c, e, d, b, g, f) : (this.m("Type %s not found", h), a);
}};
var fb = async() => {
  const {o:a = !1, w:b = !1, A:c} = {o:ca, w:da, A:y};
  var d = await L(z, x);
  let e;
  d.isFile() ? e = [x] : d.isDirectory() && (d = await N(x), e = O(d.content, x));
  await eb(e, a, b, c);
};
const eb = async(a, b = !1, c = !1, d = null) => {
  await Promise.all(a.map(async e => {
    var f = await I(e);
    const g = new Ua([bb, db], {o:b, w:c});
    g.m = console.error;
    g.end(f);
    f = await H(g);
    "-" == d ? console.log(f) : d ? await J(d, f) : await J(e, f);
  }));
};
const gb = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, Fa = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, Ea = "type opt name quote defaultValue description Default".split(" "), Sa = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), hb = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class ib extends A {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform(a, b, c) {
    var {type:d, name:e, description:f, f:g} = a;
    a = d && d.startsWith("import") ? jb(d, e) : hb(d, e, f, g);
    this.push(a);
    g.forEach(h => {
      var {type:l, name:k, default:m, description:n, optional:p} = h;
      {
        h = ["string", "number", "boolean"].includes(l) ? ` ${l}` : ` type="${l}"`;
        var q = void 0 !== m;
        const r = q ? ` default="${m}"` : "";
        q = p && !q ? " opt" : "";
        const u = " ".repeat(4), C = " ".repeat(6);
        h = `${u}<prop${q}${h} name="${k}"${r}${n ? `>\n${C}${n}\n${u}</prop>` : "/>"}\n`;
      }
      this.push(h);
    });
    g.length && this.push("  </type>\n");
    c();
  }
}
const jb = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class kb extends A {
  constructor() {
    super({objectMode:!0});
  }
  _transform(a, b, c) {
    var [, d, e, f, g] = a;
    a = Da(g).map(h => {
      var l = Object.assign({}, h), k = h.defaultValue;
      const m = h.Default;
      var n = h.opt;
      const p = h.name;
      h = h.type;
      l = (delete l.defaultValue, delete l.Default, delete l.opt, delete l.name, delete l.type, l);
      n = Object.assign({}, l, {name:p, type:h}, k ? {defaultValue:gb(k)} : {}, m ? {l:gb(m)} : {}, n ? {optional:!0} : {});
      if (k || m) {
        k ? k !== m && void 0 !== n.l && (k = P(p, m, h), console.error("%s[%s] does not match Default `%s`.", e, k, n.l)) : (k = P(p, m, h), console.error("%s[%s] got from Default.", e, k)), n.default = "defaultValue" in n ? n.defaultValue : n.l, delete n.defaultValue, delete n.l;
      }
      return n;
    });
    this.push({type:d, name:e, description:f, f:a});
    c();
  }
}
async function lb(a) {
  const b = Ra(), c = new kb, d = new ib;
  b.pipe(c).pipe(d);
  b.end(a);
  b.on("error", e => {
    console.error("Error in Transform");
    d.emit("error", e);
  });
  c.on("error", e => {
    console.error("Error in RegexTransform");
    d.emit("error", e);
  });
  d.on("error", e => {
    console.error("Error in XML");
    d.emit("error", e);
  });
  return `<types>
  ${(await H(d)).trim()}
</types>`;
}
;var mb = async() => {
  const {A:a} = {A:y};
  var b = await I(x);
  b = await lb(b);
  a ? await J(a, b) : console.log(b);
};
if (fa) {
  const a = ba();
  console.log(ia({usage:a, description:"Embeds and maintains Closure-compatible types JSDoc in\nJavaScript source code from an external types.xml file.", line:"typal source [--closure|externs] [--migrate] [-o output] [-hv]", example:"typal src/index.js -c"}));
  process.exit();
} else {
  ha && (console.log(require("../../package.json").version), process.exit());
}
(async() => {
  try {
    return ea ? await mb() : await fb();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map