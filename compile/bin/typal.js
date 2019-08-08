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
const ia = (a, b, c, d, e) => {
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
}, ja = a => {
  const b = [];
  for (let c = 0; c < a.length; c++) {
    const d = a[c];
    if (d.startsWith("-")) {
      break;
    }
    b.push(d);
  }
  return b;
}, la = () => {
  var a = ka;
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
const ka = {source:{description:"The path to the source file or directory with files to embed types into. Can specify multiple values, e.g., `typal types/index.js types/vendor.js`.", command:!0, multiple:!0}, output:{description:"The destination where to save output.\nIf not passed, the file will be overwritten.\nIf `-` is passed, prints to stdout.", short:"o"}, closure:{description:"Whether to generate types in _Closure_ mode.", boolean:!0, short:"c"}, externs:{description:"Whether to generate externs for _GCC_.", 
boolean:!0, short:"e"}, types:{description:"Comma-separated location of files to read types from.", short:"t"}, template:{description:"Scans the input file for `@type` comment in functions' JSDoc, and inserts the annotations from types' files.", short:"T"}, migrate:{description:"Extracts types from JavaScript source code and saves them\ninto the types.xml file specified in the output option.", boolean:!0, short:"m"}, help:{description:"Print the help information and exit.", boolean:!0, short:"h"}, 
version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, w = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = ja(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce((e, f) => {
    var g = Object.assign({}, e);
    e = e.l;
    g = (delete g.l, g);
    if (0 == e.length && d) {
      return Object.assign({}, {l:e}, g);
    }
    const h = a[f];
    let l;
    if ("string" == typeof h) {
      ({value:l, argv:e} = ia(e, f, h));
    } else {
      try {
        const {short:k, boolean:m, number:n, command:p, multiple:q} = h;
        p && q && c.length ? (l = c, d = !0) : p && c.length ? (l = c[0], d = !0) : {value:l, argv:e} = ia(e, f, k, m, n);
      } catch (k) {
        return Object.assign({}, {l:e}, g);
      }
    }
    return void 0 === l ? Object.assign({}, {l:e}, g) : Object.assign({}, {l:e}, g, {[f]:l});
  }, {l:b});
}(ka), x = w.source, ma = w.output, na = w.closure, oa = w.externs, pa = w.types, qa = w.template, ra = w.migrate, sa = w.help, ta = w.version;
function ua(a = {usage:{}}) {
  const {usage:b = {}, description:c, line:d, example:e} = a;
  a = Object.keys(b);
  const f = Object.values(b), [g] = a.reduce(([k = 0, m = 0], n) => {
    const p = b[n].split("\n").reduce((q, t) => t.length > q ? t.length : q, 0);
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
    const [p, ...q] = n;
    m = `${m}\t${p}`;
    const t = h("", g);
    n = q.map(r => `${t}\t${r}`);
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
;const {createReadStream:va, createWriteStream:wa, lstat:y, readdir:xa} = fs;
var ya = stream;
const {Transform:z, Writable:za} = stream;
const Aa = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, Ba = (a, b = !1) => Aa(a, 2 + (b ? 1 : 0)), Ca = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:Da} = os;
const Ea = /\s+at.*(?:\(|\s)(.*)\)?/, Ga = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ha = Da(), A = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Ga.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Ea);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Ea, (g, h) => g.replace(h, h.replace(Ha, "~"))) : f).join("\n");
};
function Ia(a, b, c = !1) {
  return function(d) {
    var e = Ca(arguments), {stack:f} = Error();
    const g = Aa(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = A(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function B(a) {
  var {stack:b} = Error();
  const c = Ca(arguments);
  b = Ba(b, a);
  return Ia(c, b, a);
}
;const Ja = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ka extends za {
  constructor(a) {
    var b = a || {}, c = Object.assign({}, b);
    const d = void 0 === b.binary ? !1 : b.binary, e = void 0 === b.rs ? null : b.rs;
    b = (delete c.binary, delete c.rs, c);
    const {O:f = B(!0), proxyError:g} = a || {}, h = (l, k) => f(k);
    super(b);
    this.b = [];
    this.L = new Promise((l, k) => {
      this.on("finish", () => {
        let m;
        d ? m = Buffer.concat(this.b) : m = this.b.join("");
        l(m);
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
        k(m);
      });
      e && Ja(this, e).pipe(this);
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
const E = async a => {
  var b = void 0 === b ? {} : b;
  ({f:a} = new Ka(Object.assign({}, {rs:a}, b, {O:B(!0)})));
  return await a;
};
async function F(a) {
  a = va(a);
  return await E(a);
}
;async function H(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = B(!0), d = wa(a);
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
  const d = B(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const {length:e} = a;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((f, g) => {
    const h = (k, m) => k ? (k = d(k), g(k)) : f(c || m);
    let l = [h];
    Array.isArray(b) ? (b.forEach((k, m) => {
      La(e, m);
    }), l = [...b, h]) : 1 < Array.from(arguments).length && (La(e, 0), l = [b, h]);
    a(...l);
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
  var b = await I(xa, a);
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
            M(g, k);
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
  var a = {R:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
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
    this.j = !1;
    this.i = b;
  }
  async replace(a, b) {
    const c = new N(this.f, this.i);
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
            M(f, k);
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
  b instanceof ya ? b.pipe(a) : a.end(b);
  return await E(a);
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
}, $a = ({number:a, K:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", ab = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, P = a => a ? `/**
${a}
 */
` : "/**\n */\n", Q = a => ` * @suppress {nonStandardJsDocs}
${a}`, bb = (a, b, c) => {
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
function cb(a, b, c) {
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
;const db = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), eb = new RegExp(`(?:\\s+((?:${db.source}\\s*)*))`);
const U = (a, b) => {
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
  const c = (d, e) => {
    d = void 0 === d ? !0 : d;
    e = void 0 === e ? [] : e;
    var f = {};
    let g = a[b];
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
      if ("|" != a[b]) {
        return f;
      }
    } else {
      if ("{" == g) {
        b++;
        e = f;
        for (d = {}; "}" != a[b];) {
          var h = a[b];
          b++;
          d[h] = null;
          if (":" == a[b]) {
            b++;
            try {
              var l = c();
              d[h] = l;
            } catch (m) {
              throw m.message += `(when parsing ${h} property)`, m;
            }
          }
          if ("}" == a[b]) {
            b++;
            break;
          }
          if ("," != a[b]) {
            throw Error(`Expecting , for record after ${h}`);
          }
          b++;
        }
        e.record = d;
        return f;
      }
    }
    if (["nonNullable", "nullable"].includes(g)) {
      throw Error("Nullability already defined.");
    }
    if (/[=),:.<>}|]/.test(g)) {
      throw Error(`Unexpected token ${g}.`);
    }
    "|" != a[b] && (f.name = a[b], b++);
    if ("function" == g) {
      l = f;
      h = {return:null, args:[]};
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
          h.this = c();
        } else {
          if ("new" == a[b]) {
            b++;
            if (":" != a[b]) {
              throw Error("Expecting :");
            }
            b++;
            h.new = c();
          } else {
            if ("." == a[b] && "." == a[b + 1] && "." == a[b + 2]) {
              b++;
              b++;
              b++;
              k = c();
              if (")" != a[b]) {
                throw Error("Variable args must come last");
              }
              h.variableArgs = k;
            } else {
              k = c(), h.args.push(k), "=" == a[b] && (k.optional = !0, b++);
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
      ":" == a[b] && (b++, k = c(), void 0 == k.name && k.nullable && (k.name = ""), h.return = k);
      l.function = h;
    } else {
      if ("<" == a[b] || (h = "." == a[b] && "<" == a[b + 1])) {
        b++;
        h && b++;
        l = f;
        for (h = []; ">" != a[b];) {
          k = c();
          h.push(k);
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
        l.application = h;
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
;function ib(a) {
  a = gb(a);
  return hb(a);
}
;function jb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h}, l) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = T(b));
  b = $a({number:g, K:d, boolean:e, type:h});
  l && (b = b.replace(new RegExp(`([!?])?${l}\\.`, "g"), "$1"));
  a.type = b;
  f && (a.optional = !0);
}
class kb {
  constructor() {
    this.name = null;
    this.type = "";
    this.optional = null;
    this.description = "";
  }
}
const lb = (a, b) => {
  let c = a.lastIndexOf("</arg>"), d = a;
  var e = [];
  -1 != c && (c += 6, e = a.slice(0, c), d = a.slice(c), e = U("arg", e), e = e.map(({content:f, props:g}) => {
    const h = new kb;
    jb(h, f, g, b);
    return h;
  }));
  return {U:d, F:e};
};
function V(a) {
  var b = "";
  a.nullable ? b = "?" : !1 === a.nullable && (b = "!");
  if (a.function) {
    b += a.name + "(";
    const d = [];
    if (a.function.this) {
      var c = "this: " + V(a.function.this);
      d.push(c);
    }
    a.function.new && (c = "new: " + V(a.function.new), d.push(c));
    a.function.args.forEach(e => {
      let f = V(e);
      e.optional && (f += "=");
      d.push(f);
    });
    a.function.variableArgs && (c = "..." + V(a.function.variableArgs), d.push(c));
    c = d.join(", ");
    b += c + ")";
    a.function.return && (b += ": " + V(a.function.return));
  } else {
    if (a.record) {
      b += "{ ", c = Object.keys(a.record).map(d => {
        var e = a.record[d];
        if (!e) {
          return d;
        }
        e = V(e);
        return `${d}: ${e}`;
      }), b += c.join(", "), b += " }";
    } else {
      if (a.application) {
        if ("Promise" == a.name && !a.application.some(d => "void" != d.name)) {
          return b + "Promise";
        }
        b += a.name + "<";
        c = a.application.map(d => V(d));
        b += c.join(", ");
        b += ">";
      } else {
        a.union ? (b += "(", c = a.union.map(d => V(d)), b += c.join("|"), b += ")") : b += "any" == a.name ? "*" : a.name;
      }
    }
  }
  return b;
}
;function mb(a, b) {
  if (!a.parsed) {
    throw Error("The property was not parsed.");
  }
  const {function:{args:c, return:d}} = a.parsed, e = c.map(({name:g}, h) => {
    let {name:l = `arg${h}`, type:k = g, optional:m} = a.args[h] || {};
    l = `${l}${m ? "?" : ""}`;
    k && (k = b(k));
    return `${l}${k ? `: ${k}` : ""}`;
  }).join(", "), f = b(d ? d.name || "*" : "*");
  return `(${e}) => ${f}`.replace(/\*/g, "\\*");
}
function nb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h, "default":l, closure:k, alias:m, aliases:n, noParams:p, "static":q, initial:t}) {
  if (!c) {
    throw Error("Property does not have a name.");
  }
  a.name = c;
  b && (a.description = T(b));
  b = $a({number:g, K:d, boolean:e, type:h});
  p && (a.s = p);
  k && (a.g = k);
  a.type = b;
  void 0 !== l ? a.default = l : void 0 !== t && (a.default = t);
  if (f || void 0 !== l) {
    a.optional = !0;
  }
  m && (a.m = [m]);
  n && (a.m = n.split(/\s*,\s*/));
  q && (a.b = !0);
}
function ob(a, b = !1) {
  if (b) {
    return a.closureType;
  }
  if (!a.A) {
    return a.type;
  }
  const {function:{args:c, return:d}} = a.parsed;
  b = c.map(f => V(f)).map((f, g) => {
    const {optional:h} = c[g];
    ({name:g = `arg${g}`} = a.args[g] || {});
    return `${g}${h ? "?" : ""}: ${f}`;
  }).join(", ");
  const e = d ? V(d) : "void";
  return `(${b}) => ${e}`;
}
function pb(a, b = null, c = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = O(a.name, a.default, a.type, b);
  b = a.optional ? `[${b}]` : b;
  var {i:d} = a;
  d = d ? ` ${d}` : "";
  return `{${ob(a, c)}} ${b}${d}`;
}
function qb(a, b = !1) {
  a = pb(a, null, b);
  return ` * @prop ${rb(a, !0)}`;
}
function sb(a) {
  const b = [], {function:{args:c, return:d}} = a.parsed;
  c.map(e => V(e)).forEach((e, f) => {
    const {optional:g} = c[f], {name:h = `arg${f}`, description:l} = a.args[f] || {};
    b.push(` * @param {${e}${g ? "=" : ""}} ${g ? `[${h}]` : h}${l ? ` ${l}` : ""}`);
  });
  if ("void" != d.name) {
    const e = V(d);
    b.push(` * @return {${e}}`);
  }
  return b;
}
function tb(a) {
  if (a.A) {
    const {function:{args:b}} = a.parsed;
    return ` = function(${b.map((c, d) => {
      ({name:c = `arg${d}`} = a.args[d] || {});
      return c;
    }).join(", ")}) {}`;
  }
  return a.type.startsWith("function(") ? " = function() {}" : "";
}
function ub(a, b = "") {
  let c = [];
  var {i:d} = a;
  d && (d = rb(d), c.push(d));
  !a.optional && a.A ? (a = sb(a), c.push(...a)) : c.push(` * @type {${a.optional ? ab(a.closureType) : a.closureType}}`);
  b && (c = c.map(e => `${b}${e}`));
  return c.join("\n");
}
function vb(a, b) {
  const c = Object.assign(Object.create(Object.getPrototypeOf(a)), a);
  c.description = `An alias for \`${a.name}\`.`;
  c.name = b;
  return c;
}
class wb {
  constructor(a = []) {
    this.f = this.description = this.name = null;
    this.closureType = "";
    this.default = this.g = null;
    this.optional = !1;
    this.m = [];
    this.s = !1;
    this.parsed = null;
    this.args = a;
    this.b = !1;
  }
  get J() {
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
    if (!this.s) {
      try {
        this.parsed = ib(this.closureType);
      } catch (b) {
        this.parsed = null;
      }
    }
  }
  get i() {
    let a = this.description || "";
    return `${a}${this.hasDefault ? `${/``` */.test(this.description) ? "\n" : a ? " " : ""}Default \`${this.default}\`.` : ""}`;
  }
  get A() {
    return this.parsed && "function" == this.parsed.name;
  }
  D(a, b = "", c = !1) {
    a = pb(this, a, c);
    return `${b} * @param ${a}`;
  }
}
const rb = (a, b = !1) => a.split("\n").map((c, d) => {
  if (b && !d) {
    return c;
  }
  d = " *";
  c.length && (d += " ");
  return d + c;
}).join("\n");
function xb(a) {
  var b = a.f();
  b = P(b.join("\n"));
  b += bb(a.namespace, a.name, a.G);
  const c = a.properties.reduce((d, e) => {
    d.push(e);
    const f = e.m.map(g => vb(e, g));
    d.push(...f);
    return d;
  }, []).map(d => {
    let e = ub(d);
    e = P(e);
    e += bb(`${a.fullName}${d.J ? "" : ".prototype"}`, d.name);
    return e += tb(d);
  });
  return [b, ...c].join("\n");
}
function yb(a, b) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return (void 0 === b ? 0 : b) ? `${a.ns}${c}` : c;
}
function zb(a, b, c, d) {
  b = void 0 === b ? !1 : b;
  c = void 0 === c ? !1 : c;
  d = void 0 === d ? b : d;
  d = ` * @typedef {${(b ? a.closureType : a.type) || a.s()}}${` ${yb(a, d)}${a.g}`}`;
  a = (a.properties ? a.properties.reduce((e, f) => {
    if (f.b) {
      return e;
    }
    e.push(f);
    const g = f.m.map(h => vb(f, h));
    e.push(...g);
    return e;
  }, []) : []).map(e => qb(e, b));
  a = [d, ...a].join("\n");
  b && !c && (a = Q(a));
  return a = P(a);
}
function Ab(a, b, c, d) {
  b = void 0 === b ? !1 : b;
  c = void 0 === c ? !1 : c;
  d = void 0 === d ? b : d;
  const e = !!a.extends, f = zb(a, b, c, d), g = [];
  if (a.namespace && b) {
    var h = ` * @typedef {${a.fullName}} ${a.name}${a.g}`;
    b && !c && (h = Q(h));
    h = P(h);
    g.push(h);
  } else {
    a.namespace && d && (h = ` * @typedef {${a.fullName}} ${a.name}${a.g}`, h = P(h), g.push(h));
  }
  e && (a = ` * @typedef {${a.extends} & ${yb(a, d)}} ${d ? a.fullName : a.name}${a.g}`, b && !c && (a = Q(a)), a = P(a), g.push(a));
  g.push(f);
  return g.join("");
}
class W {
  constructor() {
    this.name = "";
    this.description = this.closureType = this.type = null;
    this.import = this.noExpand = this.spread = this.noToc = !1;
    this.link = null;
    this.properties = [];
    this.namespace = null;
    this.isRecord = this.isInterface = this.isConstructor = !1;
    this.args = this.extends = null;
  }
  b(a, b, c, d) {
    var {name:e, type:f, desc:g, noToc:h, spread:l, noExpand:k, "import":m, link:n, closure:p, constructor:q, "extends":t, "interface":r, record:u} = b;
    d = void 0 === d ? null : d;
    if (!e) {
      throw Error("Type does not have a name.");
    }
    this.name = e;
    f && (this.type = f);
    p ? this.closureType = p : this.closureType = this.type;
    g && (this.description = T(g));
    this.noToc = !!h;
    this.spread = !!l;
    this.noExpand = !!k;
    this.import = !!m;
    n && (this.link = n);
    !0 === q && (this.isConstructor = q);
    !0 === r && (this.isInterface = r);
    !0 === u && (this.isRecord = u);
    t && (this.extends = t);
    if (a) {
      b = U("prop", a).map(v => {
        var {content:C, props:D} = v;
        v = new wb;
        nb(v, C, D);
        return v;
      });
      const da = U("function", a), ea = U("fn", a);
      a = U("static", a).map(v => {
        v.isStatic = !0;
        return v;
      });
      a = [...da, ...ea, ...a].map(v => {
        var {content:C, props:D, isStatic:Ob} = v;
        const {U:Pb, F:fa} = lb(C, d);
        var G = Object.assign({}, D);
        v = D.async;
        var R = void 0 === D["return"] ? "void" : D["return"];
        G = (delete G.async, delete G["return"], G);
        let {args:ha = ""} = D;
        !ha && fa.length && (ha = fa.map(Qb => {
          var {type:Fa, optional:Rb} = Qb;
          return null !== Rb ? `${Fa}=` : Fa;
        }).join(","));
        R = R.replace(/\n\s*/g, " ");
        G.type = `function(${ha}): ${v ? `!Promise<${R}>` : R}`;
        v = new wb(fa);
        nb(v, Pb, G);
        Ob && (v.b = !0);
        return v;
      });
      b = [...b, ...a];
      const {I:S, n:Sb} = b.reduce((v, C) => {
        C.J ? v.I.push(C) : v.n.push(C);
        return v;
      }, {I:[], n:[]});
      this.properties = [...S, ...Sb];
    }
    c && (this.namespace = c);
  }
  get H() {
    return this.isConstructor || this.isInterface || this.isRecord;
  }
  s() {
    return "Object";
  }
  get g() {
    return `${this.tag ? ` \`\uff20${this.tag}\`` : ""}${this.description ? ` ${this.description}` : ""}`;
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
  f(a, b) {
    a = void 0 === a ? "" : a;
    b = void 0 === b ? !0 : b;
    let c = [];
    this.description && c.push(` * ${this.description}`);
    this.extends && c.push(` * @extends {${this.extends}}`);
    this.args && this.args.forEach(d => {
      let {name:e, description:f, optional:g, type:h} = d;
      e.startsWith("...") && (e = e.slice(3), h = `...${h}`);
      c.push(` * @param {${h}${g ? "=" : ""}} ${g ? `[${e}]` : e}${f ? ` ${f}` : ""}`);
    });
    b && c.push(` * @${this.S}`);
    a && (c = c.map(d => `${a}${d}`));
    return c;
  }
  get G() {
    return this.args ? `function(${this.args.map(a => {
      ({name:a} = a);
      return a;
    }).join(", ")}) {}` : null;
  }
  get ns() {
    return this.namespace ? `${this.namespace}.` : "";
  }
  get fullName() {
    return `${this.ns}${this.name}`;
  }
  D(a, b, c, d, e) {
    e = void 0 === e ? !1 : e;
    var f = "";
    !0 === d ? f = "?" : !1 === d && (f = "!");
    d = this.description ? ` ${this.description}` : "";
    const g = this.spread ? Bb(this.properties) : e ? this.fullName : this.name;
    b = `${c || ""} * @param {${f}${g}} ${b ? `[${a}]` : a}${d}`;
    f = this.properties && !this.noExpand ? this.properties.map(h => h.D(a, c, e)) : [];
    return [b, ...f].join("\n");
  }
  toMarkdown(a, b) {
    a = void 0 === a ? [] : a;
    b = void 0 === b ? {} : b;
    const {narrow:c, flatten:d, preprocessDesc:e, link:f, details:g = []} = b, h = g.includes(this.name);
    var l = this.type ? `\`${this.type}\`` : "", k = l, m = !1;
    this.link ? k = `[${l}](${this.link})` : !this.import && this.type && (k = X(a, this.type, b), m = k != this.type, k = Cb(k, m));
    b = Cb(this.fullName);
    b = this.import ? `[${b}](l-type)` : this.noToc ? `[${b}](l-type)` : `[${b}](t-type)`;
    l = this.description ? `: ${this.description}` : "";
    k = k ? `${k} ` : "";
    m = /_/.test(b);
    if (this.extends) {
      let p = `\`${this.extends}\``;
      var n = a.find(q => {
        ({fullName:q} = q);
        return q == this.extends;
      });
      n && n.link ? (p = "<a ", n.description && (p += `title="${n.description}" `), p += `href="${n.link}">\`${this.extends}\`</a>`) : (n = X(a, this.extends, {flatten:d, T(q) {
        return `\`${q}\``;
      }, link:f}), this.extends != n && (p = n));
      n = ` extends ${p}`;
      m = m || /_/.test(p);
      k = (m ? k + "<strong>" : k + "__") + (b + n);
      "function" == typeof d && d(this.extends);
    } else {
      k = (m ? k + "<strong>" : k + "__") + b;
    }
    k = (m ? k + "</strong>" : k + "__") + l;
    a = Db(this, this.properties, a, {narrow:c, flatten:d, preprocessDesc:e, link:f});
    return {X:k, table:a, Z:h};
  }
}
const Cb = (a, b) => {
  b = void 0 === b ? !1 : b;
  return `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`;
}, Bb = (a, b) => {
  a = void 0 === a ? [] : a;
  b = void 0 === b ? !1 : b;
  a = a.reduce((c, d) => {
    c.push(d);
    const e = d.m.map(f => Object.assign({}, d, {name:f}));
    c.push(...e);
    return c;
  }, []);
  return `{ ${a.map(c => {
    const d = b ? c.closureType : c.type;
    let e = c.name, f = d;
    c.optional && !b ? e = `${c.name}?` : c.optional && b && (f = `(${ab(d)})`);
    return `${e}: ${f}`;
  }).join(", ")} }`;
}, X = (a, b, c) => {
  c = void 0 === c ? {} : c;
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
  return d ? Y(d, a, c) : b;
}, Y = (a, b, c) => {
  c = void 0 === c ? {} : c;
  var {P:d = !0} = c;
  let e = "";
  var f = "";
  a.nullable ? f = "?" : !1 === a.nullable && (f = "!");
  if (a.function) {
    e = e + f + (a.name + "(");
    const g = [];
    a.function.this && (d = "this: " + Y(a.function.this, b, c), g.push(d));
    a.function.new && (d = "new: " + Y(a.function.new, b, c), g.push(d));
    a.function.args.forEach(h => {
      let l = Y(h, b, c);
      h.optional && (l += "=");
      g.push(l);
    });
    a.function.variableArgs && (d = "..." + Y(a.function.variableArgs, b, c), g.push(d));
    d = g.join(", ");
    e += d + ")";
    a.function.return && (e += ": " + Y(a.function.return, b, c));
  } else {
    a.record ? (e += "{ ", d = Object.keys(a.record).map(g => {
      var h = a.record[g];
      if (!h) {
        return g;
      }
      h = Y(h, b, c);
      return `${g}: ${h}`;
    }), e += d.join(", "), e += " }") : a.application ? (e += Eb(a.name, b, f, c) + "&lt;", d = a.application.map(g => Y(g, b, c)), e += d.join(", "), e += "&gt;") : a.union ? (e = e + f + "(", f = a.union.map(g => Y(g, b, c)), e += f.join(d ? " \\| " : " | "), e += ")") : e += Eb("any" == a.name ? "*" : a.name, b, f, c);
  }
  return e;
}, Eb = (a, b, c, d) => {
  c = void 0 === c ? "" : c;
  d = void 0 === d ? {} : d;
  const {flatten:e = !1, T:f, link:g = k => {
    ({link:k} = k);
    return `#${k}`;
  }} = d;
  d = Fb(b, a);
  c = `${c}${a}`;
  if (!d) {
    return c;
  }
  let {link:h, type:{description:l}} = d;
  h = g(d);
  e && ((b = b.find(k => {
    ({fullName:k} = k);
    return k == a;
  })) && b.link && (h = b.link), !l && b.o && (l = b.o), "function" == typeof e && e(a));
  b = f ? f(c) : c;
  return l ? `<a href="${h}" title="${l.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${h})`;
}, Db = (a, b, c, d) => {
  b = void 0 === b ? [] : b;
  c = void 0 === c ? [] : c;
  d = void 0 === d ? {} : d;
  const {narrow:e = !1, flatten:f = !1, preprocessDesc:g, link:h} = d;
  if (!b.length) {
    return "";
  }
  const l = a.isConstructor || a.isInterface, k = b.some(n => {
    ({hasDefault:n} = n);
    return n;
  }), m = {flatten:f, P:!e, link:h};
  a = b.map(n => {
    let p;
    p = n.args && n.A ? mb(n, u => X(c, u, m)) : X(c, n.parsed || n.type, m);
    const q = l || n.optional ? n.name : `${n.name}*`, t = n.hasDefault ? `\`${n.default}\`` : "-", r = g ? g(n.description) : n.description;
    return {V:n, typeName:p, name:q, N:Gb(r, !e), d:t};
  });
  if (e) {
    return {props:a, Y:k, G:l};
  }
  a = a.map(n => {
    var {name:p, typeName:q, N:t, d:r, V:u} = n;
    return [u.optional ? p : `__${p}__`, `<em>${q}</em>`, t, ...k ? [r] : []];
  });
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...k ? [l ? "Initial" : "Default"] : []];
  return `

\`\`\`table
${JSON.stringify([b, ...a], null, 2)}
\`\`\``;
}, Gb = (a, b) => {
  a = void 0 === a ? "" : a;
  null === a && (a = "");
  (void 0 === b || b) && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
}, Fb = (a, b) => {
  a = a.filter(d => {
    ({fullName:d} = d);
    return d == b;
  });
  if (a.length) {
    var c = a.find(d => {
      ({import:d} = d);
      return d || !1;
    });
    a = a.find(d => {
      ({import:d} = d);
      return !d;
    }) || c;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function Hb(a, {name:b, from:c, desc:d, link:e, ns:f}) {
  a.name = b;
  a.b = c;
  a.o = d;
  a.link = e;
  a.f = f || a.b;
}
function Ib(a, b = !0) {
  return ` * @typedef {import('${a.b}').${a.name}} ${b ? a.fullName : a.name}`;
}
class Jb {
  constructor() {
    this.b = this.name = this.f = "";
    this.link = this.o = null;
  }
  get fullName() {
    return `${this.f}.${this.name}`;
  }
}
;function Kb(a, b) {
  b = b.reduce((c, d) => Object.assign({}, c, {[d.fullName]:d}), {});
  a.B = Object.assign({}, a.B, b);
}
class Lb extends N {
  constructor(a, b) {
    b = void 0 === b ? {} : b;
    super(a);
    this.B = {};
    this.on("types", c => {
      Kb(this, c);
    });
    this.on("namespace", c => {
      this.b.includes(c) || this.b.push(c);
    });
    this.g = b;
    this.b = [];
    this.h = console.log;
    this.file = null;
    this.lines = [];
  }
  static get Type() {
    return W;
  }
  static get b() {
    return Jb;
  }
  get types() {
    return this.B;
  }
}
;class Mb extends W {
  constructor() {
    super();
    this.i = null;
  }
  get H() {
    return !0;
  }
  b(a, b, ...c) {
    var d = Object.assign({}, b);
    b = b["return"];
    d = (delete d.async, delete d["return"], d);
    super.b(a, d, ...c);
    b && (this.i = b);
  }
  get return() {
    return this.i || "void";
  }
  f(a) {
    a = void 0 === a ? "" : a;
    const b = super.f(a, !1);
    this.i && b.push(`${a} * @return {${this.return}}`);
    return b;
  }
  s() {
    return `(${this.args.map(a => {
      var {name:b, type:c, optional:d} = a;
      return `${b}${d ? "?" : ""}: ${c}`;
    }).join(", ")}) => ${this.return}`;
  }
}
;const Tb = a => {
  a = U("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:b, props:{namespace:c, ns:d = c}}] = a, e = void 0 == d ? void 0 : d, f = [], g = [];
  a = U(["type", "interface", "constructor", "method", "import"], b).reduce((h, l) => {
    var {content:k, props:m, tag:n} = l;
    l = Object.assign({}, m);
    var p = m.alias;
    const q = m.aliases, t = (delete l.alias, delete l.aliases, l);
    l = p ? [p] : q ? q.split(/, */) : [];
    switch(n) {
      case "type":
        p = new W;
        p.b(k, m, e, void 0);
        h.push(p);
        l.forEach(r => {
          const u = new W;
          u.b(k, Object.assign({}, t, {name:r}), e, void 0);
          h.push(u);
        });
        break;
      case "interface":
        l = Nb(k, m, e);
        l.forEach(r => {
          r.isInterface = !0;
        });
        h.push(...l);
        break;
      case "constructor":
        l = Nb(k, m, e);
        l.forEach(r => {
          r.isConstructor = !0;
        });
        h.push(...l);
        break;
      case "method":
        l = Nb(k, m, e, !0);
        h.push(...l);
        break;
      case "import":
        {
          l = new Jb;
          k && (m.desc = T(k));
          Hb(l, m);
          f.push(l);
          const {name:r, b:u, o:da, link:ea, f:S} = l;
          l = new W;
          l.b("", {name:r, type:`import('${u}').${r}`, noToc:!0, import:!0, o:da, link:ea}, void 0 == S ? void 0 : S);
          g.push(l);
        }
    }
    return h;
  }, []);
  return {namespace:d, types:a, imports:f, W:g};
}, Ub = (a, b, c, d) => {
  d = (void 0 === d ? 0 : d) ? new Mb : new W;
  const e = a.search(/<(prop|function|fn|static) /);
  let f = "", g = a;
  1 != e && (f = a.slice(0, e), g = a.slice(e));
  ({F:a} = lb(f, void 0));
  d.b(g, b, c, void 0);
  d.args = a;
  return d;
}, Nb = (a, b, c, d) => {
  d = void 0 === d ? !1 : d;
  const e = [];
  var f = Object.assign({}, b);
  const g = b.alias, h = b.aliases, l = (delete f.alias, delete f.aliases, f);
  b = Ub(a, b, c, d);
  e.push(b);
  (g ? [g] : h ? h.split(/, */) : []).forEach(k => {
    k = Ub(a, Object.assign({}, l, {name:k}), c, d);
    k.description = `${k.description}${k.description ? " " : ""}Alias of \`${l.name}\`.`;
    e.push(k);
  });
  return e;
}, Vb = async(a, b) => {
  b = void 0 === b ? [] : b;
  a = await F(a);
  let {namespace:c = null, types:d, imports:e} = Tb(a);
  d = d.filter(f => {
    ({fullName:f} = f);
    return b.includes(f) ? !1 : !0;
  });
  e = e.filter(f => {
    ({fullName:f} = f);
    return b.includes(f) ? !1 : !0;
  });
  return {types:d, imports:e, namespace:c};
};
const Wb = (a, b, c) => {
  b = b.map(d => Ab(d, !0, c));
  a = a.map(d => {
    d = Ib(d);
    return P(c ? d : Q(d));
  });
  return [...b, ...a].join("");
}, Xb = (a, b, c, d = !1) => {
  a = [...a.map(e => {
    {
      let f;
      e.closureType ? f = ` * @typedef {${e.closureType}}` : e.H || (f = ` * @typedef {${Bb(e.properties, !0)}}`);
      f ? (e.description && (f = ` * ${e.description}\n${f}`), f = P(f), e = f += bb(e.namespace, e.name)) : e = xb(e);
    }
    return e;
  })].join("\n");
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const Zb = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, c) {
  const [d, ...e] = c.split(/\s+/), f = e.includes("closure"), g = e.includes("externs"), h = e.includes("noSuppress"), l = e.includes("skipNsDecl"), k = e.includes("namespace");
  let m = e.find(q => q.startsWith("ignore:"));
  m = m ? m.replace("ignore:", "").split(",") : [];
  let {w:n, C:p} = this.g;
  f && (n = !0);
  g && (p = !0);
  try {
    this.h("Detected type marker: %s", c);
    const {types:q, imports:t, namespace:r} = await Vb(d, m);
    this.emit("types", q);
    this.emit("types", t);
    let u;
    n ? u = Wb(t, q, h) : p ? (u = Xb(q, r, this.b, l) + "\n", r && this.emit("namespace", r)) : k ? (r && this.emit("namespace", r), u = Yb(t, q, !0)) : u = Yb(t, q);
    return `/* ${b} ${c} */\n${u}`;
  } catch (q) {
    return this.h("(%s) Could not process typedef-js: %s", c, q.message), process.env.b && console.error(q.stack), a;
  }
}}, Yb = (a, b, c = !1) => {
  b = b.map(d => Ab(d, !1, !1, c));
  a = a.map(d => Ib(d, c)).map(P).join("");
  b = b.join("");
  return `${a}${b}`.replace($b, " * @typedef");
}, $b = / \*\/\n\/\*\*\n \* @typedef/g;
const bc = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?.*)*)/gm, replacement:ac};
function ac(a, b, c, d, e, f, g) {
  const {w:h} = this.g;
  let l;
  f = () => {
    if (this.lines && this.file) {
      var m;
      {
        let q = m = 0;
        for (; q < g;) {
          q += this.lines[m].length, m++;
        }
        m = {line:m, M:b.length + 11};
      }
      const {line:n, M:p} = m;
      this.h("%s:%s:%s", this.file, n, p);
    }
  };
  try {
    l = ib(c);
  } catch (m) {
    return this.h("Error while parsing the type %s", c), this.h(process.env.DEBUG ? m.stack : m.message), f(), a;
  }
  if (!l) {
    return this.h("Could not parse the type %s", c), f(), a;
  }
  const k = Object.values(this.types).map(({name:m, fullName:n}) => h ? n : m);
  if (!Z(l, k, this.h, c, f)) {
    return a;
  }
  c = Object.values(this.types).find(({name:m, fullName:n}) => h ? n == l.name : m == l.name);
  return !c || c instanceof Lb.b ? a : c.D(e, d, b, l.nullable, h);
}
const Z = (a, b, c, d, e) => {
  if (a) {
    var f = a.name;
    if (!f || !"string number boolean null undefined symbol any".split(" ").includes(f)) {
      if (f && !a.application && !a.function) {
        let h = b.includes(f);
        h || (h = cc.includes(f));
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
}, cc = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var dc = (a, b = !1) => {
  var {R:c} = Ta();
  const d = Va(c);
  c = Ua(c);
  return new Lb(b ? [Zb] : [Zb, d, bc, c], a);
};
var fc = async() => {
  const {w:a = !1, C:b = !1, u:c, types:d} = {w:na, C:oa, u:ma, types:pa};
  await Promise.all(x.map(async e => {
    var f = await I(y, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await K(e), g = L(f.content, e));
    await ec(g, a, b, c, d);
  }));
};
const ec = async(a, b = !1, c = !1, d = null, e = null) => {
  const f = [];
  e && await Promise.all(e.split(",").map(async g => {
    g = await F(g);
    const {types:h, imports:l} = Tb(g);
    f.push(h, l);
  }));
  await Promise.all(a.map(async g => {
    var h = await F(g);
    const l = dc({w:b, C:c}, c);
    f.forEach(k => l.emit("types", k));
    l.file = g;
    l.h = console.error;
    l.lines = h.split("\n");
    l.end(h);
    h = await E(l);
    "-" == d ? console.log(h) : d ? await H(d, h) : await H(g, h);
  }));
};
const gc = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, hc = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, ic = "type opt name quote defaultValue description Default".split(" "), Za = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), jc = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class kc extends z {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform(a, b, c) {
    var {type:d, name:e, description:f, properties:g} = a;
    a = d && d.startsWith("import") ? lc(d, e) : jc(d, e, f, g);
    this.push(a);
    g.forEach(h => {
      var {type:l, name:k, default:m, description:n, optional:p} = h;
      {
        h = ["string", "number", "boolean"].includes(l) ? ` ${l}` : ` type="${l}"`;
        var q = void 0 !== m;
        const t = q ? ` default="${m}"` : "";
        q = p && !q ? " opt" : "";
        const r = " ".repeat(4), u = " ".repeat(6);
        h = `${r}<prop${q}${h} name="${k}"${t}${n ? `>\n${u}${n}\n${r}</prop>` : "/>"}\n`;
      }
      this.push(h);
    });
    g.length && this.push("  </type>\n");
    c();
  }
}
const lc = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class mc extends z {
  constructor() {
    super({objectMode:!0});
  }
  _transform(a, b, c) {
    var [, d, e, f, g] = a;
    a = cb(hc, g, ic).map(h => {
      var l = Object.assign({}, h), k = h.defaultValue;
      const m = h.Default;
      var n = h.opt;
      const p = h.name;
      h = h.type;
      l = (delete l.defaultValue, delete l.Default, delete l.opt, delete l.name, delete l.type, l);
      n = Object.assign({}, l, {name:p, type:h}, k ? {defaultValue:gc(k)} : {}, m ? {v:gc(m)} : {}, n ? {optional:!0} : {});
      if (k || m) {
        k ? k !== m && void 0 !== n.v && (k = O(p, m, h), console.error("%s[%s] does not match Default `%s`.", e, k, n.v)) : (k = O(p, m, h), console.error("%s[%s] got from Default.", e, k)), n.default = "defaultValue" in n ? n.defaultValue : n.v, delete n.defaultValue, delete n.v;
      }
      return n;
    });
    this.push({type:d, name:e, description:f, properties:a});
    c();
  }
}
async function nc(a) {
  const b = Ya(), c = new mc, d = new kc;
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
;var oc = async() => {
  const {u:a} = {u:ma};
  await Promise.all(x.map(async b => {
    b = await F(b);
    b = await nc(b);
    a ? await H(a, b) : console.log(b);
  }));
};
const pc = /( *) \* @fnType {(.+?)}/gm;
class qc extends N {
  constructor(a, b) {
    super([{re:pc, async replacement(c, d, e) {
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
      e = a.find(({fullName:h}) => h == f);
      if (!e) {
        return console.error("Type %s in %s not found", f, b), c;
      }
      if ("constructor" == g) {
        return e.f(d).join("\n");
      }
      e = e.properties.find(({name:h}) => h == g);
      return e ? e.parsed ? ub(e, d) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", g, f, b), c) : (console.error("Property %s of type %s in %s not found", g, f, b), c);
    }}]);
  }
}
;const rc = async a => {
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
}, sc = async a => (await Promise.all(a.map(async b => {
  const c = await Vb(b);
  return Object.assign({}, c, {location:b});
}))).reduce((b, c) => {
  var {imports:d, types:e} = c;
  b.push(...d);
  b.push(...e);
  return b;
}, []);
async function tc() {
  var a = {u:qa, types:pa};
  a = void 0 === a ? {} : a;
  const {u:b, types:c} = a;
  a = await rc(c);
  const d = await sc(a);
  await Promise.all(x.map(async e => {
    var f = await I(y, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await K(e), g = L(f.content, e));
    await uc(g, d, b);
  }));
}
const uc = async(a, b, c) => {
  b = void 0 === b ? [] : b;
  c = void 0 === c ? null : c;
  await Promise.all(a.map(async d => {
    var e = await F(d);
    const f = new qc(b, d);
    f.end(e);
    e = await E(f);
    "-" == c ? console.log(e) : c ? await H(c, e) : await H(d, e);
  }));
};
if (sa) {
  const a = la();
  console.log(ua({usage:a, description:"Embeds and maintains Closure-compatible types JSDoc in\nJavaScript source code from an external types.xml file.", line:"typal source [--closure|externs] [--migrate] [-o output] [-hv]", example:"typal src/index.js -c"}));
  process.exit();
} else {
  ta && (console.log(require("../../package.json").version), process.exit());
}
(async() => {
  try {
    return ra ? await oc() : qa ? await tc() : await fc();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map