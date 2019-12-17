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
  const f = d ? new RegExp(`^-(${d}|-${b})$`) : new RegExp(`^--${b}$`);
  b = a.findIndex(g => f.test(g));
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
help:{description:"Print the help information and exit.", boolean:!0, short:"h"}, version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, w = function(a = {}, b = process.argv) {
  let [, , ...d] = b;
  const c = ea(d);
  d = d.slice(c.length);
  a = Object.entries(a).reduce((g, [h, k]) => {
    g[h] = "string" == typeof k ? {short:k} : k;
    return g;
  }, {});
  const e = [];
  a = Object.entries(a).reduce((g, [h, k]) => {
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
          const {index:u, length:C} = t;
          void 0 !== u && C && e.push({index:u, length:C});
        }
      }
    } catch (m) {
      return g;
    }
    return void 0 === l ? g : {...g, [h]:l};
  }, {});
  let f = d;
  e.forEach(({index:g, length:h}) => {
    Array.from({length:h}).forEach((k, l) => {
      f[g + l] = null;
    });
  });
  f = f.filter(g => null !== g);
  Object.assign(a, {T:f});
  return a;
}(fa), x = w.source, ia = w.output, ja = w.closure, ka = w.useNamespace, la = w.externs, ma = w.types, na = w.template, oa = w.migrate, pa = w.help, qa = w.version;
function ra(a = {usage:{}}) {
  const {usage:b = {}, description:d, line:c, example:e} = a;
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
  const k = [d, `  ${c || ""}`].filter(l => l ? l.trim() : l).join("\n\n");
  a = `${k ? `${k}\n` : ""}
${a.join("\n")}
`;
  return e ? `${a}
  Example:

    ${e}
` : a;
}
;const {createReadStream:sa, createWriteStream:ta, lstat:z, readFileSync:ua, readdir:va} = fs;
var wa = stream;
const {Transform:A, Writable:xa} = stream;
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
const {homedir:Ba} = os;
const Ea = /\s+at.*(?:\(|\s)(.*)\)?/, Fa = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ga = Ba(), B = a => {
  const {pretty:b = !1, ignoredModules:d = ["pirates"]} = {}, c = d.join("|"), e = new RegExp(Fa.source.replace("IGNORED_MODULES", c));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Ea);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Ea, (g, h) => g.replace(h, h.replace(Ga, "~"))) : f).join("\n");
};
function Ha(a, b, d = !1) {
  return function(c) {
    var e = Aa(arguments), {stack:f} = Error();
    const g = ya(f, 2, !0), h = (f = c instanceof Error) ? c.message : c;
    e = [`Error: ${h}`, ...null !== e && a === e || d ? [b] : [g, b]].join("\n");
    e = B(e);
    return Object.assign(f ? c : Error(), {message:h, stack:e});
  };
}
;function D(a) {
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
    const {binary:b = !1, rs:d = null, ...c} = a || {}, {N:e = D(!0), proxyError:f} = a || {}, g = (h, k) => e(k);
    super(c);
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
          const m = B(l.stack);
          l.stack = m;
          f && g`${l}`;
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
    return this.L;
  }
}
const E = async a => {
  ({f:a} = new Ja({rs:a, N:D(!0)}));
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
  const d = D(!0), c = ta(a);
  await new Promise((e, f) => {
    c.on("error", g => {
      g = d(g);
      f(g);
    }).on("close", e).end(b);
  });
}
;function Ka(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function I(a, b, d) {
  const c = D(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const {length:e} = a;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((f, g) => {
    const h = (l, m) => l ? (l = c(l), g(l)) : f(d || m);
    let k = [h];
    Array.isArray(b) ? (b.forEach((l, m) => {
      Ka(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (Ka(e, 0), k = [b, h]);
    a(...k);
  });
}
;const {join:J, relative:La} = path;
async function Ma(a, b) {
  b = b.map(async d => {
    const c = J(a, d);
    return {lstat:await I(z, c), path:c, relativePath:d};
  });
  return await Promise.all(b);
}
const Na = a => a.lstat.isDirectory(), Oa = a => !a.lstat.isDirectory();
async function K(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  const {ignore:b = []} = {};
  if (!(await I(z, a)).isDirectory()) {
    var d = Error("Path is not a directory");
    d.code = "ENOTDIR";
    throw d;
  }
  d = await I(va, a);
  var c = await Ma(a, d);
  d = c.filter(Na);
  c = c.filter(Oa).reduce((e, f) => {
    var g = f.lstat.isDirectory() ? "Directory" : f.lstat.isFile() ? "File" : f.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...e, [f.relativePath]:{type:g}};
  }, {});
  d = await d.reduce(async(e, {path:f, relativePath:g}) => {
    const h = La(a, f);
    if (b.includes(h)) {
      return e;
    }
    e = await e;
    f = await K(f);
    return {...e, [g]:f};
  }, {});
  return {content:{...c, ...d}, type:"Directory"};
}
const L = (a, b) => {
  let d = [], c = [];
  Object.keys(a).forEach(f => {
    const {type:g} = a[f];
    "File" == g ? d.push(J(b, f)) : "Directory" == g && c.push(f);
  });
  const e = c.reduce((f, g) => {
    const {content:h} = a[g];
    g = L(h, J(b, g));
    return [...f, ...g];
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
    return b.filter(Pa).reduce((c, {re:e, replacement:f}) => {
      if (this.j) {
        return c;
      }
      if ("string" == typeof f) {
        return c = c.replace(e, f);
      }
      {
        let g;
        return c.replace(e, (h, ...k) => {
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
  d.b = () => {
    d.j = !0;
  };
  return d.call(d);
}
;const Ra = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Sa = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, Ta = () => {
  var a = {O:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
  return Object.keys(a).reduce((b, d) => {
    {
      var c = a[d];
      const {getReplacement:e = Sa, getRegex:f = Ra} = {}, g = f(d);
      c = {name:d, re:c, regExp:g, getReplacement:e, map:{}, lastIndex:0};
    }
    return {...b, [d]:c};
  }, {});
}, Ua = a => {
  var b = [];
  const {regExp:d, map:c} = a;
  return {re:d, replacement(e, f) {
    e = c[f];
    delete c[f];
    return Qa(e, Array.isArray(b) ? b : [b]);
  }};
}, Va = a => {
  const {re:b, map:d, getReplacement:c, name:e} = a;
  return {re:b, replacement(f) {
    const {lastIndex:g} = a;
    d[g] = f;
    a.lastIndex += 1;
    return c(e, g);
  }};
};
async function Wa(a, b) {
  return Xa(a, b);
}
class N extends A {
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
        let f;
        const g = b.replace(d, (h, ...k) => {
          f = Error();
          try {
            if (this.j) {
              return e.length ? e.push(Promise.resolve(h)) : h;
            }
            const l = c.call(this, h, ...k);
            l instanceof Promise && e.push(l);
            return l;
          } catch (l) {
            M(f, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(d, () => h.shift());
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
  async _transform(a, b, d) {
    try {
      const c = await this.reduce(a);
      this.push(c);
      d();
    } catch (c) {
      a = B(c.stack), c.stack = a, d(c);
    }
  }
}
async function Xa(a, b) {
  b instanceof wa ? b.pipe(a) : a.end(b);
  return await E(a);
}
;function Ya() {
  var a = Za;
  let b = "";
  const d = new A({transform(c, e, f) {
    let g;
    for (b += c.toString(); (c = a.exec(b)) && (d.push(c), g = c, a.global);) {
    }
    g && (b = b.slice(g.index + g[0].length));
    f();
  }, objectMode:!0});
  return d;
}
;const $a = (a, b, d, c) => {
  if (!a) {
    throw Error("The name of the property is not given");
  }
  a = `${c ? `${c}.` : ""}${a}`;
  if (null === b) {
    return a;
  }
  b = Number.isInteger(b) || [!0, !1, "null"].includes(b) || ["number", "boolean"].includes(d) ? b : `"${b}"`;
  return `${a}=${b}`;
}, ab = ({number:a, J:b, boolean:d, type:c}) => b ? "string" : a ? "number" : d ? "boolean" : c ? c : "*", bb = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, O = a => a ? `/**
${a}
 */
` : "/**\n */\n", P = a => ` * @suppress {nonStandardJsDocs}
${a}`, cb = (a, b, d) => {
  a = `${a ? "" : "var "}${a ? `${a}.` : ""}${b}`;
  d && (a += ` = ${d}`);
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
    return d.map(f => f.replace(e, "")).join("\n");
  }
}, db = (a, b, d = null) => {
  const {async:c, "void":e, "return":f = e ? "void" : "", ...g} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({G:h, name:k}) => "this" == k ? `${k}: ${h}` : k.startsWith("...") ? `...${h}` : h).join(","));
  b = f.replace(/\n\s*/g, " ");
  c && b ? b = `!Promise<${b}>` : c && (b = "!Promise");
  !b && "constructor" == g.name && d && (b = d);
  d = `function(${a})`;
  b && (d += `: ${b}`);
  return {R:{...g, async:c}, F:d};
};
function eb(a, b, d) {
  const c = [];
  b.replace(a, (e, ...f) => {
    e = f.slice(0, f.length - 2).reduce((g, h, k) => {
      k = d[k];
      if (!k || void 0 === h) {
        return g;
      }
      g[k] = h;
      return g;
    }, {});
    c.push(e);
  });
  return c;
}
;const fb = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), gb = new RegExp(`(?:\\s+((?:${fb.source}\\s*)*))`);
const R = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return eb(new RegExp(`<(${a})${gb.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:d, a:c = "", c:e = ""}) => {
    c = c.replace(/\/$/, "").trim();
    c = hb(c);
    return {content:e, props:c, tag:d};
  });
}, hb = a => eb(fb, a, ["key", "val", "def", "f"]).reduce((b, {key:d, val:c}) => {
  if (void 0 === c) {
    return b[d] = !0, b;
  }
  b[d] = "true" == c ? !0 : "false" == c ? !1 : /^\d+$/.test(c) ? parseInt(c, 10) : c;
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
  const d = (e = 1) => a[b + e], c = (e = !0, f = []) => {
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
      g = {...c(!0, []), ...g};
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
        l = g;
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
      g.name += ".";
      b++;
      ({name:l} = c(!1));
      if (!l) {
        throw Error("Expected to see the name after .");
      }
      g.name += l;
    }
    if ("|" != a[b] || !e) {
      return g;
    }
    for (f.push(g); "|" == a[b];) {
      b++, g = c(!0, f), g.union !== f && f.push(g);
    }
    return {union:f};
  };
  return c();
}
;function kb(a) {
  a = ib(a);
  return jb(a);
}
;function lb(a, b, {name:d, string:c, "boolean":e, opt:f, number:g, type:h}, k) {
  if (!d) {
    throw Error("Argument does not have a name.");
  }
  a.name = d;
  b && (a.description = Q(b));
  b = ab({number:g, J:c, boolean:e, type:h});
  k && (b = b.replace(new RegExp(`([!?])?${k}\\.`, "g"), "$1"));
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
  get G() {
    return this.optional ? `${this.type}=` : this.type;
  }
}
const nb = (a, b) => {
  let d = a.lastIndexOf("</arg>"), c = a;
  var e = [];
  -1 != d && (d += 6, e = a.slice(0, d), c = a.slice(d), e = R("arg", e), e = e.map(({content:f, props:g}) => {
    const h = new mb;
    lb(h, f, g, b);
    return h;
  }));
  return {H:c, D:e};
};
function S(a) {
  if ("" == a.name && a.nullable) {
    return "?";
  }
  var b = "";
  a.nullable ? b = "?" : !1 === a.nullable && (b = "!");
  if (a.function) {
    b += a.name + "(";
    const c = [];
    if (a.function.this) {
      var d = "this: " + S(a.function.this);
      c.push(d);
    }
    a.function.new && (d = "new: " + S(a.function.new), c.push(d));
    a.function.args.forEach(e => {
      let f = S(e);
      e.optional && (f += "=");
      c.push(f);
    });
    a.function.variableArgs && (d = "..." + S(a.function.variableArgs), c.push(d));
    d = c.join(", ");
    b += d + ")";
    a.function.return && (b += ": " + S(a.function.return));
  } else {
    if (a.record) {
      b += "{ ", d = Object.keys(a.record).map(c => {
        var e = a.record[c];
        if (!e) {
          return c;
        }
        e = S(e);
        return `${c}: ${e}`;
      }), b += d.join(", "), b += " }";
    } else {
      if (a.application) {
        if ("Promise" == a.name && !a.application.some(c => "void" != c.name)) {
          return b + "Promise";
        }
        b += a.name + "<";
        d = a.application.map(c => S(c));
        b += d.join(", ");
        b += ">";
      } else {
        a.union ? (b += "(", d = a.union.map(c => S(c)), b += d.join("|"), b += ")") : b += "any" == a.name ? "*" : a.name;
      }
    }
  }
  return b;
}
;const T = (a, b = !1) => a.split("\n").map((d, c) => {
  if (b && !c) {
    return d;
  }
  c = " *";
  d.length && (c += " ");
  return c + d;
}).join("\n"), ob = a => {
  const b = a.replace(/^\s*\n/gm, "").replace(/[^\s]/g, "").split("\n").reduce((d, c) => c.length < d ? c.length : d, Infinity);
  return a.replace(new RegExp(`^ {${b}}`, "gm"), "");
};
function pb(a, b = "") {
  const d = b.split(/\s*,\s*/);
  return a.split(/\s*,\s*/).map(c => {
    let e = c = ua(c, "utf8");
    if (c = /\/\* start example \*\/\r?\n([\s\S]+?)\r?\n\s*\/\* end example \*\//.exec(c)) {
      [, c] = c, e = ob(c);
    }
    d.forEach(f => {
      const [g, h] = f.split(/\s*=>\s*/);
      e = e.replace(`'${g}'`, `'${h}'`);
      e = e.replace(`"${g}"`, `"${h}"`);
    });
    return e = e.replace(/@/g, "\uff20");
  });
}
function qb(a) {
  const b = [];
  b.push(" * @example");
  a.forEach(d => {
    let c = [], e = [], f = "", g;
    d = d.split("\n").reduce((h, k) => {
      k.startsWith("///") ? (g = "comment", c.push(k)) : (g = "block", e.push(k));
      f || (f = g);
      g != f && ("block" == g ? (h.push(c.join("\n")), c = []) : (h.push(e.join("\n")), e = []), f = g);
      return h;
    }, []);
    c.length ? d.push(c.join("\n")) : e.length && d.push(e.join("\n"));
    d = d.reduce((h, k) => {
      k.startsWith("///") ? (k = k.replace(/^\/\/\/\s+/gm, ""), h.push(...k.split("\n"))) : (h.push("```js"), h.push(...k.split("\n")), h.push("```"));
      return h;
    }, []);
    d = d.map(h => T(h));
    b.push(...d);
  });
  return b;
}
function rb(a, b, d = new RegExp(`([!?])?${b}\\.`, "g")) {
  b && (a.type = a.type.replace(d, "$1"));
}
function sb(a, b = !1) {
  return b ? a.closureType : a.isParsedFunction ? a.toTypeScriptFunction(S) : a.type;
}
function tb(a, b = null, d = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = $a(a.name, a.optional ? a.default : null, a.type, b);
  b = a.optional ? `[${b}]` : b;
  var {m:c} = a;
  c = c ? ` ${c}` : "";
  return `{${sb(a, d)}} ${b}${c}`;
}
function ub(a, b = !1) {
  a = tb(a, null, b);
  return ` * @prop ${T(a, !0)}`;
}
function vb(a) {
  const b = [], {function:{args:d, return:c, variableArgs:e, this:f}} = a.parsed;
  d.map(h => S(h)).forEach((h, k) => {
    const {optional:l} = d[k], {name:m = `arg${k}`, description:n} = a.args[k] || {};
    b.push(` * @param {${h}${l ? "=" : ""}} ${l ? `[${m}]` : m}${n ? ` ${n}` : ""}`);
  });
  if (e) {
    const {K:h, S:k} = wb(a.args || []);
    var g = [h, k].filter(Boolean).join(" ");
    b.push(` * @param {...${S(e)}} ${g}`);
  }
  f && b.push(` * @this {${S(f)}}`);
  c && "void" != c.name && (g = S(c), b.push(` * @return {${g}}`));
  return b;
}
function xb(a) {
  if (a.isParsedFunction) {
    const {function:{args:b, variableArgs:d}} = a.parsed, c = b.map((e, f) => {
      ({name:e = `arg${f}`} = a.l[f] || {});
      return e;
    });
    if (d) {
      const {K:e} = wb(a.args || []);
      c.push(`...${e}`);
    }
    return ` = function(${c.join(", ")}) {}`;
  }
  return a.type.startsWith("function(") ? " = function() {}" : "";
}
function U(a, b = "", d = !1) {
  let c = [];
  var {m:e} = a;
  e && (e = T(e), c.push(...e.split("\n")));
  !a.optional && a.isParsedFunction ? (e = vb(a), c.push(...e)) : c.push(` * @type {${a.optional ? bb(a.closureType) : a.closureType}}`);
  d && a.examples.length && (a = qb(a.examples), c.push(...a));
  b && (c = c.map(f => `${b}${f}`));
  return c.join("\n");
}
function yb(a, b) {
  const d = Object.assign(Object.create(Object.getPrototypeOf(a)), a);
  d.description = `An alias for \`${a.name}\`.`;
  d.name = b;
  return d;
}
class zb {
  constructor(a = null) {
    this.g = this.description = this.name = null;
    this.closureType = "";
    this.default = this.h = null;
    this.optional = !1;
    this.aliases = [];
    this.o = !1;
    this.parsed = null;
    this.args = a;
    this.f = !1;
    this.examples = [];
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    const {function:{args:b, return:d, this:c, variableArgs:e}} = this.parsed;
    var f = b.map(h => a(h)).map((h, k) => {
      const {optional:l} = b[k];
      let {name:m = `arg${k}`, optional:n = l} = this.l[k] || {};
      return `${`${m}${n ? "?" : ""}`}: ${h}`;
    });
    if (c) {
      var g = a(c);
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
    g = d ? a(d) : "?";
    return `(${f}) => ${g}`;
  }
  get static() {
    return this.f;
  }
  get hasDefault() {
    return null !== this.default;
  }
  b(a, {name:b, string:d, "boolean":c, opt:e, number:f, type:g, "default":h, closure:k, alias:l, aliases:m, example:n, "example-override":p = "", noParams:q, "static":r, initial:t}) {
    if (!b) {
      throw Error("Property does not have a name.");
    }
    this.name = b;
    a && (this.description = Q(a));
    a = ab({number:f, J:d, boolean:c, type:g});
    q && (this.o = q);
    k && (this.h = k);
    this.type = a;
    void 0 !== h ? this.default = h : void 0 !== t && (this.default = t);
    if (e || void 0 !== h) {
      this.optional = !0;
    }
    l && (this.aliases = [l]);
    m && (this.aliases = m.split(/\s*,\s*/));
    r && (this.f = !0);
    n && (this.examples = pb(n, p));
  }
  get type() {
    return this.g || "*";
  }
  set type(a) {
    this.g = a || null;
    this.closureType = this.h || this.g || "";
    if (!this.o) {
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
  B(a, b = "", d = !1) {
    a = tb(this, a, d);
    const [c, ...e] = a.split("\n");
    return [`@param ${c}`, ...e].map(f => `${b} * ${f}`).join("\n");
  }
}
const wb = a => {
  let b = "args";
  const {name:d = "", description:c} = a[a.length - 1] || {};
  d.startsWith("...") && (b = d.replace("...", ""));
  return {K:b, S:c};
};
class V extends zb {
  constructor(...a) {
    super(...a);
    this.isConstructor = this.async = !1;
  }
  b(a, b) {
    super.b(a, b);
    "constructor" == b.name && (this.isConstructor = !0);
    this.async = b.async;
  }
}
;const X = (a, b, d = {}) => {
  let c;
  if ("object" == typeof b) {
    c = b;
  } else {
    try {
      (c = kb(b)) || console.log("Could not parse %s", b);
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
  var f = "";
  a.nullable ? f = "?" : !1 === a.nullable && (f = "!");
  if (a.function) {
    e = e + f + (a.name + "(");
    const g = [];
    a.function.this && (c = "this: " + W(a.function.this, b, d), g.push(c));
    a.function.new && (c = "new: " + W(a.function.new, b, d), g.push(c));
    a.function.args.forEach(h => {
      let k = W(h, b, d);
      h.optional && (k += "=");
      g.push(k);
    });
    a.function.variableArgs && (c = "..." + W(a.function.variableArgs, b, d), g.push(c));
    c = g.join(", ");
    e += c + ")";
    a.function.return && (e += ": " + W(a.function.return, b, d));
  } else {
    a.record ? (e += "{ ", c = Object.keys(a.record).map(g => {
      var h = a.record[g];
      if (!h) {
        return g;
      }
      h = W(h, b, d);
      return `${g}: ${h}`;
    }), e += c.join(", "), e += " }") : a.application ? (e += Ab(a.name, b, f, d) + "&lt;", c = a.application.map(g => W(g, b, d)), e += c.join(", "), e += "&gt;") : a.union ? (e = e + f + "(", f = a.union.map(g => W(g, b, d)), e += f.join(c ? " \\| " : " | "), e += ")") : e += Ab("any" == a.name ? "*" : a.name, b, f, d);
  }
  return e;
}, Ab = (a, b, d = "", c = {}) => {
  const {flatten:e = !1, nameProcess:f, link:g = ({link:l}) => `#${l}`} = c;
  c = Bb(b, a);
  d = `${d}${a}`;
  if (!c) {
    return d;
  }
  let {link:h, type:{description:k}} = c;
  h = g(c);
  e && ((b = b.find(({fullName:l}) => l == a)) && b.link && (h = b.link), !k && b.description && (k = b.description), "function" == typeof e && e(a));
  b = f ? f(d) : d;
  return k ? `<a href="${h}" title="${k.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${h})`;
}, Bb = (a, b) => {
  a = a.filter(({fullName:c}) => c == b);
  if (a.length) {
    var d = a.find(({import:c}) => c || !1);
    a = a.find(({import:c}) => !c) || d;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function Cb(a, b = [], d = [], c = {}) {
  const {narrow:e = !1, flatten:f = !1, preprocessDesc:g, link:h} = c;
  if (!b.length) {
    return "";
  }
  const k = a.isConstructor || a.isInterface, l = b.some(({hasDefault:p}) => p), m = {flatten:f, escapePipe:!e, link:h}, n = p => X(d, p, m);
  a = b.map(p => {
    let q;
    p.args && p.isParsedFunction ? (q = p.toTypeScriptFunction(n), p.isConstructor && (q = `new ${q}`)) : q = X(d, p.parsed || p.type, m);
    const r = k || p.optional ? p.name : `${p.name}*`, t = p.hasDefault ? `\`${p.default}\`` : "-", u = g ? g(p.description) : p.description;
    return {prop:p, typeName:q, name:r, de:Db(u, !e), d:t};
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
const Db = (a = "", b = !0) => {
  null === a && (a = "");
  b && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
};
function Eb(a) {
  var b = a.g();
  b = O(b.join("\n"));
  b += cb(a.namespace, a.name, Fb(a));
  const d = a.properties.reduce((c, e) => {
    c.push(e);
    const f = e.aliases.map(g => yb(e, g));
    c.push(...f);
    return c;
  }, []).filter(c => c instanceof V && c.isConstructor ? !1 : !0).map(c => {
    let e = U(c);
    e = O(e);
    e += cb(`${a.fullName}${c.static ? "" : ".prototype"}`, c.name);
    return e += xb(c);
  });
  return [b, ...d].join("\n");
}
function Gb(a, b = !1) {
  const d = `${a.extends ? "$" : ""}${a.name}`;
  return b ? `${a.ns}${d}` : d;
}
function Hb(a, b = !1, d = !1, c = b) {
  c = ` * @typedef {${(b ? a.closureType : a.type) || a.m()}}${` ${Gb(a, c)}${a.h}`}`;
  a = (a.properties ? a.properties.reduce((e, f) => {
    if (f.f) {
      return e;
    }
    e.push(f);
    const g = f.aliases.map(h => yb(f, h));
    e.push(...g);
    return e;
  }, []) : []).map(e => ub(e, b));
  a = [c, ...a].join("\n");
  b && !d && (a = P(a));
  return a = O(a);
}
function Fb(a) {
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
  }
  get import() {
    return !1;
  }
  b(a, {name:b, type:d, desc:c, noToc:e, spread:f, noExpand:g, link:h, closure:k, constructor:l, "extends":m, "interface":n, record:p, example:q, "example-override":r}, t, u = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    d && (this.type = d);
    k ? this.closureType = k : this.closureType = this.type;
    c && (this.description = Q(c));
    this.noToc = !!e;
    this.spread = !!f;
    this.noExpand = !!g;
    h && (this.link = h);
    !0 === l && (this.isConstructor = l);
    !0 === n && (this.isInterface = n);
    !0 === p && (this.isRecord = p);
    m && (this.extends = m);
    t && (this.namespace = t);
    if (a) {
      b = R("prop", a).map(({content:v, props:y}) => {
        const F = new zb;
        F.b(v, y);
        return F;
      });
      a = R(["function", "fn", "static"], a).map(({content:v, props:y, tag:F}) => {
        F = "static" == F;
        const {H:Xb, D:Ca} = nb(v, u);
        v = new V(Ca);
        const {R:Da, F:Yb} = db(y, Ca, this.fullName);
        Da.type = Yb;
        v.b(Xb, Da);
        F && (v.f = !0);
        return v;
      });
      a = [...b, ...a];
      const {I:C, n:Zb} = a.reduce((v, y) => {
        y.static ? v.I.push(y) : v.n.push(y);
        return v;
      }, {I:[], n:[]});
      this.properties = [...C, ...Zb].sort(({isConstructor:v}, {isConstructor:y}) => v && !y ? -1 : y && !v ? 1 : 0);
    }
    q && (this.examples = pb(q, r));
  }
  get o() {
    return this.isConstructor || this.isInterface || this.isRecord;
  }
  m() {
    return "Object";
  }
  get h() {
    return `${this.tag ? ` \`\uff20${this.tag}\`` : ""}${this.description ? ` ${this.description}` : ""}`;
  }
  f(a = !1, b = !1, d = a) {
    const c = !!this.extends, e = Hb(this, a, b, d), f = [];
    if (this.namespace && a) {
      var g = ` * @typedef {${this.fullName}} ${this.name}${this.h}`;
      a && !b && (g = P(g));
      g = O(g);
      f.push(g);
    } else {
      this.namespace && d && (g = ` * @typedef {${this.fullName}} ${this.name}${this.h}`, g = O(g), f.push(g));
    }
    c && (d = ` * @typedef {${this.extends.split(/,\s*/).join(" & ")} & ${Gb(this, d)}} ${d ? this.fullName : this.name}${this.h}`, a && !b && (d = P(d)), d = O(d), f.push(d));
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
  g(a = "", b = !0, d = !1) {
    let c = [];
    this.description && c.push(` * ${this.description}`);
    this.extends && this.extends.split(/,\s*/).forEach(e => {
      c.push(` * @extends {${e}}`);
    });
    this.args && this.args.forEach(e => {
      let {name:f, description:g, optional:h, type:k} = e;
      e = g ? ` ${g}` : "";
      if (f.startsWith("...")) {
        f = f.slice(3), k = `...${k}`;
      } else {
        if ("this" == f) {
          c.push(` * @this {${k}}${e}`);
          return;
        }
      }
      c.push(` * @param {${k}${h ? "=" : ""}} ${h ? `[${f}]` : f}${e}`);
    });
    b && c.push(` * @${this.P}`);
    d && this.examples.length && (b = qb(this.examples), c.push(...b));
    a && (c = c.map(e => `${a}${e}`));
    return c;
  }
  get ns() {
    return this.namespace ? `${this.namespace}.` : "";
  }
  get fullName() {
    return `${this.ns}${this.name}`;
  }
  B(a, b, d, c, e = !1, f = !1) {
    var g = "";
    !0 === c ? g = "?" : !1 === c && (g = "!");
    c = this.description ? ` ${this.description}` : "";
    const h = this.spread ? Ib(this.properties) : e || f ? this.fullName : this.name;
    b = `${d || ""} * @param {${g}${h}} ${b ? `[${a}]` : a}${c}`;
    g = this.properties && !this.noExpand ? this.properties.map(k => k.B(a, d, e, f)) : [];
    return [b, ...g].join("\n");
  }
  toMarkdown(a = [], b = {}) {
    const {flatten:d, details:c = []} = b, e = c.includes(this.name);
    var f = this.type ? `\`${this.type}\`` : "", g = f;
    this.link ? g = `[${f}](${this.link})` : !this.import && this.type && (g = X(a, this.type, b), f = g != this.type, g = Jb(g, f));
    f = Jb(this.fullName);
    f = this.import ? `[${f}](l-type)` : this.noToc ? `[${f}](l-type)` : `[${f}](t-type)`;
    const h = this.description ? `: ${this.description}` : "";
    g = g ? `${g} ` : "";
    let k = /_/.test(f);
    if (this.extends) {
      const l = Kb(this.extends, a, b), m = ` extends ${l}`;
      k = k || /_/.test(l);
      g = (k ? g + "<strong>" : g + "__") + (f + m);
      "function" == typeof d && d(this.extends);
    } else {
      g = (k ? g + "<strong>" : g + "__") + f;
    }
    g = (k ? g + "</strong>" : g + "__") + h;
    a = Cb(this, this.properties, a, b);
    return {LINE:g, table:a, displayInDetails:e};
  }
}
const Jb = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`, Ib = (a = [], b = !1) => {
  a = a.reduce((d, c) => {
    d.push(c);
    const e = c.aliases.map(f => ({...c, name:f}));
    d.push(...e);
    return d;
  }, []);
  return `{ ${a.map(d => {
    const c = b ? d.closureType : d.type;
    let e = d.name, f = c;
    d.optional && !b ? e = `${d.name}?` : d.optional && b && (f = `(${bb(c)})`);
    return `${e}: ${f}`;
  }).join(", ")} }`;
}, Kb = (a, b, d) => a.split(/,\s*/).map(c => {
  let e = `\`${c}\``;
  var f = b.find(({fullName:g}) => g == c);
  f && f.link ? (e = "<a ", f.description && (e += `title="${f.description}" `), e += `href="${f.link}">\`${c}\`</a>`) : (f = X(b, c, {...d, nameProcess:g => `\`${g}\``}), c != f && (e = f));
  return e;
}).join(", ");
class Lb extends Y {
  constructor() {
    super();
    this.from = "";
  }
  get import() {
    return !0;
  }
  b(a, {from:b, name:d, ...c}, e, f) {
    if (!b) {
      throw Error("From attribute of import is not given.");
    }
    this.from = b;
    this.description = Q(a);
    super.b("", {...c, noToc:!0, name:d, type:`import('${b}').${d}`}, e != f ? e : null);
  }
  f(a = !0) {
    return ` * @typedef {import('${this.from}').${this.name}} ${a ? this.fullName : this.name}`;
  }
}
;function Mb(a, b) {
  b = b.reduce((d, c) => ({...d, [c.fullName]:c}), {});
  a.w = {...a.w, ...b};
}
class Nb extends N {
  constructor(a, b = {}) {
    super(a);
    this.w = {};
    this.on("types", d => {
      Mb(this, d);
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
    return Lb;
  }
  get types() {
    return this.w;
  }
}
;class Ob extends Y {
  constructor() {
    super();
    this.l = null;
    this.async = !1;
  }
  get o() {
    return !1;
  }
  get isMethod() {
    return !0;
  }
  b(a, {async:b, "return":d, ...c}, ...e) {
    this.description = Q(a);
    super.b("", c, ...e);
    d && (this.l = d.replace(/\n\s*/g, " "));
    b && (this.async = !0);
  }
  get return() {
    return this.l || "void";
  }
  g(a = "") {
    const b = super.g(a, !1);
    let d;
    this.l && (d = this.return);
    this.async && d ? d = `Promise<${d}>` : this.async && (d = "Promise");
    d && b.push(`${a} * @return {${d}}`);
    return b;
  }
  m() {
    return `(${this.args.map(({name:a, type:b, optional:d}) => `${a}${d ? "?" : ""}: ${b}`).join(", ")}) => ${this.return}`;
  }
}
;const Pb = a => {
  var {args:b = []} = a;
  if (b.length) {
    var d = `function(${b.map(({G:c}) => c).join(", ")}): ${a.fullName}`;
    b = new V(b);
    b.isConstructor = !0;
    b.b("Constructor method.", {type:d, name:"constructor"});
    b.examples = a.examples;
    rb(b, void 0);
    a.properties.unshift(b);
  }
}, Rb = a => {
  a = R("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:b, props:{namespace:d, ns:c = d}}] = a, e = void 0 == c ? void 0 : c, f = [];
  a = R(["type", "interface", "constructor", "method", "import"], b).reduce((g, {content:h, props:k, tag:l}) => {
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
        k = Qb(h, k, e);
        k.forEach(r => {
          r.properties.some(({isConstructor:t}) => t) || Pb(r);
          r.isInterface = !0;
        });
        g.push(...k);
        break;
      case "constructor":
        k = Qb(h, k, e);
        k.forEach(r => {
          r.properties.some(({isConstructor:t}) => t) || Pb(r);
          r.isConstructor = !0;
        });
        g.push(...k);
        break;
      case "method":
        k = Qb(h, k, e, !0);
        g.push(...k);
        break;
      case "import":
        q = new Lb, q.b(h, k, k.ns || k.from, void 0), f.push(q);
    }
    return g;
  }, []);
  return {namespace:c, types:a, imports:f};
}, Sb = (a, b, d, c = !1) => {
  const e = c ? new Ob : new Y, f = a.search(/<(prop|function|fn|static) /);
  let g = "", h = a;
  1 != f && (g = a.slice(0, f), h = a.slice(f));
  const {D:k, H:l} = nb(g, void 0);
  e.b(c ? l : h, b, d, void 0);
  ({F:a} = db(b, k));
  c && (e.closureType = a);
  e.args = k;
  return e;
}, Qb = (a, b, d, c = !1) => {
  const e = [], {alias:f, aliases:g, ...h} = b;
  b = Sb(a, b, d, c);
  e.push(b);
  (f ? [f] : g ? g.split(/, */) : []).forEach(k => {
    k = Sb(a, {...h, name:k}, d, c);
    k.description = `${k.description}${k.description ? " " : ""}Alias of \`${h.name}\`.`;
    e.push(k);
  });
  return e;
}, Tb = async(a, b = []) => {
  const d = await G(a);
  let c, e, f;
  try {
    ({namespace:c = null, types:e, imports:f} = Rb(d));
  } catch (g) {
    throw g.message = `Error while reading ${a}\n${g.message}`, g;
  }
  e = e.filter(({fullName:g}) => b.includes(g) ? !1 : !0);
  f = f.filter(({fullName:g}) => b.includes(g) ? !1 : !0);
  return {types:e, imports:f, namespace:c};
};
const Ub = (a, b, d) => {
  b = b.map(c => c.f(!0, d));
  a = a.map(c => {
    c = c.f();
    return O(d ? c : P(c));
  });
  return [...b, ...a].join("");
}, Vb = (a, b, d, c = !1) => {
  a = [...a.map(e => {
    {
      let f;
      e.closureType ? f = ` * @typedef {${e.closureType}}` : e.o || (f = ` * @typedef {${Ib(e.properties, !0)}}`);
      f ? (e.description && (f = ` * ${e.description}\n${f}`), f = O(f), e = f += cb(e.namespace, e.name)) : e = Eb(e);
    }
    return e;
  })].join("\n");
  return `${!b || c || d.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const $b = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, d) {
  const [c, ...e] = d.split(/\s+/), f = e.includes("closure"), g = e.includes("externs"), h = e.includes("noSuppress"), k = e.includes("skipNsDecl"), l = e.includes("namespace");
  let m = e.find(q => q.startsWith("ignore:"));
  m = m ? m.replace("ignore:", "").split(",") : [];
  let {v:n, A:p} = this.g;
  f && (n = !0);
  g && (p = !0);
  try {
    this.i("Detected type marker: %s", d);
    const {types:q, imports:r, namespace:t} = await Tb(c, m);
    this.emit("types", q);
    this.emit("types", r);
    let u;
    n ? u = Ub(r, q, h) : p ? (u = Vb(q, t, this.b, k) + "\n", t && this.emit("namespace", t)) : l ? (t && this.emit("namespace", t), u = Wb(r, q, !0)) : u = Wb(r, q);
    return `/* ${b} ${d} */\n${u}`;
  } catch (q) {
    return this.i("(%s) Could not process typedef-js: %s", d, q.message), process.env.b && console.error(q.stack), a;
  }
}}, Wb = (a, b, d = !1) => {
  b = b.map(c => c.f(!1, !1, d));
  a = a.map(c => c.f(d)).map(O).join("");
  b = b.join("");
  return `${a}${b}`.replace(ac, " * @typedef");
}, ac = / \*\/\n\/\*\*\n \* @typedef/g;
const cc = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?(?:(?!\n\s*\*(?:\/|\s*@))[\s\S])*)*)/gm, replacement:bc};
function bc(a, b, d, c, e, f, g) {
  const {v:h, C:k} = this.g;
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
    l = kb(d);
  } catch (n) {
    return this.i("Error while parsing the type %s", d), this.i(process.env.DEBUG ? n.stack : n.message), f(), a;
  }
  if (!l) {
    return this.i("Could not parse the type %s", d), f(), a;
  }
  const m = Object.values(this.types).map(({name:n, fullName:p}) => h || k ? p : n);
  if (!Z(l, m, this.i, d, f)) {
    return a;
  }
  d = Object.values(this.types).find(({name:n, fullName:p}) => h || k ? p == l.name : n == l.name);
  return !d || d instanceof Nb.Import ? a : d.B(e, c, b, l.nullable, h, k);
}
const Z = (a, b, d, c, e) => {
  if (a) {
    var f = a.name;
    if (!f || !"string number boolean null undefined symbol any".split(" ").includes(f)) {
      if (f && !a.application && !a.function) {
        let h = b.includes(f);
        h || (h = dc.includes(f));
        if (h) {
          return !0;
        }
        d("Type %s%s was not found.", f, c != f ? ` in ${c}` : "");
        e();
      }
      var g = [b, d, c, e];
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
}, dc = "String Boolean Object Date Number Symbol Buffer Function".split(" ");
var ec = (a, b = !1) => {
  var {O:d} = Ta();
  const c = Va(d);
  d = Ua(d);
  return new Nb(b ? [$b] : [$b, c, cc, d], a);
};
const fc = /( *) \* @(fnType|methodType) {(.+?)}/gm, gc = (a, b, d, c, e, f, g = c) => `/**
${a}
 */
${b ? "static " : ""}${d ? "async " : ""}${c}(${e}) {
  return ${`${b ? f : "super"}.${g}`}(${e})
}`;
class hc extends N {
  constructor(a, b) {
    super([{re:/\/\*\*\s+( *) \* @constructor {(.+?)}[\s\S]+?(class\s+.+?\s+extends\s+(.+?)\s*){\s*}/gm, replacement(d, c, e, f, g) {
      c = a.find(({fullName:l}) => l == e);
      if (!c) {
        return console.error("Type %s in %s not found", e, b), d;
      }
      d = c.properties.filter(l => l instanceof V && !l.isConstructor).map(l => {
        const {name:m, aliases:n, static:p, async:q} = l;
        let r = U(l, "", !0);
        r = ic(r, e);
        const t = l.args.map(({name:C}) => C).join(", ");
        l = gc(r, p, q, m, t, g);
        const u = n.map(C => gc(r + `\n * @alias ${m} An alias for **${m}**.`, p, q, C, t, g, m));
        return [l, ...u].join("\n");
      });
      const h = c.properties.find(l => l instanceof V && l.isConstructor), k = h.args.map(({name:l}) => l).join(", ");
      d = [`/**
${ic(U(h, "", !0), e)}
 */
constructor(${k}) {
  super(${k})
}`, ...d].join("\n").replace(/^/gm, "  ");
      f = `${f}{
${d}
}`;
      c.description && (f = `/**
${T(c.description)}
 */\n` + f);
      return f;
    }}, {re:fc, async replacement(d, c, e, f) {
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
        return console.error("Type %s in %s not found", h, b), d;
      }
      if ("constructor" == k || "methodType" == e) {
        return f.g(c, !1, !0).join("\n");
      }
      e = f.properties.find(({name:l}) => l == k);
      return e ? e.parsed ? U(e, c, !0) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", k, h, b), d) : (console.error("Property %s of type %s in %s not found", k, h, b), d);
    }}]);
  }
}
const ic = (a, b) => a.replace(`\n * @return {${b}}`, "").replace(`\n * @return {!${b}}`, "").replace(`\n * @return {?${b}}`, "");
const jc = async a => a ? (await Promise.all(a.split(",").map(async b => {
  var d = [];
  const c = await I(z, b);
  c.isFile() ? d = [b] : c.isDirectory() && (d = await K(b), d = L(d.content, b), d = d.filter(e => e.endsWith(".xml")));
  return d;
}))).reduce((b, d) => [...b, ...d], []) : [], kc = async a => (await Promise.all(a.map(async b => ({...await Tb(b), location:b})))).reduce((b, {imports:d, types:c}) => {
  b.push(...d);
  b.push(...c);
  return b;
}, []);
async function lc() {
  const {s:a, types:b} = {s:na, types:ma}, d = await jc(b), c = await kc(d);
  await Promise.all(x.map(async e => {
    var f = await I(z, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await K(e), g = L(f.content, e));
    await mc(g, c, a);
  }));
}
const mc = async(a, b = [], d = null) => {
  await Promise.all(a.map(async c => {
    var e = await G(c);
    const f = new hc(b, c);
    f.end(e);
    e = await E(f);
    "-" == d ? console.log(e) : d ? await H(d, e) : await H(c, e);
  }));
};
var oc = async() => {
  const {v:a = !1, C:b = !1, A:d = !1, s:c, types:e} = {v:ja, A:la, s:ia, types:ma, C:ka}, f = await jc(e);
  await Promise.all(x.map(async g => {
    var h = await I(z, g);
    let k;
    h.isFile() ? k = [g] : h.isDirectory() && (h = await K(g), k = L(h.content, g));
    await nc(k, a, d, c, f, b);
  }));
};
const nc = async(a, b = !1, d = !1, c = "", e = [], f = !1) => {
  const g = [];
  await Promise.all(e.map(async h => {
    h = await G(h);
    const {types:k, imports:l} = Rb(h);
    g.push(k, l);
  }));
  await Promise.all(a.map(async h => {
    var k = await G(h);
    const l = ec({v:b, A:d, C:f}, d);
    g.forEach(m => l.emit("types", m));
    l.file = h;
    l.i = console.error;
    l.lines = k.split("\n");
    l.end(k);
    k = await E(l);
    "-" == c ? console.log(k) : c ? await H(c, k) : await H(h, k);
  }));
};
const pc = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, qc = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, rc = "type opt name quote defaultValue description Default".split(" "), Za = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), sc = (a, b, d, c) => {
  c = c.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  d = d ? ` desc="${d}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${d}${c ? "" : " /"}>\n`;
};
class tc extends A {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform({type:a, name:b, description:d, properties:c}, e, f) {
    a = a && a.startsWith("import") ? uc(a, b) : sc(a, b, d, c);
    this.push(a);
    c.forEach(({type:g, name:h, default:k, description:l, optional:m}) => {
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
    c.length && this.push("  </type>\n");
    f();
  }
}
const uc = (a, b) => {
  const d = /import\((['"])(.+?)\1\)/.exec(a);
  if (!d) {
    throw Error(`Could not extract package from "${a}"`);
  }
  [, , a] = d;
  return `${" ".repeat(2)}<import name="${b}" from="${a}" />\n`;
};
class vc extends A {
  constructor() {
    super({objectMode:!0});
  }
  _transform([, a, b, d, c], e, f) {
    c = eb(qc, c, rc).map(g => {
      const {defaultValue:h, Default:k, opt:l, name:m, type:n, ...p} = g;
      g = {...p, name:m, type:n, ...h ? {defaultValue:pc(h)} : {}, ...k ? {u:pc(k)} : {}, ...l ? {optional:!0} : {}};
      if (h || k) {
        if (h) {
          h !== k && void 0 !== g.u && (q = $a(m, k, n), console.error("%s[%s] does not match Default `%s`.", b, q, g.u));
        } else {
          var q = $a(m, k, n);
          console.error("%s[%s] got from Default.", b, q);
        }
        g.default = "defaultValue" in g ? g.defaultValue : g.u;
        delete g.defaultValue;
        delete g.u;
      }
      return g;
    });
    this.push({type:a, name:b, description:d, properties:c});
    f();
  }
}
async function wc(a) {
  const b = Ya(), d = new vc, c = new tc;
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
  ${(await E(c)).trim()}
</types>`;
}
;var xc = async() => {
  const {s:a} = {s:ia};
  await Promise.all(x.map(async b => {
    b = await G(b);
    b = await wc(b);
    a ? await H(a, b) : console.log(b);
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
    return oa ? await xc() : na ? await lc() : await oc();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map