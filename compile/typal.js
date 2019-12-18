#!/usr/bin/env node
             
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const os = require('os');             
var v = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
}, x = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function y(a, b) {
  if (b) {
    var c = x;
    a = a.split(".");
    for (var d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && v(c, a, {configurable:!0, writable:!0, value:b});
  }
}
y("String.prototype.trimRight", function(a) {
  function b() {
    return this.replace(/[\s\xa0]+$/, "");
  }
  return a || b;
});
const z = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function A(a) {
  let b = 0;
  const c = (e = 1) => a[b + e], d = (e = !0, g = []) => {
    var f = {};
    let k = a[b];
    if (["nullable", "nonNullable"].includes(k)) {
      if (!e) {
        throw Error(`${k} not allowed after .`);
      }
      f.nullable = "nullable" === k;
      b++;
    }
    k = a[b];
    if ("(" == k) {
      b++;
      f = {...d(!0, []), ...f};
      if (")" != a[b]) {
        throw Error("Expecting closing )");
      }
      b++;
      if ("|" != a[b]) {
        return f;
      }
    } else {
      if ("{" == k) {
        b++;
        g = f;
        for (e = {}; "}" != a[b];) {
          var h = a[b];
          b++;
          e[h] = null;
          if (":" == a[b]) {
            b++;
            try {
              var m = d();
              e[h] = m;
            } catch (p) {
              throw p.message += `(when parsing ${h} property)`, p;
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
        g.record = e;
        return f;
      }
    }
    if (["nonNullable", "nullable"].includes(k)) {
      throw Error("Nullability already defined.");
    }
    if (/[=),:.<>}|]/.test(k)) {
      throw Error(`Unexpected token ${k}.`);
    }
    "|" != a[b] && (f.name = a[b], b++);
    if ("function" == k) {
      m = f;
      h = {return:null, args:[]};
      if ("(" != a[b]) {
        throw Error("Expecting opening (");
      }
      b++;
      for (var l; ")" != a[b];) {
        if (l && "this" == a[b]) {
          throw Error("this must come first in function arguments");
        }
        if (l && "new" == a[b]) {
          throw Error("new must come first in function arguments");
        }
        if ("this" == a[b]) {
          b++;
          if (":" != a[b]) {
            throw Error("Expecting :");
          }
          b++;
          h.this = d();
        } else {
          if ("new" == a[b]) {
            b++;
            if (":" != a[b]) {
              throw Error("Expecting :");
            }
            b++;
            h.new = d();
          } else {
            if ("." == a[b] && "." == c() && "." == c(2)) {
              b++;
              b++;
              b++;
              l = d();
              if (")" != a[b]) {
                throw Error("Variable args must come last");
              }
              h.variableArgs = l;
            } else {
              l = d(), h.args.push(l), "=" == a[b] && (l.optional = !0, b++);
            }
          }
        }
        l = !0;
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
      ":" == a[b] && (b++, l = d(), void 0 == l.name && l.nullable && (l.name = ""), h.return = l);
      m.function = h;
    } else {
      if ("<" == a[b] || (h = "." == a[b] && "<" == c())) {
        b++;
        h && b++;
        m = f;
        for (h = []; ">" != a[b];) {
          l = d();
          h.push(l);
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
        m.application = h;
      }
    }
    for (; "." == a[b];) {
      f.name += ".";
      b++;
      ({name:m} = d(!1));
      if (!m) {
        throw Error("Expected to see the name after .");
      }
      f.name += m;
    }
    if ("|" != a[b] || !e) {
      return f;
    }
    for (g.push(f); "|" == a[b];) {
      b++, f = d(!0, g), f.union !== g && g.push(f);
    }
    return {union:g};
  };
  return d();
}
;function B(a) {
  a = z(a);
  return A(a);
}
;const C = path.dirname, D = path.resolve;
const E = ({A:a, C:b, l:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", F = a => {
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
    return c.map(g => g.replace(e, "")).join("\n");
  }
}, G = (a, b, c = null) => {
  const {async:d, "void":e, "return":g = e ? "void" : "", ...f} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({s:k, name:h}) => "this" == h ? `${h}: ${k}` : h.startsWith("...") ? `...${k}` : k).join(","));
  b = g.replace(/\n\s*/g, " ");
  d && b ? b = `!Promise<${b}>` : d && (b = "!Promise");
  !b && "constructor" == f.name && c && (b = c);
  c = `function(${a})`;
  b && (c += `: ${b}`);
  return {F:{...f, async:d}, o:c};
};
function H(a, b) {
  const c = a.example;
  c && c.startsWith(".") && b && (a.example = D(C(b), c));
}
;function I(a, b, c) {
  const d = [];
  b.replace(a, (e, ...g) => {
    e = g.slice(0, g.length - 2).reduce((f, k, h) => {
      h = c[h];
      if (!h || void 0 === k) {
        return f;
      }
      f[h] = k;
      return f;
    }, {});
    d.push(e);
  });
  return d;
}
;const J = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), aa = new RegExp(`(?:\\s+((?:${J.source}\\s*)*))`);
const K = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return I(new RegExp(`<(${a})${aa.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:c, a:d = "", c:e = ""}) => {
    d = d.replace(/\/$/, "").trim();
    d = ba(d);
    return {content:e, props:d, tag:c};
  });
}, ba = a => I(J, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
function ca(a, b, {name:c, string:d, "boolean":e, opt:g, number:f, type:k}, h) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = F(b));
  b = E({A:f, C:d, l:e, type:k});
  h && (b = b.replace(new RegExp(`([!?])?${h}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), g = !0);
  a.type = b;
  g && (a.optional = !0);
}
class da {
  constructor() {
    this.name = null;
    this.type = "";
    this.optional = !1;
    this.description = "";
  }
  get s() {
    return this.optional ? `${this.type}=` : this.type;
  }
}
const L = (a, b) => {
  let c = a.lastIndexOf("</arg>"), d = a;
  var e = [];
  -1 != c && (c += 6, e = a.slice(0, c), d = a.slice(c), e = K("arg", e), e = e.map(({content:g, props:f}) => {
    const k = new da;
    ca(k, g, f, b);
    return k;
  }));
  return {w:d, j:e};
};
const ea = fs.readFileSync;
const fa = a => {
  const b = a.replace(/^\s*\n/gm, "").split("\n").reduce((c, d) => {
    [{length:d = 0} = {}] = /^\s*/.exec(d) || [];
    return d < c ? d : c;
  }, Infinity);
  return a.replace(new RegExp(`^ {${b}}`, "gm"), "");
};
function M(a, b = "") {
  const c = b.split(/\s*,\s*/);
  return a.split(/\s*,\s*/).map(d => {
    let e = d = ea(d, "utf8");
    if (d = /\/\* start example \*\/\r?\n([\s\S]+?)\r?\n\s*\/\* end example \*\//.exec(d)) {
      [, d] = d, e = fa(d);
    }
    c.forEach(g => {
      const [f, k] = g.split(/\s*=>\s*/);
      e = e.replace(`'${f}'`, `'${k}'`);
      e = e.replace(`"${f}"`, `"${k}"`);
    });
    return e = e.replace(/@/g, "\uff20");
  });
}
function N(a, b, c = new RegExp(`([!?])?${b}\\.`, "g")) {
  b && (a.type = a.type.replace(c, "$1"));
}
class P {
  constructor(a = null) {
    this.g = this.description = this.name = null;
    this.h = "";
    this.default = this.u = null;
    this.optional = !1;
    this.aliases = [];
    this.v = !1;
    this.parsed = null;
    this.args = a;
    this.f = !1;
    this.examples = [];
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    const {function:{args:b, return:c, this:d, variableArgs:e}} = this.parsed;
    var g = b.map(k => a(k)).map((k, h) => {
      const {optional:m} = b[h];
      let {name:l = `arg${h}`, optional:p = m} = this.D[h] || {};
      return `${`${l}${p ? "?" : ""}`}: ${k}`;
    });
    if (d) {
      var f = a(d);
      g.unshift(`this: ${f}`);
    }
    if (e) {
      f = a(e);
      let k = "...args";
      try {
        k = `${this.args[this.args.length - 1].name}`;
      } catch (h) {
      }
      g.push(`${k}: ${f}[]`);
    }
    g = g.join(", ");
    f = c ? a(c) : "?";
    return `(${g}) => ${f}`;
  }
  get static() {
    return this.f;
  }
  get hasDefault() {
    return null !== this.default;
  }
  b(a, {name:b, string:c, "boolean":d, opt:e, number:g, type:f, "default":k, closure:h, alias:m, aliases:l, example:p, "example-override":n = "", noParams:q, "static":u, initial:t}) {
    if (!b) {
      throw Error("Property does not have a name.");
    }
    this.name = b;
    a && (this.description = F(a));
    a = E({A:g, C:c, l:d, type:f});
    q && (this.v = q);
    h && (this.u = h);
    this.type = a;
    void 0 !== k ? this.default = k : void 0 !== t && (this.default = t);
    if (e || void 0 !== k) {
      this.optional = !0;
    }
    m && (this.aliases = [m]);
    l && (this.aliases = l.split(/\s*,\s*/));
    u && (this.f = !0);
    p && (this.examples = M(p, n));
  }
  get type() {
    return this.g || "*";
  }
  set type(a) {
    this.g = a || null;
    this.h = this.u || this.g || "";
    if (!this.v) {
      try {
        this.parsed = B(this.h), this.isParsedFunction && !this.args && (this.args = []);
      } catch (b) {
        this.parsed = null;
      }
    }
  }
  get D() {
    var a = this.args;
    this.args && this.args[0] && "this" == this.args[0].name && ([, ...a] = this.args);
    return a;
  }
  get isParsedFunction() {
    return !!this.parsed && "function" == this.parsed.name;
  }
}
;class Q extends P {
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
;const S = (a, b, c = {}) => {
  let d;
  if ("object" == typeof b) {
    d = b;
  } else {
    try {
      (d = B(b)) || console.log("Could not parse %s", b);
    } catch (e) {
      console.log("Could not parse %s", b), console.error(e.message);
    }
  }
  return d ? R(d, a, c) : b;
}, R = (a, b, c = {}) => {
  if ("" == a.name && a.nullable) {
    return "?";
  }
  var {escapePipe:d = !0} = c;
  let e = "";
  var g = "";
  a.nullable ? g = "?" : !1 === a.nullable && (g = "!");
  if (a.function) {
    e = e + g + (a.name + "(");
    const f = [];
    a.function.this && (d = "this: " + R(a.function.this, b, c), f.push(d));
    a.function.new && (d = "new: " + R(a.function.new, b, c), f.push(d));
    a.function.args.forEach(k => {
      let h = R(k, b, c);
      k.optional && (h += "=");
      f.push(h);
    });
    a.function.variableArgs && (d = "..." + R(a.function.variableArgs, b, c), f.push(d));
    d = f.join(", ");
    e += d + ")";
    a.function.return && (e += ": " + R(a.function.return, b, c));
  } else {
    a.record ? (e += "{ ", d = Object.keys(a.record).map(f => {
      var k = a.record[f];
      if (!k) {
        return f;
      }
      k = R(k, b, c);
      return `${f}: ${k}`;
    }), e += d.join(", "), e += " }") : a.application ? (e += T(a.name, b, g, c) + "&lt;", d = a.application.map(f => R(f, b, c)), e += d.join(", "), e += "&gt;") : a.union ? (e = e + g + "(", g = a.union.map(f => R(f, b, c)), e += g.join(d ? " \\| " : " | "), e += ")") : e += T("any" == a.name ? "*" : a.name, b, g, c);
  }
  return e;
}, T = (a, b, c = "", d = {}) => {
  const {flatten:e = !1, nameProcess:g, link:f = ({link:m}) => `#${m}`} = d;
  d = ha(b, a);
  c = `${c}${a}`;
  if (!d) {
    return c;
  }
  let {link:k, type:{description:h}} = d;
  k = f(d);
  e && ((b = b.find(({fullName:m}) => m == a)) && b.link && (k = b.link), !h && b.description && (h = b.description), "function" == typeof e && e(a));
  b = g ? g(c) : c;
  return h ? `<a href="${k}" title="${h.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${k})`;
}, ha = (a, b) => {
  a = a.filter(({fullName:d}) => d == b);
  if (a.length) {
    var c = a.find(({import:d}) => d || !1);
    a = a.find(({import:d}) => !d) || c;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function ia(a, b = [], c = [], d = {}) {
  const {narrow:e = !1, flatten:g = !1, preprocessDesc:f, link:k} = d;
  if (!b.length) {
    return "";
  }
  const h = a.isConstructor || a.isInterface, m = b.some(({hasDefault:n}) => n), l = {flatten:g, escapePipe:!e, link:k}, p = n => S(c, n, l);
  a = b.map(n => {
    let q;
    n.args && n.isParsedFunction ? (q = n.toTypeScriptFunction(p), n.isConstructor && (q = `new ${q}`)) : q = S(c, n.parsed || n.type, l);
    const u = h || n.optional ? n.name : `${n.name}*`, t = n.hasDefault ? `\`${n.default}\`` : "-", r = f ? f(n.description) : n.description;
    return {prop:n, typeName:q, name:u, de:ja(r, !e), d:t};
  });
  if (e) {
    return {props:a, anyHaveDefault:m, constr:h};
  }
  a = a.map(({name:n, typeName:q, de:u, d:t, prop:r}) => [r.optional ? n : `__${n}__`, `<em>${q}</em>`, u, ...m ? [t] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...m ? [h ? "Initial" : "Default"] : []];
  return `

\`\`\`table
${JSON.stringify([b, ...a], null, 2)}
\`\`\``;
}
const ja = (a = "", b = !0) => {
  null === a && (a = "");
  b && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
};
function ka(a, b, c, d) {
  var e = K("prop", a).map(({content:h, props:m}) => {
    const l = new P;
    H(m, c);
    l.b(h, m);
    return l;
  });
  a = K(["function", "fn", "static"], a).map(({content:h, props:m, tag:l}) => {
    l = "static" == l;
    const {w:p, j:n} = L(h, b);
    h = new Q(n);
    const {F:q, o:u} = G(m, n, d);
    q.type = u;
    H(q, c);
    h.b(p, q);
    l && (h.f = !0);
    return h;
  });
  e = [...e, ...a];
  const {m:g, B:f, n:k} = e.reduce((h, m) => {
    m.isConstructor ? h.m.push(m) : m.static ? h.B.push(m) : h.n.push(m);
    return h;
  }, {m:[], B:[], n:[]});
  return {constructor:g[0] || null, properties:[...g, ...f, ...k]};
}
;class U {
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
    this.f = null;
  }
  get import() {
    return !1;
  }
  b(a, {name:b, type:c, desc:d, noToc:e, spread:g, noExpand:f, link:k, closure:h, constructor:m, "extends":l, "interface":p, record:n, example:q, "example-override":u}, t, r = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    c && (this.type = c);
    h ? this.closureType = h : this.closureType = this.type;
    d && (this.description = F(d));
    this.noToc = !!e;
    this.spread = !!g;
    this.noExpand = !!f;
    k && (this.link = k);
    !0 === m && (this.isConstructor = m);
    !0 === p && (this.isInterface = p);
    !0 === n && (this.isRecord = n);
    l && (this.extends = l);
    t && (this.namespace = t);
    if (a) {
      const {properties:w, constructor:O} = ka(a, r, this.f, this.fullName);
      O && (this.args = O.args);
      this.properties = w;
    }
    q && (a = {example:q}, H(a, this.f), this.examples = M(a.example, u));
  }
  h(a, b = new RegExp(`([!?])?${a}\\.`, "g")) {
    this.type && (this.type = this.type.replace(b, "$1"));
    this.extends && (this.extends = this.extends.replace(b, "$1"));
    return b;
  }
  get tag() {
    return this.isConstructor ? "constructor" : this.isInterface ? "interface" : this.isRecord ? "record" : "";
  }
  get ns() {
    return this.namespace ? `${this.namespace}.` : "";
  }
  get fullName() {
    return `${this.ns}${this.name}`;
  }
  toMarkdown(a = [], b = {}) {
    const {flatten:c, details:d = []} = b, e = d.includes(this.name);
    var g = this.type ? `\`${this.type}\`` : "", f = g;
    this.link ? f = `[${g}](${this.link})` : !this.import && this.type && (f = S(a, this.type, b), g = f != this.type, f = V(f, g));
    g = V(this.fullName);
    g = this.import ? `[${g}](l-type)` : this.noToc ? `[${g}](l-type)` : `[${g}](t-type)`;
    const k = this.description ? `: ${this.description}` : "";
    f = f ? `${f} ` : "";
    let h = /_/.test(g);
    if (this.extends) {
      const m = la(this.extends, a, b), l = ` extends ${m}`;
      h = h || /_/.test(m);
      f = (h ? f + "<strong>" : f + "__") + (g + l);
      "function" == typeof c && c(this.extends);
    } else {
      f = (h ? f + "<strong>" : f + "__") + g;
    }
    f = (h ? f + "</strong>" : f + "__") + k;
    a = ia(this, this.properties, a, b);
    return {LINE:f, table:a, displayInDetails:e};
  }
}
const V = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`, la = (a, b, c) => a.split(/,\s*/).map(d => {
  let e = `\`${d}\``;
  var g = b.find(({fullName:f}) => f == d);
  g && g.link ? (e = "<a ", g.description && (e += `title="${g.description}" `), e += `href="${g.link}">\`${d}\`</a>`) : (g = S(b, d, {...c, nameProcess:f => `\`${f}\``}), d != g && (e = g));
  return e;
}).join(", ");
class W extends U {
  constructor() {
    super();
    this.g = null;
    this.async = !1;
  }
  get isMethod() {
    return !0;
  }
  b(a, {async:b, "return":c, ...d}, ...e) {
    this.description = F(a);
    super.b("", d, ...e);
    c && (this.g = c.replace(/\n\s*/g, " "));
    b && (this.async = !0);
  }
  get return() {
    return this.g || "void";
  }
  h(a) {
    a = super.h(a);
    this.g && (this.g = this.g.replace(a, "$1"));
  }
}
;class ma extends U {
  constructor() {
    super();
    this.from = "";
  }
  get import() {
    return !0;
  }
  b(a, {from:b, name:c, ...d}, e, g) {
    if (!b) {
      throw Error("From attribute of import is not given.");
    }
    this.from = b;
    this.description = F(a);
    super.b("", {...d, noToc:!0, name:c, type:`import('${b}').${c}`}, e != g ? e : null);
  }
}
;const na = os.homedir;
na();
const oa = (a, b) => {
  const c = new RegExp(`([!?])?${a}\\.`, "g");
  b.properties.forEach(d => {
    N(d, a, c);
  });
  b.h(a);
}, X = (a, b) => {
  var {args:c = []} = a;
  const d = `function(${c.map(({s:e}) => e).join(", ")}): ${a.fullName}`;
  c = new Q(c);
  c.isConstructor = !0;
  c.b("Constructor method.", {type:d, name:"constructor"});
  c.examples = a.examples;
  N(c, b);
  a.properties.unshift(c);
}, Y = (a, b, c, d, e = !1, g = null) => {
  const f = e ? new W : new U;
  f.f = g;
  g = a.search(/<(prop|function|fn|static) /);
  let k = "", h = a;
  1 != g && (k = a.slice(0, g), h = a.slice(g));
  const {j:m, w:l} = L(k, d);
  f.b(e ? l : h, b, c, d);
  ({o:a} = G(b, m));
  e && (f.closureType = a);
  f.args || (f.args = m);
  return f;
}, Z = ({content:a, props:b, ns:c, i:d, isMethod:e = !1, location:g = null}) => {
  const f = [], {alias:k, aliases:h, ...m} = b;
  b = Y(a, b, c, d, e, g);
  f.push(b);
  (k ? [k] : h ? h.split(/, */) : []).forEach(l => {
    l = Y(a, {...m, name:l}, c, d, e, g);
    l.description = `${l.description}${l.description ? " " : ""}Alias of \`${m.name}\`.`;
    f.push(l);
  });
  return f;
};
module.exports = {_Type:U, _Property:P, _Method:W, _parseFile:(a, b, c = null) => {
  a = K("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:d, props:{namespace:e, ns:g = e}}] = a, f = b == g ? void 0 : g, k = [];
  a = K(["type", "interface", "constructor", "method", "import"], d).reduce((h, {content:m, props:l, tag:p}) => {
    const {alias:n, aliases:q, ...u} = l;
    c && H(u, c);
    var t = n ? [n] : q ? q.split(/, */) : [];
    switch(p) {
      case "type":
        p = new U;
        c && (p.f = c);
        p.b(m, l, f, b);
        h.push(p);
        t.forEach(r => {
          const w = new U;
          c && (w.f = c);
          w.b(m, {...u, name:r}, f, b);
          h.push(w);
        });
        break;
      case "interface":
        l = Z({content:m, props:l, ns:f, i:b, location:c});
        l.forEach(r => {
          r.properties.some(({isConstructor:w}) => w) || X(r, b);
          r.isInterface = !0;
        });
        h.push(...l);
        break;
      case "constructor":
        l = Z({content:m, props:l, ns:f, i:b, location:c});
        l.forEach(r => {
          r.properties.some(({isConstructor:w}) => w) || X(r, b);
          r.isConstructor = !0;
        });
        h.push(...l);
        break;
      case "method":
        l = Z({content:m, props:l, ns:f, i:b, isMethod:!0, location:c});
        h.push(...l);
        break;
      case "import":
        t = new ma, t.b(m, l, l.ns || l.from, b), k.push(t);
    }
    return h;
  }, []);
  b && a.forEach(h => oa(b, h));
  return {namespace:g, types:a, imports:k};
}, _getLinks:S};


//# sourceMappingURL=typal.js.map