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
version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, w = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = fa(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce((e, f) => {
    var g = Object.assign({}, e);
    e = e.m;
    g = (delete g.m, g);
    if (0 == e.length && d) {
      return Object.assign({}, {m:e}, g);
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
        return Object.assign({}, {m:e}, g);
      }
    }
    return void 0 === k ? Object.assign({}, {m:e}, g) : Object.assign({}, {m:e}, g, {[f]:k});
  }, {m:b});
}(ha), x = w.source, ja = w.output, ka = w.closure, la = w.externs, ma = w.types, na = w.template, oa = w.migrate, pa = w.help, qa = w.version;
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
;const {createReadStream:sa, createWriteStream:ta, lstat:y, readdir:ua} = fs;
var va = stream;
const {Transform:z, Writable:wa} = stream;
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
    var e = za(arguments), {stack:f} = Error();
    const g = xa(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = A(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function D(a) {
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
    var b = a || {}, c = Object.assign({}, b);
    const d = void 0 === b.binary ? !1 : b.binary, e = void 0 === b.rs ? null : b.rs;
    b = (delete c.binary, delete c.rs, c);
    const {O:f = D(!0), proxyError:g} = a || {}, h = (k, l) => f(l);
    super(b);
    this.b = [];
    this.M = new Promise((k, l) => {
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
    return this.M;
  }
}
const E = async a => {
  var b = void 0 === b ? {} : b;
  ({f:a} = new Ha(Object.assign({}, {rs:a}, b, {O:D(!0)})));
  return await a;
};
async function G(a) {
  a = sa(a);
  return await E(a);
}
;async function H(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = D(!0), d = ta(a);
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
      Ia(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (Ia(e, 0), k = [b, h]);
    a(...k);
  });
}
;const {join:J} = path;
async function Ja(a, b) {
  b = b.map(async c => {
    const d = J(a, c);
    return {lstat:await I(y, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Ka = a => a.lstat.isDirectory(), La = a => !a.lstat.isDirectory();
async function K(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await I(y, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await I(ua, a);
  b = await Ja(a, b);
  a = b.filter(Ka);
  b = b.filter(La).reduce((c, d) => {
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
function Ma(a) {
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
function Na(a, b) {
  function c() {
    return b.filter(Ma).reduce((d, {re:e, replacement:f}) => {
      if (this.l) {
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
            return this.l ? h : f.call(this, h, ...k);
          } catch (l) {
            M(g, l);
          }
        });
      }
    }, `${a}`);
  }
  c.b = () => {
    c.l = !0;
  };
  return c.call(c);
}
;const Oa = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Pa = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, Qa = () => {
  var a = {P:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
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
  return Ua(a, b);
}
class N extends z {
  constructor(a, b) {
    super(b);
    this.f = (Array.isArray(a) ? a : [a]).filter(Ma);
    this.l = !1;
    this.j = b;
  }
  async replace(a, b) {
    const c = new N(this.f, this.j);
    b && Object.assign(c, b);
    a = await Ta(c, a);
    c.l && (this.l = !0);
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  async reduce(a) {
    return await this.f.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.l) {
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
            if (this.l) {
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
async function Ua(a, b) {
  b instanceof va ? b.pipe(a) : a.end(b);
  return await E(a);
}
;function Va() {
  var a = Wa;
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
}, Xa = ({number:a, L:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", Ya = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, P = a => a ? `/**
${a}
 */
` : "/**\n */\n", R = a => ` * @suppress {nonStandardJsDocs}
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
;const Za = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), $a = new RegExp(`\\s*((?:${Za.source}\\s*)*)`);
const V = (a, b) => U(new RegExp(`<${a}${$a.source}?(?:${/\s*\/>/.source}|${(new RegExp(`>([\\s\\S]+?)?</${a}>`)).source})`, "g"), b, ["a", "v", "v1", "v2", "c"]).map(({a:c = "", c:d = ""}) => {
  c = c.replace(/\/$/, "").trim();
  c = ab(c);
  return {content:d, props:c};
}), ab = a => U(Za, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
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
;function eb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h}, k) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = T(b));
  b = Xa({number:g, L:d, boolean:e, type:h});
  k && (b = b.replace(new RegExp(`([!?])?${k}\\.`, "g"), "$1"));
  a.type = b;
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
const gb = (a, b) => {
  let c = a.lastIndexOf("</arg>"), d = a;
  var e = [];
  -1 != c && (c += 6, e = a.slice(0, c), d = a.slice(c), e = V("arg", e), e = e.map(({content:f, props:g}) => {
    const h = new fb;
    eb(h, f, g, b);
    return h;
  }));
  return {S:d, H:e};
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
;function hb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h, "default":k, closure:l, alias:m, aliases:n, noParams:p, "static":q}) {
  if (!c) {
    throw Error("Property does not have a name.");
  }
  a.name = c;
  b && (a.description = T(b));
  b = Xa({number:g, L:d, boolean:e, type:h});
  p && (a.v = p);
  l && (a.j = l);
  a.type = b;
  void 0 !== k && (a.hasDefault = !0);
  a.hasDefault && (a.default = k);
  if (f || a.hasDefault) {
    a.optional = !0;
  }
  m && (a.u = [m]);
  n && (a.u = n.split(/\s*,\s*/));
  q && (a.f = !0);
}
function ib(a, b = !1) {
  if (b) {
    return a.closureType;
  }
  if (!a.h) {
    return a.type;
  }
  const {function:{args:c, return:d}} = a.b;
  b = c.map(f => W(f)).map((f, g) => {
    const {optional:h} = c[g];
    ({name:g = `arg${g}`} = a.args[g] || {});
    return `${g}${h ? "?" : ""}: ${f}`;
  }).join(", ");
  const e = d ? W(d) : "void";
  return `(${b}) => ${e}`;
}
function jb(a, b = null, c = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = O(a.name, a.default, a.type, b);
  b = a.optional ? `[${b}]` : b;
  const d = `${a.description ? ` ${a.description}` : ""}${a.hasDefault ? ` Default \`${a.default}\`.` : ""}`;
  return `{${ib(a, c)}} ${b}${d}`;
}
function kb(a, b = !1) {
  a = jb(a, null, b);
  return ` * @prop ${lb(a, !0)}`;
}
function mb(a) {
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
function nb(a) {
  if (a.h) {
    const {function:{args:b}} = a.b;
    return ` = function(${b.map((c, d) => {
      ({name:c = `arg${d}`} = a.args[d] || {});
      return c;
    }).join(", ")}) {}`;
  }
  return a.type.startsWith("function(") ? " = function() {}" : "";
}
function ob(a, b = "") {
  let c = [];
  if (a.description) {
    let d = lb(a.description);
    a.default && (d += ` Default \`${a.default}\`.`);
    c.push(d);
  }
  !a.optional && a.h ? (a = mb(a), c.push(...a)) : c.push(` * @type {${a.optional ? Ya(a.closureType) : a.closureType}}`);
  b && (c = c.map(d => `${b}${d}`));
  return c.join("\n");
}
function pb(a, b) {
  const c = Object.assign(Object.create(Object.getPrototypeOf(a)), a);
  c.description = `An alias for \`${a.name}\`.`;
  c.name = b;
  return c;
}
class qb {
  constructor(a = []) {
    this.description = this.name = null;
    this.o = "*";
    this.closureType = "";
    this.j = null;
    this.hasDefault = !1;
    this.default = null;
    this.optional = !1;
    this.u = [];
    this.v = !1;
    this.b = null;
    this.args = a;
    this.f = !1;
  }
  get K() {
    return this.f;
  }
  get type() {
    return this.o;
  }
  set type(a) {
    this.o = a;
    this.closureType = this.j || a;
    if (!this.v) {
      try {
        this.b = db(this.closureType);
      } catch (b) {
        this.b = null;
      }
    }
  }
  get h() {
    return this.b && "function" == this.b.name;
  }
  G(a, b = "", c = !1) {
    a = jb(this, a, c);
    return `${b} * @param ${a}`;
  }
}
const lb = (a, b = !1) => a.split("\n").map((c, d) => {
  if (b && !d) {
    return c;
  }
  d = " *";
  c.length && (d += " ");
  return d + c;
}).join("\n");
function rb(a) {
  var b = a.f();
  b = P(b.join("\n"));
  b += S(a.namespace, a.name, a.R);
  const c = a.properties.reduce((d, e) => {
    d.push(e);
    const f = e.u.map(g => pb(e, g));
    d.push(...f);
    return d;
  }, []).map(d => {
    let e = ob(d);
    e = P(e);
    e += S(`${a.g}${d.K ? "" : ".prototype"}`, d.name);
    return e += nb(d);
  });
  return [b, ...c].join("\n");
}
function sb(a, b) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return (void 0 === b ? 0 : b) ? `${a.s}${c}` : c;
}
function tb(a, b, c, d) {
  b = void 0 === b ? !1 : b;
  c = void 0 === c ? !1 : c;
  d = void 0 === d ? b : d;
  d = ` * @typedef {${(b ? a.closureType : a.type) || a.v()}}${` ${sb(a, d)}${a.h}`}`;
  a = (a.properties ? a.properties.reduce((e, f) => {
    if (f.f) {
      return e;
    }
    e.push(f);
    const g = f.u.map(h => pb(f, h));
    e.push(...g);
    return e;
  }, []) : []).map(e => kb(e, b));
  a = [d, ...a].join("\n");
  b && !c && (a = R(a));
  return a = P(a);
}
function ub(a, b, c, d) {
  b = void 0 === b ? !1 : b;
  c = void 0 === c ? !1 : c;
  d = void 0 === d ? b : d;
  const e = !!a.extends, f = tb(a, b, c, d), g = [];
  if (a.namespace && b) {
    var h = ` * @typedef {${a.g}} ${a.name}${a.h}`;
    b && !c && (h = R(h));
    h = P(h);
    g.push(h);
  } else {
    a.namespace && d && (h = ` * @typedef {${a.g}} ${a.name}${a.h}`, h = P(h), g.push(h));
  }
  e && (a = ` * @typedef {${a.extends} & ${sb(a, d)}} ${d ? a.g : a.name}${a.h}`, b && !c && (a = R(a)), a = P(a), g.push(a));
  g.push(f);
  return g.join("");
}
class X {
  constructor() {
    this.name = "";
    this.description = this.closureType = this.type = null;
    this.import = this.noExpand = this.spread = this.noToc = !1;
    this.link = null;
    this.properties = [];
    this.namespace = null;
    this.isRecord = this.isInterface = this.isConstructor = !1;
    this._args = this.extends = null;
  }
  b(a, b, c, d) {
    var {name:e, type:f, desc:g, noToc:h, spread:k, noExpand:l, "import":m, link:n, closure:p, constructor:q, "extends":t, "interface":u, record:v} = b;
    d = void 0 === d ? null : d;
    if (!e) {
      throw Error("Type does not have a name.");
    }
    this.name = e;
    f && (this.type = f);
    p ? this.closureType = p : this.closureType = this.type;
    g && (this.description = T(g));
    this.noToc = !!h;
    this.spread = !!k;
    this.noExpand = !!l;
    this.import = !!m;
    n && (this.link = n);
    !0 === q && (this.isConstructor = q);
    !0 === u && (this.isInterface = u);
    !0 === v && (this.isRecord = v);
    t && (this.extends = t);
    if (a) {
      b = V("prop", a).map(r => {
        var {content:B, props:C} = r;
        r = new qb;
        hb(r, B, C);
        return r;
      });
      const Gb = V("function", a), Hb = V("fn", a);
      a = V("static", a).map(r => {
        r.isStatic = !0;
        return r;
      });
      a = [...Gb, ...Hb, ...a].map(r => {
        var {content:B, props:C, isStatic:Ib} = r;
        const {S:Jb, H:Z} = gb(B, d);
        var F = Object.assign({}, C);
        r = C.async;
        var Q = void 0 === C["return"] ? "void" : C["return"];
        F = (delete F.async, delete F["return"], F);
        let {args:aa = ""} = C;
        !aa && Z.length && (aa = Z.map(Kb => {
          var {type:Aa, optional:Lb} = Kb;
          return null !== Lb ? `${Aa}=` : Aa;
        }).join(","));
        Q = Q.replace(/\n\s*/g, " ");
        F.type = `function(${aa}): ${r ? `!Promise<${Q}>` : Q}`;
        r = new qb(Z);
        hb(r, Jb, F);
        Ib && (r.f = !0);
        return r;
      });
      b = [...b, ...a];
      const {J:Mb, n:Nb} = b.reduce((r, B) => {
        B.K ? r.J.push(B) : r.n.push(B);
        return r;
      }, {J:[], n:[]});
      this.properties = [...Mb, ...Nb];
    }
    c && (this.namespace = c);
  }
  get I() {
    return this.isConstructor || this.isInterface || this.isRecord;
  }
  v() {
    return "Object";
  }
  get h() {
    return `${this.j ? ` \`\uff20${this.j}\`` : ""}${this.description ? ` ${this.description}` : ""}`;
  }
  get T() {
    const a = this.j;
    if (!a) {
      throw Error("Unknown prototype type (not constructor or interface).");
    }
    return a;
  }
  get j() {
    return this.isConstructor ? "constructor" : this.isInterface ? "interface" : this.isRecord ? "record" : "";
  }
  f(a, b) {
    a = void 0 === a ? "" : a;
    b = void 0 === b ? !0 : b;
    let c = [];
    this.description && c.push(` * ${this.description}`);
    this.extends && c.push(` * @extends {${this.extends}}`);
    this._args && this._args.forEach(d => {
      let {name:e, description:f, optional:g, type:h} = d;
      e.startsWith("...") && (e = e.slice(3), h = `...${h}`);
      c.push(` * @param {${h}${g ? "=" : ""}} ${g ? `[${e}]` : e}${f ? ` ${f}` : ""}`);
    });
    b && c.push(` * @${this.T}`);
    a && (c = c.map(d => `${a}${d}`));
    return c;
  }
  get R() {
    return this._args ? `function(${this._args.map(a => {
      ({name:a} = a);
      return a;
    }).join(", ")}) {}` : null;
  }
  get s() {
    return this.namespace ? `${this.namespace}.` : "";
  }
  get g() {
    return `${this.s}${this.name}`;
  }
  G(a, b, c, d, e) {
    e = void 0 === e ? !1 : e;
    var f = "";
    !0 === d ? f = "?" : !1 === d && (f = "!");
    d = this.description ? ` ${this.description}` : "";
    const g = this.spread ? vb(this.properties) : e ? this.g : this.name;
    b = `${c || ""} * @param {${f}${g}} ${b ? `[${a}]` : a}${d}`;
    f = this.properties && !this.noExpand ? this.properties.map(h => h.G(a, c, e)) : [];
    return [b, ...f].join("\n");
  }
}
const vb = (a, b) => {
  a = void 0 === a ? [] : a;
  b = void 0 === b ? !1 : b;
  a = a.reduce((c, d) => {
    c.push(d);
    const e = d.u.map(f => Object.assign({}, d, {name:f}));
    c.push(...e);
    return c;
  }, []);
  return `{ ${a.map(c => {
    const d = b ? c.closureType : c.type;
    let e = c.name, f = d;
    c.optional && !b ? e = `${c.name}?` : c.optional && b && (f = `(${Ya(d)})`);
    return `${e}: ${f}`;
  }).join(", ")} }`;
};
function wb(a, {name:b, from:c, desc:d, link:e, ns:f}) {
  a.name = b;
  a.from = c;
  a.D = d;
  a.link = e;
  a.s = f || a.from;
}
function xb(a, b = !0) {
  return ` * @typedef {import('${a.from}').${a.name}} ${b ? a.g : a.name}`;
}
class yb {
  constructor() {
    this.from = this.name = this.s = "";
    this.link = this.D = null;
  }
  get g() {
    return `${this.s}.${this.name}`;
  }
}
;function zb(a, b) {
  b = b.reduce((c, d) => Object.assign({}, c, {[d.g]:d}), {});
  a.C = Object.assign({}, a.C, b);
}
class Ab extends N {
  constructor(a, b) {
    b = void 0 === b ? {} : b;
    super(a);
    this.C = {};
    this.on("types", c => {
      zb(this, c);
    });
    this.on("namespace", c => {
      this.b.includes(c) || this.b.push(c);
    });
    this.h = b;
    this.b = [];
    this.i = console.log;
    this.file = null;
    this.lines = [];
  }
  static get Type() {
    return X;
  }
  static get b() {
    return yb;
  }
  get types() {
    return this.C;
  }
}
;class Bb extends X {
  constructor() {
    super();
    this.o = null;
  }
  get I() {
    return !0;
  }
  b(a, b, ...c) {
    var d = Object.assign({}, b);
    b = b["return"];
    d = (delete d.async, delete d["return"], d);
    super.b(a, d, ...c);
    b && (this.o = b);
  }
  get return() {
    return this.o || "void";
  }
  f(a) {
    a = void 0 === a ? "" : a;
    const b = super.f(a, !1);
    this.o && b.push(`${a} * @return {${this.return}}`);
    return b;
  }
  v() {
    return `(${this._args.map(a => {
      var {name:b, type:c, optional:d} = a;
      return `${b}${d ? "?" : ""}: ${c}`;
    }).join(", ")}) => ${this.return}`;
  }
}
;const Db = a => {
  a = V("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:b, props:{namespace:c, ns:d = c}}] = a, e = void 0 == d ? void 0 : d;
  a = V("type", b).reduce((k, l) => {
    var {content:m, props:n} = l, p = Object.assign({}, n);
    l = n.alias;
    const q = n.aliases, t = (delete p.alias, delete p.aliases, p);
    p = new X;
    p.b(m, n, e, void 0);
    k.push(p);
    (l ? [l] : q ? q.split(/, */) : []).forEach(u => {
      const v = new X;
      v.b(m, Object.assign({}, t, {name:u}), e, void 0);
      k.push(v);
    });
    return k;
  }, []);
  var f = V("interface", b).reduce((k, l) => {
    var {content:m, props:n} = l;
    l = Cb(m, n, e);
    l.forEach(p => {
      p.isInterface = !0;
    });
    k.push(...l);
    return k;
  }, []), g = V("constructor", b).reduce((k, l) => {
    var {content:m, props:n} = l;
    l = Cb(m, n, e);
    l.forEach(p => {
      p.isConstructor = !0;
    });
    k.push(...l);
    return k;
  }, []);
  const h = V("method", b).reduce((k, l) => {
    var {content:m, props:n} = l;
    l = Cb(m, n, e, void 0, !0);
    k.push(...l);
    return k;
  }, []);
  a = [...a, ...f, ...g, ...h];
  f = V("import", b).map(k => {
    var {props:l, content:m} = k;
    k = new yb;
    m && (l.desc = T(m));
    wb(k, l);
    return k;
  });
  g = f.map(k => {
    var {name:l, from:m, D:n, link:p, s:q} = k;
    k = new X;
    k.b("", {name:l, type:`import('${m}').${l}`, noToc:!0, import:!0, D:n, link:p}, void 0 == q ? void 0 : q);
    return k;
  });
  return {namespace:d, types:a, imports:f, U:g};
}, Eb = (a, b, c, d, e) => {
  e = (void 0 === e ? 0 : e) ? new Bb : new X;
  const f = a.search(/<(prop|function|fn|static) /);
  let g = "", h = a;
  1 != f && (g = a.slice(0, f), h = a.slice(f));
  ({H:a} = gb(g, d));
  e.b(h, b, c);
  e._args = a;
  return e;
}, Cb = (a, b, c, d, e) => {
  e = void 0 === e ? !1 : e;
  const f = [];
  var g = Object.assign({}, b);
  const h = b.alias, k = b.aliases, l = (delete g.alias, delete g.aliases, g);
  b = Eb(a, b, c, d, e);
  f.push(b);
  (h ? [h] : k ? k.split(/, */) : []).forEach(m => {
    m = Eb(a, Object.assign({}, l, {name:m}), c, d, e);
    m.description = `${m.description}${m.description ? " " : ""}Alias of \`${l.name}\`.`;
    f.push(m);
  });
  return f;
}, Fb = async(a, b) => {
  b = void 0 === b ? [] : b;
  a = await G(a);
  let {namespace:c = null, types:d, imports:e} = Db(a);
  d = d.filter(f => {
    ({g:f} = f);
    return b.includes(f) ? !1 : !0;
  });
  e = e.filter(f => {
    ({g:f} = f);
    return b.includes(f) ? !1 : !0;
  });
  return {types:d, imports:e, namespace:c};
};
const Ob = (a, b, c) => {
  b = b.map(d => ub(d, !0, c));
  a = a.map(d => {
    d = xb(d);
    return P(c ? d : R(d));
  });
  return [...b, ...a].join("");
}, Pb = (a, b, c, d = !1) => {
  a = [...a.map(e => {
    {
      let f;
      e.closureType ? f = ` * @typedef {${e.closureType}}` : e.I || (f = ` * @typedef {${vb(e.properties, !0)}}`);
      f ? (e.description && (f = ` * ${e.description}\n${f}`), f = P(f), e = f += S(e.namespace, e.name)) : e = rb(e);
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
  let {B:n, F:p} = this.h;
  f && (n = !0);
  g && (p = !0);
  try {
    this.i("Detected type marker: %s", c);
    const {types:q, imports:t, namespace:u} = await Fb(d, m);
    this.emit("types", q);
    this.emit("types", t);
    let v;
    n ? v = Ob(t, q, h) : p ? (v = Pb(q, u, this.b, k) + "\n", u && this.emit("namespace", u)) : l ? (u && this.emit("namespace", u), v = Qb(t, q, !0)) : v = Qb(t, q);
    return `/* ${b} ${c} */\n${v}`;
  } catch (q) {
    return this.i("(%s) Could not process typedef-js: %s", c, q.message), process.env.b && console.error(q.stack), a;
  }
}}, Qb = (a, b, c = !1) => {
  b = b.map(d => ub(d, !1, !1, c));
  a = a.map(d => xb(d, c)).map(P).join("");
  b = b.join("");
  return `${a}${b}`.replace(Sb, " * @typedef");
}, Sb = / \*\/\n\/\*\*\n \* @typedef/g;
const Ub = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?.*)*)/gm, replacement:Tb};
function Tb(a, b, c, d, e, f, g) {
  const {B:h} = this.h;
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
    k = db(c);
  } catch (m) {
    return this.i("Error while parsing the type %s", c), this.i(process.env.DEBUG ? m.stack : m.message), f(), a;
  }
  if (!k) {
    return this.i("Could not parse the type %s", c), f(), a;
  }
  const l = Object.values(this.types).map(({name:m, g:n}) => h ? n : m);
  if (!Y(k, l, this.i, c, f)) {
    return a;
  }
  c = Object.values(this.types).find(({name:m, g:n}) => h ? n == k.name : m == k.name);
  return !c || c instanceof Ab.b ? a : c.G(e, d, b, k.nullable, h);
}
const Y = (a, b, c, d, e) => {
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
        Y(h, ...g);
      }) : a.record ? Object.keys(a.record).forEach(h => {
        Y(a.record[h], ...g);
      }) : a.union ? a.union.forEach(h => {
        Y(h, ...g);
      }) : a.function && (Y(a.function.this, ...g), Y(a.function.new, ...g), a.function.args.forEach(h => {
        Y(h, ...g);
      }), Y(a.function.variableArgs, ...g), Y(a.function.return, ...g));
    }
  }
}, Vb = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var Wb = (a, b = !1) => {
  var {P:c} = Qa();
  const d = Sa(c);
  c = Ra(c);
  return new Ab(b ? [Rb] : [Rb, d, Ub, c], a);
};
var Yb = async() => {
  const {B:a = !1, F:b = !1, w:c, types:d} = {B:ka, F:la, w:ja, types:ma};
  await Promise.all(x.map(async e => {
    var f = await I(y, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await K(e), g = L(f.content, e));
    await Xb(g, a, b, c, d);
  }));
};
const Xb = async(a, b = !1, c = !1, d = null, e = null) => {
  const f = [];
  e && await Promise.all(e.split(",").map(async g => {
    g = await G(g);
    const {types:h, imports:k} = Db(g);
    f.push(h, k);
  }));
  await Promise.all(a.map(async g => {
    var h = await G(g);
    const k = Wb({B:b, F:c}, c);
    f.forEach(l => k.emit("types", l));
    k.file = g;
    k.i = console.error;
    k.lines = h.split("\n");
    k.end(h);
    h = await E(k);
    "-" == d ? console.log(h) : d ? await H(d, h) : await H(g, h);
  }));
};
const Zb = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, $b = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, ac = "type opt name quote defaultValue description Default".split(" "), Wa = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), bc = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class cc extends z {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform(a, b, c) {
    var {type:d, name:e, description:f, properties:g} = a;
    a = d && d.startsWith("import") ? dc(d, e) : bc(d, e, f, g);
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
const dc = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class ec extends z {
  constructor() {
    super({objectMode:!0});
  }
  _transform(a, b, c) {
    var [, d, e, f, g] = a;
    a = U($b, g, ac).map(h => {
      var k = Object.assign({}, h), l = h.defaultValue;
      const m = h.Default;
      var n = h.opt;
      const p = h.name;
      h = h.type;
      k = (delete k.defaultValue, delete k.Default, delete k.opt, delete k.name, delete k.type, k);
      n = Object.assign({}, k, {name:p, type:h}, l ? {defaultValue:Zb(l)} : {}, m ? {A:Zb(m)} : {}, n ? {optional:!0} : {});
      if (l || m) {
        l ? l !== m && void 0 !== n.A && (l = O(p, m, h), console.error("%s[%s] does not match Default `%s`.", e, l, n.A)) : (l = O(p, m, h), console.error("%s[%s] got from Default.", e, l)), n.default = "defaultValue" in n ? n.defaultValue : n.A, delete n.defaultValue, delete n.A;
      }
      return n;
    });
    this.push({type:d, name:e, description:f, properties:a});
    c();
  }
}
async function fc(a) {
  const b = Va(), c = new ec, d = new cc;
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
  ${(await E(d)).trim()}
</types>`;
}
;var gc = async() => {
  const {w:a} = {w:ja};
  await Promise.all(x.map(async b => {
    b = await G(b);
    b = await fc(b);
    a ? await H(a, b) : console.log(b);
  }));
};
const hc = /( *) \* @fnType {(.+?)}/gm;
class ic extends N {
  constructor(a, b) {
    super([{re:hc, async replacement(c, d, e) {
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
        return e.f(d).join("\n");
      }
      e = e.properties.find(({name:h}) => h == g);
      return e ? e.b ? ob(e, d) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", g, f, b), c) : (console.error("Property %s of type %s in %s not found", g, f, b), c);
    }}]);
  }
}
;const jc = async a => {
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
}, kc = async a => (await Promise.all(a.map(async b => {
  const c = await Fb(b);
  return Object.assign({}, c, {location:b});
}))).reduce((b, c) => {
  var {imports:d, types:e} = c;
  b.push(...d);
  b.push(...e);
  return b;
}, []);
async function lc() {
  var a = {w:na, types:ma};
  a = void 0 === a ? {} : a;
  const {w:b, types:c} = a;
  a = await jc(c);
  const d = await kc(a);
  await Promise.all(x.map(async e => {
    var f = await I(y, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await K(e), g = L(f.content, e));
    await mc(g, d, b);
  }));
}
const mc = async(a, b, c) => {
  b = void 0 === b ? [] : b;
  c = void 0 === c ? null : c;
  await Promise.all(a.map(async d => {
    var e = await G(d);
    const f = new ic(b, d);
    f.end(e);
    e = await E(f);
    "-" == c ? console.log(e) : c ? await H(c, e) : await H(d, e);
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
    return oa ? await gc() : na ? await lc() : await Yb();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map