#!/usr/bin/env node
             
const fs = require('fs');
const os = require('os');
const stream = require('stream');
const path = require('path');             
var aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
function ba(a) {
  a = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  return globalThis;
}
var ca = ba(this);
function da(a, b) {
  if (b) {
    var c = ca;
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
const ea = (a, b, c, d = !1, e = !1) => {
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
}, fa = a => {
  const b = [];
  for (let c = 0; c < a.length; c++) {
    const d = a[c];
    if (d.startsWith("-")) {
      break;
    }
    b.push(d);
  }
  return b;
}, ia = () => {
  var a = ha;
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
const ha = {source:{description:"The path to the source file or directory with files to embed types into. Can specify multiple values, e.g., `typal types/index.js types/vendor.js`.", command:!0, multiple:!0}, output:{description:"The destination where to save output.\nIf not passed, the file will be overwritten.\nIf `-` is passed, prints to stdout.", short:"o"}, closure:{description:"Whether to generate types in _Closure_ mode.", boolean:!0, short:"c"}, useNamespace:{description:"Generate JSDoc for functions using namespaces.", 
boolean:!0, short:"u"}, externs:{description:"Whether to generate externs for _GCC_.", boolean:!0, short:"e"}, types:{description:"Comma-separated location of files to read types from.", short:"t"}, template:{description:"Scans the input file for `@type` comment in functions' JSDoc, and inserts the annotations from types' files.", short:"T"}, migrate:{description:"Extracts types from JavaScript source code and saves them\ninto the types.xml file specified in the output option.", boolean:!0, short:"m"}, 
help:{description:"Print the help information and exit.", boolean:!0, short:"h"}, version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, q = function(a = {}, b = process.argv) {
  let [, , ...c] = b;
  const d = fa(c);
  c = c.slice(d.length);
  a = Object.entries(a).reduce((g, [h, l]) => {
    g[h] = "string" == typeof l ? {short:l} : l;
    return g;
  }, {});
  const e = [];
  a = Object.entries(a).reduce((g, [h, l]) => {
    let k;
    try {
      const m = l.short, n = l.boolean, p = l.number, t = l.command, r = l.multiple;
      if (t && r && d.length) {
        k = d;
      } else {
        if (t && d.length) {
          k = d[0];
        } else {
          const u = ea(c, h, m, n, p);
          ({value:k} = u);
          const v = u.index, w = u.length;
          void 0 !== v && w && e.push({index:v, length:w});
        }
      }
    } catch (m) {
      return g;
    }
    return void 0 === k ? g : {...g, [h]:k};
  }, {});
  let f = c;
  e.forEach(({index:g, length:h}) => {
    Array.from({length:h}).forEach((l, k) => {
      f[g + k] = null;
    });
  });
  f = f.filter(g => null !== g);
  Object.assign(a, {Y:f});
  return a;
}(ha), x = q.source, z = q.output, ja = q.closure, ka = q.useNamespace, la = q.externs, ma = q.types, na = q.template, oa = q.migrate, pa = q.help, qa = q.version;
function ra(a = {usage:{}}) {
  const {usage:b = {}, description:c, line:d, example:e} = a;
  a = Object.keys(b);
  const f = Object.values(b), [g] = a.reduce(([k = 0, m = 0], n) => {
    const p = b[n].split("\n").reduce((t, r) => r.length > t ? r.length : t, 0);
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
    const [p, ...t] = n;
    m = `${m}\t${p}`;
    const r = h("", g);
    n = t.map(u => `${r}\t${u}`);
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
;const sa = fs.createReadStream, ta = fs.createWriteStream, A = fs.lstat, ua = fs.readFileSync, va = fs.readdir;
var wa = stream;
const B = stream.Transform, xa = stream.Writable;
const ya = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, za = (a, b = !1) => ya(a, 2 + (b ? 1 : 0)), Aa = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const C = os.EOL, Ba = os.homedir;
const Ca = /\s+at.*(?:\(|\s)(.*)\)?/, Da = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ea = Ba(), E = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Da.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Ca);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Ca, (g, h) => g.replace(h, h.replace(Ea, "~"))) : f).join("\n");
};
function Fa(a, b, c = !1) {
  return function(d) {
    var e = Aa(arguments), {stack:f} = Error();
    const g = ya(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = E(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function F(a) {
  var {stack:b} = Error();
  const c = Aa(arguments);
  b = za(b, a);
  return Fa(c, b, a);
}
;const Ga = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ha extends xa {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {R:e = F(!0), proxyError:f} = a || {}, g = (h, l) => e(l);
    super(d);
    this.b = [];
    this.N = new Promise((h, l) => {
      this.on("finish", () => {
        let k;
        b ? k = Buffer.concat(this.b) : k = this.b.join("");
        h(k);
        this.b = [];
      });
      this.once("error", k => {
        if (-1 == k.stack.indexOf("\n")) {
          g`${k}`;
        } else {
          const m = E(k.stack);
          k.stack = m;
          f && g`${k}`;
        }
        l(k);
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
const G = async a => {
  ({f:a} = new Ha({rs:a, R:F(!0)}));
  return await a;
};
async function H(a) {
  a = sa(a);
  return await G(a);
}
;async function I(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = F(!0), d = ta(a);
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
    }).on("close", e).end(b);
  });
}
;async function J(a, b, c) {
  const d = F(!0);
  if ("function" != typeof a) {
    throw Error("Function must be passed.");
  }
  if (!a.length) {
    throw Error(`Function${a.name ? ` ${a.name}` : ""} does not accept any arguments.`);
  }
  return await new Promise((e, f) => {
    const g = (l, k) => l ? (l = d(l), f(l)) : e(c || k);
    let h = [g];
    Array.isArray(b) ? h = [...b, g] : 1 < Array.from(arguments).length && (h = [b, g]);
    a(...h);
  });
}
;const Ia = path.dirname, Ja = path.join, Ka = path.relative, La = path.resolve;
async function Ma(a, b) {
  b = b.map(async c => {
    const d = Ja(a, c);
    return {lstat:await J(A, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Na = a => a.lstat.isDirectory(), Oa = a => !a.lstat.isDirectory();
async function K(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  const {ignore:b = []} = {};
  if (!(await J(A, a)).isDirectory()) {
    var c = Error("Path is not a directory");
    c.code = "ENOTDIR";
    throw c;
  }
  c = await J(va, a);
  var d = await Ma(a, c);
  c = d.filter(Na);
  d = d.filter(Oa).reduce((e, f) => {
    var g = f.lstat.isDirectory() ? "Directory" : f.lstat.isFile() ? "File" : f.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...e, [f.relativePath]:{type:g}};
  }, {});
  c = await c.reduce(async(e, {path:f, relativePath:g}) => {
    const h = Ka(a, f);
    if (b.includes(h)) {
      return e;
    }
    e = await e;
    f = await K(f);
    return {...e, [g]:f};
  }, {});
  return {content:{...d, ...c}, type:"Directory"};
}
const L = (a, b) => {
  let c = [], d = [];
  Object.keys(a).forEach(f => {
    const {type:g} = a[f];
    "File" == g ? c.push(Ja(b, f)) : "Directory" == g && d.push(f);
  });
  const e = d.reduce((f, g) => {
    const {content:h} = a[g];
    g = L(h, Ja(b, g));
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
const Qa = (a, b) => {
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
function Ra(a, b) {
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
        return d.replace(e, (h, ...l) => {
          g = Error();
          try {
            return this.j ? h : f.call(this, h, ...l);
          } catch (k) {
            Qa(g, k);
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
;const Sa = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Ta = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, Ua = () => {
  var a = {S:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\r?\n(?:([^\r\n][\s\S]+?\r?\n))?$/mg};
  return Object.keys(a).reduce((b, c) => {
    {
      var d = a[c];
      const {getReplacement:e = Ta, getRegex:f = Sa} = {}, g = f(c);
      d = {name:c, re:d, regExp:g, getReplacement:e, map:{}, lastIndex:0};
    }
    return {...b, [c]:d};
  }, {});
}, Va = a => {
  var b = [];
  const c = a.map;
  return {re:a.regExp, replacement(d, e) {
    d = c[e];
    delete c[e];
    return Ra(d, Array.isArray(b) ? b : [b]);
  }};
}, Wa = a => {
  const b = a.map, c = a.getReplacement, d = a.name;
  return {re:a.re, replacement(e) {
    const f = a.lastIndex;
    b[f] = e;
    a.lastIndex += 1;
    return c(d, f);
  }};
};
async function Xa(a, b) {
  return Ya(a, b);
}
class Za extends B {
  constructor(a, b) {
    super(b);
    this.g = (Array.isArray(a) ? a : [a]).filter(Pa);
    this.j = !1;
    this.h = b;
  }
  async replace(a, b) {
    const c = new Za(this.g, this.h);
    b && Object.assign(c, b);
    a = await Xa(c, a);
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
        const g = b.replace(c, (h, ...l) => {
          f = Error();
          try {
            if (this.j) {
              return e.length ? e.push(Promise.resolve(h)) : h;
            }
            const k = d.call(this, h, ...l);
            k instanceof Promise && e.push(k);
            return k;
          } catch (k) {
            Qa(f, k);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            Qa(f, h);
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
      a = E(d.stack), d.stack = a, c(d);
    }
  }
}
async function Ya(a, b) {
  b instanceof wa ? b.pipe(a) : a.end(b);
  return await G(a);
}
;function $a() {
  var a = ab;
  let b = "";
  const c = new B({transform(d, e, f) {
    let g;
    for (b += d.toString(); (d = a.exec(b)) && (c.push(d), g = d, a.global);) {
    }
    g && (b = b.slice(g.index + g[0].length));
    f();
  }, objectMode:!0});
  return c;
}
;const bb = (a, b, c, d) => {
  if (!a) {
    throw Error("The name of the property is not given");
  }
  a = `${d ? `${d}.` : ""}${a}`;
  if (null === b) {
    return a;
  }
  b = Number.isInteger(b) || [!0, !1, "null"].includes(b) || ["number", "boolean"].includes(c) ? b : `"${b}"`;
  return `${a}=${b}`;
}, cb = ({number:a, L:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", db = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, M = a => a ? `/**
${a}
 */
` : "/**\n */\n", N = a => ` * @suppress {nonStandardJsDocs}
${a}`, eb = (a, b, c) => {
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
  var c = a.substr(0, b).lastIndexOf(C);
  -1 == c ? c = 0 : (c++, a = a.substr(c));
  b -= c;
  const d = " ".repeat(b);
  c = a.split(C);
  if (c.filter(e => /\S/.test(e)).find(e => !e.startsWith(d))) {
    return a.trim();
  }
  {
    const e = new RegExp(`^ {${b}}`);
    return c.map(f => f.replace(e, "")).join(C);
  }
}, fb = (a, b, c = null) => {
  const {async:d, "void":e, "return":f = e ? "void" : "", ...g} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({I:h, name:l}) => "this" == l ? `${l}: ${h}` : l.startsWith("...") ? `...${h}` : h).join(","));
  b = f.replace(/\r?\n\s*/g, " ");
  d && b ? b = `!Promise<${b}>` : d && (b = "!Promise");
  c = `function(${"constructor" == g.name ? `new: ${c}, ` : ""}${a})`;
  b && (c += `: ${b}`);
  return {W:{...g, async:d, return:b}, H:c};
};
function R(a, b) {
  const c = a.example;
  c && c.startsWith(".") && b && (a.example = La(Ia(b), c));
}
;function gb(a, b, c) {
  const d = [];
  b.replace(a, (e, ...f) => {
    e = f.slice(0, f.length - 2).reduce((g, h, l) => {
      l = c[l];
      if (!l || void 0 === h) {
        return g;
      }
      g[l] = h;
      return g;
    }, {});
    d.push(e);
  });
  return d;
}
;const hb = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), ib = new RegExp(`(?:\\s+((?:${hb.source}\\s*)*))`);
const S = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return gb(new RegExp(`<(${a})${ib.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:c, a:d = "", c:e = ""}) => {
    d = d.replace(/\/$/, "").trim();
    d = jb(d);
    return {content:e, props:d, tag:c};
  });
}, jb = a => gb(hb, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
const kb = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function lb(a) {
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
          var l = a[b];
          b++;
          e[l] = null;
          if (":" == a[b]) {
            b++;
            try {
              var k = d();
              e[l] = k;
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
    if (["nonNullable", "nullable"].includes(h)) {
      throw Error("Nullability already defined.");
    }
    if (/[=),:.<>}|]/.test(h)) {
      throw Error(`Unexpected token ${h}.`);
    }
    "|" != a[b] && (g.name = a[b], b++);
    if ("function" == h) {
      k = g;
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
      k.function = l;
    } else {
      if ("<" == a[b] || (l = "." == a[b] && "<" == c())) {
        b++;
        l && b++;
        k = g;
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
        k.application = l;
      }
    }
    for (; "." == a[b];) {
      g.name += ".";
      b++;
      ({name:k} = d(!1));
      if (!k) {
        throw Error("Expected to see the name after .");
      }
      g.name += k;
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
;function mb(a) {
  a = kb(a);
  return lb(a);
}
;function nb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h}, l) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = Q(b));
  b = cb({number:g, L:d, boolean:e, type:h});
  l && (b = b.replace(new RegExp(`([!?])?${l}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), f = !0);
  a.type = b;
  f && (a.optional = !0);
}
class ob {
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
const pb = (a, b) => {
  let c = a.lastIndexOf("</arg>"), d = a;
  var e = [];
  -1 != c && (c += 6, e = a.slice(0, c), d = a.slice(c), e = S("arg", e), e = e.map(({content:f, props:g}) => {
    const h = new ob;
    nb(h, f, g, b);
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
;const U = (a, b = !1) => a.split(C).map((c, d) => {
  if (b && !d) {
    return c;
  }
  d = " *";
  c.length && (d += " ");
  return d + c;
}).join(C), qb = a => {
  const b = a.replace(/^\s*\r?\n/gm, "").split(C).reduce((c, d) => {
    [{length:d = 0} = {}] = /^\s*/.exec(d) || [];
    return d < c ? d : c;
  }, Infinity);
  return a.replace(new RegExp(`^ {${b}}`, "gm"), "");
};
function rb(a, b = "") {
  const c = b.split(/\s*,\s*/);
  return a.split(/\s*,\s*/).map(d => {
    let e = d = ua(d, "utf8");
    if (d = /\/\* start example \*\/\r?\n([\s\S]+?)\r?\n\s*\/\* end example \*\//.exec(d)) {
      [, d] = d, e = qb(d);
    }
    c.forEach(f => {
      const [g, h] = f.split(/\s*=>\s*/);
      e = e.replace(`'${g}'`, `'${h}'`);
      e = e.replace(`"${g}"`, `"${h}"`);
    });
    return e = e.replace(/@/g, "\uff20");
  });
}
function sb(a, {O:b = !0, T:c = !0} = {}) {
  const d = [];
  b && d.push(" * @example");
  a.forEach(e => {
    let f = [], g = [], h = "", l;
    e = e.split(C).reduce((k, m) => {
      m.startsWith("///") ? (l = "comment", f.push(m)) : (l = "block", g.push(m));
      h || (h = l);
      l != h && ("block" == l ? (k.push(f.join(C)), f = []) : (k.push(g.join(C)), g = []), h = l);
      return k;
    }, []);
    f.length ? e.push(f.join(C)) : g.length && e.push(g.join(C));
    e = e.reduce((k, m) => {
      m.startsWith("///") ? (m = m.replace(/^\/\/\/\s+/gm, ""), k.push(...m.split(C))) : (k.push("```js"), k.push(...m.split(C)), k.push("```"));
      return k;
    }, []);
    c && (e = e.map(k => U(k)));
    d.push(...e);
  });
  return d;
}
function tb(a, b, c = new RegExp(`([!?])?${b}\\.`, "g")) {
  b && (a.f && (a.f = a.f.replace(c, "$1")), a.type = a.type.replace(c, "$1"));
}
function ub(a, b = !1) {
  return b ? a.closureType : a.isParsedFunction ? a.toTypeScriptFunction(T) : a.type;
}
function vb(a, b = null, c = !1, d = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = bb(a.name, a.optional ? a.default : null, a.type, b);
  b = a.optional ? `[${b}]` : b;
  var e = a.m;
  e = e ? ` ${e}` : "";
  c = `{${ub(a, c)}} ${b}${e}`;
  d && (a = sb(a.examples, {O:!1, T:!1}).join(C).replace(/\*/g, "\uff0a")) && (c += `${C}${a}`);
  return c;
}
function wb(a, b = !1) {
  a = vb(a, null, b, !0);
  return ` * @prop ${U(a, !0)}`;
}
function xb(a, b) {
  const c = [], {function:{args:d, return:e, variableArgs:f, this:g}} = a.parsed;
  d.map(h => T(h)).forEach((h, l) => {
    const {optional:k} = d[l], {name:m = `arg${l}`, description:n} = a.args[l] || {};
    c.push(` * @param {${h}${k ? "=" : ""}} ${k ? `[${m}]` : m}${n ? ` ${n}` : ""}`);
  });
  if (f) {
    const {M:h, X:l} = yb(a.args || []), k = [h, l].filter(Boolean).join(" ");
    c.push(` * @param {...${T(f)}} ${k}`);
  }
  g && c.push(` * @this {${T(g)}}`);
  if (e && "void" != e.name) {
    if (b && a.u) {
      return c;
    }
    b = T(e);
    c.push(` * @return {${b}}`);
  }
  return c;
}
function zb(a) {
  if (a.isParsedFunction) {
    const {function:{args:b, variableArgs:c}} = a.parsed, d = b.map((e, f) => {
      ({name:e = `arg${f}`} = a.l[f] || {});
      return e;
    });
    if (c) {
      const {M:e} = yb(a.args || []);
      d.push(`...${e}`);
    }
    return ` = function(${d.join(", ")}) {}`;
  }
  return a.type.startsWith("function(") ? " = function() {}" : "";
}
function V(a, b = "", c = !1) {
  let d = [];
  var e = a.m;
  e && (e = U(e), d.push(...e.split(C)));
  !a.optional && a.isParsedFunction ? (e = xb(a, c), d.push(...e)) : d.push(` * @type {${a.optional ? db(a.closureType) : a.closureType}}`);
  c && a.examples.length && (a = sb(a.examples), d.push(...a));
  b && (d = d.map(f => `${b}${f}`));
  return d.join(C);
}
function Ab(a, b) {
  const c = Object.assign(Object.create(Object.getPrototypeOf(a)), a);
  c.description = `An alias for \`${a.name}\`.`;
  c.name = b;
  return c;
}
class Bb {
  constructor(a = null) {
    this.h = this.description = this.name = null;
    this.closureType = "";
    this.default = this.f = null;
    this.optional = !1;
    this.aliases = [];
    this.s = !1;
    this.parsed = null;
    this.args = a;
    this.g = !1;
    this.examples = [];
    this.u = !1;
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    let {function:{new:b, args:c, return:d, this:e, variableArgs:f}} = this.parsed;
    b && (d = b);
    var g = c.map(l => a(l)).map((l, k) => {
      const {optional:m} = c[k];
      let {name:n = `arg${k}`, optional:p = m} = this.l[k] || {};
      return `${`${n}${p ? "?" : ""}`}: ${l}`;
    });
    if (e) {
      var h = a(e);
      g.unshift(`this: ${h}`);
    }
    if (f) {
      h = a(f);
      let l = "...args";
      try {
        l = `${this.args[this.args.length - 1].name}`;
      } catch (k) {
      }
      g.push(`${l}: ${h}[]`);
    }
    g = g.join(", ");
    h = d ? a(d) : "?";
    g = `(${g}) => ${h}`;
    b && (g = "new " + g);
    return g;
  }
  get static() {
    return this.g;
  }
  get hasDefault() {
    return null !== this.default;
  }
  b(a, {name:b, string:c, "boolean":d, opt:e, number:f, type:g, "default":h, closure:l, alias:k, aliases:m, example:n, "example-override":p = "", noParams:t, "static":r, initial:u, "template-no-return":v}) {
    if (!b) {
      throw Error("Property does not have a name.");
    }
    this.name = b;
    a && (this.description = Q(a));
    a = cb({number:f, L:c, boolean:d, type:g});
    t && (this.s = t);
    l && (this.f = l);
    this.type = a;
    void 0 !== h ? this.default = h : void 0 !== u && (this.default = u);
    if (e || void 0 !== h) {
      this.optional = !0;
    }
    k && (this.aliases = [k]);
    m && (this.aliases = m.split(/\s*,\s*/));
    r && (this.g = !0);
    n && (this.examples = rb(n, p));
    v && (this.u = !0);
  }
  get type() {
    return this.h || "*";
  }
  set type(a) {
    this.h = a || null;
    this.closureType = this.f || this.h || "";
    if (!this.s) {
      try {
        this.parsed = mb(this.closureType), this.isParsedFunction && !this.args && (this.args = []);
      } catch (b) {
        this.parsed = null;
      }
    }
  }
  get m() {
    let a = this.description || "";
    return `${a}${this.hasDefault ? `${/``` */.test(this.description) ? C : a ? " " : ""}Default \`${this.default}\`.` : ""}`;
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
    a = vb(this, a, c);
    const [d, ...e] = a.split(C);
    return [`@param ${d}`, ...e].map(f => `${b} * ${f}`).join(C);
  }
}
const yb = a => {
  let b = "args";
  const {name:c = "", description:d} = a[a.length - 1] || {};
  c.startsWith("...") && (b = c.replace("...", ""));
  return {M:b, X:d};
};
class W extends Bb {
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
;function Cb(a, b, c, d) {
  var e = S("prop", a).map(({content:l, props:k}) => {
    const m = new Bb;
    R(k, c);
    m.b(l, k);
    return m;
  });
  a = S(["function", "fn", "static"], a).map(({content:l, props:k, tag:m}) => {
    m = "static" == m;
    const {J:n, F:p} = pb(l, b);
    l = new W(p);
    const {W:t, H:r} = fb(k, p, d);
    t.type = r;
    R(t, c);
    l.b(n, t);
    m && (l.g = !0);
    return l;
  });
  e = [...e, ...a];
  const {G:f, K:g, n:h} = e.reduce((l, k) => {
    k.isConstructor ? l.G.push(k) : k.static ? l.K.push(k) : l.n.push(k);
    return l;
  }, {G:[], K:[], n:[]});
  return {constructor:f[0] || null, properties:[...f, ...g, ...h]};
}
;const Db = (a, b, c = {}) => {
  let d;
  if ("object" == typeof b) {
    d = b;
  } else {
    try {
      (d = mb(b)) || console.log("Could not parse %s", b);
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
    a.function.args.forEach(h => {
      let l = X(h, b, c);
      h.optional && (l += "=");
      g.push(l);
    });
    a.function.variableArgs && (d = "..." + X(a.function.variableArgs, b, c), g.push(d));
    d = g.join(", ");
    e += d + ")";
    a.function.return && (e += ": " + X(a.function.return, b, c));
  } else {
    a.record ? (e += "{ ", d = Object.keys(a.record).map(g => {
      var h = a.record[g];
      if (!h) {
        return g;
      }
      h = X(h, b, c);
      return `${g}: ${h}`;
    }), e += d.join(", "), e += " }") : a.application ? (e += Eb(a.name, b, f, c) + "&lt;", d = a.application.map(g => X(g, b, c)), e += d.join(", "), e += "&gt;") : a.union ? (e = e + f + "(", f = a.union.map(g => X(g, b, c)), e += f.join(d ? " \\| " : " | "), e += ")") : e += Eb("any" == a.name ? "*" : a.name, b, f, c);
  }
  return e;
}, Eb = (a, b, c = "", d = {}) => {
  const {flatten:e = !1, nameProcess:f, link:g = ({link:k}) => `#${k}`} = d;
  d = Fb(b, a);
  c = `${c}${a}`;
  if (!d) {
    return c;
  }
  let {link:h, type:{description:l}} = d;
  e && ((b = b.find(({fullName:k}) => k == a)) && b.link && (h = b.link), !l && b.description && (l = b.description), "function" == typeof e && e(a));
  d.link == h && (h = g(d));
  b = f ? f(c) : c;
  return l ? `<a href="${h}" title="${l.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${h})`;
}, Fb = (a, b) => {
  a = a.filter(({fullName:d}) => d == b);
  if (a.length) {
    var c = a.find(({import:d}) => d || !1);
    a = a.find(({import:d}) => !d) || c;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function Gb(a, b = [], c = [], d = {}) {
  const {narrow:e = !1, preprocessDesc:f} = d;
  if (!b.length) {
    return "";
  }
  const g = a.isConstructor || a.isInterface, h = b.some(({hasDefault:n}) => n), l = {escapePipe:!e, ...d};
  let k;
  const m = n => Db(c, n, {...l, nameProcess:d.nameProcess ? p => d.nameProcess(p, k) : void 0});
  a = b.map((n, p) => {
    k = 0 < (p + 1) % 2;
    p = n.args && n.isParsedFunction ? n.toTypeScriptFunction(m) : m(n.parsed || n.type);
    const t = g || n.optional ? n.name : `${n.name}*`, r = n.hasDefault ? `\`${n.default}\`` : "-", u = f ? f(n.description) : n.description;
    return {prop:n, typeName:p, name:t, de:Hb(u, !e), d:r, Z:k};
  });
  if (e) {
    return {props:a, anyHaveDefault:h, constr:g};
  }
  a = a.map(({name:n, typeName:p, de:t, d:r, prop:u}) => [u.optional ? n : `__${n}__`, `<em>${p}</em>`, t, ...h ? [r] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...h ? [g ? "Initial" : "Default"] : []];
  return `

\`\`\`table
${JSON.stringify([b, ...a], null, 2)}
\`\`\``;
}
const Hb = (a = "", b = !0) => {
  null === a && (a = "");
  b && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
};
const Ib = (a, b, c = {}) => {
  function d(e) {
    e.replace(/^!?/, "");
    return `\`${e}\``;
  }
  return a.split(/,\s*/).map(e => Db(b, e, {flatten:!0, ...c, nameProcess:c.nameProcess ? f => {
    f = c.nameProcess(f);
    return /[_*~>]/.test(f) ? `<code>${f}</code>` : d(f);
  } : d})).join(", ");
};
function Jb(a) {
  var b = a.h();
  b = M(b.join(C));
  b += eb(a.namespace, a.name, Kb(a));
  const c = a.properties.reduce((d, e) => {
    d.push(e);
    const f = e.aliases.map(g => Ab(e, g));
    d.push(...f);
    return d;
  }, []).filter(d => d instanceof W && d.isConstructor ? !1 : !0).map(d => {
    let e = V(d);
    e = M(e);
    e += eb(`${a.fullName}${d.static ? "" : ".prototype"}`, d.name);
    return e += zb(d);
  });
  return [b, ...c].join(C);
}
function Lb(a, b = !1) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return b ? `${a.ns}${c}` : c;
}
function Mb(a, b = !1, c = !1, d = b) {
  d = ` * @typedef {${(b ? a.closureType : a.type) || a.s()}}${` ${Lb(a, d)}${a.l}`}`;
  a = (a.properties ? a.properties.reduce((e, f) => {
    if (f.g) {
      return e;
    }
    e.push(f);
    const g = f.aliases.map(h => Ab(f, h));
    e.push(...g);
    return e;
  }, []) : []).filter(e => e instanceof W ? !e.isConstructor : !0).map(e => wb(e, b));
  a = [d, ...a].join(C);
  b && !c && (a = N(a));
  return a = M(a);
}
function Kb(a) {
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
  b(a, {name:b, type:c, desc:d, noToc:e, spread:f, noExpand:g, link:h, closure:l, constructor:k, "extends":m, "interface":n, record:p, example:t, "example-override":r}, u, v = null) {
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
    h && (this.link = h);
    !0 === k && (this.isConstructor = k);
    !0 === n && (this.isInterface = n);
    !0 === p && (this.isRecord = p);
    m && (this.extends = m);
    u && (this.namespace = u);
    if (a) {
      const {properties:w, constructor:y} = Cb(a, v, this.file, this.fullName);
      y && (this.args = y.args);
      this.properties = w;
    }
    t && (a = {example:t}, R(a, this.file), this.examples = rb(a.example, r));
  }
  get u() {
    return this.isConstructor || this.isInterface || this.isRecord;
  }
  s() {
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
    const d = !!this.extends, e = Mb(this, a, b, c), f = [];
    if (this.namespace && a) {
      var g = ` * @typedef {${this.fullName}} ${this.name}${this.l}`;
      a && !b && (g = N(g));
      g = M(g);
      f.push(g);
    } else {
      this.namespace && c && (g = ` * @typedef {${this.fullName}} ${this.name}${this.l}`, g = M(g), f.push(g));
    }
    d && (c = ` * @typedef {${Lb(this, c)} & ${this.extends.split(/,\s*/).join(" & ")}} ${c ? this.fullName : this.name}${this.l}`, a && !b && (c = N(c)), c = M(c), f.push(c));
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
      let {name:g, description:h, optional:l, type:k} = f;
      f = h ? ` ${h}` : "";
      if (g.startsWith("...")) {
        g = g.slice(3), k = `...${k}`;
      } else {
        if ("this" == g) {
          d.push(` * @this {${k}}${f}`);
          return;
        }
      }
      d.push(` * @param {${k}${l ? "=" : ""}} ${l ? `[${g}]` : g}${f}`);
    });
    b && d.push(` * @${this.U}`);
    c && this.examples.length && (b = sb(this.examples), d.push(...b));
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
    const h = this.spread ? Nb(this.properties) : e || f ? this.fullName : this.name;
    b = `${c || ""} * @param {${g}${h}} ${b ? `[${a}]` : a}${d}`;
    g = this.properties && !this.noExpand ? this.properties.map(l => l.C(a, c, e, f)) : [];
    return [b, ...g].join(C);
  }
  toMarkdown(a = [], b = {}) {
    const {flatten:c, details:d = []} = b, e = d.includes(this.name);
    var f = this.type ? `\`${this.type}\`` : "", g = f;
    this.link ? g = `[${f}](${this.link})` : !this.import && this.type && (g = Db(a, this.type, b), f = g != this.type, g = Ob(g, f));
    f = Ob(this.fullName);
    f = this.import ? `[${f}](l-type)` : this.noToc ? `[${f}](l-type)` : `[${f}](t-type)`;
    const h = this.description ? `: ${this.description}` : "";
    g = g ? `${g} ` : "";
    let l = /_/.test(f);
    if (this.extends) {
      const k = Ib(this.extends, a, b), m = ` extends ${k}`;
      l = l || /_/.test(k);
      g = (l ? g + "<strong>" : g + "__") + (f + m);
      "function" == typeof c && c(this.extends);
    } else {
      g = (l ? g + "<strong>" : g + "__") + f;
    }
    g = (l ? g + "</strong>" : g + "__") + h;
    a = Gb(this, this.properties, a, b);
    return {LINE:g, table:a, displayInDetails:e};
  }
}
const Ob = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`, Nb = (a = [], b = !1) => {
  a = a.reduce((c, d) => {
    c.push(d);
    const e = d.aliases.map(f => ({...d, name:f}));
    c.push(...e);
    return c;
  }, []);
  return `{ ${a.map(c => {
    const d = b ? c.closureType : c.type;
    let e = c.name, f = d;
    c.optional && !b ? e = `${c.name}?` : c.optional && b && (f = `(${db(d)})`);
    return `${e}: ${f}`;
  }).join(", ")} }`;
};
class Pb extends Y {
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
;function Qb(a, b) {
  b = b.reduce((c, d) => ({...c, [d.fullName]:d}), {});
  a.A = {...a.A, ...b};
}
class Rb extends Za {
  constructor(a, b = {}) {
    super(a);
    this.A = {};
    this.on("types", c => {
      Qb(this, c);
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
    return Pb;
  }
  get types() {
    return this.A;
  }
}
;class Sb extends Y {
  constructor() {
    super();
    this.f = null;
    this.async = !1;
  }
  get u() {
    return !1;
  }
  get isMethod() {
    return !0;
  }
  b(a, {async:b, "return":c, ...d}, ...e) {
    this.description = Q(a);
    super.b("", d, ...e);
    c && (this.f = c.replace(/\r?\n\s*/g, " "));
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
  s() {
    return `(${this.args.map(({name:a, type:b, optional:c}) => `${a}${c ? "?" : ""}: ${b}`).join(", ")}) => ${this.return}`;
  }
  m(a) {
    a = super.m(a);
    this.f && (this.f = this.f.replace(a, "$1"));
  }
}
;const Tb = (a, b) => {
  const c = new RegExp(`([!?])?${a}\\.`, "g");
  b.properties.forEach(d => {
    tb(d, a, c);
  });
  b.m(a);
}, Ub = (a, b) => {
  var {args:c = []} = a, d = c.map(({I:f}) => f).join(", ");
  let e = `new: ${a.fullName}`;
  d.length && (e = `${e}, `);
  d = `function(${e}${d})`;
  c = new W(c);
  c.isConstructor = !0;
  c.b("Constructor method.", {type:d, name:"constructor"});
  c.examples = a.examples;
  tb(c, b);
  a.properties.unshift(c);
}, Wb = (a, b, c = null) => {
  a = S("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:d, props:{namespace:e, ns:f = e}}] = a, g = b == f ? void 0 : f;
  a = S(["embed"], d).map(({props:k}) => k);
  const h = [], l = S("type interface constructor method import record".split(" "), d).reduce((k, {content:m, props:n, tag:p}) => {
    "record" == p && (p = "type", n.record = !0);
    const {alias:t, aliases:r, ...u} = n;
    c && R(u, c);
    var v = t ? [t] : r ? r.split(/, */) : [];
    switch(p) {
      case "type":
        p = new Y;
        c && (p.file = c);
        p.b(m, n, g, b);
        k.push(p);
        v.forEach(w => {
          const y = new Y;
          c && (y.file = c);
          y.b(m, {...u, name:w}, g, b);
          k.push(y);
        });
        break;
      case "interface":
        n = Vb({content:m, props:n, ns:g, B:b, location:c});
        n.forEach(w => {
          w.properties.some(({isConstructor:y}) => y) || Ub(w, b);
          w.isInterface = !0;
        });
        k.push(...n);
        break;
      case "constructor":
        n = Vb({content:m, props:n, ns:g, B:b, location:c});
        n.forEach(w => {
          w.properties.some(({isConstructor:y}) => y) || Ub(w, b);
          w.isConstructor = !0;
        });
        k.push(...n);
        break;
      case "method":
        n = Vb({content:m, props:n, ns:g, B:b, isMethod:!0, location:c});
        k.push(...n);
        break;
      case "import":
        v = new Pb, v.b(m, n, n.ns || n.from, b), h.push(v);
    }
    return k;
  }, []);
  b && l.forEach(k => Tb(b, k));
  return {namespace:f, types:l, imports:h, embeds:a};
}, Xb = (a, b, c, d, e = !1, f = null) => {
  const g = e ? new Sb : new Y;
  g.file = f;
  f = a.search(/<(prop|function|fn|static) /);
  let h = "", l = a;
  1 != f && (h = a.slice(0, f), l = a.slice(f));
  const {F:k, J:m} = pb(h, d);
  g.b(e ? m : l, b, c, d);
  ({H:a} = fb(b, k));
  e && (g.closureType = a);
  g.args || (g.args = k);
  return g;
}, Vb = ({content:a, props:b, ns:c, B:d, isMethod:e = !1, location:f = null}) => {
  const g = [], {alias:h, aliases:l, ...k} = b;
  b = Xb(a, b, c, d, e, f);
  g.push(b);
  (h ? [h] : l ? l.split(/, */) : []).forEach(m => {
    m = Xb(a, {...k, name:m}, c, d, e, f);
    m.description = `${m.description}${m.description ? " " : ""}Alias of \`${k.name}\`.`;
    g.push(m);
  });
  return g;
}, Yb = async(a, b = []) => {
  const c = await H(a);
  let d, e, f, g;
  try {
    ({namespace:d = null, types:e, imports:f, embeds:g} = Wb(c, void 0, a));
  } catch (h) {
    throw h.message = `Error while reading ${a}${C}${h.message}`, h;
  }
  e = e.filter(({fullName:h}) => b.includes(h) ? !1 : !0);
  f = f.filter(({fullName:h}) => b.includes(h) ? !1 : !0);
  return {types:e, imports:f, namespace:d, embeds:g};
};
const Zb = (a, b, c) => {
  b = b.map(d => d.g(!0, c));
  a = a.map(d => {
    d = d.g();
    return M(c ? d : N(d));
  });
  return [...b, ...a].join("");
}, $b = (a, b, c, d = !1) => {
  a = [...a.map(e => {
    {
      let f;
      e.closureType ? f = ` * @typedef {${e.closureType}}` : e.u || (f = ` * @typedef {${Nb(e.properties, !0)}}`);
      f ? (e.description && (f = ` * ${e.description}${C}${f}`), f = M(f), e = f += eb(e.namespace, e.name)) : e = Jb(e);
    }
    return e;
  })].join(C);
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
async function ac(a, b, c) {
  const [d, ...e] = c.split(/\s+/);
  var f = e.includes("closure");
  const g = e.includes("externs"), h = e.includes("noSuppress"), l = e.includes("skipNsDecl"), k = e.includes("namespace"), m = e.includes("noEmbed") || e.includes("no-embed");
  let n = e.find(r => r.startsWith("ignore:"));
  n = n ? n.replace("ignore:", "").split(",") : [];
  let {o:p, w:t} = this.f;
  f && (p = !0);
  g && (t = !0);
  try {
    this.i("Detected type marker: %s", c);
    const {types:r, imports:u, namespace:v, embeds:w} = await Yb(d, n);
    this.emit("types", r);
    this.emit("types", u);
    f = [];
    m || (f = await Promise.all(w.map(async({src:D, path:hc = D, ignore:O = n.join(","), namespace:ic = k, o:jc = p, w:kc = t, "no-suppress":lc = h}) => {
      D = [hc];
      O && D.push(`ignore:${O}`);
      ic && D.push("namespace");
      jc && D.push("closure");
      kc && D.push("ext");
      lc && D.push("noSuppress");
      O = D.join(" ");
      return await ac.call(this, `${C} /* typal-embed ${O} */${C}`, "typal-embed", O);
    })));
    let y = f.join(""), P;
    p ? P = Zb(u, r, h) : t ? (P = $b(r, v, this.b, l) + C, v && this.emit("namespace", v)) : k ? (v && this.emit("namespace", v), P = bc(u, r, !0)) : P = bc(u, r);
    return `/* ${b} ${c} */${C}${P}${y}`;
  } catch (r) {
    return this.i("(%s) Could not process typedef-js: %s", c, r.message), process.env.b && console.error(r.stack), a;
  }
}
const cc = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\r?\n(?:([^\n][\s\S]+?\r?\n))?$/mg, replacement:ac}, bc = (a, b, c = !1) => {
  b = b.map(d => d.g(!1, !1, c));
  a = a.map(d => d.g(c)).map(M).join("");
  b = b.join("");
  return `${a}${b}`.replace(dc, " * @typedef");
}, dc = / \*\/\r?\n\/\*\*\r?\n \* @typedef/g;
const fc = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\r?\n(?: +)\* @param {(?:.+?)} \[?\4\]?(?:(?!\r?\n\s*\*(?:\/|\s*@))[\s\S])*)*)/gm, replacement:ec};
function ec(a, b, c, d, e, f, g) {
  const h = this.f.o, l = this.f.D;
  let k;
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
      const {line:p, P:t} = n;
      this.i("%s:%s:%s", this.file, p, t);
    }
  };
  try {
    k = mb(c);
  } catch (n) {
    return this.i("Error while parsing the type %s", c), this.i(process.env.DEBUG ? n.stack : n.message), f(), a;
  }
  if (!k) {
    return this.i("Could not parse the type %s", c), f(), a;
  }
  const m = Object.values(this.types).map(({name:n, fullName:p}) => h || l ? p : n);
  if (!Z(k, m, this.i, c, f)) {
    return a;
  }
  c = Object.values(this.types).find(({name:n, fullName:p}) => h || l ? p == k.name : n == k.name);
  return !c || c instanceof Rb.Import ? a : c.C(e, d, b, k.nullable, h, l);
}
const Z = (a, b, c, d, e) => {
  if (a) {
    var f = a.name;
    if (!f || !"string number boolean null undefined symbol any".split(" ").includes(f)) {
      if (f && !a.application && !a.function) {
        let h = b.includes(f);
        h || (h = gc.includes(f));
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
}, gc = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var mc = (a, b = !1) => {
  var {S:c} = Ua();
  const d = Wa(c);
  c = Va(c);
  return new Rb(b ? [cc] : [cc, d, fc, c], a);
};
const nc = /( *) \* @(fnType|methodType) {(.+?)}/gm, oc = (a, b, c, d, e, f, g = d) => `/**
${a}
 */
${b ? "static " : ""}${c ? "async " : ""}${d}(${e}) {
  return ${`${b ? f : "super"}.${g}`}(${e})
}`;
class pc extends Za {
  constructor(a, b) {
    super([{re:/\/\*\*\s+( *) \* @constructor {(.+?)}[\s\S]+?(class\s+.+?\s+extends\s+(.+?)\s*){\s*}/gm, replacement(c, d, e, f, g) {
      d = a.find(({fullName:k}) => k == e);
      if (!d) {
        return console.error("Type %s in %s not found", e, b), c;
      }
      c = d.properties.filter(k => k instanceof W && !k.isConstructor).map(k => {
        const m = k.name;
        var n = k.aliases;
        const p = k.static, t = k.async;
        let r = V(k, "", !0);
        r = qc(r, e);
        const u = k.args.map(({name:v}) => v).join(", ");
        k = oc(r, p, t, m, u, g);
        n = n.map(v => oc(r + `${C} * @alias ${m} An alias for **${m}**.`, p, t, v, u, g, m));
        return [k, ...n].join(C);
      });
      const h = d.properties.find(k => k instanceof W && k.isConstructor), l = h.args.map(({name:k}) => k).join(", ");
      c = [`/**
${qc(V(h, "", !0), e)}
 */
constructor(${l}) {
  super(${l})
}`, ...c].join(C).replace(/^/gm, "  ");
      f = `${f}{
${c}
}`;
      d.description && (f = `/**
${U(d.description)}
 */${C}` + f);
      return f;
    }}, {re:nc, async replacement(c, d, e, f) {
      const g = f.split(".");
      let h, l;
      if ("methodType" == e) {
        h = f;
      } else {
        if (2 == g.length) {
          [h, l] = g;
        } else {
          if (3 == g.length) {
            h = `${g[0]}.${g[1]}`, l = g[2];
          } else {
            throw Error("The @fnType should consist of _namespace.Type.propName or Type.propName");
          }
        }
      }
      f = a.find(({fullName:k}) => k == h);
      if (!f) {
        return console.error("Type %s in %s not found", h, b), c;
      }
      if ("constructor" == l || "methodType" == e) {
        return f.h(d, !1, !0).join(C);
      }
      e = f.properties.find(({name:k}) => k == l);
      return e ? e.parsed ? V(e, d, !0) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", l, h, b), c) : (console.error("Property %s of type %s in %s not found", l, h, b), c);
    }}]);
  }
}
const qc = (a, b) => a.replace(`${C} * @return {${b}}`, "").replace(`${C} * @return {!${b}}`, "").replace(`${C} * @return {?${b}}`, "");
const rc = async a => a ? (await Promise.all(a.split(",").map(async b => {
  var c = [];
  const d = await J(A, b);
  d.isFile() ? c = [b] : d.isDirectory() && (c = await K(b), c = L(c.content, b), c = c.filter(e => e.endsWith(".xml")));
  return c;
}))).reduce((b, c) => [...b, ...c], []) : [], sc = async a => (await Promise.all(a.map(async b => ({...await Yb(b), location:b})))).reduce((b, {imports:c, types:d}) => {
  b.push(...c);
  b.push(...d);
  return b;
}, []);
async function tc() {
  const a = await rc(ma), b = await sc(a);
  await Promise.all(x.map(async c => {
    var d = await J(A, c);
    let e;
    d.isFile() ? e = [c] : d.isDirectory() && (d = await K(c), e = L(d.content, c));
    await uc(e, b, na);
  }));
}
const uc = async(a, b = [], c = null) => {
  await Promise.all(a.map(async d => {
    var e = await H(d);
    const f = new pc(b, d);
    f.end(e);
    e = await G(f);
    "-" == c ? console.log(e) : c ? await I(c, e) : await I(d, e);
  }));
};
var wc = async() => {
  const {o:a = !1, D:b = !1, w:c = !1, V:d, types:e} = {o:ja, w:la, V:z, types:ma, D:ka}, f = await rc(e);
  await Promise.all(x.map(async g => {
    var h = await J(A, g);
    let l;
    h.isFile() ? l = [g] : h.isDirectory() && (h = await K(g), l = L(h.content, g));
    await vc(l, a, c, d, f, b);
  }));
};
const vc = async(a, b = !1, c = !1, d = "", e = [], f = !1) => {
  const g = [];
  await Promise.all(e.map(async h => {
    h = await H(h);
    const {types:l, imports:k} = Wb(h);
    g.push(l, k);
  }));
  await Promise.all(a.map(async h => {
    var l = await H(h);
    const k = mc({o:b, w:c, D:f}, c);
    g.forEach(m => k.emit("types", m));
    k.file = h;
    k.i = console.error;
    k.lines = l.split(C);
    k.end(l);
    l = await G(k);
    "-" == d ? console.log(l) : d ? await I(d, l) : await I(h, l);
  }));
};
const xc = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, yc = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, zc = "type opt name quote defaultValue description Default".split(" "), ab = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\r?\\n((?:${/ \* @prop(?:erty)? .+\r?\n/.source})*)`, "gm"), Ac = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>${C}`;
};
class Bc extends B {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform({type:a, name:b, description:c, properties:d}, e, f) {
    a = a && a.startsWith("import") ? Cc(a, b) : Ac(a, b, c, d);
    this.push(a);
    d.forEach(({type:g, name:h, default:l, description:k, optional:m}) => {
      {
        g = ["string", "number", "boolean"].includes(g) ? ` ${g}` : ` type="${g}"`;
        var n = void 0 !== l;
        l = n ? ` default="${l}"` : "";
        m = m && !n ? " opt" : "";
        n = " ".repeat(4);
        const p = " ".repeat(6);
        h = `${n}<prop${m}${g} name="${h}"${l}${k ? `>${C}${p}${k}${C}${n}</prop>` : "/>"}${C}`;
      }
      this.push(h);
    });
    d.length && this.push(`  </type>${C}`);
    f();
  }
}
const Cc = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />${C}`;
};
class Dc extends B {
  constructor() {
    super({objectMode:!0});
  }
  _transform([, a, b, c, d], e, f) {
    d = gb(yc, d, zc).map(g => {
      const {defaultValue:h, Default:l, opt:k, name:m, type:n, ...p} = g;
      g = {...p, name:m, type:n, ...h ? {defaultValue:xc(h)} : {}, ...l ? {v:xc(l)} : {}, ...k ? {optional:!0} : {}};
      if (h || l) {
        if (h) {
          h !== l && void 0 !== g.v && (t = bb(m, l, n), console.error("%s[%s] does not match Default `%s`.", b, t, g.v));
        } else {
          var t = bb(m, l, n);
          console.error("%s[%s] got from Default.", b, t);
        }
        g.default = "defaultValue" in g ? g.defaultValue : g.v;
        delete g.defaultValue;
        delete g.v;
      }
      return g;
    });
    this.push({type:a, name:b, description:c, properties:d});
    f();
  }
}
async function Ec(a) {
  const b = $a(), c = new Dc, d = new Bc;
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
  ${(await G(d)).trim()}
</types>`;
}
;var Fc = async() => {
  await Promise.all(x.map(async a => {
    a = await H(a);
    a = await Ec(a);
    z ? await I(z, a) : console.log(a);
  }));
};
/*

 Typal: keep types information in XML files to embed as typedefs,
        Closure Compiler externs and markdown tables.

 Copyright (C) 2020  Art Deco

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
if (pa) {
  const a = ia();
  console.log(ra({usage:a, description:"Embeds and maintains Closure-compatible types JSDoc in\nJavaScript source code from an external types.xml file.", line:"typal source [--closure|externs] [--migrate] [-o output] [-hv]", example:"typal src/index.js -c"}));
  process.exit();
} else {
  qa && (console.log(require("../../package.json").version), process.exit());
}
(async() => {
  try {
    return oa ? await Fc() : na ? await tc() : await wc();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map