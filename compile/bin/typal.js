#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');
const path = require('path');             
var ca = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
}, da = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function ea(a, b) {
  if (b) {
    var c = da;
    a = a.split(".");
    for (var d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && ca(c, a, {configurable:!0, writable:!0, value:b});
  }
}
ea("String.prototype.trimRight", function(a) {
  function b() {
    return this.replace(/[\s\xa0]+$/, "");
  }
  return a || b;
});
const fa = (a, b, c, d, e) => {
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
}, ha = a => {
  const b = [];
  for (let c = 0; c < a.length; c++) {
    const d = a[c];
    if (d.startsWith("-")) {
      break;
    }
    b.push(d);
  }
  return b;
}, ja = () => {
  var a = ia;
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
const ia = {source:{description:"The path to the source file or directory with files to embed types into. Can specify multiple values, e.g., `typal types/index.js types/vendor.js`.", command:!0, multiple:!0}, output:{description:"The destination where to save output.\nIf not passed, the file will be overwritten.\nIf `-` is passed, prints to stdout.", short:"o"}, closure:{description:"Whether to generate types in _Closure_ mode.", boolean:!0, short:"c"}, externs:{description:"Whether to generate externs for _GCC_.", 
boolean:!0, short:"e"}, types:{description:"Comma-separated location of files to read types from.", short:"t"}, template:{description:"Scans the input file for `@type` comment in functions' JSDoc, and inserts the annotations from types' files.", short:"T"}, migrate:{description:"Extracts types from JavaScript source code and saves them\ninto the types.xml file specified in the output option.", boolean:!0, short:"m"}, help:{description:"Print the help information and exit.", boolean:!0, short:"h"}, 
version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, w = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = ha(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce((e, f) => {
    var g = Object.assign({}, e);
    e = e.u;
    g = (delete g.u, g);
    if (0 == e.length && d) {
      return Object.assign({}, {u:e}, g);
    }
    const h = a[f];
    let k;
    if ("string" == typeof h) {
      ({value:k, argv:e} = fa(e, f, h));
    } else {
      try {
        const {short:l, boolean:m, number:n, command:p, multiple:q} = h;
        p && q && c.length ? (k = c, d = !0) : p && c.length ? (k = c[0], d = !0) : {value:k, argv:e} = fa(e, f, l, m, n);
      } catch (l) {
        return Object.assign({}, {u:e}, g);
      }
    }
    return void 0 === k ? Object.assign({}, {u:e}, g) : Object.assign({}, {u:e}, g, {[f]:k});
  }, {u:b});
}(ia), x = w.source, ka = w.output, la = w.closure, ma = w.externs, na = w.types, oa = w.template, pa = w.migrate, qa = w.help, ra = w.version;
function sa(a = {usage:{}}) {
  const {usage:b = {}, description:c, line:d, example:e} = a;
  a = Object.keys(b);
  const f = Object.values(b), [g] = a.reduce(([l = 0, m = 0], n) => {
    const p = b[n].split("\n").reduce((q, t) => t.length > q ? t.length : q, 0);
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
    const t = h("", g);
    n = q.map(u => `${t}\t${u}`);
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
;const {createReadStream:ta, createWriteStream:ua, lstat:y, readdir:va} = fs;
var wa = stream;
const {Transform:z, Writable:xa} = stream;
const ya = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, za = (a, b = !1) => ya(a, 2 + (b ? 1 : 0)), Da = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:Ea} = os;
const Fa = /\s+at.*(?:\(|\s)(.*)\)?/, Ga = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ha = Ea(), A = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Ga.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Fa);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Fa, (g, h) => g.replace(h, h.replace(Ha, "~"))) : f).join("\n");
};
function Ia(a, b, c = !1) {
  return function(d) {
    var e = Da(arguments), {stack:f} = Error();
    const g = ya(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = A(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function D(a) {
  var {stack:b} = Error();
  const c = Da(arguments);
  b = za(b, a);
  return Ia(c, b, a);
}
;const Ja = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ka extends xa {
  constructor(a) {
    var b = a || {}, c = Object.assign({}, b);
    const d = void 0 === b.binary ? !1 : b.binary, e = void 0 === b.rs ? null : b.rs;
    b = (delete c.binary, delete c.rs, c);
    const {W:f = D(!0), proxyError:g} = a || {}, h = (k, l) => f(l);
    super(b);
    this.b = [];
    this.U = new Promise((k, l) => {
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
          const n = A(m.stack);
          m.stack = n;
          g && h`${m}`;
        }
        l(m);
      });
      e && Ja(this, e).pipe(this);
    });
  }
  _write(a, b, c) {
    this.b.push(a);
    c();
  }
  get f() {
    return this.U;
  }
}
const F = async a => {
  var b = void 0 === b ? {} : b;
  ({f:a} = new Ka(Object.assign({}, {rs:a}, b, {W:D(!0)})));
  return await a;
};
async function G(a) {
  a = ta(a);
  return await F(a);
}
;async function H(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = D(!0), d = ua(a);
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
    }).on("close", e).end(b);
  });
}
;function La(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function I(a, b, c) {
  const d = D(!0);
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
      La(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (La(e, 0), k = [b, h]);
    a(...k);
  });
}
;const {join:J} = path;
async function Ma(a, b) {
  b = b.map(async c => {
    const d = J(a, c);
    return {lstat:await I(y, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Na = a => a.lstat.isDirectory(), Oa = a => !a.lstat.isDirectory();
async function K(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await I(y, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await I(va, a);
  b = await Ma(a, b);
  a = b.filter(Na);
  b = b.filter(Oa).reduce((c, d) => {
    var e = d.lstat.isDirectory() ? "Directory" : d.lstat.isFile() ? "File" : d.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return Object.assign({}, c, {[d.relativePath]:{type:e}});
  }, {});
  a = await a.reduce(async(c, d) => {
    var {path:e, relativePath:f} = d;
    c = await c;
    d = await K(e);
    return Object.assign({}, c, {[f]:d});
  }, {});
  return {content:Object.assign({}, b, a), type:"Directory"};
}
const L = (a, b) => {
  let c = [], d = [];
  Object.keys(a).forEach(f => {
    const {type:g} = a[f];
    "File" == g ? c.push(J(b, f)) : "Directory" == g && d.push(f);
  });
  const e = d.reduce((f, g) => {
    const {content:h} = a[g];
    g = L(h, J(b, g));
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
      if (this.s) {
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
            return this.s ? h : f.call(this, h, ...k);
          } catch (l) {
            M(g, l);
          }
        });
      }
    }, `${a}`);
  }
  c.b = () => {
    c.s = !0;
  };
  return c.call(c);
}
;const Ra = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Sa = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, Ta = () => {
  var a = {X:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
  return Object.keys(a).reduce((b, c) => {
    {
      var d = a[c];
      const {getReplacement:e = Sa, getRegex:f = Ra} = {}, g = f(c);
      d = {name:c, re:d, regExp:g, getReplacement:e, map:{}, lastIndex:0};
    }
    return Object.assign({}, b, {[c]:d});
  }, {});
}, Ua = a => {
  var b = void 0 === b ? [] : b;
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
    this.s = !1;
    this.m = b;
  }
  async replace(a, b) {
    const c = new N(this.f, this.m);
    b && Object.assign(c, b);
    a = await Wa(c, a);
    c.s && (this.s = !0);
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  async reduce(a) {
    return await this.f.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.s) {
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
            if (this.s) {
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
  return await F(a);
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
  b = Number.isInteger(b) || !0 === b || !1 === b || ["number", "boolean"].includes(c) ? b : `"${b}"`;
  return `${a}=${b}`;
}, $a = ({number:a, T:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", ab = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, P = a => a ? `/**
${a}
 */
` : "/**\n */\n", Q = a => ` * @suppress {nonStandardJsDocs}
${a}`, S = (a, b, c) => {
  a = `${a ? "" : "var "}${a ? `${a}.` : ""}${b}`;
  c && (a += ` = ${c}`);
  return a;
}, T = a => {
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
function U(a, b, c) {
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
;const bb = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), cb = new RegExp(`\\s*((?:${bb.source}\\s*)*)`);
const V = (a, b) => U(new RegExp(`<${a}${cb.source}?(?:${/\s*\/>/.source}|${(new RegExp(`>([\\s\\S]+?)?</${a}>`)).source})`, "g"), b, ["a", "v", "v1", "v2", "c"]).map(({a:c = "", c:d = ""}) => {
  c = c.replace(/\/$/, "").trim();
  c = db(c);
  return {content:d, props:c};
}), db = a => U(bb, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
const eb = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function fb(a) {
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
    if ("function" == g) {
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
;function gb(a) {
  a = eb(a);
  return fb(a);
}
;function hb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h}, k) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = T(b));
  b = $a({number:g, T:d, boolean:e, type:h});
  k && (b = b.replace(new RegExp(`([!?])?${k}\\.`, "g"), "$1"));
  a.type = b;
  f && (a.optional = !0);
}
class ib {
  constructor() {
    this.name = null;
    this.type = "";
    this.optional = null;
    this.description = "";
  }
}
const jb = (a, b) => {
  let c = a.lastIndexOf("</arg>"), d = a;
  var e = [];
  -1 != c && (c += 6, e = a.slice(0, c), d = a.slice(c), e = V("arg", e), e = e.map(({content:f, props:g}) => {
    const h = new ib;
    hb(h, f, g, b);
    return h;
  }));
  return {Y:d, N:e};
};
function W(a) {
  var b = "";
  a.nullable ? b = "?" : !1 === a.nullable && (b = "!");
  if (a.function) {
    b += a.name + "(";
    const d = [];
    if (a.function.this) {
      var c = "this: " + W(a.function.this);
      d.push(c);
    }
    a.function.new && (c = "new: " + W(a.function.new), d.push(c));
    a.function.args.forEach(e => {
      let f = W(e);
      e.optional && (f += "=");
      d.push(f);
    });
    a.function.variableArgs && (c = "..." + W(a.function.variableArgs), d.push(c));
    c = d.join(", ");
    b += c + ")";
    a.function.return && (b += ": " + W(a.function.return));
  } else {
    if (a.record) {
      b += "{ ", c = Object.keys(a.record).map(d => {
        var e = a.record[d];
        if (!e) {
          return d;
        }
        e = W(e);
        return `${d}: ${e}`;
      }), b += c.join(", "), b += " }";
    } else {
      if (a.application) {
        if ("Promise" == a.name && !a.application.some(d => "void" != d.name)) {
          return b + "Promise";
        }
        b += a.name + "<";
        c = a.application.map(d => W(d));
        b += c.join(", ");
        b += ">";
      } else {
        a.union ? (b += "(", c = a.union.map(d => W(d)), b += c.join("|"), b += ")") : b += "any" == a.name ? "*" : a.name;
      }
    }
  }
  return b;
}
;function kb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h, "default":k, closure:l, alias:m, aliases:n, noParams:p, "static":q}) {
  if (!c) {
    throw Error("Property does not have a name.");
  }
  a.name = c;
  b && (a.description = T(b));
  b = $a({number:g, T:d, boolean:e, type:h});
  p && (a.D = p);
  l && (a.v = l);
  a.type = b;
  void 0 !== k && (a.i = !0);
  a.i && (a.default = k);
  if (f || a.i) {
    a.optional = !0;
  }
  m && (a.B = [m]);
  n && (a.B = n.split(/\s*,\s*/));
  q && (a.f = !0);
}
function lb(a, b = !1) {
  if (b) {
    return a.h;
  }
  if (!a.m) {
    return a.type;
  }
  const {function:{args:c, return:d}} = a.b;
  b = c.map(f => W(f)).map((f, g) => {
    const {optional:h} = c[g];
    ({name:g = `arg${g}`} = a.args[g] || {});
    return `${g}${h ? "?" : ""}: ${f}`;
  }).join(", ");
  const e = W(d);
  return `(${b}) => ${e}`;
}
function mb(a, b = null, c = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = O(a.name, a.default, a.type, b);
  b = a.optional ? `[${b}]` : b;
  const d = `${a.description ? ` ${a.description}` : ""}${a.i ? ` Default \`${a.default}\`.` : ""}`;
  return `{${lb(a, c)}} ${b}${d}`;
}
function nb(a, b = !1) {
  a = mb(a, null, b);
  return ` * @prop ${ob(a, !0)}`;
}
function pb(a) {
  const b = [], {function:{args:c, return:d}} = a.b;
  c.map(e => W(e)).forEach((e, f) => {
    const {optional:g} = c[f], {name:h = `arg${f}`, description:k} = a.args[f] || {};
    b.push(` * @param {${e}${g ? "=" : ""}} ${g ? `[${h}]` : h}${k ? ` ${k}` : ""}`);
  });
  if ("void" != d.name) {
    const e = W(d);
    b.push(` * @return {${e}}`);
  }
  return b;
}
function qb(a) {
  if (a.m) {
    const {function:{args:b}} = a.b;
    return ` = function(${b.map((c, d) => {
      ({name:c = `arg${d}`} = a.args[d] || {});
      return c;
    }).join(", ")}) {}`;
  }
  return a.type.startsWith("function(") ? " = function() {}" : "";
}
function rb(a, b = "") {
  let c = [];
  if (a.description) {
    let d = ob(a.description);
    a.default && (d += ` Default \`${a.default}\`.`);
    c.push(d);
  }
  !a.optional && a.m ? (a = pb(a), c.push(...a)) : c.push(` * @type {${a.optional ? ab(a.h) : a.h}}`);
  b && (c = c.map(d => `${b}${d}`));
  return c.join("\n");
}
function sb(a, b) {
  const c = Object.assign(Object.create(Object.getPrototypeOf(a)), a);
  c.description = `An alias for \`${a.name}\`.`;
  c.name = b;
  return c;
}
class tb {
  constructor(a = []) {
    this.description = this.name = null;
    this.C = "*";
    this.h = "";
    this.v = null;
    this.i = !1;
    this.default = null;
    this.optional = !1;
    this.B = [];
    this.D = !1;
    this.b = null;
    this.args = a;
    this.f = !1;
  }
  get S() {
    return this.f;
  }
  get type() {
    return this.C;
  }
  set type(a) {
    this.C = a;
    this.h = this.v || a;
    if (!this.D) {
      try {
        this.b = gb(this.h);
      } catch (b) {
        this.b = null;
      }
    }
  }
  get m() {
    return this.b && "function" == this.b.name;
  }
  M(a, b = "", c = !1) {
    a = mb(this, a, c);
    return `${b} * @param ${a}`;
  }
}
const ob = (a, b = !1) => a.split("\n").map((c, d) => {
  if (b && !d) {
    return c;
  }
  d = " *";
  c.length && (d += " ");
  return d + c;
}).join("\n");
function X(a, b, c, d, e) {
  var {name:f, type:g, desc:h, noToc:k, spread:l, noExpand:m, "import":n, link:p, closure:q, constructor:t, "extends":u, "interface":v, record:Aa, "return":Ba} = c;
  e = void 0 === e ? null : e;
  if (!f) {
    throw Error("Type does not have a name.");
  }
  a.name = f;
  g && (a.type = g);
  q ? a.h = q : a.h = a.type;
  h && (a.description = T(h));
  a.P = !!k;
  a.O = !!l;
  a.D = !!m;
  a.import = !!n;
  p && (a.link = p);
  !0 === t && (a.isConstructor = t);
  !0 === v && (a.I = v);
  !0 === Aa && (a.v = Aa);
  u && (a.extends = u);
  if (b) {
    c = V("prop", b).map(r => {
      var {content:B, props:C} = r;
      r = new tb;
      kb(r, B, C);
      return r;
    });
    const Ib = V("function", b), Jb = V("fn", b);
    b = V("static", b).map(r => {
      r.isStatic = !0;
      return r;
    });
    b = [...Ib, ...Jb, ...b].map(r => {
      var {content:B, props:C, isStatic:Kb} = r;
      const {Y:Lb, N:aa} = jb(B, e);
      var E = Object.assign({}, C);
      r = C.async;
      var R = void 0 === C["return"] ? "void" : C["return"];
      E = (delete E.async, delete E["return"], E);
      let {args:ba = ""} = C;
      !ba && aa.length && (ba = aa.map(Mb => {
        var {type:Ca, optional:Nb} = Mb;
        return null !== Nb ? `${Ca}=` : Ca;
      }).join(","));
      R = R.replace(/\n\s*/g, " ");
      E.type = `function(${ba}): ${r ? `!Promise<${R}>` : R}`;
      r = new tb(aa);
      kb(r, Lb, E);
      Kb && (r.f = !0);
      return r;
    });
    c = [...c, ...b];
    const {R:Ob, n:Pb} = c.reduce((r, B) => {
      B.S ? r.R.push(B) : r.n.push(B);
      return r;
    }, {R:[], n:[]});
    a.l = [...Ob, ...Pb];
  }
  d && (a.j = d);
  Ba && (a.m = Ba);
}
function ub(a) {
  var b = vb(a);
  a.w || b.push(` * @${a.$}`);
  b = P(b.join("\n"));
  b += S(a.j, a.name, a.Z);
  const c = a.l.reduce((d, e) => {
    d.push(e);
    const f = e.B.map(g => sb(e, g));
    d.push(...f);
    return d;
  }, []).map(d => {
    let e = rb(d);
    e = P(e);
    e += S(`${a.g}${d.S ? "" : ".prototype"}`, d.name);
    return e += qb(d);
  });
  return [b, ...c].join("\n");
}
function wb(a, b) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return (void 0 === b ? 0 : b) ? `${a.A}${c}` : c;
}
function xb(a) {
  return a.w ? `(${a.b.map(b => {
    var {name:c, type:d, optional:e} = b;
    return `${c}${e ? "?" : ""}: ${d}`;
  }).join(", ")}) => ${a.return}` : "Object";
}
function yb(a, b, c, d) {
  b = void 0 === b ? !1 : b;
  c = void 0 === c ? !1 : c;
  d = void 0 === d ? b : d;
  d = ` * @typedef {${(b ? a.h : a.type) || xb(a)}}${` ${wb(a, d)}${a.f}`}`;
  a = (a.l ? a.l.reduce((e, f) => {
    if (f.f) {
      return e;
    }
    e.push(f);
    const g = f.B.map(h => sb(f, h));
    e.push(...g);
    return e;
  }, []) : []).map(e => nb(e, b));
  a = [d, ...a].join("\n");
  b && !c && (a = Q(a));
  return a = P(a);
}
function zb(a, b, c, d) {
  b = void 0 === b ? !1 : b;
  c = void 0 === c ? !1 : c;
  d = void 0 === d ? b : d;
  const e = !!a.extends, f = yb(a, b, c, d), g = [];
  if (a.j && b) {
    var h = ` * @typedef {${a.g}} ${a.name}${a.f}`;
    b && !c && (h = Q(h));
    h = P(h);
    g.push(h);
  } else {
    a.j && d && (h = ` * @typedef {${a.g}} ${a.name}${a.f}`, h = P(h), g.push(h));
  }
  e && (a = ` * @typedef {${a.extends} & ${wb(a, d)}} ${d ? a.g : a.name}${a.f}`, b && !c && (a = Q(a)), a = P(a), g.push(a));
  g.push(f);
  return g.join("");
}
function vb(a, b) {
  b = void 0 === b ? "" : b;
  let c = [];
  a.description && c.push(` * ${a.description}`);
  a.extends && c.push(` * @extends {${a.extends}}`);
  a.b && a.b.forEach(d => {
    let {name:e, description:f, optional:g, type:h} = d;
    e.startsWith("...") && (e = e.slice(3), h = `...${h}`);
    c.push(` * @param {${h}${g ? "=" : ""}} ${g ? `[${e}]` : e}${f ? ` ${f}` : ""}`);
  });
  a.m && c.push(` * @return {${a.return}}`);
  b && (c = c.map(d => `${b}${d}`));
  return c;
}
class Y {
  constructor() {
    this.name = "";
    this.link = this.D = this.import = this.O = this.P = this.description = this.h = this.type = null;
    this.l = [];
    this.j = null;
    this.v = this.I = this.isConstructor = !1;
    this.extends = null;
    this.C = !1;
    this.m = this.b = null;
  }
  set w(a) {
    if (!this.b) {
      throw Error("Args expected.");
    }
    this.C = a;
  }
  get w() {
    return this.C;
  }
  get aa() {
    return this.isConstructor || this.I || this.v || this.w;
  }
  get return() {
    return this.w ? this.m || "void" : null;
  }
  get f() {
    return `${this.i ? ` \`\uff20${this.i}\`` : ""}${this.description ? ` ${this.description}` : ""}`;
  }
  get $() {
    const a = this.i;
    if (!a) {
      throw Error("Unknown prototype type (not constructor or interface).");
    }
    return a;
  }
  get i() {
    return this.isConstructor ? "constructor" : this.I ? "interface" : this.v ? "record" : "";
  }
  get Z() {
    return this.b ? `function(${this.b.map(a => {
      ({name:a} = a);
      return a;
    }).join(", ")}) {}` : null;
  }
  get A() {
    return this.j ? `${this.j}.` : "";
  }
  get g() {
    return `${this.A}${this.name}`;
  }
  M(a, b, c, d, e) {
    e = void 0 === e ? !1 : e;
    var f = "";
    !0 === d ? f = "?" : !1 === d && (f = "!");
    d = this.description ? ` ${this.description}` : "";
    const g = this.O ? Ab(this.l) : e ? this.g : this.name;
    b = `${c || ""} * @param {${f}${g}} ${b ? `[${a}]` : a}${d}`;
    f = this.l && !this.D ? this.l.map(h => h.M(a, c, e)) : [];
    return [b, ...f].join("\n");
  }
}
const Ab = (a, b) => {
  a = void 0 === a ? [] : a;
  b = void 0 === b ? !1 : b;
  a = a.reduce((c, d) => {
    c.push(d);
    const e = d.B.map(f => Object.assign({}, d, {name:f}));
    c.push(...e);
    return c;
  }, []);
  return `{ ${a.map(c => {
    const d = b ? c.h : c.type;
    let e = c.name, f = d;
    c.optional && !b ? e = `${c.name}?` : c.optional && b && (f = `(${ab(d)})`);
    return `${e}: ${f}`;
  }).join(", ")} }`;
};
function Bb(a, {name:b, from:c, desc:d, link:e, ns:f}) {
  a.name = b;
  a.from = c;
  a.K = d;
  a.link = e;
  a.A = f || a.from;
}
function Cb(a, b = !0) {
  return ` * @typedef {import('${a.from}').${a.name}} ${b ? a.g : a.name}`;
}
class Db {
  constructor() {
    this.from = this.name = this.A = "";
    this.link = this.K = null;
  }
  get g() {
    return `${this.A}.${this.name}`;
  }
}
;function Eb(a, b) {
  b = b.reduce((c, d) => Object.assign({}, c, {[d.g]:d}), {});
  a.J = Object.assign({}, a.J, b);
}
class Fb extends N {
  constructor(a, b) {
    b = void 0 === b ? {} : b;
    super(a);
    this.J = {};
    this.on("types", c => {
      Eb(this, c);
    });
    this.on("namespace", c => {
      this.b.includes(c) || this.b.push(c);
    });
    this.i = b;
    this.b = [];
    this.o = console.log;
    this.file = null;
    this.lines = [];
  }
  static get Type() {
    return Y;
  }
  static get b() {
    return Db;
  }
  get types() {
    return this.J;
  }
}
;const Hb = a => {
  a = V("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:b, props:{namespace:c, ns:d = c}}] = a, e = void 0 == d ? void 0 : d;
  a = V("type", b).reduce((k, l) => {
    var {content:m, props:n} = l, p = Object.assign({}, n);
    l = n.alias;
    var q = n.aliases;
    const t = (delete p.alias, delete p.aliases, p);
    p = new Y;
    X(p, m, n, e, void 0);
    k.push(p);
    l ? (q = new Y, X(q, m, Object.assign({}, t, {name:l}), e, void 0), k.push(q)) : q && q.split(/, */).forEach(u => {
      const v = new Y;
      X(v, m, Object.assign({}, t, {name:u}), e, void 0);
      k.push(v);
    });
    return k;
  }, []);
  var f = V("interface", b).reduce((k, l) => {
    var {content:m, props:n} = l;
    l = Gb(m, n, e);
    l.forEach(p => {
      p.I = !0;
    });
    k.push(...l);
    return k;
  }, []), g = V("constructor", b).reduce((k, l) => {
    var {content:m, props:n} = l;
    l = Gb(m, n, e);
    l.forEach(p => {
      p.isConstructor = !0;
    });
    k.push(...l);
    return k;
  }, []);
  const h = V("method", b).reduce((k, l) => {
    var {content:m, props:n} = l;
    l = Gb(m, n, e, void 0);
    l.forEach(p => {
      p.w = !0;
    });
    k.push(...l);
    return k;
  }, []);
  a = [...a, ...f, ...g, ...h];
  f = V("import", b).map(k => {
    var {props:l, content:m} = k;
    k = new Db;
    m && (l.desc = T(m));
    Bb(k, l);
    return k;
  });
  g = f.map(k => {
    var {name:l, from:m, K:n, link:p, A:q} = k;
    k = new Y;
    X(k, "", {name:l, type:`import('${m}').${l}`, P:!0, import:!0, K:n, link:p}, void 0 == q ? void 0 : q);
    return k;
  });
  return {j:d, types:a, imports:f, ba:g};
}, Qb = (a, b, c, d) => {
  const e = new Y, f = a.search(/<(prop|function|fn|static) /);
  let g = "", h = a;
  1 != f && (g = a.slice(0, f), h = a.slice(f));
  ({N:a} = jb(g, d));
  X(e, h, b, c);
  e.b = a;
  return e;
}, Gb = (a, b, c, d) => {
  const e = [];
  var f = Object.assign({}, b), g = b.alias;
  const h = b.aliases, k = (delete f.alias, delete f.aliases, f);
  b = Qb(a, b, c, d);
  e.push(b);
  g ? (g = Qb(a, Object.assign({}, k, {name:g}), c, d), g.description = `${g.description}${g.description ? " " : ""}Alias of \`${k.name}\`.`, e.push(g)) : h && h.split(/, */).forEach(l => {
    l = Qb(a, Object.assign({}, k, {name:l}), c, d);
    l.description = `${l.description}${l.description ? " " : ""}Alias of \`${k.name}\`.`;
    e.push(l);
  });
  return e;
}, Rb = async(a, b) => {
  b = void 0 === b ? [] : b;
  a = await G(a);
  let {j:c = null, types:d, imports:e} = Hb(a);
  d = d.filter(f => {
    ({g:f} = f);
    return b.includes(f) ? !1 : !0;
  });
  e = e.filter(f => {
    ({g:f} = f);
    return b.includes(f) ? !1 : !0;
  });
  return {types:d, imports:e, j:c};
};
const Sb = (a, b, c) => {
  b = b.map(d => zb(d, !0, c));
  a = a.map(d => {
    d = Cb(d);
    return P(c ? d : Q(d));
  });
  return [...b, ...a].join("");
}, Tb = (a, b, c, d = !1) => {
  a = [...a.map(e => {
    {
      let f;
      e.h ? f = ` * @typedef {${e.h}}` : e.aa || (f = ` * @typedef {${Ab(e.l, !0)}}`);
      f ? (e.description && (f = ` * ${e.description}\n${f}`), f = P(f), e = f += S(e.j, e.name)) : e = ub(e);
    }
    return e;
  })].join("\n");
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const Vb = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, c) {
  const [d, ...e] = c.split(/\s+/), f = e.includes("closure"), g = e.includes("externs"), h = e.includes("noSuppress"), k = e.includes("skipNsDecl"), l = e.includes("namespace");
  let m = e.find(q => q.startsWith("ignore:"));
  m = m ? m.replace("ignore:", "").split(",") : [];
  let {H:n, L:p} = this.i;
  f && (n = !0);
  g && (p = !0);
  try {
    this.o("Detected type marker: %s", c);
    const {types:q, imports:t, j:u} = await Rb(d, m);
    this.emit("types", q);
    this.emit("types", t);
    let v;
    n ? v = Sb(t, q, h) : p ? (v = Tb(q, u, this.b, k) + "\n", u && this.emit("namespace", u)) : l ? (u && this.emit("namespace", u), v = Ub(t, q, !0)) : v = Ub(t, q);
    return `/* ${b} ${c} */\n${v}`;
  } catch (q) {
    return this.o("(%s) Could not process typedef-js: %s", c, q.message), process.env.b && console.error(q.stack), a;
  }
}}, Ub = (a, b, c = !1) => {
  b = b.map(d => zb(d, !1, !1, c));
  a = a.map(d => Cb(d, c)).map(P).join("");
  b = b.join("");
  return `${a}${b}`.replace(Wb, " * @typedef");
}, Wb = / \*\/\n\/\*\*\n \* @typedef/g;
const Yb = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?.*)*)/gm, replacement:Xb};
function Xb(a, b, c, d, e, f, g) {
  const {H:h} = this.i;
  let k;
  f = () => {
    if (this.lines && this.file) {
      var m;
      {
        let q = m = 0;
        for (; q < g;) {
          q += this.lines[m].length, m++;
        }
        m = {line:m, V:b.length + 11};
      }
      const {line:n, V:p} = m;
      this.o("%s:%s:%s", this.file, n, p);
    }
  };
  try {
    k = gb(c);
  } catch (m) {
    return this.o("Error while parsing the type %s", c), this.o(process.env.DEBUG ? m.stack : m.message), f(), a;
  }
  if (!k) {
    return this.o("Could not parse the type %s", c), f(), a;
  }
  const l = Object.values(this.types).map(({name:m, g:n}) => h ? n : m);
  if (!Z(k, l, this.o, c, f)) {
    return a;
  }
  c = Object.values(this.types).find(({name:m, g:n}) => h ? n == k.name : m == k.name);
  return !c || c instanceof Fb.b ? a : c.M(e, d, b, k.nullable, h);
}
const Z = (a, b, c, d, e) => {
  if (a) {
    var f = a.name;
    if (!f || !"string number boolean null undefined symbol any".split(" ").includes(f)) {
      if (f && !a.application && !a.function) {
        let h = b.includes(f);
        h || (h = Zb.includes(f));
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
}, Zb = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var $b = (a, b = !1) => {
  var {X:c} = Ta();
  const d = Va(c);
  c = Ua(c);
  return new Fb(b ? [Vb] : [Vb, d, Yb, c], a);
};
var bc = async() => {
  const {H:a = !1, L:b = !1, F:c, types:d} = {H:la, L:ma, F:ka, types:na};
  await Promise.all(x.map(async e => {
    var f = await I(y, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await K(e), g = L(f.content, e));
    await ac(g, a, b, c, d);
  }));
};
const ac = async(a, b = !1, c = !1, d = null, e = null) => {
  const f = [];
  e && await Promise.all(e.split(",").map(async g => {
    g = await G(g);
    const {types:h, imports:k} = Hb(g);
    f.push(h, k);
  }));
  await Promise.all(a.map(async g => {
    var h = await G(g);
    const k = $b({H:b, L:c}, c);
    f.forEach(l => k.emit("types", l));
    k.file = g;
    k.o = console.error;
    k.lines = h.split("\n");
    k.end(h);
    h = await F(k);
    "-" == d ? console.log(h) : d ? await H(d, h) : await H(g, h);
  }));
};
const cc = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, dc = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, ec = "type opt name quote defaultValue description Default".split(" "), Za = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), fc = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class gc extends z {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform(a, b, c) {
    var {type:d, name:e, description:f, l:g} = a;
    a = d && d.startsWith("import") ? hc(d, e) : fc(d, e, f, g);
    this.push(a);
    g.forEach(h => {
      var {type:k, name:l, default:m, description:n, optional:p} = h;
      {
        h = ["string", "number", "boolean"].includes(k) ? ` ${k}` : ` type="${k}"`;
        var q = void 0 !== m;
        const t = q ? ` default="${m}"` : "";
        q = p && !q ? " opt" : "";
        const u = " ".repeat(4), v = " ".repeat(6);
        h = `${u}<prop${q}${h} name="${l}"${t}${n ? `>\n${v}${n}\n${u}</prop>` : "/>"}\n`;
      }
      this.push(h);
    });
    g.length && this.push("  </type>\n");
    c();
  }
}
const hc = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class ic extends z {
  constructor() {
    super({objectMode:!0});
  }
  _transform(a, b, c) {
    var [, d, e, f, g] = a;
    a = U(dc, g, ec).map(h => {
      var k = Object.assign({}, h), l = h.defaultValue;
      const m = h.Default;
      var n = h.opt;
      const p = h.name;
      h = h.type;
      k = (delete k.defaultValue, delete k.Default, delete k.opt, delete k.name, delete k.type, k);
      n = Object.assign({}, k, {name:p, type:h}, l ? {defaultValue:cc(l)} : {}, m ? {G:cc(m)} : {}, n ? {optional:!0} : {});
      if (l || m) {
        l ? l !== m && void 0 !== n.G && (l = O(p, m, h), console.error("%s[%s] does not match Default `%s`.", e, l, n.G)) : (l = O(p, m, h), console.error("%s[%s] got from Default.", e, l)), n.default = "defaultValue" in n ? n.defaultValue : n.G, delete n.defaultValue, delete n.G;
      }
      return n;
    });
    this.push({type:d, name:e, description:f, l:a});
    c();
  }
}
async function jc(a) {
  const b = Ya(), c = new ic, d = new gc;
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
  ${(await F(d)).trim()}
</types>`;
}
;var kc = async() => {
  const {F:a} = {F:ka};
  await Promise.all(x.map(async b => {
    b = await G(b);
    b = await jc(b);
    a ? await H(a, b) : console.log(b);
  }));
};
const lc = /( *) \* @fnType {(.+?)}/gm;
class mc extends N {
  constructor(a, b) {
    super([{re:lc, async replacement(c, d, e) {
      e = e.split(".");
      let f, g;
      if (2 == e.length) {
        [f, g] = e;
      } else {
        if (3 == e.length) {
          f = `${e[0]}.${e[1]}`, g = e[2];
        } else {
          throw Error("The @fnType should consist of _namespace.Type.propName or Type.propName");
        }
      }
      e = a.find(({g:h}) => h == f);
      if (!e) {
        return console.error("Type %s in %s not found", f, b), c;
      }
      if ("constructor" == g) {
        return vb(e, d).join("\n");
      }
      e = e.l.find(({name:h}) => h == g);
      return e ? e.b ? rb(e, d) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", g, f, b), c) : (console.error("Property %s of type %s in %s not found", g, f, b), c);
    }}]);
  }
}
;const nc = async a => {
  if (!a) {
    return [];
  }
  const b = await I(y, a);
  if (b.isFile()) {
    var c = [a];
  } else {
    b.isDirectory() && (c = await K(a), c = L(c.content, a), c = c.filter(d => d.endsWith(".xml")));
  }
  return c;
}, oc = async a => (await Promise.all(a.map(async b => {
  const c = await Rb(b);
  return Object.assign({}, c, {location:b});
}))).reduce((b, c) => {
  var {imports:d, types:e} = c;
  b.push(...d);
  b.push(...e);
  return b;
}, []);
async function pc() {
  var a = {F:oa, types:na};
  a = void 0 === a ? {} : a;
  const {F:b, types:c} = a;
  a = await nc(c);
  const d = await oc(a);
  await Promise.all(x.map(async e => {
    var f = await I(y, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await K(e), g = L(f.content, e));
    await qc(g, d, b);
  }));
}
const qc = async(a, b, c) => {
  b = void 0 === b ? [] : b;
  c = void 0 === c ? null : c;
  await Promise.all(a.map(async d => {
    var e = await G(d);
    const f = new mc(b, d);
    f.end(e);
    e = await F(f);
    "-" == c ? console.log(e) : c ? await H(c, e) : await H(d, e);
  }));
};
if (qa) {
  const a = ja();
  console.log(sa({usage:a, description:"Embeds and maintains Closure-compatible types JSDoc in\nJavaScript source code from an external types.xml file.", line:"typal source [--closure|externs] [--migrate] [-o output] [-hv]", example:"typal src/index.js -c"}));
  process.exit();
} else {
  ra && (console.log(require("../../package.json").version), process.exit());
}
(async() => {
  try {
    return pa ? await kc() : oa ? await pc() : await bc();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map