#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');             
var w = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  a != Array.prototype && a != Object.prototype && (a[b] = d.value);
}, z = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function B(a, b) {
  if (b) {
    var d = z;
    a = a.split(".");
    for (var c = 0; c < a.length - 1; c++) {
      var e = a[c];
      e in d || (d[e] = {});
      d = d[e];
    }
    a = a[a.length - 1];
    c = d[a];
    b = b(c);
    b != c && null != b && w(d, a, {configurable:!0, writable:!0, value:b});
  }
}
B("String.prototype.trimRight", function(a) {
  function b() {
    return this.replace(/[\s\xa0]+$/, "");
  }
  return a || b;
});
function C(a, b, d) {
  const c = [];
  b.replace(a, (e, ...h) => {
    e = h.slice(0, h.length - 2).reduce((f, m, g) => {
      g = d[g];
      if (!g || void 0 === m) {
        return f;
      }
      f[g] = m;
      return f;
    }, {});
    c.push(e);
  });
  return c;
}
;const D = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), E = new RegExp(`(?:\\s+((?:${D.source}\\s*)*))`);
const G = (a, b) => C(new RegExp(`<(${(Array.isArray(a) ? a : [a]).join("|")})${E.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:d, a:c = "", c:e = ""}) => {
  c = c.replace(/\/$/, "").trim();
  c = F(c);
  return {content:e, props:c, tag:d};
}), F = a => C(D, a, ["key", "val", "def", "f"]).reduce((b, {key:d, val:c}) => {
  if (void 0 === c) {
    return b[d] = !0, b;
  }
  b[d] = "true" == c ? !0 : "false" == c ? !1 : /^\d+$/.test(c) ? parseInt(c, 10) : c;
  return b;
}, {});
const H = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function aa(a) {
  let b = 0;
  const d = (e = 1) => a[b + e], c = (e = !0, h = []) => {
    var f = {};
    let m = a[b];
    if (["nullable", "nonNullable"].includes(m)) {
      if (!e) {
        throw Error(`${m} not allowed after .`);
      }
      f.nullable = "nullable" === m;
      b++;
    }
    m = a[b];
    if ("(" == m) {
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
      if ("{" == m) {
        b++;
        h = f;
        for (e = {}; "}" != a[b];) {
          var g = a[b];
          b++;
          e[g] = null;
          if (":" == a[b]) {
            b++;
            try {
              var k = c();
              e[g] = k;
            } catch (p) {
              throw p.message += `(when parsing ${g} property)`, p;
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
    if (["nonNullable", "nullable"].includes(m)) {
      throw Error("Nullability already defined.");
    }
    if (/[=),:.<>}|]/.test(m)) {
      throw Error(`Unexpected token ${m}.`);
    }
    "|" != a[b] && (f.name = a[b], b++);
    if ("function" == m) {
      k = f;
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
      k.function = g;
    } else {
      if ("<" == a[b] || (g = "." == a[b] && "<" == d())) {
        b++;
        g && b++;
        k = f;
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
        k.application = g;
      }
    }
    for (; "." == a[b];) {
      f.name += ".";
      b++;
      ({name:k} = c(!1));
      if (!k) {
        throw Error("Expected to see the name after .");
      }
      f.name += k;
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
;function I(a) {
  a = H(a);
  return aa(a);
}
;const J = ({s:a, v:b, j:d, type:c}) => b ? "string" : a ? "number" : d ? "boolean" : c ? c : "*", K = a => {
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
};
function ba(a, b, {name:d, string:c, "boolean":e, opt:h, number:f, type:m}, g) {
  if (!d) {
    throw Error("Argument does not have a name.");
  }
  a.name = d;
  b && (a.description = K(b));
  b = J({s:f, v:c, j:e, type:m});
  g && (b = b.replace(new RegExp(`([!?])?${g}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), h = !0);
  a.type = b;
  h && (a.optional = !0);
}
class ca {
  constructor() {
    this.name = null;
    this.type = "";
    this.optional = !1;
    this.description = "";
  }
  get l() {
    return this.optional ? `${this.type}=` : this.type;
  }
}
const L = (a, b) => {
  let d = a.lastIndexOf("</arg>"), c = a;
  var e = [];
  -1 != d && (d += 6, e = a.slice(0, d), c = a.slice(d), e = G("arg", e), e = e.map(({content:h, props:f}) => {
    const m = new ca;
    ba(m, h, f, b);
    return m;
  }));
  return {B:c, i:e};
};
function M(a, b, d = new RegExp(`([!?])?${b}\\.`, "g")) {
  b && (a.type = a.type.replace(d, "$1"));
}
function N(a, b, {name:d, string:c, "boolean":e, opt:h, number:f, type:m, "default":g, closure:k, noParams:l, "static":p, initial:n}) {
  if (!d) {
    throw Error("Property does not have a name.");
  }
  a.name = d;
  b && (a.description = K(b));
  b = J({s:f, v:c, j:e, type:m});
  l && (a.o = l);
  k && (a.m = k);
  a.type = b;
  void 0 !== g ? a.default = g : void 0 !== n && (a.default = n);
  if (h || void 0 !== g) {
    a.optional = !0;
  }
  p && (a.b = !0);
}
class Q {
  constructor(a = null) {
    this.f = this.description = this.name = null;
    this.g = "";
    this.default = this.m = null;
    this.o = this.optional = !1;
    this.parsed = null;
    this.args = a;
    this.isConstructor = this.b = !1;
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    const {function:{args:b, return:d}} = this.parsed, c = b.map(h => a(h)).map((h, f) => {
      const {name:m, optional:g} = b[f];
      let {name:k = `arg${f}`, type:l = m, optional:p = g} = this.args[f] || {};
      return `${`${k}${p ? "?" : ""}`}${l ? `: ${h}` : ""}`;
    }).join(", "), e = d ? a(d) : "void";
    return `(${c}) => ${e}`.replace(/\*/g, "\\*");
  }
  get C() {
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
    this.g = this.m || this.f || "";
    if (!this.o) {
      try {
        this.parsed = I(this.g), this.isParsedFunction && !this.args && (this.args = []);
      } catch (b) {
        this.parsed = null;
      }
    }
  }
  get isParsedFunction() {
    return !!this.parsed && "function" == this.parsed.name;
  }
}
;function da(a, {name:b, from:d, desc:c, link:e, ns:h}) {
  a.name = b;
  a.b = d;
  a.h = c;
  a.link = e;
  a.f = h || a.b;
}
class ea {
  constructor() {
    this.b = this.name = this.f = "";
    this.link = this.h = null;
  }
  get fullName() {
    return `${this.f}.${this.name}`;
  }
}
;const S = (a, b, d = {}) => {
  let c;
  if ("object" == typeof b) {
    c = b;
  } else {
    try {
      (c = I(b)) || console.log("Could not parse %s", b);
    } catch (e) {
      console.log("Could not parse %s", b), console.error(e.message);
    }
  }
  return c ? R(c, a, d) : b;
}, R = (a, b, d = {}) => {
  if ("" == a.name && a.nullable) {
    return "?";
  }
  var {w:c = !0} = d;
  let e = "";
  var h = "";
  a.nullable ? h = "?" : !1 === a.nullable && (h = "!");
  if (a.function) {
    e = e + h + (a.name + "(");
    const f = [];
    a.function.this && (c = "this: " + R(a.function.this, b, d), f.push(c));
    a.function.new && (c = "new: " + R(a.function.new, b, d), f.push(c));
    a.function.args.forEach(m => {
      let g = R(m, b, d);
      m.optional && (g += "=");
      f.push(g);
    });
    a.function.variableArgs && (c = "..." + R(a.function.variableArgs, b, d), f.push(c));
    e += f.join(", ") + ")";
    a.function.return && (e += ": " + R(a.function.return, b, d));
  } else {
    a.record ? (e += "{ ", c = Object.keys(a.record).map(f => {
      var m = a.record[f];
      if (!m) {
        return f;
      }
      m = R(m, b, d);
      return `${f}: ${m}`;
    }), e += c.join(", "), e += " }") : a.application ? (e += T(a.name, b, h, d) + "&lt;", c = a.application.map(f => R(f, b, d)), e += c.join(", "), e += "&gt;") : a.union ? (e = e + h + "(", h = a.union.map(f => R(f, b, d)), e += h.join(c ? " \\| " : " | "), e += ")") : e += T("any" == a.name ? "*" : a.name, b, h, d);
  }
  return e;
}, T = (a, b, d = "", c = {}) => {
  const {flatten:e = !1, A:h, link:f = ({link:k}) => `#${k}`} = c;
  c = fa(b, a);
  d = `${d}${a}`;
  if (!c) {
    return d;
  }
  let {link:m, type:{description:g}} = c;
  m = f(c);
  e && ((b = b.find(({fullName:k}) => k == a)) && b.link && (m = b.link), !g && b.h && (g = b.h), "function" == typeof e && e(a));
  b = h ? h(d) : d;
  return g ? `<a href="${m}" title="${g.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${m})`;
}, fa = (a, b) => {
  a = a.filter(({fullName:c}) => c == b);
  if (a.length) {
    var d = a.find(({import:c}) => c || !1);
    a = a.find(({import:c}) => !c) || d;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function ha(a, b = [], d = [], c = {}) {
  const {narrow:e = !1, flatten:h = !1, preprocessDesc:f, link:m} = c;
  if (!b.length) {
    return "";
  }
  const g = a.isConstructor || a.isInterface, k = b.some(({hasDefault:n}) => n), l = {flatten:h, w:!e, link:m}, p = n => S(d, n, l);
  a = b.map(n => {
    let q;
    n.args && n.isParsedFunction ? (q = n.toTypeScriptFunction(p), n.isConstructor && (q = `new ${q}`)) : q = S(d, n.parsed || n.type, l);
    const y = g || n.optional ? n.name : `${n.name}*`, v = n.hasDefault ? `\`${n.default}\`` : "-", t = f ? f(n.description) : n.description;
    return {prop:n, typeName:q, name:y, de:ia(t, !e), d:v};
  });
  if (e) {
    return {props:a, anyHaveDefault:k, constr:g};
  }
  a = a.map(({name:n, typeName:q, de:y, d:v, prop:t}) => [t.optional ? n : `__${n}__`, `<em>${q}</em>`, y, ...k ? [v] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...k ? [g ? "Initial" : "Default"] : []];
  return `

\`\`\`table
${JSON.stringify([b, ...a], null, 2)}
\`\`\``;
}
const ia = (a = "", b = !0) => {
  null === a && (a = "");
  b && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
};
class U {
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
  b(a, {name:b, type:d, desc:c, noToc:e, spread:h, noExpand:f, "import":m, link:g, closure:k, constructor:l, "extends":p, "interface":n, record:q}, y, v = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    d && (this.type = d);
    k ? this.closureType = k : this.closureType = this.type;
    c && (this.description = K(c));
    this.noToc = !!e;
    this.spread = !!h;
    this.noExpand = !!f;
    this.import = !!m;
    g && (this.link = g);
    !0 === l && (this.isConstructor = l);
    !0 === n && (this.isInterface = n);
    !0 === q && (this.isRecord = q);
    p && (this.extends = p);
    if (a) {
      b = G("prop", a).map(({content:r, props:u}) => {
        const x = new Q;
        N(x, r, u);
        return x;
      });
      a = G(["function", "fn", "static"], a).map(({content:r, props:u, tag:x}) => {
        x = "static" == x;
        const {B:ja, i:O} = L(r, v), {async:ka, "return":la = "?", ...P} = u;
        ({args:r = ""} = u);
        r || (r = O.map(({l:ma}) => ma).join(","));
        u = la.replace(/\n\s*/g, " ");
        P.type = `function(${r}): ${ka ? `!Promise<${u}>` : u}`;
        r = new Q(O);
        N(r, ja, P);
        x && (r.b = !0);
        return r;
      });
      a = [...b, ...a];
      const {u:t, n:A} = a.reduce((r, u) => {
        u.C ? r.u.push(u) : r.n.push(u);
        return r;
      }, {u:[], n:[]});
      this.properties = [...t, ...A];
    }
    y && (this.namespace = y);
  }
  g(a, b = new RegExp(`([!?])?${a}\\.`, "g")) {
    this.type && (this.type = this.type.replace(b, "$1"));
    this.extends && (this.extends = this.extends.replace(b, "$1"));
    return b;
  }
  get tag() {
    return this.isConstructor ? "constructor" : this.isInterface ? "interface" : this.isRecord ? "record" : "";
  }
  get constr() {
    return this.args ? `function(${this.args.map(({name:a}) => a).join(", ")}) {}` : null;
  }
  get ns() {
    return this.namespace ? `${this.namespace}.` : "";
  }
  get fullName() {
    return `${this.ns}${this.name}`;
  }
  toMarkdown(a = [], b = {}) {
    const {narrow:d, flatten:c, preprocessDesc:e, link:h, details:f = []} = b, m = f.includes(this.name);
    var g = this.type ? `\`${this.type}\`` : "", k = g, l = !1;
    this.link ? k = `[${g}](${this.link})` : !this.import && this.type && (k = S(a, this.type, b), l = k != this.type, k = V(k, l));
    b = V(this.fullName);
    b = this.import ? `[${b}](l-type)` : this.noToc ? `[${b}](l-type)` : `[${b}](t-type)`;
    g = this.description ? `: ${this.description}` : "";
    k = k ? `${k} ` : "";
    l = /_/.test(b);
    if (this.extends) {
      let n = `\`${this.extends}\``;
      var p = a.find(({fullName:q}) => q == this.extends);
      p && p.link ? (n = "<a ", p.description && (n += `title="${p.description}" `), n += `href="${p.link}">\`${this.extends}\`</a>`) : (p = S(a, this.extends, {flatten:c, A(q) {
        return `\`${q}\``;
      }, link:h}), this.extends != p && (n = p));
      p = ` extends ${n}`;
      l = l || /_/.test(n);
      k = (l ? k + "<strong>" : k + "__") + (b + p);
      "function" == typeof c && c(this.extends);
    } else {
      k = (l ? k + "<strong>" : k + "__") + b;
    }
    k = (l ? k + "</strong>" : k + "__") + g;
    a = ha(this, this.properties, a, {narrow:d, flatten:c, preprocessDesc:e, link:h});
    return {LINE:k, table:a, displayInDetails:m};
  }
}
const V = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`;
class W extends U {
  constructor() {
    super();
    this.f = null;
  }
  b(a, {"return":b, ...d}, ...c) {
    super.b(a, d, ...c);
    b && (this.f = b);
  }
  get return() {
    return this.f || "void";
  }
  g(a) {
    a = super.g(a);
    this.f && (this.f = this.f.replace(a, "$1"));
  }
}
;const {homedir:na} = os;
na();
const oa = (a, b) => {
  const d = new RegExp(`([!?])?${a}\\.`, "g");
  b.properties.forEach(c => {
    M(c, a, d);
  });
  b.g(a);
}, X = (a, b) => {
  if (a.args && a.args.length) {
    var d = `function(${a.args.map(({l:e}) => e).join(", ")}): ${a.fullName}`, c = new Q(a.args);
    c.isConstructor = !0;
    N(c, "Constructor method.", {type:d, name:"constructor"});
    M(c, b);
    a.properties.unshift(c);
  }
}, Y = (a, b, d, c, e = !1) => {
  e = e ? new W : new U;
  const h = a.search(/<(prop|function|fn|static) /);
  let f = "", m = a;
  1 != h && (f = a.slice(0, h), m = a.slice(h));
  ({i:a} = L(f, c));
  e.b(m, b, d, c);
  e.args = a;
  return e;
}, Z = (a, b, d, c, e = !1) => {
  const h = [], {alias:f, aliases:m, ...g} = b;
  b = Y(a, b, d, c, e);
  h.push(b);
  (f ? [f] : m ? m.split(/, */) : []).forEach(k => {
    k = Y(a, {...g, name:k}, d, c, e);
    k.description = `${k.description}${k.description ? " " : ""}Alias of \`${g.name}\`.`;
    h.push(k);
  });
  return h;
};
module.exports = {_Type:U, _Property:Q, _Method:W, _parseFile:(a, b) => {
  a = G("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:d, props:{namespace:c, ns:e = c}}] = a, h = b == e ? void 0 : e, f = [], m = [];
  a = G(["type", "interface", "constructor", "method", "import"], d).reduce((g, {content:k, props:l, tag:p}) => {
    const {alias:n, aliases:q, ...y} = l;
    var v = n ? [n] : q ? q.split(/, */) : [];
    switch(p) {
      case "type":
        p = new U;
        p.b(k, l, h, b);
        g.push(p);
        v.forEach(t => {
          const A = new U;
          A.b(k, {...y, name:t}, h, b);
          g.push(A);
        });
        break;
      case "interface":
        l = Z(k, l, h, b);
        l.forEach(t => {
          X(t, b);
          t.isInterface = !0;
        });
        g.push(...l);
        break;
      case "constructor":
        l = Z(k, l, h, b);
        l.forEach(t => {
          X(t, b);
          t.isConstructor = !0;
        });
        g.push(...l);
        break;
      case "method":
        l = Z(k, l, h, b, !0);
        g.push(...l);
        break;
      case "import":
        {
          v = new ea;
          k && (l.desc = K(k));
          da(v, l);
          f.push(v);
          const {name:t, b:A, h:r, link:u, f:x} = v;
          l = new U;
          l.b("", {name:t, type:`import('${A}').${t}`, noToc:!0, import:!0, h:r, link:u}, x == b ? void 0 : x);
          m.push(l);
        }
    }
    return g;
  }, []);
  b && a.forEach(g => oa(b, g));
  return {namespace:e, types:a, imports:f, D:m};
}, _getLinks:S};


//# sourceMappingURL=depack.js.map