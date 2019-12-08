#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');             
var v = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  a != Array.prototype && a != Object.prototype && (a[b] = d.value);
}, y = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function A(a, b) {
  if (b) {
    var d = y;
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
A("String.prototype.trimRight", function(a) {
  function b() {
    return this.replace(/[\s\xa0]+$/, "");
  }
  return a || b;
});
function B(a, b, d) {
  const c = [];
  b.replace(a, (e, ...g) => {
    e = g.slice(0, g.length - 2).reduce((f, h, k) => {
      k = d[k];
      if (!k || void 0 === h) {
        return f;
      }
      f[k] = h;
      return f;
    }, {});
    c.push(e);
  });
  return c;
}
;const C = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), D = new RegExp(`(?:\\s+((?:${C.source}\\s*)*))`);
const F = (a, b) => B(new RegExp(`<(${(Array.isArray(a) ? a : [a]).join("|")})${D.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:d, a:c = "", c:e = ""}) => {
  c = c.replace(/\/$/, "").trim();
  c = E(c);
  return {content:e, props:c, tag:d};
}), E = a => B(C, a, ["key", "val", "def", "f"]).reduce((b, {key:d, val:c}) => {
  if (void 0 === c) {
    return b[d] = !0, b;
  }
  b[d] = "true" == c ? !0 : "false" == c ? !1 : /^\d+$/.test(c) ? parseInt(c, 10) : c;
  return b;
}, {});
const G = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function H(a) {
  let b = 0;
  const d = (e = 1) => a[b + e], c = (e = !0, g = []) => {
    var f = {};
    let h = a[b];
    if (["nullable", "nonNullable"].includes(h)) {
      if (!e) {
        throw Error(`${h} not allowed after .`);
      }
      f.nullable = "nullable" === h;
      b++;
    }
    h = a[b];
    if ("(" == h) {
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
      if ("{" == h) {
        b++;
        g = f;
        for (e = {}; "}" != a[b];) {
          var k = a[b];
          b++;
          e[k] = null;
          if (":" == a[b]) {
            b++;
            try {
              var l = c();
              e[k] = l;
            } catch (p) {
              throw p.message += `(when parsing ${k} property)`, p;
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
        g.record = e;
        return f;
      }
    }
    if (["nonNullable", "nullable"].includes(h)) {
      throw Error("Nullability already defined.");
    }
    if (/[=),:.<>}|]/.test(h)) {
      throw Error(`Unexpected token ${h}.`);
    }
    "|" != a[b] && (f.name = a[b], b++);
    if ("function" == h) {
      l = f;
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
        l = f;
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
      f.name += ".";
      b++;
      ({name:l} = c(!1));
      if (!l) {
        throw Error("Expected to see the name after .");
      }
      f.name += l;
    }
    if ("|" != a[b] || !e) {
      return f;
    }
    for (g.push(f); "|" == a[b];) {
      b++, f = c(!0, g), f.union !== g && g.push(f);
    }
    return {union:g};
  };
  return c();
}
;function I(a) {
  a = G(a);
  return H(a);
}
;const J = ({v:a, A:b, i:d, type:c}) => b ? "string" : a ? "number" : d ? "boolean" : c ? c : "*", K = a => {
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
    return d.map(g => g.replace(e, "")).join("\n");
  }
}, L = (a, b) => {
  const {async:d, "void":c, "return":e = c ? "void" : "", ...g} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({l:f, name:h}) => "this" == h ? `${h}: ${f}` : h.startsWith("...") ? `...${f}` : f).join(","));
  b = e.replace(/\n\s*/g, " ");
  d && b ? b = `!Promise<${b}>` : d && (b = "!Promise");
  a = `function(${a})`;
  b && (a += `: ${b}`);
  return {C:g, j:a};
};
function aa(a, b, {name:d, string:c, "boolean":e, opt:g, number:f, type:h}, k) {
  if (!d) {
    throw Error("Argument does not have a name.");
  }
  a.name = d;
  b && (a.description = K(b));
  b = J({v:f, A:c, i:e, type:h});
  k && (b = b.replace(new RegExp(`([!?])?${k}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), g = !0);
  a.type = b;
  g && (a.optional = !0);
}
class ba {
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
const M = (a, b) => {
  let d = a.lastIndexOf("</arg>"), c = a;
  var e = [];
  -1 != d && (d += 6, e = a.slice(0, d), c = a.slice(d), e = F("arg", e), e = e.map(({content:g, props:f}) => {
    const h = new ba;
    aa(h, g, f, b);
    return h;
  }));
  return {u:c, h:e};
};
function P(a, b, {name:d, string:c, "boolean":e, opt:g, number:f, type:h, "default":k, closure:l, alias:m, aliases:p, noParams:n, "static":q, initial:r}) {
  if (!d) {
    throw Error("Property does not have a name.");
  }
  a.name = d;
  b && (a.description = K(b));
  b = J({v:f, A:c, i:e, type:h});
  n && (a.s = n);
  l && (a.o = l);
  a.type = b;
  void 0 !== k ? a.default = k : void 0 !== r && (a.default = r);
  if (g || void 0 !== k) {
    a.optional = !0;
  }
  m && (a.aliases = [m]);
  p && (a.aliases = p.split(/\s*,\s*/));
  q && (a.b = !0);
}
class Q {
  constructor(a = null) {
    this.f = this.description = this.name = null;
    this.m = "";
    this.default = this.o = null;
    this.optional = !1;
    this.aliases = [];
    this.s = !1;
    this.parsed = null;
    this.args = a;
    this.isConstructor = this.b = !1;
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    const {function:{args:b, return:d, this:c, variableArgs:e}} = this.parsed;
    var g = b.map(h => a(h)).map((h, k) => {
      const {optional:l} = b[k];
      let {name:m = `arg${k}`, optional:p = l} = this.B[k] || {};
      return `${`${m}${p ? "?" : ""}`}: ${h}`;
    });
    if (c) {
      var f = a(c);
      g.unshift(`this: ${f}`);
    }
    if (e) {
      f = a(e);
      let h = "...args";
      try {
        h = `${this.args[this.args.length - 1].name}`;
      } catch (k) {
      }
      g.push(`${h}: ${f}[]`);
    }
    g = g.join(", ");
    f = d ? a(d) : "?";
    return `(${g}) => ${f}`;
  }
  g(a, b = new RegExp(`([!?])?${a}\\.`, "g")) {
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
    this.m = this.o || this.f || "";
    if (!this.s) {
      try {
        this.parsed = I(this.m), this.isParsedFunction && !this.args && (this.args = []);
      } catch (b) {
        this.parsed = null;
      }
    }
  }
  get B() {
    var a = this.args;
    this.args && this.args[0] && "this" == this.args[0].name && ([, ...a] = this.args);
    return a;
  }
  get isParsedFunction() {
    return !!this.parsed && "function" == this.parsed.name;
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
  var {escapePipe:c = !0} = d;
  let e = "";
  var g = "";
  a.nullable ? g = "?" : !1 === a.nullable && (g = "!");
  if (a.function) {
    e = e + g + (a.name + "(");
    const f = [];
    a.function.this && (c = "this: " + R(a.function.this, b, d), f.push(c));
    a.function.new && (c = "new: " + R(a.function.new, b, d), f.push(c));
    a.function.args.forEach(h => {
      let k = R(h, b, d);
      h.optional && (k += "=");
      f.push(k);
    });
    a.function.variableArgs && (c = "..." + R(a.function.variableArgs, b, d), f.push(c));
    e += f.join(", ") + ")";
    a.function.return && (e += ": " + R(a.function.return, b, d));
  } else {
    a.record ? (e += "{ ", c = Object.keys(a.record).map(f => {
      var h = a.record[f];
      if (!h) {
        return f;
      }
      h = R(h, b, d);
      return `${f}: ${h}`;
    }), e += c.join(", "), e += " }") : a.application ? (e += T(a.name, b, g, d) + "&lt;", c = a.application.map(f => R(f, b, d)), e += c.join(", "), e += "&gt;") : a.union ? (e = e + g + "(", g = a.union.map(f => R(f, b, d)), e += g.join(c ? " \\| " : " | "), e += ")") : e += T("any" == a.name ? "*" : a.name, b, g, d);
  }
  return e;
}, T = (a, b, d = "", c = {}) => {
  const {flatten:e = !1, nameProcess:g, link:f = ({link:l}) => `#${l}`} = c;
  c = ca(b, a);
  d = `${d}${a}`;
  if (!c) {
    return d;
  }
  let {link:h, type:{description:k}} = c;
  h = f(c);
  e && ((b = b.find(({fullName:l}) => l == a)) && b.link && (h = b.link), !k && b.description && (k = b.description), "function" == typeof e && e(a));
  b = g ? g(d) : d;
  return k ? `<a href="${h}" title="${k.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${h})`;
}, ca = (a, b) => {
  a = a.filter(({fullName:c}) => c == b);
  if (a.length) {
    var d = a.find(({import:c}) => c || !1);
    a = a.find(({import:c}) => !c) || d;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function da(a, b = [], d = [], c = {}) {
  const {narrow:e = !1, flatten:g = !1, preprocessDesc:f, link:h} = c;
  if (!b.length) {
    return "";
  }
  const k = a.isConstructor || a.isInterface, l = b.some(({hasDefault:n}) => n), m = {flatten:g, escapePipe:!e, link:h}, p = n => S(d, n, m);
  a = b.map(n => {
    let q;
    n.args && n.isParsedFunction ? (q = n.toTypeScriptFunction(p), n.isConstructor && (q = `new ${q}`)) : q = S(d, n.parsed || n.type, m);
    const r = k || n.optional ? n.name : `${n.name}*`, t = n.hasDefault ? `\`${n.default}\`` : "-", w = f ? f(n.description) : n.description;
    return {prop:n, typeName:q, name:r, de:ea(w, !e), d:t};
  });
  if (e) {
    return {props:a, anyHaveDefault:l, constr:k};
  }
  a = a.map(({name:n, typeName:q, de:r, d:t, prop:w}) => [w.optional ? n : `__${n}__`, `<em>${q}</em>`, r, ...l ? [t] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...l ? [k ? "Initial" : "Default"] : []];
  return `

\`\`\`table
${JSON.stringify([b, ...a], null, 2)}
\`\`\``;
}
const ea = (a = "", b = !0) => {
  null === a && (a = "");
  b && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
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
  }
  get import() {
    return !1;
  }
  b(a, {name:b, type:d, desc:c, noToc:e, spread:g, noExpand:f, link:h, closure:k, constructor:l, "extends":m, "interface":p, record:n}, q, r = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    d && (this.type = d);
    k ? this.closureType = k : this.closureType = this.type;
    c && (this.description = K(c));
    this.noToc = !!e;
    this.spread = !!g;
    this.noExpand = !!f;
    h && (this.link = h);
    !0 === l && (this.isConstructor = l);
    !0 === p && (this.isInterface = p);
    !0 === n && (this.isRecord = n);
    m && (this.extends = m);
    if (a) {
      b = F("prop", a).map(({content:u, props:x}) => {
        const z = new Q;
        P(z, u, x);
        return z;
      });
      a = F(["function", "fn", "static"], a).map(({content:u, props:x, tag:z}) => {
        z = "static" == z;
        const {u:fa, h:N} = M(u, r);
        u = new Q(N);
        const {C:O, j:ha} = L(x, N);
        O.type = ha;
        P(u, fa, O);
        z && (u.b = !0);
        return u;
      });
      a = [...b, ...a];
      const {w:t, n:w} = a.reduce((u, x) => {
        x.static ? u.w.push(x) : u.n.push(x);
        return u;
      }, {w:[], n:[]});
      this.properties = [...t, ...w];
    }
    q && (this.namespace = q);
  }
  g(a, b = new RegExp(`([!?])?${a}\\.`, "g")) {
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
    var g = this.type ? `\`${this.type}\`` : "", f = g, h = !1;
    this.link ? f = `[${g}](${this.link})` : !this.import && this.type && (f = S(a, this.type, b), h = f != this.type, f = V(f, h));
    g = V(this.fullName);
    g = this.import ? `[${g}](l-type)` : this.noToc ? `[${g}](l-type)` : `[${g}](t-type)`;
    h = this.description ? `: ${this.description}` : "";
    f = f ? `${f} ` : "";
    let k = /_/.test(g);
    if (this.extends) {
      let m = `\`${this.extends}\``;
      var l = a.find(({fullName:p}) => p == this.extends);
      l && l.link ? (m = "<a ", l.description && (m += `title="${l.description}" `), m += `href="${l.link}">\`${this.extends}\`</a>`) : (l = S(a, this.extends, {...b, nameProcess:p => `\`${p}\``}), this.extends != l && (m = l));
      l = ` extends ${m}`;
      k = k || /_/.test(m);
      f = (k ? f + "<strong>" : f + "__") + (g + l);
      "function" == typeof d && d(this.extends);
    } else {
      f = (k ? f + "<strong>" : f + "__") + g;
    }
    f = (k ? f + "</strong>" : f + "__") + h;
    a = da(this, this.properties, a, b);
    return {LINE:f, table:a, displayInDetails:e};
  }
}
const V = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`;
class W extends U {
  constructor() {
    super();
    this.f = null;
    this.async = !1;
  }
  get isMethod() {
    return !0;
  }
  b(a, {async:b, "return":d, ...c}, ...e) {
    this.description = K(a);
    super.b("", c, ...e);
    d && (this.f = d.replace(/\n\s*/g, " "));
    b && (this.async = !0);
  }
  get return() {
    return this.f || "void";
  }
  g(a) {
    a = super.g(a);
    this.f && (this.f = this.f.replace(a, "$1"));
  }
}
;class ia extends U {
  constructor() {
    super();
    this.from = "";
  }
  get import() {
    return !0;
  }
  b(a, {from:b, name:d, ...c}, e, g) {
    if (!b) {
      throw Error("From attribute of import is not given.");
    }
    this.from = b;
    this.description = K(a);
    super.b("", {...c, noToc:!0, name:d, type:`import('${b}').${d}`}, e != g ? e : null);
  }
}
;const {homedir:ja} = os;
ja();
const ka = (a, b) => {
  const d = new RegExp(`([!?])?${a}\\.`, "g");
  b.properties.forEach(c => {
    c.g(a, d);
  });
  b.g(a);
}, X = (a, b) => {
  if (a.args && a.args.length) {
    var d = `function(${a.args.map(({l:e}) => e).join(", ")}): ${a.fullName}`, c = new Q(a.args);
    c.isConstructor = !0;
    P(c, "Constructor method.", {type:d, name:"constructor"});
    c.g(b);
    a.properties.unshift(c);
  }
}, Y = (a, b, d, c, e = !1) => {
  const g = e ? new W : new U, f = a.search(/<(prop|function|fn|static) /);
  let h = "", k = a;
  1 != f && (h = a.slice(0, f), k = a.slice(f));
  const {h:l, u:m} = M(h, c);
  g.b(e ? m : k, b, d, c);
  ({j:a} = L(b, l));
  e && (g.closureType = a);
  g.args = l;
  return g;
}, Z = (a, b, d, c, e = !1) => {
  const g = [], {alias:f, aliases:h, ...k} = b;
  b = Y(a, b, d, c, e);
  g.push(b);
  (f ? [f] : h ? h.split(/, */) : []).forEach(l => {
    l = Y(a, {...k, name:l}, d, c, e);
    l.description = `${l.description}${l.description ? " " : ""}Alias of \`${k.name}\`.`;
    g.push(l);
  });
  return g;
};
module.exports = {_Type:U, _Property:Q, _Method:W, _parseFile:(a, b) => {
  a = F("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:d, props:{namespace:c, ns:e = c}}] = a, g = b == e ? void 0 : e, f = [];
  a = F(["type", "interface", "constructor", "method", "import"], d).reduce((h, {content:k, props:l, tag:m}) => {
    const {alias:p, aliases:n, ...q} = l;
    var r = p ? [p] : n ? n.split(/, */) : [];
    switch(m) {
      case "type":
        m = new U;
        m.b(k, l, g, b);
        h.push(m);
        r.forEach(t => {
          const w = new U;
          w.b(k, {...q, name:t}, g, b);
          h.push(w);
        });
        break;
      case "interface":
        l = Z(k, l, g, b);
        l.forEach(t => {
          X(t, b);
          t.isInterface = !0;
        });
        h.push(...l);
        break;
      case "constructor":
        l = Z(k, l, g, b);
        l.forEach(t => {
          X(t, b);
          t.isConstructor = !0;
        });
        h.push(...l);
        break;
      case "method":
        l = Z(k, l, g, b, !0);
        h.push(...l);
        break;
      case "import":
        r = new ia, r.b(k, l, l.ns || l.from, b), f.push(r);
    }
    return h;
  }, []);
  b && a.forEach(h => ka(b, h));
  return {namespace:e, types:a, imports:f};
}, _getLinks:S};


//# sourceMappingURL=typal.js.map