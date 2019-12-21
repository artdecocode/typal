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
  const g = c ? new RegExp(`^-(${c}|-${b})$`) : new RegExp(`^--${b}$`);
  b = a.findIndex(f => g.test(f));
  if (-1 == b) {
    return {argv:a};
  }
  if (d) {
    return {value:!0, index:b, length:1};
  }
  d = a[b + 1];
  if (!d || "string" == typeof d && d.startsWith("--")) {
    return {argv:a};
  }
  e && (d = parseInt(d, 10));
  return {value:d, index:b, length:2};
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
const fa = {source:{description:"The path to the source file or directory with files to embed types into. Can specify multiple values, e.g., `typal types/index.js types/vendor.js`.", command:!0, multiple:!0}, output:{description:"The destination where to save output.\nIf not passed, the file will be overwritten.\nIf `-` is passed, prints to stdout.", short:"o"}, closure:{description:"Whether to generate types in _Closure_ mode.", boolean:!0, short:"c"}, useNamespace:{description:"Generate JSDoc for functions using namespaces.", 
boolean:!0, short:"u"}, externs:{description:"Whether to generate externs for _GCC_.", boolean:!0, short:"e"}, types:{description:"Comma-separated location of files to read types from.", short:"t"}, template:{description:"Scans the input file for `@type` comment in functions' JSDoc, and inserts the annotations from types' files.", short:"T"}, migrate:{description:"Extracts types from JavaScript source code and saves them\ninto the types.xml file specified in the output option.", boolean:!0, short:"m"}, 
help:{description:"Print the help information and exit.", boolean:!0, short:"h"}, version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, v = function(a = {}, b = process.argv) {
  let [, , ...c] = b;
  const d = ea(c);
  c = c.slice(d.length);
  a = Object.entries(a).reduce((f, [h, k]) => {
    f[h] = "string" == typeof k ? {short:k} : k;
    return f;
  }, {});
  const e = [];
  a = Object.entries(a).reduce((f, [h, k]) => {
    let l;
    try {
      const m = k.short, n = k.boolean, q = k.number, p = k.command, r = k.multiple;
      if (p && r && d.length) {
        l = d;
      } else {
        if (p && d.length) {
          l = d[0];
        } else {
          const t = da(c, h, m, n, q);
          ({value:l} = t);
          const u = t.index, w = t.length;
          void 0 !== u && w && e.push({index:u, length:w});
        }
      }
    } catch (m) {
      return f;
    }
    return void 0 === l ? f : {...f, [h]:l};
  }, {});
  let g = c;
  e.forEach(({index:f, length:h}) => {
    Array.from({length:h}).forEach((k, l) => {
      g[f + l] = null;
    });
  });
  g = g.filter(f => null !== f);
  Object.assign(a, {Y:g});
  return a;
}(fa), x = v.source, y = v.output, ia = v.closure, ja = v.useNamespace, ka = v.externs, la = v.types, ma = v.template, na = v.migrate, oa = v.help, pa = v.version;
function qa(a = {usage:{}}) {
  const {usage:b = {}, description:c, line:d, example:e} = a;
  a = Object.keys(b);
  const g = Object.values(b), [f] = a.reduce(([l = 0, m = 0], n) => {
    const q = b[n].split("\n").reduce((p, r) => r.length > p ? r.length : p, 0);
    q > m && (m = q);
    n.length > l && (l = n.length);
    return [l, m];
  }, []), h = (l, m) => {
    m = " ".repeat(m - l.length);
    return `${l}${m}`;
  };
  a = a.reduce((l, m, n) => {
    n = g[n].split("\n");
    m = h(m, f);
    const [q, ...p] = n;
    m = `${m}\t${q}`;
    const r = h("", f);
    n = p.map(t => `${r}\t${t}`);
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
;const ra = fs.createReadStream, sa = fs.createWriteStream, z = fs.lstat, ta = fs.readFileSync, ua = fs.readdir;
var va = stream;
const A = stream.Transform, wa = stream.Writable;
const xa = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, ya = (a, b = !1) => xa(a, 2 + (b ? 1 : 0)), za = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const Aa = os.homedir;
const Ca = /\s+at.*(?:\(|\s)(.*)\)?/, Da = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ea = Aa(), B = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Da.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(g => {
    g = g.match(Ca);
    if (null === g || !g[1]) {
      return !0;
    }
    g = g[1];
    return g.includes(".app/Contents/Resources/electron.asar") || g.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(g);
  }).filter(g => g.trim()).map(g => b ? g.replace(Ca, (f, h) => f.replace(h, h.replace(Ea, "~"))) : g).join("\n");
};
function Fa(a, b, c = !1) {
  return function(d) {
    var e = za(arguments), {stack:g} = Error();
    const f = xa(g, 2, !0), h = (g = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [f, b]].join("\n");
    e = B(e);
    return Object.assign(g ? d : Error(), {message:h, stack:e});
  };
}
;function C(a) {
  var {stack:b} = Error();
  const c = za(arguments);
  b = ya(b, a);
  return Fa(c, b, a);
}
;const Ga = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ha extends wa {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {R:e = C(!0), proxyError:g} = a || {}, f = (h, k) => e(k);
    super(d);
    this.b = [];
    this.N = new Promise((h, k) => {
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
      c && Ga(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.b.push(a);
    c();
  }
  get f() {
    return this.N;
  }
}
const D = async a => {
  ({f:a} = new Ha({rs:a, R:C(!0)}));
  return await a;
};
async function E(a) {
  a = ra(a);
  return await D(a);
}
;async function F(a, b) {
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
;function Ia(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function G(a, b, c) {
  const d = C(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const e = a.length;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((g, f) => {
    const h = (l, m) => l ? (l = d(l), f(l)) : g(c || m);
    let k = [h];
    Array.isArray(b) ? (b.forEach((l, m) => {
      Ia(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (Ia(e, 0), k = [b, h]);
    a(...k);
  });
}
;const Ja = path.dirname, H = path.join, Ka = path.relative, La = path.resolve;
async function Ma(a, b) {
  b = b.map(async c => {
    const d = H(a, c);
    return {lstat:await G(z, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Na = a => a.lstat.isDirectory(), Oa = a => !a.lstat.isDirectory();
async function I(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  const {ignore:b = []} = {};
  if (!(await G(z, a)).isDirectory()) {
    var c = Error("Path is not a directory");
    c.code = "ENOTDIR";
    throw c;
  }
  c = await G(ua, a);
  var d = await Ma(a, c);
  c = d.filter(Na);
  d = d.filter(Oa).reduce((e, g) => {
    var f = g.lstat.isDirectory() ? "Directory" : g.lstat.isFile() ? "File" : g.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...e, [g.relativePath]:{type:f}};
  }, {});
  c = await c.reduce(async(e, {path:g, relativePath:f}) => {
    const h = Ka(a, g);
    if (b.includes(h)) {
      return e;
    }
    e = await e;
    g = await I(g);
    return {...e, [f]:g};
  }, {});
  return {content:{...d, ...c}, type:"Directory"};
}
const J = (a, b) => {
  let c = [], d = [];
  Object.keys(a).forEach(g => {
    const {type:f} = a[g];
    "File" == f ? c.push(H(b, g)) : "Directory" == f && d.push(g);
  });
  const e = d.reduce((g, f) => {
    const {content:h} = a[f];
    f = J(h, H(b, f));
    return [...g, ...f];
  }, []);
  return [...c, ...e];
};
function Pa(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const b = a.re instanceof RegExp;
  a = -1 != ["string", "function"].indexOf(typeof a.replacement);
  return b && a;
}
const K = (a, b) => {
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
function Qa(a, b) {
  function c() {
    return b.filter(Pa).reduce((d, {re:e, replacement:g}) => {
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
            K(f, l);
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
;const Ra = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Sa = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, Ta = () => {
  var a = {S:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
  return Object.keys(a).reduce((b, c) => {
    {
      var d = a[c];
      const {getReplacement:e = Sa, getRegex:g = Ra} = {}, f = g(c);
      d = {name:c, re:d, regExp:f, getReplacement:e, map:{}, lastIndex:0};
    }
    return {...b, [c]:d};
  }, {});
}, Ua = a => {
  var b = [];
  const c = a.map;
  return {re:a.regExp, replacement(d, e) {
    d = c[e];
    delete c[e];
    return Qa(d, Array.isArray(b) ? b : [b]);
  }};
}, Va = a => {
  const b = a.map, c = a.getReplacement, d = a.name;
  return {re:a.re, replacement(e) {
    const g = a.lastIndex;
    b[g] = e;
    a.lastIndex += 1;
    return c(d, g);
  }};
};
async function Wa(a, b) {
  return Xa(a, b);
}
class L extends A {
  constructor(a, b) {
    super(b);
    this.g = (Array.isArray(a) ? a : [a]).filter(Pa);
    this.j = !1;
    this.h = b;
  }
  async replace(a, b) {
    const c = new L(this.g, this.h);
    b && Object.assign(c, b);
    a = await Wa(c, a);
    c.j && (this.j = !0);
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  async reduce(a) {
    return await this.g.reduce(async(b, {re:c, replacement:d}) => {
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
            K(g, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            K(g, h);
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
async function Xa(a, b) {
  b instanceof va ? b.pipe(a) : a.end(b);
  return await D(a);
}
;function Ya() {
  var a = Za;
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
;const M = (a, b, c, d) => {
  if (!a) {
    throw Error("The name of the property is not given");
  }
  a = `${d ? `${d}.` : ""}${a}`;
  if (null === b) {
    return a;
  }
  b = Number.isInteger(b) || [!0, !1, "null"].includes(b) || ["number", "boolean"].includes(c) ? b : `"${b}"`;
  return `${a}=${b}`;
}, $a = ({number:a, L:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", ab = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, N = a => a ? `/**
${a}
 */
` : "/**\n */\n", O = a => ` * @suppress {nonStandardJsDocs}
${a}`, P = (a, b, c) => {
  a = `${a ? "" : "var "}${a ? `${a}.` : ""}${b}`;
  c && (a += ` = ${c}`);
  return a;
}, Q = a => {
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
}, bb = (a, b, c = null) => {
  const {async:d, "void":e, "return":g = e ? "void" : "", ...f} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({I:h, name:k}) => "this" == k ? `${k}: ${h}` : k.startsWith("...") ? `...${h}` : h).join(","));
  b = g.replace(/\n\s*/g, " ");
  d && b ? b = `!Promise<${b}>` : d && (b = "!Promise");
  c = `function(${"constructor" == f.name ? `new: ${c}, ` : ""}${a})`;
  b && (c += `: ${b}`);
  return {W:{...f, async:d, return:b}, H:c};
};
function R(a, b) {
  const c = a.example;
  c && c.startsWith(".") && b && (a.example = La(Ja(b), c));
}
;function cb(a, b, c) {
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
;const db = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), eb = new RegExp(`(?:\\s+((?:${db.source}\\s*)*))`);
const S = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return cb(new RegExp(`<(${a})${eb.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:c, a:d = "", c:e = ""}) => {
    d = d.replace(/\/$/, "").trim();
    d = fb(d);
    return {content:e, props:d, tag:c};
  });
}, fb = a => cb(db, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
const gb = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function hb(a) {
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
;function ib(a) {
  a = gb(a);
  return hb(a);
}
;function jb(a, b, {name:c, string:d, "boolean":e, opt:g, number:f, type:h}, k) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = Q(b));
  b = $a({number:f, L:d, boolean:e, type:h});
  k && (b = b.replace(new RegExp(`([!?])?${k}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), g = !0);
  a.type = b;
  g && (a.optional = !0);
}
class kb {
  constructor() {
    this.name = null;
    this.type = "";
    this.optional = !1;
    this.description = "";
  }
  get I() {
    return this.optional ? `${this.type}=` : this.type;
  }
}
const lb = (a, b) => {
  let c = a.lastIndexOf("</arg>"), d = a;
  var e = [];
  -1 != c && (c += 6, e = a.slice(0, c), d = a.slice(c), e = S("arg", e), e = e.map(({content:g, props:f}) => {
    const h = new kb;
    jb(h, g, f, b);
    return h;
  }));
  return {J:d, F:e};
};
function T(a) {
  if ("" == a.name && a.nullable) {
    return "?";
  }
  var b = "";
  a.nullable ? b = "?" : !1 === a.nullable && (b = "!");
  if (a.function) {
    b += a.name + "(";
    const d = [];
    if (a.function.this) {
      var c = "this: " + T(a.function.this);
      d.push(c);
    }
    a.function.new && (c = "new: " + T(a.function.new), d.push(c));
    a.function.args.forEach(e => {
      let g = T(e);
      e.optional && (g += "=");
      d.push(g);
    });
    a.function.variableArgs && (c = "..." + T(a.function.variableArgs), d.push(c));
    c = d.join(", ");
    b += c + ")";
    a.function.return && (b += ": " + T(a.function.return));
  } else {
    if (a.record) {
      b += "{ ", c = Object.keys(a.record).map(d => {
        var e = a.record[d];
        if (!e) {
          return d;
        }
        e = T(e);
        return `${d}: ${e}`;
      }), b += c.join(", "), b += " }";
    } else {
      if (a.application) {
        if ("Promise" == a.name && !a.application.some(d => "void" != d.name)) {
          return b + "Promise";
        }
        b += a.name + "<";
        c = a.application.map(d => T(d));
        b += c.join(", ");
        b += ">";
      } else {
        a.union ? (b += "(", c = a.union.map(d => T(d)), b += c.join("|"), b += ")") : b += "any" == a.name ? "*" : a.name;
      }
    }
  }
  return b;
}
;const U = (a, b = !1) => a.split("\n").map((c, d) => {
  if (b && !d) {
    return c;
  }
  d = " *";
  c.length && (d += " ");
  return d + c;
}).join("\n"), mb = a => {
  const b = a.replace(/^\s*\n/gm, "").split("\n").reduce((c, d) => {
    [{length:d = 0} = {}] = /^\s*/.exec(d) || [];
    return d < c ? d : c;
  }, Infinity);
  return a.replace(new RegExp(`^ {${b}}`, "gm"), "");
};
function nb(a, b = "") {
  const c = b.split(/\s*,\s*/);
  return a.split(/\s*,\s*/).map(d => {
    let e = d = ta(d, "utf8");
    if (d = /\/\* start example \*\/\r?\n([\s\S]+?)\r?\n\s*\/\* end example \*\//.exec(d)) {
      [, d] = d, e = mb(d);
    }
    c.forEach(g => {
      const [f, h] = g.split(/\s*=>\s*/);
      e = e.replace(`'${f}'`, `'${h}'`);
      e = e.replace(`"${f}"`, `"${h}"`);
    });
    return e = e.replace(/@/g, "\uff20");
  });
}
function ob(a, {O:b = !0, T:c = !0} = {}) {
  const d = [];
  b && d.push(" * @example");
  a.forEach(e => {
    let g = [], f = [], h = "", k;
    e = e.split("\n").reduce((l, m) => {
      m.startsWith("///") ? (k = "comment", g.push(m)) : (k = "block", f.push(m));
      h || (h = k);
      k != h && ("block" == k ? (l.push(g.join("\n")), g = []) : (l.push(f.join("\n")), f = []), h = k);
      return l;
    }, []);
    g.length ? e.push(g.join("\n")) : f.length && e.push(f.join("\n"));
    e = e.reduce((l, m) => {
      m.startsWith("///") ? (m = m.replace(/^\/\/\/\s+/gm, ""), l.push(...m.split("\n"))) : (l.push("```js"), l.push(...m.split("\n")), l.push("```"));
      return l;
    }, []);
    c && (e = e.map(l => U(l)));
    d.push(...e);
  });
  return d;
}
function pb(a, b, c = new RegExp(`([!?])?${b}\\.`, "g")) {
  b && (a.f && (a.f = a.f.replace(c, "$1")), a.type = a.type.replace(c, "$1"));
}
function qb(a, b = !1) {
  return b ? a.closureType : a.isParsedFunction ? a.toTypeScriptFunction(T) : a.type;
}
function rb(a, b = null, c = !1, d = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = M(a.name, a.optional ? a.default : null, a.type, b);
  b = a.optional ? `[${b}]` : b;
  var e = a.m;
  e = e ? ` ${e}` : "";
  c = `{${qb(a, c)}} ${b}${e}`;
  d && (a = ob(a.examples, {O:!1, T:!1}).join("\n").replace(/\*/g, "\uff0a")) && (c += `\n${a}`);
  return c;
}
function sb(a, b = !1) {
  a = rb(a, null, b, !0);
  return ` * @prop ${U(a, !0)}`;
}
function tb(a, b) {
  const c = [], {function:{args:d, return:e, variableArgs:g, this:f}} = a.parsed;
  d.map(h => T(h)).forEach((h, k) => {
    const {optional:l} = d[k], {name:m = `arg${k}`, description:n} = a.args[k] || {};
    c.push(` * @param {${h}${l ? "=" : ""}} ${l ? `[${m}]` : m}${n ? ` ${n}` : ""}`);
  });
  if (g) {
    const {M:h, X:k} = ub(a.args || []), l = [h, k].filter(Boolean).join(" ");
    c.push(` * @param {...${T(g)}} ${l}`);
  }
  f && c.push(` * @this {${T(f)}}`);
  if (e && "void" != e.name) {
    if (b && a.s) {
      return c;
    }
    b = T(e);
    c.push(` * @return {${b}}`);
  }
  return c;
}
function vb(a) {
  if (a.isParsedFunction) {
    const {function:{args:b, variableArgs:c}} = a.parsed, d = b.map((e, g) => {
      ({name:e = `arg${g}`} = a.l[g] || {});
      return e;
    });
    if (c) {
      const {M:e} = ub(a.args || []);
      d.push(`...${e}`);
    }
    return ` = function(${d.join(", ")}) {}`;
  }
  return a.type.startsWith("function(") ? " = function() {}" : "";
}
function V(a, b = "", c = !1) {
  let d = [];
  var e = a.m;
  e && (e = U(e), d.push(...e.split("\n")));
  !a.optional && a.isParsedFunction ? (e = tb(a, c), d.push(...e)) : d.push(` * @type {${a.optional ? ab(a.closureType) : a.closureType}}`);
  c && a.examples.length && (a = ob(a.examples), d.push(...a));
  b && (d = d.map(g => `${b}${g}`));
  return d.join("\n");
}
function wb(a, b) {
  const c = Object.assign(Object.create(Object.getPrototypeOf(a)), a);
  c.description = `An alias for \`${a.name}\`.`;
  c.name = b;
  return c;
}
class xb {
  constructor(a = null) {
    this.h = this.description = this.name = null;
    this.closureType = "";
    this.default = this.f = null;
    this.optional = !1;
    this.aliases = [];
    this.o = !1;
    this.parsed = null;
    this.args = a;
    this.g = !1;
    this.examples = [];
    this.s = !1;
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    let {function:{new:b, args:c, return:d, this:e, variableArgs:g}} = this.parsed;
    b && (d = b);
    var f = c.map(k => a(k)).map((k, l) => {
      const {optional:m} = c[l];
      let {name:n = `arg${l}`, optional:q = m} = this.l[l] || {};
      return `${`${n}${q ? "?" : ""}`}: ${k}`;
    });
    if (e) {
      var h = a(e);
      f.unshift(`this: ${h}`);
    }
    if (g) {
      h = a(g);
      let k = "...args";
      try {
        k = `${this.args[this.args.length - 1].name}`;
      } catch (l) {
      }
      f.push(`${k}: ${h}[]`);
    }
    f = f.join(", ");
    h = d ? a(d) : "?";
    f = `(${f}) => ${h}`;
    b && (f = "new " + f);
    return f;
  }
  get static() {
    return this.g;
  }
  get hasDefault() {
    return null !== this.default;
  }
  b(a, {name:b, string:c, "boolean":d, opt:e, number:g, type:f, "default":h, closure:k, alias:l, aliases:m, example:n, "example-override":q = "", noParams:p, "static":r, initial:t, "template-no-return":u}) {
    if (!b) {
      throw Error("Property does not have a name.");
    }
    this.name = b;
    a && (this.description = Q(a));
    a = $a({number:g, L:c, boolean:d, type:f});
    p && (this.o = p);
    k && (this.f = k);
    this.type = a;
    void 0 !== h ? this.default = h : void 0 !== t && (this.default = t);
    if (e || void 0 !== h) {
      this.optional = !0;
    }
    l && (this.aliases = [l]);
    m && (this.aliases = m.split(/\s*,\s*/));
    r && (this.g = !0);
    n && (this.examples = nb(n, q));
    u && (this.s = !0);
  }
  get type() {
    return this.h || "*";
  }
  set type(a) {
    this.h = a || null;
    this.closureType = this.f || this.h || "";
    if (!this.o) {
      try {
        this.parsed = ib(this.closureType), this.isParsedFunction && !this.args && (this.args = []);
      } catch (b) {
        this.parsed = null;
      }
    }
  }
  get m() {
    let a = this.description || "";
    return `${a}${this.hasDefault ? `${/``` */.test(this.description) ? "\n" : a ? " " : ""}Default \`${this.default}\`.` : ""}`;
  }
  get l() {
    var a = this.args;
    this.args && this.args[0] && "this" == this.args[0].name && ([, ...a] = this.args);
    return a;
  }
  get isParsedFunction() {
    return !!this.parsed && "function" == this.parsed.name;
  }
  C(a, b = "", c = !1) {
    a = rb(this, a, c);
    const [d, ...e] = a.split("\n");
    return [`@param ${d}`, ...e].map(g => `${b} * ${g}`).join("\n");
  }
}
const ub = a => {
  let b = "args";
  const {name:c = "", description:d} = a[a.length - 1] || {};
  c.startsWith("...") && (b = c.replace("...", ""));
  return {M:b, X:d};
};
class W extends xb {
  constructor(...a) {
    super(...a);
    this.isConstructor = this.async = !1;
    this.return = "";
  }
  b(a, b) {
    super.b(a, b);
    "constructor" == b.name && (this.isConstructor = !0);
    this.async = b.async;
    this.return = b.return;
  }
}
;function yb(a, b, c, d) {
  var e = S("prop", a).map(({content:k, props:l}) => {
    const m = new xb;
    R(l, c);
    m.b(k, l);
    return m;
  });
  a = S(["function", "fn", "static"], a).map(({content:k, props:l, tag:m}) => {
    m = "static" == m;
    const {J:n, F:q} = lb(k, b);
    k = new W(q);
    const {W:p, H:r} = bb(l, q, d);
    p.type = r;
    R(p, c);
    k.b(n, p);
    m && (k.g = !0);
    return k;
  });
  e = [...e, ...a];
  const {G:g, K:f, n:h} = e.reduce((k, l) => {
    l.isConstructor ? k.G.push(l) : l.static ? k.K.push(l) : k.n.push(l);
    return k;
  }, {G:[], K:[], n:[]});
  return {constructor:g[0] || null, properties:[...g, ...f, ...h]};
}
;const zb = (a, b, c = {}) => {
  let d;
  if ("object" == typeof b) {
    d = b;
  } else {
    try {
      (d = ib(b)) || console.log("Could not parse %s", b);
    } catch (e) {
      console.log("Could not parse %s", b), console.error(e.message);
    }
  }
  return d ? X(d, a, c) : b;
}, X = (a, b, c = {}) => {
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
    a.function.this && (d = "this: " + X(a.function.this, b, c), f.push(d));
    a.function.new && (d = "new: " + X(a.function.new, b, c), f.push(d));
    a.function.args.forEach(h => {
      let k = X(h, b, c);
      h.optional && (k += "=");
      f.push(k);
    });
    a.function.variableArgs && (d = "..." + X(a.function.variableArgs, b, c), f.push(d));
    d = f.join(", ");
    e += d + ")";
    a.function.return && (e += ": " + X(a.function.return, b, c));
  } else {
    a.record ? (e += "{ ", d = Object.keys(a.record).map(f => {
      var h = a.record[f];
      if (!h) {
        return f;
      }
      h = X(h, b, c);
      return `${f}: ${h}`;
    }), e += d.join(", "), e += " }") : a.application ? (e += Ab(a.name, b, g, c) + "&lt;", d = a.application.map(f => X(f, b, c)), e += d.join(", "), e += "&gt;") : a.union ? (e = e + g + "(", g = a.union.map(f => X(f, b, c)), e += g.join(d ? " \\| " : " | "), e += ")") : e += Ab("any" == a.name ? "*" : a.name, b, g, c);
  }
  return e;
}, Ab = (a, b, c = "", d = {}) => {
  const {flatten:e = !1, nameProcess:g, link:f = ({link:l}) => `#${l}`} = d;
  d = Bb(b, a);
  c = `${c}${a}`;
  if (!d) {
    return c;
  }
  let {link:h, type:{description:k}} = d;
  e && ((b = b.find(({fullName:l}) => l == a)) && b.link && (h = b.link), !k && b.description && (k = b.description), "function" == typeof e && e(a));
  d.link == h && (h = f(d));
  b = g ? g(c) : c;
  return k ? `<a href="${h}" title="${k.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${h})`;
}, Bb = (a, b) => {
  a = a.filter(({fullName:d}) => d == b);
  if (a.length) {
    var c = a.find(({import:d}) => d || !1);
    a = a.find(({import:d}) => !d) || c;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function Cb(a, b = [], c = [], d = {}) {
  const {narrow:e = !1, preprocessDesc:g} = d;
  if (!b.length) {
    return "";
  }
  const f = a.isConstructor || a.isInterface, h = b.some(({hasDefault:n}) => n), k = {escapePipe:!e, ...d};
  let l;
  const m = n => zb(c, n, {...k, nameProcess:d.nameProcess ? q => d.nameProcess(q, l) : void 0});
  a = b.map((n, q) => {
    l = 0 < (q + 1) % 2;
    q = n.args && n.isParsedFunction ? n.toTypeScriptFunction(m) : m(n.parsed || n.type);
    const p = f || n.optional ? n.name : `${n.name}*`, r = n.hasDefault ? `\`${n.default}\`` : "-", t = g ? g(n.description) : n.description;
    return {prop:n, typeName:q, name:p, de:Db(t, !e), d:r, Z:l};
  });
  if (e) {
    return {props:a, anyHaveDefault:h, constr:f};
  }
  a = a.map(({name:n, typeName:q, de:p, d:r, prop:t}) => [t.optional ? n : `__${n}__`, `<em>${q}</em>`, p, ...h ? [r] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...h ? [f ? "Initial" : "Default"] : []];
  return `

\`\`\`table
${JSON.stringify([b, ...a], null, 2)}
\`\`\``;
}
const Db = (a = "", b = !0) => {
  null === a && (a = "");
  b && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
};
const Eb = (a, b, c = {}) => {
  function d(e) {
    e.replace(/^!?/, "");
    return `\`${e}\``;
  }
  return a.split(/,\s*/).map(e => zb(b, e, {flatten:!0, ...c, nameProcess:c.nameProcess ? g => {
    g = c.nameProcess(g);
    return /[_*~>]/.test(g) ? `<code>${g}</code>` : d(g);
  } : d})).join(", ");
};
function Fb(a) {
  var b = a.h();
  b = N(b.join("\n"));
  b += P(a.namespace, a.name, Gb(a));
  const c = a.properties.reduce((d, e) => {
    d.push(e);
    const g = e.aliases.map(f => wb(e, f));
    d.push(...g);
    return d;
  }, []).filter(d => d instanceof W && d.isConstructor ? !1 : !0).map(d => {
    let e = V(d);
    e = N(e);
    e += P(`${a.fullName}${d.static ? "" : ".prototype"}`, d.name);
    return e += vb(d);
  });
  return [b, ...c].join("\n");
}
function Hb(a, b = !1) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return b ? `${a.ns}${c}` : c;
}
function Ib(a, b = !1, c = !1, d = b) {
  d = ` * @typedef {${(b ? a.closureType : a.type) || a.o()}}${` ${Hb(a, d)}${a.l}`}`;
  a = (a.properties ? a.properties.reduce((e, g) => {
    if (g.g) {
      return e;
    }
    e.push(g);
    const f = g.aliases.map(h => wb(g, h));
    e.push(...f);
    return e;
  }, []) : []).filter(e => e instanceof W ? !e.isConstructor : !0).map(e => sb(e, b));
  a = [d, ...a].join("\n");
  b && !c && (a = O(a));
  return a = N(a);
}
function Gb(a) {
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
    this.examples = [];
    this.file = null;
  }
  get import() {
    return !1;
  }
  b(a, {name:b, type:c, desc:d, noToc:e, spread:g, noExpand:f, link:h, closure:k, constructor:l, "extends":m, "interface":n, record:q, example:p, "example-override":r}, t, u = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    c && (this.type = c);
    k ? this.closureType = k : this.closureType = this.type;
    d && (this.description = Q(d));
    this.noToc = !!e;
    this.spread = !!g;
    this.noExpand = !!f;
    h && (this.link = h);
    !0 === l && (this.isConstructor = l);
    !0 === n && (this.isInterface = n);
    !0 === q && (this.isRecord = q);
    m && (this.extends = m);
    t && (this.namespace = t);
    if (a) {
      const {properties:w, constructor:Ba} = yb(a, u, this.file, this.fullName);
      Ba && (this.args = Ba.args);
      this.properties = w;
    }
    p && (a = {example:p}, R(a, this.file), this.examples = nb(a.example, r));
  }
  get s() {
    return this.isConstructor || this.isInterface || this.isRecord;
  }
  o() {
    return "Object";
  }
  m(a, b = new RegExp(`([!?])?${a}\\.`, "g")) {
    this.type && (this.type = this.type.replace(b, "$1"));
    this.extends && (this.extends = this.extends.replace(b, "$1"));
    return b;
  }
  get l() {
    return `${this.tag ? ` \`\uff20${this.tag}\`` : ""}${this.description ? ` ${this.description}` : ""}`;
  }
  g(a = !1, b = !1, c = a) {
    const d = !!this.extends, e = Ib(this, a, b, c), g = [];
    if (this.namespace && a) {
      var f = ` * @typedef {${this.fullName}} ${this.name}${this.l}`;
      a && !b && (f = O(f));
      f = N(f);
      g.push(f);
    } else {
      this.namespace && c && (f = ` * @typedef {${this.fullName}} ${this.name}${this.l}`, f = N(f), g.push(f));
    }
    d && (c = ` * @typedef {${this.extends.split(/,\s*/).join(" & ")} & ${Hb(this, c)}} ${c ? this.fullName : this.name}${this.l}`, a && !b && (c = O(c)), c = N(c), g.push(c));
    g.push(e);
    return g.join("");
  }
  get U() {
    const a = this.tag;
    if (!a) {
      throw Error("Unknown prototype type (not constructor or interface).");
    }
    return a;
  }
  get tag() {
    return this.isConstructor ? "constructor" : this.isInterface ? "interface" : this.isRecord ? "record" : "";
  }
  h(a = "", b = !0, c = !1) {
    let d = [];
    this.description && d.push(` * ${this.description}`);
    const e = this.properties[0];
    e instanceof W && e.isConstructor && e.description && d.push(U(e.description));
    this.extends && this.extends.split(/,\s*/).forEach(g => {
      d.push(` * @extends {${g}}`);
    });
    this.args && this.args.forEach(g => {
      let {name:f, description:h, optional:k, type:l} = g;
      g = h ? ` ${h}` : "";
      if (f.startsWith("...")) {
        f = f.slice(3), l = `...${l}`;
      } else {
        if ("this" == f) {
          d.push(` * @this {${l}}${g}`);
          return;
        }
      }
      d.push(` * @param {${l}${k ? "=" : ""}} ${k ? `[${f}]` : f}${g}`);
    });
    b && d.push(` * @${this.U}`);
    c && this.examples.length && (b = ob(this.examples), d.push(...b));
    a && (d = d.map(g => `${a}${g}`));
    return d;
  }
  get ns() {
    return this.namespace ? `${this.namespace}.` : "";
  }
  get fullName() {
    return `${this.ns}${this.name}`;
  }
  C(a, b, c, d, e = !1, g = !1) {
    var f = "";
    !0 === d ? f = "?" : !1 === d && (f = "!");
    d = this.description ? ` ${this.description}` : "";
    const h = this.spread ? Jb(this.properties) : e || g ? this.fullName : this.name;
    b = `${c || ""} * @param {${f}${h}} ${b ? `[${a}]` : a}${d}`;
    f = this.properties && !this.noExpand ? this.properties.map(k => k.C(a, c, e, g)) : [];
    return [b, ...f].join("\n");
  }
  toMarkdown(a = [], b = {}) {
    const {flatten:c, details:d = []} = b, e = d.includes(this.name);
    var g = this.type ? `\`${this.type}\`` : "", f = g;
    this.link ? f = `[${g}](${this.link})` : !this.import && this.type && (f = zb(a, this.type, b), g = f != this.type, f = Kb(f, g));
    g = Kb(this.fullName);
    g = this.import ? `[${g}](l-type)` : this.noToc ? `[${g}](l-type)` : `[${g}](t-type)`;
    const h = this.description ? `: ${this.description}` : "";
    f = f ? `${f} ` : "";
    let k = /_/.test(g);
    if (this.extends) {
      const l = Eb(this.extends, a, b), m = ` extends ${l}`;
      k = k || /_/.test(l);
      f = (k ? f + "<strong>" : f + "__") + (g + m);
      "function" == typeof c && c(this.extends);
    } else {
      f = (k ? f + "<strong>" : f + "__") + g;
    }
    f = (k ? f + "</strong>" : f + "__") + h;
    a = Cb(this, this.properties, a, b);
    return {LINE:f, table:a, displayInDetails:e};
  }
}
const Kb = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`, Jb = (a = [], b = !1) => {
  a = a.reduce((c, d) => {
    c.push(d);
    const e = d.aliases.map(g => ({...d, name:g}));
    c.push(...e);
    return c;
  }, []);
  return `{ ${a.map(c => {
    const d = b ? c.closureType : c.type;
    let e = c.name, g = d;
    c.optional && !b ? e = `${c.name}?` : c.optional && b && (g = `(${ab(d)})`);
    return `${e}: ${g}`;
  }).join(", ")} }`;
};
class Lb extends Y {
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
    this.description = Q(a);
    super.b("", {...d, noToc:!0, name:c, type:`import('${b}').${c}`}, e != g ? e : null);
  }
  g(a = !0) {
    return ` * @typedef {import('${this.from}').${this.name}} ${a ? this.fullName : this.name}`;
  }
}
;function Mb(a, b) {
  b = b.reduce((c, d) => ({...c, [d.fullName]:d}), {});
  a.w = {...a.w, ...b};
}
class Nb extends L {
  constructor(a, b = {}) {
    super(a);
    this.w = {};
    this.on("types", c => {
      Mb(this, c);
    });
    this.on("namespace", c => {
      this.b.includes(c) || this.b.push(c);
    });
    this.f = b;
    this.b = [];
    this.i = console.log;
    this.file = null;
    this.lines = [];
  }
  static get Type() {
    return Y;
  }
  static get Import() {
    return Lb;
  }
  get types() {
    return this.w;
  }
}
;class Ob extends Y {
  constructor() {
    super();
    this.f = null;
    this.async = !1;
  }
  get s() {
    return !1;
  }
  get isMethod() {
    return !0;
  }
  b(a, {async:b, "return":c, ...d}, ...e) {
    this.description = Q(a);
    super.b("", d, ...e);
    c && (this.f = c.replace(/\n\s*/g, " "));
    b && (this.async = !0);
  }
  get return() {
    return this.f || "void";
  }
  h(a = "") {
    const b = super.h(a, !1);
    let c;
    this.f && (c = this.return);
    this.async && c ? c = `Promise<${c}>` : this.async && (c = "Promise");
    c && b.push(`${a} * @return {${c}}`);
    return b;
  }
  o() {
    return `(${this.args.map(({name:a, type:b, optional:c}) => `${a}${c ? "?" : ""}: ${b}`).join(", ")}) => ${this.return}`;
  }
  m(a) {
    a = super.m(a);
    this.f && (this.f = this.f.replace(a, "$1"));
  }
}
;const Pb = (a, b) => {
  const c = new RegExp(`([!?])?${a}\\.`, "g");
  b.properties.forEach(d => {
    pb(d, a, c);
  });
  b.m(a);
}, Qb = (a, b) => {
  var {args:c = []} = a, d = c.map(({I:g}) => g).join(", ");
  let e = `new: ${a.fullName}`;
  d.length && (e = `${e}, `);
  d = `function(${e}${d})`;
  c = new W(c);
  c.isConstructor = !0;
  c.b("Constructor method.", {type:d, name:"constructor"});
  c.examples = a.examples;
  pb(c, b);
  a.properties.unshift(c);
}, Sb = (a, b, c = null) => {
  a = S("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:d, props:{namespace:e, ns:g = e}}] = a, f = b == g ? void 0 : g, h = [];
  a = S("type interface constructor method import record".split(" "), d).reduce((k, {content:l, props:m, tag:n}) => {
    "record" == n && (n = "type", m.record = !0);
    const {alias:q, aliases:p, ...r} = m;
    c && R(r, c);
    var t = q ? [q] : p ? p.split(/, */) : [];
    switch(n) {
      case "type":
        n = new Y;
        c && (n.file = c);
        n.b(l, m, f, b);
        k.push(n);
        t.forEach(u => {
          const w = new Y;
          c && (w.file = c);
          w.b(l, {...r, name:u}, f, b);
          k.push(w);
        });
        break;
      case "interface":
        m = Rb({content:l, props:m, ns:f, B:b, location:c});
        m.forEach(u => {
          u.properties.some(({isConstructor:w}) => w) || Qb(u, b);
          u.isInterface = !0;
        });
        k.push(...m);
        break;
      case "constructor":
        m = Rb({content:l, props:m, ns:f, B:b, location:c});
        m.forEach(u => {
          u.properties.some(({isConstructor:w}) => w) || Qb(u, b);
          u.isConstructor = !0;
        });
        k.push(...m);
        break;
      case "method":
        m = Rb({content:l, props:m, ns:f, B:b, isMethod:!0, location:c});
        k.push(...m);
        break;
      case "import":
        t = new Lb, t.b(l, m, m.ns || m.from, b), h.push(t);
    }
    return k;
  }, []);
  b && a.forEach(k => Pb(b, k));
  return {namespace:g, types:a, imports:h};
}, Tb = (a, b, c, d, e = !1, g = null) => {
  const f = e ? new Ob : new Y;
  f.file = g;
  g = a.search(/<(prop|function|fn|static) /);
  let h = "", k = a;
  1 != g && (h = a.slice(0, g), k = a.slice(g));
  const {F:l, J:m} = lb(h, d);
  f.b(e ? m : k, b, c, d);
  ({H:a} = bb(b, l));
  e && (f.closureType = a);
  f.args || (f.args = l);
  return f;
}, Rb = ({content:a, props:b, ns:c, B:d, isMethod:e = !1, location:g = null}) => {
  const f = [], {alias:h, aliases:k, ...l} = b;
  b = Tb(a, b, c, d, e, g);
  f.push(b);
  (h ? [h] : k ? k.split(/, */) : []).forEach(m => {
    m = Tb(a, {...l, name:m}, c, d, e, g);
    m.description = `${m.description}${m.description ? " " : ""}Alias of \`${l.name}\`.`;
    f.push(m);
  });
  return f;
}, Ub = async(a, b = []) => {
  const c = await E(a);
  let d, e, g;
  try {
    ({namespace:d = null, types:e, imports:g} = Sb(c, void 0, a));
  } catch (f) {
    throw f.message = `Error while reading ${a}\n${f.message}`, f;
  }
  e = e.filter(({fullName:f}) => b.includes(f) ? !1 : !0);
  g = g.filter(({fullName:f}) => b.includes(f) ? !1 : !0);
  return {types:e, imports:g, namespace:d};
};
const Vb = (a, b, c) => {
  b = b.map(d => d.g(!0, c));
  a = a.map(d => {
    d = d.g();
    return N(c ? d : O(d));
  });
  return [...b, ...a].join("");
}, Wb = (a, b, c, d = !1) => {
  a = [...a.map(e => {
    {
      let g;
      e.closureType ? g = ` * @typedef {${e.closureType}}` : e.s || (g = ` * @typedef {${Jb(e.properties, !0)}}`);
      g ? (e.description && (g = ` * ${e.description}\n${g}`), g = N(g), e = g += P(e.namespace, e.name)) : e = Fb(e);
    }
    return e;
  })].join("\n");
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const Yb = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, c) {
  const [d, ...e] = c.split(/\s+/), g = e.includes("closure"), f = e.includes("externs"), h = e.includes("noSuppress"), k = e.includes("skipNsDecl"), l = e.includes("namespace");
  let m = e.find(p => p.startsWith("ignore:"));
  m = m ? m.replace("ignore:", "").split(",") : [];
  let {v:n, A:q} = this.f;
  g && (n = !0);
  f && (q = !0);
  try {
    this.i("Detected type marker: %s", c);
    const {types:p, imports:r, namespace:t} = await Ub(d, m);
    this.emit("types", p);
    this.emit("types", r);
    let u;
    n ? u = Vb(r, p, h) : q ? (u = Wb(p, t, this.b, k) + "\n", t && this.emit("namespace", t)) : l ? (t && this.emit("namespace", t), u = Xb(r, p, !0)) : u = Xb(r, p);
    return `/* ${b} ${c} */\n${u}`;
  } catch (p) {
    return this.i("(%s) Could not process typedef-js: %s", c, p.message), process.env.b && console.error(p.stack), a;
  }
}}, Xb = (a, b, c = !1) => {
  b = b.map(d => d.g(!1, !1, c));
  a = a.map(d => d.g(c)).map(N).join("");
  b = b.join("");
  return `${a}${b}`.replace(Zb, " * @typedef");
}, Zb = / \*\/\n\/\*\*\n \* @typedef/g;
const ac = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?(?:(?!\n\s*\*(?:\/|\s*@))[\s\S])*)*)/gm, replacement:$b};
function $b(a, b, c, d, e, g, f) {
  const h = this.f.v, k = this.f.D;
  let l;
  g = () => {
    if (this.lines && this.file) {
      var n;
      {
        let r = n = 0;
        for (; r < f;) {
          r += this.lines[n].length, n++;
        }
        n = {line:n, P:b.length + 11};
      }
      const {line:q, P:p} = n;
      this.i("%s:%s:%s", this.file, q, p);
    }
  };
  try {
    l = ib(c);
  } catch (n) {
    return this.i("Error while parsing the type %s", c), this.i(process.env.DEBUG ? n.stack : n.message), g(), a;
  }
  if (!l) {
    return this.i("Could not parse the type %s", c), g(), a;
  }
  const m = Object.values(this.types).map(({name:n, fullName:q}) => h || k ? q : n);
  if (!Z(l, m, this.i, c, g)) {
    return a;
  }
  c = Object.values(this.types).find(({name:n, fullName:q}) => h || k ? q == l.name : n == l.name);
  return !c || c instanceof Nb.Import ? a : c.C(e, d, b, l.nullable, h, k);
}
const Z = (a, b, c, d, e) => {
  if (a) {
    var g = a.name;
    if (!g || !"string number boolean null undefined symbol any".split(" ").includes(g)) {
      if (g && !a.application && !a.function) {
        let h = b.includes(g);
        h || (h = bc.includes(g));
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
}, bc = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var cc = (a, b = !1) => {
  var {S:c} = Ta();
  const d = Va(c);
  c = Ua(c);
  return new Nb(b ? [Yb] : [Yb, d, ac, c], a);
};
const dc = /( *) \* @(fnType|methodType) {(.+?)}/gm, ec = (a, b, c, d, e, g, f = d) => `/**
${a}
 */
${b ? "static " : ""}${c ? "async " : ""}${d}(${e}) {
  return ${`${b ? g : "super"}.${f}`}(${e})
}`;
class fc extends L {
  constructor(a, b) {
    super([{re:/\/\*\*\s+( *) \* @constructor {(.+?)}[\s\S]+?(class\s+.+?\s+extends\s+(.+?)\s*){\s*}/gm, replacement(c, d, e, g, f) {
      d = a.find(({fullName:l}) => l == e);
      if (!d) {
        return console.error("Type %s in %s not found", e, b), c;
      }
      c = d.properties.filter(l => l instanceof W && !l.isConstructor).map(l => {
        const m = l.name;
        var n = l.aliases;
        const q = l.static, p = l.async;
        let r = V(l, "", !0);
        r = gc(r, e);
        const t = l.args.map(({name:u}) => u).join(", ");
        l = ec(r, q, p, m, t, f);
        n = n.map(u => ec(r + `\n * @alias ${m} An alias for **${m}**.`, q, p, u, t, f, m));
        return [l, ...n].join("\n");
      });
      const h = d.properties.find(l => l instanceof W && l.isConstructor), k = h.args.map(({name:l}) => l).join(", ");
      c = [`/**
${gc(V(h, "", !0), e)}
 */
constructor(${k}) {
  super(${k})
}`, ...c].join("\n").replace(/^/gm, "  ");
      g = `${g}{
${c}
}`;
      d.description && (g = `/**
${U(d.description)}
 */\n` + g);
      return g;
    }}, {re:dc, async replacement(c, d, e, g) {
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
        return g.h(d, !1, !0).join("\n");
      }
      e = g.properties.find(({name:l}) => l == k);
      return e ? e.parsed ? V(e, d, !0) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", k, h, b), c) : (console.error("Property %s of type %s in %s not found", k, h, b), c);
    }}]);
  }
}
const gc = (a, b) => a.replace(`\n * @return {${b}}`, "").replace(`\n * @return {!${b}}`, "").replace(`\n * @return {?${b}}`, "");
const hc = async a => a ? (await Promise.all(a.split(",").map(async b => {
  var c = [];
  const d = await G(z, b);
  d.isFile() ? c = [b] : d.isDirectory() && (c = await I(b), c = J(c.content, b), c = c.filter(e => e.endsWith(".xml")));
  return c;
}))).reduce((b, c) => [...b, ...c], []) : [], ic = async a => (await Promise.all(a.map(async b => ({...await Ub(b), location:b})))).reduce((b, {imports:c, types:d}) => {
  b.push(...c);
  b.push(...d);
  return b;
}, []);
async function jc() {
  const a = await hc(la), b = await ic(a);
  await Promise.all(x.map(async c => {
    var d = await G(z, c);
    let e;
    d.isFile() ? e = [c] : d.isDirectory() && (d = await I(c), e = J(d.content, c));
    await kc(e, b, ma);
  }));
}
const kc = async(a, b = [], c = null) => {
  await Promise.all(a.map(async d => {
    var e = await E(d);
    const g = new fc(b, d);
    g.end(e);
    e = await D(g);
    "-" == c ? console.log(e) : c ? await F(c, e) : await F(d, e);
  }));
};
var mc = async() => {
  const {v:a = !1, D:b = !1, A:c = !1, V:d, types:e} = {v:ia, A:ka, V:y, types:la, D:ja}, g = await hc(e);
  await Promise.all(x.map(async f => {
    var h = await G(z, f);
    let k;
    h.isFile() ? k = [f] : h.isDirectory() && (h = await I(f), k = J(h.content, f));
    await lc(k, a, c, d, g, b);
  }));
};
const lc = async(a, b = !1, c = !1, d = "", e = [], g = !1) => {
  const f = [];
  await Promise.all(e.map(async h => {
    h = await E(h);
    const {types:k, imports:l} = Sb(h);
    f.push(k, l);
  }));
  await Promise.all(a.map(async h => {
    var k = await E(h);
    const l = cc({v:b, A:c, D:g}, c);
    f.forEach(m => l.emit("types", m));
    l.file = h;
    l.i = console.error;
    l.lines = k.split("\n");
    l.end(k);
    k = await D(l);
    "-" == d ? console.log(k) : d ? await F(d, k) : await F(h, k);
  }));
};
const nc = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, oc = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, pc = "type opt name quote defaultValue description Default".split(" "), Za = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), qc = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class rc extends A {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform({type:a, name:b, description:c, properties:d}, e, g) {
    a = a && a.startsWith("import") ? sc(a, b) : qc(a, b, c, d);
    this.push(a);
    d.forEach(({type:f, name:h, default:k, description:l, optional:m}) => {
      {
        f = ["string", "number", "boolean"].includes(f) ? ` ${f}` : ` type="${f}"`;
        var n = void 0 !== k;
        k = n ? ` default="${k}"` : "";
        m = m && !n ? " opt" : "";
        n = " ".repeat(4);
        const q = " ".repeat(6);
        h = `${n}<prop${m}${f} name="${h}"${k}${l ? `>\n${q}${l}\n${n}</prop>` : "/>"}\n`;
      }
      this.push(h);
    });
    d.length && this.push("  </type>\n");
    g();
  }
}
const sc = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class tc extends A {
  constructor() {
    super({objectMode:!0});
  }
  _transform([, a, b, c, d], e, g) {
    d = cb(oc, d, pc).map(f => {
      const {defaultValue:h, Default:k, opt:l, name:m, type:n, ...q} = f;
      f = {...q, name:m, type:n, ...h ? {defaultValue:nc(h)} : {}, ...k ? {u:nc(k)} : {}, ...l ? {optional:!0} : {}};
      if (h || k) {
        if (h) {
          h !== k && void 0 !== f.u && (p = M(m, k, n), console.error("%s[%s] does not match Default `%s`.", b, p, f.u));
        } else {
          var p = M(m, k, n);
          console.error("%s[%s] got from Default.", b, p);
        }
        f.default = "defaultValue" in f ? f.defaultValue : f.u;
        delete f.defaultValue;
        delete f.u;
      }
      return f;
    });
    this.push({type:a, name:b, description:c, properties:d});
    g();
  }
}
async function uc(a) {
  const b = Ya(), c = new tc, d = new rc;
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
;var vc = async() => {
  await Promise.all(x.map(async a => {
    a = await E(a);
    a = await uc(a);
    y ? await F(y, a) : console.log(a);
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
    return na ? await vc() : ma ? await jc() : await mc();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map