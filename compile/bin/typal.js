#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');
const path = require('path');             
var aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
}, ba = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function ca(a, b) {
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
ca("String.prototype.trimRight", function(a) {
  function b() {
    return this.replace(/[\s\xa0]+$/, "");
  }
  return a || b;
});
const da = (a, b, c, d = !1, e = !1) => {
  const g = c ? new RegExp(`^-(${c}|-${b})`) : new RegExp(`^--${b}`);
  b = a.findIndex(f => g.test(f));
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
}, ha = () => {
  var a = fa;
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
const fa = {source:{description:"The path to the source file or directory with files to embed types into. Can specify multiple values, e.g., `typal types/index.js types/vendor.js`.", command:!0, multiple:!0}, output:{description:"The destination where to save output.\nIf not passed, the file will be overwritten.\nIf `-` is passed, prints to stdout.", short:"o"}, closure:{description:"Whether to generate types in _Closure_ mode.", boolean:!0, short:"c"}, externs:{description:"Whether to generate externs for _GCC_.", 
boolean:!0, short:"e"}, types:{description:"Comma-separated location of files to read types from.", short:"t"}, template:{description:"Scans the input file for `@type` comment in functions' JSDoc, and inserts the annotations from types' files.", short:"T"}, migrate:{description:"Extracts types from JavaScript source code and saves them\ninto the types.xml file specified in the output option.", boolean:!0, short:"m"}, help:{description:"Print the help information and exit.", boolean:!0, short:"h"}, 
version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, w = function(a = {}, b = process.argv) {
  [, , ...b] = b;
  const c = ea(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce(({m:e, ...g}, f) => {
    if (0 == e.length && d) {
      return {m:e, ...g};
    }
    const h = a[f];
    let k;
    if ("string" == typeof h) {
      ({value:k, argv:e} = da(e, f, h));
    } else {
      try {
        const {short:l, boolean:m, number:n, command:p, multiple:q} = h;
        p && q && c.length ? (k = c, d = !0) : p && c.length ? (k = c[0], d = !0) : {value:k, argv:e} = da(e, f, l, m, n);
      } catch (l) {
        return {m:e, ...g};
      }
    }
    return void 0 === k ? {m:e, ...g} : {m:e, ...g, [f]:k};
  }, {m:b});
}(fa), y = w.source, ia = w.output, ja = w.closure, ka = w.externs, la = w.types, ma = w.template, na = w.migrate, oa = w.help, pa = w.version;
function qa(a = {usage:{}}) {
  const {usage:b = {}, description:c, line:d, example:e} = a;
  a = Object.keys(b);
  const g = Object.values(b), [f] = a.reduce(([l = 0, m = 0], n) => {
    const p = b[n].split("\n").reduce((q, r) => r.length > q ? r.length : q, 0);
    p > m && (m = p);
    n.length > l && (l = n.length);
    return [l, m];
  }, []), h = (l, m) => {
    m = " ".repeat(m - l.length);
    return `${l}${m}`;
  };
  a = a.reduce((l, m, n) => {
    n = g[n].split("\n");
    m = h(m, f);
    const [p, ...q] = n;
    m = `${m}\t${p}`;
    const r = h("", f);
    n = q.map(u => `${r}\t${u}`);
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
;const {createReadStream:ra, createWriteStream:sa, lstat:z, readdir:ta} = fs;
var ua = stream;
const {Transform:A, Writable:va} = stream;
const wa = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, xa = (a, b = !1) => wa(a, 2 + (b ? 1 : 0)), Ba = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:Ca} = os;
const Da = /\s+at.*(?:\(|\s)(.*)\)?/, Ea = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Fa = Ca(), B = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Ea.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(g => {
    g = g.match(Da);
    if (null === g || !g[1]) {
      return !0;
    }
    g = g[1];
    return g.includes(".app/Contents/Resources/electron.asar") || g.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(g);
  }).filter(g => g.trim()).map(g => b ? g.replace(Da, (f, h) => f.replace(h, h.replace(Fa, "~"))) : g).join("\n");
};
function Ga(a, b, c = !1) {
  return function(d) {
    var e = Ba(arguments), {stack:g} = Error();
    const f = wa(g, 2, !0), h = (g = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [f, b]].join("\n");
    e = B(e);
    return Object.assign(g ? d : Error(), {message:h, stack:e});
  };
}
;function C(a) {
  var {stack:b} = Error();
  const c = Ba(arguments);
  b = xa(b, a);
  return Ga(c, b, a);
}
;const Ha = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ia extends va {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {L:e = C(!0), proxyError:g} = a || {}, f = (h, k) => e(k);
    super(d);
    this.b = [];
    this.J = new Promise((h, k) => {
      this.on("finish", () => {
        let l;
        b ? l = Buffer.concat(this.b) : l = this.b.join("");
        h(l);
        this.b = [];
      });
      this.once("error", l => {
        if (-1 == l.stack.indexOf("\n")) {
          f`${l}`;
        } else {
          const m = B(l.stack);
          l.stack = m;
          g && f`${l}`;
        }
        k(l);
      });
      c && Ha(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.b.push(a);
    c();
  }
  get f() {
    return this.J;
  }
}
const D = async a => {
  ({f:a} = new Ia({rs:a, L:C(!0)}));
  return await a;
};
async function F(a) {
  a = ra(a);
  return await D(a);
}
;async function G(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = C(!0), d = sa(a);
  await new Promise((e, g) => {
    d.on("error", f => {
      f = c(f);
      g(f);
    }).on("close", e).end(b);
  });
}
;function Ja(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function H(a, b, c) {
  const d = C(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const {length:e} = a;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((g, f) => {
    const h = (l, m) => l ? (l = d(l), f(l)) : g(c || m);
    let k = [h];
    Array.isArray(b) ? (b.forEach((l, m) => {
      Ja(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (Ja(e, 0), k = [b, h]);
    a(...k);
  });
}
;const {join:I} = path;
async function Ka(a, b) {
  b = b.map(async c => {
    const d = I(a, c);
    return {lstat:await H(z, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const La = a => a.lstat.isDirectory(), Ma = a => !a.lstat.isDirectory();
async function J(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await H(z, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await H(ta, a);
  b = await Ka(a, b);
  a = b.filter(La);
  b = b.filter(Ma).reduce((c, d) => {
    var e = d.lstat.isDirectory() ? "Directory" : d.lstat.isFile() ? "File" : d.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...c, [d.relativePath]:{type:e}};
  }, {});
  a = await a.reduce(async(c, {path:d, relativePath:e}) => {
    c = await c;
    d = await J(d);
    return {...c, [e]:d};
  }, {});
  return {content:{...b, ...a}, type:"Directory"};
}
const K = (a, b) => {
  let c = [], d = [];
  Object.keys(a).forEach(g => {
    const {type:f} = a[g];
    "File" == f ? c.push(I(b, g)) : "Directory" == f && d.push(g);
  });
  const e = d.reduce((g, f) => {
    const {content:h} = a[f];
    f = K(h, I(b, f));
    return [...g, ...f];
  }, []);
  return [...c, ...e];
};
function Na(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const L = (a, b) => {
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
function Oa(a, b) {
  function c() {
    return b.filter(Na).reduce((d, {re:e, replacement:g}) => {
      if (this.j) {
        return d;
      }
      if ("string" == typeof g) {
        return d = d.replace(e, g);
      }
      {
        let f;
        return d.replace(e, (h, ...k) => {
          f = Error();
          try {
            return this.j ? h : g.call(this, h, ...k);
          } catch (l) {
            L(f, l);
          }
        });
      }
    }, `${a}`);
  }
  c.b = () => {
    c.j = !0;
  };
  return c.call(c);
}
;const Pa = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Qa = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, Ra = () => {
  var a = {M:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
  return Object.keys(a).reduce((b, c) => {
    {
      var d = a[c];
      const {getReplacement:e = Qa, getRegex:g = Pa} = {}, f = g(c);
      d = {name:c, re:d, regExp:f, getReplacement:e, map:{}, lastIndex:0};
    }
    return {...b, [c]:d};
  }, {});
}, Sa = a => {
  var b = [];
  const {regExp:c, map:d} = a;
  return {re:c, replacement(e, g) {
    e = d[g];
    delete d[g];
    return Oa(e, Array.isArray(b) ? b : [b]);
  }};
}, Ta = a => {
  const {re:b, map:c, getReplacement:d, name:e} = a;
  return {re:b, replacement(g) {
    const {lastIndex:f} = a;
    c[f] = g;
    a.lastIndex += 1;
    return d(e, f);
  }};
};
async function Ua(a, b) {
  return Va(a, b);
}
class M extends A {
  constructor(a, b) {
    super(b);
    this.f = (Array.isArray(a) ? a : [a]).filter(Na);
    this.j = !1;
    this.h = b;
  }
  async replace(a, b) {
    const c = new M(this.f, this.h);
    b && Object.assign(c, b);
    a = await Ua(c, a);
    c.j && (this.j = !0);
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  async reduce(a) {
    return await this.f.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.j) {
        return b;
      }
      if ("string" == typeof d) {
        b = b.replace(c, d);
      } else {
        const e = [];
        let g;
        const f = b.replace(c, (h, ...k) => {
          g = Error();
          try {
            if (this.j) {
              return e.length ? e.push(Promise.resolve(h)) : h;
            }
            const l = d.call(this, h, ...k);
            l instanceof Promise && e.push(l);
            return l;
          } catch (l) {
            L(g, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            L(g, h);
          }
        } else {
          b = f;
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
      a = B(d.stack), d.stack = a, c(d);
    }
  }
}
async function Va(a, b) {
  b instanceof ua ? b.pipe(a) : a.end(b);
  return await D(a);
}
;function Wa() {
  var a = Xa;
  let b = "";
  const c = new A({transform(d, e, g) {
    let f;
    for (b += d.toString(); (d = a.exec(b)) && (c.push(d), f = d, a.global);) {
    }
    f && (b = b.slice(f.index + f[0].length));
    g();
  }, objectMode:!0});
  return c;
}
;const N = (a, b, c, d) => {
  if (!a) {
    throw Error("The name of the property is not given");
  }
  a = `${d ? `${d}.` : ""}${a}`;
  if (null === b) {
    return a;
  }
  b = Number.isInteger(b) || [!0, !1, "null"].includes(b) || ["number", "boolean"].includes(c) ? b : `"${b}"`;
  return `${a}=${b}`;
}, Ya = ({number:a, I:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", Za = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, O = a => a ? `/**
${a}
 */
` : "/**\n */\n", P = a => ` * @suppress {nonStandardJsDocs}
${a}`, Q = (a, b, c) => {
  a = `${a ? "" : "var "}${a ? `${a}.` : ""}${b}`;
  c && (a += ` = ${c}`);
  return a;
}, R = a => {
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
    return c.map(g => g.replace(e, "")).join("\n");
  }
};
function S(a, b, c) {
  const d = [];
  b.replace(a, (e, ...g) => {
    e = g.slice(0, g.length - 2).reduce((f, h, k) => {
      k = c[k];
      if (!k || void 0 === h) {
        return f;
      }
      f[k] = h;
      return f;
    }, {});
    d.push(e);
  });
  return d;
}
;const $a = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), ab = new RegExp(`(?:\\s+((?:${$a.source}\\s*)*))`);
const T = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return S(new RegExp(`<(${a})${ab.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:c, a:d = "", c:e = ""}) => {
    d = d.replace(/\/$/, "").trim();
    d = bb(d);
    return {content:e, props:d, tag:c};
  });
}, bb = a => S($a, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
const cb = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function db(a) {
  let b = 0;
  const c = (e = 1) => a[b + e], d = (e = !0, g = []) => {
    var f = {};
    let h = a[b];
    if (["nullable", "nonNullable"].includes(h)) {
      if (!e) {
        throw Error(`${h} not allowed after .`);
      }
      f.nullable = "nullable" === h;
      b++;
    }
    h = a[b];
    if ("(" == h) {
      b++;
      f = {...d(!0, []), ...f};
      if (")" != a[b]) {
        throw Error("Expecting closing )");
      }
      b++;
      if ("|" != a[b]) {
        return f;
      }
    } else {
      if ("{" == h) {
        b++;
        g = f;
        for (e = {}; "}" != a[b];) {
          var k = a[b];
          b++;
          e[k] = null;
          if (":" == a[b]) {
            b++;
            try {
              var l = d();
              e[k] = l;
            } catch (n) {
              throw n.message += `(when parsing ${k} property)`, n;
            }
          }
          if ("}" == a[b]) {
            b++;
            break;
          }
          if ("," != a[b]) {
            throw Error(`Expecting , for record after ${k}`);
          }
          b++;
        }
        g.record = e;
        return f;
      }
    }
    if (["nonNullable", "nullable"].includes(h)) {
      throw Error("Nullability already defined.");
    }
    if (/[=),:.<>}|]/.test(h)) {
      throw Error(`Unexpected token ${h}.`);
    }
    "|" != a[b] && (f.name = a[b], b++);
    if ("function" == h) {
      l = f;
      k = {return:null, args:[]};
      if ("(" != a[b]) {
        throw Error("Expecting opening (");
      }
      b++;
      for (var m; ")" != a[b];) {
        if (m && "this" == a[b]) {
          throw Error("this must come first in function arguments");
        }
        if (m && "new" == a[b]) {
          throw Error("new must come first in function arguments");
        }
        if ("this" == a[b]) {
          b++;
          if (":" != a[b]) {
            throw Error("Expecting :");
          }
          b++;
          k.this = d();
        } else {
          if ("new" == a[b]) {
            b++;
            if (":" != a[b]) {
              throw Error("Expecting :");
            }
            b++;
            k.new = d();
          } else {
            if ("." == a[b] && "." == c() && "." == c(2)) {
              b++;
              b++;
              b++;
              m = d();
              if (")" != a[b]) {
                throw Error("Variable args must come last");
              }
              k.variableArgs = m;
            } else {
              m = d(), k.args.push(m), "=" == a[b] && (m.optional = !0, b++);
            }
          }
        }
        m = !0;
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
      ":" == a[b] && (b++, m = d(), void 0 == m.name && m.nullable && (m.name = ""), k.return = m);
      l.function = k;
    } else {
      if ("<" == a[b] || (k = "." == a[b] && "<" == c())) {
        b++;
        k && b++;
        l = f;
        for (k = []; ">" != a[b];) {
          m = d();
          k.push(m);
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
        l.application = k;
      }
    }
    for (; "." == a[b];) {
      f.name += ".";
      b++;
      ({name:l} = d(!1));
      if (!l) {
        throw Error("Expected to see the name after .");
      }
      f.name += l;
    }
    if ("|" != a[b] || !e) {
      return f;
    }
    for (g.push(f); "|" == a[b];) {
      b++, f = d(!0, g), f.union !== g && g.push(f);
    }
    return {union:g};
  };
  return d();
}
;function U(a) {
  a = cb(a);
  return db(a);
}
;function eb(a, b, {name:c, string:d, "boolean":e, opt:g, number:f, type:h}, k) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = R(b));
  b = Ya({number:f, I:d, boolean:e, type:h});
  k && (b = b.replace(new RegExp(`([!?])?${k}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), g = !0);
  a.type = b;
  g && (a.optional = !0);
}
class fb {
  constructor() {
    this.name = null;
    this.type = "";
    this.optional = !1;
    this.description = "";
  }
  get C() {
    return this.optional ? `${this.type}=` : this.type;
  }
}
const gb = (a, b) => {
  let c = a.lastIndexOf("</arg>"), d = a;
  var e = [];
  -1 != c && (c += 6, e = a.slice(0, c), d = a.slice(c), e = T("arg", e), e = e.map(({content:g, props:f}) => {
    const h = new fb;
    eb(h, g, f, b);
    return h;
  }));
  return {G:d, B:e};
};
function V(a) {
  if ("" == a.name && a.nullable) {
    return "?";
  }
  var b = "";
  a.nullable ? b = "?" : !1 === a.nullable && (b = "!");
  if (a.function) {
    b += a.name + "(";
    const d = [];
    if (a.function.this) {
      var c = "this: " + V(a.function.this);
      d.push(c);
    }
    a.function.new && (c = "new: " + V(a.function.new), d.push(c));
    a.function.args.forEach(e => {
      let g = V(e);
      e.optional && (g += "=");
      d.push(g);
    });
    a.function.variableArgs && (c = "..." + V(a.function.variableArgs), d.push(c));
    c = d.join(", ");
    b += c + ")";
    a.function.return && (b += ": " + V(a.function.return));
  } else {
    if (a.record) {
      b += "{ ", c = Object.keys(a.record).map(d => {
        var e = a.record[d];
        if (!e) {
          return d;
        }
        e = V(e);
        return `${d}: ${e}`;
      }), b += c.join(", "), b += " }";
    } else {
      if (a.application) {
        if ("Promise" == a.name && !a.application.some(d => "void" != d.name)) {
          return b + "Promise";
        }
        b += a.name + "<";
        c = a.application.map(d => V(d));
        b += c.join(", ");
        b += ">";
      } else {
        a.union ? (b += "(", c = a.union.map(d => V(d)), b += c.join("|"), b += ")") : b += "any" == a.name ? "*" : a.name;
      }
    }
  }
  return b;
}
;function hb(a, b, c = new RegExp(`([!?])?${b}\\.`, "g")) {
  b && (a.type = a.type.replace(c, "$1"));
}
function ib(a, b, {name:c, string:d, "boolean":e, opt:g, number:f, type:h, "default":k, closure:l, alias:m, aliases:n, noParams:p, "static":q, initial:r}) {
  if (!c) {
    throw Error("Property does not have a name.");
  }
  a.name = c;
  b && (a.description = R(b));
  b = Ya({number:f, I:d, boolean:e, type:h});
  p && (a.l = p);
  l && (a.g = l);
  a.type = b;
  void 0 !== k ? a.default = k : void 0 !== r && (a.default = r);
  if (g || void 0 !== k) {
    a.optional = !0;
  }
  m && (a.aliases = [m]);
  n && (a.aliases = n.split(/\s*,\s*/));
  q && (a.b = !0);
}
function jb(a, b = !1) {
  return b ? a.closureType : a.isParsedFunction ? a.toTypeScriptFunction(V) : a.type;
}
function kb(a, b = null, c = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = N(a.name, a.optional ? a.default : null, a.type, b);
  b = a.optional ? `[${b}]` : b;
  var {h:d} = a;
  d = d ? ` ${d}` : "";
  return `{${jb(a, c)}} ${b}${d}`;
}
function lb(a, b = !1) {
  a = kb(a, null, b);
  return ` * @prop ${mb(a, !0)}`;
}
function nb(a) {
  const b = [], {function:{args:c, return:d, variableArgs:e, this:g}} = a.parsed;
  c.map(f => V(f)).forEach((f, h) => {
    const {optional:k} = c[h], {name:l = `arg${h}`, description:m} = a.args[h] || {};
    b.push(` * @param {${f}${k ? "=" : ""}} ${k ? `[${l}]` : l}${m ? ` ${m}` : ""}`);
  });
  e && b.push(` * @param {...${V(e)}} args`);
  g && b.push(` * @this {${V(g)}}`);
  if (d && "void" != d.name) {
    const f = V(d);
    b.push(` * @return {${f}}`);
  }
  return b;
}
function ob(a) {
  if (a.isParsedFunction) {
    const {function:{args:b, variableArgs:c}} = a.parsed, d = b.map((e, g) => {
      ({name:e = `arg${g}`} = a.args[g] || {});
      return e;
    });
    c && d.push("...args");
    return ` = function(${d.join(", ")}) {}`;
  }
  return a.type.startsWith("function(") ? " = function() {}" : "";
}
function pb(a, b = "") {
  let c = [];
  var {h:d} = a;
  d && (d = mb(d), c.push(d));
  !a.optional && a.isParsedFunction ? (a = nb(a), c.push(...a)) : c.push(` * @type {${a.optional ? Za(a.closureType) : a.closureType}}`);
  b && (c = c.map(e => `${b}${e}`));
  return c.join("\n");
}
function qb(a, b) {
  const c = Object.assign(Object.create(Object.getPrototypeOf(a)), a);
  c.description = `An alias for \`${a.name}\`.`;
  c.name = b;
  return c;
}
class rb {
  constructor(a = null) {
    this.f = this.description = this.name = null;
    this.closureType = "";
    this.default = this.g = null;
    this.optional = !1;
    this.aliases = [];
    this.l = !1;
    this.parsed = null;
    this.args = a;
    this.isConstructor = this.b = !1;
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    const {function:{args:b, return:c, this:d, variableArgs:e}} = this.parsed;
    var g = b.map(h => a(h)).map((h, k) => {
      const {optional:l} = b[k];
      let {name:m = `arg${k}`, optional:n = l} = this.args[k] || {};
      return `${`${m}${n ? "?" : ""}`}: ${h}`;
    });
    if (d) {
      var f = a(d);
      g.unshift(`this: ${f}`);
    }
    e && (f = a(e), g.push(`...args: ${f}[]`));
    g = g.join(", ");
    f = c ? a(c) : "?";
    return `(${g}) => ${f}`;
  }
  get static() {
    return this.b;
  }
  get hasDefault() {
    return null !== this.default;
  }
  get type() {
    return this.f || "*";
  }
  set type(a) {
    this.f = a || null;
    this.closureType = this.g || this.f || "";
    if (!this.l) {
      try {
        this.parsed = U(this.closureType), this.isParsedFunction && !this.args && (this.args = []);
      } catch (b) {
        this.parsed = null;
      }
    }
  }
  get h() {
    let a = this.description || "";
    return `${a}${this.hasDefault ? `${/``` */.test(this.description) ? "\n" : a ? " " : ""}Default \`${this.default}\`.` : ""}`;
  }
  get isParsedFunction() {
    return !!this.parsed && "function" == this.parsed.name;
  }
  A(a, b = "", c = !1) {
    a = kb(this, a, c);
    return `${b} * @param ${a}`;
  }
}
const mb = (a, b = !1) => a.split("\n").map((c, d) => {
  if (b && !d) {
    return c;
  }
  d = " *";
  c.length && (d += " ");
  return d + c;
}).join("\n");
const X = (a, b, c = {}) => {
  let d;
  if ("object" == typeof b) {
    d = b;
  } else {
    try {
      (d = U(b)) || console.log("Could not parse %s", b);
    } catch (e) {
      console.log("Could not parse %s", b), console.error(e.message);
    }
  }
  return d ? W(d, a, c) : b;
}, W = (a, b, c = {}) => {
  if ("" == a.name && a.nullable) {
    return "?";
  }
  var {escapePipe:d = !0} = c;
  let e = "";
  var g = "";
  a.nullable ? g = "?" : !1 === a.nullable && (g = "!");
  if (a.function) {
    e = e + g + (a.name + "(");
    const f = [];
    a.function.this && (d = "this: " + W(a.function.this, b, c), f.push(d));
    a.function.new && (d = "new: " + W(a.function.new, b, c), f.push(d));
    a.function.args.forEach(h => {
      let k = W(h, b, c);
      h.optional && (k += "=");
      f.push(k);
    });
    a.function.variableArgs && (d = "..." + W(a.function.variableArgs, b, c), f.push(d));
    d = f.join(", ");
    e += d + ")";
    a.function.return && (e += ": " + W(a.function.return, b, c));
  } else {
    a.record ? (e += "{ ", d = Object.keys(a.record).map(f => {
      var h = a.record[f];
      if (!h) {
        return f;
      }
      h = W(h, b, c);
      return `${f}: ${h}`;
    }), e += d.join(", "), e += " }") : a.application ? (e += sb(a.name, b, g, c) + "&lt;", d = a.application.map(f => W(f, b, c)), e += d.join(", "), e += "&gt;") : a.union ? (e = e + g + "(", g = a.union.map(f => W(f, b, c)), e += g.join(d ? " \\| " : " | "), e += ")") : e += sb("any" == a.name ? "*" : a.name, b, g, c);
  }
  return e;
}, sb = (a, b, c = "", d = {}) => {
  const {flatten:e = !1, nameProcess:g, link:f = ({link:l}) => `#${l}`} = d;
  d = tb(b, a);
  c = `${c}${a}`;
  if (!d) {
    return c;
  }
  let {link:h, type:{description:k}} = d;
  h = f(d);
  e && ((b = b.find(({fullName:l}) => l == a)) && b.link && (h = b.link), !k && b.description && (k = b.description), "function" == typeof e && e(a));
  b = g ? g(c) : c;
  return k ? `<a href="${h}" title="${k.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${h})`;
}, tb = (a, b) => {
  a = a.filter(({fullName:d}) => d == b);
  if (a.length) {
    var c = a.find(({import:d}) => d || !1);
    a = a.find(({import:d}) => !d) || c;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function ub(a, b = [], c = [], d = {}) {
  const {narrow:e = !1, flatten:g = !1, preprocessDesc:f, link:h} = d;
  if (!b.length) {
    return "";
  }
  const k = a.isConstructor || a.isInterface, l = b.some(({hasDefault:p}) => p), m = {flatten:g, escapePipe:!e, link:h}, n = p => X(c, p, m);
  a = b.map(p => {
    let q;
    p.args && p.isParsedFunction ? (q = p.toTypeScriptFunction(n), p.isConstructor && (q = `new ${q}`)) : q = X(c, p.parsed || p.type, m);
    const r = k || p.optional ? p.name : `${p.name}*`, u = p.hasDefault ? `\`${p.default}\`` : "-", x = f ? f(p.description) : p.description;
    return {prop:p, typeName:q, name:r, de:vb(x, !e), d:u};
  });
  if (e) {
    return {props:a, anyHaveDefault:l, constr:k};
  }
  a = a.map(({name:p, typeName:q, de:r, d:u, prop:x}) => [x.optional ? p : `__${p}__`, `<em>${q}</em>`, r, ...l ? [u] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...l ? [k ? "Initial" : "Default"] : []];
  return `

\`\`\`table
${JSON.stringify([b, ...a], null, 2)}
\`\`\``;
}
const vb = (a = "", b = !0) => {
  null === a && (a = "");
  b && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
};
function wb(a) {
  var b = a.g();
  b = O(b.join("\n"));
  b += Q(a.namespace, a.name, xb(a));
  const c = a.properties.reduce((d, e) => {
    d.push(e);
    const g = e.aliases.map(f => qb(e, f));
    d.push(...g);
    return d;
  }, []).filter(({isConstructor:d}) => !d).map(d => {
    let e = pb(d);
    e = O(e);
    e += Q(`${a.fullName}${d.static ? "" : ".prototype"}`, d.name);
    return e += ob(d);
  });
  return [b, ...c].join("\n");
}
function yb(a, b = !1) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return b ? `${a.ns}${c}` : c;
}
function zb(a, b = !1, c = !1, d = b) {
  d = ` * @typedef {${(b ? a.closureType : a.type) || a.D()}}${` ${yb(a, d)}${a.h}`}`;
  a = (a.properties ? a.properties.reduce((e, g) => {
    if (g.b) {
      return e;
    }
    e.push(g);
    const f = g.aliases.map(h => qb(g, h));
    e.push(...f);
    return e;
  }, []) : []).map(e => lb(e, b));
  a = [d, ...a].join("\n");
  b && !c && (a = P(a));
  return a = O(a);
}
function xb(a) {
  return a.args ? `function(${a.args.filter(({name:b}) => "this" != b).map(({name:b}) => b).join(", ")}) {}` : null;
}
class Y {
  constructor() {
    this.name = "";
    this.description = this.closureType = this.type = null;
    this.noExpand = this.spread = this.noToc = !1;
    this.link = null;
    this.properties = [];
    this.namespace = null;
    this.isRecord = this.isInterface = this.isConstructor = !1;
    this.args = this.extends = null;
  }
  get import() {
    return !1;
  }
  b(a, {name:b, type:c, desc:d, noToc:e, spread:g, noExpand:f, link:h, closure:k, constructor:l, "extends":m, "interface":n, record:p}, q, r = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    c && (this.type = c);
    k ? this.closureType = k : this.closureType = this.type;
    d && (this.description = R(d));
    this.noToc = !!e;
    this.spread = !!g;
    this.noExpand = !!f;
    h && (this.link = h);
    !0 === l && (this.isConstructor = l);
    !0 === n && (this.isInterface = n);
    !0 === p && (this.isRecord = p);
    m && (this.extends = m);
    if (a) {
      b = T("prop", a).map(({content:t, props:v}) => {
        const E = new rb;
        ib(E, t, v);
        return E;
      });
      a = T(["function", "fn", "static"], a).map(({content:t, props:v, tag:E}) => {
        E = "static" == E;
        const {G:Mb, B:ya} = gb(t, r), {async:za, "void":Nb, "return":Ob = Nb ? "void" : "", ...Aa} = v;
        ({args:v = ""} = v);
        v || (v = ya.map(({C:Pb}) => Pb).join(","));
        t = Ob.replace(/\n\s*/g, " ");
        za && t ? t = `!Promise<${t}>` : za && (t = "!Promise");
        v = `function(${v})`;
        t && (v += `: ${t}`);
        Aa.type = v;
        t = new rb(ya);
        ib(t, Mb, Aa);
        E && (t.b = !0);
        return t;
      });
      a = [...b, ...a];
      const {H:u, n:x} = a.reduce((t, v) => {
        v.static ? t.H.push(v) : t.n.push(v);
        return t;
      }, {H:[], n:[]});
      this.properties = [...u, ...x];
    }
    q && (this.namespace = q);
  }
  get F() {
    return this.isConstructor || this.isInterface || this.isRecord;
  }
  D() {
    return "Object";
  }
  get h() {
    return `${this.tag ? ` \`\uff20${this.tag}\`` : ""}${this.description ? ` ${this.description}` : ""}`;
  }
  f(a = !1, b = !1, c = a) {
    const d = !!this.extends, e = zb(this, a, b, c), g = [];
    if (this.namespace && a) {
      var f = ` * @typedef {${this.fullName}} ${this.name}${this.h}`;
      a && !b && (f = P(f));
      f = O(f);
      g.push(f);
    } else {
      this.namespace && c && (f = ` * @typedef {${this.fullName}} ${this.name}${this.h}`, f = O(f), g.push(f));
    }
    d && (c = ` * @typedef {${this.extends} & ${yb(this, c)}} ${c ? this.fullName : this.name}${this.h}`, a && !b && (c = P(c)), c = O(c), g.push(c));
    g.push(e);
    return g.join("");
  }
  get N() {
    const a = this.tag;
    if (!a) {
      throw Error("Unknown prototype type (not constructor or interface).");
    }
    return a;
  }
  get tag() {
    return this.isConstructor ? "constructor" : this.isInterface ? "interface" : this.isRecord ? "record" : "";
  }
  g(a = "", b = !0) {
    let c = [];
    this.description && c.push(` * ${this.description}`);
    this.extends && c.push(` * @extends {${this.extends}}`);
    this.args && this.args.forEach(d => {
      let {name:e, description:g, optional:f, type:h} = d;
      d = g ? ` ${g}` : "";
      if (e.startsWith("...")) {
        e = e.slice(3), h = `...${h}`;
      } else {
        if ("this" == e) {
          c.push(` * @this {${h}}${d}`);
          return;
        }
      }
      c.push(` * @param {${h}${f ? "=" : ""}} ${f ? `[${e}]` : e}${d}`);
    });
    b && c.push(` * @${this.N}`);
    a && (c = c.map(d => `${a}${d}`));
    return c;
  }
  get ns() {
    return this.namespace ? `${this.namespace}.` : "";
  }
  get fullName() {
    return `${this.ns}${this.name}`;
  }
  A(a, b, c, d, e = !1) {
    var g = "";
    !0 === d ? g = "?" : !1 === d && (g = "!");
    d = this.description ? ` ${this.description}` : "";
    const f = this.spread ? Ab(this.properties) : e ? this.fullName : this.name;
    b = `${c || ""} * @param {${g}${f}} ${b ? `[${a}]` : a}${d}`;
    g = this.properties && !this.noExpand ? this.properties.map(h => h.A(a, c, e)) : [];
    return [b, ...g].join("\n");
  }
  toMarkdown(a = [], b = {}) {
    const {flatten:c, details:d = []} = b, e = d.includes(this.name);
    var g = this.type ? `\`${this.type}\`` : "", f = g, h = !1;
    this.link ? f = `[${g}](${this.link})` : !this.import && this.type && (f = X(a, this.type, b), h = f != this.type, f = Bb(f, h));
    g = Bb(this.fullName);
    g = this.import ? `[${g}](l-type)` : this.noToc ? `[${g}](l-type)` : `[${g}](t-type)`;
    h = this.description ? `: ${this.description}` : "";
    f = f ? `${f} ` : "";
    let k = /_/.test(g);
    if (this.extends) {
      let m = `\`${this.extends}\``;
      var l = a.find(({fullName:n}) => n == this.extends);
      l && l.link ? (m = "<a ", l.description && (m += `title="${l.description}" `), m += `href="${l.link}">\`${this.extends}\`</a>`) : (l = X(a, this.extends, {...b, nameProcess:n => `\`${n}\``}), this.extends != l && (m = l));
      l = ` extends ${m}`;
      k = k || /_/.test(m);
      f = (k ? f + "<strong>" : f + "__") + (g + l);
      "function" == typeof c && c(this.extends);
    } else {
      f = (k ? f + "<strong>" : f + "__") + g;
    }
    f = (k ? f + "</strong>" : f + "__") + h;
    a = ub(this, this.properties, a, b);
    return {LINE:f, table:a, displayInDetails:e};
  }
}
const Bb = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`, Ab = (a = [], b = !1) => {
  a = a.reduce((c, d) => {
    c.push(d);
    const e = d.aliases.map(g => ({...d, name:g}));
    c.push(...e);
    return c;
  }, []);
  return `{ ${a.map(c => {
    const d = b ? c.closureType : c.type;
    let e = c.name, g = d;
    c.optional && !b ? e = `${c.name}?` : c.optional && b && (g = `(${Za(d)})`);
    return `${e}: ${g}`;
  }).join(", ")} }`;
};
class Cb extends Y {
  constructor() {
    super();
    this.from = "";
  }
  get import() {
    return !0;
  }
  b(a, {from:b, name:c, ...d}, e, g) {
    if (!b) {
      throw Error("From attribute of import is not given.");
    }
    this.from = b;
    this.description = R(a);
    super.b("", {...d, noToc:!0, name:c, type:`import('${b}').${c}`}, e != g ? e : null);
  }
  f(a = !0) {
    return ` * @typedef {import('${this.from}').${this.name}} ${a ? this.fullName : this.name}`;
  }
}
;function Db(a, b) {
  b = b.reduce((c, d) => ({...c, [d.fullName]:d}), {});
  a.v = {...a.v, ...b};
}
class Eb extends M {
  constructor(a, b = {}) {
    super(a);
    this.v = {};
    this.on("types", c => {
      Db(this, c);
    });
    this.on("namespace", c => {
      this.b.includes(c) || this.b.push(c);
    });
    this.g = b;
    this.b = [];
    this.i = console.log;
    this.file = null;
    this.lines = [];
  }
  static get Type() {
    return Y;
  }
  static get Import() {
    return Cb;
  }
  get types() {
    return this.v;
  }
}
;class Fb extends Y {
  constructor() {
    super();
    this.l = null;
    this.async = !1;
  }
  get F() {
    return !0;
  }
  get isMethod() {
    return !0;
  }
  b(a, {async:b, "return":c, ...d}, ...e) {
    this.description = R(a);
    super.b("", d, ...e);
    c && (this.l = c.replace(/\n\s*/g, " "));
    b && (this.async = !0);
  }
  get return() {
    return this.l || "void";
  }
  g(a = "") {
    const b = super.g(a, !1);
    let c;
    this.l && (c = this.return);
    this.async && c ? c = `Promise<${c}>` : this.async && (c = "Promise");
    c && b.push(`${a} * @return {${c}}`);
    return b;
  }
  D() {
    return `(${this.args.map(({name:a, type:b, optional:c}) => `${a}${c ? "?" : ""}: ${b}`).join(", ")}) => ${this.return}`;
  }
}
;const Gb = a => {
  if (a.args && a.args.length) {
    var b = `function(${a.args.map(({C:d}) => d).join(", ")}): ${a.fullName}`, c = new rb(a.args);
    c.isConstructor = !0;
    ib(c, "Constructor method.", {type:b, name:"constructor"});
    hb(c, void 0);
    a.properties.unshift(c);
  }
}, Ib = a => {
  a = T("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:b, props:{namespace:c, ns:d = c}}] = a, e = void 0 == d ? void 0 : d, g = [];
  a = T(["type", "interface", "constructor", "method", "import"], b).reduce((f, {content:h, props:k, tag:l}) => {
    const {alias:m, aliases:n, ...p} = k;
    var q = m ? [m] : n ? n.split(/, */) : [];
    switch(l) {
      case "type":
        l = new Y;
        l.b(h, k, e, void 0);
        f.push(l);
        q.forEach(r => {
          const u = new Y;
          u.b(h, {...p, name:r}, e, void 0);
          f.push(u);
        });
        break;
      case "interface":
        k = Hb(h, k, e);
        k.forEach(r => {
          Gb(r);
          r.isInterface = !0;
        });
        f.push(...k);
        break;
      case "constructor":
        k = Hb(h, k, e);
        k.forEach(r => {
          Gb(r);
          r.isConstructor = !0;
        });
        f.push(...k);
        break;
      case "method":
        k = Hb(h, k, e, !0);
        f.push(...k);
        break;
      case "import":
        q = new Cb, q.b(h, k, k.ns || k.from, void 0), g.push(q);
    }
    return f;
  }, []);
  return {namespace:d, types:a, imports:g};
}, Jb = (a, b, c, d = !1) => {
  const e = d ? new Fb : new Y, g = a.search(/<(prop|function|fn|static) /);
  let f = "", h = a;
  1 != g && (f = a.slice(0, g), h = a.slice(g));
  const {B:k, G:l} = gb(f, void 0);
  e.b(d ? l : h, b, c, void 0);
  e.args = k;
  return e;
}, Hb = (a, b, c, d = !1) => {
  const e = [], {alias:g, aliases:f, ...h} = b;
  b = Jb(a, b, c, d);
  e.push(b);
  (g ? [g] : f ? f.split(/, */) : []).forEach(k => {
    k = Jb(a, {...h, name:k}, c, d);
    k.description = `${k.description}${k.description ? " " : ""}Alias of \`${h.name}\`.`;
    e.push(k);
  });
  return e;
}, Kb = async(a, b = []) => {
  const c = await F(a);
  let d, e, g;
  try {
    ({namespace:d = null, types:e, imports:g} = Ib(c));
  } catch (f) {
    throw f.message = `Error while reading ${a}\n${f.message}`, f;
  }
  e = e.filter(({fullName:f}) => b.includes(f) ? !1 : !0);
  g = g.filter(({fullName:f}) => b.includes(f) ? !1 : !0);
  return {types:e, imports:g, namespace:d};
};
const Lb = (a, b, c) => {
  b = b.map(d => d.f(!0, c));
  a = a.map(d => {
    d = d.f();
    return O(c ? d : P(d));
  });
  return [...b, ...a].join("");
}, Qb = (a, b, c, d = !1) => {
  a = [...a.map(e => {
    {
      let g;
      e.closureType ? g = ` * @typedef {${e.closureType}}` : e.F || (g = ` * @typedef {${Ab(e.properties, !0)}}`);
      g ? (e.description && (g = ` * ${e.description}\n${g}`), g = O(g), e = g += Q(e.namespace, e.name)) : e = wb(e);
    }
    return e;
  })].join("\n");
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const Sb = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, c) {
  const [d, ...e] = c.split(/\s+/), g = e.includes("closure"), f = e.includes("externs"), h = e.includes("noSuppress"), k = e.includes("skipNsDecl"), l = e.includes("namespace");
  let m = e.find(q => q.startsWith("ignore:"));
  m = m ? m.replace("ignore:", "").split(",") : [];
  let {u:n, w:p} = this.g;
  g && (n = !0);
  f && (p = !0);
  try {
    this.i("Detected type marker: %s", c);
    const {types:q, imports:r, namespace:u} = await Kb(d, m);
    this.emit("types", q);
    this.emit("types", r);
    let x;
    n ? x = Lb(r, q, h) : p ? (x = Qb(q, u, this.b, k) + "\n", u && this.emit("namespace", u)) : l ? (u && this.emit("namespace", u), x = Rb(r, q, !0)) : x = Rb(r, q);
    return `/* ${b} ${c} */\n${x}`;
  } catch (q) {
    return this.i("(%s) Could not process typedef-js: %s", c, q.message), process.env.b && console.error(q.stack), a;
  }
}}, Rb = (a, b, c = !1) => {
  b = b.map(d => d.f(!1, !1, c));
  a = a.map(d => d.f(c)).map(O).join("");
  b = b.join("");
  return `${a}${b}`.replace(Tb, " * @typedef");
}, Tb = / \*\/\n\/\*\*\n \* @typedef/g;
const Vb = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?.*)*)/gm, replacement:Ub};
function Ub(a, b, c, d, e, g, f) {
  const {u:h} = this.g;
  let k;
  g = () => {
    if (this.lines && this.file) {
      var m;
      {
        let q = m = 0;
        for (; q < f;) {
          q += this.lines[m].length, m++;
        }
        m = {line:m, K:b.length + 11};
      }
      const {line:n, K:p} = m;
      this.i("%s:%s:%s", this.file, n, p);
    }
  };
  try {
    k = U(c);
  } catch (m) {
    return this.i("Error while parsing the type %s", c), this.i(process.env.DEBUG ? m.stack : m.message), g(), a;
  }
  if (!k) {
    return this.i("Could not parse the type %s", c), g(), a;
  }
  const l = Object.values(this.types).map(({name:m, fullName:n}) => h ? n : m);
  if (!Z(k, l, this.i, c, g)) {
    return a;
  }
  c = Object.values(this.types).find(({name:m, fullName:n}) => h ? n == k.name : m == k.name);
  return !c || c instanceof Eb.Import ? a : c.A(e, d, b, k.nullable, h);
}
const Z = (a, b, c, d, e) => {
  if (a) {
    var g = a.name;
    if (!g || !"string number boolean null undefined symbol any".split(" ").includes(g)) {
      if (g && !a.application && !a.function) {
        let h = b.includes(g);
        h || (h = Wb.includes(g));
        if (h) {
          return !0;
        }
        c("Type %s%s was not found.", g, d != g ? ` in ${d}` : "");
        e();
      }
      var f = [b, c, d, e];
      a.application ? a.application.forEach(h => {
        Z(h, ...f);
      }) : a.record ? Object.keys(a.record).forEach(h => {
        Z(a.record[h], ...f);
      }) : a.union ? a.union.forEach(h => {
        Z(h, ...f);
      }) : a.function && (Z(a.function.this, ...f), Z(a.function.new, ...f), a.function.args.forEach(h => {
        Z(h, ...f);
      }), Z(a.function.variableArgs, ...f), Z(a.function.return, ...f));
    }
  }
}, Wb = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var Xb = (a, b = !1) => {
  var {M:c} = Ra();
  const d = Ta(c);
  c = Sa(c);
  return new Eb(b ? [Sb] : [Sb, d, Vb, c], a);
};
var Zb = async() => {
  const {u:a = !1, w:b = !1, o:c, types:d} = {u:ja, w:ka, o:ia, types:la};
  await Promise.all(y.map(async e => {
    var g = await H(z, e);
    let f;
    g.isFile() ? f = [e] : g.isDirectory() && (g = await J(e), f = K(g.content, e));
    await Yb(f, a, b, c, d);
  }));
};
const Yb = async(a, b = !1, c = !1, d = null, e = null) => {
  const g = [];
  e && await Promise.all(e.split(",").map(async f => {
    f = await F(f);
    const {types:h, imports:k} = Ib(f);
    g.push(h, k);
  }));
  await Promise.all(a.map(async f => {
    var h = await F(f);
    const k = Xb({u:b, w:c}, c);
    g.forEach(l => k.emit("types", l));
    k.file = f;
    k.i = console.error;
    k.lines = h.split("\n");
    k.end(h);
    h = await D(k);
    "-" == d ? console.log(h) : d ? await G(d, h) : await G(f, h);
  }));
};
const $b = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, ac = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, bc = "type opt name quote defaultValue description Default".split(" "), Xa = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), cc = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class dc extends A {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform({type:a, name:b, description:c, properties:d}, e, g) {
    a = a && a.startsWith("import") ? ec(a, b) : cc(a, b, c, d);
    this.push(a);
    d.forEach(({type:f, name:h, default:k, description:l, optional:m}) => {
      {
        f = ["string", "number", "boolean"].includes(f) ? ` ${f}` : ` type="${f}"`;
        var n = void 0 !== k;
        k = n ? ` default="${k}"` : "";
        m = m && !n ? " opt" : "";
        n = " ".repeat(4);
        const p = " ".repeat(6);
        h = `${n}<prop${m}${f} name="${h}"${k}${l ? `>\n${p}${l}\n${n}</prop>` : "/>"}\n`;
      }
      this.push(h);
    });
    d.length && this.push("  </type>\n");
    g();
  }
}
const ec = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class fc extends A {
  constructor() {
    super({objectMode:!0});
  }
  _transform([, a, b, c, d], e, g) {
    d = S(ac, d, bc).map(f => {
      const {defaultValue:h, Default:k, opt:l, name:m, type:n, ...p} = f;
      f = {...p, name:m, type:n, ...h ? {defaultValue:$b(h)} : {}, ...k ? {s:$b(k)} : {}, ...l ? {optional:!0} : {}};
      if (h || k) {
        if (h) {
          h !== k && void 0 !== f.s && (q = N(m, k, n), console.error("%s[%s] does not match Default `%s`.", b, q, f.s));
        } else {
          var q = N(m, k, n);
          console.error("%s[%s] got from Default.", b, q);
        }
        f.default = "defaultValue" in f ? f.defaultValue : f.s;
        delete f.defaultValue;
        delete f.s;
      }
      return f;
    });
    this.push({type:a, name:b, description:c, properties:d});
    g();
  }
}
async function gc(a) {
  const b = Wa(), c = new fc, d = new dc;
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
  ${(await D(d)).trim()}
</types>`;
}
;var hc = async() => {
  const {o:a} = {o:ia};
  await Promise.all(y.map(async b => {
    b = await F(b);
    b = await gc(b);
    a ? await G(a, b) : console.log(b);
  }));
};
const ic = /( *) \* @(fnType|methodType) {(.+?)}/gm;
class jc extends M {
  constructor(a, b) {
    super([{re:ic, async replacement(c, d, e, g) {
      const f = g.split(".");
      let h, k;
      if ("methodType" == e) {
        h = g;
      } else {
        if (2 == f.length) {
          [h, k] = f;
        } else {
          if (3 == f.length) {
            h = `${f[0]}.${f[1]}`, k = f[2];
          } else {
            throw Error("The @fnType should consist of _namespace.Type.propName or Type.propName");
          }
        }
      }
      g = a.find(({fullName:l}) => l == h);
      if (!g) {
        return console.error("Type %s in %s not found", h, b), c;
      }
      if ("constructor" == k || "methodType" == e) {
        return g.g(d).join("\n");
      }
      e = g.properties.find(({name:l}) => l == k);
      return e ? e.parsed ? pb(e, d) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", k, h, b), c) : (console.error("Property %s of type %s in %s not found", k, h, b), c);
    }}]);
  }
}
;const kc = async a => {
  if (!a) {
    return [];
  }
  const b = await H(z, a);
  if (b.isFile()) {
    var c = [a];
  } else {
    b.isDirectory() && (c = await J(a), c = K(c.content, a), c = c.filter(d => d.endsWith(".xml")));
  }
  return c;
}, lc = async a => (await Promise.all(a.map(async b => ({...await Kb(b), location:b})))).reduce((b, {imports:c, types:d}) => {
  b.push(...c);
  b.push(...d);
  return b;
}, []);
async function mc() {
  const {o:a, types:b} = {o:ma, types:la}, c = await kc(b), d = await lc(c);
  await Promise.all(y.map(async e => {
    var g = await H(z, e);
    let f;
    g.isFile() ? f = [e] : g.isDirectory() && (g = await J(e), f = K(g.content, e));
    await nc(f, d, a);
  }));
}
const nc = async(a, b = [], c = null) => {
  await Promise.all(a.map(async d => {
    var e = await F(d);
    const g = new jc(b, d);
    g.end(e);
    e = await D(g);
    "-" == c ? console.log(e) : c ? await G(c, e) : await G(d, e);
  }));
};
if (oa) {
  const a = ha();
  console.log(qa({usage:a, description:"Embeds and maintains Closure-compatible types JSDoc in\nJavaScript source code from an external types.xml file.", line:"typal source [--closure|externs] [--migrate] [-o output] [-hv]", example:"typal src/index.js -c"}));
  process.exit();
} else {
  pa && (console.log(require("../../package.json").version), process.exit());
}
(async() => {
  try {
    return na ? await hc() : ma ? await mc() : await Zb();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map