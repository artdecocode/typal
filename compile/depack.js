#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');             
var w = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
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
    b != c && null != b && w(d, a, {configurable:!0, writable:!0, value:b});
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
    e = g.slice(0, g.length - 2).reduce((f, k, h) => {
      h = d[h];
      if (!h || void 0 === k) {
        return f;
      }
      f[h] = k;
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
function aa(a) {
  let b = 0;
  const d = (e = 1) => a[b + e], c = (e = !0, g = []) => {
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
        g = f;
        for (e = {}; "}" != a[b];) {
          var h = a[b];
          b++;
          e[h] = null;
          if (":" == a[b]) {
            b++;
            try {
              var l = c();
              e[h] = l;
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
      l = f;
      h = {return:null, args:[]};
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
            if ("." == a[b] && "." == d() && "." == d(2)) {
              b++;
              b++;
              b++;
              m = c();
              if (")" != a[b]) {
                throw Error("Variable args must come last");
              }
              h.variableArgs = m;
            } else {
              m = c(), h.args.push(m), "=" == a[b] && (m.optional = !0, b++);
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
      ":" == a[b] && (b++, m = c(), void 0 == m.name && m.nullable && (m.name = ""), h.return = m);
      l.function = h;
    } else {
      if ("<" == a[b] || (h = "." == a[b] && "<" == d())) {
        b++;
        h && b++;
        l = f;
        for (h = []; ">" != a[b];) {
          m = c();
          h.push(m);
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
;function H(a) {
  a = G(a);
  return aa(a);
}
;const I = ({s:a, v:b, i:d, type:c}) => b ? "string" : a ? "number" : d ? "boolean" : c ? c : "*", J = a => {
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
};
function ba(a, b, {name:d, string:c, "boolean":e, opt:g, number:f, type:k}, h) {
  if (!d) {
    throw Error("Argument does not have a name.");
  }
  a.name = d;
  b && (a.description = J(b));
  b = I({s:f, v:c, i:e, type:k});
  h && (b = b.replace(new RegExp(`([!?])?${h}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), g = !0);
  a.type = b;
  g && (a.optional = !0);
}
class ca {
  constructor() {
    this.name = null;
    this.type = "";
    this.optional = !1;
    this.description = "";
  }
  get j() {
    return this.optional ? `${this.type}=` : this.type;
  }
}
const K = (a, b) => {
  let d = a.lastIndexOf("</arg>"), c = a;
  var e = [];
  -1 != d && (d += 6, e = a.slice(0, d), c = a.slice(d), e = F("arg", e), e = e.map(({content:g, props:f}) => {
    const k = new ca;
    ba(k, g, f, b);
    return k;
  }));
  return {o:c, h:e};
};
function L(a, b, d = new RegExp(`([!?])?${b}\\.`, "g")) {
  b && (a.type = a.type.replace(d, "$1"));
}
function M(a, b, {name:d, string:c, "boolean":e, opt:g, number:f, type:k, "default":h, closure:l, alias:m, aliases:p, noParams:n, "static":t, initial:u}) {
  if (!d) {
    throw Error("Property does not have a name.");
  }
  a.name = d;
  b && (a.description = J(b));
  b = I({s:f, v:c, i:e, type:k});
  n && (a.m = n);
  l && (a.l = l);
  a.type = b;
  void 0 !== h ? a.default = h : void 0 !== u && (a.default = u);
  if (g || void 0 !== h) {
    a.optional = !0;
  }
  m && (a.aliases = [m]);
  p && (a.aliases = p.split(/\s*,\s*/));
  t && (a.b = !0);
}
class Q {
  constructor(a = null) {
    this.f = this.description = this.name = null;
    this.g = "";
    this.default = this.l = null;
    this.optional = !1;
    this.aliases = [];
    this.m = !1;
    this.parsed = null;
    this.args = a;
    this.isConstructor = this.b = !1;
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    const {function:{args:b, return:d, this:c, variableArgs:e}} = this.parsed;
    var g = b.map(k => a(k)).map((k, h) => {
      const {optional:l} = b[h];
      let {name:m = `arg${h}`, optional:p = l} = this.args[h] || {};
      return `${`${m}${p ? "?" : ""}`}: ${k}`;
    });
    if (c) {
      var f = a(c);
      g.unshift(`this: ${f}`);
    }
    e && (f = a(e), g.push(`...args: ${f}[]`));
    g = g.join(", ");
    f = d ? a(d) : "?";
    return `(${g}) => ${f}`;
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
    this.g = this.l || this.f || "";
    if (!this.m) {
      try {
        this.parsed = H(this.g), this.isParsedFunction && !this.args && (this.args = []);
      } catch (b) {
        this.parsed = null;
      }
    }
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
      (c = H(b)) || console.log("Could not parse %s", b);
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
    a.function.args.forEach(k => {
      let h = R(k, b, d);
      k.optional && (h += "=");
      f.push(h);
    });
    a.function.variableArgs && (c = "..." + R(a.function.variableArgs, b, d), f.push(c));
    e += f.join(", ") + ")";
    a.function.return && (e += ": " + R(a.function.return, b, d));
  } else {
    a.record ? (e += "{ ", c = Object.keys(a.record).map(f => {
      var k = a.record[f];
      if (!k) {
        return f;
      }
      k = R(k, b, d);
      return `${f}: ${k}`;
    }), e += c.join(", "), e += " }") : a.application ? (e += T(a.name, b, g, d) + "&lt;", c = a.application.map(f => R(f, b, d)), e += c.join(", "), e += "&gt;") : a.union ? (e = e + g + "(", g = a.union.map(f => R(f, b, d)), e += g.join(c ? " \\| " : " | "), e += ")") : e += T("any" == a.name ? "*" : a.name, b, g, d);
  }
  return e;
}, T = (a, b, d = "", c = {}) => {
  const {flatten:e = !1, nameProcess:g, link:f = ({link:l}) => `#${l}`} = c;
  c = da(b, a);
  d = `${d}${a}`;
  if (!c) {
    return d;
  }
  let {link:k, type:{description:h}} = c;
  k = f(c);
  e && ((b = b.find(({fullName:l}) => l == a)) && b.link && (k = b.link), !h && b.description && (h = b.description), "function" == typeof e && e(a));
  b = g ? g(d) : d;
  return h ? `<a href="${k}" title="${h.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${k})`;
}, da = (a, b) => {
  a = a.filter(({fullName:c}) => c == b);
  if (a.length) {
    var d = a.find(({import:c}) => c || !1);
    a = a.find(({import:c}) => !c) || d;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function ea(a, b = [], d = [], c = {}) {
  const {narrow:e = !1, flatten:g = !1, preprocessDesc:f, link:k} = c;
  if (!b.length) {
    return "";
  }
  const h = a.isConstructor || a.isInterface, l = b.some(({hasDefault:n}) => n), m = {flatten:g, escapePipe:!e, link:k}, p = n => S(d, n, m);
  a = b.map(n => {
    let t;
    n.args && n.isParsedFunction ? (t = n.toTypeScriptFunction(p), n.isConstructor && (t = `new ${t}`)) : t = S(d, n.parsed || n.type, m);
    const u = h || n.optional ? n.name : `${n.name}*`, v = n.hasDefault ? `\`${n.default}\`` : "-", x = f ? f(n.description) : n.description;
    return {prop:n, typeName:t, name:u, de:fa(x, !e), d:v};
  });
  if (e) {
    return {props:a, anyHaveDefault:l, constr:h};
  }
  a = a.map(({name:n, typeName:t, de:u, d:v, prop:x}) => [x.optional ? n : `__${n}__`, `<em>${t}</em>`, u, ...l ? [v] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...l ? [h ? "Initial" : "Default"] : []];
  return `

\`\`\`table
${JSON.stringify([b, ...a], null, 2)}
\`\`\``;
}
const fa = (a = "", b = !0) => {
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
  b(a, {name:b, type:d, desc:c, noToc:e, spread:g, noExpand:f, link:k, closure:h, constructor:l, "extends":m, "interface":p, record:n}, t, u = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    d && (this.type = d);
    h ? this.closureType = h : this.closureType = this.type;
    c && (this.description = J(c));
    this.noToc = !!e;
    this.spread = !!g;
    this.noExpand = !!f;
    k && (this.link = k);
    !0 === l && (this.isConstructor = l);
    !0 === p && (this.isInterface = p);
    !0 === n && (this.isRecord = n);
    m && (this.extends = m);
    if (a) {
      b = F("prop", a).map(({content:q, props:r}) => {
        const z = new Q;
        M(z, q, r);
        return z;
      });
      a = F(["function", "fn", "static"], a).map(({content:q, props:r, tag:z}) => {
        z = "static" == z;
        const {o:ha, h:N} = K(q, u), {async:O, "void":ia, "return":ja = ia ? "void" : "", ...P} = r;
        ({args:r = ""} = r);
        r || (r = N.map(({j:ka}) => ka).join(","));
        q = ja.replace(/\n\s*/g, " ");
        O && q ? q = `!Promise<${q}>` : O && (q = "!Promise");
        r = `function(${r})`;
        q && (r += `: ${q}`);
        P.type = r;
        q = new Q(N);
        M(q, ha, P);
        z && (q.b = !0);
        return q;
      });
      a = [...b, ...a];
      const {u:v, n:x} = a.reduce((q, r) => {
        r.static ? q.u.push(r) : q.n.push(r);
        return q;
      }, {u:[], n:[]});
      this.properties = [...v, ...x];
    }
    t && (this.namespace = t);
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
    var g = this.type ? `\`${this.type}\`` : "", f = g, k = !1;
    this.link ? f = `[${g}](${this.link})` : !this.import && this.type && (f = S(a, this.type, b), k = f != this.type, f = V(f, k));
    g = V(this.fullName);
    g = this.import ? `[${g}](l-type)` : this.noToc ? `[${g}](l-type)` : `[${g}](t-type)`;
    k = this.description ? `: ${this.description}` : "";
    f = f ? `${f} ` : "";
    let h = /_/.test(g);
    if (this.extends) {
      let m = `\`${this.extends}\``;
      var l = a.find(({fullName:p}) => p == this.extends);
      l && l.link ? (m = "<a ", l.description && (m += `title="${l.description}" `), m += `href="${l.link}">\`${this.extends}\`</a>`) : (l = S(a, this.extends, {...b, nameProcess:p => `\`${p}\``}), this.extends != l && (m = l));
      l = ` extends ${m}`;
      h = h || /_/.test(m);
      f = (h ? f + "<strong>" : f + "__") + (g + l);
      "function" == typeof d && d(this.extends);
    } else {
      f = (h ? f + "<strong>" : f + "__") + g;
    }
    f = (h ? f + "</strong>" : f + "__") + k;
    a = ea(this, this.properties, a, b);
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
    this.description = J(a);
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
;class la extends U {
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
    this.description = J(a);
    super.b("", {...c, noToc:!0, name:d, type:`import('${b}').${d}`}, e != g ? e : null);
  }
}
;const {homedir:ma} = os;
ma();
const na = (a, b) => {
  const d = new RegExp(`([!?])?${a}\\.`, "g");
  b.properties.forEach(c => {
    L(c, a, d);
  });
  b.g(a);
}, X = (a, b) => {
  if (a.args && a.args.length) {
    var d = `function(${a.args.map(({j:e}) => e).join(", ")}): ${a.fullName}`, c = new Q(a.args);
    c.isConstructor = !0;
    M(c, "Constructor method.", {type:d, name:"constructor"});
    L(c, b);
    a.properties.unshift(c);
  }
}, Y = (a, b, d, c, e = !1) => {
  const g = e ? new W : new U, f = a.search(/<(prop|function|fn|static) /);
  let k = "", h = a;
  1 != f && (k = a.slice(0, f), h = a.slice(f));
  const {h:l, o:m} = K(k, c);
  g.b(e ? m : h, b, d, c);
  g.args = l;
  return g;
}, Z = (a, b, d, c, e = !1) => {
  const g = [], {alias:f, aliases:k, ...h} = b;
  b = Y(a, b, d, c, e);
  g.push(b);
  (f ? [f] : k ? k.split(/, */) : []).forEach(l => {
    l = Y(a, {...h, name:l}, d, c, e);
    l.description = `${l.description}${l.description ? " " : ""}Alias of \`${h.name}\`.`;
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
  a = F(["type", "interface", "constructor", "method", "import"], d).reduce((k, {content:h, props:l, tag:m}) => {
    const {alias:p, aliases:n, ...t} = l;
    var u = p ? [p] : n ? n.split(/, */) : [];
    switch(m) {
      case "type":
        m = new U;
        m.b(h, l, g, b);
        k.push(m);
        u.forEach(v => {
          const x = new U;
          x.b(h, {...t, name:v}, g, b);
          k.push(x);
        });
        break;
      case "interface":
        l = Z(h, l, g, b);
        l.forEach(v => {
          X(v, b);
          v.isInterface = !0;
        });
        k.push(...l);
        break;
      case "constructor":
        l = Z(h, l, g, b);
        l.forEach(v => {
          X(v, b);
          v.isConstructor = !0;
        });
        k.push(...l);
        break;
      case "method":
        l = Z(h, l, g, b, !0);
        k.push(...l);
        break;
      case "import":
        u = new la, u.b(h, l, l.ns || l.from, b), f.push(u);
    }
    return k;
  }, []);
  b && a.forEach(k => na(b, k));
  return {namespace:e, types:a, imports:f};
}, _getLinks:S};


//# sourceMappingURL=depack.js.map