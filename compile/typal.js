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
function z(a, b, c) {
  const d = [];
  b.replace(a, (e, ...g) => {
    e = g.slice(0, g.length - 2).reduce((f, l, h) => {
      h = c[h];
      if (!h || void 0 === l) {
        return f;
      }
      f[h] = l;
      return f;
    }, {});
    d.push(e);
  });
  return d;
}
;const A = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), B = new RegExp(`(?:\\s+((?:${A.source}\\s*)*))`);
const D = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return z(new RegExp(`<(${a})${B.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:c, a:d = "", c:e = ""}) => {
    d = d.replace(/\/$/, "").trim();
    d = C(d);
    return {content:e, props:d, tag:c};
  });
}, C = a => z(A, a, ["key", "val", "def", "f"]).reduce((b, {key:c, val:d}) => {
  if (void 0 === d) {
    return b[c] = !0, b;
  }
  b[c] = "true" == d ? !0 : "false" == d ? !1 : /^\d+$/.test(d) ? parseInt(d, 10) : d;
  return b;
}, {});
const E = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function F(a) {
  let b = 0;
  const c = (e = 1) => a[b + e], d = (e = !0, g = []) => {
    var f = {};
    let l = a[b];
    if (["nullable", "nonNullable"].includes(l)) {
      if (!e) {
        throw Error(`${l} not allowed after .`);
      }
      f.nullable = "nullable" === l;
      b++;
    }
    l = a[b];
    if ("(" == l) {
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
      if ("{" == l) {
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
            } catch (n) {
              throw n.message += `(when parsing ${h} property)`, n;
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
    if (["nonNullable", "nullable"].includes(l)) {
      throw Error("Nullability already defined.");
    }
    if (/[=),:.<>}|]/.test(l)) {
      throw Error(`Unexpected token ${l}.`);
    }
    "|" != a[b] && (f.name = a[b], b++);
    if ("function" == l) {
      m = f;
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
              k = d();
              if (")" != a[b]) {
                throw Error("Variable args must come last");
              }
              h.variableArgs = k;
            } else {
              k = d(), h.args.push(k), "=" == a[b] && (k.optional = !0, b++);
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
      ":" == a[b] && (b++, k = d(), void 0 == k.name && k.nullable && (k.name = ""), h.return = k);
      m.function = h;
    } else {
      if ("<" == a[b] || (h = "." == a[b] && "<" == c())) {
        b++;
        h && b++;
        m = f;
        for (h = []; ">" != a[b];) {
          k = d();
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
;function G(a) {
  a = E(a);
  return F(a);
}
;const aa = path.dirname, ba = path.resolve;
const H = ({A:a, C:b, l:c, type:d}) => b ? "string" : a ? "number" : c ? "boolean" : d ? d : "*", I = a => {
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
}, J = (a, b, c = null) => {
  const {async:d, "void":e, "return":g = e ? "void" : "", ...f} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({s:l, name:h}) => "this" == h ? `${h}: ${l}` : h.startsWith("...") ? `...${l}` : l).join(","));
  b = g.replace(/\n\s*/g, " ");
  d && b ? b = `!Promise<${b}>` : d && (b = "!Promise");
  !b && "constructor" == f.name && c && (b = c);
  c = `function(${a})`;
  b && (c += `: ${b}`);
  return {F:{...f, async:d, return:b}, o:c};
};
function K(a, b) {
  const c = a.example;
  c && c.startsWith(".") && b && (a.example = ba(aa(b), c));
}
;function ca(a, b, {name:c, string:d, "boolean":e, opt:g, number:f, type:l}, h) {
  if (!c) {
    throw Error("Argument does not have a name.");
  }
  a.name = c;
  b && (a.description = I(b));
  b = H({A:f, C:d, l:e, type:l});
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
  -1 != c && (c += 6, e = a.slice(0, c), d = a.slice(c), e = D("arg", e), e = e.map(({content:g, props:f}) => {
    const l = new da;
    ca(l, g, f, b);
    return l;
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
      const [f, l] = g.split(/\s*=>\s*/);
      e = e.replace(`'${f}'`, `'${l}'`);
      e = e.replace(`"${f}"`, `"${l}"`);
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
    var g = b.map(l => a(l)).map((l, h) => {
      const {optional:m} = b[h];
      let {name:k = `arg${h}`, optional:n = m} = this.D[h] || {};
      return `${`${k}${n ? "?" : ""}`}: ${l}`;
    });
    if (d) {
      var f = a(d);
      g.unshift(`this: ${f}`);
    }
    if (e) {
      f = a(e);
      let l = "...args";
      try {
        l = `${this.args[this.args.length - 1].name}`;
      } catch (h) {
      }
      g.push(`${l}: ${f}[]`);
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
  b(a, {name:b, string:c, "boolean":d, opt:e, number:g, type:f, "default":l, closure:h, alias:m, aliases:k, example:n, "example-override":q = "", noParams:p, "static":u, initial:t}) {
    if (!b) {
      throw Error("Property does not have a name.");
    }
    this.name = b;
    a && (this.description = I(a));
    a = H({A:g, C:c, l:d, type:f});
    p && (this.v = p);
    h && (this.u = h);
    this.type = a;
    void 0 !== l ? this.default = l : void 0 !== t && (this.default = t);
    if (e || void 0 !== l) {
      this.optional = !0;
    }
    m && (this.aliases = [m]);
    k && (this.aliases = k.split(/\s*,\s*/));
    u && (this.f = !0);
    n && (this.examples = M(n, q));
  }
  get type() {
    return this.g || "*";
  }
  set type(a) {
    this.g = a || null;
    this.h = this.u || this.g || "";
    if (!this.v) {
      try {
        this.parsed = G(this.h), this.isParsedFunction && !this.args && (this.args = []);
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
    this.return = "";
  }
  b(a, b) {
    super.b(a, b);
    "constructor" == b.name && (this.isConstructor = !0);
    this.async = b.async;
    this.return = b.return;
  }
}
;function ha(a, b, c, d) {
  var e = D("prop", a).map(({content:h, props:m}) => {
    const k = new P;
    K(m, c);
    k.b(h, m);
    return k;
  });
  a = D(["function", "fn", "static"], a).map(({content:h, props:m, tag:k}) => {
    k = "static" == k;
    const {w:n, j:q} = L(h, b);
    h = new Q(q);
    const {F:p, o:u} = J(m, q, d);
    p.type = u;
    K(p, c);
    h.b(n, p);
    k && (h.f = !0);
    return h;
  });
  e = [...e, ...a];
  const {m:g, B:f, n:l} = e.reduce((h, m) => {
    m.isConstructor ? h.m.push(m) : m.static ? h.B.push(m) : h.n.push(m);
    return h;
  }, {m:[], B:[], n:[]});
  return {constructor:g[0] || null, properties:[...g, ...f, ...l]};
}
;const S = (a, b, c = {}) => {
  let d;
  if ("object" == typeof b) {
    d = b;
  } else {
    try {
      (d = G(b)) || console.log("Could not parse %s", b);
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
    a.function.args.forEach(l => {
      let h = R(l, b, c);
      l.optional && (h += "=");
      f.push(h);
    });
    a.function.variableArgs && (d = "..." + R(a.function.variableArgs, b, c), f.push(d));
    d = f.join(", ");
    e += d + ")";
    a.function.return && (e += ": " + R(a.function.return, b, c));
  } else {
    a.record ? (e += "{ ", d = Object.keys(a.record).map(f => {
      var l = a.record[f];
      if (!l) {
        return f;
      }
      l = R(l, b, c);
      return `${f}: ${l}`;
    }), e += d.join(", "), e += " }") : a.application ? (e += T(a.name, b, g, c) + "&lt;", d = a.application.map(f => R(f, b, c)), e += d.join(", "), e += "&gt;") : a.union ? (e = e + g + "(", g = a.union.map(f => R(f, b, c)), e += g.join(d ? " \\| " : " | "), e += ")") : e += T("any" == a.name ? "*" : a.name, b, g, c);
  }
  return e;
}, T = (a, b, c = "", d = {}) => {
  const {flatten:e = !1, nameProcess:g, link:f = ({link:m}) => `#${m}`} = d;
  d = ia(b, a);
  c = `${c}${a}`;
  if (!d) {
    return c;
  }
  let {link:l, type:{description:h}} = d;
  l = f(d);
  e && ((b = b.find(({fullName:m}) => m == a)) && b.link && (l = b.link), !h && b.description && (h = b.description), "function" == typeof e && e(a));
  b = g ? g(c) : c;
  return h ? `<a href="${l}" title="${h.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${l})`;
}, ia = (a, b) => {
  a = a.filter(({fullName:d}) => d == b);
  if (a.length) {
    var c = a.find(({import:d}) => d || !1);
    a = a.find(({import:d}) => !d) || c;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function ja(a, b = [], c = [], d = {}) {
  const {narrow:e = !1, preprocessDesc:g} = d;
  if (!b.length) {
    return "";
  }
  const f = a.isConstructor || a.isInterface, l = b.some(({hasDefault:m}) => m), h = {escapePipe:!e, ...d};
  a = b.map((m, k) => {
    const n = 0 < (k + 1) % 2;
    k = t => S(c, t, {...h, nameProcess:d.nameProcess ? r => d.nameProcess(r, n) : void 0});
    m.args && m.isParsedFunction ? (k = m.toTypeScriptFunction(k), m.isConstructor && (k = `new ${k}`)) : k = k(m.parsed || m.type);
    const q = f || m.optional ? m.name : `${m.name}*`, p = m.hasDefault ? `\`${m.default}\`` : "-", u = g ? g(m.description) : m.description;
    return {prop:m, typeName:k, name:q, de:ka(u, !e), d:p, G:n};
  });
  if (e) {
    return {props:a, anyHaveDefault:l, constr:f};
  }
  a = a.map(({name:m, typeName:k, de:n, d:q, prop:p}) => [p.optional ? m : `__${m}__`, `<em>${k}</em>`, n, ...l ? [q] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...l ? [f ? "Initial" : "Default"] : []];
  return `

\`\`\`table
${JSON.stringify([b, ...a], null, 2)}
\`\`\``;
}
const ka = (a = "", b = !0) => {
  null === a && (a = "");
  b && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
};
const la = (a, b, c = {}) => {
  function d(e) {
    e.replace(/^!?/, "");
    return `\`${e}\``;
  }
  return a.split(/,\s*/).map(e => S(b, e, {flatten:!0, ...c, nameProcess:c.nameProcess ? g => {
    g = c.nameProcess(g);
    return /[_*~>]/.test(g) ? `<code>${g}</code>` : d(g);
  } : d})).join(", ");
};
class U {
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
  b(a, {name:b, type:c, desc:d, noToc:e, spread:g, noExpand:f, link:l, closure:h, constructor:m, "extends":k, "interface":n, record:q, example:p, "example-override":u}, t, r = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    c && (this.type = c);
    h ? this.closureType = h : this.closureType = this.type;
    d && (this.description = I(d));
    this.noToc = !!e;
    this.spread = !!g;
    this.noExpand = !!f;
    l && (this.link = l);
    !0 === m && (this.isConstructor = m);
    !0 === n && (this.isInterface = n);
    !0 === q && (this.isRecord = q);
    k && (this.extends = k);
    t && (this.namespace = t);
    if (a) {
      const {properties:w, constructor:O} = ha(a, r, this.f, this.fullName);
      O && (this.args = O.args);
      this.properties = w;
    }
    p && (a = {example:p}, K(a, this.f), this.examples = M(a.example, u));
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
    const l = this.description ? `: ${this.description}` : "";
    f = f ? `${f} ` : "";
    let h = /_/.test(g);
    if (this.extends) {
      const m = la(this.extends, a, b), k = ` extends ${m}`;
      h = h || /_/.test(m);
      f = (h ? f + "<strong>" : f + "__") + (g + k);
      "function" == typeof c && c(this.extends);
    } else {
      f = (h ? f + "<strong>" : f + "__") + g;
    }
    f = (h ? f + "</strong>" : f + "__") + l;
    a = ja(this, this.properties, a, b);
    return {LINE:f, table:a, displayInDetails:e};
  }
}
const V = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`;
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
    this.description = I(a);
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
    this.description = I(a);
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
  let l = "", h = a;
  1 != g && (l = a.slice(0, g), h = a.slice(g));
  const {j:m, w:k} = L(l, d);
  f.b(e ? k : h, b, c, d);
  ({o:a} = J(b, m));
  e && (f.closureType = a);
  f.args || (f.args = m);
  return f;
}, Z = ({content:a, props:b, ns:c, i:d, isMethod:e = !1, location:g = null}) => {
  const f = [], {alias:l, aliases:h, ...m} = b;
  b = Y(a, b, c, d, e, g);
  f.push(b);
  (l ? [l] : h ? h.split(/, */) : []).forEach(k => {
    k = Y(a, {...m, name:k}, c, d, e, g);
    k.description = `${k.description}${k.description ? " " : ""}Alias of \`${m.name}\`.`;
    f.push(k);
  });
  return f;
};
module.exports = {_Type:U, _Property:P, _Method:W, _parseFile:(a, b, c = null) => {
  a = D("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:d, props:{namespace:e, ns:g = e}}] = a, f = b == g ? void 0 : g, l = [];
  a = D("type interface constructor method import record".split(" "), d).reduce((h, {content:m, props:k, tag:n}) => {
    "record" == n && (n = "type", k.record = !0);
    const {alias:q, aliases:p, ...u} = k;
    c && K(u, c);
    var t = q ? [q] : p ? p.split(/, */) : [];
    switch(n) {
      case "type":
        n = new U;
        c && (n.f = c);
        n.b(m, k, f, b);
        h.push(n);
        t.forEach(r => {
          const w = new U;
          c && (w.f = c);
          w.b(m, {...u, name:r}, f, b);
          h.push(w);
        });
        break;
      case "interface":
        k = Z({content:m, props:k, ns:f, i:b, location:c});
        k.forEach(r => {
          r.properties.some(({isConstructor:w}) => w) || X(r, b);
          r.isInterface = !0;
        });
        h.push(...k);
        break;
      case "constructor":
        k = Z({content:m, props:k, ns:f, i:b, location:c});
        k.forEach(r => {
          r.properties.some(({isConstructor:w}) => w) || X(r, b);
          r.isConstructor = !0;
        });
        h.push(...k);
        break;
      case "method":
        k = Z({content:m, props:k, ns:f, i:b, isMethod:!0, location:c});
        h.push(...k);
        break;
      case "import":
        t = new ma, t.b(m, k, k.ns || k.from, b), l.push(t);
    }
    return h;
  }, []);
  b && a.forEach(h => oa(b, h));
  return {namespace:g, types:a, imports:l};
}, _getLinks:S};


//# sourceMappingURL=typal.js.map