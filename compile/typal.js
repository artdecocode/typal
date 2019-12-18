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
const aa = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function ba(a) {
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
            } catch (q) {
              throw q.message += `(when parsing ${k} property)`, q;
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
;function G(a) {
  a = aa(a);
  return ba(a);
}
;const H = ({w:a, B:b, i:d, type:c}) => b ? "string" : a ? "number" : d ? "boolean" : c ? c : "*", I = a => {
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
}, J = (a, b, d = null) => {
  const {async:c, "void":e, "return":g = e ? "void" : "", ...f} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({m:h, name:k}) => "this" == k ? `${k}: ${h}` : k.startsWith("...") ? `...${h}` : h).join(","));
  b = g.replace(/\n\s*/g, " ");
  c && b ? b = `!Promise<${b}>` : c && (b = "!Promise");
  !b && "constructor" == f.name && d && (b = d);
  d = `function(${a})`;
  b && (d += `: ${b}`);
  return {D:{...f, async:c}, l:d};
};
function ca(a, b, {name:d, string:c, "boolean":e, opt:g, number:f, type:h}, k) {
  if (!d) {
    throw Error("Argument does not have a name.");
  }
  a.name = d;
  b && (a.description = I(b));
  b = H({w:f, B:c, i:e, type:h});
  k && (b = b.replace(new RegExp(`([!?])?${k}\\.`, "g"), "$1"));
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
  get m() {
    return this.optional ? `${this.type}=` : this.type;
  }
}
const K = (a, b) => {
  let d = a.lastIndexOf("</arg>"), c = a;
  var e = [];
  -1 != d && (d += 6, e = a.slice(0, d), c = a.slice(d), e = F("arg", e), e = e.map(({content:g, props:f}) => {
    const h = new da;
    ca(h, g, f, b);
    return h;
  }));
  return {v:c, h:e};
};
const {readFileSync:ea} = fs;
const fa = a => {
  const b = a.replace(/^\s*\n/gm, "").split("\n").reduce((d, c) => {
    [{length:c = 0} = {}] = /^\s*/.exec(c) || [];
    return c < d ? c : d;
  }, Infinity);
  return a.replace(new RegExp(`^ {${b}}`, "gm"), "");
};
function L(a, b = "") {
  const d = b.split(/\s*,\s*/);
  return a.split(/\s*,\s*/).map(c => {
    let e = c = ea(c, "utf8");
    if (c = /\/\* start example \*\/\r?\n([\s\S]+?)\r?\n\s*\/\* end example \*\//.exec(c)) {
      [, c] = c, e = fa(c);
    }
    d.forEach(g => {
      const [f, h] = g.split(/\s*=>\s*/);
      e = e.replace(`'${f}'`, `'${h}'`);
      e = e.replace(`"${f}"`, `"${h}"`);
    });
    return e = e.replace(/@/g, "\uff20");
  });
}
function M(a, b, d = new RegExp(`([!?])?${b}\\.`, "g")) {
  b && (a.type = a.type.replace(d, "$1"));
}
class N {
  constructor(a = null) {
    this.g = this.description = this.name = null;
    this.o = "";
    this.default = this.s = null;
    this.optional = !1;
    this.aliases = [];
    this.u = !1;
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
    var g = b.map(h => a(h)).map((h, k) => {
      const {optional:l} = b[k];
      let {name:m = `arg${k}`, optional:q = l} = this.C[k] || {};
      return `${`${m}${q ? "?" : ""}`}: ${h}`;
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
  get static() {
    return this.f;
  }
  get hasDefault() {
    return null !== this.default;
  }
  b(a, {name:b, string:d, "boolean":c, opt:e, number:g, type:f, "default":h, closure:k, alias:l, aliases:m, example:q, "example-override":n = "", noParams:r, "static":t, initial:p}) {
    if (!b) {
      throw Error("Property does not have a name.");
    }
    this.name = b;
    a && (this.description = I(a));
    a = H({w:g, B:d, i:c, type:f});
    r && (this.u = r);
    k && (this.s = k);
    this.type = a;
    void 0 !== h ? this.default = h : void 0 !== p && (this.default = p);
    if (e || void 0 !== h) {
      this.optional = !0;
    }
    l && (this.aliases = [l]);
    m && (this.aliases = m.split(/\s*,\s*/));
    t && (this.f = !0);
    q && (this.examples = L(q, n));
  }
  get type() {
    return this.g || "*";
  }
  set type(a) {
    this.g = a || null;
    this.o = this.s || this.g || "";
    if (!this.u) {
      try {
        this.parsed = G(this.o), this.isParsedFunction && !this.args && (this.args = []);
      } catch (b) {
        this.parsed = null;
      }
    }
  }
  get C() {
    var a = this.args;
    this.args && this.args[0] && "this" == this.args[0].name && ([, ...a] = this.args);
    return a;
  }
  get isParsedFunction() {
    return !!this.parsed && "function" == this.parsed.name;
  }
}
;class O extends N {
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
  c = ha(b, a);
  d = `${d}${a}`;
  if (!c) {
    return d;
  }
  let {link:h, type:{description:k}} = c;
  h = f(c);
  e && ((b = b.find(({fullName:l}) => l == a)) && b.link && (h = b.link), !k && b.description && (k = b.description), "function" == typeof e && e(a));
  b = g ? g(d) : d;
  return k ? `<a href="${h}" title="${k.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${h})`;
}, ha = (a, b) => {
  a = a.filter(({fullName:c}) => c == b);
  if (a.length) {
    var d = a.find(({import:c}) => c || !1);
    a = a.find(({import:c}) => !c) || d;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function ia(a, b = [], d = [], c = {}) {
  const {narrow:e = !1, flatten:g = !1, preprocessDesc:f, link:h} = c;
  if (!b.length) {
    return "";
  }
  const k = a.isConstructor || a.isInterface, l = b.some(({hasDefault:n}) => n), m = {flatten:g, escapePipe:!e, link:h}, q = n => S(d, n, m);
  a = b.map(n => {
    let r;
    n.args && n.isParsedFunction ? (r = n.toTypeScriptFunction(q), n.isConstructor && (r = `new ${r}`)) : r = S(d, n.parsed || n.type, m);
    const t = k || n.optional ? n.name : `${n.name}*`, p = n.hasDefault ? `\`${n.default}\`` : "-", u = f ? f(n.description) : n.description;
    return {prop:n, typeName:r, name:t, de:ja(u, !e), d:p};
  });
  if (e) {
    return {props:a, anyHaveDefault:l, constr:k};
  }
  a = a.map(({name:n, typeName:r, de:t, d:p, prop:u}) => [u.optional ? n : `__${n}__`, `<em>${r}</em>`, t, ...l ? [p] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...l ? [k ? "Initial" : "Default"] : []];
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
  }
  get import() {
    return !1;
  }
  b(a, {name:b, type:d, desc:c, noToc:e, spread:g, noExpand:f, link:h, closure:k, constructor:l, "extends":m, "interface":q, record:n, example:r, "example-override":t}, p, u = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    d && (this.type = d);
    k ? this.closureType = k : this.closureType = this.type;
    c && (this.description = I(c));
    this.noToc = !!e;
    this.spread = !!g;
    this.noExpand = !!f;
    h && (this.link = h);
    !0 === l && (this.isConstructor = l);
    !0 === q && (this.isInterface = q);
    !0 === n && (this.isRecord = n);
    m && (this.extends = m);
    p && (this.namespace = p);
    if (a) {
      b = F("prop", a).map(({content:v, props:x}) => {
        const z = new N;
        z.b(v, x);
        return z;
      });
      a = F(["function", "fn", "static"], a).map(({content:v, props:x, tag:z}) => {
        z = "static" == z;
        const {v:ka, h:P} = K(v, u);
        v = new O(P);
        const {D:Q, l:la} = J(x, P, this.fullName);
        Q.type = la;
        v.b(ka, Q);
        z && (v.f = !0);
        return v;
      });
      a = [...b, ...a];
      const {j:ma, A:na, n:oa} = a.reduce((v, x) => {
        x.isConstructor ? v.j.push(x) : x.static ? v.A.push(x) : v.n.push(x);
        return v;
      }, {j:[], A:[], n:[]});
      this.properties = [...ma, ...na, ...oa];
    }
    r && (this.examples = L(r, t));
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
    var g = this.type ? `\`${this.type}\`` : "", f = g;
    this.link ? f = `[${g}](${this.link})` : !this.import && this.type && (f = S(a, this.type, b), g = f != this.type, f = V(f, g));
    g = V(this.fullName);
    g = this.import ? `[${g}](l-type)` : this.noToc ? `[${g}](l-type)` : `[${g}](t-type)`;
    const h = this.description ? `: ${this.description}` : "";
    f = f ? `${f} ` : "";
    let k = /_/.test(g);
    if (this.extends) {
      const l = pa(this.extends, a, b), m = ` extends ${l}`;
      k = k || /_/.test(l);
      f = (k ? f + "<strong>" : f + "__") + (g + m);
      "function" == typeof d && d(this.extends);
    } else {
      f = (k ? f + "<strong>" : f + "__") + g;
    }
    f = (k ? f + "</strong>" : f + "__") + h;
    a = ia(this, this.properties, a, b);
    return {LINE:f, table:a, displayInDetails:e};
  }
}
const V = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`, pa = (a, b, d) => a.split(/,\s*/).map(c => {
  let e = `\`${c}\``;
  var g = b.find(({fullName:f}) => f == c);
  g && g.link ? (e = "<a ", g.description && (e += `title="${g.description}" `), e += `href="${g.link}">\`${c}\`</a>`) : (g = S(b, c, {...d, nameProcess:f => `\`${f}\``}), c != g && (e = g));
  return e;
}).join(", ");
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
    this.description = I(a);
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
;class qa extends U {
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
    this.description = I(a);
    super.b("", {...c, noToc:!0, name:d, type:`import('${b}').${d}`}, e != g ? e : null);
  }
}
;const {homedir:ra} = os;
ra();
const sa = (a, b) => {
  const d = new RegExp(`([!?])?${a}\\.`, "g");
  b.properties.forEach(c => {
    M(c, a, d);
  });
  b.g(a);
}, X = (a, b) => {
  var {args:d = []} = a;
  if (d.length) {
    var c = `function(${d.map(({m:e}) => e).join(", ")}): ${a.fullName}`;
    d = new O(d);
    d.isConstructor = !0;
    d.b("Constructor method.", {type:c, name:"constructor"});
    d.examples = a.examples;
    M(d, b);
    a.properties.unshift(d);
  }
}, Y = (a, b, d, c, e = !1) => {
  const g = e ? new W : new U, f = a.search(/<(prop|function|fn|static) /);
  let h = "", k = a;
  1 != f && (h = a.slice(0, f), k = a.slice(f));
  const {h:l, v:m} = K(h, c);
  g.b(e ? m : k, b, d, c);
  ({l:a} = J(b, l));
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
module.exports = {_Type:U, _Property:N, _Method:W, _parseFile:(a, b) => {
  a = F("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:d, props:{namespace:c, ns:e = c}}] = a, g = b == e ? void 0 : e, f = [];
  a = F(["type", "interface", "constructor", "method", "import"], d).reduce((h, {content:k, props:l, tag:m}) => {
    const {alias:q, aliases:n, ...r} = l;
    var t = q ? [q] : n ? n.split(/, */) : [];
    switch(m) {
      case "type":
        m = new U;
        m.b(k, l, g, b);
        h.push(m);
        t.forEach(p => {
          const u = new U;
          u.b(k, {...r, name:p}, g, b);
          h.push(u);
        });
        break;
      case "interface":
        l = Z(k, l, g, b);
        l.forEach(p => {
          p.properties.some(({isConstructor:u}) => u) || X(p, b);
          p.isInterface = !0;
        });
        h.push(...l);
        break;
      case "constructor":
        l = Z(k, l, g, b);
        l.forEach(p => {
          p.properties.some(({isConstructor:u}) => u) || X(p, b);
          p.isConstructor = !0;
        });
        h.push(...l);
        break;
      case "method":
        l = Z(k, l, g, b, !0);
        h.push(...l);
        break;
      case "import":
        t = new qa, t.b(k, l, l.ns || l.from, b), f.push(t);
    }
    return h;
  }, []);
  b && a.forEach(h => sa(b, h));
  return {namespace:e, types:a, imports:f};
}, _getLinks:S};


//# sourceMappingURL=typal.js.map