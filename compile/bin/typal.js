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
  a = Object.entries(a).reduce((g, [h, k]) => {
    g[h] = "string" == typeof k ? {short:k} : k;
    return g;
  }, {});
  const e = [];
  a = Object.entries(a).reduce((g, [h, k]) => {
    let l;
    try {
      const {short:m, boolean:n, number:p, command:q, multiple:r} = k;
      if (q && r && d.length) {
        l = d;
      } else {
        if (q && d.length) {
          l = d[0];
        } else {
          const t = da(c, h, m, n, p);
          ({value:l} = t);
          const {index:u, length:L} = t;
          void 0 !== u && L && e.push({index:u, length:L});
        }
      }
    } catch (m) {
      return g;
    }
    return void 0 === l ? g : {...g, [h]:l};
  }, {});
  let f = c;
  e.forEach(({index:g, length:h}) => {
    Array.from({length:h}).forEach((k, l) => {
      f[g + l] = null;
    });
  });
  f = f.filter(g => null !== g);
  Object.assign(a, {S:f});
  return a;
}(fa), x = v.source, ia = v.output, ja = v.closure, ka = v.useNamespace, la = v.externs, ma = v.types, na = v.template, oa = v.migrate, pa = v.help, qa = v.version;
function ra(a = {usage:{}}) {
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
;const {createReadStream:sa, createWriteStream:ta, lstat:y, readFileSync:ua, readdir:va} = fs;
var wa = stream;
const {Transform:z, Writable:xa} = stream;
const ya = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, za = (a, b = !1) => ya(a, 2 + (b ? 1 : 0)), Ca = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:Da} = os;
const Ea = /\s+at.*(?:\(|\s)(.*)\)?/, Fa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ga = Da(), A = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Fa.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Ea);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Ea, (g, h) => g.replace(h, h.replace(Ga, "~"))) : f).join("\n");
};
function Ha(a, b, c = !1) {
  return function(d) {
    var e = Ca(arguments), {stack:f} = Error();
    const g = ya(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = A(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function C(a) {
  var {stack:b} = Error();
  const c = Ca(arguments);
  b = za(b, a);
  return Ha(c, b, a);
}
;const Ia = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ja extends xa {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {N:e = C(!0), proxyError:f} = a || {}, g = (h, k) => e(k);
    super(d);
    this.b = [];
    this.L = new Promise((h, k) => {
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
          const m = A(l.stack);
          l.stack = m;
          f && g`${l}`;
        }
        k(l);
      });
      c && Ia(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.b.push(a);
    c();
  }
  get f() {
    return this.L;
  }
}
const D = async a => {
  ({f:a} = new Ja({rs:a, N:C(!0)}));
  return await a;
};
async function F(a) {
  a = sa(a);
  return await D(a);
}
;async function G(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = C(!0), d = ta(a);
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
    }).on("close", e).end(b);
  });
}
;function Ka(a, b) {
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
      Ka(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (Ka(e, 0), k = [b, h]);
    a(...k);
  });
}
;const {join:I, relative:La} = path;
async function Ma(a, b) {
  b = b.map(async c => {
    const d = I(a, c);
    return {lstat:await H(y, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Na = a => a.lstat.isDirectory(), Oa = a => !a.lstat.isDirectory();
async function J(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  const {ignore:b = []} = {};
  if (!(await H(y, a)).isDirectory()) {
    var c = Error("Path is not a directory");
    c.code = "ENOTDIR";
    throw c;
  }
  c = await H(va, a);
  var d = await Ma(a, c);
  c = d.filter(Na);
  d = d.filter(Oa).reduce((e, f) => {
    var g = f.lstat.isDirectory() ? "Directory" : f.lstat.isFile() ? "File" : f.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...e, [f.relativePath]:{type:g}};
  }, {});
  c = await c.reduce(async(e, {path:f, relativePath:g}) => {
    const h = La(a, f);
    if (b.includes(h)) {
      return e;
    }
    e = await e;
    f = await J(f);
    return {...e, [g]:f};
  }, {});
  return {content:{...d, ...c}, type:"Directory"};
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
function Pa(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const M = (a, b) => {
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
        return d.replace(e, (h, ...k) => {
          g = Error();
          try {
            return this.j ? h : f.call(this, h, ...k);
          } catch (l) {
            M(g, l);
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
  var a = {O:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
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
  const {regExp:c, map:d} = a;
  return {re:c, replacement(e, f) {
    e = d[f];
    delete d[f];
    return Qa(e, Array.isArray(b) ? b : [b]);
  }};
}, Va = a => {
  const {re:b, map:c, getReplacement:d, name:e} = a;
  return {re:b, replacement(f) {
    const {lastIndex:g} = a;
    c[g] = f;
    a.lastIndex += 1;
    return d(e, g);
  }};
};
async function Wa(a, b) {
  return Xa(a, b);
}
class N extends z {
  constructor(a, b) {
    super(b);
    this.f = (Array.isArray(a) ? a : [a]).filter(Pa);
    this.j = !1;
    this.h = b;
  }
  async replace(a, b) {
    const c = new N(this.f, this.h);
    b && Object.assign(c, b);
    a = await Wa(c, a);
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
            M(f, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            M(f, h);
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
      a = A(d.stack), d.stack = a, c(d);
    }
  }
}
async function Xa(a, b) {
  b instanceof wa ? b.pipe(a) : a.end(b);
  return await D(a);
}
;function Ya() {
  var a = Za;
  let b = "";
  const c = new z({transform(d, e, f) {
    let g;
    for (b += d.toString(); (d = a.exec(b)) && (c.push(d), g = d, a.global);) {
    }
    g && (b = b.slice(g.index + g[0].length));
    f();
  }, objectMode:!0});
  return c;
}
;const O = (a, b, c, d) => {
  if (!a) {
    throw Error("The name of the property is not given");
  }
  a = `${d ? `${d}.` : ""}${a}`;
  if (null === b) {
    return a;
  }
  b = Number.isInteger(b) || [!0, !1, "null"].includes(b) || ["number", "boolean"].includes(c) ? b : `"${b}"`;
  return `${a}=${b}`;
}, $a = ({number:a, K:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", ab = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, P = a => a ? `/**
${a}
 */
` : "/**\n */\n", Q = a => ` * @suppress {nonStandardJsDocs}
${a}`, R = (a, b, c) => {
  a = `${a ? "" : "var "}${a ? `${a}.` : ""}${b}`;
  c && (a += ` = ${c}`);
  return a;
}, S = a => {
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
}, bb = (a, b) => {
  const {async:c, "void":d, "return":e = d ? "void" : "", ...f} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({G:g, name:h}) => "this" == h ? `${h}: ${g}` : h.startsWith("...") ? `...${g}` : g).join(","));
  b = e.replace(/\n\s*/g, " ");
  c && b ? b = `!Promise<${b}>` : c && (b = "!Promise");
  a = `function(${a})`;
  b && (a += `: ${b}`);
  return {R:f, F:a};
};
function cb(a, b, c) {
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
;const db = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), eb = new RegExp(`(?:\\s+((?:${db.source}\\s*)*))`);
const T = (a, b) => {
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
;function ib(a) {
  a = gb(a);
  return hb(a);
}
;function jb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h}, k) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = S(b));
  b = $a({number:g, K:d, boolean:e, type:h});
  k && (b = b.replace(new RegExp(`([!?])?${k}\\.`, "g"), "$1"));
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
  get G() {
    return this.optional ? `${this.type}=` : this.type;
  }
}
const lb = (a, b) => {
  let c = a.lastIndexOf("</arg>"), d = a;
  var e = [];
  -1 != c && (c += 6, e = a.slice(0, c), d = a.slice(c), e = T("arg", e), e = e.map(({content:f, props:g}) => {
    const h = new kb;
    jb(h, f, g, b);
    return h;
  }));
  return {I:d, D:e};
};
function U(a) {
  if ("" == a.name && a.nullable) {
    return "?";
  }
  var b = "";
  a.nullable ? b = "?" : !1 === a.nullable && (b = "!");
  if (a.function) {
    b += a.name + "(";
    const d = [];
    if (a.function.this) {
      var c = "this: " + U(a.function.this);
      d.push(c);
    }
    a.function.new && (c = "new: " + U(a.function.new), d.push(c));
    a.function.args.forEach(e => {
      let f = U(e);
      e.optional && (f += "=");
      d.push(f);
    });
    a.function.variableArgs && (c = "..." + U(a.function.variableArgs), d.push(c));
    c = d.join(", ");
    b += c + ")";
    a.function.return && (b += ": " + U(a.function.return));
  } else {
    if (a.record) {
      b += "{ ", c = Object.keys(a.record).map(d => {
        var e = a.record[d];
        if (!e) {
          return d;
        }
        e = U(e);
        return `${d}: ${e}`;
      }), b += c.join(", "), b += " }";
    } else {
      if (a.application) {
        if ("Promise" == a.name && !a.application.some(d => "void" != d.name)) {
          return b + "Promise";
        }
        b += a.name + "<";
        c = a.application.map(d => U(d));
        b += c.join(", ");
        b += ">";
      } else {
        a.union ? (b += "(", c = a.union.map(d => U(d)), b += c.join("|"), b += ")") : b += "any" == a.name ? "*" : a.name;
      }
    }
  }
  return b;
}
;const V = (a, b = !1) => a.split("\n").map((c, d) => {
  if (b && !d) {
    return c;
  }
  d = " *";
  c.length && (d += " ");
  return d + c;
}).join("\n"), mb = a => {
  const b = a.replace(/^\s*\n/gm, "").replace(/[^\s]/g, "").split("\n").reduce((c, d) => d.length < c ? d.length : c, Infinity);
  return a.replace(new RegExp(`^ {${b}}`, "gm"), "");
};
function nb(a, b = "") {
  b = b.split(/\s*,\s*/);
  let c = a = ua(a, "utf8");
  if (a = /\/\* start example \*\/\r?\n([\s\S]+?)\r?\n\/\* end example \*\//.exec(a)) {
    [, a] = a, c = mb(a);
  }
  b.forEach(d => {
    const [e, f] = d.split(/\s*=>\s*/);
    c = c.replace(`'${e}'`, `'${f}'`);
    c = c.replace(`"${e}"`, `"${f}"`);
  });
  return c;
}
function ob(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h, "default":k, closure:l, alias:m, aliases:n, example:p, "example-override":q, noParams:r, "static":t, initial:u}) {
  if (!c) {
    throw Error("Property does not have a name.");
  }
  a.name = c;
  b && (a.description = S(b));
  b = $a({number:g, K:d, boolean:e, type:h});
  r && (a.m = r);
  l && (a.g = l);
  a.type = b;
  void 0 !== k ? a.default = k : void 0 !== u && (a.default = u);
  if (f || void 0 !== k) {
    a.optional = !0;
  }
  m && (a.aliases = [m]);
  n && (a.aliases = n.split(/\s*,\s*/));
  t && (a.b = !0);
  p && (a.example = nb(p, q));
}
function pb(a, b = !1) {
  return b ? a.closureType : a.isParsedFunction ? a.toTypeScriptFunction(U) : a.type;
}
function qb(a, b = null, c = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = O(a.name, a.optional ? a.default : null, a.type, b);
  b = a.optional ? `[${b}]` : b;
  var {l:d} = a;
  d = d ? ` ${d}` : "";
  return `{${pb(a, c)}} ${b}${d}`;
}
function rb(a, b = !1) {
  a = qb(a, null, b);
  return ` * @prop ${V(a, !0)}`;
}
function sb(a) {
  const b = [], {function:{args:c, return:d, variableArgs:e, this:f}} = a.parsed;
  c.map(g => U(g)).forEach((g, h) => {
    const {optional:k} = c[h], {name:l = `arg${h}`, description:m} = a.args[h] || {};
    b.push(` * @param {${g}${k ? "=" : ""}} ${k ? `[${l}]` : l}${m ? ` ${m}` : ""}`);
  });
  e && b.push(` * @param {...${U(e)}} args`);
  f && b.push(` * @this {${U(f)}}`);
  if (d && "void" != d.name) {
    const g = U(d);
    b.push(` * @return {${g}}`);
  }
  return b;
}
function tb(a) {
  if (a.isParsedFunction) {
    const {function:{args:b, variableArgs:c}} = a.parsed, d = b.map((e, f) => {
      ({name:e = `arg${f}`} = a.h[f] || {});
      return e;
    });
    c && d.push("...args");
    return ` = function(${d.join(", ")}) {}`;
  }
  return a.type.startsWith("function(") ? " = function() {}" : "";
}
function ub(a, b = "", c = !1) {
  let d = [];
  var {l:e} = a;
  e && (e = V(e), d.push(e));
  !a.optional && a.isParsedFunction ? (e = sb(a), d.push(...e)) : d.push(` * @type {${a.optional ? ab(a.closureType) : a.closureType}}`);
  c && a.example && (a = V(a.example), d.push(" * @example"), d.push(" * ```js"), d.push(...a.split("\n")), d.push(" * ```"));
  b && (d = d.map(f => `${b}${f}`));
  return d.join("\n");
}
function vb(a, b) {
  const c = Object.assign(Object.create(Object.getPrototypeOf(a)), a);
  c.description = `An alias for \`${a.name}\`.`;
  c.name = b;
  return c;
}
class wb {
  constructor(a = null) {
    this.f = this.description = this.name = null;
    this.closureType = "";
    this.default = this.g = null;
    this.optional = !1;
    this.aliases = [];
    this.m = !1;
    this.parsed = null;
    this.args = a;
    this.isConstructor = this.b = !1;
    this.example = "";
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    const {function:{args:b, return:c, this:d, variableArgs:e}} = this.parsed;
    var f = b.map(h => a(h)).map((h, k) => {
      const {optional:l} = b[k];
      let {name:m = `arg${k}`, optional:n = l} = this.h[k] || {};
      return `${`${m}${n ? "?" : ""}`}: ${h}`;
    });
    if (d) {
      var g = a(d);
      f.unshift(`this: ${g}`);
    }
    if (e) {
      g = a(e);
      let h = "...args";
      try {
        h = `${this.args[this.args.length - 1].name}`;
      } catch (k) {
      }
      f.push(`${h}: ${g}[]`);
    }
    f = f.join(", ");
    g = c ? a(c) : "?";
    return `(${f}) => ${g}`;
  }
  v(a, b = new RegExp(`([!?])?${a}\\.`, "g")) {
    if (a) {
      return this.type = this.type.replace(b, "$1"), b;
    }
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
    if (!this.m) {
      try {
        this.parsed = ib(this.closureType), this.isParsedFunction && !this.args && (this.args = []);
      } catch (b) {
        this.parsed = null;
      }
    }
  }
  get l() {
    let a = this.description || "";
    return `${a}${this.hasDefault ? `${/``` */.test(this.description) ? "\n" : a ? " " : ""}Default \`${this.default}\`.` : ""}`;
  }
  get h() {
    var a = this.args;
    this.args && this.args[0] && "this" == this.args[0].name && ([, ...a] = this.args);
    return a;
  }
  get isParsedFunction() {
    return !!this.parsed && "function" == this.parsed.name;
  }
  B(a, b = "", c = !1) {
    a = qb(this, a, c);
    const [d, ...e] = a.split("\n");
    return [`@param ${d}`, ...e].map(f => `${b} * ${f}`).join("\n");
  }
}
;const X = (a, b, c = {}) => {
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
  return d ? W(d, a, c) : b;
}, W = (a, b, c = {}) => {
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
    }), e += d.join(", "), e += " }") : a.application ? (e += xb(a.name, b, f, c) + "&lt;", d = a.application.map(g => W(g, b, c)), e += d.join(", "), e += "&gt;") : a.union ? (e = e + f + "(", f = a.union.map(g => W(g, b, c)), e += f.join(d ? " \\| " : " | "), e += ")") : e += xb("any" == a.name ? "*" : a.name, b, f, c);
  }
  return e;
}, xb = (a, b, c = "", d = {}) => {
  const {flatten:e = !1, nameProcess:f, link:g = ({link:l}) => `#${l}`} = d;
  d = yb(b, a);
  c = `${c}${a}`;
  if (!d) {
    return c;
  }
  let {link:h, type:{description:k}} = d;
  h = g(d);
  e && ((b = b.find(({fullName:l}) => l == a)) && b.link && (h = b.link), !k && b.description && (k = b.description), "function" == typeof e && e(a));
  b = f ? f(c) : c;
  return k ? `<a href="${h}" title="${k.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${h})`;
}, yb = (a, b) => {
  a = a.filter(({fullName:d}) => d == b);
  if (a.length) {
    var c = a.find(({import:d}) => d || !1);
    a = a.find(({import:d}) => !d) || c;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function zb(a, b = [], c = [], d = {}) {
  const {narrow:e = !1, flatten:f = !1, preprocessDesc:g, link:h} = d;
  if (!b.length) {
    return "";
  }
  const k = a.isConstructor || a.isInterface, l = b.some(({hasDefault:p}) => p), m = {flatten:f, escapePipe:!e, link:h}, n = p => X(c, p, m);
  a = b.map(p => {
    let q;
    p.args && p.isParsedFunction ? (q = p.toTypeScriptFunction(n), p.isConstructor && (q = `new ${q}`)) : q = X(c, p.parsed || p.type, m);
    const r = k || p.optional ? p.name : `${p.name}*`, t = p.hasDefault ? `\`${p.default}\`` : "-", u = g ? g(p.description) : p.description;
    return {prop:p, typeName:q, name:r, de:Ab(u, !e), d:t};
  });
  if (e) {
    return {props:a, anyHaveDefault:l, constr:k};
  }
  a = a.map(({name:p, typeName:q, de:r, d:t, prop:u}) => [u.optional ? p : `__${p}__`, `<em>${q}</em>`, r, ...l ? [t] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...l ? [k ? "Initial" : "Default"] : []];
  return `

\`\`\`table
${JSON.stringify([b, ...a], null, 2)}
\`\`\``;
}
const Ab = (a = "", b = !0) => {
  null === a && (a = "");
  b && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
};
function Bb(a) {
  var b = a.h();
  b = P(b.join("\n"));
  b += R(a.namespace, a.name, Cb(a));
  const c = a.properties.reduce((d, e) => {
    d.push(e);
    const f = e.aliases.map(g => vb(e, g));
    d.push(...f);
    return d;
  }, []).filter(({isConstructor:d}) => !d).map(d => {
    let e = ub(d);
    e = P(e);
    e += R(`${a.fullName}${d.static ? "" : ".prototype"}`, d.name);
    return e += tb(d);
  });
  return [b, ...c].join("\n");
}
function Db(a, b = !1) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return b ? `${a.ns}${c}` : c;
}
function Eb(a, b = !1, c = !1, d = b) {
  d = ` * @typedef {${(b ? a.closureType : a.type) || a.m()}}${` ${Db(a, d)}${a.l}`}`;
  a = (a.properties ? a.properties.reduce((e, f) => {
    if (f.b) {
      return e;
    }
    e.push(f);
    const g = f.aliases.map(h => vb(f, h));
    e.push(...g);
    return e;
  }, []) : []).map(e => rb(e, b));
  a = [d, ...a].join("\n");
  b && !c && (a = Q(a));
  return a = P(a);
}
function Cb(a) {
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
    this.example = "";
  }
  get import() {
    return !1;
  }
  b(a, {name:b, type:c, desc:d, noToc:e, spread:f, noExpand:g, link:h, closure:k, constructor:l, "extends":m, "interface":n, record:p, example:q, "example-override":r}, t, u = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    c && (this.type = c);
    k ? this.closureType = k : this.closureType = this.type;
    d && (this.description = S(d));
    this.noToc = !!e;
    this.spread = !!f;
    this.noExpand = !!g;
    h && (this.link = h);
    !0 === l && (this.isConstructor = l);
    !0 === n && (this.isInterface = n);
    !0 === p && (this.isRecord = p);
    m && (this.extends = m);
    if (a) {
      b = T("prop", a).map(({content:w, props:B}) => {
        const E = new wb;
        ob(E, w, B);
        return E;
      });
      a = T(["function", "fn", "static"], a).map(({content:w, props:B, tag:E}) => {
        E = "static" == E;
        const {I:Sb, D:Aa} = lb(w, u);
        w = new wb(Aa);
        const {R:Ba, F:Tb} = bb(B, Aa);
        Ba.type = Tb;
        ob(w, Sb, Ba);
        E && (w.b = !0);
        return w;
      });
      a = [...b, ...a];
      const {J:L, n:Ub} = a.reduce((w, B) => {
        B.static ? w.J.push(B) : w.n.push(B);
        return w;
      }, {J:[], n:[]});
      this.properties = [...L, ...Ub];
    }
    t && (this.namespace = t);
    q && (this.example = nb(q, r));
  }
  get H() {
    return this.isConstructor || this.isInterface || this.isRecord;
  }
  m() {
    return "Object";
  }
  v(a, b = new RegExp(`([!?])?${a}\\.`, "g")) {
    this.type && (this.type = this.type.replace(b, "$1"));
    this.extends && (this.extends = this.extends.replace(b, "$1"));
    return b;
  }
  get l() {
    return `${this.tag ? ` \`\uff20${this.tag}\`` : ""}${this.description ? ` ${this.description}` : ""}`;
  }
  g(a = !1, b = !1, c = a) {
    const d = !!this.extends, e = Eb(this, a, b, c), f = [];
    if (this.namespace && a) {
      var g = ` * @typedef {${this.fullName}} ${this.name}${this.l}`;
      a && !b && (g = Q(g));
      g = P(g);
      f.push(g);
    } else {
      this.namespace && c && (g = ` * @typedef {${this.fullName}} ${this.name}${this.l}`, g = P(g), f.push(g));
    }
    d && (c = ` * @typedef {${this.extends.split(/,\s*/).join(" & ")} & ${Db(this, c)}} ${c ? this.fullName : this.name}${this.l}`, a && !b && (c = Q(c)), c = P(c), f.push(c));
    f.push(e);
    return f.join("");
  }
  get P() {
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
    this.extends && this.extends.split(/,\s*/).forEach(e => {
      d.push(` * @extends {${e}}`);
    });
    this.args && this.args.forEach(e => {
      let {name:f, description:g, optional:h, type:k} = e;
      e = g ? ` ${g}` : "";
      if (f.startsWith("...")) {
        f = f.slice(3), k = `...${k}`;
      } else {
        if ("this" == f) {
          d.push(` * @this {${k}}${e}`);
          return;
        }
      }
      d.push(` * @param {${k}${h ? "=" : ""}} ${h ? `[${f}]` : f}${e}`);
    });
    b && d.push(` * @${this.P}`);
    c && this.example && (b = V(this.example), d.push(" * @example"), d.push(" * ```js"), d.push(...b.split("\n")), d.push(" * ```"));
    a && (d = d.map(e => `${a}${e}`));
    return d;
  }
  get ns() {
    return this.namespace ? `${this.namespace}.` : "";
  }
  get fullName() {
    return `${this.ns}${this.name}`;
  }
  B(a, b, c, d, e = !1, f = !1) {
    var g = "";
    !0 === d ? g = "?" : !1 === d && (g = "!");
    d = this.description ? ` ${this.description}` : "";
    const h = this.spread ? Fb(this.properties) : e || f ? this.fullName : this.name;
    b = `${c || ""} * @param {${g}${h}} ${b ? `[${a}]` : a}${d}`;
    g = this.properties && !this.noExpand ? this.properties.map(k => k.B(a, c, e, f)) : [];
    return [b, ...g].join("\n");
  }
  toMarkdown(a = [], b = {}) {
    const {flatten:c, details:d = []} = b, e = d.includes(this.name);
    var f = this.type ? `\`${this.type}\`` : "", g = f;
    this.link ? g = `[${f}](${this.link})` : !this.import && this.type && (g = X(a, this.type, b), f = g != this.type, g = Gb(g, f));
    f = Gb(this.fullName);
    f = this.import ? `[${f}](l-type)` : this.noToc ? `[${f}](l-type)` : `[${f}](t-type)`;
    const h = this.description ? `: ${this.description}` : "";
    g = g ? `${g} ` : "";
    let k = /_/.test(f);
    if (this.extends) {
      const l = Hb(this.extends, a, b), m = ` extends ${l}`;
      k = k || /_/.test(l);
      g = (k ? g + "<strong>" : g + "__") + (f + m);
      "function" == typeof c && c(this.extends);
    } else {
      g = (k ? g + "<strong>" : g + "__") + f;
    }
    g = (k ? g + "</strong>" : g + "__") + h;
    a = zb(this, this.properties, a, b);
    return {LINE:g, table:a, displayInDetails:e};
  }
}
const Gb = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`, Fb = (a = [], b = !1) => {
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
}, Hb = (a, b, c) => a.split(/,\s*/).map(d => {
  let e = `\`${d}\``;
  var f = b.find(({fullName:g}) => g == d);
  f && f.link ? (e = "<a ", f.description && (e += `title="${f.description}" `), e += `href="${f.link}">\`${d}\`</a>`) : (f = X(b, d, {...c, nameProcess:g => `\`${g}\``}), d != f && (e = f));
  return e;
}).join(", ");
class Ib extends Y {
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
    this.description = S(a);
    super.b("", {...d, noToc:!0, name:c, type:`import('${b}').${c}`}, e != f ? e : null);
  }
  g(a = !0) {
    return ` * @typedef {import('${this.from}').${this.name}} ${a ? this.fullName : this.name}`;
  }
}
;function Jb(a, b) {
  b = b.reduce((c, d) => ({...c, [d.fullName]:d}), {});
  a.w = {...a.w, ...b};
}
class Kb extends N {
  constructor(a, b = {}) {
    super(a);
    this.w = {};
    this.on("types", c => {
      Jb(this, c);
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
    return Ib;
  }
  get types() {
    return this.w;
  }
}
;class Lb extends Y {
  constructor() {
    super();
    this.f = null;
    this.async = !1;
  }
  get H() {
    return !1;
  }
  get isMethod() {
    return !0;
  }
  b(a, {async:b, "return":c, ...d}, ...e) {
    this.description = S(a);
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
  m() {
    return `(${this.args.map(({name:a, type:b, optional:c}) => `${a}${c ? "?" : ""}: ${b}`).join(", ")}) => ${this.return}`;
  }
  v(a) {
    a = super.v(a);
    this.f && (this.f = this.f.replace(a, "$1"));
  }
}
;const Mb = a => {
  if (a.args && a.args.length) {
    var b = `function(${a.args.map(({G:d}) => d).join(", ")}): ${a.fullName}`, c = new wb(a.args);
    c.isConstructor = !0;
    ob(c, "Constructor method.", {type:b, name:"constructor"});
    c.v(void 0);
    a.properties.unshift(c);
  }
}, Ob = a => {
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
          const t = new Y;
          t.b(h, {...p, name:r}, e, void 0);
          g.push(t);
        });
        break;
      case "interface":
        k = Nb(h, k, e);
        k.forEach(r => {
          Mb(r);
          r.isInterface = !0;
        });
        g.push(...k);
        break;
      case "constructor":
        k = Nb(h, k, e);
        k.forEach(r => {
          Mb(r);
          r.isConstructor = !0;
        });
        g.push(...k);
        break;
      case "method":
        k = Nb(h, k, e, !0);
        g.push(...k);
        break;
      case "import":
        q = new Ib, q.b(h, k, k.ns || k.from, void 0), f.push(q);
    }
    return g;
  }, []);
  return {namespace:d, types:a, imports:f};
}, Pb = (a, b, c, d = !1) => {
  const e = d ? new Lb : new Y, f = a.search(/<(prop|function|fn|static) /);
  let g = "", h = a;
  1 != f && (g = a.slice(0, f), h = a.slice(f));
  const {D:k, I:l} = lb(g, void 0);
  e.b(d ? l : h, b, c, void 0);
  ({F:a} = bb(b, k));
  d && (e.closureType = a);
  e.args = k;
  return e;
}, Nb = (a, b, c, d = !1) => {
  const e = [], {alias:f, aliases:g, ...h} = b;
  b = Pb(a, b, c, d);
  e.push(b);
  (f ? [f] : g ? g.split(/, */) : []).forEach(k => {
    k = Pb(a, {...h, name:k}, c, d);
    k.description = `${k.description}${k.description ? " " : ""}Alias of \`${h.name}\`.`;
    e.push(k);
  });
  return e;
}, Qb = async(a, b = []) => {
  const c = await F(a);
  let d, e, f;
  try {
    ({namespace:d = null, types:e, imports:f} = Ob(c));
  } catch (g) {
    throw g.message = `Error while reading ${a}\n${g.message}`, g;
  }
  e = e.filter(({fullName:g}) => b.includes(g) ? !1 : !0);
  f = f.filter(({fullName:g}) => b.includes(g) ? !1 : !0);
  return {types:e, imports:f, namespace:d};
};
const Rb = (a, b, c) => {
  b = b.map(d => d.g(!0, c));
  a = a.map(d => {
    d = d.g();
    return P(c ? d : Q(d));
  });
  return [...b, ...a].join("");
}, Vb = (a, b, c, d = !1) => {
  a = [...a.map(e => {
    {
      let f;
      e.closureType ? f = ` * @typedef {${e.closureType}}` : e.H || (f = ` * @typedef {${Fb(e.properties, !0)}}`);
      f ? (e.description && (f = ` * ${e.description}\n${f}`), f = P(f), e = f += R(e.namespace, e.name)) : e = Bb(e);
    }
    return e;
  })].join("\n");
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const Xb = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, c) {
  const [d, ...e] = c.split(/\s+/), f = e.includes("closure"), g = e.includes("externs"), h = e.includes("noSuppress"), k = e.includes("skipNsDecl"), l = e.includes("namespace");
  let m = e.find(q => q.startsWith("ignore:"));
  m = m ? m.replace("ignore:", "").split(",") : [];
  let {u:n, A:p} = this.g;
  f && (n = !0);
  g && (p = !0);
  try {
    this.i("Detected type marker: %s", c);
    const {types:q, imports:r, namespace:t} = await Qb(d, m);
    this.emit("types", q);
    this.emit("types", r);
    let u;
    n ? u = Rb(r, q, h) : p ? (u = Vb(q, t, this.b, k) + "\n", t && this.emit("namespace", t)) : l ? (t && this.emit("namespace", t), u = Wb(r, q, !0)) : u = Wb(r, q);
    return `/* ${b} ${c} */\n${u}`;
  } catch (q) {
    return this.i("(%s) Could not process typedef-js: %s", c, q.message), process.env.b && console.error(q.stack), a;
  }
}}, Wb = (a, b, c = !1) => {
  b = b.map(d => d.g(!1, !1, c));
  a = a.map(d => d.g(c)).map(P).join("");
  b = b.join("");
  return `${a}${b}`.replace(Yb, " * @typedef");
}, Yb = / \*\/\n\/\*\*\n \* @typedef/g;
const $b = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?(?:(?!\n\s*\*(?:\/|\s*@))[\s\S])*)*)/gm, replacement:Zb};
function Zb(a, b, c, d, e, f, g) {
  const {u:h, C:k} = this.g;
  let l;
  f = () => {
    if (this.lines && this.file) {
      var n;
      {
        let r = n = 0;
        for (; r < g;) {
          r += this.lines[n].length, n++;
        }
        n = {line:n, M:b.length + 11};
      }
      const {line:p, M:q} = n;
      this.i("%s:%s:%s", this.file, p, q);
    }
  };
  try {
    l = ib(c);
  } catch (n) {
    return this.i("Error while parsing the type %s", c), this.i(process.env.DEBUG ? n.stack : n.message), f(), a;
  }
  if (!l) {
    return this.i("Could not parse the type %s", c), f(), a;
  }
  const m = Object.values(this.types).map(({name:n, fullName:p}) => h || k ? p : n);
  if (!Z(l, m, this.i, c, f)) {
    return a;
  }
  c = Object.values(this.types).find(({name:n, fullName:p}) => h || k ? p == l.name : n == l.name);
  return !c || c instanceof Kb.Import ? a : c.B(e, d, b, l.nullable, h, k);
}
const Z = (a, b, c, d, e) => {
  if (a) {
    var f = a.name;
    if (!f || !"string number boolean null undefined symbol any".split(" ").includes(f)) {
      if (f && !a.application && !a.function) {
        let h = b.includes(f);
        h || (h = ac.includes(f));
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
}, ac = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var bc = (a, b = !1) => {
  var {O:c} = Ta();
  const d = Va(c);
  c = Ua(c);
  return new Kb(b ? [Xb] : [Xb, d, $b, c], a);
};
const cc = /( *) \* @(fnType|methodType) {(.+?)}/gm;
class dc extends N {
  constructor(a, b) {
    super([{re:cc, async replacement(c, d, e, f) {
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
        return f.h(d, !1, !0).join("\n");
      }
      e = f.properties.find(({name:l}) => l == k);
      return e ? e.parsed ? ub(e, d, !0) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", k, h, b), c) : (console.error("Property %s of type %s in %s not found", k, h, b), c);
    }}]);
  }
}
;const ec = async a => a ? (await Promise.all(a.split(",").map(async b => {
  var c = [];
  const d = await H(y, b);
  d.isFile() ? c = [b] : d.isDirectory() && (c = await J(b), c = K(c.content, b), c = c.filter(e => e.endsWith(".xml")));
  return c;
}))).reduce((b, c) => [...b, ...c], []) : [], fc = async a => (await Promise.all(a.map(async b => ({...await Qb(b), location:b})))).reduce((b, {imports:c, types:d}) => {
  b.push(...c);
  b.push(...d);
  return b;
}, []);
async function gc() {
  const {o:a, types:b} = {o:na, types:ma}, c = await ec(b), d = await fc(c);
  await Promise.all(x.map(async e => {
    var f = await H(y, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await J(e), g = K(f.content, e));
    await hc(g, d, a);
  }));
}
const hc = async(a, b = [], c = null) => {
  await Promise.all(a.map(async d => {
    var e = await F(d);
    const f = new dc(b, d);
    f.end(e);
    e = await D(f);
    "-" == c ? console.log(e) : c ? await G(c, e) : await G(d, e);
  }));
};
var jc = async() => {
  const {u:a = !1, C:b = !1, A:c = !1, o:d, types:e} = {u:ja, A:la, o:ia, types:ma, C:ka}, f = await ec(e);
  await Promise.all(x.map(async g => {
    var h = await H(y, g);
    let k;
    h.isFile() ? k = [g] : h.isDirectory() && (h = await J(g), k = K(h.content, g));
    await ic(k, a, c, d, f, b);
  }));
};
const ic = async(a, b = !1, c = !1, d = "", e = [], f = !1) => {
  const g = [];
  await Promise.all(e.map(async h => {
    h = await F(h);
    const {types:k, imports:l} = Ob(h);
    g.push(k, l);
  }));
  await Promise.all(a.map(async h => {
    var k = await F(h);
    const l = bc({u:b, A:c, C:f}, c);
    g.forEach(m => l.emit("types", m));
    l.file = h;
    l.i = console.error;
    l.lines = k.split("\n");
    l.end(k);
    k = await D(l);
    "-" == d ? console.log(k) : d ? await G(d, k) : await G(h, k);
  }));
};
const kc = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, lc = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, mc = "type opt name quote defaultValue description Default".split(" "), Za = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), nc = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class oc extends z {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform({type:a, name:b, description:c, properties:d}, e, f) {
    a = a && a.startsWith("import") ? pc(a, b) : nc(a, b, c, d);
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
const pc = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class qc extends z {
  constructor() {
    super({objectMode:!0});
  }
  _transform([, a, b, c, d], e, f) {
    d = cb(lc, d, mc).map(g => {
      const {defaultValue:h, Default:k, opt:l, name:m, type:n, ...p} = g;
      g = {...p, name:m, type:n, ...h ? {defaultValue:kc(h)} : {}, ...k ? {s:kc(k)} : {}, ...l ? {optional:!0} : {}};
      if (h || k) {
        if (h) {
          h !== k && void 0 !== g.s && (q = O(m, k, n), console.error("%s[%s] does not match Default `%s`.", b, q, g.s));
        } else {
          var q = O(m, k, n);
          console.error("%s[%s] got from Default.", b, q);
        }
        g.default = "defaultValue" in g ? g.defaultValue : g.s;
        delete g.defaultValue;
        delete g.s;
      }
      return g;
    });
    this.push({type:a, name:b, description:c, properties:d});
    f();
  }
}
async function rc(a) {
  const b = Ya(), c = new qc, d = new oc;
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
;var sc = async() => {
  const {o:a} = {o:ia};
  await Promise.all(x.map(async b => {
    b = await F(b);
    b = await rc(b);
    a ? await G(a, b) : console.log(b);
  }));
};
if (pa) {
  const a = ha();
  console.log(ra({usage:a, description:"Embeds and maintains Closure-compatible types JSDoc in\nJavaScript source code from an external types.xml file.", line:"typal source [--closure|externs] [--migrate] [-o output] [-hv]", example:"typal src/index.js -c"}));
  process.exit();
} else {
  qa && (console.log(require("../../package.json").version), process.exit());
}
(async() => {
  try {
    return oa ? await sc() : na ? await gc() : await jc();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map