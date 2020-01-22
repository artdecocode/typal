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
help:{description:"Print the help information and exit.", boolean:!0, short:"h"}, version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, x = function(a = {}, b = process.argv) {
  let [, , ...c] = b;
  const d = ea(c);
  c = c.slice(d.length);
  a = Object.entries(a).reduce((g, [h, l]) => {
    g[h] = "string" == typeof l ? {short:l} : l;
    return g;
  }, {});
  const e = [];
  a = Object.entries(a).reduce((g, [h, l]) => {
    let k;
    try {
      const m = l.short, n = l.boolean, p = l.number, q = l.command, r = l.multiple;
      if (q && r && d.length) {
        k = d;
      } else {
        if (q && d.length) {
          k = d[0];
        } else {
          const t = da(c, h, m, n, p);
          ({value:k} = t);
          const u = t.index, v = t.length;
          void 0 !== u && v && e.push({index:u, length:v});
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
}(fa), y = x.source, z = x.output, ia = x.closure, ja = x.useNamespace, ka = x.externs, la = x.types, ma = x.template, na = x.migrate, oa = x.help, pa = x.version;
function qa(a = {usage:{}}) {
  const {usage:b = {}, description:c, line:d, example:e} = a;
  a = Object.keys(b);
  const f = Object.values(b), [g] = a.reduce(([k = 0, m = 0], n) => {
    const p = b[n].split("\n").reduce((q, r) => r.length > q ? r.length : q, 0);
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
    const r = h("", g);
    n = q.map(t => `${r}\t${t}`);
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
;const ra = fs.createReadStream, sa = fs.createWriteStream, A = fs.lstat, ta = fs.readFileSync, ua = fs.readdir;
var va = stream;
const B = stream.Transform, wa = stream.Writable;
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
const Ba = /\s+at.*(?:\(|\s)(.*)\)?/, Ca = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Da = Aa(), D = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Ca.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Ba);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Ba, (g, h) => g.replace(h, h.replace(Da, "~"))) : f).join("\n");
};
function Ea(a, b, c = !1) {
  return function(d) {
    var e = za(arguments), {stack:f} = Error();
    const g = xa(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = D(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function E(a) {
  var {stack:b} = Error();
  const c = za(arguments);
  b = ya(b, a);
  return Ea(c, b, a);
}
;const Fa = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Ga extends wa {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {R:e = E(!0), proxyError:f} = a || {}, g = (h, l) => e(l);
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
          const m = D(k.stack);
          k.stack = m;
          f && g`${k}`;
        }
        l(k);
      });
      c && Fa(this, c).pipe(this);
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
const F = async a => {
  ({f:a} = new Ga({rs:a, R:E(!0)}));
  return await a;
};
async function G(a) {
  a = ra(a);
  return await F(a);
}
;async function H(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = E(!0), d = sa(a);
  await new Promise((e, f) => {
    d.on("error", g => {
      g = c(g);
      f(g);
    }).on("close", e).end(b);
  });
}
;function Ha(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function I(a, b, c) {
  const d = E(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const e = a.length;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((f, g) => {
    const h = (k, m) => k ? (k = d(k), g(k)) : f(c || m);
    let l = [h];
    Array.isArray(b) ? (b.forEach((k, m) => {
      Ha(e, m);
    }), l = [...b, h]) : 1 < Array.from(arguments).length && (Ha(e, 0), l = [b, h]);
    a(...l);
  });
}
;const Ia = path.dirname, J = path.join, Ja = path.relative, Ka = path.resolve;
async function La(a, b) {
  b = b.map(async c => {
    const d = J(a, c);
    return {lstat:await I(A, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Ma = a => a.lstat.isDirectory(), Na = a => !a.lstat.isDirectory();
async function K(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  const {ignore:b = []} = {};
  if (!(await I(A, a)).isDirectory()) {
    var c = Error("Path is not a directory");
    c.code = "ENOTDIR";
    throw c;
  }
  c = await I(ua, a);
  var d = await La(a, c);
  c = d.filter(Ma);
  d = d.filter(Na).reduce((e, f) => {
    var g = f.lstat.isDirectory() ? "Directory" : f.lstat.isFile() ? "File" : f.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...e, [f.relativePath]:{type:g}};
  }, {});
  c = await c.reduce(async(e, {path:f, relativePath:g}) => {
    const h = Ja(a, f);
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
    "File" == g ? c.push(J(b, f)) : "Directory" == g && d.push(f);
  });
  const e = d.reduce((f, g) => {
    const {content:h} = a[g];
    g = L(h, J(b, g));
    return [...f, ...g];
  }, []);
  return [...c, ...e];
};
function Oa(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const b = a.re instanceof RegExp;
  a = -1 != ["string", "function"].indexOf(typeof a.replacement);
  return b && a;
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
function Pa(a, b) {
  function c() {
    return b.filter(Oa).reduce((d, {re:e, replacement:f}) => {
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
;const Qa = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Ra = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, Sa = () => {
  var a = {S:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
  return Object.keys(a).reduce((b, c) => {
    {
      var d = a[c];
      const {getReplacement:e = Ra, getRegex:f = Qa} = {}, g = f(c);
      d = {name:c, re:d, regExp:g, getReplacement:e, map:{}, lastIndex:0};
    }
    return {...b, [c]:d};
  }, {});
}, Ta = a => {
  var b = [];
  const c = a.map;
  return {re:a.regExp, replacement(d, e) {
    d = c[e];
    delete c[e];
    return Pa(d, Array.isArray(b) ? b : [b]);
  }};
}, Ua = a => {
  const b = a.map, c = a.getReplacement, d = a.name;
  return {re:a.re, replacement(e) {
    const f = a.lastIndex;
    b[f] = e;
    a.lastIndex += 1;
    return c(d, f);
  }};
};
async function Va(a, b) {
  return Wa(a, b);
}
class Xa extends B {
  constructor(a, b) {
    super(b);
    this.g = (Array.isArray(a) ? a : [a]).filter(Oa);
    this.j = !1;
    this.h = b;
  }
  async replace(a, b) {
    const c = new Xa(this.g, this.h);
    b && Object.assign(c, b);
    a = await Va(c, a);
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
      a = D(d.stack), d.stack = a, c(d);
    }
  }
}
async function Wa(a, b) {
  b instanceof va ? b.pipe(a) : a.end(b);
  return await F(a);
}
;function Ya() {
  var a = Za;
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
;const $a = (a, b, c, d) => {
  if (!a) {
    throw Error("The name of the property is not given");
  }
  a = `${d ? `${d}.` : ""}${a}`;
  if (null === b) {
    return a;
  }
  b = Number.isInteger(b) || [!0, !1, "null"].includes(b) || ["number", "boolean"].includes(c) ? b : `"${b}"`;
  return `${a}=${b}`;
}, ab = ({number:a, L:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", bb = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, O = a => a ? `/**
${a}
 */
` : "/**\n */\n", P = a => ` * @suppress {nonStandardJsDocs}
${a}`, cb = (a, b, c) => {
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
}, db = (a, b, c = null) => {
  const {async:d, "void":e, "return":f = e ? "void" : "", ...g} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({I:h, name:l}) => "this" == l ? `${l}: ${h}` : l.startsWith("...") ? `...${h}` : h).join(","));
  b = f.replace(/\n\s*/g, " ");
  d && b ? b = `!Promise<${b}>` : d && (b = "!Promise");
  c = `function(${"constructor" == g.name ? `new: ${c}, ` : ""}${a})`;
  b && (c += `: ${b}`);
  return {W:{...g, async:d, return:b}, H:c};
};
function R(a, b) {
  const c = a.example;
  c && c.startsWith(".") && b && (a.example = Ka(Ia(b), c));
}
;function eb(a, b, c) {
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
;const fb = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), gb = new RegExp(`(?:\\s+((?:${fb.source}\\s*)*))`);
const S = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return eb(new RegExp(`<(${a})${gb.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:c, a:d = "", c:e = ""}) => {
    d = d.replace(/\/$/, "").trim();
    d = hb(d);
    return {content:e, props:d, tag:c};
  });
}, hb = a => eb(fb, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
const ib = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function jb(a) {
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
;function kb(a) {
  a = ib(a);
  return jb(a);
}
;function lb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h}, l) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = Q(b));
  b = ab({number:g, L:d, boolean:e, type:h});
  l && (b = b.replace(new RegExp(`([!?])?${l}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), f = !0);
  a.type = b;
  f && (a.optional = !0);
}
class mb {
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
const nb = (a, b) => {
  let c = a.lastIndexOf("</arg>"), d = a;
  var e = [];
  -1 != c && (c += 6, e = a.slice(0, c), d = a.slice(c), e = S("arg", e), e = e.map(({content:f, props:g}) => {
    const h = new mb;
    lb(h, f, g, b);
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
;const U = (a, b = !1) => a.split("\n").map((c, d) => {
  if (b && !d) {
    return c;
  }
  d = " *";
  c.length && (d += " ");
  return d + c;
}).join("\n"), ob = a => {
  const b = a.replace(/^\s*\n/gm, "").split("\n").reduce((c, d) => {
    [{length:d = 0} = {}] = /^\s*/.exec(d) || [];
    return d < c ? d : c;
  }, Infinity);
  return a.replace(new RegExp(`^ {${b}}`, "gm"), "");
};
function pb(a, b = "") {
  const c = b.split(/\s*,\s*/);
  return a.split(/\s*,\s*/).map(d => {
    let e = d = ta(d, "utf8");
    if (d = /\/\* start example \*\/\r?\n([\s\S]+?)\r?\n\s*\/\* end example \*\//.exec(d)) {
      [, d] = d, e = ob(d);
    }
    c.forEach(f => {
      const [g, h] = f.split(/\s*=>\s*/);
      e = e.replace(`'${g}'`, `'${h}'`);
      e = e.replace(`"${g}"`, `"${h}"`);
    });
    return e = e.replace(/@/g, "\uff20");
  });
}
function qb(a, {O:b = !0, T:c = !0} = {}) {
  const d = [];
  b && d.push(" * @example");
  a.forEach(e => {
    let f = [], g = [], h = "", l;
    e = e.split("\n").reduce((k, m) => {
      m.startsWith("///") ? (l = "comment", f.push(m)) : (l = "block", g.push(m));
      h || (h = l);
      l != h && ("block" == l ? (k.push(f.join("\n")), f = []) : (k.push(g.join("\n")), g = []), h = l);
      return k;
    }, []);
    f.length ? e.push(f.join("\n")) : g.length && e.push(g.join("\n"));
    e = e.reduce((k, m) => {
      m.startsWith("///") ? (m = m.replace(/^\/\/\/\s+/gm, ""), k.push(...m.split("\n"))) : (k.push("```js"), k.push(...m.split("\n")), k.push("```"));
      return k;
    }, []);
    c && (e = e.map(k => U(k)));
    d.push(...e);
  });
  return d;
}
function rb(a, b, c = new RegExp(`([!?])?${b}\\.`, "g")) {
  b && (a.f && (a.f = a.f.replace(c, "$1")), a.type = a.type.replace(c, "$1"));
}
function sb(a, b = !1) {
  return b ? a.closureType : a.isParsedFunction ? a.toTypeScriptFunction(T) : a.type;
}
function tb(a, b = null, c = !1, d = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = $a(a.name, a.optional ? a.default : null, a.type, b);
  b = a.optional ? `[${b}]` : b;
  var e = a.m;
  e = e ? ` ${e}` : "";
  c = `{${sb(a, c)}} ${b}${e}`;
  d && (a = qb(a.examples, {O:!1, T:!1}).join("\n").replace(/\*/g, "\uff0a")) && (c += `\n${a}`);
  return c;
}
function ub(a, b = !1) {
  a = tb(a, null, b, !0);
  return ` * @prop ${U(a, !0)}`;
}
function vb(a, b) {
  const c = [], {function:{args:d, return:e, variableArgs:f, this:g}} = a.parsed;
  d.map(h => T(h)).forEach((h, l) => {
    const {optional:k} = d[l], {name:m = `arg${l}`, description:n} = a.args[l] || {};
    c.push(` * @param {${h}${k ? "=" : ""}} ${k ? `[${m}]` : m}${n ? ` ${n}` : ""}`);
  });
  if (f) {
    const {M:h, X:l} = wb(a.args || []), k = [h, l].filter(Boolean).join(" ");
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
function xb(a) {
  if (a.isParsedFunction) {
    const {function:{args:b, variableArgs:c}} = a.parsed, d = b.map((e, f) => {
      ({name:e = `arg${f}`} = a.l[f] || {});
      return e;
    });
    if (c) {
      const {M:e} = wb(a.args || []);
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
  !a.optional && a.isParsedFunction ? (e = vb(a, c), d.push(...e)) : d.push(` * @type {${a.optional ? bb(a.closureType) : a.closureType}}`);
  c && a.examples.length && (a = qb(a.examples), d.push(...a));
  b && (d = d.map(f => `${b}${f}`));
  return d.join("\n");
}
function yb(a, b) {
  const c = Object.assign(Object.create(Object.getPrototypeOf(a)), a);
  c.description = `An alias for \`${a.name}\`.`;
  c.name = b;
  return c;
}
class zb {
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
  b(a, {name:b, string:c, "boolean":d, opt:e, number:f, type:g, "default":h, closure:l, alias:k, aliases:m, example:n, "example-override":p = "", noParams:q, "static":r, initial:t, "template-no-return":u}) {
    if (!b) {
      throw Error("Property does not have a name.");
    }
    this.name = b;
    a && (this.description = Q(a));
    a = ab({number:f, L:c, boolean:d, type:g});
    q && (this.s = q);
    l && (this.f = l);
    this.type = a;
    void 0 !== h ? this.default = h : void 0 !== t && (this.default = t);
    if (e || void 0 !== h) {
      this.optional = !0;
    }
    k && (this.aliases = [k]);
    m && (this.aliases = m.split(/\s*,\s*/));
    r && (this.g = !0);
    n && (this.examples = pb(n, p));
    u && (this.u = !0);
  }
  get type() {
    return this.h || "*";
  }
  set type(a) {
    this.h = a || null;
    this.closureType = this.f || this.h || "";
    if (!this.s) {
      try {
        this.parsed = kb(this.closureType), this.isParsedFunction && !this.args && (this.args = []);
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
    a = tb(this, a, c);
    const [d, ...e] = a.split("\n");
    return [`@param ${d}`, ...e].map(f => `${b} * ${f}`).join("\n");
  }
}
const wb = a => {
  let b = "args";
  const {name:c = "", description:d} = a[a.length - 1] || {};
  c.startsWith("...") && (b = c.replace("...", ""));
  return {M:b, X:d};
};
class W extends zb {
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
;function Ab(a, b, c, d) {
  var e = S("prop", a).map(({content:l, props:k}) => {
    const m = new zb;
    R(k, c);
    m.b(l, k);
    return m;
  });
  a = S(["function", "fn", "static"], a).map(({content:l, props:k, tag:m}) => {
    m = "static" == m;
    const {J:n, F:p} = nb(l, b);
    l = new W(p);
    const {W:q, H:r} = db(k, p, d);
    q.type = r;
    R(q, c);
    l.b(n, q);
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
;const Bb = (a, b, c = {}) => {
  let d;
  if ("object" == typeof b) {
    d = b;
  } else {
    try {
      (d = kb(b)) || console.log("Could not parse %s", b);
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
    }), e += d.join(", "), e += " }") : a.application ? (e += Cb(a.name, b, f, c) + "&lt;", d = a.application.map(g => X(g, b, c)), e += d.join(", "), e += "&gt;") : a.union ? (e = e + f + "(", f = a.union.map(g => X(g, b, c)), e += f.join(d ? " \\| " : " | "), e += ")") : e += Cb("any" == a.name ? "*" : a.name, b, f, c);
  }
  return e;
}, Cb = (a, b, c = "", d = {}) => {
  const {flatten:e = !1, nameProcess:f, link:g = ({link:k}) => `#${k}`} = d;
  d = Db(b, a);
  c = `${c}${a}`;
  if (!d) {
    return c;
  }
  let {link:h, type:{description:l}} = d;
  e && ((b = b.find(({fullName:k}) => k == a)) && b.link && (h = b.link), !l && b.description && (l = b.description), "function" == typeof e && e(a));
  d.link == h && (h = g(d));
  b = f ? f(c) : c;
  return l ? `<a href="${h}" title="${l.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${h})`;
}, Db = (a, b) => {
  a = a.filter(({fullName:d}) => d == b);
  if (a.length) {
    var c = a.find(({import:d}) => d || !1);
    a = a.find(({import:d}) => !d) || c;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function Eb(a, b = [], c = [], d = {}) {
  const {narrow:e = !1, preprocessDesc:f} = d;
  if (!b.length) {
    return "";
  }
  const g = a.isConstructor || a.isInterface, h = b.some(({hasDefault:n}) => n), l = {escapePipe:!e, ...d};
  let k;
  const m = n => Bb(c, n, {...l, nameProcess:d.nameProcess ? p => d.nameProcess(p, k) : void 0});
  a = b.map((n, p) => {
    k = 0 < (p + 1) % 2;
    p = n.args && n.isParsedFunction ? n.toTypeScriptFunction(m) : m(n.parsed || n.type);
    const q = g || n.optional ? n.name : `${n.name}*`, r = n.hasDefault ? `\`${n.default}\`` : "-", t = f ? f(n.description) : n.description;
    return {prop:n, typeName:p, name:q, de:Fb(t, !e), d:r, Z:k};
  });
  if (e) {
    return {props:a, anyHaveDefault:h, constr:g};
  }
  a = a.map(({name:n, typeName:p, de:q, d:r, prop:t}) => [t.optional ? n : `__${n}__`, `<em>${p}</em>`, q, ...h ? [r] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...h ? [g ? "Initial" : "Default"] : []];
  return `

\`\`\`table
${JSON.stringify([b, ...a], null, 2)}
\`\`\``;
}
const Fb = (a = "", b = !0) => {
  null === a && (a = "");
  b && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
};
const Gb = (a, b, c = {}) => {
  function d(e) {
    e.replace(/^!?/, "");
    return `\`${e}\``;
  }
  return a.split(/,\s*/).map(e => Bb(b, e, {flatten:!0, ...c, nameProcess:c.nameProcess ? f => {
    f = c.nameProcess(f);
    return /[_*~>]/.test(f) ? `<code>${f}</code>` : d(f);
  } : d})).join(", ");
};
function Hb(a) {
  var b = a.h();
  b = O(b.join("\n"));
  b += cb(a.namespace, a.name, Ib(a));
  const c = a.properties.reduce((d, e) => {
    d.push(e);
    const f = e.aliases.map(g => yb(e, g));
    d.push(...f);
    return d;
  }, []).filter(d => d instanceof W && d.isConstructor ? !1 : !0).map(d => {
    let e = V(d);
    e = O(e);
    e += cb(`${a.fullName}${d.static ? "" : ".prototype"}`, d.name);
    return e += xb(d);
  });
  return [b, ...c].join("\n");
}
function Jb(a, b = !1) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return b ? `${a.ns}${c}` : c;
}
function Kb(a, b = !1, c = !1, d = b) {
  d = ` * @typedef {${(b ? a.closureType : a.type) || a.s()}}${` ${Jb(a, d)}${a.l}`}`;
  a = (a.properties ? a.properties.reduce((e, f) => {
    if (f.g) {
      return e;
    }
    e.push(f);
    const g = f.aliases.map(h => yb(f, h));
    e.push(...g);
    return e;
  }, []) : []).filter(e => e instanceof W ? !e.isConstructor : !0).map(e => ub(e, b));
  a = [d, ...a].join("\n");
  b && !c && (a = P(a));
  return a = O(a);
}
function Ib(a) {
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
  b(a, {name:b, type:c, desc:d, noToc:e, spread:f, noExpand:g, link:h, closure:l, constructor:k, "extends":m, "interface":n, record:p, example:q, "example-override":r}, t, u = null) {
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
    t && (this.namespace = t);
    if (a) {
      const {properties:v, constructor:w} = Ab(a, u, this.file, this.fullName);
      w && (this.args = w.args);
      this.properties = v;
    }
    q && (a = {example:q}, R(a, this.file), this.examples = pb(a.example, r));
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
    const d = !!this.extends, e = Kb(this, a, b, c), f = [];
    if (this.namespace && a) {
      var g = ` * @typedef {${this.fullName}} ${this.name}${this.l}`;
      a && !b && (g = P(g));
      g = O(g);
      f.push(g);
    } else {
      this.namespace && c && (g = ` * @typedef {${this.fullName}} ${this.name}${this.l}`, g = O(g), f.push(g));
    }
    d && (c = ` * @typedef {${Jb(this, c)} & ${this.extends.split(/,\s*/).join(" & ")}} ${c ? this.fullName : this.name}${this.l}`, a && !b && (c = P(c)), c = O(c), f.push(c));
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
    c && this.examples.length && (b = qb(this.examples), d.push(...b));
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
    const h = this.spread ? Lb(this.properties) : e || f ? this.fullName : this.name;
    b = `${c || ""} * @param {${g}${h}} ${b ? `[${a}]` : a}${d}`;
    g = this.properties && !this.noExpand ? this.properties.map(l => l.C(a, c, e, f)) : [];
    return [b, ...g].join("\n");
  }
  toMarkdown(a = [], b = {}) {
    const {flatten:c, details:d = []} = b, e = d.includes(this.name);
    var f = this.type ? `\`${this.type}\`` : "", g = f;
    this.link ? g = `[${f}](${this.link})` : !this.import && this.type && (g = Bb(a, this.type, b), f = g != this.type, g = Mb(g, f));
    f = Mb(this.fullName);
    f = this.import ? `[${f}](l-type)` : this.noToc ? `[${f}](l-type)` : `[${f}](t-type)`;
    const h = this.description ? `: ${this.description}` : "";
    g = g ? `${g} ` : "";
    let l = /_/.test(f);
    if (this.extends) {
      const k = Gb(this.extends, a, b), m = ` extends ${k}`;
      l = l || /_/.test(k);
      g = (l ? g + "<strong>" : g + "__") + (f + m);
      "function" == typeof c && c(this.extends);
    } else {
      g = (l ? g + "<strong>" : g + "__") + f;
    }
    g = (l ? g + "</strong>" : g + "__") + h;
    a = Eb(this, this.properties, a, b);
    return {LINE:g, table:a, displayInDetails:e};
  }
}
const Mb = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`, Lb = (a = [], b = !1) => {
  a = a.reduce((c, d) => {
    c.push(d);
    const e = d.aliases.map(f => ({...d, name:f}));
    c.push(...e);
    return c;
  }, []);
  return `{ ${a.map(c => {
    const d = b ? c.closureType : c.type;
    let e = c.name, f = d;
    c.optional && !b ? e = `${c.name}?` : c.optional && b && (f = `(${bb(d)})`);
    return `${e}: ${f}`;
  }).join(", ")} }`;
};
class Nb extends Y {
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
;function Ob(a, b) {
  b = b.reduce((c, d) => ({...c, [d.fullName]:d}), {});
  a.A = {...a.A, ...b};
}
class Pb extends Xa {
  constructor(a, b = {}) {
    super(a);
    this.A = {};
    this.on("types", c => {
      Ob(this, c);
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
    return Nb;
  }
  get types() {
    return this.A;
  }
}
;class Qb extends Y {
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
  s() {
    return `(${this.args.map(({name:a, type:b, optional:c}) => `${a}${c ? "?" : ""}: ${b}`).join(", ")}) => ${this.return}`;
  }
  m(a) {
    a = super.m(a);
    this.f && (this.f = this.f.replace(a, "$1"));
  }
}
;const Rb = (a, b) => {
  const c = new RegExp(`([!?])?${a}\\.`, "g");
  b.properties.forEach(d => {
    rb(d, a, c);
  });
  b.m(a);
}, Sb = (a, b) => {
  var {args:c = []} = a, d = c.map(({I:f}) => f).join(", ");
  let e = `new: ${a.fullName}`;
  d.length && (e = `${e}, `);
  d = `function(${e}${d})`;
  c = new W(c);
  c.isConstructor = !0;
  c.b("Constructor method.", {type:d, name:"constructor"});
  c.examples = a.examples;
  rb(c, b);
  a.properties.unshift(c);
}, Ub = (a, b, c = null) => {
  a = S("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:d, props:{namespace:e, ns:f = e}}] = a, g = b == f ? void 0 : f;
  a = S(["embed"], d).map(({props:k}) => k);
  const h = [], l = S("type interface constructor method import record".split(" "), d).reduce((k, {content:m, props:n, tag:p}) => {
    "record" == p && (p = "type", n.record = !0);
    const {alias:q, aliases:r, ...t} = n;
    c && R(t, c);
    var u = q ? [q] : r ? r.split(/, */) : [];
    switch(p) {
      case "type":
        p = new Y;
        c && (p.file = c);
        p.b(m, n, g, b);
        k.push(p);
        u.forEach(v => {
          const w = new Y;
          c && (w.file = c);
          w.b(m, {...t, name:v}, g, b);
          k.push(w);
        });
        break;
      case "interface":
        n = Tb({content:m, props:n, ns:g, B:b, location:c});
        n.forEach(v => {
          v.properties.some(({isConstructor:w}) => w) || Sb(v, b);
          v.isInterface = !0;
        });
        k.push(...n);
        break;
      case "constructor":
        n = Tb({content:m, props:n, ns:g, B:b, location:c});
        n.forEach(v => {
          v.properties.some(({isConstructor:w}) => w) || Sb(v, b);
          v.isConstructor = !0;
        });
        k.push(...n);
        break;
      case "method":
        n = Tb({content:m, props:n, ns:g, B:b, isMethod:!0, location:c});
        k.push(...n);
        break;
      case "import":
        u = new Nb, u.b(m, n, n.ns || n.from, b), h.push(u);
    }
    return k;
  }, []);
  b && l.forEach(k => Rb(b, k));
  return {namespace:f, types:l, imports:h, embeds:a};
}, Vb = (a, b, c, d, e = !1, f = null) => {
  const g = e ? new Qb : new Y;
  g.file = f;
  f = a.search(/<(prop|function|fn|static) /);
  let h = "", l = a;
  1 != f && (h = a.slice(0, f), l = a.slice(f));
  const {F:k, J:m} = nb(h, d);
  g.b(e ? m : l, b, c, d);
  ({H:a} = db(b, k));
  e && (g.closureType = a);
  g.args || (g.args = k);
  return g;
}, Tb = ({content:a, props:b, ns:c, B:d, isMethod:e = !1, location:f = null}) => {
  const g = [], {alias:h, aliases:l, ...k} = b;
  b = Vb(a, b, c, d, e, f);
  g.push(b);
  (h ? [h] : l ? l.split(/, */) : []).forEach(m => {
    m = Vb(a, {...k, name:m}, c, d, e, f);
    m.description = `${m.description}${m.description ? " " : ""}Alias of \`${k.name}\`.`;
    g.push(m);
  });
  return g;
}, Wb = async(a, b = []) => {
  const c = await G(a);
  let d, e, f, g;
  try {
    ({namespace:d = null, types:e, imports:f, embeds:g} = Ub(c, void 0, a));
  } catch (h) {
    throw h.message = `Error while reading ${a}\n${h.message}`, h;
  }
  e = e.filter(({fullName:h}) => b.includes(h) ? !1 : !0);
  f = f.filter(({fullName:h}) => b.includes(h) ? !1 : !0);
  return {types:e, imports:f, namespace:d, embeds:g};
};
const Xb = (a, b, c) => {
  b = b.map(d => d.g(!0, c));
  a = a.map(d => {
    d = d.g();
    return O(c ? d : P(d));
  });
  return [...b, ...a].join("");
}, Yb = (a, b, c, d = !1) => {
  a = [...a.map(e => {
    {
      let f;
      e.closureType ? f = ` * @typedef {${e.closureType}}` : e.u || (f = ` * @typedef {${Lb(e.properties, !0)}}`);
      f ? (e.description && (f = ` * ${e.description}\n${f}`), f = O(f), e = f += cb(e.namespace, e.name)) : e = Hb(e);
    }
    return e;
  })].join("\n");
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
async function Zb(a, b, c) {
  const [d, ...e] = c.split(/\s+/), f = e.includes("closure"), g = e.includes("externs"), h = e.includes("noSuppress"), l = e.includes("skipNsDecl"), k = e.includes("namespace");
  let m = e.find(q => q.startsWith("ignore:"));
  m = m ? m.replace("ignore:", "").split(",") : [];
  let {o:n, w:p} = this.f;
  f && (n = !0);
  g && (p = !0);
  try {
    this.i("Detected type marker: %s", c);
    const {types:q, imports:r, namespace:t, embeds:u} = await Wb(d, m);
    this.emit("types", q);
    this.emit("types", r);
    let v = (await Promise.all(u.map(async({src:C, path:fc = C, ignore:N, namespace:gc, o:hc, w:ic, "no-suppress":jc}) => {
      C = [fc];
      N && C.push(`ignore:${N}`);
      gc && C.push("namespace");
      hc && C.push("closure");
      ic && C.push("ext");
      jc && C.push("noSuppress");
      N = C.join(" ");
      return await Zb.call(this, `\n /* typal-embed ${N} */\n`, "typal-embed", N);
    }))).join(""), w;
    n ? w = Xb(r, q, h) : p ? (w = Yb(q, t, this.b, l) + "\n", t && this.emit("namespace", t)) : k ? (t && this.emit("namespace", t), w = $b(r, q, !0)) : w = $b(r, q);
    return `/* ${b} ${c} */\n${w}${v}`;
  } catch (q) {
    return this.i("(%s) Could not process typedef-js: %s", c, q.message), process.env.b && console.error(q.stack), a;
  }
}
const ac = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:Zb}, $b = (a, b, c = !1) => {
  b = b.map(d => d.g(!1, !1, c));
  a = a.map(d => d.g(c)).map(O).join("");
  b = b.join("");
  return `${a}${b}`.replace(bc, " * @typedef");
}, bc = / \*\/\n\/\*\*\n \* @typedef/g;
const dc = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?(?:(?!\n\s*\*(?:\/|\s*@))[\s\S])*)*)/gm, replacement:cc};
function cc(a, b, c, d, e, f, g) {
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
      const {line:p, P:q} = n;
      this.i("%s:%s:%s", this.file, p, q);
    }
  };
  try {
    k = kb(c);
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
  return !c || c instanceof Pb.Import ? a : c.C(e, d, b, k.nullable, h, l);
}
const Z = (a, b, c, d, e) => {
  if (a) {
    var f = a.name;
    if (!f || !"string number boolean null undefined symbol any".split(" ").includes(f)) {
      if (f && !a.application && !a.function) {
        let h = b.includes(f);
        h || (h = ec.includes(f));
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
}, ec = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var kc = (a, b = !1) => {
  var {S:c} = Sa();
  const d = Ua(c);
  c = Ta(c);
  return new Pb(b ? [ac] : [ac, d, dc, c], a);
};
const lc = /( *) \* @(fnType|methodType) {(.+?)}/gm, mc = (a, b, c, d, e, f, g = d) => `/**
${a}
 */
${b ? "static " : ""}${c ? "async " : ""}${d}(${e}) {
  return ${`${b ? f : "super"}.${g}`}(${e})
}`;
class nc extends Xa {
  constructor(a, b) {
    super([{re:/\/\*\*\s+( *) \* @constructor {(.+?)}[\s\S]+?(class\s+.+?\s+extends\s+(.+?)\s*){\s*}/gm, replacement(c, d, e, f, g) {
      d = a.find(({fullName:k}) => k == e);
      if (!d) {
        return console.error("Type %s in %s not found", e, b), c;
      }
      c = d.properties.filter(k => k instanceof W && !k.isConstructor).map(k => {
        const m = k.name;
        var n = k.aliases;
        const p = k.static, q = k.async;
        let r = V(k, "", !0);
        r = oc(r, e);
        const t = k.args.map(({name:u}) => u).join(", ");
        k = mc(r, p, q, m, t, g);
        n = n.map(u => mc(r + `\n * @alias ${m} An alias for **${m}**.`, p, q, u, t, g, m));
        return [k, ...n].join("\n");
      });
      const h = d.properties.find(k => k instanceof W && k.isConstructor), l = h.args.map(({name:k}) => k).join(", ");
      c = [`/**
${oc(V(h, "", !0), e)}
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
    }}, {re:lc, async replacement(c, d, e, f) {
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
        return f.h(d, !1, !0).join("\n");
      }
      e = f.properties.find(({name:k}) => k == l);
      return e ? e.parsed ? V(e, d, !0) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", l, h, b), c) : (console.error("Property %s of type %s in %s not found", l, h, b), c);
    }}]);
  }
}
const oc = (a, b) => a.replace(`\n * @return {${b}}`, "").replace(`\n * @return {!${b}}`, "").replace(`\n * @return {?${b}}`, "");
const pc = async a => a ? (await Promise.all(a.split(",").map(async b => {
  var c = [];
  const d = await I(A, b);
  d.isFile() ? c = [b] : d.isDirectory() && (c = await K(b), c = L(c.content, b), c = c.filter(e => e.endsWith(".xml")));
  return c;
}))).reduce((b, c) => [...b, ...c], []) : [], qc = async a => (await Promise.all(a.map(async b => ({...await Wb(b), location:b})))).reduce((b, {imports:c, types:d}) => {
  b.push(...c);
  b.push(...d);
  return b;
}, []);
async function rc() {
  const a = await pc(la), b = await qc(a);
  await Promise.all(y.map(async c => {
    var d = await I(A, c);
    let e;
    d.isFile() ? e = [c] : d.isDirectory() && (d = await K(c), e = L(d.content, c));
    await sc(e, b, ma);
  }));
}
const sc = async(a, b = [], c = null) => {
  await Promise.all(a.map(async d => {
    var e = await G(d);
    const f = new nc(b, d);
    f.end(e);
    e = await F(f);
    "-" == c ? console.log(e) : c ? await H(c, e) : await H(d, e);
  }));
};
var uc = async() => {
  const {o:a = !1, D:b = !1, w:c = !1, V:d, types:e} = {o:ia, w:ka, V:z, types:la, D:ja}, f = await pc(e);
  await Promise.all(y.map(async g => {
    var h = await I(A, g);
    let l;
    h.isFile() ? l = [g] : h.isDirectory() && (h = await K(g), l = L(h.content, g));
    await tc(l, a, c, d, f, b);
  }));
};
const tc = async(a, b = !1, c = !1, d = "", e = [], f = !1) => {
  const g = [];
  await Promise.all(e.map(async h => {
    h = await G(h);
    const {types:l, imports:k} = Ub(h);
    g.push(l, k);
  }));
  await Promise.all(a.map(async h => {
    var l = await G(h);
    const k = kc({o:b, w:c, D:f}, c);
    g.forEach(m => k.emit("types", m));
    k.file = h;
    k.i = console.error;
    k.lines = l.split("\n");
    k.end(l);
    l = await F(k);
    "-" == d ? console.log(l) : d ? await H(d, l) : await H(h, l);
  }));
};
const vc = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, wc = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, xc = "type opt name quote defaultValue description Default".split(" "), Za = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), yc = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class zc extends B {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform({type:a, name:b, description:c, properties:d}, e, f) {
    a = a && a.startsWith("import") ? Ac(a, b) : yc(a, b, c, d);
    this.push(a);
    d.forEach(({type:g, name:h, default:l, description:k, optional:m}) => {
      {
        g = ["string", "number", "boolean"].includes(g) ? ` ${g}` : ` type="${g}"`;
        var n = void 0 !== l;
        l = n ? ` default="${l}"` : "";
        m = m && !n ? " opt" : "";
        n = " ".repeat(4);
        const p = " ".repeat(6);
        h = `${n}<prop${m}${g} name="${h}"${l}${k ? `>\n${p}${k}\n${n}</prop>` : "/>"}\n`;
      }
      this.push(h);
    });
    d.length && this.push("  </type>\n");
    f();
  }
}
const Ac = (a, b) => {
  const c = /import\((['"])(.+?)\1\)/.exec(a);
  if (!c) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = c;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class Bc extends B {
  constructor() {
    super({objectMode:!0});
  }
  _transform([, a, b, c, d], e, f) {
    d = eb(wc, d, xc).map(g => {
      const {defaultValue:h, Default:l, opt:k, name:m, type:n, ...p} = g;
      g = {...p, name:m, type:n, ...h ? {defaultValue:vc(h)} : {}, ...l ? {v:vc(l)} : {}, ...k ? {optional:!0} : {}};
      if (h || l) {
        if (h) {
          h !== l && void 0 !== g.v && (q = $a(m, l, n), console.error("%s[%s] does not match Default `%s`.", b, q, g.v));
        } else {
          var q = $a(m, l, n);
          console.error("%s[%s] got from Default.", b, q);
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
async function Cc(a) {
  const b = Ya(), c = new Bc, d = new zc;
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
;var Dc = async() => {
  await Promise.all(y.map(async a => {
    a = await G(a);
    a = await Cc(a);
    z ? await H(z, a) : console.log(a);
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
    return na ? await Dc() : ma ? await rc() : await uc();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map