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
const v = (a, b, c, d, e) => {
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
}, da = a => {
  const b = [];
  for (let c = 0; c < a.length; c++) {
    const d = a[c];
    if (d.startsWith("-")) {
      break;
    }
    b.push(d);
  }
  return b;
}, ea = () => {
  var a = x;
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
const x = {source:{description:"The path to the source file or directory with files to embed types into. Can specify multiple values, e.g., `typal types/index.js types/vendor.js`.", command:!0, multiple:!0}, output:{description:"The destination where to save output.\nIf not passed, the file will be overwritten.\nIf `-` is passed, prints to stdout.", short:"o"}, closure:{description:"Whether to generate types in _Closure_ mode.", boolean:!0, short:"c"}, externs:{description:"Whether to generate externs for _GCC_.", 
boolean:!0, short:"e"}, types:{description:"Comma-separated location of files to read types from.", short:"t"}, migrate:{description:"Extracts types from JavaScript source code and saves them\ninto the types.xml file specified in the output option.", boolean:!0, short:"m"}, help:{description:"Print the help information and exit.", boolean:!0, short:"h"}, version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, y = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = da(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce((e, f) => {
    var g = Object.assign({}, e);
    e = e.o;
    g = (delete g.o, g);
    if (0 == e.length && d) {
      return Object.assign({}, {o:e}, g);
    }
    const h = a[f];
    let k;
    if ("string" == typeof h) {
      ({value:k, argv:e} = v(e, f, h));
    } else {
      try {
        const {short:l, boolean:m, number:n, command:p, multiple:q} = h;
        p && q && c.length ? (k = c, d = !0) : p && c.length ? (k = c[0], d = !0) : {value:k, argv:e} = v(e, f, l, m, n);
      } catch (l) {
        return Object.assign({}, {o:e}, g);
      }
    }
    return void 0 === k ? Object.assign({}, {o:e}, g) : Object.assign({}, {o:e}, g, {[f]:k});
  }, {o:b});
}(x), B = y.source, D = y.output, fa = y.closure, ha = y.externs, ia = y.types, ja = y.migrate, ka = y.help, la = y.version;
function ma(a = {usage:{}}) {
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
;const {createReadStream:na, createWriteStream:oa, lstat:E, readdir:pa} = fs;
var qa = stream;
const {Transform:F, Writable:ra} = stream;
const G = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, sa = (a, b = !1) => G(a, 2 + (b ? 1 : 0)), ta = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:ua} = os;
const va = /\s+at.*(?:\(|\s)(.*)\)?/, wa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, xa = ua(), H = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(wa.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(va);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(va, (g, h) => g.replace(h, h.replace(xa, "~"))) : f).join("\n");
};
function ya(a, b, c = !1) {
  return function(d) {
    var e = ta(arguments), {stack:f} = Error();
    const g = G(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = H(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function I(a) {
  var {stack:b} = Error();
  const c = ta(arguments);
  b = sa(b, a);
  return ya(c, b, a);
}
;const za = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Aa extends ra {
  constructor(a) {
    var b = a || {}, c = Object.assign({}, b);
    const d = void 0 === b.binary ? !1 : b.binary, e = void 0 === b.rs ? null : b.rs;
    b = (delete c.binary, delete c.rs, c);
    const {P:f = I(!0), proxyError:g} = a || {}, h = (k, l) => f(l);
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
          const n = H(m.stack);
          m.stack = n;
          g && h`${m}`;
        }
        l(m);
      });
      e && za(this, e).pipe(this);
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
const K = async a => {
  var b = void 0 === b ? {} : b;
  ({g:a} = new Aa(Object.assign({}, {rs:a}, b, {P:I(!0)})));
  return await a;
};
async function L(a) {
  a = na(a);
  return await K(a);
}
;async function M(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = I(!0), d = oa(a);
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
    }).on("close", e).end(b);
  });
}
;function Ba(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function N(a, b, c) {
  const d = I(!0);
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
      Ba(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (Ba(e, 0), k = [b, h]);
    a(...k);
  });
}
;const {join:O} = path;
async function Ca(a, b) {
  b = b.map(async c => {
    const d = O(a, c);
    return {lstat:await N(E, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Da = a => a.lstat.isDirectory(), Ea = a => !a.lstat.isDirectory();
async function Fa(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  if (!(await N(E, a)).isDirectory()) {
    throw a = Error("Path is not a directory"), a.code = "ENOTDIR", a;
  }
  var b = await N(pa, a);
  b = await Ca(a, b);
  a = b.filter(Da);
  b = b.filter(Ea).reduce((c, d) => {
    var e = d.lstat.isDirectory() ? "Directory" : d.lstat.isFile() ? "File" : d.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return Object.assign({}, c, {[d.relativePath]:{type:e}});
  }, {});
  a = await a.reduce(async(c, d) => {
    var {path:e, relativePath:f} = d;
    c = await c;
    d = await Fa(e);
    return Object.assign({}, c, {[f]:d});
  }, {});
  return {content:Object.assign({}, b, a), type:"Directory"};
}
const Ga = (a, b) => {
  let c = [], d = [];
  Object.keys(a).forEach(f => {
    const {type:g} = a[f];
    "File" == g ? c.push(O(b, f)) : "Directory" == g && d.push(f);
  });
  const e = d.reduce((f, g) => {
    const {content:h} = a[g];
    g = Ga(h, O(b, g));
    return [...f, ...g];
  }, []);
  return [...c, ...e];
};
function Ha(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const P = (a, b) => {
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
function Ia(a, b) {
  function c() {
    return b.filter(Ha).reduce((d, {re:e, replacement:f}) => {
      if (this.m) {
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
            return this.m ? h : f.call(this, h, ...k);
          } catch (l) {
            P(g, l);
          }
        });
      }
    }, `${a}`);
  }
  c.b = () => {
    c.m = !0;
  };
  return c.call(c);
}
;const Ja = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Ka = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, La = () => {
  var a = {R:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
  return Object.keys(a).reduce((b, c) => {
    {
      var d = a[c];
      const {getReplacement:e = Ka, getRegex:f = Ja} = {}, g = f(c);
      d = {name:c, re:d, regExp:g, getReplacement:e, map:{}, lastIndex:0};
    }
    return Object.assign({}, b, {[c]:d});
  }, {});
}, Ma = a => {
  var b = void 0 === b ? [] : b;
  const {regExp:c, map:d} = a;
  return {re:c, replacement(e, f) {
    e = d[f];
    delete d[f];
    return Ia(e, Array.isArray(b) ? b : [b]);
  }};
}, Na = a => {
  const {re:b, map:c, getReplacement:d, name:e} = a;
  return {re:b, replacement(f) {
    const {lastIndex:g} = a;
    c[g] = f;
    a.lastIndex += 1;
    return d(e, g);
  }};
};
async function Oa(a, b) {
  b instanceof qa ? b.pipe(a) : a.end(b);
  return await K(a);
}
class Pa extends F {
  constructor(a, b) {
    super(b);
    this.g = (Array.isArray(a) ? a : [a]).filter(Ha);
    this.m = !1;
    this.w = b;
  }
  async replace(a, b) {
    const c = new Pa(this.g, this.w);
    b && Object.assign(c, b);
    a = await Oa(c, a);
    c.m && (this.m = !0);
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  async reduce(a) {
    return await this.g.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.m) {
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
            if (this.m) {
              return e.length ? e.push(Promise.resolve(h)) : h;
            }
            const l = d.call(this, h, ...k);
            l instanceof Promise && e.push(l);
            return l;
          } catch (l) {
            P(f, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            P(f, h);
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
      a = H(d.stack), d.stack = a, c(d);
    }
  }
}
;function Qa() {
  var a = Ra;
  let b = "";
  const c = new F({transform(d, e, f) {
    let g;
    for (b += d.toString(); (d = a.exec(b)) && (c.push(d), g = d, a.global);) {
    }
    g && (b = b.slice(g.index + g[0].length));
    f();
  }, objectMode:!0});
  return c;
}
;const Q = (a, b, c, d) => {
  if (!a) {
    throw Error("The name of the property is not given");
  }
  a = `${d ? `${d}.` : ""}${a}`;
  if (null === b) {
    return a;
  }
  b = Number.isInteger(b) || !0 === b || !1 === b || ["number", "boolean"].includes(c) ? b : `"${b}"`;
  return `${a}=${b}`;
}, Sa = ({number:a, U:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", Ta = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, Ua = a => `/**
${a}
 */
`, R = a => ` * @suppress {nonStandardJsDocs}
${a}`, S = (a, b, c) => {
  a = `${a ? "" : "var "}${a ? `${a}.` : ""}${b}`;
  c && (a += ` = ${c}`);
  return a;
}, U = a => {
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
function V(a, b, c) {
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
;const Va = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), Wa = new RegExp(`\\s*((?:${Va.source}\\s*)*)`);
const W = (a, b) => V(new RegExp(`<${a}${Wa.source}?(?:${/\s*\/>/.source}|${(new RegExp(`>([\\s\\S]+?)?</${a}>`)).source})`, "g"), b, ["a", "v", "v1", "v2", "c"]).map(({a:c = "", c:d = ""}) => {
  c = c.replace(/\/$/, "").trim();
  c = Xa(c);
  return {content:d, A:c};
}), Xa = a => V(Va, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
const Ya = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function Za(a) {
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
;function $a(a) {
  a = Ya(a);
  return Za(a);
}
;function ab(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h, "default":k, closure:l, alias:m, aliases:n, noParams:p}) {
  if (!c) {
    throw Error("Property does not have a name.");
  }
  a.name = c;
  b && (a.description = U(b));
  a.type = Sa({number:g, U:d, boolean:e, type:h});
  l ? a.f = l : a.f = a.type;
  void 0 !== k && (a.b = !0);
  a.b && (a.default = k);
  if (f || a.b) {
    a.optional = !0;
  }
  m && (a.v = [m]);
  n && (a.v = n.split(/\s*,\s*/));
  p && (a.g = p);
  if (!a.optional && !a.g) {
    try {
      a.parsed = $a(a.f);
    } catch (q) {
    }
  }
}
function bb(a, b = null, c = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = Q(a.name, a.default, a.type, b);
  return `{${c ? a.f : a.type}} ${a.optional ? `[${b}]` : b}${`${a.description ? ` ${a.description}` : ""}${a.b ? ` Default \`${a.default}\`.` : ""}`}`;
}
function cb(a, b = !1) {
  a = bb(a, null, b);
  return ` * @prop ${db(a, !0)}`;
}
function eb(a, b) {
  const c = Object.assign(Object.create(Object.getPrototypeOf(a)), a);
  c.description = `An alias for \`${a.name}\`.`;
  c.name = b;
  return c;
}
class fb {
  constructor() {
    this.description = this.name = null;
    this.type = "*";
    this.f = "";
    this.b = !1;
    this.default = null;
    this.optional = !1;
    this.v = [];
    this.parsed = void 0;
    this.g = !1;
    this.parsed = null;
  }
  I() {
    const a = [];
    if (this.description) {
      var b = db(this.description);
      this.default && (b += ` Default \`${this.default}\`.`);
      a.push(b);
    }
    if (this.parsed && "function" == this.parsed.name) {
      const {function:{args:c, return:d}} = this.parsed;
      c.map(X).forEach((e, f) => {
        const {optional:g} = c[f];
        f = `arg${f}`;
        g && (f = `[${f}]`);
        a.push(` * @param {${e}} ${f}`);
      });
      "void" != d.name && (b = X(d), a.push(` * @return {${b}}`));
    } else {
      a.push(` * @type {${this.optional ? Ta(this.f) : this.f}}`);
    }
    return a.join("\n");
  }
  J(a, b = "", c = !1) {
    a = bb(this, a, c);
    return `${b} * @param ${a}`;
  }
}
const db = (a, b = !1) => a.split("\n").map((c, d) => {
  if (b && !d) {
    return c;
  }
  d = " *";
  c.length && (d += " ");
  return d + c;
}).join("\n"), X = a => {
  var b = "";
  a.nullable ? b = "?" : !1 === a.nullable && (b = "!");
  if (a.function) {
    b += a.name + "(";
    const d = [];
    if (a.function.this) {
      var c = "this: " + X(a.function.this);
      d.push(c);
    }
    a.function.new && (c = "new: " + X(a.function.new), d.push(c));
    a.function.args.forEach(e => {
      let f = X(e);
      e.optional && (f += "=");
      d.push(f);
    });
    a.function.variableArgs && (c = "..." + X(a.function.variableArgs), d.push(c));
    c = d.join(", ");
    b += c + ")";
    a.function.return && (b += ": " + X(a.function.return));
  } else {
    if (a.record) {
      b += "{ ", c = Object.keys(a.record).map(d => {
        var e = a.record[d];
        if (!e) {
          return d;
        }
        e = X(e);
        return `${d}: ${e}`;
      }), b += c.join(", "), b += " }";
    } else {
      if (a.application) {
        if ("Promise" == a.name && !a.application.some(d => "void" != d.name)) {
          return b + "Promise";
        }
        b += a.name + "<";
        c = a.application.map(d => X(d));
        b += c.join(", ");
        b += ">";
      } else {
        a.union ? (b += "(", c = a.union.map(d => X(d)), b += c.join("|"), b += ")") : b += "any" == a.name ? "*" : a.name;
      }
    }
  }
  return b;
};
function gb(a, b, c, d) {
  var {name:e, type:f, desc:g, noToc:h, spread:k, noExpand:l, "import":m, link:n, closure:p, constructor:q, "extends":r, "interface":t, record:w} = c;
  if (!e) {
    throw Error("Type does not have a name.");
  }
  a.name = e;
  f && (a.type = f);
  p ? a.f = p : a.f = a.type;
  g && (a.description = U(g));
  a.M = !!h;
  a.L = !!k;
  a.K = !!l;
  a.import = !!m;
  n && (a.link = n);
  !0 === q && (a.isConstructor = q);
  !0 === t && (a.s = t);
  !0 === w && (a.w = w);
  r && (a.extends = r);
  if (b) {
    c = W("prop", b).map(u => {
      var {content:T, A:z} = u;
      u = new fb;
      ab(u, T, z);
      return u;
    });
    const C = W("function", b);
    b = W("fn", b);
    b = [...C, ...b].map(u => {
      var {content:T, A:z} = u, A = Object.assign({}, z);
      u = z.async;
      const qb = void 0 === z.args ? "" : z.args;
      var J = void 0 === z["return"] ? "void" : z["return"];
      A = (delete A.async, delete A.args, delete A["return"], A);
      J = J.replace(/\n\s*/g, " ");
      A.type = `function(${qb}): ${u ? `!Promise<${J}>` : J}`;
      u = new fb;
      ab(u, T, A);
      return u;
    });
    a.i = [...c, ...b];
  }
  d && (a.l = d);
}
function hb(a) {
  var b = [];
  a.description && b.push(` * ${a.description}`);
  a.extends && b.push(` * @extends {${a.extends}}`);
  b.push(` * @${a.S}`);
  b = `/**
${b.join("\n")}
 */
`;
  b += S(a.l, a.name, void 0);
  const c = a.i.reduce((d, e) => {
    d.push(e);
    const f = e.v.map(g => eb(e, g));
    d.push(...f);
    return d;
  }, []).map(d => {
    let e = d.I();
    e = `/**
${e}
 */
` + S(`${a.h}.prototype`, d.name);
    d.parsed && "function" == d.parsed.name ? ({function:{args:d}} = d.parsed, d = d.map((f, g) => `arg${g}`), e += ` = function(${d.join(", ")}) {}`) : d.type.startsWith("function(") && (e += " = function() {}");
    return e;
  });
  return [b, ...c].join("\n");
}
function ib(a, b) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return b ? `${a.u}${c}` : c;
}
function jb(a, b, c) {
  var d = ` * @typedef {${(b ? a.f : a.type) || "Object"}}${` ${ib(a, b)}${a.g}`}`;
  a = (a.i ? a.i.reduce((e, f) => {
    e.push(f);
    const g = f.v.map(h => eb(f, h));
    e.push(...g);
    return e;
  }, []) : []).map(e => cb(e, b));
  d = [d, ...a].join("\n");
  b && !c && (d = R(d));
  return `/**
${d}
 */
`;
}
function kb(a, b, c) {
  b = void 0 === b ? !1 : b;
  c = void 0 === c ? !1 : c;
  const d = !!a.extends, e = jb(a, b, c), f = [];
  if (a.l && b) {
    let g = ` * @typedef {${a.h}} ${a.name}${a.g}`;
    b && !c && (g = R(g));
    g = `/**
${g}
 */
`;
    f.push(g);
  }
  d && (a = ` * @typedef {${a.extends} & ${ib(a, b)}} ${b ? a.h : a.name}${a.g}`, b && !c && (a = R(a)), a = `/**
${a}
 */
`, f.push(a));
  f.push(e);
  return f.join("");
}
class Y {
  constructor() {
    this.name = "";
    this.link = this.K = this.import = this.L = this.M = this.description = this.f = this.type = null;
    this.i = [];
    this.l = null;
    this.w = this.s = this.isConstructor = !1;
    this.extends = null;
  }
  get T() {
    return this.isConstructor || this.s || this.w;
  }
  I() {
    let a;
    this.f ? a = ` * @typedef {${this.f}}` : this.T || (a = ` * @typedef {${lb(this.i, !0)}}`);
    return a ? (this.description && (a = ` * ${this.description}\n${a}`), a = `/**
${a}
 */
` + S(this.l, this.name)) : hb(this);
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
    return this.isConstructor ? "constructor" : this.s ? "interface" : this.w ? "record" : "";
  }
  get u() {
    return this.l ? `${this.l}.` : "";
  }
  get h() {
    return `${this.u}${this.name}`;
  }
  J(a, b, c, d, e) {
    e = void 0 === e ? !1 : e;
    var f = "";
    !0 === d ? f = "?" : !1 === d && (f = "!");
    d = this.description ? ` ${this.description}` : "";
    const g = this.L ? lb(this.i) : e ? this.h : this.name;
    b = `${c || ""} * @param {${f}${g}} ${b ? `[${a}]` : a}${d}`;
    f = this.i && !this.K ? this.i.map(h => h.J(a, c, e)) : [];
    return [b, ...f].join("\n");
  }
}
const lb = (a, b) => {
  a = void 0 === a ? [] : a;
  b = void 0 === b ? !1 : b;
  a = a.reduce((c, d) => {
    c.push(d);
    const e = d.v.map(f => Object.assign({}, d, {name:f}));
    c.push(...e);
    return c;
  }, []);
  return `{ ${a.map(c => {
    const d = b ? c.f : c.type;
    let e = c.name, f = d;
    c.optional && !b ? e = `${c.name}?` : c.optional && b && (f = `(${Ta(d)})`);
    return `${e}: ${f}`;
  }).join(", ")} }`;
};
function mb(a, {name:b, from:c, desc:d, link:e, ns:f}) {
  a.name = b;
  a.from = c;
  a.F = d;
  a.link = e;
  a.u = f || a.from;
}
function nb(a, b = !0) {
  return ` * @typedef {import('${a.from}').${a.name}} ${b ? a.h : a.name}`;
}
class ob {
  constructor() {
    this.from = this.name = this.u = "";
    this.link = this.F = null;
  }
  get h() {
    return `${this.u}.${this.name}`;
  }
}
;function pb(a, b) {
  b = b.reduce((c, d) => Object.assign({}, c, {[d.h]:d}), {});
  a.D = Object.assign({}, a.D, b);
}
class rb extends Pa {
  constructor(a, b) {
    b = void 0 === b ? {} : b;
    super(a);
    this.D = {};
    this.on("types", c => {
      pb(this, c);
    });
    this.on("namespace", c => {
      this.b.includes(c) || this.b.push(c);
    });
    this.s = b;
    this.b = [];
    this.j = console.log;
    this.file = null;
    this.lines = [];
  }
  static get Type() {
    return Y;
  }
  static get b() {
    return ob;
  }
  get types() {
    return this.D;
  }
}
;const sb = a => {
  a = W("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:b, A:{namespace:c, ns:d = c}}] = a, e = void 0 == d ? void 0 : d;
  a = W("type", b).map(({content:h, A:k}) => {
    const l = new Y;
    gb(l, h, k, e);
    return l;
  });
  const f = W("import", b).map(({A:h, content:k}) => {
    const l = new ob;
    k && (h.desc = U(k));
    mb(l, h);
    return l;
  }), g = f.map(({name:h, from:k, F:l, link:m, u:n}) => {
    const p = new Y;
    gb(p, "", {name:h, type:`import('${k}').${h}`, M:!0, import:!0, F:l, link:m}, void 0 == n ? void 0 : n);
    return p;
  });
  return {l:d, types:a, imports:f, V:g};
};
const tb = (a, b, c) => {
  b = b.map(d => kb(d, !0, c));
  a = a.map(d => {
    d = nb(d);
    return `/**
${c ? d : R(d)}
 */
`;
  });
  return [...b, ...a].join("");
}, ub = (a, b, c, d = !1) => {
  a = [...a.map(e => e.I())].join("\n");
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const wb = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, c) {
  const [d, ...e] = c.split(/\s+/), f = e.includes("closure"), g = e.includes("externs"), h = e.includes("noSuppress"), k = e.includes("skipNsDecl");
  let l = e.find(p => p.startsWith("ignore:"));
  l = l ? l.replace("ignore:", "").split(",") : [];
  let {C:m, G:n} = this.s;
  f && (m = !0);
  g && (n = !0);
  try {
    this.j("Detected type marker: %s", c);
    const p = await L(d);
    let {l:q = null, types:r, imports:t} = sb(p);
    r = r.filter(({h:C}) => l.includes(C) ? !1 : !0);
    t = t.filter(({h:C}) => l.includes(C) ? !1 : !0);
    this.emit("types", r);
    this.emit("types", t);
    let w;
    m ? w = tb(t, r, h) : n ? (w = ub(r, q, this.b, k) + "\n", q && this.emit("namespace", q)) : w = vb(t, r);
    return `/* ${b} ${c} */\n${w}`;
  } catch (p) {
    return this.j("(%s) Could not process typedef-js: %s", c, p.message), process.env.b && console.error(p.stack), a;
  }
}}, vb = (a, b) => {
  b = b.map(c => kb(c));
  a = a.map(c => nb(c, !1)).map(Ua).join("");
  b = b.join("");
  return `${a}${b}`.replace(xb, " * @typedef");
}, xb = / \*\/\n\/\*\*\n \* @typedef/g;
const zb = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?.*)*)/gm, replacement:yb};
function yb(a, b, c, d, e, f, g) {
  const {C:h} = this.s;
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
      this.j("%s:%s:%s", this.file, n, p);
    }
  };
  try {
    k = $a(c);
  } catch (m) {
    return this.j("Error while parsing the type %s", c), this.j(process.env.DEBUG ? m.stack : m.message), f(), a;
  }
  if (!k) {
    return this.j("Could not parse the type %s", c), f(), a;
  }
  const l = Object.values(this.types).map(({name:m, h:n}) => h ? n : m);
  if (!Z(k, l, this.j, c, f)) {
    return a;
  }
  c = Object.values(this.types).find(({name:m, h:n}) => h ? n == k.name : m == k.name);
  return !c || c instanceof rb.b ? a : c.J(e, d, b, k.nullable, h);
}
const Z = (a, b, c, d, e) => {
  if (a) {
    var f = a.name;
    if (!f || !"string number boolean null undefined symbol any".split(" ").includes(f)) {
      if (f && !a.application && !a.function) {
        let h = b.includes(f);
        h || (h = Ab.includes(f));
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
}, Ab = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var Bb = (a, b = !1) => {
  var {R:c} = La();
  const d = Na(c);
  c = Ma(c);
  return new rb(b ? [wb] : [wb, d, zb, c], a);
};
var Db = async() => {
  const {C:a = !1, G:b = !1, H:c, types:d} = {C:fa, G:ha, H:D, types:ia};
  await Promise.all(B.map(async e => {
    var f = await N(E, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await Fa(e), g = Ga(f.content, e));
    await Cb(g, a, b, c, d);
  }));
};
const Cb = async(a, b = !1, c = !1, d = null, e = null) => {
  const f = [];
  e && await Promise.all(e.split(",").map(async g => {
    g = await L(g);
    const {types:h, imports:k} = sb(g);
    f.push(h, k);
  }));
  await Promise.all(a.map(async g => {
    var h = await L(g);
    const k = Bb({C:b, G:c}, c);
    f.forEach(l => k.emit("types", l));
    k.file = g;
    k.j = console.error;
    k.lines = h.split("\n");
    k.end(h);
    h = await K(k);
    "-" == d ? console.log(h) : d ? await M(d, h) : await M(g, h);
  }));
};
const Eb = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, Fb = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, Gb = "type opt name quote defaultValue description Default".split(" "), Ra = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), Hb = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class Ib extends F {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform(a, b, c) {
    var {type:d, name:e, description:f, i:g} = a;
    a = d && d.startsWith("import") ? Jb(d, e) : Hb(d, e, f, g);
    this.push(a);
    g.forEach(h => {
      var {type:k, name:l, default:m, description:n, optional:p} = h;
      {
        h = ["string", "number", "boolean"].includes(k) ? ` ${k}` : ` type="${k}"`;
        var q = void 0 !== m;
        const r = q ? ` default="${m}"` : "";
        q = p && !q ? " opt" : "";
        const t = " ".repeat(4), w = " ".repeat(6);
        h = `${t}<prop${q}${h} name="${l}"${r}${n ? `>\n${w}${n}\n${t}</prop>` : "/>"}\n`;
      }
      this.push(h);
    });
    g.length && this.push("  </type>\n");
    c();
  }
}
const Jb = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class Kb extends F {
  constructor() {
    super({objectMode:!0});
  }
  _transform(a, b, c) {
    var [, d, e, f, g] = a;
    a = V(Fb, g, Gb).map(h => {
      var k = Object.assign({}, h), l = h.defaultValue;
      const m = h.Default;
      var n = h.opt;
      const p = h.name;
      h = h.type;
      k = (delete k.defaultValue, delete k.Default, delete k.opt, delete k.name, delete k.type, k);
      n = Object.assign({}, k, {name:p, type:h}, l ? {defaultValue:Eb(l)} : {}, m ? {B:Eb(m)} : {}, n ? {optional:!0} : {});
      if (l || m) {
        l ? l !== m && void 0 !== n.B && (l = Q(p, m, h), console.error("%s[%s] does not match Default `%s`.", e, l, n.B)) : (l = Q(p, m, h), console.error("%s[%s] got from Default.", e, l)), n.default = "defaultValue" in n ? n.defaultValue : n.B, delete n.defaultValue, delete n.B;
      }
      return n;
    });
    this.push({type:d, name:e, description:f, i:a});
    c();
  }
}
async function Lb(a) {
  const b = Qa(), c = new Kb, d = new Ib;
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
  ${(await K(d)).trim()}
</types>`;
}
;var Mb = async() => {
  const {H:a} = {H:D};
  await Promise.all(B.map(async b => {
    b = await L(b);
    b = await Lb(b);
    a ? await M(a, b) : console.log(b);
  }));
};
if (ka) {
  const a = ea();
  console.log(ma({usage:a, description:"Embeds and maintains Closure-compatible types JSDoc in\nJavaScript source code from an external types.xml file.", line:"typal source [--closure|externs] [--migrate] [-o output] [-hv]", example:"typal src/index.js -c"}));
  process.exit();
} else {
  la && (console.log(require("../../package.json").version), process.exit());
}
(async() => {
  try {
    return ja ? await Mb() : await Db();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map