#!/usr/bin/env node
             
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const os = require('os');             
var v = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  a != Array.prototype && a != Object.prototype && (a[b] = d.value);
}, x = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function y(a, b) {
  if (b) {
    var d = x;
    a = a.split(".");
    for (var c = 0; c < a.length - 1; c++) {
      var e = a[c];
      e in d || (d[e] = {});
      d = d[e];
    }
    a = a[a.length - 1];
    c = d[a];
    b = b(c);
    b != c && null != b && v(d, a, {configurable:!0, writable:!0, value:b});
  }
}
y("String.prototype.trimRight", function(a) {
  function b() {
    return this.replace(/[\s\xa0]+$/, "");
  }
  return a || b;
});
function z(a, b, d) {
  const c = [];
  b.replace(a, (e, ...h) => {
    e = h.slice(0, h.length - 2).reduce((f, k, g) => {
      g = d[g];
      if (!g || void 0 === k) {
        return f;
      }
      f[g] = k;
      return f;
    }, {});
    c.push(e);
  });
  return c;
}
;const A = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), B = new RegExp(`(?:\\s+((?:${A.source}\\s*)*))`);
const D = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return z(new RegExp(`<(${a})${B.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:d, a:c = "", c:e = ""}) => {
    c = c.replace(/\/$/, "").trim();
    c = C(c);
    return {content:e, props:c, tag:d};
  });
}, C = a => z(A, a, ["key", "val", "def", "f"]).reduce((b, {key:d, val:c}) => {
  if (void 0 === c) {
    return b[d] = !0, b;
  }
  b[d] = "true" == c ? !0 : "false" == c ? !1 : /^\d+$/.test(c) ? parseInt(c, 10) : c;
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
  const d = (e = 1) => a[b + e], c = (e = !0, h = []) => {
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
      f = {...c(!0, []), ...f};
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
        h = f;
        for (e = {}; "}" != a[b];) {
          var g = a[b];
          b++;
          e[g] = null;
          if (":" == a[b]) {
            b++;
            try {
              var m = c();
              e[g] = m;
            } catch (n) {
              throw n.message += `(when parsing ${g} property)`, n;
            }
          }
          if ("}" == a[b]) {
            b++;
            break;
          }
          if ("," != a[b]) {
            throw Error(`Expecting , for record after ${g}`);
          }
          b++;
        }
        h.record = e;
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
      g = {return:null, args:[]};
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
            if ("." == a[b] && "." == d() && "." == d(2)) {
              b++;
              b++;
              b++;
              l = c();
              if (")" != a[b]) {
                throw Error("Variable args must come last");
              }
              g.variableArgs = l;
            } else {
              l = c(), g.args.push(l), "=" == a[b] && (l.optional = !0, b++);
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
      ":" == a[b] && (b++, l = c(), void 0 == l.name && l.nullable && (l.name = ""), g.return = l);
      m.function = g;
    } else {
      if ("<" == a[b] || (g = "." == a[b] && "<" == d())) {
        b++;
        g && b++;
        m = f;
        for (g = []; ">" != a[b];) {
          l = c();
          g.push(l);
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
        m.application = g;
      }
    }
    for (; "." == a[b];) {
      f.name += ".";
      b++;
      ({name:m} = c(!1));
      if (!m) {
        throw Error("Expected to see the name after .");
      }
      f.name += m;
    }
    if ("|" != a[b] || !e) {
      return f;
    }
    for (h.push(f); "|" == a[b];) {
      b++, f = c(!0, h), f.union !== h && h.push(f);
    }
    return {union:h};
  };
  return c();
}
;function G(a) {
  a = E(a);
  return F(a);
}
;const aa = path.dirname, ba = path.resolve;
const H = ({A:a, C:b, l:d, type:c}) => b ? "string" : a ? "number" : d ? "boolean" : c ? c : "*", I = a => {
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
    return d.map(h => h.replace(e, "")).join("\n");
  }
}, J = (a, b, d = null) => {
  const {async:c, "void":e, "return":h = e ? "void" : "", ...f} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({s:k, name:g}) => "this" == g ? `${g}: ${k}` : g.startsWith("...") ? `...${k}` : k).join(","));
  b = h.replace(/\n\s*/g, " ");
  c && b ? b = `!Promise<${b}>` : c && (b = "!Promise");
  d = `function(${"constructor" == f.name ? `new: ${d}, ` : ""}${a})`;
  b && (d += `: ${b}`);
  return {F:{...f, async:c, return:b}, o:d};
};
function K(a, b) {
  const d = a.example;
  d && d.startsWith(".") && b && (a.example = ba(aa(b), d));
}
;function ca(a, b, {name:d, string:c, "boolean":e, opt:h, number:f, type:k}, g) {
  if (!d) {
    throw Error("Argument does not have a name.");
  }
  a.name = d;
  b && (a.description = I(b));
  b = H({A:f, C:c, l:e, type:k});
  g && (b = b.replace(new RegExp(`([!?])?${g}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), h = !0);
  a.type = b;
  h && (a.optional = !0);
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
  let d = a.lastIndexOf("</arg>"), c = a;
  var e = [];
  -1 != d && (d += 6, e = a.slice(0, d), c = a.slice(d), e = D("arg", e), e = e.map(({content:h, props:f}) => {
    const k = new da;
    ca(k, h, f, b);
    return k;
  }));
  return {w:c, j:e};
};
const ea = fs.readFileSync;
const fa = a => {
  const b = a.replace(/^\s*\n/gm, "").split("\n").reduce((d, c) => {
    [{length:c = 0} = {}] = /^\s*/.exec(c) || [];
    return c < d ? c : d;
  }, Infinity);
  return a.replace(new RegExp(`^ {${b}}`, "gm"), "");
};
function M(a, b = "") {
  const d = b.split(/\s*,\s*/);
  return a.split(/\s*,\s*/).map(c => {
    let e = c = ea(c, "utf8");
    if (c = /\/\* start example \*\/\r?\n([\s\S]+?)\r?\n\s*\/\* end example \*\//.exec(c)) {
      [, c] = c, e = fa(c);
    }
    d.forEach(h => {
      const [f, k] = h.split(/\s*=>\s*/);
      e = e.replace(`'${f}'`, `'${k}'`);
      e = e.replace(`"${f}"`, `"${k}"`);
    });
    return e = e.replace(/@/g, "\uff20");
  });
}
function N(a, b, d = new RegExp(`([!?])?${b}\\.`, "g")) {
  b && (a.f && (a.f = a.f.replace(d, "$1")), a.type = a.type.replace(d, "$1"));
}
class P {
  constructor(a = null) {
    this.h = this.description = this.name = null;
    this.u = "";
    this.default = this.f = null;
    this.optional = !1;
    this.aliases = [];
    this.v = !1;
    this.parsed = null;
    this.args = a;
    this.g = !1;
    this.examples = [];
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    let {function:{new:b, args:d, return:c, this:e, variableArgs:h}} = this.parsed;
    b && (c = b);
    var f = d.map(g => a(g)).map((g, m) => {
      const {optional:l} = d[m];
      let {name:n = `arg${m}`, optional:p = l} = this.D[m] || {};
      return `${`${n}${p ? "?" : ""}`}: ${g}`;
    });
    if (e) {
      var k = a(e);
      f.unshift(`this: ${k}`);
    }
    if (h) {
      k = a(h);
      let g = "...args";
      try {
        g = `${this.args[this.args.length - 1].name}`;
      } catch (m) {
      }
      f.push(`${g}: ${k}[]`);
    }
    f = f.join(", ");
    k = c ? a(c) : "?";
    f = `(${f}) => ${k}`;
    b && (f = "new " + f);
    return f;
  }
  get static() {
    return this.g;
  }
  get hasDefault() {
    return null !== this.default;
  }
  b(a, {name:b, string:d, "boolean":c, opt:e, number:h, type:f, "default":k, closure:g, alias:m, aliases:l, example:n, "example-override":p = "", noParams:q, "static":t, initial:r}) {
    if (!b) {
      throw Error("Property does not have a name.");
    }
    this.name = b;
    a && (this.description = I(a));
    a = H({A:h, C:d, l:c, type:f});
    q && (this.v = q);
    g && (this.f = g);
    this.type = a;
    void 0 !== k ? this.default = k : void 0 !== r && (this.default = r);
    if (e || void 0 !== k) {
      this.optional = !0;
    }
    m && (this.aliases = [m]);
    l && (this.aliases = l.split(/\s*,\s*/));
    t && (this.g = !0);
    n && (this.examples = M(n, p));
  }
  get type() {
    return this.h || "*";
  }
  set type(a) {
    this.h = a || null;
    this.u = this.f || this.h || "";
    if (!this.v) {
      try {
        this.parsed = G(this.u), this.isParsedFunction && !this.args && (this.args = []);
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
;function ha(a, b, d, c) {
  var e = D("prop", a).map(({content:g, props:m}) => {
    const l = new P;
    K(m, d);
    l.b(g, m);
    return l;
  });
  a = D(["function", "fn", "static"], a).map(({content:g, props:m, tag:l}) => {
    l = "static" == l;
    const {w:n, j:p} = L(g, b);
    g = new Q(p);
    const {F:q, o:t} = J(m, p, c);
    q.type = t;
    K(q, d);
    g.b(n, q);
    l && (g.g = !0);
    return g;
  });
  e = [...e, ...a];
  const {m:h, B:f, n:k} = e.reduce((g, m) => {
    m.isConstructor ? g.m.push(m) : m.static ? g.B.push(m) : g.n.push(m);
    return g;
  }, {m:[], B:[], n:[]});
  return {constructor:h[0] || null, properties:[...h, ...f, ...k]};
}
;const S = (a, b, d = {}) => {
  let c;
  if ("object" == typeof b) {
    c = b;
  } else {
    try {
      (c = G(b)) || console.log("Could not parse %s", b);
    } catch (e) {
      console.log("Could not parse %s", b), console.error(e.message);
    }
  }
  return c ? R(c, a, d) : b;
}, R = (a, b, d = {}) => {
  if ("" == a.name && a.nullable) {
    return "?";
  }
  var {escapePipe:c = !0} = d;
  let e = "";
  var h = "";
  a.nullable ? h = "?" : !1 === a.nullable && (h = "!");
  if (a.function) {
    e = e + h + (a.name + "(");
    const f = [];
    a.function.this && (c = "this: " + R(a.function.this, b, d), f.push(c));
    a.function.new && (c = "new: " + R(a.function.new, b, d), f.push(c));
    a.function.args.forEach(k => {
      let g = R(k, b, d);
      k.optional && (g += "=");
      f.push(g);
    });
    a.function.variableArgs && (c = "..." + R(a.function.variableArgs, b, d), f.push(c));
    c = f.join(", ");
    e += c + ")";
    a.function.return && (e += ": " + R(a.function.return, b, d));
  } else {
    a.record ? (e += "{ ", c = Object.keys(a.record).map(f => {
      var k = a.record[f];
      if (!k) {
        return f;
      }
      k = R(k, b, d);
      return `${f}: ${k}`;
    }), e += c.join(", "), e += " }") : a.application ? (e += T(a.name, b, h, d) + "&lt;", c = a.application.map(f => R(f, b, d)), e += c.join(", "), e += "&gt;") : a.union ? (e = e + h + "(", h = a.union.map(f => R(f, b, d)), e += h.join(c ? " \\| " : " | "), e += ")") : e += T("any" == a.name ? "*" : a.name, b, h, d);
  }
  return e;
}, T = (a, b, d = "", c = {}) => {
  const {flatten:e = !1, nameProcess:h, link:f = ({link:m}) => `#${m}`} = c;
  c = ia(b, a);
  d = `${d}${a}`;
  if (!c) {
    return d;
  }
  let {link:k, type:{description:g}} = c;
  e && ((b = b.find(({fullName:m}) => m == a)) && b.link && (k = b.link), !g && b.description && (g = b.description), "function" == typeof e && e(a));
  c.link == k && (k = f(c));
  b = h ? h(d) : d;
  return g ? `<a href="${k}" title="${g.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${k})`;
}, ia = (a, b) => {
  a = a.filter(({fullName:c}) => c == b);
  if (a.length) {
    var d = a.find(({import:c}) => c || !1);
    a = a.find(({import:c}) => !c) || d;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function ja(a, b = [], d = [], c = {}) {
  const {narrow:e = !1, preprocessDesc:h} = c;
  if (!b.length) {
    return "";
  }
  const f = a.isConstructor || a.isInterface, k = b.some(({hasDefault:n}) => n), g = {escapePipe:!e, ...c};
  let m;
  const l = n => S(d, n, {...g, nameProcess:c.nameProcess ? p => c.nameProcess(p, m) : void 0});
  a = b.map((n, p) => {
    m = 0 < (p + 1) % 2;
    p = n.args && n.isParsedFunction ? n.toTypeScriptFunction(l) : l(n.parsed || n.type);
    const q = f || n.optional ? n.name : `${n.name}*`, t = n.hasDefault ? `\`${n.default}\`` : "-", r = h ? h(n.description) : n.description;
    return {prop:n, typeName:p, name:q, de:ka(r, !e), d:t, G:m};
  });
  if (e) {
    return {props:a, anyHaveDefault:k, constr:f};
  }
  a = a.map(({name:n, typeName:p, de:q, d:t, prop:r}) => [r.optional ? n : `__${n}__`, `<em>${p}</em>`, q, ...k ? [t] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...k ? [f ? "Initial" : "Default"] : []];
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
const la = (a, b, d = {}) => {
  function c(e) {
    e.replace(/^!?/, "");
    return `\`${e}\``;
  }
  return a.split(/,\s*/).map(e => S(b, e, {flatten:!0, ...d, nameProcess:d.nameProcess ? h => {
    h = d.nameProcess(h);
    return /[_*~>]/.test(h) ? `<code>${h}</code>` : c(h);
  } : c})).join(", ");
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
  b(a, {name:b, type:d, desc:c, noToc:e, spread:h, noExpand:f, link:k, closure:g, constructor:m, "extends":l, "interface":n, record:p, example:q, "example-override":t}, r, u = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    d && (this.type = d);
    g ? this.closureType = g : this.closureType = this.type;
    c && (this.description = I(c));
    this.noToc = !!e;
    this.spread = !!h;
    this.noExpand = !!f;
    k && (this.link = k);
    !0 === m && (this.isConstructor = m);
    !0 === n && (this.isInterface = n);
    !0 === p && (this.isRecord = p);
    l && (this.extends = l);
    r && (this.namespace = r);
    if (a) {
      const {properties:w, constructor:O} = ha(a, u, this.f, this.fullName);
      O && (this.args = O.args);
      this.properties = w;
    }
    q && (a = {example:q}, K(a, this.f), this.examples = M(a.example, t));
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
    const {flatten:d, details:c = []} = b, e = c.includes(this.name);
    var h = this.type ? `\`${this.type}\`` : "", f = h;
    this.link ? f = `[${h}](${this.link})` : !this.import && this.type && (f = S(a, this.type, b), h = f != this.type, f = V(f, h));
    h = V(this.fullName);
    h = this.import ? `[${h}](l-type)` : this.noToc ? `[${h}](l-type)` : `[${h}](t-type)`;
    const k = this.description ? `: ${this.description}` : "";
    f = f ? `${f} ` : "";
    let g = /_/.test(h);
    if (this.extends) {
      const m = la(this.extends, a, b), l = ` extends ${m}`;
      g = g || /_/.test(m);
      f = (g ? f + "<strong>" : f + "__") + (h + l);
      "function" == typeof d && d(this.extends);
    } else {
      f = (g ? f + "<strong>" : f + "__") + h;
    }
    f = (g ? f + "</strong>" : f + "__") + k;
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
  b(a, {async:b, "return":d, ...c}, ...e) {
    this.description = I(a);
    super.b("", c, ...e);
    d && (this.g = d.replace(/\n\s*/g, " "));
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
  b(a, {from:b, name:d, ...c}, e, h) {
    if (!b) {
      throw Error("From attribute of import is not given.");
    }
    this.from = b;
    this.description = I(a);
    super.b("", {...c, noToc:!0, name:d, type:`import('${b}').${d}`}, e != h ? e : null);
  }
}
;const na = os.homedir;
na();
const oa = (a, b) => {
  const d = new RegExp(`([!?])?${a}\\.`, "g");
  b.properties.forEach(c => {
    N(c, a, d);
  });
  b.h(a);
}, X = (a, b) => {
  var {args:d = []} = a, c = d.map(({s:h}) => h).join(", ");
  let e = `new: ${a.fullName}`;
  c.length && (e = `${e}, `);
  c = `function(${e}${c})`;
  d = new Q(d);
  d.isConstructor = !0;
  d.b("Constructor method.", {type:c, name:"constructor"});
  d.examples = a.examples;
  N(d, b);
  a.properties.unshift(d);
}, Y = (a, b, d, c, e = !1, h = null) => {
  const f = e ? new W : new U;
  f.f = h;
  h = a.search(/<(prop|function|fn|static) /);
  let k = "", g = a;
  1 != h && (k = a.slice(0, h), g = a.slice(h));
  const {j:m, w:l} = L(k, c);
  f.b(e ? l : g, b, d, c);
  ({o:a} = J(b, m));
  e && (f.closureType = a);
  f.args || (f.args = m);
  return f;
}, Z = ({content:a, props:b, ns:d, i:c, isMethod:e = !1, location:h = null}) => {
  const f = [], {alias:k, aliases:g, ...m} = b;
  b = Y(a, b, d, c, e, h);
  f.push(b);
  (k ? [k] : g ? g.split(/, */) : []).forEach(l => {
    l = Y(a, {...m, name:l}, d, c, e, h);
    l.description = `${l.description}${l.description ? " " : ""}Alias of \`${m.name}\`.`;
    f.push(l);
  });
  return f;
};
module.exports = {_Type:U, _Property:P, _Method:W, _parseFile:(a, b, d = null) => {
  a = D("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:c, props:{namespace:e, ns:h = e}}] = a, f = b == h ? void 0 : h, k = [];
  a = D("type interface constructor method import record".split(" "), c).reduce((g, {content:m, props:l, tag:n}) => {
    "record" == n && (n = "type", l.record = !0);
    const {alias:p, aliases:q, ...t} = l;
    d && K(t, d);
    var r = p ? [p] : q ? q.split(/, */) : [];
    switch(n) {
      case "type":
        n = new U;
        d && (n.f = d);
        n.b(m, l, f, b);
        g.push(n);
        r.forEach(u => {
          const w = new U;
          d && (w.f = d);
          w.b(m, {...t, name:u}, f, b);
          g.push(w);
        });
        break;
      case "interface":
        l = Z({content:m, props:l, ns:f, i:b, location:d});
        l.forEach(u => {
          u.properties.some(({isConstructor:w}) => w) || X(u, b);
          u.isInterface = !0;
        });
        g.push(...l);
        break;
      case "constructor":
        l = Z({content:m, props:l, ns:f, i:b, location:d});
        l.forEach(u => {
          u.properties.some(({isConstructor:w}) => w) || X(u, b);
          u.isConstructor = !0;
        });
        g.push(...l);
        break;
      case "method":
        l = Z({content:m, props:l, ns:f, i:b, isMethod:!0, location:d});
        g.push(...l);
        break;
      case "import":
        r = new ma, r.b(m, l, l.ns || l.from, b), k.push(r);
    }
    return g;
  }, []);
  b && a.forEach(g => oa(b, g));
  return {namespace:h, types:a, imports:k};
}, _getLinks:S};


//# sourceMappingURL=typal.js.map