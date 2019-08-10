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
  return Object.keys(a).reduce(({m:e, ...f}, g) => {
    if (0 == e.length && d) {
      return {m:e, ...f};
    }
    const h = a[g];
    let k;
    if ("string" == typeof h) {
      ({value:k, argv:e} = da(e, g, h));
    } else {
      try {
        const {short:l, boolean:m, number:n, command:p, multiple:q} = h;
        p && q && c.length ? (k = c, d = !0) : p && c.length ? (k = c[0], d = !0) : {value:k, argv:e} = da(e, g, l, m, n);
      } catch (l) {
        return {m:e, ...f};
      }
    }
    return void 0 === k ? {m:e, ...f} : {m:e, ...f, [g]:k};
  }, {m:b});
}(fa), y = w.source, ia = w.output, ja = w.closure, ka = w.externs, la = w.types, ma = w.template, na = w.migrate, oa = w.help, pa = w.version;
function qa(a = {usage:{}}) {
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
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Da);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Da, (g, h) => g.replace(h, h.replace(Fa, "~"))) : f).join("\n");
};
function Ga(a, b, c = !1) {
  return function(d) {
    var e = Ba(arguments), {stack:f} = Error();
    const g = wa(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = B(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
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
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {O:e = C(!0), proxyError:f} = a || {}, g = (h, k) => e(k);
    super(d);
    this.b = [];
    this.M = new Promise((h, k) => {
      this.on("finish", () => {
        let l;
        b ? l = Buffer.concat(this.b) : l = this.b.join("");
        h(l);
        this.b = [];
      });
      this.once("error", l => {
        if (-1 == l.stack.indexOf("\n")) {
          g`${l}`;
        } else {
          const m = B(l.stack);
          l.stack = m;
          f && g`${l}`;
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
    return this.M;
  }
}
const D = async a => {
  ({f:a} = new Ia({rs:a, O:C(!0)}));
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
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
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
  return await new Promise((f, g) => {
    const h = (l, m) => l ? (l = d(l), g(l)) : f(c || m);
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
  Object.keys(a).forEach(f => {
    const {type:g} = a[f];
    "File" == g ? c.push(I(b, f)) : "Directory" == g && d.push(f);
  });
  const e = d.reduce((f, g) => {
    const {content:h} = a[g];
    g = K(h, I(b, g));
    return [...f, ...g];
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
    return b.filter(Na).reduce((d, {re:e, replacement:f}) => {
      if (this.j) {
        return d;
      }
      if ("string" == typeof f) {
        return d = d.replace(e, f);
      }
      {
        let g;
        return d.replace(e, (h, ...k) => {
          g = Error();
          try {
            return this.j ? h : f.call(this, h, ...k);
          } catch (l) {
            L(g, l);
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
  var a = {R:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
  return Object.keys(a).reduce((b, c) => {
    {
      var d = a[c];
      const {getReplacement:e = Qa, getRegex:f = Pa} = {}, g = f(c);
      d = {name:c, re:d, regExp:g, getReplacement:e, map:{}, lastIndex:0};
    }
    return {...b, [c]:d};
  }, {});
}, Sa = a => {
  var b = [];
  const {regExp:c, map:d} = a;
  return {re:c, replacement(e, f) {
    e = d[f];
    delete d[f];
    return Oa(e, Array.isArray(b) ? b : [b]);
  }};
}, Ta = a => {
  const {re:b, map:c, getReplacement:d, name:e} = a;
  return {re:b, replacement(f) {
    const {lastIndex:g} = a;
    c[g] = f;
    a.lastIndex += 1;
    return d(e, g);
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
        let f;
        const g = b.replace(c, (h, ...k) => {
          f = Error();
          try {
            if (this.j) {
              return e.length ? e.push(Promise.resolve(h)) : h;
            }
            const l = d.call(this, h, ...k);
            l instanceof Promise && e.push(l);
            return l;
          } catch (l) {
            L(f, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            L(f, h);
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
  const c = new A({transform(d, e, f) {
    let g;
    for (b += d.toString(); (d = a.exec(b)) && (c.push(d), g = d, a.global);) {
    }
    g && (b = b.slice(g.index + g[0].length));
    f();
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
}, Ya = ({number:a, L:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", Za = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, O = a => a ? `/**
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
    return c.map(f => f.replace(e, "")).join("\n");
  }
};
function S(a, b, c) {
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
  const c = (e = 1) => a[b + e], d = (e = !0, f = []) => {
    var g = {};
    let h = a[b];
    if (["nullable", "nonNullable"].includes(h)) {
      if (!e) {
        throw Error(`${h} not allowed after .`);
      }
      g.nullable = "nullable" === h;
      b++;
    }
    h = a[b];
    if ("(" == h) {
      b++;
      g = {...d(!0, []), ...g};
      if (")" != a[b]) {
        throw Error("Expecting closing )");
      }
      b++;
      if ("|" != a[b]) {
        return g;
      }
    } else {
      if ("{" == h) {
        b++;
        f = g;
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
        f.record = e;
        return g;
      }
    }
    if (["nonNullable", "nullable"].includes(h)) {
      throw Error("Nullability already defined.");
    }
    if (/[=),:.<>}|]/.test(h)) {
      throw Error(`Unexpected token ${h}.`);
    }
    "|" != a[b] && (g.name = a[b], b++);
    if ("function" == h) {
      l = g;
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
        l = g;
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
      g.name += ".";
      b++;
      ({name:l} = d(!1));
      if (!l) {
        throw Error("Expected to see the name after .");
      }
      g.name += l;
    }
    if ("|" != a[b] || !e) {
      return g;
    }
    for (f.push(g); "|" == a[b];) {
      b++, g = d(!0, f), g.union !== f && f.push(g);
    }
    return {union:f};
  };
  return d();
}
;function U(a) {
  a = cb(a);
  return db(a);
}
;function eb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h}, k) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = R(b));
  b = Ya({number:g, L:d, boolean:e, type:h});
  k && (b = b.replace(new RegExp(`([!?])?${k}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), f = !0);
  a.type = b;
  f && (a.optional = !0);
}
class fb {
  constructor() {
    this.name = null;
    this.type = "";
    this.optional = !1;
    this.description = "";
  }
  get F() {
    return this.optional ? `${this.type}=` : this.type;
  }
}
const gb = (a, b) => {
  let c = a.lastIndexOf("</arg>"), d = a;
  var e = [];
  -1 != c && (c += 6, e = a.slice(0, c), d = a.slice(c), e = T("arg", e), e = e.map(({content:f, props:g}) => {
    const h = new fb;
    eb(h, f, g, b);
    return h;
  }));
  return {I:d, D:e};
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
      let f = V(e);
      e.optional && (f += "=");
      d.push(f);
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
function ib(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h, "default":k, closure:l, alias:m, aliases:n, noParams:p, "static":q, initial:r}) {
  if (!c) {
    throw Error("Property does not have a name.");
  }
  a.name = c;
  b && (a.description = R(b));
  b = Ya({number:g, L:d, boolean:e, type:h});
  p && (a.l = p);
  l && (a.g = l);
  a.type = b;
  void 0 !== k ? a.default = k : void 0 !== r && (a.default = r);
  if (f || void 0 !== k) {
    a.optional = !0;
  }
  m && (a.o = [m]);
  n && (a.o = n.split(/\s*,\s*/));
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
  const b = [], {function:{args:c, return:d}} = a.parsed;
  c.map(e => V(e)).forEach((e, f) => {
    const {optional:g} = c[f], {name:h = `arg${f}`, description:k} = a.args[f] || {};
    b.push(` * @param {${e}${g ? "=" : ""}} ${g ? `[${h}]` : h}${k ? ` ${k}` : ""}`);
  });
  if (d && "void" != d.name) {
    const e = V(d);
    b.push(` * @return {${e}}`);
  }
  return b;
}
function ob(a) {
  if (a.isParsedFunction) {
    const {function:{args:b}} = a.parsed;
    return ` = function(${b.map((c, d) => {
      ({name:c = `arg${d}`} = a.args[d] || {});
      return c;
    }).join(", ")}) {}`;
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
    this.o = [];
    this.l = !1;
    this.parsed = null;
    this.args = a;
    this.isConstructor = this.b = !1;
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    const {function:{args:b, return:c}} = this.parsed, d = b.map(f => a(f)).map((f, g) => {
      const {name:h, optional:k} = b[g];
      let {name:l = `arg${g}`, type:m = h, optional:n = k} = this.args[g] || {};
      return `${`${l}${n ? "?" : ""}`}${m ? `: ${f}` : ""}`;
    }).join(", "), e = c ? a(c) : "?";
    return `(${d}) => ${e}`;
  }
  get K() {
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
  C(a, b = "", c = !1) {
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
  var {P:d = !0} = c;
  let e = "";
  var f = "";
  a.nullable ? f = "?" : !1 === a.nullable && (f = "!");
  if (a.function) {
    e = e + f + (a.name + "(");
    const g = [];
    a.function.this && (d = "this: " + W(a.function.this, b, c), g.push(d));
    a.function.new && (d = "new: " + W(a.function.new, b, c), g.push(d));
    a.function.args.forEach(h => {
      let k = W(h, b, c);
      h.optional && (k += "=");
      g.push(k);
    });
    a.function.variableArgs && (d = "..." + W(a.function.variableArgs, b, c), g.push(d));
    d = g.join(", ");
    e += d + ")";
    a.function.return && (e += ": " + W(a.function.return, b, c));
  } else {
    a.record ? (e += "{ ", d = Object.keys(a.record).map(g => {
      var h = a.record[g];
      if (!h) {
        return g;
      }
      h = W(h, b, c);
      return `${g}: ${h}`;
    }), e += d.join(", "), e += " }") : a.application ? (e += sb(a.name, b, f, c) + "&lt;", d = a.application.map(g => W(g, b, c)), e += d.join(", "), e += "&gt;") : a.union ? (e = e + f + "(", f = a.union.map(g => W(g, b, c)), e += f.join(d ? " \\| " : " | "), e += ")") : e += sb("any" == a.name ? "*" : a.name, b, f, c);
  }
  return e;
}, sb = (a, b, c = "", d = {}) => {
  const {flatten:e = !1, S:f, link:g = ({link:l}) => `#${l}`} = d;
  d = tb(b, a);
  c = `${c}${a}`;
  if (!d) {
    return c;
  }
  let {link:h, type:{description:k}} = d;
  h = g(d);
  e && ((b = b.find(({fullName:l}) => l == a)) && b.link && (h = b.link), !k && b.description && (k = b.description), "function" == typeof e && e(a));
  b = f ? f(c) : c;
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
  const {narrow:e = !1, flatten:f = !1, preprocessDesc:g, link:h} = d;
  if (!b.length) {
    return "";
  }
  const k = a.isConstructor || a.isInterface, l = b.some(({hasDefault:p}) => p), m = {flatten:f, P:!e, link:h}, n = p => X(c, p, m);
  a = b.map(p => {
    let q;
    p.args && p.isParsedFunction ? (q = p.toTypeScriptFunction(n), p.isConstructor && (q = `new ${q}`)) : q = X(c, p.parsed || p.type, m);
    const r = k || p.optional ? p.name : `${p.name}*`, u = p.hasDefault ? `\`${p.default}\`` : "-", x = g ? g(p.description) : p.description;
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
  b += Q(a.namespace, a.name, a.constr);
  const c = a.properties.reduce((d, e) => {
    d.push(e);
    const f = e.o.map(g => qb(e, g));
    d.push(...f);
    return d;
  }, []).filter(({isConstructor:d}) => !d).map(d => {
    let e = pb(d);
    e = O(e);
    e += Q(`${a.fullName}${d.K ? "" : ".prototype"}`, d.name);
    return e += ob(d);
  });
  return [b, ...c].join("\n");
}
function xb(a, b = !1) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return b ? `${a.ns}${c}` : c;
}
function yb(a, b = !1, c = !1, d = b) {
  d = ` * @typedef {${(b ? a.closureType : a.type) || a.G()}}${` ${xb(a, d)}${a.h}`}`;
  a = (a.properties ? a.properties.reduce((e, f) => {
    if (f.b) {
      return e;
    }
    e.push(f);
    const g = f.o.map(h => qb(f, h));
    e.push(...g);
    return e;
  }, []) : []).map(e => lb(e, b));
  a = [d, ...a].join("\n");
  b && !c && (a = P(a));
  return a = O(a);
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
  b(a, {name:b, type:c, desc:d, noToc:e, spread:f, noExpand:g, link:h, closure:k, constructor:l, "extends":m, "interface":n, record:p}, q, r = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    c && (this.type = c);
    k ? this.closureType = k : this.closureType = this.type;
    d && (this.description = R(d));
    this.noToc = !!e;
    this.spread = !!f;
    this.noExpand = !!g;
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
        const {I:Lb, D:ya} = gb(t, r), {async:za, "void":Mb, "return":Nb = Mb ? "void" : "", ...Aa} = v;
        ({args:v = ""} = v);
        v || (v = ya.map(({F:Ob}) => Ob).join(","));
        t = Nb.replace(/\n\s*/g, " ");
        za && t ? t = `!Promise<${t}>` : za && (t = "!Promise");
        v = `function(${v})`;
        t && (v += `: ${t}`);
        Aa.type = v;
        t = new rb(ya);
        ib(t, Lb, Aa);
        E && (t.b = !0);
        return t;
      });
      a = [...b, ...a];
      const {J:u, n:x} = a.reduce((t, v) => {
        v.K ? t.J.push(v) : t.n.push(v);
        return t;
      }, {J:[], n:[]});
      this.properties = [...u, ...x];
    }
    q && (this.namespace = q);
  }
  get H() {
    return this.isConstructor || this.isInterface || this.isRecord;
  }
  G() {
    return "Object";
  }
  get h() {
    return `${this.tag ? ` \`\uff20${this.tag}\`` : ""}${this.description ? ` ${this.description}` : ""}`;
  }
  f(a = !1, b = !1, c = a) {
    const d = !!this.extends, e = yb(this, a, b, c), f = [];
    if (this.namespace && a) {
      var g = ` * @typedef {${this.fullName}} ${this.name}${this.h}`;
      a && !b && (g = P(g));
      g = O(g);
      f.push(g);
    } else {
      this.namespace && c && (g = ` * @typedef {${this.fullName}} ${this.name}${this.h}`, g = O(g), f.push(g));
    }
    d && (c = ` * @typedef {${this.extends} & ${xb(this, c)}} ${c ? this.fullName : this.name}${this.h}`, a && !b && (c = P(c)), c = O(c), f.push(c));
    f.push(e);
    return f.join("");
  }
  get T() {
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
      let {name:e, description:f, optional:g, type:h} = d;
      e.startsWith("...") && (e = e.slice(3), h = `...${h}`);
      c.push(` * @param {${h}${g ? "=" : ""}} ${g ? `[${e}]` : e}${f ? ` ${f}` : ""}`);
    });
    b && c.push(` * @${this.T}`);
    a && (c = c.map(d => `${a}${d}`));
    return c;
  }
  get constr() {
    return this.args ? `function(${this.args.map(({name:a}) => a).join(", ")}) {}` : null;
  }
  get ns() {
    return this.namespace ? `${this.namespace}.` : "";
  }
  get fullName() {
    return `${this.ns}${this.name}`;
  }
  C(a, b, c, d, e = !1) {
    var f = "";
    !0 === d ? f = "?" : !1 === d && (f = "!");
    d = this.description ? ` ${this.description}` : "";
    const g = this.spread ? zb(this.properties) : e ? this.fullName : this.name;
    b = `${c || ""} * @param {${f}${g}} ${b ? `[${a}]` : a}${d}`;
    f = this.properties && !this.noExpand ? this.properties.map(h => h.C(a, c, e)) : [];
    return [b, ...f].join("\n");
  }
  toMarkdown(a = [], b = {}) {
    const {narrow:c, flatten:d, preprocessDesc:e, link:f, details:g = []} = b, h = g.includes(this.name);
    var k = this.type ? `\`${this.type}\`` : "", l = k, m = !1;
    this.link ? l = `[${k}](${this.link})` : !this.import && this.type && (l = X(a, this.type, b), m = l != this.type, l = Ab(l, m));
    b = Ab(this.fullName);
    b = this.import ? `[${b}](l-type)` : this.noToc ? `[${b}](l-type)` : `[${b}](t-type)`;
    k = this.description ? `: ${this.description}` : "";
    l = l ? `${l} ` : "";
    m = /_/.test(b);
    if (this.extends) {
      let p = `\`${this.extends}\``;
      var n = a.find(({fullName:q}) => q == this.extends);
      n && n.link ? (p = "<a ", n.description && (p += `title="${n.description}" `), p += `href="${n.link}">\`${this.extends}\`</a>`) : (n = X(a, this.extends, {flatten:d, S(q) {
        return `\`${q}\``;
      }, link:f}), this.extends != n && (p = n));
      n = ` extends ${p}`;
      m = m || /_/.test(p);
      l = (m ? l + "<strong>" : l + "__") + (b + n);
      "function" == typeof d && d(this.extends);
    } else {
      l = (m ? l + "<strong>" : l + "__") + b;
    }
    l = (m ? l + "</strong>" : l + "__") + k;
    a = ub(this, this.properties, a, {narrow:c, flatten:d, preprocessDesc:e, link:f});
    return {LINE:l, table:a, displayInDetails:h};
  }
}
const Ab = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`, zb = (a = [], b = !1) => {
  a = a.reduce((c, d) => {
    c.push(d);
    const e = d.o.map(f => ({...d, name:f}));
    c.push(...e);
    return c;
  }, []);
  return `{ ${a.map(c => {
    const d = b ? c.closureType : c.type;
    let e = c.name, f = d;
    c.optional && !b ? e = `${c.name}?` : c.optional && b && (f = `(${Za(d)})`);
    return `${e}: ${f}`;
  }).join(", ")} }`;
};
class Bb extends Y {
  constructor() {
    super();
    this.from = "";
  }
  get import() {
    return !0;
  }
  b(a, {from:b, name:c, ...d}, e, f) {
    if (!b) {
      throw Error("From attribute of import is not given.");
    }
    this.from = b;
    this.description = R(a);
    super.b("", {...d, noToc:!0, name:c, type:`import('${b}').${c}`}, e != f ? e : null);
  }
  f(a = !0) {
    return ` * @typedef {import('${this.from}').${this.name}} ${a ? this.fullName : this.name}`;
  }
}
;function Cb(a, b) {
  b = b.reduce((c, d) => ({...c, [d.fullName]:d}), {});
  a.w = {...a.w, ...b};
}
class Db extends M {
  constructor(a, b = {}) {
    super(a);
    this.w = {};
    this.on("types", c => {
      Cb(this, c);
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
    return Bb;
  }
  get types() {
    return this.w;
  }
}
;class Eb extends Y {
  constructor() {
    super();
    this.B = null;
    this.l = !1;
  }
  get H() {
    return !0;
  }
  b(a, {async:b, "return":c, ...d}, ...e) {
    this.description = R(a);
    super.b("", d, ...e);
    c && (this.B = c);
    b && (this.l = !0);
  }
  get return() {
    return this.B || "void";
  }
  g(a = "") {
    const b = super.g(a, !1);
    let c;
    this.B && (c = this.return);
    this.l && c ? c = `Promise<${c}>` : this.l && (c = "Promise");
    c && b.push(`${a} * @return {${c}}`);
    return b;
  }
  G() {
    return `(${this.args.map(({name:a, type:b, optional:c}) => `${a}${c ? "?" : ""}: ${b}`).join(", ")}) => ${this.return}`;
  }
}
;const Fb = a => {
  if (a.args && a.args.length) {
    var b = `function(${a.args.map(({F:d}) => d).join(", ")}): ${a.fullName}`, c = new rb(a.args);
    c.isConstructor = !0;
    ib(c, "Constructor method.", {type:b, name:"constructor"});
    hb(c, void 0);
    a.properties.unshift(c);
  }
}, Hb = a => {
  a = T("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:b, props:{namespace:c, ns:d = c}}] = a, e = void 0 == d ? void 0 : d, f = [];
  a = T(["type", "interface", "constructor", "method", "import"], b).reduce((g, {content:h, props:k, tag:l}) => {
    const {alias:m, aliases:n, ...p} = k;
    var q = m ? [m] : n ? n.split(/, */) : [];
    switch(l) {
      case "type":
        l = new Y;
        l.b(h, k, e, void 0);
        g.push(l);
        q.forEach(r => {
          const u = new Y;
          u.b(h, {...p, name:r}, e, void 0);
          g.push(u);
        });
        break;
      case "interface":
        k = Gb(h, k, e);
        k.forEach(r => {
          Fb(r);
          r.isInterface = !0;
        });
        g.push(...k);
        break;
      case "constructor":
        k = Gb(h, k, e);
        k.forEach(r => {
          Fb(r);
          r.isConstructor = !0;
        });
        g.push(...k);
        break;
      case "method":
        k = Gb(h, k, e, !0);
        g.push(...k);
        break;
      case "import":
        q = new Bb, q.b(h, k, k.ns || k.from, void 0), f.push(q);
    }
    return g;
  }, []);
  return {namespace:d, types:a, imports:f};
}, Ib = (a, b, c, d = !1) => {
  const e = d ? new Eb : new Y, f = a.search(/<(prop|function|fn|static) /);
  let g = "", h = a;
  1 != f && (g = a.slice(0, f), h = a.slice(f));
  const {D:k, I:l} = gb(g, void 0);
  e.b(d ? l : h, b, c, void 0);
  e.args = k;
  return e;
}, Gb = (a, b, c, d = !1) => {
  const e = [], {alias:f, aliases:g, ...h} = b;
  b = Ib(a, b, c, d);
  e.push(b);
  (f ? [f] : g ? g.split(/, */) : []).forEach(k => {
    k = Ib(a, {...h, name:k}, c, d);
    k.description = `${k.description}${k.description ? " " : ""}Alias of \`${h.name}\`.`;
    e.push(k);
  });
  return e;
}, Jb = async(a, b = []) => {
  const c = await F(a);
  let d, e, f;
  try {
    ({namespace:d = null, types:e, imports:f} = Hb(c));
  } catch (g) {
    throw g.message = `Error while reading ${a}\n${g.message}`, g;
  }
  e = e.filter(({fullName:g}) => b.includes(g) ? !1 : !0);
  f = f.filter(({fullName:g}) => b.includes(g) ? !1 : !0);
  return {types:e, imports:f, namespace:d};
};
const Kb = (a, b, c) => {
  b = b.map(d => d.f(!0, c));
  a = a.map(d => {
    d = d.f();
    return O(c ? d : P(d));
  });
  return [...b, ...a].join("");
}, Pb = (a, b, c, d = !1) => {
  a = [...a.map(e => {
    {
      let f;
      e.closureType ? f = ` * @typedef {${e.closureType}}` : e.H || (f = ` * @typedef {${zb(e.properties, !0)}}`);
      f ? (e.description && (f = ` * ${e.description}\n${f}`), f = O(f), e = f += Q(e.namespace, e.name)) : e = wb(e);
    }
    return e;
  })].join("\n");
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const Rb = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, c) {
  const [d, ...e] = c.split(/\s+/), f = e.includes("closure"), g = e.includes("externs"), h = e.includes("noSuppress"), k = e.includes("skipNsDecl"), l = e.includes("namespace");
  let m = e.find(q => q.startsWith("ignore:"));
  m = m ? m.replace("ignore:", "").split(",") : [];
  let {v:n, A:p} = this.g;
  f && (n = !0);
  g && (p = !0);
  try {
    this.i("Detected type marker: %s", c);
    const {types:q, imports:r, namespace:u} = await Jb(d, m);
    this.emit("types", q);
    this.emit("types", r);
    let x;
    n ? x = Kb(r, q, h) : p ? (x = Pb(q, u, this.b, k) + "\n", u && this.emit("namespace", u)) : l ? (u && this.emit("namespace", u), x = Qb(r, q, !0)) : x = Qb(r, q);
    return `/* ${b} ${c} */\n${x}`;
  } catch (q) {
    return this.i("(%s) Could not process typedef-js: %s", c, q.message), process.env.b && console.error(q.stack), a;
  }
}}, Qb = (a, b, c = !1) => {
  b = b.map(d => d.f(!1, !1, c));
  a = a.map(d => d.f(c)).map(O).join("");
  b = b.join("");
  return `${a}${b}`.replace(Sb, " * @typedef");
}, Sb = / \*\/\n\/\*\*\n \* @typedef/g;
const Ub = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?.*)*)/gm, replacement:Tb};
function Tb(a, b, c, d, e, f, g) {
  const {v:h} = this.g;
  let k;
  f = () => {
    if (this.lines && this.file) {
      var m;
      {
        let q = m = 0;
        for (; q < g;) {
          q += this.lines[m].length, m++;
        }
        m = {line:m, N:b.length + 11};
      }
      const {line:n, N:p} = m;
      this.i("%s:%s:%s", this.file, n, p);
    }
  };
  try {
    k = U(c);
  } catch (m) {
    return this.i("Error while parsing the type %s", c), this.i(process.env.DEBUG ? m.stack : m.message), f(), a;
  }
  if (!k) {
    return this.i("Could not parse the type %s", c), f(), a;
  }
  const l = Object.values(this.types).map(({name:m, fullName:n}) => h ? n : m);
  if (!Z(k, l, this.i, c, f)) {
    return a;
  }
  c = Object.values(this.types).find(({name:m, fullName:n}) => h ? n == k.name : m == k.name);
  return !c || c instanceof Db.Import ? a : c.C(e, d, b, k.nullable, h);
}
const Z = (a, b, c, d, e) => {
  if (a) {
    var f = a.name;
    if (!f || !"string number boolean null undefined symbol any".split(" ").includes(f)) {
      if (f && !a.application && !a.function) {
        let h = b.includes(f);
        h || (h = Vb.includes(f));
        if (h) {
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
}, Vb = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var Wb = (a, b = !1) => {
  var {R:c} = Ra();
  const d = Ta(c);
  c = Sa(c);
  return new Db(b ? [Rb] : [Rb, d, Ub, c], a);
};
var Yb = async() => {
  const {v:a = !1, A:b = !1, s:c, types:d} = {v:ja, A:ka, s:ia, types:la};
  await Promise.all(y.map(async e => {
    var f = await H(z, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await J(e), g = K(f.content, e));
    await Xb(g, a, b, c, d);
  }));
};
const Xb = async(a, b = !1, c = !1, d = null, e = null) => {
  const f = [];
  e && await Promise.all(e.split(",").map(async g => {
    g = await F(g);
    const {types:h, imports:k} = Hb(g);
    f.push(h, k);
  }));
  await Promise.all(a.map(async g => {
    var h = await F(g);
    const k = Wb({v:b, A:c}, c);
    f.forEach(l => k.emit("types", l));
    k.file = g;
    k.i = console.error;
    k.lines = h.split("\n");
    k.end(h);
    h = await D(k);
    "-" == d ? console.log(h) : d ? await G(d, h) : await G(g, h);
  }));
};
const Zb = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, $b = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, ac = "type opt name quote defaultValue description Default".split(" "), Xa = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), bc = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class cc extends A {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform({type:a, name:b, description:c, properties:d}, e, f) {
    a = a && a.startsWith("import") ? dc(a, b) : bc(a, b, c, d);
    this.push(a);
    d.forEach(({type:g, name:h, default:k, description:l, optional:m}) => {
      {
        g = ["string", "number", "boolean"].includes(g) ? ` ${g}` : ` type="${g}"`;
        var n = void 0 !== k;
        k = n ? ` default="${k}"` : "";
        m = m && !n ? " opt" : "";
        n = " ".repeat(4);
        const p = " ".repeat(6);
        h = `${n}<prop${m}${g} name="${h}"${k}${l ? `>\n${p}${l}\n${n}</prop>` : "/>"}\n`;
      }
      this.push(h);
    });
    d.length && this.push("  </type>\n");
    f();
  }
}
const dc = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class ec extends A {
  constructor() {
    super({objectMode:!0});
  }
  _transform([, a, b, c, d], e, f) {
    d = S($b, d, ac).map(g => {
      const {defaultValue:h, Default:k, opt:l, name:m, type:n, ...p} = g;
      g = {...p, name:m, type:n, ...h ? {defaultValue:Zb(h)} : {}, ...k ? {u:Zb(k)} : {}, ...l ? {optional:!0} : {}};
      if (h || k) {
        if (h) {
          h !== k && void 0 !== g.u && (q = N(m, k, n), console.error("%s[%s] does not match Default `%s`.", b, q, g.u));
        } else {
          var q = N(m, k, n);
          console.error("%s[%s] got from Default.", b, q);
        }
        g.default = "defaultValue" in g ? g.defaultValue : g.u;
        delete g.defaultValue;
        delete g.u;
      }
      return g;
    });
    this.push({type:a, name:b, description:c, properties:d});
    f();
  }
}
async function fc(a) {
  const b = Wa(), c = new ec, d = new cc;
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
;var gc = async() => {
  const {s:a} = {s:ia};
  await Promise.all(y.map(async b => {
    b = await F(b);
    b = await fc(b);
    a ? await G(a, b) : console.log(b);
  }));
};
const hc = /( *) \* @(fnType|methodType) {(.+?)}/gm;
class ic extends M {
  constructor(a, b) {
    super([{re:hc, async replacement(c, d, e, f) {
      const g = f.split(".");
      let h, k;
      if ("methodType" == e) {
        h = f;
      } else {
        if (2 == g.length) {
          [h, k] = g;
        } else {
          if (3 == g.length) {
            h = `${g[0]}.${g[1]}`, k = g[2];
          } else {
            throw Error("The @fnType should consist of _namespace.Type.propName or Type.propName");
          }
        }
      }
      f = a.find(({fullName:l}) => l == h);
      if (!f) {
        return console.error("Type %s in %s not found", h, b), c;
      }
      if ("constructor" == k || "methodType" == e) {
        return f.g(d).join("\n");
      }
      e = f.properties.find(({name:l}) => l == k);
      return e ? e.parsed ? pb(e, d) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", k, h, b), c) : (console.error("Property %s of type %s in %s not found", k, h, b), c);
    }}]);
  }
}
;const jc = async a => {
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
}, kc = async a => (await Promise.all(a.map(async b => ({...await Jb(b), location:b})))).reduce((b, {imports:c, types:d}) => {
  b.push(...c);
  b.push(...d);
  return b;
}, []);
async function lc() {
  const {s:a, types:b} = {s:ma, types:la}, c = await jc(b), d = await kc(c);
  await Promise.all(y.map(async e => {
    var f = await H(z, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await J(e), g = K(f.content, e));
    await mc(g, d, a);
  }));
}
const mc = async(a, b = [], c = null) => {
  await Promise.all(a.map(async d => {
    var e = await F(d);
    const f = new ic(b, d);
    f.end(e);
    e = await D(f);
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
    return na ? await gc() : ma ? await lc() : await Yb();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map