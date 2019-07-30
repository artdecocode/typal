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
version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, v = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = ha(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce((e, f) => {
    var g = Object.assign({}, e);
    e = e.s;
    g = (delete g.s, g);
    if (0 == e.length && d) {
      return Object.assign({}, {s:e}, g);
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
        return Object.assign({}, {s:e}, g);
      }
    }
    return void 0 === k ? Object.assign({}, {s:e}, g) : Object.assign({}, {s:e}, g, {[f]:k});
  }, {s:b});
}(ia), w = v.source, ka = v.output, la = v.closure, ma = v.externs, na = v.types, oa = v.template, pa = v.migrate, qa = v.help, ra = v.version;
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
;const {createReadStream:ta, createWriteStream:ua, lstat:x, readdir:va} = fs;
var wa = stream;
const {Transform:y, Writable:xa} = stream;
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
const {homedir:Ba} = os;
const Ca = /\s+at.*(?:\(|\s)(.*)\)?/, Da = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ea = Ba(), B = a => {
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
    e = B(e);
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
    var b = a || {}, c = Object.assign({}, b);
    const d = void 0 === b.binary ? !1 : b.binary, e = void 0 === b.rs ? null : b.rs;
    b = (delete c.binary, delete c.rs, c);
    const {P:f = F(!0), proxyError:g} = a || {}, h = (k, l) => f(l);
    super(b);
    this.b = [];
    this.N = new Promise((k, l) => {
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
          const n = B(m.stack);
          m.stack = n;
          g && h`${m}`;
        }
        l(m);
      });
      e && Ga(this, e).pipe(this);
    });
  }
  _write(a, b, c) {
    this.b.push(a);
    c();
  }
  get g() {
    return this.N;
  }
}
const G = async a => {
  var b = void 0 === b ? {} : b;
  ({g:a} = new Ha(Object.assign({}, {rs:a}, b, {P:F(!0)})));
  return await a;
};
async function H(a) {
  a = ta(a);
  return await G(a);
}
;async function I(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = F(!0), d = ua(a);
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
async function J(a, b, c) {
  const d = F(!0);
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
      Ia(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (Ia(e, 0), k = [b, h]);
    a(...k);
  });
}
;const {join:K} = path;
async function Ja(a, b) {
  b = b.map(async c => {
    const d = K(a, c);
    return {lstat:await J(x, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Ka = a => a.lstat.isDirectory(), La = a => !a.lstat.isDirectory();
async function L(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await J(x, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await J(va, a);
  b = await Ja(a, b);
  a = b.filter(Ka);
  b = b.filter(La).reduce((c, d) => {
    var e = d.lstat.isDirectory() ? "Directory" : d.lstat.isFile() ? "File" : d.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return Object.assign({}, c, {[d.relativePath]:{type:e}});
  }, {});
  a = await a.reduce(async(c, d) => {
    var {path:e, relativePath:f} = d;
    c = await c;
    d = await L(e);
    return Object.assign({}, c, {[f]:d});
  }, {});
  return {content:Object.assign({}, b, a), type:"Directory"};
}
const M = (a, b) => {
  let c = [], d = [];
  Object.keys(a).forEach(f => {
    const {type:g} = a[f];
    "File" == g ? c.push(K(b, f)) : "Directory" == g && d.push(f);
  });
  const e = d.reduce((f, g) => {
    const {content:h} = a[g];
    g = M(h, K(b, g));
    return [...f, ...g];
  }, []);
  return [...c, ...e];
};
function Ma(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const N = (a, b) => {
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
function Na(a, b) {
  function c() {
    return b.filter(Ma).reduce((d, {re:e, replacement:f}) => {
      if (this.o) {
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
            return this.o ? h : f.call(this, h, ...k);
          } catch (l) {
            N(g, l);
          }
        });
      }
    }, `${a}`);
  }
  c.b = () => {
    c.o = !0;
  };
  return c.call(c);
}
;const Oa = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Pa = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, Qa = () => {
  var a = {R:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
  return Object.keys(a).reduce((b, c) => {
    {
      var d = a[c];
      const {getReplacement:e = Pa, getRegex:f = Oa} = {}, g = f(c);
      d = {name:c, re:d, regExp:g, getReplacement:e, map:{}, lastIndex:0};
    }
    return Object.assign({}, b, {[c]:d});
  }, {});
}, Ra = a => {
  var b = void 0 === b ? [] : b;
  const {regExp:c, map:d} = a;
  return {re:c, replacement(e, f) {
    e = d[f];
    delete d[f];
    return Na(e, Array.isArray(b) ? b : [b]);
  }};
}, Sa = a => {
  const {re:b, map:c, getReplacement:d, name:e} = a;
  return {re:b, replacement(f) {
    const {lastIndex:g} = a;
    c[g] = f;
    a.lastIndex += 1;
    return d(e, g);
  }};
};
async function Ta(a, b) {
  b instanceof wa ? b.pipe(a) : a.end(b);
  return await G(a);
}
class O extends y {
  constructor(a, b) {
    super(b);
    this.g = (Array.isArray(a) ? a : [a]).filter(Ma);
    this.o = !1;
    this.A = b;
  }
  async replace(a, b) {
    const c = new O(this.g, this.A);
    b && Object.assign(c, b);
    a = await Ta(c, a);
    c.o && (this.o = !0);
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  async reduce(a) {
    return await this.g.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.o) {
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
            if (this.o) {
              return e.length ? e.push(Promise.resolve(h)) : h;
            }
            const l = d.call(this, h, ...k);
            l instanceof Promise && e.push(l);
            return l;
          } catch (l) {
            N(f, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            N(f, h);
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
;function Ua() {
  var a = Va;
  let b = "";
  const c = new y({transform(d, e, f) {
    let g;
    for (b += d.toString(); (d = a.exec(b)) && (c.push(d), g = d, a.global);) {
    }
    g && (b = b.slice(g.index + g[0].length));
    f();
  }, objectMode:!0});
  return c;
}
;const S = (a, b, c, d) => {
  if (!a) {
    throw Error("The name of the property is not given");
  }
  a = `${d ? `${d}.` : ""}${a}`;
  if (null === b) {
    return a;
  }
  b = Number.isInteger(b) || !0 === b || !1 === b || ["number", "boolean"].includes(c) ? b : `"${b}"`;
  return `${a}=${b}`;
}, Wa = ({number:a, M:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", Xa = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, Ya = a => `/**
${a}
 */
`, T = a => ` * @suppress {nonStandardJsDocs}
${a}`, U = (a, b, c) => {
  a = `${a ? "" : "var "}${a ? `${a}.` : ""}${b}`;
  c && (a += ` = ${c}`);
  return a;
}, V = a => {
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
function W(a, b, c) {
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
;const Za = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), $a = new RegExp(`\\s*((?:${Za.source}\\s*)*)`);
const X = (a, b) => W(new RegExp(`<${a}${$a.source}?(?:${/\s*\/>/.source}|${(new RegExp(`>([\\s\\S]+?)?</${a}>`)).source})`, "g"), b, ["a", "v", "v1", "v2", "c"]).map(({a:c = "", c:d = ""}) => {
  c = c.replace(/\/$/, "").trim();
  c = ab(c);
  return {content:d, v:c};
}), ab = a => W(Za, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
const bb = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function cb(a) {
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
;function db(a) {
  a = bb(a);
  return cb(a);
}
;function eb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h}) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = V(b));
  a.type = Wa({number:g, M:d, boolean:e, type:h});
  f && (a.optional = !0);
}
class fb {
  constructor() {
    this.name = null;
    this.type = "";
    this.optional = null;
    this.description = "";
  }
}
;function gb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h, "default":k, closure:l, alias:m, aliases:n, noParams:p}) {
  if (!c) {
    throw Error("Property does not have a name.");
  }
  a.name = c;
  b && (a.description = V(b));
  a.type = Wa({number:g, M:d, boolean:e, type:h});
  l ? a.f = l : a.f = a.type;
  void 0 !== k && (a.g = !0);
  a.g && (a.default = k);
  if (f || a.g) {
    a.optional = !0;
  }
  m && (a.w = [m]);
  n && (a.w = n.split(/\s*,\s*/));
  p && (a.l = p);
  if (!a.optional && !a.l) {
    try {
      a.b = db(a.f);
    } catch (q) {
    }
  }
}
function hb(a, b = null, c = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = S(a.name, a.default, a.type, b);
  return `{${c ? a.f : a.type}} ${a.optional ? `[${b}]` : b}${`${a.description ? ` ${a.description}` : ""}${a.g ? ` Default \`${a.default}\`.` : ""}`}`;
}
function ib(a, b = !1) {
  a = hb(a, null, b);
  return ` * @prop ${jb(a, !0)}`;
}
function kb(a) {
  const b = [], {function:{args:c, return:d}} = a.b;
  c.map(Y).forEach((e, f) => {
    const {optional:g} = c[f], {name:h = `arg${f}`, description:k} = a.args[f] || {};
    b.push(` * @param {${e}${g ? "=" : ""}} ${g ? `[${h}]` : h}${k ? ` ${k}` : ""}`);
  });
  if ("void" != d.name) {
    const e = Y(d);
    b.push(` * @return {${e}}`);
  }
  return b;
}
function lb(a, b = "") {
  const c = [];
  if (a.description) {
    let d = jb(a.description);
    a.default && (d += ` Default \`${a.default}\`.`);
    c.push(d);
  }
  a.b && "function" == a.b.name ? (a = kb(a), c.push(...a)) : c.push(` * @type {${a.optional ? Xa(a.f) : a.f}}`);
  return c.map(d => `${b}${d}`).join("\n");
}
function mb(a, b) {
  const c = Object.assign(Object.create(Object.getPrototypeOf(a)), a);
  c.description = `An alias for \`${a.name}\`.`;
  c.name = b;
  return c;
}
class nb {
  constructor(a = []) {
    this.description = this.name = null;
    this.type = "*";
    this.f = "";
    this.g = !1;
    this.default = null;
    this.optional = !1;
    this.w = [];
    this.l = !1;
    this.b = null;
    this.args = a;
  }
  I(a, b = "", c = !1) {
    a = hb(this, a, c);
    return `${b} * @param ${a}`;
  }
}
const jb = (a, b = !1) => a.split("\n").map((c, d) => {
  if (b && !d) {
    return c;
  }
  d = " *";
  c.length && (d += " ");
  return d + c;
}).join("\n"), Y = a => {
  var b = "";
  a.nullable ? b = "?" : !1 === a.nullable && (b = "!");
  if (a.function) {
    b += a.name + "(";
    const d = [];
    if (a.function.this) {
      var c = "this: " + Y(a.function.this);
      d.push(c);
    }
    a.function.new && (c = "new: " + Y(a.function.new), d.push(c));
    a.function.args.forEach(e => {
      let f = Y(e);
      e.optional && (f += "=");
      d.push(f);
    });
    a.function.variableArgs && (c = "..." + Y(a.function.variableArgs), d.push(c));
    c = d.join(", ");
    b += c + ")";
    a.function.return && (b += ": " + Y(a.function.return));
  } else {
    if (a.record) {
      b += "{ ", c = Object.keys(a.record).map(d => {
        var e = a.record[d];
        if (!e) {
          return d;
        }
        e = Y(e);
        return `${d}: ${e}`;
      }), b += c.join(", "), b += " }";
    } else {
      if (a.application) {
        if ("Promise" == a.name && !a.application.some(d => "void" != d.name)) {
          return b + "Promise";
        }
        b += a.name + "<";
        c = a.application.map(d => Y(d));
        b += c.join(", ");
        b += ">";
      } else {
        a.union ? (b += "(", c = a.union.map(d => Y(d)), b += c.join("|"), b += ")") : b += "any" == a.name ? "*" : a.name;
      }
    }
  }
  return b;
};
function ob(a, b, c, d) {
  var {name:e, type:f, desc:g, noToc:h, spread:k, noExpand:l, "import":m, link:n, closure:p, constructor:q, "extends":t, "interface":u, record:P} = c;
  if (!e) {
    throw Error("Type does not have a name.");
  }
  a.name = e;
  f && (a.type = f);
  p ? a.f = p : a.f = a.type;
  g && (a.description = V(g));
  a.L = !!h;
  a.K = !!k;
  a.J = !!l;
  a.import = !!m;
  n && (a.link = n);
  !0 === q && (a.isConstructor = q);
  !0 === u && (a.l = u);
  !0 === P && (a.A = P);
  t && (a.extends = t);
  if (b) {
    c = X("prop", b).map(r => {
      var {content:z, v:A} = r;
      r = new nb;
      gb(r, z, A);
      return r;
    });
    const Ab = X("function", b);
    b = X("fn", b);
    b = [...Ab, ...b].map(r => {
      var {content:z, v:A} = r, C = z.lastIndexOf("</arg>");
      r = [];
      -1 != C && (C += 6, r = z.slice(0, C), z = z.slice(C), r = X("arg", r), r = r.map(D => {
        var {content:Q, v:aa} = D;
        D = new fb;
        eb(D, Q, aa);
        return D;
      }));
      var E = Object.assign({}, A);
      C = A.async;
      var R = void 0 === A["return"] ? "void" : A["return"];
      E = (delete E.async, delete E["return"], E);
      let {args:ba = ""} = A;
      !ba && r.length && (ba = r.map(D => {
        var {type:Q, optional:aa} = D;
        return null !== aa ? `${Q}=` : Q;
      }).join(","));
      R = R.replace(/\n\s*/g, " ");
      E.type = `function(${ba}): ${C ? `!Promise<${R}>` : R}`;
      r = new nb(r);
      gb(r, z, E);
      return r;
    });
    a.i = [...c, ...b];
  }
  d && (a.j = d);
}
function pb(a) {
  var b = [];
  a.description && b.push(` * ${a.description}`);
  a.extends && b.push(` * @extends {${a.extends}}`);
  b.push(` * @${a.S}`);
  b = `/**
${b.join("\n")}
 */
`;
  b += U(a.j, a.name, void 0);
  const c = a.i.reduce((d, e) => {
    d.push(e);
    const f = e.w.map(g => mb(e, g));
    d.push(...f);
    return d;
  }, []).map(d => {
    let e = lb(d);
    e = `/**
${e}
 */
` + U(`${a.h}.prototype`, d.name);
    if (d.b && "function" == d.b.name) {
      var {function:{args:f}} = d.b;
      f = f.map((g, h) => {
        ({name:g = `arg${h}`} = d.args[h] || {});
        return g;
      });
      e += ` = function(${f.join(", ")}) {}`;
    } else {
      d.type.startsWith("function(") && (e += " = function() {}");
    }
    return e;
  });
  return [b, ...c].join("\n");
}
function qb(a, b) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return b ? `${a.u}${c}` : c;
}
function rb(a, b, c) {
  var d = ` * @typedef {${(b ? a.f : a.type) || "Object"}}${` ${qb(a, b)}${a.g}`}`;
  a = (a.i ? a.i.reduce((e, f) => {
    e.push(f);
    const g = f.w.map(h => mb(f, h));
    e.push(...g);
    return e;
  }, []) : []).map(e => ib(e, b));
  d = [d, ...a].join("\n");
  b && !c && (d = T(d));
  return `/**
${d}
 */
`;
}
function sb(a, b, c) {
  b = void 0 === b ? !1 : b;
  c = void 0 === c ? !1 : c;
  const d = !!a.extends, e = rb(a, b, c), f = [];
  if (a.j && b) {
    let g = ` * @typedef {${a.h}} ${a.name}${a.g}`;
    b && !c && (g = T(g));
    g = `/**
${g}
 */
`;
    f.push(g);
  }
  d && (a = ` * @typedef {${a.extends} & ${qb(a, b)}} ${b ? a.h : a.name}${a.g}`, b && !c && (a = T(a)), a = `/**
${a}
 */
`, f.push(a));
  f.push(e);
  return f.join("");
}
class tb {
  constructor() {
    this.name = "";
    this.link = this.J = this.import = this.K = this.L = this.description = this.f = this.type = null;
    this.i = [];
    this.j = null;
    this.A = this.l = this.isConstructor = !1;
    this.extends = null;
  }
  get T() {
    return this.isConstructor || this.l || this.A;
  }
  get g() {
    return `${this.b ? ` \`\uff20${this.b}\`` : ""}${this.description ? ` ${this.description}` : ""}`;
  }
  get S() {
    const a = this.b;
    if (!a) {
      throw Error("Unknown prototype type (not constructor or interface).");
    }
    return a;
  }
  get b() {
    return this.isConstructor ? "constructor" : this.l ? "interface" : this.A ? "record" : "";
  }
  get u() {
    return this.j ? `${this.j}.` : "";
  }
  get h() {
    return `${this.u}${this.name}`;
  }
  I(a, b, c, d, e) {
    e = void 0 === e ? !1 : e;
    var f = "";
    !0 === d ? f = "?" : !1 === d && (f = "!");
    d = this.description ? ` ${this.description}` : "";
    const g = this.K ? ub(this.i) : e ? this.h : this.name;
    b = `${c || ""} * @param {${f}${g}} ${b ? `[${a}]` : a}${d}`;
    f = this.i && !this.J ? this.i.map(h => h.I(a, c, e)) : [];
    return [b, ...f].join("\n");
  }
}
const ub = (a, b) => {
  a = void 0 === a ? [] : a;
  b = void 0 === b ? !1 : b;
  a = a.reduce((c, d) => {
    c.push(d);
    const e = d.w.map(f => Object.assign({}, d, {name:f}));
    c.push(...e);
    return c;
  }, []);
  return `{ ${a.map(c => {
    const d = b ? c.f : c.type;
    let e = c.name, f = d;
    c.optional && !b ? e = `${c.name}?` : c.optional && b && (f = `(${Xa(d)})`);
    return `${e}: ${f}`;
  }).join(", ")} }`;
};
function vb(a, {name:b, from:c, desc:d, link:e, ns:f}) {
  a.name = b;
  a.from = c;
  a.G = d;
  a.link = e;
  a.u = f || a.from;
}
function wb(a, b = !0) {
  return ` * @typedef {import('${a.from}').${a.name}} ${b ? a.h : a.name}`;
}
class xb {
  constructor() {
    this.from = this.name = this.u = "";
    this.link = this.G = null;
  }
  get h() {
    return `${this.u}.${this.name}`;
  }
}
;function yb(a, b) {
  b = b.reduce((c, d) => Object.assign({}, c, {[d.h]:d}), {});
  a.F = Object.assign({}, a.F, b);
}
class zb extends O {
  constructor(a, b) {
    b = void 0 === b ? {} : b;
    super(a);
    this.F = {};
    this.on("types", c => {
      yb(this, c);
    });
    this.on("namespace", c => {
      this.b.includes(c) || this.b.push(c);
    });
    this.l = b;
    this.b = [];
    this.m = console.log;
    this.file = null;
    this.lines = [];
  }
  static get Type() {
    return tb;
  }
  static get b() {
    return xb;
  }
  get types() {
    return this.F;
  }
}
;const Bb = a => {
  a = X("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:b, v:{namespace:c, ns:d = c}}] = a, e = void 0 == d ? void 0 : d;
  a = X("type", b).map(({content:h, v:k}) => {
    const l = new tb;
    ob(l, h, k, e);
    return l;
  });
  const f = X("import", b).map(({v:h, content:k}) => {
    const l = new xb;
    k && (h.desc = V(k));
    vb(l, h);
    return l;
  }), g = f.map(({name:h, from:k, G:l, link:m, u:n}) => {
    const p = new tb;
    ob(p, "", {name:h, type:`import('${k}').${h}`, L:!0, import:!0, G:l, link:m}, void 0 == n ? void 0 : n);
    return p;
  });
  return {j:d, types:a, imports:f, U:g};
}, Cb = async(a, b = []) => {
  a = await H(a);
  let {j:c = null, types:d, imports:e} = Bb(a);
  d = d.filter(({h:f}) => b.includes(f) ? !1 : !0);
  e = e.filter(({h:f}) => b.includes(f) ? !1 : !0);
  return {types:d, imports:e, j:c};
};
const Db = (a, b, c) => {
  b = b.map(d => sb(d, !0, c));
  a = a.map(d => {
    d = wb(d);
    return `/**
${c ? d : T(d)}
 */
`;
  });
  return [...b, ...a].join("");
}, Eb = (a, b, c, d = !1) => {
  a = [...a.map(e => {
    {
      let f;
      e.f ? f = ` * @typedef {${e.f}}` : e.T || (f = ` * @typedef {${ub(e.i, !0)}}`);
      f ? (e.description && (f = ` * ${e.description}\n${f}`), f = `/**
${f}
 */
`, e = f += U(e.j, e.name)) : e = pb(e);
    }
    return e;
  })].join("\n");
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const Gb = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, c) {
  const [d, ...e] = c.split(/\s+/), f = e.includes("closure"), g = e.includes("externs"), h = e.includes("noSuppress"), k = e.includes("skipNsDecl");
  let l = e.find(p => p.startsWith("ignore:"));
  l = l ? l.replace("ignore:", "").split(",") : [];
  let {D:m, H:n} = this.l;
  f && (m = !0);
  g && (n = !0);
  try {
    this.m("Detected type marker: %s", c);
    const {types:p, imports:q, j:t} = await Cb(d, l);
    this.emit("types", p);
    this.emit("types", q);
    let u;
    m ? u = Db(q, p, h) : n ? (u = Eb(p, t, this.b, k) + "\n", t && this.emit("namespace", t)) : u = Fb(q, p);
    return `/* ${b} ${c} */\n${u}`;
  } catch (p) {
    return this.m("(%s) Could not process typedef-js: %s", c, p.message), process.env.b && console.error(p.stack), a;
  }
}}, Fb = (a, b) => {
  b = b.map(c => sb(c));
  a = a.map(c => wb(c, !1)).map(Ya).join("");
  b = b.join("");
  return `${a}${b}`.replace(Hb, " * @typedef");
}, Hb = / \*\/\n\/\*\*\n \* @typedef/g;
const Jb = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?.*)*)/gm, replacement:Ib};
function Ib(a, b, c, d, e, f, g) {
  const {D:h} = this.l;
  let k;
  f = () => {
    if (this.lines && this.file) {
      var m;
      {
        let q = m = 0;
        for (; q < g;) {
          q += this.lines[m].length, m++;
        }
        m = {line:m, O:b.length + 11};
      }
      const {line:n, O:p} = m;
      this.m("%s:%s:%s", this.file, n, p);
    }
  };
  try {
    k = db(c);
  } catch (m) {
    return this.m("Error while parsing the type %s", c), this.m(process.env.DEBUG ? m.stack : m.message), f(), a;
  }
  if (!k) {
    return this.m("Could not parse the type %s", c), f(), a;
  }
  const l = Object.values(this.types).map(({name:m, h:n}) => h ? n : m);
  if (!Z(k, l, this.m, c, f)) {
    return a;
  }
  c = Object.values(this.types).find(({name:m, h:n}) => h ? n == k.name : m == k.name);
  return !c || c instanceof zb.b ? a : c.I(e, d, b, k.nullable, h);
}
const Z = (a, b, c, d, e) => {
  if (a) {
    var f = a.name;
    if (!f || !"string number boolean null undefined symbol any".split(" ").includes(f)) {
      if (f && !a.application && !a.function) {
        let h = b.includes(f);
        h || (h = Kb.includes(f));
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
}, Kb = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var Lb = (a, b = !1) => {
  var {R:c} = Qa();
  const d = Sa(c);
  c = Ra(c);
  return new zb(b ? [Gb] : [Gb, d, Jb, c], a);
};
var Nb = async() => {
  const {D:a = !1, H:b = !1, B:c, types:d} = {D:la, H:ma, B:ka, types:na};
  await Promise.all(w.map(async e => {
    var f = await J(x, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await L(e), g = M(f.content, e));
    await Mb(g, a, b, c, d);
  }));
};
const Mb = async(a, b = !1, c = !1, d = null, e = null) => {
  const f = [];
  e && await Promise.all(e.split(",").map(async g => {
    g = await H(g);
    const {types:h, imports:k} = Bb(g);
    f.push(h, k);
  }));
  await Promise.all(a.map(async g => {
    var h = await H(g);
    const k = Lb({D:b, H:c}, c);
    f.forEach(l => k.emit("types", l));
    k.file = g;
    k.m = console.error;
    k.lines = h.split("\n");
    k.end(h);
    h = await G(k);
    "-" == d ? console.log(h) : d ? await I(d, h) : await I(g, h);
  }));
};
const Ob = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, Pb = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, Qb = "type opt name quote defaultValue description Default".split(" "), Va = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), Rb = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class Sb extends y {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform(a, b, c) {
    var {type:d, name:e, description:f, i:g} = a;
    a = d && d.startsWith("import") ? Tb(d, e) : Rb(d, e, f, g);
    this.push(a);
    g.forEach(h => {
      var {type:k, name:l, default:m, description:n, optional:p} = h;
      {
        h = ["string", "number", "boolean"].includes(k) ? ` ${k}` : ` type="${k}"`;
        var q = void 0 !== m;
        const t = q ? ` default="${m}"` : "";
        q = p && !q ? " opt" : "";
        const u = " ".repeat(4), P = " ".repeat(6);
        h = `${u}<prop${q}${h} name="${l}"${t}${n ? `>\n${P}${n}\n${u}</prop>` : "/>"}\n`;
      }
      this.push(h);
    });
    g.length && this.push("  </type>\n");
    c();
  }
}
const Tb = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class Ub extends y {
  constructor() {
    super({objectMode:!0});
  }
  _transform(a, b, c) {
    var [, d, e, f, g] = a;
    a = W(Pb, g, Qb).map(h => {
      var k = Object.assign({}, h), l = h.defaultValue;
      const m = h.Default;
      var n = h.opt;
      const p = h.name;
      h = h.type;
      k = (delete k.defaultValue, delete k.Default, delete k.opt, delete k.name, delete k.type, k);
      n = Object.assign({}, k, {name:p, type:h}, l ? {defaultValue:Ob(l)} : {}, m ? {C:Ob(m)} : {}, n ? {optional:!0} : {});
      if (l || m) {
        l ? l !== m && void 0 !== n.C && (l = S(p, m, h), console.error("%s[%s] does not match Default `%s`.", e, l, n.C)) : (l = S(p, m, h), console.error("%s[%s] got from Default.", e, l)), n.default = "defaultValue" in n ? n.defaultValue : n.C, delete n.defaultValue, delete n.C;
      }
      return n;
    });
    this.push({type:d, name:e, description:f, i:a});
    c();
  }
}
async function Vb(a) {
  const b = Ua(), c = new Ub, d = new Sb;
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
;var Wb = async() => {
  const {B:a} = {B:ka};
  await Promise.all(w.map(async b => {
    b = await H(b);
    b = await Vb(b);
    a ? await I(a, b) : console.log(b);
  }));
};
const Xb = /( *) \* @fnType {(.+?)}/gm;
class Yb extends O {
  constructor(a, b) {
    super([{re:Xb, async replacement(c, d, e) {
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
      e = a.find(({h}) => h == f);
      if (!e) {
        return console.error("Type %s in %s not found", f, b), c;
      }
      e = e.i.find(({name:h}) => h == g);
      return e ? e.b ? e.b.function ? lb(e, d) : (console.error("Property %s of type %s in %s is not a function.", g, f, b), c) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", g, f, b), c) : (console.error("Property %s of type %s in %s not found", g, f, b), c);
    }}]);
  }
}
;const Zb = async a => {
  if (!a) {
    return [];
  }
  const b = await J(x, a);
  if (b.isFile()) {
    var c = [a];
  } else {
    b.isDirectory() && (c = await L(a), c = M(c.content, a), c = c.map(d => d.endsWith(".xml")));
  }
  return c;
}, $b = async a => (await Promise.all(a.map(async b => {
  const c = await Cb(b);
  return Object.assign({}, c, {location:b});
}))).reduce((b, c) => {
  var {imports:d, types:e} = c;
  b.push(...d);
  b.push(...e);
  return b;
}, []);
async function ac() {
  var a = {B:oa, types:na};
  a = void 0 === a ? {} : a;
  const {B:b, types:c} = a;
  a = await Zb(c);
  const d = await $b(a);
  await Promise.all(w.map(async e => {
    var f = await J(x, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await L(e), g = M(f.content, e));
    await bc(g, d, b);
  }));
}
const bc = async(a, b, c) => {
  b = void 0 === b ? [] : b;
  c = void 0 === c ? null : c;
  await Promise.all(a.map(async d => {
    var e = await H(d);
    const f = new Yb(b, d);
    f.end(e);
    e = await G(f);
    "-" == c ? console.log(e) : c ? await I(c, e) : await I(d, e);
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
    return pa ? await Wb() : oa ? await ac() : await Nb();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map