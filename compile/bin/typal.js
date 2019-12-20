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
  const f = c ? new RegExp(`^-(${c}|-${b})$`) : new RegExp(`^--${b}$`);
  b = a.findIndex(g => f.test(g));
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
  a = Object.entries(a).reduce((g, [k, l]) => {
    g[k] = "string" == typeof l ? {short:l} : l;
    return g;
  }, {});
  const e = [];
  a = Object.entries(a).reduce((g, [k, l]) => {
    let h;
    try {
      const m = l.short, n = l.boolean, q = l.number, p = l.command, r = l.multiple;
      if (p && r && d.length) {
        h = d;
      } else {
        if (p && d.length) {
          h = d[0];
        } else {
          const u = da(c, k, m, n, q);
          ({value:h} = u);
          const t = u.index, w = u.length;
          void 0 !== t && w && e.push({index:t, length:w});
        }
      }
    } catch (m) {
      return g;
    }
    return void 0 === h ? g : {...g, [k]:h};
  }, {});
  let f = c;
  e.forEach(({index:g, length:k}) => {
    Array.from({length:k}).forEach((l, h) => {
      f[g + h] = null;
    });
  });
  f = f.filter(g => null !== g);
  Object.assign(a, {Y:f});
  return a;
}(fa), x = v.source, y = v.output, ia = v.closure, ja = v.useNamespace, ka = v.externs, la = v.types, ma = v.template, na = v.migrate, oa = v.help, pa = v.version;
function qa(a = {usage:{}}) {
  const {usage:b = {}, description:c, line:d, example:e} = a;
  a = Object.keys(b);
  const f = Object.values(b), [g] = a.reduce(([h = 0, m = 0], n) => {
    const q = b[n].split("\n").reduce((p, r) => r.length > p ? r.length : p, 0);
    q > m && (m = q);
    n.length > h && (h = n.length);
    return [h, m];
  }, []), k = (h, m) => {
    m = " ".repeat(m - h.length);
    return `${h}${m}`;
  };
  a = a.reduce((h, m, n) => {
    n = f[n].split("\n");
    m = k(m, g);
    const [q, ...p] = n;
    m = `${m}\t${q}`;
    const r = k("", g);
    n = p.map(u => `${r}\t${u}`);
    return [...h, m, ...n];
  }, []).map(h => `\t${h}`);
  const l = [c, `  ${d || ""}`].filter(h => h ? h.trim() : h).join("\n\n");
  a = `${l ? `${l}\n` : ""}
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
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Ca);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Ca, (g, k) => g.replace(k, k.replace(Ea, "~"))) : f).join("\n");
};
function Fa(a, b, c = !1) {
  return function(d) {
    var e = za(arguments), {stack:f} = Error();
    const g = xa(f, 2, !0), k = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${k}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = B(e);
    return Object.assign(f ? d : Error(), {message:k, stack:e});
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
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {R:e = C(!0), proxyError:f} = a || {}, g = (k, l) => e(l);
    super(d);
    this.b = [];
    this.N = new Promise((k, l) => {
      this.on("finish", () => {
        let h;
        b ? h = Buffer.concat(this.b) : h = this.b.join("");
        k(h);
        this.b = [];
      });
      this.once("error", h => {
        if (-1 == h.stack.indexOf("\n")) {
          g`${h}`;
        } else {
          const m = B(h.stack);
          h.stack = m;
          f && g`${h}`;
        }
        l(h);
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
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
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
  return await new Promise((f, g) => {
    const k = (h, m) => h ? (h = d(h), g(h)) : f(c || m);
    let l = [k];
    Array.isArray(b) ? (b.forEach((h, m) => {
      Ia(e, m);
    }), l = [...b, k]) : 1 < Array.from(arguments).length && (Ia(e, 0), l = [b, k]);
    a(...l);
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
  d = d.filter(Oa).reduce((e, f) => {
    var g = f.lstat.isDirectory() ? "Directory" : f.lstat.isFile() ? "File" : f.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...e, [f.relativePath]:{type:g}};
  }, {});
  c = await c.reduce(async(e, {path:f, relativePath:g}) => {
    const k = Ka(a, f);
    if (b.includes(k)) {
      return e;
    }
    e = await e;
    f = await I(f);
    return {...e, [g]:f};
  }, {});
  return {content:{...d, ...c}, type:"Directory"};
}
const J = (a, b) => {
  let c = [], d = [];
  Object.keys(a).forEach(f => {
    const {type:g} = a[f];
    "File" == g ? c.push(H(b, f)) : "Directory" == g && d.push(f);
  });
  const e = d.reduce((f, g) => {
    const {content:k} = a[g];
    g = J(k, H(b, g));
    return [...f, ...g];
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
    return b.filter(Pa).reduce((d, {re:e, replacement:f}) => {
      if (this.j) {
        return d;
      }
      if ("string" == typeof f) {
        return d = d.replace(e, f);
      }
      {
        let g;
        return d.replace(e, (k, ...l) => {
          g = Error();
          try {
            return this.j ? k : f.call(this, k, ...l);
          } catch (h) {
            K(g, h);
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
      const {getReplacement:e = Sa, getRegex:f = Ra} = {}, g = f(c);
      d = {name:c, re:d, regExp:g, getReplacement:e, map:{}, lastIndex:0};
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
    const f = a.lastIndex;
    b[f] = e;
    a.lastIndex += 1;
    return c(d, f);
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
        let f;
        const g = b.replace(c, (k, ...l) => {
          f = Error();
          try {
            if (this.j) {
              return e.length ? e.push(Promise.resolve(k)) : k;
            }
            const h = d.call(this, k, ...l);
            h instanceof Promise && e.push(h);
            return h;
          } catch (h) {
            K(f, h);
          }
        });
        if (e.length) {
          try {
            const k = await Promise.all(e);
            b = b.replace(c, () => k.shift());
          } catch (k) {
            K(f, k);
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
async function Xa(a, b) {
  b instanceof va ? b.pipe(a) : a.end(b);
  return await D(a);
}
;function Ya() {
  var a = Za;
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
    return c.map(f => f.replace(e, "")).join("\n");
  }
}, bb = (a, b, c = null) => {
  const {async:d, "void":e, "return":f = e ? "void" : "", ...g} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({I:k, name:l}) => "this" == l ? `${l}: ${k}` : l.startsWith("...") ? `...${k}` : k).join(","));
  b = f.replace(/\n\s*/g, " ");
  d && b ? b = `!Promise<${b}>` : d && (b = "!Promise");
  !b && "constructor" == g.name && c && (b = c);
  c = `function(${a})`;
  b && (c += `: ${b}`);
  return {W:{...g, async:d, return:b}, H:c};
};
function R(a, b) {
  const c = a.example;
  c && c.startsWith(".") && b && (a.example = La(Ja(b), c));
}
;function cb(a, b, c) {
  const d = [];
  b.replace(a, (e, ...f) => {
    e = f.slice(0, f.length - 2).reduce((g, k, l) => {
      l = c[l];
      if (!l || void 0 === k) {
        return g;
      }
      g[l] = k;
      return g;
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
  const c = (e = 1) => a[b + e], d = (e = !0, f = []) => {
    var g = {};
    let k = a[b];
    if (["nullable", "nonNullable"].includes(k)) {
      if (!e) {
        throw Error(`${k} not allowed after .`);
      }
      g.nullable = "nullable" === k;
      b++;
    }
    k = a[b];
    if ("(" == k) {
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
      if ("{" == k) {
        b++;
        f = g;
        for (e = {}; "}" != a[b];) {
          var l = a[b];
          b++;
          e[l] = null;
          if (":" == a[b]) {
            b++;
            try {
              var h = d();
              e[l] = h;
            } catch (n) {
              throw n.message += `(when parsing ${l} property)`, n;
            }
          }
          if ("}" == a[b]) {
            b++;
            break;
          }
          if ("," != a[b]) {
            throw Error(`Expecting , for record after ${l}`);
          }
          b++;
        }
        f.record = e;
        return g;
      }
    }
    if (["nonNullable", "nullable"].includes(k)) {
      throw Error("Nullability already defined.");
    }
    if (/[=),:.<>}|]/.test(k)) {
      throw Error(`Unexpected token ${k}.`);
    }
    "|" != a[b] && (g.name = a[b], b++);
    if ("function" == k) {
      h = g;
      l = {return:null, args:[]};
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
          l.this = d();
        } else {
          if ("new" == a[b]) {
            b++;
            if (":" != a[b]) {
              throw Error("Expecting :");
            }
            b++;
            l.new = d();
          } else {
            if ("." == a[b] && "." == c() && "." == c(2)) {
              b++;
              b++;
              b++;
              m = d();
              if (")" != a[b]) {
                throw Error("Variable args must come last");
              }
              l.variableArgs = m;
            } else {
              m = d(), l.args.push(m), "=" == a[b] && (m.optional = !0, b++);
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
      ":" == a[b] && (b++, m = d(), void 0 == m.name && m.nullable && (m.name = ""), l.return = m);
      h.function = l;
    } else {
      if ("<" == a[b] || (l = "." == a[b] && "<" == c())) {
        b++;
        l && b++;
        h = g;
        for (l = []; ">" != a[b];) {
          m = d();
          l.push(m);
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
        h.application = l;
      }
    }
    for (; "." == a[b];) {
      g.name += ".";
      b++;
      ({name:h} = d(!1));
      if (!h) {
        throw Error("Expected to see the name after .");
      }
      g.name += h;
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
;function ib(a) {
  a = gb(a);
  return hb(a);
}
;function jb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:k}, l) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = Q(b));
  b = $a({number:g, L:d, boolean:e, type:k});
  l && (b = b.replace(new RegExp(`([!?])?${l}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), f = !0);
  a.type = b;
  f && (a.optional = !0);
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
  -1 != c && (c += 6, e = a.slice(0, c), d = a.slice(c), e = S("arg", e), e = e.map(({content:f, props:g}) => {
    const k = new kb;
    jb(k, f, g, b);
    return k;
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
      let f = T(e);
      e.optional && (f += "=");
      d.push(f);
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
    c.forEach(f => {
      const [g, k] = f.split(/\s*=>\s*/);
      e = e.replace(`'${g}'`, `'${k}'`);
      e = e.replace(`"${g}"`, `"${k}"`);
    });
    return e = e.replace(/@/g, "\uff20");
  });
}
function ob(a, {O:b = !0, T:c = !0} = {}) {
  const d = [];
  b && d.push(" * @example");
  a.forEach(e => {
    let f = [], g = [], k = "", l;
    e = e.split("\n").reduce((h, m) => {
      m.startsWith("///") ? (l = "comment", f.push(m)) : (l = "block", g.push(m));
      k || (k = l);
      l != k && ("block" == l ? (h.push(f.join("\n")), f = []) : (h.push(g.join("\n")), g = []), k = l);
      return h;
    }, []);
    f.length ? e.push(f.join("\n")) : g.length && e.push(g.join("\n"));
    e = e.reduce((h, m) => {
      m.startsWith("///") ? (m = m.replace(/^\/\/\/\s+/gm, ""), h.push(...m.split("\n"))) : (h.push("```js"), h.push(...m.split("\n")), h.push("```"));
      return h;
    }, []);
    c && (e = e.map(h => U(h)));
    d.push(...e);
  });
  return d;
}
function pb(a, b, c = new RegExp(`([!?])?${b}\\.`, "g")) {
  b && (a.type = a.type.replace(c, "$1"));
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
  const c = [], {function:{args:d, return:e, variableArgs:f, this:g}} = a.parsed;
  d.map(k => T(k)).forEach((k, l) => {
    const {optional:h} = d[l], {name:m = `arg${l}`, description:n} = a.args[l] || {};
    c.push(` * @param {${k}${h ? "=" : ""}} ${h ? `[${m}]` : m}${n ? ` ${n}` : ""}`);
  });
  if (f) {
    const {M:k, X:l} = ub(a.args || []), h = [k, l].filter(Boolean).join(" ");
    c.push(` * @param {...${T(f)}} ${h}`);
  }
  g && c.push(` * @this {${T(g)}}`);
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
    const {function:{args:b, variableArgs:c}} = a.parsed, d = b.map((e, f) => {
      ({name:e = `arg${f}`} = a.l[f] || {});
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
  b && (d = d.map(f => `${b}${f}`));
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
    this.g = this.description = this.name = null;
    this.closureType = "";
    this.default = this.h = null;
    this.optional = !1;
    this.aliases = [];
    this.o = !1;
    this.parsed = null;
    this.args = a;
    this.f = !1;
    this.examples = [];
    this.s = !1;
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    const {function:{args:b, return:c, this:d, variableArgs:e}} = this.parsed;
    var f = b.map(k => a(k)).map((k, l) => {
      const {optional:h} = b[l];
      let {name:m = `arg${l}`, optional:n = h} = this.l[l] || {};
      return `${`${m}${n ? "?" : ""}`}: ${k}`;
    });
    if (d) {
      var g = a(d);
      f.unshift(`this: ${g}`);
    }
    if (e) {
      g = a(e);
      let k = "...args";
      try {
        k = `${this.args[this.args.length - 1].name}`;
      } catch (l) {
      }
      f.push(`${k}: ${g}[]`);
    }
    f = f.join(", ");
    g = c ? a(c) : "?";
    return `(${f}) => ${g}`;
  }
  get static() {
    return this.f;
  }
  get hasDefault() {
    return null !== this.default;
  }
  b(a, {name:b, string:c, "boolean":d, opt:e, number:f, type:g, "default":k, closure:l, alias:h, aliases:m, example:n, "example-override":q = "", noParams:p, "static":r, initial:u, "template-no-return":t}) {
    if (!b) {
      throw Error("Property does not have a name.");
    }
    this.name = b;
    a && (this.description = Q(a));
    a = $a({number:f, L:c, boolean:d, type:g});
    p && (this.o = p);
    l && (this.h = l);
    this.type = a;
    void 0 !== k ? this.default = k : void 0 !== u && (this.default = u);
    if (e || void 0 !== k) {
      this.optional = !0;
    }
    h && (this.aliases = [h]);
    m && (this.aliases = m.split(/\s*,\s*/));
    r && (this.f = !0);
    n && (this.examples = nb(n, q));
    t && (this.s = !0);
  }
  get type() {
    return this.g || "*";
  }
  set type(a) {
    this.g = a || null;
    this.closureType = this.h || this.g || "";
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
    return [`@param ${d}`, ...e].map(f => `${b} * ${f}`).join("\n");
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
  var e = S("prop", a).map(({content:l, props:h}) => {
    const m = new xb;
    R(h, c);
    m.b(l, h);
    return m;
  });
  a = S(["function", "fn", "static"], a).map(({content:l, props:h, tag:m}) => {
    m = "static" == m;
    const {J:n, F:q} = lb(l, b);
    l = new W(q);
    const {W:p, H:r} = bb(h, q, d);
    p.type = r;
    R(p, c);
    l.b(n, p);
    m && (l.f = !0);
    return l;
  });
  e = [...e, ...a];
  const {G:f, K:g, n:k} = e.reduce((l, h) => {
    h.isConstructor ? l.G.push(h) : h.static ? l.K.push(h) : l.n.push(h);
    return l;
  }, {G:[], K:[], n:[]});
  return {constructor:f[0] || null, properties:[...f, ...g, ...k]};
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
  var f = "";
  a.nullable ? f = "?" : !1 === a.nullable && (f = "!");
  if (a.function) {
    e = e + f + (a.name + "(");
    const g = [];
    a.function.this && (d = "this: " + X(a.function.this, b, c), g.push(d));
    a.function.new && (d = "new: " + X(a.function.new, b, c), g.push(d));
    a.function.args.forEach(k => {
      let l = X(k, b, c);
      k.optional && (l += "=");
      g.push(l);
    });
    a.function.variableArgs && (d = "..." + X(a.function.variableArgs, b, c), g.push(d));
    d = g.join(", ");
    e += d + ")";
    a.function.return && (e += ": " + X(a.function.return, b, c));
  } else {
    a.record ? (e += "{ ", d = Object.keys(a.record).map(g => {
      var k = a.record[g];
      if (!k) {
        return g;
      }
      k = X(k, b, c);
      return `${g}: ${k}`;
    }), e += d.join(", "), e += " }") : a.application ? (e += Ab(a.name, b, f, c) + "&lt;", d = a.application.map(g => X(g, b, c)), e += d.join(", "), e += "&gt;") : a.union ? (e = e + f + "(", f = a.union.map(g => X(g, b, c)), e += f.join(d ? " \\| " : " | "), e += ")") : e += Ab("any" == a.name ? "*" : a.name, b, f, c);
  }
  return e;
}, Ab = (a, b, c = "", d = {}) => {
  const {flatten:e = !1, nameProcess:f, link:g = ({link:h}) => `#${h}`} = d;
  d = Bb(b, a);
  c = `${c}${a}`;
  if (!d) {
    return c;
  }
  let {link:k, type:{description:l}} = d;
  k = g(d);
  e && ((b = b.find(({fullName:h}) => h == a)) && b.link && (k = b.link), !l && b.description && (l = b.description), "function" == typeof e && e(a));
  b = f ? f(c) : c;
  return l ? `<a href="${k}" title="${l.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${k})`;
}, Bb = (a, b) => {
  a = a.filter(({fullName:d}) => d == b);
  if (a.length) {
    var c = a.find(({import:d}) => d || !1);
    a = a.find(({import:d}) => !d) || c;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function Cb(a, b = [], c = [], d = {}) {
  const {narrow:e = !1, preprocessDesc:f} = d;
  if (!b.length) {
    return "";
  }
  const g = a.isConstructor || a.isInterface, k = b.some(({hasDefault:h}) => h), l = {escapePipe:!e, ...d};
  a = b.map((h, m) => {
    const n = 0 < (m + 1) % 2;
    m = u => zb(c, u, {...l, nameProcess:d.nameProcess ? t => d.nameProcess(t, n) : void 0});
    h.args && h.isParsedFunction ? (m = h.toTypeScriptFunction(m), h.isConstructor && (m = `new ${m}`)) : m = m(h.parsed || h.type);
    const q = g || h.optional ? h.name : `${h.name}*`, p = h.hasDefault ? `\`${h.default}\`` : "-", r = f ? f(h.description) : h.description;
    return {prop:h, typeName:m, name:q, de:Db(r, !e), d:p, Z:n};
  });
  if (e) {
    return {props:a, anyHaveDefault:k, constr:g};
  }
  a = a.map(({name:h, typeName:m, de:n, d:q, prop:p}) => [p.optional ? h : `__${h}__`, `<em>${m}</em>`, n, ...k ? [q] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...k ? [g ? "Initial" : "Default"] : []];
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
  return a.split(/,\s*/).map(e => zb(b, e, {flatten:!0, ...c, nameProcess:c.nameProcess ? f => {
    f = c.nameProcess(f);
    return /[_*~>]/.test(f) ? `<code>${f}</code>` : d(f);
  } : d})).join(", ");
};
function Fb(a) {
  var b = a.h();
  b = N(b.join("\n"));
  b += P(a.namespace, a.name, Gb(a));
  const c = a.properties.reduce((d, e) => {
    d.push(e);
    const f = e.aliases.map(g => wb(e, g));
    d.push(...f);
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
  a = (a.properties ? a.properties.reduce((e, f) => {
    if (f.f) {
      return e;
    }
    e.push(f);
    const g = f.aliases.map(k => wb(f, k));
    e.push(...g);
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
  b(a, {name:b, type:c, desc:d, noToc:e, spread:f, noExpand:g, link:k, closure:l, constructor:h, "extends":m, "interface":n, record:q, example:p, "example-override":r}, u, t = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    c && (this.type = c);
    l ? this.closureType = l : this.closureType = this.type;
    d && (this.description = Q(d));
    this.noToc = !!e;
    this.spread = !!f;
    this.noExpand = !!g;
    k && (this.link = k);
    !0 === h && (this.isConstructor = h);
    !0 === n && (this.isInterface = n);
    !0 === q && (this.isRecord = q);
    m && (this.extends = m);
    u && (this.namespace = u);
    if (a) {
      const {properties:w, constructor:Ba} = yb(a, t, this.file, this.fullName);
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
    const d = !!this.extends, e = Ib(this, a, b, c), f = [];
    if (this.namespace && a) {
      var g = ` * @typedef {${this.fullName}} ${this.name}${this.l}`;
      a && !b && (g = O(g));
      g = N(g);
      f.push(g);
    } else {
      this.namespace && c && (g = ` * @typedef {${this.fullName}} ${this.name}${this.l}`, g = N(g), f.push(g));
    }
    d && (c = ` * @typedef {${this.extends.split(/,\s*/).join(" & ")} & ${Hb(this, c)}} ${c ? this.fullName : this.name}${this.l}`, a && !b && (c = O(c)), c = N(c), f.push(c));
    f.push(e);
    return f.join("");
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
    this.extends && this.extends.split(/,\s*/).forEach(f => {
      d.push(` * @extends {${f}}`);
    });
    this.args && this.args.forEach(f => {
      let {name:g, description:k, optional:l, type:h} = f;
      f = k ? ` ${k}` : "";
      if (g.startsWith("...")) {
        g = g.slice(3), h = `...${h}`;
      } else {
        if ("this" == g) {
          d.push(` * @this {${h}}${f}`);
          return;
        }
      }
      d.push(` * @param {${h}${l ? "=" : ""}} ${l ? `[${g}]` : g}${f}`);
    });
    b && d.push(` * @${this.U}`);
    c && this.examples.length && (b = ob(this.examples), d.push(...b));
    a && (d = d.map(f => `${a}${f}`));
    return d;
  }
  get ns() {
    return this.namespace ? `${this.namespace}.` : "";
  }
  get fullName() {
    return `${this.ns}${this.name}`;
  }
  C(a, b, c, d, e = !1, f = !1) {
    var g = "";
    !0 === d ? g = "?" : !1 === d && (g = "!");
    d = this.description ? ` ${this.description}` : "";
    const k = this.spread ? Jb(this.properties) : e || f ? this.fullName : this.name;
    b = `${c || ""} * @param {${g}${k}} ${b ? `[${a}]` : a}${d}`;
    g = this.properties && !this.noExpand ? this.properties.map(l => l.C(a, c, e, f)) : [];
    return [b, ...g].join("\n");
  }
  toMarkdown(a = [], b = {}) {
    const {flatten:c, details:d = []} = b, e = d.includes(this.name);
    var f = this.type ? `\`${this.type}\`` : "", g = f;
    this.link ? g = `[${f}](${this.link})` : !this.import && this.type && (g = zb(a, this.type, b), f = g != this.type, g = Kb(g, f));
    f = Kb(this.fullName);
    f = this.import ? `[${f}](l-type)` : this.noToc ? `[${f}](l-type)` : `[${f}](t-type)`;
    const k = this.description ? `: ${this.description}` : "";
    g = g ? `${g} ` : "";
    let l = /_/.test(f);
    if (this.extends) {
      const h = Eb(this.extends, a, b), m = ` extends ${h}`;
      l = l || /_/.test(h);
      g = (l ? g + "<strong>" : g + "__") + (f + m);
      "function" == typeof c && c(this.extends);
    } else {
      g = (l ? g + "<strong>" : g + "__") + f;
    }
    g = (l ? g + "</strong>" : g + "__") + k;
    a = Cb(this, this.properties, a, b);
    return {LINE:g, table:a, displayInDetails:e};
  }
}
const Kb = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`, Jb = (a = [], b = !1) => {
  a = a.reduce((c, d) => {
    c.push(d);
    const e = d.aliases.map(f => ({...d, name:f}));
    c.push(...e);
    return c;
  }, []);
  return `{ ${a.map(c => {
    const d = b ? c.closureType : c.type;
    let e = c.name, f = d;
    c.optional && !b ? e = `${c.name}?` : c.optional && b && (f = `(${ab(d)})`);
    return `${e}: ${f}`;
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
  b(a, {from:b, name:c, ...d}, e, f) {
    if (!b) {
      throw Error("From attribute of import is not given.");
    }
    this.from = b;
    this.description = Q(a);
    super.b("", {...d, noToc:!0, name:c, type:`import('${b}').${c}`}, e != f ? e : null);
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
  var {args:c = []} = a;
  const d = `function(${c.map(({I:e}) => e).join(", ")}): ${a.fullName}`;
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
  const [{content:d, props:{namespace:e, ns:f = e}}] = a, g = b == f ? void 0 : f, k = [];
  a = S("type interface constructor method import record".split(" "), d).reduce((l, {content:h, props:m, tag:n}) => {
    "record" == n && (n = "type", m.record = !0);
    const {alias:q, aliases:p, ...r} = m;
    c && R(r, c);
    var u = q ? [q] : p ? p.split(/, */) : [];
    switch(n) {
      case "type":
        n = new Y;
        c && (n.file = c);
        n.b(h, m, g, b);
        l.push(n);
        u.forEach(t => {
          const w = new Y;
          c && (w.file = c);
          w.b(h, {...r, name:t}, g, b);
          l.push(w);
        });
        break;
      case "interface":
        m = Rb({content:h, props:m, ns:g, B:b, location:c});
        m.forEach(t => {
          t.properties.some(({isConstructor:w}) => w) || Qb(t, b);
          t.isInterface = !0;
        });
        l.push(...m);
        break;
      case "constructor":
        m = Rb({content:h, props:m, ns:g, B:b, location:c});
        m.forEach(t => {
          t.properties.some(({isConstructor:w}) => w) || Qb(t, b);
          t.isConstructor = !0;
        });
        l.push(...m);
        break;
      case "method":
        m = Rb({content:h, props:m, ns:g, B:b, isMethod:!0, location:c});
        l.push(...m);
        break;
      case "import":
        u = new Lb, u.b(h, m, m.ns || m.from, b), k.push(u);
    }
    return l;
  }, []);
  b && a.forEach(l => Pb(b, l));
  return {namespace:f, types:a, imports:k};
}, Tb = (a, b, c, d, e = !1, f = null) => {
  const g = e ? new Ob : new Y;
  g.file = f;
  f = a.search(/<(prop|function|fn|static) /);
  let k = "", l = a;
  1 != f && (k = a.slice(0, f), l = a.slice(f));
  const {F:h, J:m} = lb(k, d);
  g.b(e ? m : l, b, c, d);
  ({H:a} = bb(b, h));
  e && (g.closureType = a);
  g.args || (g.args = h);
  return g;
}, Rb = ({content:a, props:b, ns:c, B:d, isMethod:e = !1, location:f = null}) => {
  const g = [], {alias:k, aliases:l, ...h} = b;
  b = Tb(a, b, c, d, e, f);
  g.push(b);
  (k ? [k] : l ? l.split(/, */) : []).forEach(m => {
    m = Tb(a, {...h, name:m}, c, d, e, f);
    m.description = `${m.description}${m.description ? " " : ""}Alias of \`${h.name}\`.`;
    g.push(m);
  });
  return g;
}, Ub = async(a, b = []) => {
  const c = await E(a);
  let d, e, f;
  try {
    ({namespace:d = null, types:e, imports:f} = Sb(c, void 0, a));
  } catch (g) {
    throw g.message = `Error while reading ${a}\n${g.message}`, g;
  }
  e = e.filter(({fullName:g}) => b.includes(g) ? !1 : !0);
  f = f.filter(({fullName:g}) => b.includes(g) ? !1 : !0);
  return {types:e, imports:f, namespace:d};
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
      let f;
      e.closureType ? f = ` * @typedef {${e.closureType}}` : e.s || (f = ` * @typedef {${Jb(e.properties, !0)}}`);
      f ? (e.description && (f = ` * ${e.description}\n${f}`), f = N(f), e = f += P(e.namespace, e.name)) : e = Fb(e);
    }
    return e;
  })].join("\n");
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const Yb = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, c) {
  const [d, ...e] = c.split(/\s+/), f = e.includes("closure"), g = e.includes("externs"), k = e.includes("noSuppress"), l = e.includes("skipNsDecl"), h = e.includes("namespace");
  let m = e.find(p => p.startsWith("ignore:"));
  m = m ? m.replace("ignore:", "").split(",") : [];
  let {v:n, A:q} = this.f;
  f && (n = !0);
  g && (q = !0);
  try {
    this.i("Detected type marker: %s", c);
    const {types:p, imports:r, namespace:u} = await Ub(d, m);
    this.emit("types", p);
    this.emit("types", r);
    let t;
    n ? t = Vb(r, p, k) : q ? (t = Wb(p, u, this.b, l) + "\n", u && this.emit("namespace", u)) : h ? (u && this.emit("namespace", u), t = Xb(r, p, !0)) : t = Xb(r, p);
    return `/* ${b} ${c} */\n${t}`;
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
function $b(a, b, c, d, e, f, g) {
  const k = this.f.v, l = this.f.D;
  let h;
  f = () => {
    if (this.lines && this.file) {
      var n;
      {
        let r = n = 0;
        for (; r < g;) {
          r += this.lines[n].length, n++;
        }
        n = {line:n, P:b.length + 11};
      }
      const {line:q, P:p} = n;
      this.i("%s:%s:%s", this.file, q, p);
    }
  };
  try {
    h = ib(c);
  } catch (n) {
    return this.i("Error while parsing the type %s", c), this.i(process.env.DEBUG ? n.stack : n.message), f(), a;
  }
  if (!h) {
    return this.i("Could not parse the type %s", c), f(), a;
  }
  const m = Object.values(this.types).map(({name:n, fullName:q}) => k || l ? q : n);
  if (!Z(h, m, this.i, c, f)) {
    return a;
  }
  c = Object.values(this.types).find(({name:n, fullName:q}) => k || l ? q == h.name : n == h.name);
  return !c || c instanceof Nb.Import ? a : c.C(e, d, b, h.nullable, k, l);
}
const Z = (a, b, c, d, e) => {
  if (a) {
    var f = a.name;
    if (!f || !"string number boolean null undefined symbol any".split(" ").includes(f)) {
      if (f && !a.application && !a.function) {
        let k = b.includes(f);
        k || (k = bc.includes(f));
        if (k) {
          return !0;
        }
        c("Type %s%s was not found.", f, d != f ? ` in ${d}` : "");
        e();
      }
      var g = [b, c, d, e];
      a.application ? a.application.forEach(k => {
        Z(k, ...g);
      }) : a.record ? Object.keys(a.record).forEach(k => {
        Z(a.record[k], ...g);
      }) : a.union ? a.union.forEach(k => {
        Z(k, ...g);
      }) : a.function && (Z(a.function.this, ...g), Z(a.function.new, ...g), a.function.args.forEach(k => {
        Z(k, ...g);
      }), Z(a.function.variableArgs, ...g), Z(a.function.return, ...g));
    }
  }
}, bc = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var cc = (a, b = !1) => {
  var {S:c} = Ta();
  const d = Va(c);
  c = Ua(c);
  return new Nb(b ? [Yb] : [Yb, d, ac, c], a);
};
const dc = /( *) \* @(fnType|methodType) {(.+?)}/gm, ec = (a, b, c, d, e, f, g = d) => `/**
${a}
 */
${b ? "static " : ""}${c ? "async " : ""}${d}(${e}) {
  return ${`${b ? f : "super"}.${g}`}(${e})
}`;
class fc extends L {
  constructor(a, b) {
    super([{re:/\/\*\*\s+( *) \* @constructor {(.+?)}[\s\S]+?(class\s+.+?\s+extends\s+(.+?)\s*){\s*}/gm, replacement(c, d, e, f, g) {
      d = a.find(({fullName:h}) => h == e);
      if (!d) {
        return console.error("Type %s in %s not found", e, b), c;
      }
      c = d.properties.filter(h => h instanceof W && !h.isConstructor).map(h => {
        const m = h.name;
        var n = h.aliases;
        const q = h.static, p = h.async;
        let r = V(h, "", !0);
        r = gc(r, e);
        const u = h.args.map(({name:t}) => t).join(", ");
        h = ec(r, q, p, m, u, g);
        n = n.map(t => ec(r + `\n * @alias ${m} An alias for **${m}**.`, q, p, t, u, g, m));
        return [h, ...n].join("\n");
      });
      const k = d.properties.find(h => h instanceof W && h.isConstructor), l = k.args.map(({name:h}) => h).join(", ");
      c = [`/**
${gc(V(k, "", !0), e)}
 */
constructor(${l}) {
  super(${l})
}`, ...c].join("\n").replace(/^/gm, "  ");
      f = `${f}{
${c}
}`;
      d.description && (f = `/**
${U(d.description)}
 */\n` + f);
      return f;
    }}, {re:dc, async replacement(c, d, e, f) {
      const g = f.split(".");
      let k, l;
      if ("methodType" == e) {
        k = f;
      } else {
        if (2 == g.length) {
          [k, l] = g;
        } else {
          if (3 == g.length) {
            k = `${g[0]}.${g[1]}`, l = g[2];
          } else {
            throw Error("The @fnType should consist of _namespace.Type.propName or Type.propName");
          }
        }
      }
      f = a.find(({fullName:h}) => h == k);
      if (!f) {
        return console.error("Type %s in %s not found", k, b), c;
      }
      if ("constructor" == l || "methodType" == e) {
        return f.h(d, !1, !0).join("\n");
      }
      e = f.properties.find(({name:h}) => h == l);
      return e ? e.parsed ? V(e, d, !0) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", l, k, b), c) : (console.error("Property %s of type %s in %s not found", l, k, b), c);
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
    const f = new fc(b, d);
    f.end(e);
    e = await D(f);
    "-" == c ? console.log(e) : c ? await F(c, e) : await F(d, e);
  }));
};
var mc = async() => {
  const {v:a = !1, D:b = !1, A:c = !1, V:d, types:e} = {v:ia, A:ka, V:y, types:la, D:ja}, f = await hc(e);
  await Promise.all(x.map(async g => {
    var k = await G(z, g);
    let l;
    k.isFile() ? l = [g] : k.isDirectory() && (k = await I(g), l = J(k.content, g));
    await lc(l, a, c, d, f, b);
  }));
};
const lc = async(a, b = !1, c = !1, d = "", e = [], f = !1) => {
  const g = [];
  await Promise.all(e.map(async k => {
    k = await E(k);
    const {types:l, imports:h} = Sb(k);
    g.push(l, h);
  }));
  await Promise.all(a.map(async k => {
    var l = await E(k);
    const h = cc({v:b, A:c, D:f}, c);
    g.forEach(m => h.emit("types", m));
    h.file = k;
    h.i = console.error;
    h.lines = l.split("\n");
    h.end(l);
    l = await D(h);
    "-" == d ? console.log(l) : d ? await F(d, l) : await F(k, l);
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
  _transform({type:a, name:b, description:c, properties:d}, e, f) {
    a = a && a.startsWith("import") ? sc(a, b) : qc(a, b, c, d);
    this.push(a);
    d.forEach(({type:g, name:k, default:l, description:h, optional:m}) => {
      {
        g = ["string", "number", "boolean"].includes(g) ? ` ${g}` : ` type="${g}"`;
        var n = void 0 !== l;
        l = n ? ` default="${l}"` : "";
        m = m && !n ? " opt" : "";
        n = " ".repeat(4);
        const q = " ".repeat(6);
        k = `${n}<prop${m}${g} name="${k}"${l}${h ? `>\n${q}${h}\n${n}</prop>` : "/>"}\n`;
      }
      this.push(k);
    });
    d.length && this.push("  </type>\n");
    f();
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
  _transform([, a, b, c, d], e, f) {
    d = cb(oc, d, pc).map(g => {
      const {defaultValue:k, Default:l, opt:h, name:m, type:n, ...q} = g;
      g = {...q, name:m, type:n, ...k ? {defaultValue:nc(k)} : {}, ...l ? {u:nc(l)} : {}, ...h ? {optional:!0} : {}};
      if (k || l) {
        if (k) {
          k !== l && void 0 !== g.u && (p = M(m, l, n), console.error("%s[%s] does not match Default `%s`.", b, p, g.u));
        } else {
          var p = M(m, l, n);
          console.error("%s[%s] got from Default.", b, p);
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