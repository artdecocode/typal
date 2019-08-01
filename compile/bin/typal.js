#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');
const path = require('path');             
var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
}, ca = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
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
    b != d && null != b && ba(c, a, {configurable:!0, writable:!0, value:b});
  }
}
da("String.prototype.trimRight", function(a) {
  function b() {
    return this.replace(/[\s\xa0]+$/, "");
  }
  return a || b;
});
const ea = (a, b, c, d, e) => {
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
const ha = {source:{description:"The path to the source file or directory with files to embed types into. Can specify multiple values, e.g., `typal types/index.js types/vendor.js`.", command:!0, multiple:!0}, output:{description:"The destination where to save output.\nIf not passed, the file will be overwritten.\nIf `-` is passed, prints to stdout.", short:"o"}, closure:{description:"Whether to generate types in _Closure_ mode.", boolean:!0, short:"c"}, externs:{description:"Whether to generate externs for _GCC_.", 
boolean:!0, short:"e"}, types:{description:"Comma-separated location of files to read types from.", short:"t"}, template:{description:"Scans the input file for `@type` comment in functions' JSDoc, and inserts the annotations from types' files.", short:"T"}, migrate:{description:"Extracts types from JavaScript source code and saves them\ninto the types.xml file specified in the output option.", boolean:!0, short:"m"}, help:{description:"Print the help information and exit.", boolean:!0, short:"h"}, 
version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, v = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = fa(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce((e, f) => {
    var g = Object.assign({}, e);
    e = e.v;
    g = (delete g.v, g);
    if (0 == e.length && d) {
      return Object.assign({}, {v:e}, g);
    }
    const h = a[f];
    let k;
    if ("string" == typeof h) {
      ({value:k, argv:e} = ea(e, f, h));
    } else {
      try {
        const {short:l, boolean:m, number:n, command:p, multiple:q} = h;
        p && q && c.length ? (k = c, d = !0) : p && c.length ? (k = c[0], d = !0) : {value:k, argv:e} = ea(e, f, l, m, n);
      } catch (l) {
        return Object.assign({}, {v:e}, g);
      }
    }
    return void 0 === k ? Object.assign({}, {v:e}, g) : Object.assign({}, {v:e}, g, {[f]:k});
  }, {v:b});
}(ha), w = v.source, ja = v.output, ka = v.closure, la = v.externs, ma = v.types, na = v.template, oa = v.migrate, pa = v.help, qa = v.version;
function ra(a = {usage:{}}) {
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
;const {createReadStream:sa, createWriteStream:ta, lstat:x, readdir:ua} = fs;
var va = stream;
const {Transform:y, Writable:wa} = stream;
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
const Ca = /\s+at.*(?:\(|\s)(.*)\)?/, Da = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ea = Ba(), A = a => {
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
    e = A(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function C(a) {
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
class Ha extends wa {
  constructor(a) {
    var b = a || {}, c = Object.assign({}, b);
    const d = void 0 === b.binary ? !1 : b.binary, e = void 0 === b.rs ? null : b.rs;
    b = (delete c.binary, delete c.rs, c);
    const {S:f = C(!0), proxyError:g} = a || {}, h = (k, l) => f(l);
    super(b);
    this.b = [];
    this.P = new Promise((k, l) => {
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
      e && Ga(this, e).pipe(this);
    });
  }
  _write(a, b, c) {
    this.b.push(a);
    c();
  }
  get f() {
    return this.P;
  }
}
const D = async a => {
  var b = void 0 === b ? {} : b;
  ({f:a} = new Ha(Object.assign({}, {rs:a}, b, {S:C(!0)})));
  return await a;
};
async function E(a) {
  a = sa(a);
  return await D(a);
}
;async function F(a, b) {
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
;const {join:H} = path;
async function Ja(a, b) {
  b = b.map(async c => {
    const d = H(a, c);
    return {lstat:await G(x, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Ka = a => a.lstat.isDirectory(), La = a => !a.lstat.isDirectory();
async function I(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await G(x, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await G(ua, a);
  b = await Ja(a, b);
  a = b.filter(Ka);
  b = b.filter(La).reduce((c, d) => {
    var e = d.lstat.isDirectory() ? "Directory" : d.lstat.isFile() ? "File" : d.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return Object.assign({}, c, {[d.relativePath]:{type:e}});
  }, {});
  a = await a.reduce(async(c, d) => {
    var {path:e, relativePath:f} = d;
    c = await c;
    d = await I(e);
    return Object.assign({}, c, {[f]:d});
  }, {});
  return {content:Object.assign({}, b, a), type:"Directory"};
}
const J = (a, b) => {
  let c = [], d = [];
  Object.keys(a).forEach(f => {
    const {type:g} = a[f];
    "File" == g ? c.push(H(b, f)) : "Directory" == g && d.push(f);
  });
  const e = d.reduce((f, g) => {
    const {content:h} = a[g];
    g = J(h, H(b, g));
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
function Na(a, b) {
  function c() {
    return b.filter(Ma).reduce((d, {re:e, replacement:f}) => {
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
            K(g, l);
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
;const Oa = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Pa = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, Qa = () => {
  var a = {T:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
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
  b instanceof va ? b.pipe(a) : a.end(b);
  return await D(a);
}
class L extends y {
  constructor(a, b) {
    super(b);
    this.f = (Array.isArray(a) ? a : [a]).filter(Ma);
    this.s = !1;
    this.o = b;
  }
  async replace(a, b) {
    const c = new L(this.f, this.o);
    b && Object.assign(c, b);
    a = await Ta(c, a);
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
            K(f, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            K(f, h);
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
}, Wa = ({number:a, O:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", Xa = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, Ya = a => `/**
${a}
 */
`, P = a => ` * @suppress {nonStandardJsDocs}
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
;const Za = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), $a = new RegExp(`\\s*((?:${Za.source}\\s*)*)`);
const T = (a, b) => S(new RegExp(`<${a}${$a.source}?(?:${/\s*\/>/.source}|${(new RegExp(`>([\\s\\S]+?)?</${a}>`)).source})`, "g"), b, ["a", "v", "v1", "v2", "c"]).map(({a:c = "", c:d = ""}) => {
  c = c.replace(/\/$/, "").trim();
  c = ab(c);
  return {content:d, u:c};
}), ab = a => S(Za, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
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
  b && (a.description = R(b));
  a.type = Wa({number:g, O:d, boolean:e, type:h});
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
const gb = a => {
  let b = a.lastIndexOf("</arg>"), c = a;
  var d = [];
  -1 != b && (b += 6, d = a.slice(0, b), c = a.slice(b), d = T("arg", d), d = d.map(({content:e, u:f}) => {
    const g = new fb;
    eb(g, e, f);
    return g;
  }));
  return {V:c, K:d};
};
function hb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h, "default":k, closure:l, alias:m, aliases:n, noParams:p}) {
  if (!c) {
    throw Error("Property does not have a name.");
  }
  a.name = c;
  b && (a.description = R(b));
  a.type = Wa({number:g, O:d, boolean:e, type:h});
  l ? a.g = l : a.g = a.type;
  void 0 !== k && (a.f = !0);
  a.f && (a.default = k);
  if (f || a.f) {
    a.optional = !0;
  }
  m && (a.A = [m]);
  n && (a.A = n.split(/\s*,\s*/));
  p && (a.l = p);
  if (!a.optional && !a.l) {
    try {
      a.b = db(a.g);
    } catch (q) {
    }
  }
}
function ib(a, b = null, c = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = O(a.name, a.default, a.type, b);
  return `{${c ? a.g : a.type}} ${a.optional ? `[${b}]` : b}${`${a.description ? ` ${a.description}` : ""}${a.f ? ` Default \`${a.default}\`.` : ""}`}`;
}
function jb(a, b = !1) {
  a = ib(a, null, b);
  return ` * @prop ${kb(a, !0)}`;
}
function lb(a) {
  const b = [], {function:{args:c, return:d}} = a.b;
  c.map(U).forEach((e, f) => {
    const {optional:g} = c[f], {name:h = `arg${f}`, description:k} = a.args[f] || {};
    b.push(` * @param {${e}${g ? "=" : ""}} ${g ? `[${h}]` : h}${k ? ` ${k}` : ""}`);
  });
  if ("void" != d.name) {
    const e = U(d);
    b.push(` * @return {${e}}`);
  }
  return b;
}
function mb(a, b = "") {
  const c = [];
  if (a.description) {
    let d = kb(a.description);
    a.default && (d += ` Default \`${a.default}\`.`);
    c.push(d);
  }
  a.b && "function" == a.b.name ? (a = lb(a), c.push(...a)) : c.push(` * @type {${a.optional ? Xa(a.g) : a.g}}`);
  return c.map(d => `${b}${d}`).join("\n");
}
function nb(a, b) {
  const c = Object.assign(Object.create(Object.getPrototypeOf(a)), a);
  c.description = `An alias for \`${a.name}\`.`;
  c.name = b;
  return c;
}
class ob {
  constructor(a = []) {
    this.description = this.name = null;
    this.type = "*";
    this.g = "";
    this.f = !1;
    this.default = null;
    this.optional = !1;
    this.A = [];
    this.l = !1;
    this.b = null;
    this.args = a;
    this.o = !1;
  }
  J(a, b = "", c = !1) {
    a = ib(this, a, c);
    return `${b} * @param ${a}`;
  }
}
const kb = (a, b = !1) => a.split("\n").map((c, d) => {
  if (b && !d) {
    return c;
  }
  d = " *";
  c.length && (d += " ");
  return d + c;
}).join("\n"), U = a => {
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
};
function V(a, b, c, d) {
  var {name:e, type:f, desc:g, noToc:h, spread:k, noExpand:l, "import":m, link:n, closure:p, constructor:q, "extends":t, "interface":u, record:M} = c;
  if (!e) {
    throw Error("Type does not have a name.");
  }
  a.name = e;
  f && (a.type = f);
  p ? a.g = p : a.g = a.type;
  g && (a.description = R(g));
  a.N = !!h;
  a.M = !!k;
  a.L = !!l;
  a.import = !!m;
  n && (a.link = n);
  !0 === q && (a.isConstructor = q);
  !0 === u && (a.f = u);
  !0 === M && (a.I = M);
  t && (a.extends = t);
  if (b) {
    c = T("prop", b).map(r => {
      var {content:Y, u:z} = r;
      r = new ob;
      hb(r, Y, z);
      return r;
    });
    const zb = T("function", b), Ab = T("fn", b);
    b = T("static", b).map(r => {
      r.isStatic = !0;
      return r;
    });
    b = [...zb, ...Ab, ...b].map(r => {
      var {content:Y, u:z, isStatic:Bb} = r;
      const {V:Cb, K:Z} = gb(Y);
      var B = Object.assign({}, z);
      r = z.async;
      var N = void 0 === z["return"] ? "void" : z["return"];
      B = (delete B.async, delete B["return"], B);
      let {args:aa = ""} = z;
      !aa && Z.length && (aa = Z.map(Db => {
        var {type:xa, optional:Eb} = Db;
        return null !== Eb ? `${xa}=` : xa;
      }).join(","));
      N = N.replace(/\n\s*/g, " ");
      B.type = `function(${aa}): ${r ? `!Promise<${N}>` : N}`;
      r = new ob(Z);
      hb(r, Cb, B);
      Bb && (r.o = !0);
      return r;
    });
    a.i = [...c, ...b];
  }
  d && (a.j = d);
}
function pb(a) {
  const b = [];
  a.description && b.push(` * ${a.description}`);
  a.extends && b.push(` * @extends {${a.extends}}`);
  a.b && a.b.forEach(e => {
    const {name:f, description:g, optional:h, type:k} = e;
    b.push(` * @param {${k}${h ? "=" : ""}} ${h ? `[${f}]` : f}${g ? ` ${g}` : ""}`);
  });
  var c = a.b ? `function(${a.b.map(e => {
    ({name:e} = e);
    return e;
  })}) {}` : null;
  b.push(` * @${a.U}`);
  let d = `/**
${b.join("\n")}
 */
`;
  d += Q(a.j, a.name, c);
  c = a.i.reduce((e, f) => {
    e.push(f);
    const g = f.A.map(h => nb(f, h));
    e.push(...g);
    return e;
  }, []).map(e => {
    let f = mb(e);
    f = `/**
${f}
 */
` + Q(`${a.h}${e.o ? "" : ".prototype"}`, e.name);
    if (e.b && "function" == e.b.name) {
      var {function:{args:g}} = e.b;
      g = g.map((h, k) => {
        ({name:h = `arg${k}`} = e.args[k] || {});
        return h;
      });
      f += ` = function(${g.join(", ")}) {}`;
    } else {
      e.type.startsWith("function(") && (f += " = function() {}");
    }
    return f;
  });
  return [d, ...c].join("\n");
}
function qb(a, b) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return b ? `${a.w}${c}` : c;
}
function rb(a, b, c) {
  var d = ` * @typedef {${(b ? a.g : a.type) || "Object"}}${` ${qb(a, b)}${a.o}`}`;
  a = (a.i ? a.i.reduce((e, f) => {
    e.push(f);
    const g = f.A.map(h => nb(f, h));
    e.push(...g);
    return e;
  }, []) : []).map(e => jb(e, b));
  d = [d, ...a].join("\n");
  b && !c && (d = P(d));
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
    let g = ` * @typedef {${a.h}} ${a.name}${a.o}`;
    b && !c && (g = P(g));
    g = `/**
${g}
 */
`;
    f.push(g);
  }
  d && (a = ` * @typedef {${a.extends} & ${qb(a, b)}} ${b ? a.h : a.name}${a.o}`, b && !c && (a = P(a)), a = `/**
${a}
 */
`, f.push(a));
  f.push(e);
  return f.join("");
}
class W {
  constructor() {
    this.name = "";
    this.link = this.L = this.import = this.M = this.N = this.description = this.g = this.type = null;
    this.i = [];
    this.j = null;
    this.I = this.f = this.isConstructor = !1;
    this.b = this.extends = null;
  }
  get W() {
    return this.isConstructor || this.f || this.I;
  }
  get o() {
    return `${this.l ? ` \`\uff20${this.l}\`` : ""}${this.description ? ` ${this.description}` : ""}`;
  }
  get U() {
    const a = this.l;
    if (!a) {
      throw Error("Unknown prototype type (not constructor or interface).");
    }
    return a;
  }
  get l() {
    return this.isConstructor ? "constructor" : this.f ? "interface" : this.I ? "record" : "";
  }
  get w() {
    return this.j ? `${this.j}.` : "";
  }
  get h() {
    return `${this.w}${this.name}`;
  }
  J(a, b, c, d, e) {
    e = void 0 === e ? !1 : e;
    var f = "";
    !0 === d ? f = "?" : !1 === d && (f = "!");
    d = this.description ? ` ${this.description}` : "";
    const g = this.M ? tb(this.i) : e ? this.h : this.name;
    b = `${c || ""} * @param {${f}${g}} ${b ? `[${a}]` : a}${d}`;
    f = this.i && !this.L ? this.i.map(h => h.J(a, c, e)) : [];
    return [b, ...f].join("\n");
  }
}
const tb = (a, b) => {
  a = void 0 === a ? [] : a;
  b = void 0 === b ? !1 : b;
  a = a.reduce((c, d) => {
    c.push(d);
    const e = d.A.map(f => Object.assign({}, d, {name:f}));
    c.push(...e);
    return c;
  }, []);
  return `{ ${a.map(c => {
    const d = b ? c.g : c.type;
    let e = c.name, f = d;
    c.optional && !b ? e = `${c.name}?` : c.optional && b && (f = `(${Xa(d)})`);
    return `${e}: ${f}`;
  }).join(", ")} }`;
};
function ub(a, {name:b, from:c, desc:d, link:e, ns:f}) {
  a.name = b;
  a.from = c;
  a.G = d;
  a.link = e;
  a.w = f || a.from;
}
function vb(a, b = !0) {
  return ` * @typedef {import('${a.from}').${a.name}} ${b ? a.h : a.name}`;
}
class wb {
  constructor() {
    this.from = this.name = this.w = "";
    this.link = this.G = null;
  }
  get h() {
    return `${this.w}.${this.name}`;
  }
}
;function xb(a, b) {
  b = b.reduce((c, d) => Object.assign({}, c, {[d.h]:d}), {});
  a.F = Object.assign({}, a.F, b);
}
class yb extends L {
  constructor(a, b) {
    b = void 0 === b ? {} : b;
    super(a);
    this.F = {};
    this.on("types", c => {
      xb(this, c);
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
    return W;
  }
  static get b() {
    return wb;
  }
  get types() {
    return this.F;
  }
}
;const Fb = a => {
  a = T("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:b, u:{namespace:c, ns:d = c}}] = a, e = void 0 == d ? void 0 : d;
  a = T("type", b).map(({content:h, u:k}) => {
    const l = new W;
    V(l, h, k, e);
    return l;
  });
  var f = T("interface", b).map(({content:h, u:k}) => {
    const l = new W, m = h.search(/<(prop|function|fn|static) /);
    let n = "", p = h;
    1 != m && (n = h.slice(0, m), p = h.slice(m));
    ({K:h} = gb(n));
    V(l, p, k, e);
    l.b = h;
    l.f = !0;
    return l;
  });
  a = [...a, ...f];
  f = T("import", b).map(({u:h, content:k}) => {
    const l = new wb;
    k && (h.desc = R(k));
    ub(l, h);
    return l;
  });
  const g = f.map(({name:h, from:k, G:l, link:m, w:n}) => {
    const p = new W;
    V(p, "", {name:h, type:`import('${k}').${h}`, N:!0, import:!0, G:l, link:m}, void 0 == n ? void 0 : n);
    return p;
  });
  return {j:d, types:a, imports:f, X:g};
}, Gb = async(a, b = []) => {
  a = await E(a);
  let {j:c = null, types:d, imports:e} = Fb(a);
  d = d.filter(({h:f}) => b.includes(f) ? !1 : !0);
  e = e.filter(({h:f}) => b.includes(f) ? !1 : !0);
  return {types:d, imports:e, j:c};
};
const Hb = (a, b, c) => {
  b = b.map(d => sb(d, !0, c));
  a = a.map(d => {
    d = vb(d);
    return `/**
${c ? d : P(d)}
 */
`;
  });
  return [...b, ...a].join("");
}, Ib = (a, b, c, d = !1) => {
  a = [...a.map(e => {
    {
      let f;
      e.g ? f = ` * @typedef {${e.g}}` : e.W || (f = ` * @typedef {${tb(e.i, !0)}}`);
      f ? (e.description && (f = ` * ${e.description}\n${f}`), f = `/**
${f}
 */
`, e = f += Q(e.j, e.name)) : e = pb(e);
    }
    return e;
  })].join("\n");
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const Kb = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, c) {
  const [d, ...e] = c.split(/\s+/), f = e.includes("closure"), g = e.includes("externs"), h = e.includes("noSuppress"), k = e.includes("skipNsDecl");
  let l = e.find(p => p.startsWith("ignore:"));
  l = l ? l.replace("ignore:", "").split(",") : [];
  let {D:m, H:n} = this.l;
  f && (m = !0);
  g && (n = !0);
  try {
    this.m("Detected type marker: %s", c);
    const {types:p, imports:q, j:t} = await Gb(d, l);
    this.emit("types", p);
    this.emit("types", q);
    let u;
    m ? u = Hb(q, p, h) : n ? (u = Ib(p, t, this.b, k) + "\n", t && this.emit("namespace", t)) : u = Jb(q, p);
    return `/* ${b} ${c} */\n${u}`;
  } catch (p) {
    return this.m("(%s) Could not process typedef-js: %s", c, p.message), process.env.b && console.error(p.stack), a;
  }
}}, Jb = (a, b) => {
  b = b.map(c => sb(c));
  a = a.map(c => vb(c, !1)).map(Ya).join("");
  b = b.join("");
  return `${a}${b}`.replace(Lb, " * @typedef");
}, Lb = / \*\/\n\/\*\*\n \* @typedef/g;
const Nb = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?.*)*)/gm, replacement:Mb};
function Mb(a, b, c, d, e, f, g) {
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
        m = {line:m, R:b.length + 11};
      }
      const {line:n, R:p} = m;
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
  if (!X(k, l, this.m, c, f)) {
    return a;
  }
  c = Object.values(this.types).find(({name:m, h:n}) => h ? n == k.name : m == k.name);
  return !c || c instanceof yb.b ? a : c.J(e, d, b, k.nullable, h);
}
const X = (a, b, c, d, e) => {
  if (a) {
    var f = a.name;
    if (!f || !"string number boolean null undefined symbol any".split(" ").includes(f)) {
      if (f && !a.application && !a.function) {
        let h = b.includes(f);
        h || (h = Ob.includes(f));
        if (h) {
          return !0;
        }
        c("Type %s%s was not found.", f, d != f ? ` in ${d}` : "");
        e();
      }
      var g = [b, c, d, e];
      a.application ? a.application.forEach(h => {
        X(h, ...g);
      }) : a.record ? Object.keys(a.record).forEach(h => {
        X(a.record[h], ...g);
      }) : a.union ? a.union.forEach(h => {
        X(h, ...g);
      }) : a.function && (X(a.function.this, ...g), X(a.function.new, ...g), a.function.args.forEach(h => {
        X(h, ...g);
      }), X(a.function.variableArgs, ...g), X(a.function.return, ...g));
    }
  }
}, Ob = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var Pb = (a, b = !1) => {
  var {T:c} = Qa();
  const d = Sa(c);
  c = Ra(c);
  return new yb(b ? [Kb] : [Kb, d, Nb, c], a);
};
var Rb = async() => {
  const {D:a = !1, H:b = !1, B:c, types:d} = {D:ka, H:la, B:ja, types:ma};
  await Promise.all(w.map(async e => {
    var f = await G(x, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await I(e), g = J(f.content, e));
    await Qb(g, a, b, c, d);
  }));
};
const Qb = async(a, b = !1, c = !1, d = null, e = null) => {
  const f = [];
  e && await Promise.all(e.split(",").map(async g => {
    g = await E(g);
    const {types:h, imports:k} = Fb(g);
    f.push(h, k);
  }));
  await Promise.all(a.map(async g => {
    var h = await E(g);
    const k = Pb({D:b, H:c}, c);
    f.forEach(l => k.emit("types", l));
    k.file = g;
    k.m = console.error;
    k.lines = h.split("\n");
    k.end(h);
    h = await D(k);
    "-" == d ? console.log(h) : d ? await F(d, h) : await F(g, h);
  }));
};
const Sb = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, Tb = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, Ub = "type opt name quote defaultValue description Default".split(" "), Va = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), Vb = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class Wb extends y {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform(a, b, c) {
    var {type:d, name:e, description:f, i:g} = a;
    a = d && d.startsWith("import") ? Xb(d, e) : Vb(d, e, f, g);
    this.push(a);
    g.forEach(h => {
      var {type:k, name:l, default:m, description:n, optional:p} = h;
      {
        h = ["string", "number", "boolean"].includes(k) ? ` ${k}` : ` type="${k}"`;
        var q = void 0 !== m;
        const t = q ? ` default="${m}"` : "";
        q = p && !q ? " opt" : "";
        const u = " ".repeat(4), M = " ".repeat(6);
        h = `${u}<prop${q}${h} name="${l}"${t}${n ? `>\n${M}${n}\n${u}</prop>` : "/>"}\n`;
      }
      this.push(h);
    });
    g.length && this.push("  </type>\n");
    c();
  }
}
const Xb = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class Yb extends y {
  constructor() {
    super({objectMode:!0});
  }
  _transform(a, b, c) {
    var [, d, e, f, g] = a;
    a = S(Tb, g, Ub).map(h => {
      var k = Object.assign({}, h), l = h.defaultValue;
      const m = h.Default;
      var n = h.opt;
      const p = h.name;
      h = h.type;
      k = (delete k.defaultValue, delete k.Default, delete k.opt, delete k.name, delete k.type, k);
      n = Object.assign({}, k, {name:p, type:h}, l ? {defaultValue:Sb(l)} : {}, m ? {C:Sb(m)} : {}, n ? {optional:!0} : {});
      if (l || m) {
        l ? l !== m && void 0 !== n.C && (l = O(p, m, h), console.error("%s[%s] does not match Default `%s`.", e, l, n.C)) : (l = O(p, m, h), console.error("%s[%s] got from Default.", e, l)), n.default = "defaultValue" in n ? n.defaultValue : n.C, delete n.defaultValue, delete n.C;
      }
      return n;
    });
    this.push({type:d, name:e, description:f, i:a});
    c();
  }
}
async function Zb(a) {
  const b = Ua(), c = new Yb, d = new Wb;
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
;var $b = async() => {
  const {B:a} = {B:ja};
  await Promise.all(w.map(async b => {
    b = await E(b);
    b = await Zb(b);
    a ? await F(a, b) : console.log(b);
  }));
};
const ac = /( *) \* @fnType {(.+?)}/gm;
class bc extends L {
  constructor(a, b) {
    super([{re:ac, async replacement(c, d, e) {
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
      return e ? e.b ? e.b.function ? mb(e, d) : (console.error("Property %s of type %s in %s is not a function.", g, f, b), c) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", g, f, b), c) : (console.error("Property %s of type %s in %s not found", g, f, b), c);
    }}]);
  }
}
;const cc = async a => {
  if (!a) {
    return [];
  }
  const b = await G(x, a);
  if (b.isFile()) {
    var c = [a];
  } else {
    b.isDirectory() && (c = await I(a), c = J(c.content, a), c = c.filter(d => d.endsWith(".xml")));
  }
  return c;
}, dc = async a => (await Promise.all(a.map(async b => {
  const c = await Gb(b);
  return Object.assign({}, c, {location:b});
}))).reduce((b, c) => {
  var {imports:d, types:e} = c;
  b.push(...d);
  b.push(...e);
  return b;
}, []);
async function ec() {
  var a = {B:na, types:ma};
  a = void 0 === a ? {} : a;
  const {B:b, types:c} = a;
  a = await cc(c);
  const d = await dc(a);
  await Promise.all(w.map(async e => {
    var f = await G(x, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await I(e), g = J(f.content, e));
    await fc(g, d, b);
  }));
}
const fc = async(a, b, c) => {
  b = void 0 === b ? [] : b;
  c = void 0 === c ? null : c;
  await Promise.all(a.map(async d => {
    var e = await E(d);
    const f = new bc(b, d);
    f.end(e);
    e = await D(f);
    "-" == c ? console.log(e) : c ? await F(c, e) : await F(d, e);
  }));
};
if (pa) {
  const a = ia();
  console.log(ra({usage:a, description:"Embeds and maintains Closure-compatible types JSDoc in\nJavaScript source code from an external types.xml file.", line:"typal source [--closure|externs] [--migrate] [-o output] [-hv]", example:"typal src/index.js -c"}));
  process.exit();
} else {
  qa && (console.log(require("../../package.json").version), process.exit());
}
(async() => {
  try {
    return oa ? await $b() : na ? await ec() : await Rb();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map