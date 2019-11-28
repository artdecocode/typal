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
const da = (a, b, c, d, e) => {
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
}, ka = () => {
  var a = ja;
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
const ja = {source:{description:"The path to the source file or directory with files to embed types into. Can specify multiple values, e.g., `typal types/index.js types/vendor.js`.", command:!0, multiple:!0}, output:{description:"The destination where to save output.\nIf not passed, the file will be overwritten.\nIf `-` is passed, prints to stdout.", short:"o"}, closure:{description:"Whether to generate types in _Closure_ mode.", boolean:!0, short:"c"}, useNamespace:{description:"Generate JSDoc for functions using namespaces.", 
boolean:!0, short:"u"}, externs:{description:"Whether to generate externs for _GCC_.", boolean:!0, short:"e"}, types:{description:"Comma-separated location of files to read types from.", short:"t"}, template:{description:"Scans the input file for `@type` comment in functions' JSDoc, and inserts the annotations from types' files.", short:"T"}, migrate:{description:"Extracts types from JavaScript source code and saves them\ninto the types.xml file specified in the output option.", boolean:!0, short:"m"}, 
help:{description:"Print the help information and exit.", boolean:!0, short:"h"}, version:{description:"Show the version's number and exit.", boolean:!0, short:"v"}}, u = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = ea(b);
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
    let l;
    if ("string" == typeof h) {
      ({value:l, argv:e} = da(e, f, h));
    } else {
      try {
        const {short:k, boolean:m, number:n, command:p, multiple:q} = h;
        p && q && c.length ? (l = c, d = !0) : p && c.length ? (l = c[0], d = !0) : {value:l, argv:e} = da(e, f, k, m, n);
      } catch (k) {
        return Object.assign({}, {m:e}, g);
      }
    }
    return void 0 === l ? Object.assign({}, {m:e}, g) : Object.assign({}, {m:e}, g, {[f]:l});
  }, {m:b});
}(ja), x = u.source, la = u.output, ma = u.closure, na = u.useNamespace, oa = u.externs, pa = u.types, qa = u.template, ra = u.migrate, sa = u.help, ta = u.version;
function ua(a = {usage:{}}) {
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
;const {createReadStream:va, createWriteStream:wa, lstat:z, readdir:xa} = fs;
var ya = stream;
const {Transform:A, Writable:za} = stream;
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
const Fa = /\s+at.*(?:\(|\s)(.*)\)?/, Ga = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Ha = Da(), C = a => {
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
    var e = Ca(arguments), {stack:f} = Error();
    const g = Aa(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = C(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function G(a) {
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
    const {N:f = G(!0), proxyError:g} = a || {}, h = (l, k) => f(k);
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
          const n = C(m.stack);
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
const H = async a => {
  var b = void 0 === b ? {} : b;
  ({f:a} = new Ka(Object.assign({}, {rs:a}, b, {N:G(!0)})));
  return await a;
};
async function I(a) {
  a = va(a);
  return await H(a);
}
;async function J(a, b) {
  if (!a) {
    throw Error("No path is given.");
  }
  const c = G(!0), d = wa(a);
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
async function K(a, b, c) {
  const d = G(!0);
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
;const {join:L, relative:Ma} = path;
async function Na(a, b) {
  b = b.map(async c => {
    const d = L(a, c);
    return {lstat:await K(z, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Oa = a => a.lstat.isDirectory(), Pa = a => !a.lstat.isDirectory();
async function M(a) {
  var b = void 0 === b ? {} : b;
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  const {ignore:c = []} = b;
  if (!(await K(z, a)).isDirectory()) {
    throw b = Error("Path is not a directory"), b.code = "ENOTDIR", b;
  }
  b = await K(xa, a);
  var d = await Na(a, b);
  b = d.filter(Oa);
  d = d.filter(Pa).reduce((e, f) => {
    var g = f.lstat.isDirectory() ? "Directory" : f.lstat.isFile() ? "File" : f.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return Object.assign({}, e, {[f.relativePath]:{type:g}});
  }, {});
  b = await b.reduce(async(e, f) => {
    var {path:g, relativePath:h} = f;
    f = Ma(a, g);
    if (c.includes(f)) {
      return e;
    }
    e = await e;
    f = await M(g);
    return Object.assign({}, e, {[h]:f});
  }, {});
  return {content:Object.assign({}, d, b), type:"Directory"};
}
const N = (a, b) => {
  let c = [], d = [];
  Object.keys(a).forEach(f => {
    const {type:g} = a[f];
    "File" == g ? c.push(L(b, f)) : "Directory" == g && d.push(f);
  });
  const e = d.reduce((f, g) => {
    const {content:h} = a[g];
    g = N(h, L(b, g));
    return [...f, ...g];
  }, []);
  return [...c, ...e];
};
function Qa(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const {re:b, replacement:c} = a;
  a = b instanceof RegExp;
  const d = -1 != ["string", "function"].indexOf(typeof c);
  return a && d;
}
const O = (a, b) => {
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
function Ra(a, b) {
  function c() {
    return b.filter(Qa).reduce((d, {re:e, replacement:f}) => {
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
            O(g, k);
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
;const Sa = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Ta = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, Ua = () => {
  var a = {O:/^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg};
  return Object.keys(a).reduce((b, c) => {
    {
      var d = a[c];
      const {getReplacement:e = Ta, getRegex:f = Sa} = {}, g = f(c);
      d = {name:c, re:d, regExp:g, getReplacement:e, map:{}, lastIndex:0};
    }
    return Object.assign({}, b, {[c]:d});
  }, {});
}, Va = a => {
  var b = void 0 === b ? [] : b;
  const {regExp:c, map:d} = a;
  return {re:c, replacement(e, f) {
    e = d[f];
    delete d[f];
    return Ra(e, Array.isArray(b) ? b : [b]);
  }};
}, Wa = a => {
  const {re:b, map:c, getReplacement:d, name:e} = a;
  return {re:b, replacement(f) {
    const {lastIndex:g} = a;
    c[g] = f;
    a.lastIndex += 1;
    return d(e, g);
  }};
};
async function Xa(a, b) {
  return Ya(a, b);
}
class P extends A {
  constructor(a, b) {
    super(b);
    this.f = (Array.isArray(a) ? a : [a]).filter(Qa);
    this.j = !1;
    this.h = b;
  }
  async replace(a, b) {
    const c = new P(this.f, this.h);
    b && Object.assign(c, b);
    a = await Xa(c, a);
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
            O(f, k);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            O(f, h);
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
      a = C(d.stack), d.stack = a, c(d);
    }
  }
}
async function Ya(a, b) {
  b instanceof ya ? b.pipe(a) : a.end(b);
  return await H(a);
}
;function Za() {
  var a = $a;
  let b = "";
  const c = new A({transform(d, e, f) {
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
  b = Number.isInteger(b) || [!0, !1, "null"].includes(b) || ["number", "boolean"].includes(c) ? b : `"${b}"`;
  return `${a}=${b}`;
}, ab = ({number:a, K:b, boolean:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", bb = a => `${/[^\w\d._]/.test(a) ? `(${a})` : a}|undefined`, R = a => a ? `/**
${a}
 */
` : "/**\n */\n", S = a => ` * @suppress {nonStandardJsDocs}
${a}`, cb = (a, b, c) => {
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
function db(a, b, c) {
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
;const eb = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), fb = new RegExp(`(?:\\s+((?:${eb.source}\\s*)*))`);
const U = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return db(new RegExp(`<(${a})${fb.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:c, a:d = "", c:e = ""}) => {
    d = d.replace(/\/$/, "").trim();
    d = gb(d);
    return {content:e, props:d, tag:c};
  });
}, gb = a => db(eb, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
const hb = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function ib(a) {
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
;function jb(a) {
  a = hb(a);
  return ib(a);
}
;function kb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h}, l) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = T(b));
  b = ab({number:g, K:d, boolean:e, type:h});
  l && (b = b.replace(new RegExp(`([!?])?${l}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), f = !0);
  a.type = b;
  f && (a.optional = !0);
}
class lb {
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
const mb = (a, b) => {
  let c = a.lastIndexOf("</arg>"), d = a;
  var e = [];
  -1 != c && (c += 6, e = a.slice(0, c), d = a.slice(c), e = U("arg", e), e = e.map(({content:f, props:g}) => {
    const h = new lb;
    kb(h, f, g, b);
    return h;
  }));
  return {I:d, F:e};
};
function V(a) {
  if ("" == a.name && a.nullable) {
    return "?";
  }
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
;function nb(a, b, {name:c, string:d, "boolean":e, opt:f, number:g, type:h, "default":l, closure:k, alias:m, aliases:n, noParams:p, "static":q, initial:r}) {
  if (!c) {
    throw Error("Property does not have a name.");
  }
  a.name = c;
  b && (a.description = T(b));
  b = ab({number:g, K:d, boolean:e, type:h});
  p && (a.o = p);
  k && (a.g = k);
  a.type = b;
  void 0 !== l ? a.default = l : void 0 !== r && (a.default = r);
  if (f || void 0 !== l) {
    a.optional = !0;
  }
  m && (a.aliases = [m]);
  n && (a.aliases = n.split(/\s*,\s*/));
  q && (a.b = !0);
}
function ob(a, b = !1) {
  return b ? a.closureType : a.isParsedFunction ? a.toTypeScriptFunction(V) : a.type;
}
function pb(a, b = null, c = !1) {
  if (!a.name) {
    throw Error("Property does not have a name. Has it been constructed using fromXML?");
  }
  b = Q(a.name, a.optional ? a.default : null, a.type, b);
  b = a.optional ? `[${b}]` : b;
  var {l:d} = a;
  d = d ? ` ${d}` : "";
  return `{${ob(a, c)}} ${b}${d}`;
}
function qb(a, b = !1) {
  a = pb(a, null, b);
  return ` * @prop ${rb(a, !0)}`;
}
function sb(a) {
  const b = [], {function:{args:c, return:d, variableArgs:e, this:f}} = a.parsed;
  c.map(g => V(g)).forEach((g, h) => {
    const {optional:l} = c[h], {name:k = `arg${h}`, description:m} = a.args[h] || {};
    b.push(` * @param {${g}${l ? "=" : ""}} ${l ? `[${k}]` : k}${m ? ` ${m}` : ""}`);
  });
  e && b.push(` * @param {...${V(e)}} args`);
  f && b.push(` * @this {${V(f)}}`);
  if (d && "void" != d.name) {
    const g = V(d);
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
function ub(a, b = "") {
  let c = [];
  var {l:d} = a;
  d && (d = rb(d), c.push(d));
  !a.optional && a.isParsedFunction ? (a = sb(a), c.push(...a)) : c.push(` * @type {${a.optional ? bb(a.closureType) : a.closureType}}`);
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
  constructor(a = null) {
    this.f = this.description = this.name = null;
    this.closureType = "";
    this.default = this.g = null;
    this.optional = !1;
    this.aliases = [];
    this.o = !1;
    this.parsed = null;
    this.args = a;
    this.isConstructor = this.b = !1;
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    const {function:{args:b, return:c, this:d, variableArgs:e}} = this.parsed;
    var f = b.map(h => a(h)).map((h, l) => {
      const {optional:k} = b[l];
      let {name:m = `arg${l}`, optional:n = k} = this.h[l] || {};
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
      } catch (l) {
      }
      f.push(`${h}: ${g}[]`);
    }
    f = f.join(", ");
    g = c ? a(c) : "?";
    return `(${f}) => ${g}`;
  }
  w(a, b = new RegExp(`([!?])?${a}\\.`, "g")) {
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
    if (!this.o) {
      try {
        this.parsed = jb(this.closureType), this.isParsedFunction && !this.args && (this.args = []);
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
  C(a, b = "", c = !1) {
    a = pb(this, a, c);
    const [d, ...e] = a.split("\n");
    return [`@param ${d}`, ...e].map(f => `${b} * ${f}`).join("\n");
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
const X = (a, b, c = {}) => {
  let d;
  if ("object" == typeof b) {
    d = b;
  } else {
    try {
      (d = jb(b)) || console.log("Could not parse %s", b);
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
      let l = W(h, b, c);
      h.optional && (l += "=");
      g.push(l);
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
  const {flatten:e = !1, nameProcess:f, link:g = ({link:k}) => `#${k}`} = d;
  d = yb(b, a);
  c = `${c}${a}`;
  if (!d) {
    return c;
  }
  let {link:h, type:{description:l}} = d;
  h = g(d);
  e && ((b = b.find(({fullName:k}) => k == a)) && b.link && (h = b.link), !l && b.description && (l = b.description), "function" == typeof e && e(a));
  b = f ? f(c) : c;
  return l ? `<a href="${h}" title="${l.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${h})`;
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
  const l = a.isConstructor || a.isInterface, k = b.some(({hasDefault:p}) => p), m = {flatten:f, escapePipe:!e, link:h}, n = p => X(c, p, m);
  a = b.map(p => {
    let q;
    p.args && p.isParsedFunction ? (q = p.toTypeScriptFunction(n), p.isConstructor && (q = `new ${q}`)) : q = X(c, p.parsed || p.type, m);
    const r = l || p.optional ? p.name : `${p.name}*`, t = p.hasDefault ? `\`${p.default}\`` : "-", v = g ? g(p.description) : p.description;
    return {prop:p, typeName:q, name:r, de:Ab(v, !e), d:t};
  });
  if (e) {
    return {props:a, anyHaveDefault:k, constr:l};
  }
  a = a.map(({name:p, typeName:q, de:r, d:t, prop:v}) => [v.optional ? p : `__${p}__`, `<em>${q}</em>`, r, ...k ? [t] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...k ? [l ? "Initial" : "Default"] : []];
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
  b = R(b.join("\n"));
  b += cb(a.namespace, a.name, Cb(a));
  const c = a.properties.reduce((d, e) => {
    d.push(e);
    const f = e.aliases.map(g => vb(e, g));
    d.push(...f);
    return d;
  }, []).filter(d => {
    ({isConstructor:d} = d);
    return !d;
  }).map(d => {
    let e = ub(d);
    e = R(e);
    e += cb(`${a.fullName}${d.static ? "" : ".prototype"}`, d.name);
    return e += tb(d);
  });
  return [b, ...c].join("\n");
}
function Db(a, b) {
  const c = `${a.extends ? "$" : ""}${a.name}`;
  return (void 0 === b ? 0 : b) ? `${a.ns}${c}` : c;
}
function Eb(a, b, c, d) {
  b = void 0 === b ? !1 : b;
  c = void 0 === c ? !1 : c;
  d = void 0 === d ? b : d;
  d = ` * @typedef {${(b ? a.closureType : a.type) || a.o()}}${` ${Db(a, d)}${a.l}`}`;
  a = (a.properties ? a.properties.reduce((e, f) => {
    if (f.b) {
      return e;
    }
    e.push(f);
    const g = f.aliases.map(h => vb(f, h));
    e.push(...g);
    return e;
  }, []) : []).map(e => qb(e, b));
  a = [d, ...a].join("\n");
  b && !c && (a = S(a));
  return a = R(a);
}
function Cb(a) {
  return a.args ? `function(${a.args.filter(b => {
    ({name:b} = b);
    return "this" != b;
  }).map(b => {
    ({name:b} = b);
    return b;
  }).join(", ")}) {}` : null;
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
  }
  get import() {
    return !1;
  }
  b(a, b, c, d) {
    var {name:e, type:f, desc:g, noToc:h, spread:l, noExpand:k, link:m, closure:n, constructor:p, "extends":q, "interface":r, record:t} = b;
    d = void 0 === d ? null : d;
    if (!e) {
      throw Error("Type does not have a name.");
    }
    this.name = e;
    f && (this.type = f);
    n ? this.closureType = n : this.closureType = this.type;
    g && (this.description = T(g));
    this.noToc = !!h;
    this.spread = !!l;
    this.noExpand = !!k;
    m && (this.link = m);
    !0 === p && (this.isConstructor = p);
    !0 === r && (this.isInterface = r);
    !0 === t && (this.isRecord = t);
    q && (this.extends = q);
    if (a) {
      b = U("prop", a).map(w => {
        var {content:E, props:D} = w;
        w = new wb;
        nb(w, E, D);
        return w;
      });
      a = U(["function", "fn", "static"], a).map(w => {
        var {content:E, props:D, tag:Sb} = w;
        w = "static" == Sb;
        const {I:Tb, F:Ea} = mb(E, d);
        var F = Object.assign({}, D), B = D.async, y = D["void"];
        y = void 0 === D["return"] ? y ? "void" : "" : D["return"];
        F = (delete F.async, delete F["void"], delete F["return"], F);
        let {args:fa = ""} = D;
        fa || (fa = Ea.map(Ub => {
          var {G:ha, name:ia} = Ub;
          return "this" == ia ? `${ia}: ${ha}` : ia.startsWith("...") ? `...${ha}` : ha;
        }).join(","));
        y = y.replace(/\n\s*/g, " ");
        B && y ? y = `!Promise<${y}>` : B && (y = "!Promise");
        B = `function(${fa})`;
        y && (B += `: ${y}`);
        F.type = B;
        B = new wb(Ea);
        nb(B, Tb, F);
        w && (B.b = !0);
        return B;
      });
      a = [...b, ...a];
      const {J:v, n:Vb} = a.reduce((w, E) => {
        E.static ? w.J.push(E) : w.n.push(E);
        return w;
      }, {J:[], n:[]});
      this.properties = [...v, ...Vb];
    }
    c && (this.namespace = c);
  }
  get H() {
    return this.isConstructor || this.isInterface || this.isRecord;
  }
  o() {
    return "Object";
  }
  w(a, b) {
    b = void 0 === b ? new RegExp(`([!?])?${a}\\.`, "g") : b;
    this.type && (this.type = this.type.replace(b, "$1"));
    this.extends && (this.extends = this.extends.replace(b, "$1"));
    return b;
  }
  get l() {
    return `${this.tag ? ` \`\uff20${this.tag}\`` : ""}${this.description ? ` ${this.description}` : ""}`;
  }
  g(a, b, c) {
    a = void 0 === a ? !1 : a;
    b = void 0 === b ? !1 : b;
    c = void 0 === c ? a : c;
    const d = !!this.extends, e = Eb(this, a, b, c), f = [];
    if (this.namespace && a) {
      var g = ` * @typedef {${this.fullName}} ${this.name}${this.l}`;
      a && !b && (g = S(g));
      g = R(g);
      f.push(g);
    } else {
      this.namespace && c && (g = ` * @typedef {${this.fullName}} ${this.name}${this.l}`, g = R(g), f.push(g));
    }
    d && (c = ` * @typedef {${this.extends} & ${Db(this, c)}} ${c ? this.fullName : this.name}${this.l}`, a && !b && (c = S(c)), c = R(c), f.push(c));
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
  h(a, b) {
    a = void 0 === a ? "" : a;
    b = void 0 === b ? !0 : b;
    let c = [];
    this.description && c.push(` * ${this.description}`);
    this.extends && c.push(` * @extends {${this.extends}}`);
    this.args && this.args.forEach(d => {
      let {name:e, description:f, optional:g, type:h} = d;
      d = f ? ` ${f}` : "";
      if (e.startsWith("...")) {
        e = e.slice(3), h = `...${h}`;
      } else {
        if ("this" == e) {
          c.push(` * @this {${h}}${d}`);
          return;
        }
      }
      c.push(` * @param {${h}${g ? "=" : ""}} ${g ? `[${e}]` : e}${d}`);
    });
    b && c.push(` * @${this.P}`);
    a && (c = c.map(d => `${a}${d}`));
    return c;
  }
  get ns() {
    return this.namespace ? `${this.namespace}.` : "";
  }
  get fullName() {
    return `${this.ns}${this.name}`;
  }
  C(a, b, c, d, e, f) {
    e = void 0 === e ? !1 : e;
    f = void 0 === f ? !1 : f;
    var g = "";
    !0 === d ? g = "?" : !1 === d && (g = "!");
    d = this.description ? ` ${this.description}` : "";
    const h = this.spread ? Fb(this.properties) : e || f ? this.fullName : this.name;
    b = `${c || ""} * @param {${g}${h}} ${b ? `[${a}]` : a}${d}`;
    g = this.properties && !this.noExpand ? this.properties.map(l => l.C(a, c, e, f)) : [];
    return [b, ...g].join("\n");
  }
  toMarkdown(a, b) {
    a = void 0 === a ? [] : a;
    b = void 0 === b ? {} : b;
    const {flatten:c, details:d = []} = b, e = d.includes(this.name);
    var f = this.type ? `\`${this.type}\`` : "", g = f, h = !1;
    this.link ? g = `[${f}](${this.link})` : !this.import && this.type && (g = X(a, this.type, b), h = g != this.type, g = Gb(g, h));
    f = Gb(this.fullName);
    f = this.import ? `[${f}](l-type)` : this.noToc ? `[${f}](l-type)` : `[${f}](t-type)`;
    h = this.description ? `: ${this.description}` : "";
    g = g ? `${g} ` : "";
    let l = /_/.test(f);
    if (this.extends) {
      let m = `\`${this.extends}\``;
      var k = a.find(n => {
        ({fullName:n} = n);
        return n == this.extends;
      });
      k && k.link ? (m = "<a ", k.description && (m += `title="${k.description}" `), m += `href="${k.link}">\`${this.extends}\`</a>`) : (k = X(a, this.extends, Object.assign({}, b, {nameProcess:n => `\`${n}\``})), this.extends != k && (m = k));
      k = ` extends ${m}`;
      l = l || /_/.test(m);
      g = (l ? g + "<strong>" : g + "__") + (f + k);
      "function" == typeof c && c(this.extends);
    } else {
      g = (l ? g + "<strong>" : g + "__") + f;
    }
    g = (l ? g + "</strong>" : g + "__") + h;
    a = zb(this, this.properties, a, b);
    return {LINE:g, table:a, displayInDetails:e};
  }
}
const Gb = (a, b) => {
  b = void 0 === b ? !1 : b;
  return `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`;
}, Fb = (a, b) => {
  a = void 0 === a ? [] : a;
  b = void 0 === b ? !1 : b;
  a = a.reduce((c, d) => {
    c.push(d);
    const e = d.aliases.map(f => Object.assign({}, d, {name:f}));
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
class Hb extends Y {
  constructor() {
    super();
    this.from = "";
  }
  get import() {
    return !0;
  }
  b(a, b, c, d) {
    var e = Object.assign({}, b), f = b.from;
    b = b.name;
    e = (delete e.from, delete e.name, e);
    if (!f) {
      throw Error("From attribute of import is not given.");
    }
    this.from = f;
    this.description = T(a);
    super.b("", Object.assign({}, e, {noToc:!0, name:b, type:`import('${f}').${b}`}), c != d ? c : null);
  }
  g(a) {
    return ` * @typedef {import('${this.from}').${this.name}} ${void 0 === a || a ? this.fullName : this.name}`;
  }
}
;function Ib(a, b) {
  b = b.reduce((c, d) => Object.assign({}, c, {[d.fullName]:d}), {});
  a.A = Object.assign({}, a.A, b);
}
class Jb extends P {
  constructor(a, b) {
    b = void 0 === b ? {} : b;
    super(a);
    this.A = {};
    this.on("types", c => {
      Ib(this, c);
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
    return Hb;
  }
  get types() {
    return this.A;
  }
}
;class Kb extends Y {
  constructor() {
    super();
    this.f = null;
    this.async = !1;
  }
  get H() {
    return !0;
  }
  get isMethod() {
    return !0;
  }
  b(a, b, ...c) {
    var d = Object.assign({}, b), e = b.async;
    b = b["return"];
    d = (delete d.async, delete d["return"], d);
    this.description = T(a);
    super.b("", d, ...c);
    b && (this.f = b.replace(/\n\s*/g, " "));
    e && (this.async = !0);
  }
  get return() {
    return this.f || "void";
  }
  h(a) {
    a = void 0 === a ? "" : a;
    const b = super.h(a, !1);
    let c;
    this.f && (c = this.return);
    this.async && c ? c = `Promise<${c}>` : this.async && (c = "Promise");
    c && b.push(`${a} * @return {${c}}`);
    return b;
  }
  o() {
    return `(${this.args.map(a => {
      var {name:b, type:c, optional:d} = a;
      return `${b}${d ? "?" : ""}: ${c}`;
    }).join(", ")}) => ${this.return}`;
  }
  w(a) {
    a = super.w(a);
    this.f && (this.f = this.f.replace(a, "$1"));
  }
}
;const Lb = a => {
  if (a.args && a.args.length) {
    var b = `function(${a.args.map(d => {
      ({G:d} = d);
      return d;
    }).join(", ")}): ${a.fullName}`, c = new wb(a.args);
    c.isConstructor = !0;
    nb(c, "Constructor method.", {type:b, name:"constructor"});
    c.w(void 0);
    a.properties.unshift(c);
  }
}, Nb = a => {
  a = U("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:b, props:{namespace:c, ns:d = c}}] = a, e = void 0 == d ? void 0 : d, f = [];
  a = U(["type", "interface", "constructor", "method", "import"], b).reduce((g, h) => {
    var {content:l, props:k, tag:m} = h;
    h = Object.assign({}, k);
    var n = k.alias;
    const p = k.aliases, q = (delete h.alias, delete h.aliases, h);
    h = n ? [n] : p ? p.split(/, */) : [];
    switch(m) {
      case "type":
        n = new Y;
        n.b(l, k, e, void 0);
        g.push(n);
        h.forEach(r => {
          const t = new Y;
          t.b(l, Object.assign({}, q, {name:r}), e, void 0);
          g.push(t);
        });
        break;
      case "interface":
        h = Mb(l, k, e);
        h.forEach(r => {
          Lb(r);
          r.isInterface = !0;
        });
        g.push(...h);
        break;
      case "constructor":
        h = Mb(l, k, e);
        h.forEach(r => {
          Lb(r);
          r.isConstructor = !0;
        });
        g.push(...h);
        break;
      case "method":
        h = Mb(l, k, e, !0);
        g.push(...h);
        break;
      case "import":
        h = new Hb, h.b(l, k, k.ns || k.from, void 0), f.push(h);
    }
    return g;
  }, []);
  return {namespace:d, types:a, imports:f};
}, Ob = (a, b, c, d) => {
  const e = (d = void 0 === d ? !1 : d) ? new Kb : new Y, f = a.search(/<(prop|function|fn|static) /);
  let g = "", h = a;
  1 != f && (g = a.slice(0, f), h = a.slice(f));
  const {F:l, I:k} = mb(g, void 0);
  e.b(d ? k : h, b, c, void 0);
  e.args = l;
  return e;
}, Mb = (a, b, c, d) => {
  d = void 0 === d ? !1 : d;
  const e = [];
  var f = Object.assign({}, b);
  const g = b.alias, h = b.aliases, l = (delete f.alias, delete f.aliases, f);
  b = Ob(a, b, c, d);
  e.push(b);
  (g ? [g] : h ? h.split(/, */) : []).forEach(k => {
    k = Ob(a, Object.assign({}, l, {name:k}), c, d);
    k.description = `${k.description}${k.description ? " " : ""}Alias of \`${l.name}\`.`;
    e.push(k);
  });
  return e;
}, Pb = async(a, b) => {
  b = void 0 === b ? [] : b;
  const c = await I(a);
  let d, e, f;
  try {
    ({namespace:d = null, types:e, imports:f} = Nb(c));
  } catch (g) {
    throw g.message = `Error while reading ${a}\n${g.message}`, g;
  }
  e = e.filter(g => {
    ({fullName:g} = g);
    return b.includes(g) ? !1 : !0;
  });
  f = f.filter(g => {
    ({fullName:g} = g);
    return b.includes(g) ? !1 : !0;
  });
  return {types:e, imports:f, namespace:d};
};
const Qb = (a, b, c) => {
  b = b.map(d => d.g(!0, c));
  a = a.map(d => {
    d = d.g();
    return R(c ? d : S(d));
  });
  return [...b, ...a].join("");
}, Rb = (a, b, c, d = !1) => {
  a = [...a.map(e => {
    {
      let f;
      e.closureType ? f = ` * @typedef {${e.closureType}}` : e.H || (f = ` * @typedef {${Fb(e.properties, !0)}}`);
      f ? (e.description && (f = ` * ${e.description}\n${f}`), f = R(f), e = f += cb(e.namespace, e.name)) : e = Bb(e);
    }
    return e;
  })].join("\n");
  return `${!b || d || c.includes(b) ? "" : `/** @const */
var ${b} = {}
`}${a}`;
};
const Xb = {re:/^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg, replacement:async function(a, b, c) {
  const [d, ...e] = c.split(/\s+/), f = e.includes("closure"), g = e.includes("externs"), h = e.includes("noSuppress"), l = e.includes("skipNsDecl"), k = e.includes("namespace");
  let m = e.find(q => q.startsWith("ignore:"));
  m = m ? m.replace("ignore:", "").split(",") : [];
  let {v:n, B:p} = this.g;
  f && (n = !0);
  g && (p = !0);
  try {
    this.i("Detected type marker: %s", c);
    const {types:q, imports:r, namespace:t} = await Pb(d, m);
    this.emit("types", q);
    this.emit("types", r);
    let v;
    n ? v = Qb(r, q, h) : p ? (v = Rb(q, t, this.b, l) + "\n", t && this.emit("namespace", t)) : k ? (t && this.emit("namespace", t), v = Wb(r, q, !0)) : v = Wb(r, q);
    return `/* ${b} ${c} */\n${v}`;
  } catch (q) {
    return this.i("(%s) Could not process typedef-js: %s", c, q.message), process.env.b && console.error(q.stack), a;
  }
}}, Wb = (a, b, c = !1) => {
  b = b.map(d => d.g(!1, !1, c));
  a = a.map(d => d.g(c)).map(R).join("");
  b = b.join("");
  return `${a}${b}`.replace(Yb, " * @typedef");
}, Yb = / \*\/\n\/\*\*\n \* @typedef/g;
const $b = {re:/( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?(?:(?!\n\s*\*(?:\/|\s*@))[\s\S])*)*)/gm, replacement:Zb};
function Zb(a, b, c, d, e, f, g) {
  const {v:h, D:l} = this.g;
  let k;
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
    k = jb(c);
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
  return !c || c instanceof Jb.Import ? a : c.C(e, d, b, k.nullable, h, l);
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
  var {O:c} = Ua();
  const d = Wa(c);
  c = Va(c);
  return new Jb(b ? [Xb] : [Xb, d, $b, c], a);
};
const cc = /( *) \* @(fnType|methodType) {(.+?)}/gm;
class dc extends P {
  constructor(a, b) {
    super([{re:cc, async replacement(c, d, e, f) {
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
        return f.h(d).join("\n");
      }
      e = f.properties.find(({name:k}) => k == l);
      return e ? e.parsed ? ub(e, d) : (console.error("Property %s of type %s in %s wasn't parsed, possibly parser bug.", l, h, b), c) : (console.error("Property %s of type %s in %s not found", l, h, b), c);
    }}]);
  }
}
;const ec = async a => a ? (await Promise.all(a.split(",").map(async b => {
  var c = [];
  const d = await K(z, b);
  d.isFile() ? c = [b] : d.isDirectory() && (c = await M(b), c = N(c.content, b), c = c.filter(e => e.endsWith(".xml")));
  return c;
}))).reduce((b, c) => [...b, ...c], []) : [], fc = async a => (await Promise.all(a.map(async b => {
  const c = await Pb(b);
  return Object.assign({}, c, {location:b});
}))).reduce((b, c) => {
  var {imports:d, types:e} = c;
  b.push(...d);
  b.push(...e);
  return b;
}, []);
async function gc() {
  var a = {s:qa, types:pa};
  a = void 0 === a ? {} : a;
  const {s:b, types:c} = a;
  a = await ec(c);
  const d = await fc(a);
  await Promise.all(x.map(async e => {
    var f = await K(z, e);
    let g;
    f.isFile() ? g = [e] : f.isDirectory() && (f = await M(e), g = N(f.content, e));
    await hc(g, d, b);
  }));
}
const hc = async(a, b, c) => {
  b = void 0 === b ? [] : b;
  c = void 0 === c ? null : c;
  await Promise.all(a.map(async d => {
    var e = await I(d);
    const f = new dc(b, d);
    f.end(e);
    e = await H(f);
    "-" == c ? console.log(e) : c ? await J(c, e) : await J(d, e);
  }));
};
var jc = async() => {
  const {v:a = !1, D:b = !1, B:c = !1, s:d, types:e} = {v:ma, B:oa, s:la, types:pa, D:na}, f = await ec(e);
  await Promise.all(x.map(async g => {
    var h = await K(z, g);
    let l;
    h.isFile() ? l = [g] : h.isDirectory() && (h = await M(g), l = N(h.content, g));
    await ic(l, a, c, d, f, b);
  }));
};
const ic = async(a, b = !1, c = !1, d = "", e = [], f = !1) => {
  const g = [];
  await Promise.all(e.map(async h => {
    h = await I(h);
    const {types:l, imports:k} = Nb(h);
    g.push(l, k);
  }));
  await Promise.all(a.map(async h => {
    var l = await I(h);
    const k = bc({v:b, B:c, D:f}, c);
    g.forEach(m => k.emit("types", m));
    k.file = h;
    k.i = console.error;
    k.lines = l.split("\n");
    k.end(l);
    l = await H(k);
    "-" == d ? console.log(l) : d ? await J(d, l) : await J(h, l);
  }));
};
const kc = a => {
  let b;
  "true" == a ? b = !0 : "false" == a ? b = !1 : /^\d+$/.test(a) && (b = parseInt(a, 10));
  return void 0 !== b ? b : a;
}, lc = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm, mc = "type opt name quote defaultValue description Default".split(" "), $a = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${/ \* @prop(?:erty)? .+\n/.source})*)`, "gm"), nc = (a, b, c, d) => {
  d = d.length;
  a = a && "Object" != a ? ` type="${a}"` : "";
  c = c ? ` desc="${c}"` : "";
  return `${" ".repeat(2)}<type name="${b}"${a}${c}${d ? "" : " /"}>\n`;
};
class oc extends A {
  constructor() {
    super({writableObjectMode:!0});
  }
  _transform(a, b, c) {
    var {type:d, name:e, description:f, properties:g} = a;
    a = d && d.startsWith("import") ? pc(d, e) : nc(d, e, f, g);
    this.push(a);
    g.forEach(h => {
      var {type:l, name:k, default:m, description:n, optional:p} = h;
      {
        h = ["string", "number", "boolean"].includes(l) ? ` ${l}` : ` type="${l}"`;
        var q = void 0 !== m;
        const r = q ? ` default="${m}"` : "";
        q = p && !q ? " opt" : "";
        const t = " ".repeat(4), v = " ".repeat(6);
        h = `${t}<prop${q}${h} name="${k}"${r}${n ? `>\n${v}${n}\n${t}</prop>` : "/>"}\n`;
      }
      this.push(h);
    });
    g.length && this.push("  </type>\n");
    c();
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
class qc extends A {
  constructor() {
    super({objectMode:!0});
  }
  _transform(a, b, c) {
    var [, d, e, f, g] = a;
    a = db(lc, g, mc).map(h => {
      var l = Object.assign({}, h), k = h.defaultValue;
      const m = h.Default;
      var n = h.opt;
      const p = h.name;
      h = h.type;
      l = (delete l.defaultValue, delete l.Default, delete l.opt, delete l.name, delete l.type, l);
      n = Object.assign({}, l, {name:p, type:h}, k ? {defaultValue:kc(k)} : {}, m ? {u:kc(m)} : {}, n ? {optional:!0} : {});
      if (k || m) {
        k ? k !== m && void 0 !== n.u && (k = Q(p, m, h), console.error("%s[%s] does not match Default `%s`.", e, k, n.u)) : (k = Q(p, m, h), console.error("%s[%s] got from Default.", e, k)), n.default = "defaultValue" in n ? n.defaultValue : n.u, delete n.defaultValue, delete n.u;
      }
      return n;
    });
    this.push({type:d, name:e, description:f, properties:a});
    c();
  }
}
async function rc(a) {
  const b = Za(), c = new qc, d = new oc;
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
  ${(await H(d)).trim()}
</types>`;
}
;var sc = async() => {
  const {s:a} = {s:la};
  await Promise.all(x.map(async b => {
    b = await I(b);
    b = await rc(b);
    a ? await J(a, b) : console.log(b);
  }));
};
if (sa) {
  const a = ka();
  console.log(ua({usage:a, description:"Embeds and maintains Closure-compatible types JSDoc in\nJavaScript source code from an external types.xml file.", line:"typal source [--closure|externs] [--migrate] [-o output] [-hv]", example:"typal src/index.js -c"}));
  process.exit();
} else {
  ta && (console.log(require("../../package.json").version), process.exit());
}
(async() => {
  try {
    return ra ? await sc() : qa ? await gc() : await jc();
  } catch (a) {
    process.env.DEBUG ? console.log(a.stack) : console.log(a.message);
  }
})();


//# sourceMappingURL=typal.js.map