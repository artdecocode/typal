#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');
const path = require('path');             
var aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  a != Array.prototype && a != Object.prototype && (a[b] = d.value);
}, ba = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function ca(a, b) {
  if (b) {
    var d = ba;
    a = a.split(".");
    for (var c = 0; c < a.length - 1; c++) {
      var e = a[c];
      e in d || (d[e] = {});
      d = d[e];
    }
    a = a[a.length - 1];
    c = d[a];
    b = b(c);
    b != c && null != b && aa(d, a, {configurable:!0, writable:!0, value:b});
  }
}
ca("String.prototype.trimRight", function(a) {
  function b() {
    return this.replace(/[\s\xa0]+$/, "");
  }
  return a || b;
});
const da = (a, b, d, c = !1, e = !1) => {
  const g = d ? new RegExp(`^-(${d}|-${b})$`) : new RegExp(`^--${b}$`);
  b = a.findIndex(f => g.test(f));
  if (-1 == b) {
    return {argv:a};
  }
  if (c) {
    return {value:!0, index:b, length:1};
  }
  c = a[b + 1];
  if (!c || "string" == typeof c && c.startsWith("--")) {
    return {argv:a};
  }
  e && (c = parseInt(c, 10));
  return {value:c, index:b, length:2};
}, ea = a => {
  const b = [];
  for (let d = 0; d < a.length; d++) {
    const c = a[d];
    if (c.startsWith("-")) {
      break;
    }
    b.push(c);
  }
  return b;
}, ha = () => {
  var a = fa;
  return Object.keys(a).reduce((b, d) => {
    const c = a[d];
    if ("string" == typeof c) {
      return b[`-${c}`] = "", b;
    }
    d = c.command ? d : `--${d}`;
    c.short && (d = `${d}, -${c.short}`);
    let e = c.description;
    c.default && (e = `${e}\nDefault: ${c.default}.`);
    b[d] = e;
    return b;
  }, {});
};
const fa = {source:{description:"The path to the source file or directory with files to embed types into. Can specify multiple values, e.g., `typal types/index.js types/vendor.js`.", command:!0, multiple:!0}, output:{description:"The destination where to save output.\nIf not passed, the file will be overwritten.\nIf `-` is passed, prints to stdout.", short:"o"}, closure:{description:"Whether to generate types in _Closure_ mode.", boolean:!0, short:"c"}, useNamespace:{description:"Generate JSDoc for functions using namespaces.", 
boolean:!0, short:"u"}, externs:{description:"Whether to generate externs for _GCC_.", boolean:!0, short:"e"}, types:{description:"Comma-separated location of files to read types from.", short:"t"}, template:{description:"Scans the input file for `@type` comment in functions' JSDoc, and inserts the annotations from types' files.", short:"T"}, migrate:{description:"Extracts types from JavaScript source code and saves them\ninto the types.xml file specified in the output option.", boolean:!0, short:"m"}, 
help:{description:"Print the help information and exit.", boolean:!0, short:"h"}, version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, v = function(a = {}, b = process.argv) {
  let [, , ...d] = b;
  const c = ea(d);
  d = d.slice(c.length);
  a = Object.entries(a).reduce((f, [h, k]) => {
    f[h] = "string" == typeof k ? {short:k} : k;
    return f;
  }, {});
  const e = [];
  a = Object.entries(a).reduce((f, [h, k]) => {
    let l;
    try {
      const {short:m, boolean:n, number:p, command:q, multiple:r} = k;
      if (q && r && c.length) {
        l = c;
      } else {
        if (q && c.length) {
          l = c[0];
        } else {
          const t = da(d, h, m, n, p);
          ({value:l} = t);
          const {index:u, length:L} = t;
          void 0 !== u && L && e.push({index:u, length:L});
        }
      }
    } catch (m) {
      return f;
    }
    return void 0 === l ? f : {...f, [h]:l};
  }, {});
  let g = d;
  e.forEach(({index:f, length:h}) => {
    Array.from({length:h}).forEach((k, l) => {
      g[f + l] = null;
    });
  });
  g = g.filter(f => null !== f);
  Object.assign(a, {T:g});
  return a;
}(fa), x = v.source, ia = v.output, ja = v.closure, ka = v.useNamespace, la = v.externs, ma = v.types, na = v.template, oa = v.migrate, pa = v.help, qa = v.version;
function ra(a = {usage:{}}) {
  const {usage:b = {}, description:d, line:c, example:e} = a;
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
    n = q.map(t => `${r}\t${t}`);
    return [...l, m, ...n];
  }, []).map(l => `\t${l}`);
  const k = [d, `  ${c || ""}`].filter(l => l ? l.trim() : l).join("\n\n");
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
const ya = (a, b = 0, d = !1) => {
  if (0 === b && !d) {
    return a;
  }
  a = a.split("\n", d ? b + 1 : void 0);
  return d ? a[a.length - 1] : a.slice(b).join("\n");
}, za = (a, b = !1) => ya(a, 2 + (b ? 1 : 0)), Aa = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:Da} = os;
const Ea = /\s+at.*(?:\(|\s)(.*)\)?/, Fa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ga = Da(), A = a => {
  const {pretty:b = !1, ignoredModules:d = ["pirates"]} = {}, c = d.join("|"), e = new RegExp(Fa.source.replace("IGNORED_MODULES", c));
  return a.replace(/\\/g, "/").split("\n").filter(g => {
    g = g.match(Ea);
    if (null === g || !g[1]) {
      return !0;
    }
    g = g[1];
    return g.includes(".app/Contents/Resources/electron.asar") || g.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(g);
  }).filter(g => g.trim()).map(g => b ? g.replace(Ea, (f, h) => f.replace(h, h.replace(Ga, "~"))) : g).join("\n");
};
function Ha(a, b, d = !1) {
  return function(c) {
    var e = Aa(arguments), {stack:g} = Error();
    const f = ya(g, 2, !0), h = (g = c instanceof Error) ? c.message : c;
    e = [`Error: ${h}`, ...null !== e && a === e || d ? [b] : [f, b]].join("\n");
    e = A(e);
    return Object.assign(g ? c : Error(), {message:h, stack:e});
  };
}
;function C(a) {
  var {stack:b} = Error();
  const d = Aa(arguments);
  b = za(b, a);
  return Ha(d, b, a);
}
;const Ia = (a, b) => {
  b.once("error", d => {
    a.emit("error", d);
  });
  return b;
};
class Ja extends xa {
  constructor(a) {
    const {binary:b = !1, rs:d = null, ...c} = a || {}, {O:e = C(!0), proxyError:g} = a || {}, f = (h, k) => e(k);
    super(c);
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
          f`${l}`;
        } else {
          const m = A(l.stack);
          l.stack = m;
          g && f`${l}`;
        }
        k(l);
      });
      d && Ia(this, d).pipe(this);
    });
  }
  _write(a, b, d) {
    this.b.push(a);
    d();
  }
  get f() {
    return this.M;
  }
}
const D = async a => {
  ({f:a} = new Ja({rs:a, O:C(!0)}));
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
  const d = C(!0), c = ta(a);
  await new Promise((e, g) => {
    c.on("error", f => {
      f = d(f);
      g(f);
    }).on("close", e).end(b);
  });
}
;function Ka(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function H(a, b, d) {
  const c = C(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const {length:e} = a;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((g, f) => {
    const h = (l, m) => l ? (l = c(l), f(l)) : g(d || m);
    let k = [h];
    Array.isArray(b) ? (b.forEach((l, m) => {
      Ka(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (Ka(e, 0), k = [b, h]);
    a(...k);
  });
}
;const {join:I, relative:La} = path;
async function Ma(a, b) {
  b = b.map(async d => {
    const c = I(a, d);
    return {lstat:await H(y, c), path:c, relativePath:d};
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
    var d = Error("Path is not a directory");
    d.code = "ENOTDIR";
    throw d;
  }
  d = await H(va, a);
  var c = await Ma(a, d);
  d = c.filter(Na);
  c = c.filter(Oa).reduce((e, g) => {
    var f = g.lstat.isDirectory() ? "Directory" : g.lstat.isFile() ? "File" : g.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...e, [g.relativePath]:{type:f}};
  }, {});
  d = await d.reduce(async(e, {path:g, relativePath:f}) => {
    const h = La(a, g);
    if (b.includes(h)) {
      return e;
    }
    e = await e;
    g = await J(g);
    return {...e, [f]:g};
  }, {});
  return {content:{...c, ...d}, type:"Directory"};
}
const K = (a, b) => {
  let d = [], c = [];
  Object.keys(a).forEach(g => {
    const {type:f} = a[g];
    "File" == f ? d.push(I(b, g)) : "Directory" == f && c.push(g);
  });
  const e = c.reduce((g, f) => {
    const {content:h} = a[f];
    f = K(h, I(b, f));
    return [...g, ...f];
  }, []);
  return [...d, ...e];
};
function Pa(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:d} = a;
  a = b instanceof RegExp;
  const c = -1 != ["string", "function"].indexOf(typeof d);
  return a && c;
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
  const d = a.lastIndexOf("\n");
  b.stack = a.substr(0, d);
  throw b;
};
function Qa(a, b) {
  function d() {
    return b.filter(Pa).reduce((c, {re:e, replacement:g}) => {
      if (this.j) {
        return c;
      }
      if ("string" == typeof g) {
        return c = c.replace(e, g);
      }
      {
        let f;
        return c.replace(e, (h, ...k) => {
          f = Error();
          try {
            return this.j ? h : g.call(this, h, ...k);
          } catch (l) {
            M(f, l);
          }
        });
      }
    }, `${a}`);
  }
  d.b = () => {
    d.j = !0;
  };
  return d.call(d);
}
;const Ra = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Sa = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, Ta = () => {
  var a = {P:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
  return Object.keys(a).reduce((b, d) => {
    {
      var c = a[d];
      const {getReplacement:e = Sa, getRegex:g = Ra} = {}, f = g(d);
      c = {name:d, re:c, regExp:f, getReplacement:e, map:{}, lastIndex:0};
    }
    return {...b, [d]:c};
  }, {});
}, Ua = a => {
  var b = [];
  const {regExp:d, map:c} = a;
  return {re:d, replacement(e, g) {
    e = c[g];
    delete c[g];
    return Qa(e, Array.isArray(b) ? b : [b]);
  }};
}, Va = a => {
  const {re:b, map:d, getReplacement:c, name:e} = a;
  return {re:b, replacement(g) {
    const {lastIndex:f} = a;
    d[f] = g;
    a.lastIndex += 1;
    return c(e, f);
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
    const d = new N(this.f, this.h);
    b && Object.assign(d, b);
    a = await Wa(d, a);
    d.j && (this.j = !0);
    b && Object.keys(b).forEach(c => {
      b[c] = d[c];
    });
    return a;
  }
  async reduce(a) {
    return await this.f.reduce(async(b, {re:d, replacement:c}) => {
      b = await b;
      if (this.j) {
        return b;
      }
      if ("string" == typeof c) {
        b = b.replace(d, c);
      } else {
        const e = [];
        let g;
        const f = b.replace(d, (h, ...k) => {
          g = Error();
          try {
            if (this.j) {
              return e.length ? e.push(Promise.resolve(h)) : h;
            }
            const l = c.call(this, h, ...k);
            l instanceof Promise && e.push(l);
            return l;
          } catch (l) {
            M(g, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(d, () => h.shift());
          } catch (h) {
            M(g, h);
          }
        } else {
          b = f;
        }
      }
      return b;
    }, `${a}`);
  }
  async _transform(a, b, d) {
    try {
      const c = await this.reduce(a);
      this.push(c);
      d();
    } catch (c) {
      a = A(c.stack), c.stack = a, d(c);
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
  const d = new z({transform(c, e, g) {
    let f;
    for (b += c.toString(); (c = a.exec(b)) && (d.push(c), f = c, a.global);) {
    }
    f && (b = b.slice(f.index + f[0].length));
    g();
  }, objectMode:!0});
  return d;
}
;const O = (a, b, d, c) => {
  if (!a) {
    throw Error("The name of the property is not given");
  }
  a = `${c ? `${c}.` : ""}${a}`;
  if (null === b) {
    return a;
  }
  b = Number.isInteger(b) || [!0, !1, "null"].includes(b) || ["number", "boolean"].includes(d) ? b : `"${b}"`;
  return `${a}=${b}`;
}, $a = ({number:a, L:b, boolean:d, type:c}) => b ? "string" : a ? "number" : d ? "boolean" : c ? c : "*", ab = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, P = a => a ? `/**
${a}
 */
` : "/**\n */\n", Q = a => ` * @suppress {nonStandardJsDocs}
${a}`, R = (a, b, d) => {
  a = `${a ? "" : "var "}${a ? `${a}.` : ""}${b}`;
  d && (a += ` = ${d}`);
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
  var d = a.substr(0, b).lastIndexOf("\n");
  -1 == d ? d = 0 : (d++, a = a.substr(d));
  b -= d;
  const c = " ".repeat(b);
  d = a.split("\n");
  if (d.filter(e => /\S/.test(e)).find(e => !e.startsWith(c))) {
    return a.trim();
  }
  {
    const e = new RegExp(`^ {${b}}`);
    return d.map(g => g.replace(e, "")).join("\n");
  }
}, bb = (a, b) => {
  const {async:d, "void":c, "return":e = c ? "void" : "", ...g} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({G:f, name:h}) => "this" == h ? `${h}: ${f}` : h.startsWith("...") ? `...${f}` : f).join(","));
  b = e.replace(/\n\s*/g, " ");
  d && b ? b = `!Promise<${b}>` : d && (b = "!Promise");
  a = `function(${a})`;
  b && (a += `: ${b}`);
  return {R:g, F:a};
};
function T(a, b, d) {
  const c = [];
  b.replace(a, (e, ...g) => {
    e = g.slice(0, g.length - 2).reduce((f, h, k) => {
      k = d[k];
      if (!k || void 0 === h) {
        return f;
      }
      f[k] = h;
      return f;
    }, {});
    c.push(e);
  });
  return c;
}
;const cb = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), db = new RegExp(`(?:\\s+((?:${cb.source}\\s*)*))`);
const U = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return T(new RegExp(`<(${a})${db.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:d, a:c = "", c:e = ""}) => {
    c = c.replace(/\/$/, "").trim();
    c = eb(c);
    return {content:e, props:c, tag:d};
  });
}, eb = a => T(cb, a, ["key", "val", "def", "f"]).reduce((b, {key:d, val:c}) => {
  if (void 0 === c) {
    return b[d] = !0, b;
  }
  b[d] = "true" == c ? !0 : "false" == c ? !1 : /^\d+$/.test(c) ? parseInt(c, 10) : c;
  return b;
}, {});
const fb = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function gb(a) {
  let b = 0;
  const d = (e = 1) => a[b + e], c = (e = !0, g = []) => {
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
      f = {...c(!0, []), ...f};
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
              var l = c();
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
          k.this = c();
        } else {
          if ("new" == a[b]) {
            b++;
            if (":" != a[b]) {
              throw Error("Expecting :");
            }
            b++;
            k.new = c();
          } else {
            if ("." == a[b] && "." == d() && "." == d(2)) {
              b++;
              b++;
              b++;
              m = c();
              if (")" != a[b]) {
                throw Error("Variable args must come last");
              }
              k.variableArgs = m;
            } else {
              m = c(), k.args.push(m), "=" == a[b] && (m.optional = !0, b++);
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
      ":" == a[b] && (b++, m = c(), void 0 == m.name && m.nullable && (m.name = ""), k.return = m);
      l.function = k;
    } else {
      if ("<" == a[b] || (k = "." == a[b] && "<" == d())) {
        b++;
        k && b++;
        l = f;
        for (k = []; ">" != a[b];) {
          m = c();
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
      ({name:l} = c(!1));
      if (!l) {
        throw Error("Expected to see the name after .");
      }
      f.name += l;
    }
    if ("|" != a[b] || !e) {
      return f;
    }
    for (g.push(f); "|" == a[b];) {
      b++, f = c(!0, g), f.union !== g && g.push(f);
    }
    return {union:g};
  };
  return c();
}
;function hb(a) {
  a = fb(a);
  return gb(a);
}
;function ib(a, b, {name:d, string:c, "boolean":e, opt:g, number:f, type:h}, k) {
  if (!d) {
    throw Error("Argument does not have a name.");
  }
  a.name = d;
  b && (a.description = S(b));
  b = $a({number:f, L:c, boolean:e, type:h});
  k && (b = b.replace(new RegExp(`([!?])?${k}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), g = !0);
  a.type = b;
  g && (a.optional = !0);
}
class jb {
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
const kb = (a, b) => {
  let d = a.lastIndexOf("</arg>"), c = a;
  var e = [];
  -1 != d && (d += 6, e = a.slice(0, d), c = a.slice(d), e = U("arg", e), e = e.map(({content:g, props:f}) => {
    const h = new jb;
    ib(h, g, f, b);
    return h;
  }));
  return {I:c, D:e};
};
function V(a) {
  if ("" == a.name && a.nullable) {
    return "?";
  }
  var b = "";
  a.nullable ? b = "?" : !1 === a.nullable && (b = "!");
  if (a.function) {
    b += a.name + "(";
    const c = [];
    if (a.function.this) {
      var d = "this: " + V(a.function.this);
      c.push(d);
    }
    a.function.new && (d = "new: " + V(a.function.new), c.push(d));
    a.function.args.forEach(e => {
      let g = V(e);
      e.optional && (g += "=");
      c.push(g);
    });
    a.function.variableArgs && (d = "..." + V(a.function.variableArgs), c.push(d));
    d = c.join(", ");
    b += d + ")";
    a.function.return && (b += ": " + V(a.function.return));
  } else {
    if (a.record) {
      b += "{ ", d = Object.keys(a.record).map(c => {
        var e = a.record[c];
        if (!e) {
          return c;
        }
        e = V(e);
        return `${c}: ${e}`;
      }), b += d.join(", "), b += " }";
    } else {
      if (a.application) {
        if ("Promise" == a.name && !a.application.some(c => "void" != c.name)) {
          return b + "Promise";
        }
        b += a.name + "<";
        d = a.application.map(c => V(c));
        b += d.join(", ");
        b += ">";
      } else {
        a.union ? (b += "(", d = a.union.map(c => V(c)), b += d.join("|"), b += ")") : b += "any" == a.name ? "*" : a.name;
      }
    }
  }
  return b;
}
;const lb = (a, b = !1) => a.split("\n").map((d, c) => {
  if (b && !c) {
    return d;
  }
  c = " *";
  d.length && (c += " ");
  return c + d;
}).join("\n"), mb = a => {
  const b = a.replace(/^\s*\n/gm, "").replace(/[^\s]/g, "").split("\n").reduce((d, c) => c.length < d ? c.length : d, Infinity);
  return a.replace(new RegExp(`^ {${b}}`, "gm"), "");
};
function nb(a, b = "") {
  const d = b.split(/\s*,\s*/);
  return a.split(/\s*,\s*/).map(c => {
    let e = c = ua(c, "utf8");
    if (c = /\/\* start example \*\/\r?\n([\s\S]+?)\r?\n\/\* end example \*\//.exec(c)) {
      [, c] = c, e = mb(c);
    }
    d.forEach(g => {
      const [f, h] = g.split(/\s*=>\s*/);
      e = e.replace(`'${f}'`, `'${h}'`);
      e = e.replace(`"${f}"`, `"${h}"`);
    });
    return e = e.replace(/@/g, "\uff20");
  });
}
function ob(a) {
  const b = [];
  b.push(" * @example");
  a.forEach(d => {
    let c = [], e = [], g = "", f;
    d = d.split("\n").reduce((h, k) => {
      k.startsWith("///") ? (f = "comment", c.push(k)) : (f = "block", e.push(k));
      g || (g = f);
      f != g && ("block" == f ? (h.push(c.join("\n")), c = []) : (h.push(e.join("\n")), e = []), g = f);
      return h;
    }, []);
    c.length ? d.push(c.join("\n")) : e.length && d.push(e.join("\n"));
    d = d.reduce((h, k) => {
      k.startsWith("///") ? (k = k.replace(/^\/\/\/\s+/gm, ""), h.push(...k.split("\n"))) : (h.push("```js"), h.push(...k.split("\n")), h.push("```"));
      return h;
    }, []);
    d = d.map(h => lb(h));
    b.push(...d);
  });
  return b;
}
function pb(a, b, {name:d, string:c, "boolean":e, opt:g, number:f, type:h, "default":k, closure:l, alias:m, aliases:n, example:p, "example-override":q = "", noParams:r, "static":t, initial:u}) {
  if (!d) {
    throw Error("Property does not have a name.");
  }
  a.name = d;
  b && (a.description = S(b));
  b = $a({number:f, L:c, boolean:e, type:h});
  r && (a.m = r);
  l && (a.g = l);
  a.type = b;
  void 0 !== k ? a.default = k : void 0 !== u && (a.default = u);
  if (g || void 0 !== k) {
    a.optional = !0;
  }
  m && (a.aliases = [m]);
  n && (a.aliases = n.split(/\s*,\s*/));
  t && (a.b = !0);
  p && (a.examples = nb(p, q));
}
function qb(a, b = !1) {
  return b ? a.closureType : a.isParsedFunction ? a.toTypeScriptFunction(V) : a.type;
}
function rb(a, b = null, d = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = O(a.name, a.optional ? a.default : null, a.type, b);
  b = a.optional ? `[${b}]` : b;
  var {l:c} = a;
  c = c ? ` ${c}` : "";
  return `{${qb(a, d)}} ${b}${c}`;
}
function sb(a, b = !1) {
  a = rb(a, null, b);
  return ` * @prop ${lb(a, !0)}`;
}
function tb(a) {
  const b = [], {function:{args:d, return:c, variableArgs:e, this:g}} = a.parsed;
  d.map(f => V(f)).forEach((f, h) => {
    const {optional:k} = d[h], {name:l = `arg${h}`, description:m} = a.args[h] || {};
    b.push(` * @param {${f}${k ? "=" : ""}} ${k ? `[${l}]` : l}${m ? ` ${m}` : ""}`);
  });
  e && b.push(` * @param {...${V(e)}} args`);
  g && b.push(` * @this {${V(g)}}`);
  if (c && "void" != c.name) {
    const f = V(c);
    b.push(` * @return {${f}}`);
  }
  return b;
}
function ub(a) {
  if (a.isParsedFunction) {
    const {function:{args:b, variableArgs:d}} = a.parsed, c = b.map((e, g) => {
      ({name:e = `arg${g}`} = a.h[g] || {});
      return e;
    });
    d && c.push("...args");
    return ` = function(${c.join(", ")}) {}`;
  }
  return a.type.startsWith("function(") ? " = function() {}" : "";
}
function vb(a, b = "", d = !1) {
  let c = [];
  var {l:e} = a;
  e && (e = lb(e), c.push(e));
  !a.optional && a.isParsedFunction ? (e = tb(a), c.push(...e)) : c.push(` * @type {${a.optional ? ab(a.closureType) : a.closureType}}`);
  d && a.examples.length && (a = ob(a.examples), c.push(...a));
  b && (c = c.map(g => `${b}${g}`));
  return c.join("\n");
}
function wb(a, b) {
  const d = Object.assign(Object.create(Object.getPrototypeOf(a)), a);
  d.description = `An alias for \`${a.name}\`.`;
  d.name = b;
  return d;
}
class xb {
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
    this.examples = [];
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    const {function:{args:b, return:d, this:c, variableArgs:e}} = this.parsed;
    var g = b.map(h => a(h)).map((h, k) => {
      const {optional:l} = b[k];
      let {name:m = `arg${k}`, optional:n = l} = this.h[k] || {};
      return `${`${m}${n ? "?" : ""}`}: ${h}`;
    });
    if (c) {
      var f = a(c);
      g.unshift(`this: ${f}`);
    }
    if (e) {
      f = a(e);
      let h = "...args";
      try {
        h = `${this.args[this.args.length - 1].name}`;
      } catch (k) {
      }
      g.push(`${h}: ${f}[]`);
    }
    g = g.join(", ");
    f = d ? a(d) : "?";
    return `(${g}) => ${f}`;
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
        this.parsed = hb(this.closureType), this.isParsedFunction && !this.args && (this.args = []);
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
  B(a, b = "", d = !1) {
    a = rb(this, a, d);
    const [c, ...e] = a.split("\n");
    return [`@param ${c}`, ...e].map(g => `${b} * ${g}`).join("\n");
  }
}
;const X = (a, b, d = {}) => {
  let c;
  if ("object" == typeof b) {
    c = b;
  } else {
    try {
      (c = hb(b)) || console.log("Could not parse %s", b);
    } catch (e) {
      console.log("Could not parse %s", b), console.error(e.message);
    }
  }
  return c ? W(c, a, d) : b;
}, W = (a, b, d = {}) => {
  if ("" == a.name && a.nullable) {
    return "?";
  }
  var {escapePipe:c = !0} = d;
  let e = "";
  var g = "";
  a.nullable ? g = "?" : !1 === a.nullable && (g = "!");
  if (a.function) {
    e = e + g + (a.name + "(");
    const f = [];
    a.function.this && (c = "this: " + W(a.function.this, b, d), f.push(c));
    a.function.new && (c = "new: " + W(a.function.new, b, d), f.push(c));
    a.function.args.forEach(h => {
      let k = W(h, b, d);
      h.optional && (k += "=");
      f.push(k);
    });
    a.function.variableArgs && (c = "..." + W(a.function.variableArgs, b, d), f.push(c));
    c = f.join(", ");
    e += c + ")";
    a.function.return && (e += ": " + W(a.function.return, b, d));
  } else {
    a.record ? (e += "{ ", c = Object.keys(a.record).map(f => {
      var h = a.record[f];
      if (!h) {
        return f;
      }
      h = W(h, b, d);
      return `${f}: ${h}`;
    }), e += c.join(", "), e += " }") : a.application ? (e += yb(a.name, b, g, d) + "&lt;", c = a.application.map(f => W(f, b, d)), e += c.join(", "), e += "&gt;") : a.union ? (e = e + g + "(", g = a.union.map(f => W(f, b, d)), e += g.join(c ? " \\| " : " | "), e += ")") : e += yb("any" == a.name ? "*" : a.name, b, g, d);
  }
  return e;
}, yb = (a, b, d = "", c = {}) => {
  const {flatten:e = !1, nameProcess:g, link:f = ({link:l}) => `#${l}`} = c;
  c = zb(b, a);
  d = `${d}${a}`;
  if (!c) {
    return d;
  }
  let {link:h, type:{description:k}} = c;
  h = f(c);
  e && ((b = b.find(({fullName:l}) => l == a)) && b.link && (h = b.link), !k && b.description && (k = b.description), "function" == typeof e && e(a));
  b = g ? g(d) : d;
  return k ? `<a href="${h}" title="${k.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${h})`;
}, zb = (a, b) => {
  a = a.filter(({fullName:c}) => c == b);
  if (a.length) {
    var d = a.find(({import:c}) => c || !1);
    a = a.find(({import:c}) => !c) || d;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function Ab(a, b = [], d = [], c = {}) {
  const {narrow:e = !1, flatten:g = !1, preprocessDesc:f, link:h} = c;
  if (!b.length) {
    return "";
  }
  const k = a.isConstructor || a.isInterface, l = b.some(({hasDefault:p}) => p), m = {flatten:g, escapePipe:!e, link:h}, n = p => X(d, p, m);
  a = b.map(p => {
    let q;
    p.args && p.isParsedFunction ? (q = p.toTypeScriptFunction(n), p.isConstructor && (q = `new ${q}`)) : q = X(d, p.parsed || p.type, m);
    const r = k || p.optional ? p.name : `${p.name}*`, t = p.hasDefault ? `\`${p.default}\`` : "-", u = f ? f(p.description) : p.description;
    return {prop:p, typeName:q, name:r, de:Bb(u, !e), d:t};
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
const Bb = (a = "", b = !0) => {
  null === a && (a = "");
  b && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
};
function Cb(a) {
  var b = a.h();
  b = P(b.join("\n"));
  b += R(a.namespace, a.name, Db(a));
  const d = a.properties.reduce((c, e) => {
    c.push(e);
    const g = e.aliases.map(f => wb(e, f));
    c.push(...g);
    return c;
  }, []).filter(({isConstructor:c}) => !c).map(c => {
    let e = vb(c);
    e = P(e);
    e += R(`${a.fullName}${c.static ? "" : ".prototype"}`, c.name);
    return e += ub(c);
  });
  return [b, ...d].join("\n");
}
function Eb(a, b = !1) {
  const d = `${a.extends ? "$" : ""}${a.name}`;
  return b ? `${a.ns}${d}` : d;
}
function Fb(a, b = !1, d = !1, c = b) {
  c = ` * @typedef {${(b ? a.closureType : a.type) || a.H()}}${` ${Eb(a, c)}${a.l}`}`;
  a = (a.properties ? a.properties.reduce((e, g) => {
    if (g.b) {
      return e;
    }
    e.push(g);
    const f = g.aliases.map(h => wb(g, h));
    e.push(...f);
    return e;
  }, []) : []).map(e => sb(e, b));
  a = [c, ...a].join("\n");
  b && !d && (a = Q(a));
  return a = P(a);
}
function Db(a) {
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
    this.m = [];
  }
  get import() {
    return !1;
  }
  b(a, {name:b, type:d, desc:c, noToc:e, spread:g, noExpand:f, link:h, closure:k, constructor:l, "extends":m, "interface":n, record:p, example:q, "example-override":r}, t, u = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    d && (this.type = d);
    k ? this.closureType = k : this.closureType = this.type;
    c && (this.description = S(c));
    this.noToc = !!e;
    this.spread = !!g;
    this.noExpand = !!f;
    h && (this.link = h);
    !0 === l && (this.isConstructor = l);
    !0 === n && (this.isInterface = n);
    !0 === p && (this.isRecord = p);
    m && (this.extends = m);
    if (a) {
      b = U("prop", a).map(({content:w, props:B}) => {
        const E = new xb;
        pb(E, w, B);
        return E;
      });
      a = U(["function", "fn", "static"], a).map(({content:w, props:B, tag:E}) => {
        E = "static" == E;
        const {I:Tb, D:Ba} = kb(w, u);
        w = new xb(Ba);
        const {R:Ca, F:Ub} = bb(B, Ba);
        Ca.type = Ub;
        pb(w, Tb, Ca);
        E && (w.b = !0);
        return w;
      });
      a = [...b, ...a];
      const {K:L, n:Vb} = a.reduce((w, B) => {
        B.static ? w.K.push(B) : w.n.push(B);
        return w;
      }, {K:[], n:[]});
      this.properties = [...L, ...Vb];
    }
    t && (this.namespace = t);
    q && (this.m = nb(q, r));
  }
  get J() {
    return this.isConstructor || this.isInterface || this.isRecord;
  }
  H() {
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
  g(a = !1, b = !1, d = a) {
    const c = !!this.extends, e = Fb(this, a, b, d), g = [];
    if (this.namespace && a) {
      var f = ` * @typedef {${this.fullName}} ${this.name}${this.l}`;
      a && !b && (f = Q(f));
      f = P(f);
      g.push(f);
    } else {
      this.namespace && d && (f = ` * @typedef {${this.fullName}} ${this.name}${this.l}`, f = P(f), g.push(f));
    }
    c && (d = ` * @typedef {${this.extends.split(/,\s*/).join(" & ")} & ${Eb(this, d)}} ${d ? this.fullName : this.name}${this.l}`, a && !b && (d = Q(d)), d = P(d), g.push(d));
    g.push(e);
    return g.join("");
  }
  get S() {
    const a = this.tag;
    if (!a) {
      throw Error("Unknown prototype type (not constructor or interface).");
    }
    return a;
  }
  get tag() {
    return this.isConstructor ? "constructor" : this.isInterface ? "interface" : this.isRecord ? "record" : "";
  }
  h(a = "", b = !0, d = !1) {
    let c = [];
    this.description && c.push(` * ${this.description}`);
    this.extends && this.extends.split(/,\s*/).forEach(e => {
      c.push(` * @extends {${e}}`);
    });
    this.args && this.args.forEach(e => {
      let {name:g, description:f, optional:h, type:k} = e;
      e = f ? ` ${f}` : "";
      if (g.startsWith("...")) {
        g = g.slice(3), k = `...${k}`;
      } else {
        if ("this" == g) {
          c.push(` * @this {${k}}${e}`);
          return;
        }
      }
      c.push(` * @param {${k}${h ? "=" : ""}} ${h ? `[${g}]` : g}${e}`);
    });
    b && c.push(` * @${this.S}`);
    d && this.m.length && (b = ob(this.m), c.push(...b));
    a && (c = c.map(e => `${a}${e}`));
    return c;
  }
  get ns() {
    return this.namespace ? `${this.namespace}.` : "";
  }
  get fullName() {
    return `${this.ns}${this.name}`;
  }
  B(a, b, d, c, e = !1, g = !1) {
    var f = "";
    !0 === c ? f = "?" : !1 === c && (f = "!");
    c = this.description ? ` ${this.description}` : "";
    const h = this.spread ? Gb(this.properties) : e || g ? this.fullName : this.name;
    b = `${d || ""} * @param {${f}${h}} ${b ? `[${a}]` : a}${c}`;
    f = this.properties && !this.noExpand ? this.properties.map(k => k.B(a, d, e, g)) : [];
    return [b, ...f].join("\n");
  }
  toMarkdown(a = [], b = {}) {
    const {flatten:d, details:c = []} = b, e = c.includes(this.name);
    var g = this.type ? `\`${this.type}\`` : "", f = g;
    this.link ? f = `[${g}](${this.link})` : !this.import && this.type && (f = X(a, this.type, b), g = f != this.type, f = Hb(f, g));
    g = Hb(this.fullName);
    g = this.import ? `[${g}](l-type)` : this.noToc ? `[${g}](l-type)` : `[${g}](t-type)`;
    const h = this.description ? `: ${this.description}` : "";
    f = f ? `${f} ` : "";
    let k = /_/.test(g);
    if (this.extends) {
      const l = Ib(this.extends, a, b), m = ` extends ${l}`;
      k = k || /_/.test(l);
      f = (k ? f + "<strong>" : f + "__") + (g + m);
      "function" == typeof d && d(this.extends);
    } else {
      f = (k ? f + "<strong>" : f + "__") + g;
    }
    f = (k ? f + "</strong>" : f + "__") + h;
    a = Ab(this, this.properties, a, b);
    return {LINE:f, table:a, displayInDetails:e};
  }
}
const Hb = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`, Gb = (a = [], b = !1) => {
  a = a.reduce((d, c) => {
    d.push(c);
    const e = c.aliases.map(g => ({...c, name:g}));
    d.push(...e);
    return d;
  }, []);
  return `{ ${a.map(d => {
    const c = b ? d.closureType : d.type;
    let e = d.name, g = c;
    d.optional && !b ? e = `${d.name}?` : d.optional && b && (g = `(${ab(c)})`);
    return `${e}: ${g}`;
  }).join(", ")} }`;
}, Ib = (a, b, d) => a.split(/,\s*/).map(c => {
  let e = `\`${c}\``;
  var g = b.find(({fullName:f}) => f == c);
  g && g.link ? (e = "<a ", g.description && (e += `title="${g.description}" `), e += `href="${g.link}">\`${c}\`</a>`) : (g = X(b, c, {...d, nameProcess:f => `\`${f}\``}), c != g && (e = g));
  return e;
}).join(", ");
class Jb extends Y {
  constructor() {
    super();
    this.from = "";
  }
  get import() {
    return !0;
  }
  b(a, {from:b, name:d, ...c}, e, g) {
    if (!b) {
      throw Error("From attribute of import is not given.");
    }
    this.from = b;
    this.description = S(a);
    super.b("", {...c, noToc:!0, name:d, type:`import('${b}').${d}`}, e != g ? e : null);
  }
  g(a = !0) {
    return ` * @typedef {import('${this.from}').${this.name}} ${a ? this.fullName : this.name}`;
  }
}
;function Kb(a, b) {
  b = b.reduce((d, c) => ({...d, [c.fullName]:c}), {});
  a.w = {...a.w, ...b};
}
class Lb extends N {
  constructor(a, b = {}) {
    super(a);
    this.w = {};
    this.on("types", d => {
      Kb(this, d);
    });
    this.on("namespace", d => {
      this.b.includes(d) || this.b.push(d);
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
    return Jb;
  }
  get types() {
    return this.w;
  }
}
;class Mb extends Y {
  constructor() {
    super();
    this.f = null;
    this.async = !1;
  }
  get J() {
    return !1;
  }
  get isMethod() {
    return !0;
  }
  b(a, {async:b, "return":d, ...c}, ...e) {
    this.description = S(a);
    super.b("", c, ...e);
    d && (this.f = d.replace(/\n\s*/g, " "));
    b && (this.async = !0);
  }
  get return() {
    return this.f || "void";
  }
  h(a = "") {
    const b = super.h(a, !1);
    let d;
    this.f && (d = this.return);
    this.async && d ? d = `Promise<${d}>` : this.async && (d = "Promise");
    d && b.push(`${a} * @return {${d}}`);
    return b;
  }
  H() {
    return `(${this.args.map(({name:a, type:b, optional:d}) => `${a}${d ? "?" : ""}: ${b}`).join(", ")}) => ${this.return}`;
  }
  v(a) {
    a = super.v(a);
    this.f && (this.f = this.f.replace(a, "$1"));
  }
}
;const Nb = a => {
  if (a.args && a.args.length) {
    var b = `function(${a.args.map(({G:c}) => c).join(", ")}): ${a.fullName}`, d = new xb(a.args);
    d.isConstructor = !0;
    pb(d, "Constructor method.", {type:b, name:"constructor"});
    d.v(void 0);
    a.properties.unshift(d);
  }
}, Pb = a => {
  a = U("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:b, props:{namespace:d, ns:c = d}}] = a, e = void 0 == c ? void 0 : c, g = [];
  a = U(["type", "interface", "constructor", "method", "import"], b).reduce((f, {content:h, props:k, tag:l}) => {
    const {alias:m, aliases:n, ...p} = k;
    var q = m ? [m] : n ? n.split(/, */) : [];
    switch(l) {
      case "type":
        l = new Y;
        l.b(h, k, e, void 0);
        f.push(l);
        q.forEach(r => {
          const t = new Y;
          t.b(h, {...p, name:r}, e, void 0);
          f.push(t);
        });
        break;
      case "interface":
        k = Ob(h, k, e);
        k.forEach(r => {
          Nb(r);
          r.isInterface = !0;
        });
        f.push(...k);
        break;
      case "constructor":
        k = Ob(h, k, e);
        k.forEach(r => {
          Nb(r);
          r.isConstructor = !0;
        });
        f.push(...k);
        break;
      case "method":
        k = Ob(h, k, e, !0);
        f.push(...k);
        break;
      case "import":
        q = new Jb, q.b(h, k, k.ns || k.from, void 0), g.push(q);
    }
    return f;
  }, []);
  return {namespace:c, types:a, imports:g};
}, Qb = (a, b, d, c = !1) => {
  const e = c ? new Mb : new Y, g = a.search(/<(prop|function|fn|static) /);
  let f = "", h = a;
  1 != g && (f = a.slice(0, g), h = a.slice(g));
  const {D:k, I:l} = kb(f, void 0);
  e.b(c ? l : h, b, d, void 0);
  ({F:a} = bb(b, k));
  c && (e.closureType = a);
  e.args = k;
  return e;
}, Ob = (a, b, d, c = !1) => {
  const e = [], {alias:g, aliases:f, ...h} = b;
  b = Qb(a, b, d, c);
  e.push(b);
  (g ? [g] : f ? f.split(/, */) : []).forEach(k => {
    k = Qb(a, {...h, name:k}, d, c);
    k.description = `${k.description}${k.description ? " " : ""}Alias of \`${h.name}\`.`;
    e.push(k);
  });
  return e;
}, Rb = async(a, b = []) => {
  const d = await F(a);
  let c, e, g;
  try {
    ({namespace:c = null, types:e, imports:g} = Pb(d));
  } catch (f) {
    throw f.message = `Error while reading ${a}\n${f.message}`, f;
  }
  e = e.filter(({fullName:f}) => b.includes(f) ? !1 : !0);
  g = g.filter(({fullName:f}) => b.includes(f) ? !1 : !0);
  return {types:e, imports:g, namespace:c};
};
const Sb = (a, b, d) => {
  b = b.map(c => c.g(!0, d));
  a = a.map(c => {
    c = c.g();
    return P(d ? c : Q(c));
  });
  return [...b, ...a].join("");
}, Wb = (a, b, d, c = !1) => {
  a = [...a.map(e => {
    {
      let g;
      e.closureType ? g = ` * @typedef {${e.closureType}}` : e.J || (g = ` * @typedef {${Gb(e.properties, !0)}}`);
      g ? (e.description && (g = ` * ${e.description}\n${g}`), g = P(g), e = g += R(e.namespace, e.name)) : e = Cb(e);
    }
    return e;
  })].join("\n");
  return `${!b || c || d.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const Yb = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, d) {
  const [c, ...e] = d.split(/\s+/), g = e.includes("closure"), f = e.includes("externs"), h = e.includes("noSuppress"), k = e.includes("skipNsDecl"), l = e.includes("namespace");
  let m = e.find(q => q.startsWith("ignore:"));
  m = m ? m.replace("ignore:", "").split(",") : [];
  let {u:n, A:p} = this.g;
  g && (n = !0);
  f && (p = !0);
  try {
    this.i("Detected type marker: %s", d);
    const {types:q, imports:r, namespace:t} = await Rb(c, m);
    this.emit("types", q);
    this.emit("types", r);
    let u;
    n ? u = Sb(r, q, h) : p ? (u = Wb(q, t, this.b, k) + "\n", t && this.emit("namespace", t)) : l ? (t && this.emit("namespace", t), u = Xb(r, q, !0)) : u = Xb(r, q);
    return `/* ${b} ${d} */\n${u}`;
  } catch (q) {
    return this.i("(%s) Could not process typedef-js: %s", d, q.message), process.env.b && console.error(q.stack), a;
  }
}}, Xb = (a, b, d = !1) => {
  b = b.map(c => c.g(!1, !1, d));
  a = a.map(c => c.g(d)).map(P).join("");
  b = b.join("");
  return `${a}${b}`.replace(Zb, " * @typedef");
}, Zb = / \*\/\n\/\*\*\n \* @typedef/g;
const ac = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?(?:(?!\n\s*\*(?:\/|\s*@))[\s\S])*)*)/gm, replacement:$b};
function $b(a, b, d, c, e, g, f) {
  const {u:h, C:k} = this.g;
  let l;
  g = () => {
    if (this.lines && this.file) {
      var n;
      {
        let r = n = 0;
        for (; r < f;) {
          r += this.lines[n].length, n++;
        }
        n = {line:n, N:b.length + 11};
      }
      const {line:p, N:q} = n;
      this.i("%s:%s:%s", this.file, p, q);
    }
  };
  try {
    l = hb(d);
  } catch (n) {
    return this.i("Error while parsing the type %s", d), this.i(process.env.DEBUG ? n.stack : n.message), g(), a;
  }
  if (!l) {
    return this.i("Could not parse the type %s", d), g(), a;
  }
  const m = Object.values(this.types).map(({name:n, fullName:p}) => h || k ? p : n);
  if (!Z(l, m, this.i, d, g)) {
    return a;
  }
  d = Object.values(this.types).find(({name:n, fullName:p}) => h || k ? p == l.name : n == l.name);
  return !d || d instanceof Lb.Import ? a : d.B(e, c, b, l.nullable, h, k);
}
const Z = (a, b, d, c, e) => {
  if (a) {
    var g = a.name;
    if (!g || !"string number boolean null undefined symbol any".split(" ").includes(g)) {
      if (g && !a.application && !a.function) {
        let h = b.includes(g);
        h || (h = bc.includes(g));
        if (h) {
          return !0;
        }
        d("Type %s%s was not found.", g, c != g ? ` in ${c}` : "");
        e();
      }
      var f = [b, d, c, e];
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
  var {P:d} = Ta();
  const c = Va(d);
  d = Ua(d);
  return new Lb(b ? [Yb] : [Yb, c, ac, d], a);
};
const dc = /( *) \* @(fnType|methodType) {(.+?)}/gm;
class ec extends N {
  constructor(a, b) {
    super([{re:dc, async replacement(d, c, e, g) {
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
        return console.error("Type %s in %s not found", h, b), d;
      }
      if ("constructor" == k || "methodType" == e) {
        return g.h(c, !1, !0).join("\n");
      }
      e = g.properties.find(({name:l}) => l == k);
      return e ? e.parsed ? vb(e, c, !0) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", k, h, b), d) : (console.error("Property %s of type %s in %s not found", k, h, b), d);
    }}]);
  }
}
;const fc = async a => a ? (await Promise.all(a.split(",").map(async b => {
  var d = [];
  const c = await H(y, b);
  c.isFile() ? d = [b] : c.isDirectory() && (d = await J(b), d = K(d.content, b), d = d.filter(e => e.endsWith(".xml")));
  return d;
}))).reduce((b, d) => [...b, ...d], []) : [], gc = async a => (await Promise.all(a.map(async b => ({...await Rb(b), location:b})))).reduce((b, {imports:d, types:c}) => {
  b.push(...d);
  b.push(...c);
  return b;
}, []);
async function hc() {
  const {o:a, types:b} = {o:na, types:ma}, d = await fc(b), c = await gc(d);
  await Promise.all(x.map(async e => {
    var g = await H(y, e);
    let f;
    g.isFile() ? f = [e] : g.isDirectory() && (g = await J(e), f = K(g.content, e));
    await ic(f, c, a);
  }));
}
const ic = async(a, b = [], d = null) => {
  await Promise.all(a.map(async c => {
    var e = await F(c);
    const g = new ec(b, c);
    g.end(e);
    e = await D(g);
    "-" == d ? console.log(e) : d ? await G(d, e) : await G(c, e);
  }));
};
var kc = async() => {
  const {u:a = !1, C:b = !1, A:d = !1, o:c, types:e} = {u:ja, A:la, o:ia, types:ma, C:ka}, g = await fc(e);
  await Promise.all(x.map(async f => {
    var h = await H(y, f);
    let k;
    h.isFile() ? k = [f] : h.isDirectory() && (h = await J(f), k = K(h.content, f));
    await jc(k, a, d, c, g, b);
  }));
};
const jc = async(a, b = !1, d = !1, c = "", e = [], g = !1) => {
  const f = [];
  await Promise.all(e.map(async h => {
    h = await F(h);
    const {types:k, imports:l} = Pb(h);
    f.push(k, l);
  }));
  await Promise.all(a.map(async h => {
    var k = await F(h);
    const l = cc({u:b, A:d, C:g}, d);
    f.forEach(m => l.emit("types", m));
    l.file = h;
    l.i = console.error;
    l.lines = k.split("\n");
    l.end(k);
    k = await D(l);
    "-" == c ? console.log(k) : c ? await G(c, k) : await G(h, k);
  }));
};
const lc = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, mc = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, nc = "type opt name quote defaultValue description Default".split(" "), Za = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), oc = (a, b, d, c) => {
  c = c.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  d = d ? ` desc="${d}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${d}${c ? "" : " /"}>\n`;
};
class pc extends z {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform({type:a, name:b, description:d, properties:c}, e, g) {
    a = a && a.startsWith("import") ? qc(a, b) : oc(a, b, d, c);
    this.push(a);
    c.forEach(({type:f, name:h, default:k, description:l, optional:m}) => {
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
    c.length && this.push("  </type>\n");
    g();
  }
}
const qc = (a, b) => {
  const d = /import\((['"])(.+?)\1\)/.exec(a);
  if (!d) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = d;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class rc extends z {
  constructor() {
    super({objectMode:!0});
  }
  _transform([, a, b, d, c], e, g) {
    c = T(mc, c, nc).map(f => {
      const {defaultValue:h, Default:k, opt:l, name:m, type:n, ...p} = f;
      f = {...p, name:m, type:n, ...h ? {defaultValue:lc(h)} : {}, ...k ? {s:lc(k)} : {}, ...l ? {optional:!0} : {}};
      if (h || k) {
        if (h) {
          h !== k && void 0 !== f.s && (q = O(m, k, n), console.error("%s[%s] does not match Default `%s`.", b, q, f.s));
        } else {
          var q = O(m, k, n);
          console.error("%s[%s] got from Default.", b, q);
        }
        f.default = "defaultValue" in f ? f.defaultValue : f.s;
        delete f.defaultValue;
        delete f.s;
      }
      return f;
    });
    this.push({type:a, name:b, description:d, properties:c});
    g();
  }
}
async function sc(a) {
  const b = Ya(), d = new rc, c = new pc;
  b.pipe(d).pipe(c);
  b.end(a);
  b.on("error", e => {
    console.error("Error in Transform");
    c.emit("error", e);
  });
  d.on("error", e => {
    console.error("Error in RegexTransform");
    c.emit("error", e);
  });
  c.on("error", e => {
    console.error("Error in XML");
    c.emit("error", e);
  });
  return `<types>
  ${(await D(c)).trim()}
</types>`;
}
;var tc = async() => {
  const {o:a} = {o:ia};
  await Promise.all(x.map(async b => {
    b = await F(b);
    b = await sc(b);
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
    return oa ? await tc() : na ? await hc() : await kc();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map