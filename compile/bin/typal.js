#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');
const path = require('path');             
var aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
}, ba = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function da(a, b) {
  if (b) {
    var c = ba;
    a = a.split(".");
    for (var d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && aa(c, a, {configurable:!0, writable:!0, value:b});
  }
}
da("String.prototype.trimRight", function(a) {
  function b() {
    return this.replace(/[\s\xa0]+$/, "");
  }
  return a || b;
});
const u = (a, b, c, d, e) => {
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
}, ea = a => {
  const b = [];
  for (let c = 0; c < a.length; c++) {
    const d = a[c];
    if (d.startsWith("-")) {
      break;
    }
    b.push(d);
  }
  return b;
}, fa = () => {
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
const v = {source:{description:"The path to the source file or directory with files to embed types into. Can specify multiple values, e.g., `typal types/index.js types/vendor.js`.", command:!0, multiple:!0}, output:{description:"The destination where to save output.\nIf not passed, the file will be overwritten.\nIf `-` is passed, prints to stdout.", short:"o"}, closure:{description:"Whether to generate types in _Closure_ mode.", boolean:!0, short:"c"}, externs:{description:"Whether to generate externs for _GCC_.", 
boolean:!0, short:"e"}, types:{description:"Comma-separated location of files to read types from.", short:"t"}, migrate:{description:"Extracts types from JavaScript source code and saves them\ninto the types.xml file specified in the output option.", boolean:!0, short:"m"}, help:{description:"Print the help information and exit.", boolean:!0, short:"h"}, version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, y = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = ea(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce((e, f) => {
    var g = Object.assign({}, e);
    e = e.m;
    g = (delete g.m, g);
    if (0 == e.length && d) {
      return Object.assign({}, {m:e}, g);
    }
    const h = a[f];
    let k;
    if ("string" == typeof h) {
      ({value:k, argv:e} = u(e, f, h));
    } else {
      try {
        const {short:l, boolean:m, number:n, command:p, multiple:q} = h;
        p && q && c.length ? (k = c, d = !0) : p && c.length ? (k = c[0], d = !0) : {value:k, argv:e} = u(e, f, l, m, n);
      } catch (l) {
        return Object.assign({}, {m:e}, g);
      }
    }
    return void 0 === k ? Object.assign({}, {m:e}, g) : Object.assign({}, {m:e}, g, {[f]:k});
  }, {m:b});
}(v), z = y.source, A = y.output, ha = y.closure, ia = y.externs, ja = y.types, ka = y.migrate, la = y.help, ma = y.version;
function na(a = {usage:{}}) {
  const {usage:b = {}, description:c, line:d, example:e} = a;
  a = Object.keys(b);
  const f = Object.values(b), [g] = a.reduce(([l = 0, m = 0], n) => {
    const p = b[n].split("\n").reduce((q, r) => r.length > q ? r.length : q, 0);
    p > m && (m = p);
    n.length > l && (l = n.length);
    return [l, m];
  }, []), h = (l, m) => {
    m = " ".repeat(m - l.length);
    return `${l}${m}`;
  };
  a = a.reduce((l, m, n) => {
    n = f[n].split("\n");
    m = h(m, g);
    const [p, ...q] = n;
    m = `${m}\t${p}`;
    const r = h("", g);
    n = q.map(t => `${r}\t${t}`);
    return [...l, m, ...n];
  }, []).map(l => `\t${l}`);
  const k = [c, `  ${d || ""}`].filter(l => l ? l.trim() : l).join("\n\n");
  a = `${k ? `${k}\n` : ""}
${a.join("\n")}
`;
  return e ? `${a}
  Example:

    ${e}
` : a;
}
;const {createReadStream:oa, createWriteStream:pa, lstat:B, readdir:qa} = fs;
var ra = stream;
const {Transform:C, Writable:sa} = stream;
const D = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, ta = (a, b = !1) => D(a, 2 + (b ? 1 : 0)), E = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:ua} = os;
const F = /\s+at.*(?:\(|\s)(.*)\)?/, va = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, wa = ua(), G = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(va.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(F);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(F, (g, h) => g.replace(h, h.replace(wa, "~"))) : f).join("\n");
};
function xa(a, b, c = !1) {
  return function(d) {
    var e = E(arguments), {stack:f} = Error();
    const g = D(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = G(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function H(a) {
  var {stack:b} = Error();
  const c = E(arguments);
  b = ta(b, a);
  return xa(c, b, a);
}
;const ya = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class za extends sa {
  constructor(a) {
    var b = a || {}, c = Object.assign({}, b);
    const d = void 0 === b.binary ? !1 : b.binary, e = void 0 === b.rs ? null : b.rs;
    b = (delete c.binary, delete c.rs, c);
    const {M:f = H(!0), proxyError:g} = a || {}, h = (k, l) => f(l);
    super(b);
    this.b = [];
    this.K = new Promise((k, l) => {
      this.on("finish", () => {
        let m;
        d ? m = Buffer.concat(this.b) : m = this.b.join("");
        k(m);
        this.b = [];
      });
      this.once("error", m => {
        if (-1 == m.stack.indexOf("\n")) {
          h`${m}`;
        } else {
          const n = G(m.stack);
          m.stack = n;
          g && h`${m}`;
        }
        l(m);
      });
      e && ya(this, e).pipe(this);
    });
  }
  _write(a, b, c) {
    this.b.push(a);
    c();
  }
  get i() {
    return this.K;
  }
}
const I = async a => {
  var b = void 0 === b ? {} : b;
  ({i:a} = new za(Object.assign({}, {rs:a}, b, {M:H(!0)})));
  return await a;
};
async function J(a) {
  a = oa(a);
  return await I(a);
}
;async function K(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = H(!0), d = pa(a);
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
    }).on("close", e).end(b);
  });
}
;function L(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function M(a, b, c) {
  const d = H(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const {length:e} = a;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((f, g) => {
    const h = (l, m) => l ? (l = d(l), g(l)) : f(c || m);
    let k = [h];
    Array.isArray(b) ? (b.forEach((l, m) => {
      L(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (L(e, 0), k = [b, h]);
    a(...k);
  });
}
;const {join:N} = path;
async function Aa(a, b) {
  b = b.map(async c => {
    const d = N(a, c);
    return {lstat:await M(B, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Ba = a => a.lstat.isDirectory(), Ca = a => !a.lstat.isDirectory();
async function O(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await M(B, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await M(qa, a);
  b = await Aa(a, b);
  a = b.filter(Ba);
  b = b.filter(Ca).reduce((c, d) => {
    var e = d.lstat.isDirectory() ? "Directory" : d.lstat.isFile() ? "File" : d.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return Object.assign({}, c, {[d.relativePath]:{type:e}});
  }, {});
  a = await a.reduce(async(c, d) => {
    var {path:e, relativePath:f} = d;
    c = await c;
    d = await O(e);
    return Object.assign({}, c, {[f]:d});
  }, {});
  return {content:Object.assign({}, b, a), type:"Directory"};
}
const P = (a, b) => {
  let c = [], d = [];
  Object.keys(a).forEach(f => {
    const {type:g} = a[f];
    "File" == g ? c.push(N(b, f)) : "Directory" == g && d.push(f);
  });
  const e = d.reduce((f, g) => {
    const {content:h} = a[g];
    g = P(h, N(b, g));
    return [...f, ...g];
  }, []);
  return [...c, ...e];
};
const Q = (a, b, c, d) => {
  if (!a) {
    throw Error("The name of the property is not given");
  }
  a = `${d ? `${d}.` : ""}${a}`;
  if (null === b) {
    return a;
  }
  b = Number.isInteger(b) || !0 === b || !1 === b || ["number", "boolean"].includes(c) ? b : `"${b}"`;
  return `${a}=${b}`;
}, Da = ({number:a, P:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", R = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, Ea = a => `/**
${a}
 */
`, S = a => ` * @suppress {nonStandardJsDocs}
${a}`, T = (a, b, c) => {
  a = `${a ? "" : "var "}${a ? `${a}.` : ""}${b}`;
  c && (a += ` = ${c}`);
  return a;
}, U = a => {
  a = a.trimRight();
  var b = /\S/.exec(a);
  if (!b) {
    return a;
  }
  b = b.index;
  if (0 == b) {
    return a;
  }
  var c = a.substr(0, b).lastIndexOf("\n");
  -1 == c ? c = 0 : (c++, a = a.substr(c));
  b -= c;
  const d = " ".repeat(b);
  c = a.split("\n");
  if (c.filter(e => /\S/.test(e)).find(e => !e.startsWith(d))) {
    return a.trim();
  }
  {
    const e = new RegExp(`^ {${b}}`);
    return c.map(f => f.replace(e, "")).join("\n");
  }
};
function V(a, b, c) {
  const d = [];
  b.replace(a, (e, ...f) => {
    e = f.slice(0, f.length - 2).reduce((g, h, k) => {
      k = c[k];
      if (!k || void 0 === h) {
        return g;
      }
      g[k] = h;
      return g;
    }, {});
    d.push(e);
  });
  return d;
}
;const W = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), Fa = new RegExp(`\\s*((?:${W.source}\\s*)*)`);
const X = (a, b) => V(new RegExp(`<${a}${Fa.source}?(?:${/\s*\/>/.source}|${(new RegExp(`>([\\s\\S]+?)?</${a}>`)).source})`, "g"), b, ["a", "v", "v1", "v2", "c"]).map(({a:c = "", c:d = ""}) => {
  c = c.replace(/\/$/, "").trim();
  c = Ga(c);
  return {content:d, B:c};
}), Ga = a => V(W, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (!d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
const Ha = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
  switch(b) {
    case "function":
      return "function";
    case "Function":
      return "Function";
    case "!":
      return "nonNullable";
    case "?":
      return "nullable";
    case "=":
      return "=";
    case "*":
      return "any";
  }
  return b;
});
function Ia(a) {
  let b = 0;
  const c = (d, e) => {
    d = void 0 === d ? !0 : d;
    e = void 0 === e ? [] : e;
    var f = {}, g = a[b];
    if (["nullable", "nonNullable"].includes(g)) {
      if (!d) {
        throw Error(`${g} not allowed after .`);
      }
      f.nullable = "nullable" === g;
      b++;
    }
    g = a[b];
    if ("(" == g) {
      b++;
      f = Object.assign({}, c(!0, []), f);
      if (")" != a[b]) {
        throw Error("Expecting closing )");
      }
      b++;
      return f;
    }
    if ("{" == g) {
      b++;
      e = f;
      for (d = {}; "}" != a[b];) {
        var h = a[b];
        b++;
        d[h] = null;
        ":" == a[b] && (b++, g = c(), d[h] = g);
        if ("}" == a[b]) {
          b++;
          break;
        }
        if ("," != a[b]) {
          throw Error("Expecting , for record");
        }
        b++;
      }
      e.record = d;
      return f;
    }
    if (["nonNullable", "nullable"].includes(g)) {
      throw Error("Nullability already defined.");
    }
    if (/[=),:.<>}|]/.test(g)) {
      throw Error(`Unexpected token ${g}.`);
    }
    f.name = a[b];
    b++;
    if (["function", "Function"].includes(g)) {
      h = f;
      g = {return:null, args:[]};
      if ("(" != a[b]) {
        throw Error("Expecting opening (");
      }
      b++;
      for (var k; ")" != a[b];) {
        if (k && "this" == a[b]) {
          throw Error("this must come first in function arguments");
        }
        if (k && "new" == a[b]) {
          throw Error("new must come first in function arguments");
        }
        if ("this" == a[b]) {
          b++;
          if (":" != a[b]) {
            throw Error("Expecting :");
          }
          b++;
          g.this = c();
        } else {
          if ("new" == a[b]) {
            b++;
            if (":" != a[b]) {
              throw Error("Expecting :");
            }
            b++;
            g.new = c();
          } else {
            if ("." == a[b] && "." == a[b + 1] && "." == a[b + 2]) {
              b++;
              b++;
              b++;
              k = c();
              if (")" != a[b]) {
                throw Error("Variable args must come last");
              }
              g.variableArgs = k;
            } else {
              k = c(), g.args.push(k), "=" == a[b] && (k.optional = !0, b++);
            }
          }
        }
        k = !0;
        if (")" == a[b]) {
          break;
        }
        if ("," == a[b]) {
          b++;
        } else {
          throw Error("Expecting , between arguments");
        }
      }
      b++;
      ":" == a[b] && (b++, k = c(), void 0 == k.name && k.nullable && (k.name = ""), g.return = k);
      h.function = g;
    } else {
      if ("<" == a[b] || (h = "." == a[b] && "<" == a[b + 1])) {
        b++;
        h && b++;
        h = f;
        for (g = []; ">" != a[b];) {
          k = c();
          g.push(k);
          if (">" == a[b]) {
            break;
          }
          if ("," == a[b]) {
            b++;
          } else {
            throw Error("Expecting , between applications");
          }
        }
        b++;
        h.application = g;
      }
    }
    for (; "." == a[b];) {
      f.name += ".";
      b++;
      ({name:h} = c(!1));
      if (!h) {
        throw Error("Expected to see the name after .");
      }
      f.name += h;
    }
    if ("|" != a[b] || !d) {
      return f;
    }
    for (e.push(f); "|" == a[b];) {
      b++, f = c(!0, e), f.union !== e && e.push(f);
    }
    return {union:e};
  };
  return c();
}
;function Ja(a) {
  a = Ha(a);
  return Ia(a);
}
;function Ka(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h, "default":k, closure:l}) {
  if (!c) {
    throw Error("Property does not have a name.");
  }
  a.name = c;
  b && (a.description = U(b));
  a.type = Da({number:g, P:d, boolean:e, type:h});
  l ? a.f = l : a.f = a.type;
  void 0 !== k && (a.b = !0);
  a.b && (a.default = k);
  if (f || a.b) {
    a.optional = !0;
  }
}
function La(a, b = null, c = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = Q(a.name, a.default, a.type, b);
  return `{${c ? a.f : a.type}} ${a.optional ? `[${b}]` : b}${`${a.description ? ` ${a.description}` : ""}${a.b ? ` Default \`${a.default}\`.` : ""}`}`;
}
function Ma(a, b = !1) {
  return ` * @prop ${La(a, null, b)}`;
}
class Na {
  constructor() {
    this.description = this.name = null;
    this.type = "*";
    this.f = "";
    this.b = !1;
    this.default = null;
    this.optional = !1;
  }
  H(a, b = "", c = !1) {
    a = La(this, a, c);
    return `${b} * @param ${a}`;
  }
}
;function Oa(a, b, {name:c, type:d, desc:e, noToc:f, spread:g, noExpand:h, "import":k, link:l, closure:m, constructor:n, "extends":p, "interface":q, record:r}, t) {
  if (!c) {
    throw Error("Type does not have a name.");
  }
  a.name = c;
  d && (a.type = d);
  m ? a.f = m : a.f = a.type;
  e && (a.description = U(e));
  a.J = !!f;
  a.I = !!g;
  a.A = !!h;
  a.import = !!k;
  l && (a.link = l);
  !0 === n && (a.isConstructor = n);
  !0 === q && (a.o = q);
  !0 === r && (a.s = r);
  p && (a.extends = p);
  b && (a.h = X("prop", b).map(({content:w, B:x}) => {
    const ca = new Na;
    Ka(ca, w, x);
    return ca;
  }));
  t && (a.l = t);
}
function Pa(a) {
  var b = [];
  a.description && b.push(` * ${a.description}`);
  a.extends && b.push(` * @extends {${a.extends}}`);
  b.push(` * @${a.N}`);
  b = `/**
${b.join("\n")}
 */
`;
  b += T(a.l, a.name, void 0);
  const c = a.h.map(d => {
    var e = [];
    if (d.description) {
      let f = ` * ${d.description}`;
      d.default && (f += ` Default \`${d.default}\`.`);
      e.push(f);
    }
    e.push(` * @type {${d.optional ? R(d.f) : d.f}}`);
    e = e.join("\n");
    e = `/**
${e}
 */
`;
    return e += T(`${a.g}.prototype`, d.name);
  });
  return [b, ...c].join("\n");
}
function Qa(a, b) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return b ? `${a.u}${c}` : c;
}
function Ra(a, b, c) {
  var d = ` * @typedef {${(b ? a.f : a.type) || "Object"}}${` ${Qa(a, b)}${a.i}`}`;
  a = a.h ? a.h.map(e => Ma(e, b)) : [];
  d = [d, ...a].join("\n");
  b && !c && (d = S(d));
  return `/**
${d}
 */
`;
}
function Sa(a, b = !1, c = !1) {
  const d = !!a.extends, e = Ra(a, b, c), f = [];
  if (a.l && b) {
    let g = ` * @typedef {${a.g}} ${a.name}${a.i}`;
    b && !c && (g = S(g));
    g = `/**
${g}
 */
`;
    f.push(g);
  }
  d && (a = ` * @typedef {${a.extends} & ${Qa(a, b)}} ${b ? a.g : a.name}${a.i}`, b && !c && (a = S(a)), a = `/**
${a}
 */
`, f.push(a));
  f.push(e);
  return f.join("");
}
class Y {
  constructor() {
    this.name = "";
    this.link = this.A = this.import = this.I = this.J = this.description = this.f = this.type = null;
    this.h = [];
    this.l = null;
    this.s = this.o = this.isConstructor = !1;
    this.extends = null;
  }
  get O() {
    return this.isConstructor || this.o || this.s;
  }
  get i() {
    return `${this.b ? ` \`\uff20${this.b}\`` : ""}${this.description ? ` ${this.description}` : ""}`;
  }
  get N() {
    const a = this.b;
    if (!a) {
      throw Error("Unknown prototype type (not constructor or interface).");
    }
    return a;
  }
  get b() {
    return this.isConstructor ? "constructor" : this.o ? "interface" : this.s ? "record" : "";
  }
  get u() {
    return this.l ? `${this.l}.` : "";
  }
  get g() {
    return `${this.u}${this.name}`;
  }
  H(a, b, c, d, e = !1) {
    var f = "";
    !0 === d ? f = "?" : !1 === d && (f = "!");
    d = this.description ? ` ${this.description}` : "";
    const g = this.I ? Ta(this.h) : e ? this.g : this.name;
    b = `${c || ""} * @param {${f}${g}} ${b ? `[${a}]` : a}${d}`;
    f = this.h && !this.A ? this.h.map(h => h.H(a, c, e)) : [];
    return [b, ...f].join("\n");
  }
}
const Ta = (a = [], b = !1) => `{ ${a.map(c => {
  const d = b ? c.f : c.type;
  let e = c.name, f = d;
  c.optional && !b ? e = `${c.name}?` : c.optional && b && (f = `(${R(d)})`);
  return `${e}: ${f}`;
}).join(", ")} }`;
function Ua(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const Va = (a, b) => {
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
async function Wa(a, b) {
  b instanceof ra ? b.pipe(a) : a.end(b);
  return await I(a);
}
class Xa extends C {
  constructor(a, b) {
    super(b);
    this.o = (Array.isArray(a) ? a : [a]).filter(Ua);
    this.b = !1;
    this.A = b;
  }
  async replace(a, b) {
    const c = new Xa(this.o, this.A);
    b && Object.assign(c, b);
    a = await Wa(c, a);
    c.b && this.brake();
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  brake() {
    this.b = !0;
  }
  async reduce(a) {
    return await this.o.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.b) {
        return b;
      }
      if ("string" == typeof d) {
        b = b.replace(c, d);
      } else {
        const e = [];
        let f;
        const g = b.replace(c, (h, ...k) => {
          f = Error();
          try {
            if (this.b) {
              return e.length ? e.push(Promise.resolve(h)) : h;
            }
            const l = d.call(this, h, ...k);
            l instanceof Promise && e.push(l);
            return l;
          } catch (l) {
            Va(f, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            Va(f, h);
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
      a = G(d.stack), d.stack = a, c(d);
    }
  }
}
;function Ya() {
  var a = Za;
  let b = "";
  const c = new C({transform(d, e, f) {
    let g;
    for (b += d.toString(); (d = a.exec(b)) && (c.push(d), g = d, a.global);) {
    }
    g && (b = b.slice(g.index + g[0].length));
    f();
  }, objectMode:!0});
  return c;
}
;function $a(a, {name:b, from:c, desc:d, link:e, ns:f}) {
  a.name = b;
  a.from = c;
  a.D = d;
  a.link = e;
  a.u = f || a.from;
}
function ab(a, b = !0) {
  return ` * @typedef {import('${a.from}').${a.name}} ${b ? a.g : a.name}`;
}
class bb {
  constructor() {
    this.from = this.name = this.u = "";
    this.link = this.D = null;
  }
  get g() {
    return `${this.u}.${this.name}`;
  }
}
;function cb(a, b) {
  b = b.reduce((c, d) => Object.assign({}, c, {[d.g]:d}), {});
  a.C = Object.assign({}, a.C, b);
}
class db extends Xa {
  constructor(a, b) {
    b = void 0 === b ? {} : b;
    super(a);
    this.C = {};
    this.on("types", c => {
      cb(this, c);
    });
    this.on("namespace", c => {
      this.i.includes(c) || this.i.push(c);
    });
    this.s = b;
    this.i = [];
    this.j = console.log;
    this.file = null;
    this.lines = [];
  }
  static get Type() {
    return Y;
  }
  static get b() {
    return bb;
  }
  get types() {
    return this.C;
  }
}
;const eb = a => {
  a = X("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:b, B:{namespace:c, ns:d = c}}] = a, e = void 0 == d ? void 0 : d;
  a = X("type", b).map(({content:h, B:k}) => {
    const l = new Y;
    Oa(l, h, k, e);
    return l;
  });
  const f = X("import", b).map(({B:h}) => {
    const k = new bb;
    $a(k, h);
    return k;
  }), g = f.map(({name:h, from:k, D:l, link:m, u:n}) => {
    const p = new Y;
    Oa(p, "", {name:h, type:`import('${k}').${h}`, J:!0, import:!0, D:l, link:m}, void 0 == n ? void 0 : n);
    return p;
  });
  return {l:d, types:a, imports:f, R:g};
};
const fb = (a, b, c) => {
  b = b.map(d => Sa(d, !0, c));
  a = a.map(d => {
    d = ab(d);
    return `/**
${c ? d : S(d)}
 */
`;
  });
  return [...b, ...a].join("");
}, gb = (a, b, c, d = !1) => {
  a = [...a.map(e => {
    {
      let f;
      e.f ? f = ` * @typedef {${e.f}}` : e.O || (f = ` * @typedef {${Ta(e.h, !0)}}`);
      f ? (e.description && (f = ` * ${e.description}\n${f}`), f = `/**
${f}
 */
`, e = f += T(e.l, e.name)) : e = Pa(e);
    }
    return e;
  })].join("\n");
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const ib = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, c) {
  const [d, ...e] = c.split(/\s+/), f = e.includes("closure"), g = e.includes("externs"), h = e.includes("noSuppress"), k = e.includes("skipNsDecl");
  let l = e.find(p => p.startsWith("ignore:"));
  l = l ? l.replace("ignore:", "").split(",") : [];
  let {w:m, F:n} = this.s;
  f && (m = !0);
  g && (n = !0);
  try {
    this.j("Detected type marker: %s", c);
    const p = await J(d);
    let {l:q = null, types:r, imports:t} = eb(p);
    r = r.filter(({g:x}) => l.includes(x) ? !1 : !0);
    t = t.filter(({g:x}) => l.includes(x) ? !1 : !0);
    this.emit("types", r);
    this.emit("types", t);
    let w;
    m ? w = fb(t, r, h) : n ? (w = gb(r, q, this.i, k) + "\n", q && this.emit("namespace", q)) : w = hb(t, r);
    return `/* ${b} ${c} */\n${w}`;
  } catch (p) {
    return this.j("(%s) Could not process typedef-js: %s", c, p.message), a;
  }
}}, hb = (a, b) => {
  b = b.map(c => Sa(c));
  a = a.map(c => ab(c, !1)).map(Ea).join("");
  b = b.join("");
  return `${a}${b}`.replace(jb, " * @typedef");
}, jb = / \*\/\n\/\*\*\n \* @typedef/g;
const lb = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?.*)*)/gm, replacement:kb};
function kb(a, b, c, d, e, f, g) {
  const {w:h} = this.s;
  let k;
  f = () => {
    if (this.lines && this.file) {
      var m;
      {
        let q = m = 0;
        for (; q < g;) {
          q += this.lines[m].length, m++;
        }
        m = {line:m, L:b.length + 11};
      }
      const {line:n, L:p} = m;
      this.j("%s:%s:%s", this.file, n, p);
    }
  };
  try {
    k = Ja(c);
  } catch (m) {
    return this.j("Error while parsing the type %s", c), this.j(process.env.DEBUG ? m.stack : m.message), f(), a;
  }
  if (!k) {
    return this.j("Could not parse the type %s", c), f(), a;
  }
  const l = Object.values(this.types).map(({name:m, g:n}) => h ? n : m);
  if (!Z(k, l, this.j, c, f)) {
    return a;
  }
  c = Object.values(this.types).find(({name:m, g:n}) => h ? n == k.name : m == k.name);
  return c instanceof db.b ? a : c.H(e, d, b, k.nullable, h);
}
const Z = (a, b, c, d, e) => {
  if (a) {
    var f = a.name;
    if (!f || !"string number boolean null undefined symbol".split(" ").includes(f)) {
      if (f && !a.application && !a.function) {
        if (b.includes(f)) {
          return !0;
        }
        c("Type %s%s was not found.", f, d != f ? ` in ${d}` : "");
        e();
      }
      var g = [b, c, d, e];
      a.application ? a.application.forEach(h => {
        Z(h, ...g);
      }) : a.record ? Object.keys(a.record).forEach(h => {
        Z(a.record[h], ...g);
      }) : a.union ? a.union.forEach(h => {
        Z(h, ...g);
      }) : a.function && (Z(a.function.this, ...g), Z(a.function.new, ...g), a.function.args.forEach(h => {
        Z(h, ...g);
      }), Z(a.function.variableArgs, ...g), Z(a.function.return, ...g));
    }
  }
};
var nb = async() => {
  const {w:a = !1, F:b = !1, G:c, types:d} = {w:ha, F:ia, G:A, types:ja};
  await Promise.all(z.map(async e => {
    var f = await M(B, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await O(e), g = P(f.content, e));
    await mb(g, a, b, c, d);
  }));
};
const mb = async(a, b = !1, c = !1, d = null, e = null) => {
  const f = [];
  e && await Promise.all(e.split(",").map(async g => {
    g = await J(g);
    const {types:h, imports:k} = eb(g);
    f.push(h, k);
  }));
  await Promise.all(a.map(async g => {
    var h = await J(g);
    const k = new db([ib, lb], {w:b, F:c});
    f.forEach(l => k.emit("types", l));
    k.file = g;
    k.j = console.error;
    k.lines = h.split("\n");
    k.end(h);
    h = await I(k);
    "-" == d ? console.log(h) : d ? await K(d, h) : await K(g, h);
  }));
};
const ob = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, pb = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, qb = "type opt name quote defaultValue description Default".split(" "), Za = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), rb = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class sb extends C {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform(a, b, c) {
    var {type:d, name:e, description:f, h:g} = a;
    a = d && d.startsWith("import") ? tb(d, e) : rb(d, e, f, g);
    this.push(a);
    g.forEach(h => {
      var {type:k, name:l, default:m, description:n, optional:p} = h;
      {
        h = ["string", "number", "boolean"].includes(k) ? ` ${k}` : ` type="${k}"`;
        var q = void 0 !== m;
        const r = q ? ` default="${m}"` : "";
        q = p && !q ? " opt" : "";
        const t = " ".repeat(4), w = " ".repeat(6);
        h = `${t}<prop${q}${h} name="${l}"${r}${n ? `>\n${w}${n}\n${t}</prop>` : "/>"}\n`;
      }
      this.push(h);
    });
    g.length && this.push("  </type>\n");
    c();
  }
}
const tb = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class ub extends C {
  constructor() {
    super({objectMode:!0});
  }
  _transform(a, b, c) {
    var [, d, e, f, g] = a;
    a = V(pb, g, qb).map(h => {
      var k = Object.assign({}, h), l = h.defaultValue;
      const m = h.Default;
      var n = h.opt;
      const p = h.name;
      h = h.type;
      k = (delete k.defaultValue, delete k.Default, delete k.opt, delete k.name, delete k.type, k);
      n = Object.assign({}, k, {name:p, type:h}, l ? {defaultValue:ob(l)} : {}, m ? {v:ob(m)} : {}, n ? {optional:!0} : {});
      if (l || m) {
        l ? l !== m && void 0 !== n.v && (l = Q(p, m, h), console.error("%s[%s] does not match Default `%s`.", e, l, n.v)) : (l = Q(p, m, h), console.error("%s[%s] got from Default.", e, l)), n.default = "defaultValue" in n ? n.defaultValue : n.v, delete n.defaultValue, delete n.v;
      }
      return n;
    });
    this.push({type:d, name:e, description:f, h:a});
    c();
  }
}
async function vb(a) {
  const b = Ya(), c = new ub, d = new sb;
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
  ${(await I(d)).trim()}
</types>`;
}
;var wb = async() => {
  const {G:a} = {G:A};
  await Promise.all(z.map(async b => {
    b = await J(b);
    b = await vb(b);
    a ? await K(a, b) : console.log(b);
  }));
};
if (la) {
  const a = fa();
  console.log(na({usage:a, description:"Embeds and maintains Closure-compatible types JSDoc in\nJavaScript source code from an external types.xml file.", line:"typal source [--closure|externs] [--migrate] [-o output] [-hv]", example:"typal src/index.js -c"}));
  process.exit();
} else {
  ma && (console.log(require("../../package.json").version), process.exit());
}
(async() => {
  try {
    return ka ? await wb() : await nb();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map