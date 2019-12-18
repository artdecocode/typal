#!/usr/bin/env node
             
const path = require('path');
const fs = require('fs');
const stream = require('stream');
const os = require('os');             
var w = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  a != Array.prototype && a != Object.prototype && (a[b] = d.value);
}, z = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function aa(a, b) {
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
aa("String.prototype.trimRight", function(a) {
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
;const C = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), ba = new RegExp(`(?:\\s+((?:${C.source}\\s*)*))`);
const D = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return B(new RegExp(`<(${a})${ba.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:d, a:c = "", c:e = ""}) => {
    c = c.replace(/\/$/, "").trim();
    c = ca(c);
    return {content:e, props:c, tag:d};
  });
}, ca = a => B(C, a, ["key", "val", "def", "f"]).reduce((b, {key:d, val:c}) => {
  if (void 0 === c) {
    return b[d] = !0, b;
  }
  b[d] = "true" == c ? !0 : "false" == c ? !1 : /^\d+$/.test(c) ? parseInt(c, 10) : c;
  return b;
}, {});
const da = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function ea(a) {
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
              var m = c();
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
              l = c();
              if (")" != a[b]) {
                throw Error("Variable args must come last");
              }
              h.variableArgs = l;
            } else {
              l = c(), h.args.push(l), "=" == a[b] && (l.optional = !0, b++);
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
      ":" == a[b] && (b++, l = c(), void 0 == l.name && l.nullable && (l.name = ""), h.return = l);
      m.function = h;
    } else {
      if ("<" == a[b] || (h = "." == a[b] && "<" == d())) {
        b++;
        h && b++;
        m = f;
        for (h = []; ">" != a[b];) {
          l = c();
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
      ({name:m} = c(!1));
      if (!m) {
        throw Error("Expected to see the name after .");
      }
      f.name += m;
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
;function E(a) {
  a = da(a);
  return ea(a);
}
;const F = ({A:a, C:b, l:d, type:c}) => b ? "string" : a ? "number" : d ? "boolean" : c ? c : "*", G = a => {
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
}, H = (a, b, d = null) => {
  const {async:c, "void":e, "return":g = e ? "void" : "", ...f} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({s:k, name:h}) => "this" == h ? `${h}: ${k}` : h.startsWith("...") ? `...${k}` : k).join(","));
  b = g.replace(/\n\s*/g, " ");
  c && b ? b = `!Promise<${b}>` : c && (b = "!Promise");
  !b && "constructor" == f.name && d && (b = d);
  d = `function(${a})`;
  b && (d += `: ${b}`);
  return {F:{...f, async:c}, o:d};
};
function fa(a, b, {name:d, string:c, "boolean":e, opt:g, number:f, type:k}, h) {
  if (!d) {
    throw Error("Argument does not have a name.");
  }
  a.name = d;
  b && (a.description = G(b));
  b = F({A:f, C:c, l:e, type:k});
  h && (b = b.replace(new RegExp(`([!?])?${h}\\.`, "g"), "$1"));
  b.endsWith("=") && (b = b.replace(/=$/, ""), g = !0);
  a.type = b;
  g && (a.optional = !0);
}
class ha {
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
const I = (a, b) => {
  let d = a.lastIndexOf("</arg>"), c = a;
  var e = [];
  -1 != d && (d += 6, e = a.slice(0, d), c = a.slice(d), e = D("arg", e), e = e.map(({content:g, props:f}) => {
    const k = new ha;
    fa(k, g, f, b);
    return k;
  }));
  return {w:c, j:e};
};
const {readFileSync:ia} = fs;
const ja = a => {
  const b = a.replace(/^\s*\n/gm, "").split("\n").reduce((d, c) => {
    [{length:c = 0} = {}] = /^\s*/.exec(c) || [];
    return c < d ? c : d;
  }, Infinity);
  return a.replace(new RegExp(`^ {${b}}`, "gm"), "");
};
function J(a, b = "") {
  const d = b.split(/\s*,\s*/);
  return a.split(/\s*,\s*/).map(c => {
    let e = c = ia(c, "utf8");
    if (c = /\/\* start example \*\/\r?\n([\s\S]+?)\r?\n\s*\/\* end example \*\//.exec(c)) {
      [, c] = c, e = ja(c);
    }
    d.forEach(g => {
      const [f, k] = g.split(/\s*=>\s*/);
      e = e.replace(`'${f}'`, `'${k}'`);
      e = e.replace(`"${f}"`, `"${k}"`);
    });
    return e = e.replace(/@/g, "\uff20");
  });
}
function K(a, b, d = new RegExp(`([!?])?${b}\\.`, "g")) {
  b && (a.type = a.type.replace(d, "$1"));
}
class L {
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
    const {function:{args:b, return:d, this:c, variableArgs:e}} = this.parsed;
    var g = b.map(k => a(k)).map((k, h) => {
      const {optional:m} = b[h];
      let {name:l = `arg${h}`, optional:p = m} = this.D[h] || {};
      return `${`${l}${p ? "?" : ""}`}: ${k}`;
    });
    if (c) {
      var f = a(c);
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
    f = d ? a(d) : "?";
    return `(${g}) => ${f}`;
  }
  get static() {
    return this.f;
  }
  get hasDefault() {
    return null !== this.default;
  }
  b(a, {name:b, string:d, "boolean":c, opt:e, number:g, type:f, "default":k, closure:h, alias:m, aliases:l, example:p, "example-override":n = "", noParams:q, "static":v, initial:r}) {
    if (!b) {
      throw Error("Property does not have a name.");
    }
    this.name = b;
    a && (this.description = G(a));
    a = F({A:g, C:d, l:c, type:f});
    q && (this.v = q);
    h && (this.u = h);
    this.type = a;
    void 0 !== k ? this.default = k : void 0 !== r && (this.default = r);
    if (e || void 0 !== k) {
      this.optional = !0;
    }
    m && (this.aliases = [m]);
    l && (this.aliases = l.split(/\s*,\s*/));
    v && (this.f = !0);
    p && (this.examples = J(p, n));
  }
  get type() {
    return this.g || "*";
  }
  set type(a) {
    this.g = a || null;
    this.h = this.u || this.g || "";
    if (!this.v) {
      try {
        this.parsed = E(this.h), this.isParsedFunction && !this.args && (this.args = []);
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
;class M extends L {
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
;const O = (a, b, d = {}) => {
  let c;
  if ("object" == typeof b) {
    c = b;
  } else {
    try {
      (c = E(b)) || console.log("Could not parse %s", b);
    } catch (e) {
      console.log("Could not parse %s", b), console.error(e.message);
    }
  }
  return c ? N(c, a, d) : b;
}, N = (a, b, d = {}) => {
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
    a.function.this && (c = "this: " + N(a.function.this, b, d), f.push(c));
    a.function.new && (c = "new: " + N(a.function.new, b, d), f.push(c));
    a.function.args.forEach(k => {
      let h = N(k, b, d);
      k.optional && (h += "=");
      f.push(h);
    });
    a.function.variableArgs && (c = "..." + N(a.function.variableArgs, b, d), f.push(c));
    c = f.join(", ");
    e += c + ")";
    a.function.return && (e += ": " + N(a.function.return, b, d));
  } else {
    a.record ? (e += "{ ", c = Object.keys(a.record).map(f => {
      var k = a.record[f];
      if (!k) {
        return f;
      }
      k = N(k, b, d);
      return `${f}: ${k}`;
    }), e += c.join(", "), e += " }") : a.application ? (e += P(a.name, b, g, d) + "&lt;", c = a.application.map(f => N(f, b, d)), e += c.join(", "), e += "&gt;") : a.union ? (e = e + g + "(", g = a.union.map(f => N(f, b, d)), e += g.join(c ? " \\| " : " | "), e += ")") : e += P("any" == a.name ? "*" : a.name, b, g, d);
  }
  return e;
}, P = (a, b, d = "", c = {}) => {
  const {flatten:e = !1, nameProcess:g, link:f = ({link:m}) => `#${m}`} = c;
  c = ka(b, a);
  d = `${d}${a}`;
  if (!c) {
    return d;
  }
  let {link:k, type:{description:h}} = c;
  k = f(c);
  e && ((b = b.find(({fullName:m}) => m == a)) && b.link && (k = b.link), !h && b.description && (h = b.description), "function" == typeof e && e(a));
  b = g ? g(d) : d;
  return h ? `<a href="${k}" title="${h.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${k})`;
}, ka = (a, b) => {
  a = a.filter(({fullName:c}) => c == b);
  if (a.length) {
    var d = a.find(({import:c}) => c || !1);
    a = a.find(({import:c}) => !c) || d;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function la(a, b = [], d = [], c = {}) {
  const {narrow:e = !1, flatten:g = !1, preprocessDesc:f, link:k} = c;
  if (!b.length) {
    return "";
  }
  const h = a.isConstructor || a.isInterface, m = b.some(({hasDefault:n}) => n), l = {flatten:g, escapePipe:!e, link:k}, p = n => O(d, n, l);
  a = b.map(n => {
    let q;
    n.args && n.isParsedFunction ? (q = n.toTypeScriptFunction(p), n.isConstructor && (q = `new ${q}`)) : q = O(d, n.parsed || n.type, l);
    const v = h || n.optional ? n.name : `${n.name}*`, r = n.hasDefault ? `\`${n.default}\`` : "-", t = f ? f(n.description) : n.description;
    return {prop:n, typeName:q, name:v, de:ma(t, !e), d:r};
  });
  if (e) {
    return {props:a, anyHaveDefault:m, constr:h};
  }
  a = a.map(({name:n, typeName:q, de:v, d:r, prop:t}) => [t.optional ? n : `__${n}__`, `<em>${q}</em>`, v, ...m ? [r] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...m ? [h ? "Initial" : "Default"] : []];
  return `

\`\`\`table
${JSON.stringify([b, ...a], null, 2)}
\`\`\``;
}
const ma = (a = "", b = !0) => {
  null === a && (a = "");
  b && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
};
const {dirname:Q, resolve:R} = path;
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
  b(a, {name:b, type:d, desc:c, noToc:e, spread:g, noExpand:f, link:k, closure:h, constructor:m, "extends":l, "interface":p, record:n, example:q, "example-override":v}, r, t = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    d && (this.type = d);
    h ? this.closureType = h : this.closureType = this.type;
    c && (this.description = G(c));
    this.noToc = !!e;
    this.spread = !!g;
    this.noExpand = !!f;
    k && (this.link = k);
    !0 === m && (this.isConstructor = m);
    !0 === p && (this.isInterface = p);
    !0 === n && (this.isRecord = n);
    l && (this.extends = l);
    r && (this.namespace = r);
    if (a) {
      b = D("prop", a).map(({content:u, props:x}) => {
        const A = new L;
        A.b(u, x);
        return A;
      });
      a = D(["function", "fn", "static"], a).map(({content:u, props:x, tag:A}) => {
        A = "static" == A;
        const {w:na, j:S} = I(u, t);
        u = new M(S);
        const {F:T, o:oa} = H(x, S, this.fullName);
        T.type = oa;
        u.b(na, T);
        A && (u.f = !0);
        return u;
      });
      a = [...b, ...a];
      const {m:y, B:pa, n:qa} = a.reduce((u, x) => {
        x.isConstructor ? u.m.push(x) : x.static ? u.B.push(x) : u.n.push(x);
        return u;
      }, {m:[], B:[], n:[]});
      this.properties = [...y, ...pa, ...qa];
    }
    q && (q = q.startsWith(".") && this.f ? R(Q(this.f), q) : q, this.examples = J(q, v));
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
    var g = this.type ? `\`${this.type}\`` : "", f = g;
    this.link ? f = `[${g}](${this.link})` : !this.import && this.type && (f = O(a, this.type, b), g = f != this.type, f = V(f, g));
    g = V(this.fullName);
    g = this.import ? `[${g}](l-type)` : this.noToc ? `[${g}](l-type)` : `[${g}](t-type)`;
    const k = this.description ? `: ${this.description}` : "";
    f = f ? `${f} ` : "";
    let h = /_/.test(g);
    if (this.extends) {
      const m = ra(this.extends, a, b), l = ` extends ${m}`;
      h = h || /_/.test(m);
      f = (h ? f + "<strong>" : f + "__") + (g + l);
      "function" == typeof d && d(this.extends);
    } else {
      f = (h ? f + "<strong>" : f + "__") + g;
    }
    f = (h ? f + "</strong>" : f + "__") + k;
    a = la(this, this.properties, a, b);
    return {LINE:f, table:a, displayInDetails:e};
  }
}
const V = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`, ra = (a, b, d) => a.split(/,\s*/).map(c => {
  let e = `\`${c}\``;
  var g = b.find(({fullName:f}) => f == c);
  g && g.link ? (e = "<a ", g.description && (e += `title="${g.description}" `), e += `href="${g.link}">\`${c}\`</a>`) : (g = O(b, c, {...d, nameProcess:f => `\`${f}\``}), c != g && (e = g));
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
  b(a, {async:b, "return":d, ...c}, ...e) {
    this.description = G(a);
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
;class sa extends U {
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
    this.description = G(a);
    super.b("", {...c, noToc:!0, name:d, type:`import('${b}').${d}`}, e != g ? e : null);
  }
}
;const {homedir:ta} = os;
ta();
const ua = (a, b) => {
  const d = new RegExp(`([!?])?${a}\\.`, "g");
  b.properties.forEach(c => {
    K(c, a, d);
  });
  b.h(a);
}, X = (a, b) => {
  var {args:d = []} = a;
  if (d.length) {
    var c = `function(${d.map(({s:e}) => e).join(", ")}): ${a.fullName}`;
    d = new M(d);
    d.isConstructor = !0;
    d.b("Constructor method.", {type:c, name:"constructor"});
    d.examples = a.examples;
    K(d, b);
    a.properties.unshift(d);
  }
}, Y = (a, b, d, c, e = !1, g = null) => {
  const f = e ? new W : new U;
  f.f = g;
  g = a.search(/<(prop|function|fn|static) /);
  let k = "", h = a;
  1 != g && (k = a.slice(0, g), h = a.slice(g));
  const {j:m, w:l} = I(k, c);
  f.b(e ? l : h, b, d, c);
  ({o:a} = H(b, m));
  e && (f.closureType = a);
  f.args = m;
  return f;
}, Z = ({content:a, props:b, ns:d, i:c, isMethod:e = !1, location:g = null}) => {
  const f = [], {alias:k, aliases:h, ...m} = b;
  b = Y(a, b, d, c, e, g);
  f.push(b);
  (k ? [k] : h ? h.split(/, */) : []).forEach(l => {
    l = Y(a, {...m, name:l}, d, c, e, g);
    l.description = `${l.description}${l.description ? " " : ""}Alias of \`${m.name}\`.`;
    f.push(l);
  });
  return f;
};
module.exports = {_Type:U, _Property:L, _Method:W, _parseFile:(a, b, d = null) => {
  a = D("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:c, props:{namespace:e, ns:g = e}}] = a, f = b == g ? void 0 : g, k = [];
  a = D(["type", "interface", "constructor", "method", "import"], c).reduce((h, {content:m, props:l, tag:p}) => {
    const {alias:n, aliases:q, ...v} = l;
    var r = v.example;
    r && r.startsWith(".") && d && (v.example = R(Q(d), r));
    r = n ? [n] : q ? q.split(/, */) : [];
    switch(p) {
      case "type":
        p = new U;
        d && (p.f = d);
        p.b(m, l, f, b);
        h.push(p);
        r.forEach(t => {
          const y = new U;
          d && (y.f = d);
          y.b(m, {...v, name:t}, f, b);
          h.push(y);
        });
        break;
      case "interface":
        l = Z({content:m, props:l, ns:f, i:b, location:d});
        l.forEach(t => {
          t.properties.some(({isConstructor:y}) => y) || X(t, b);
          t.isInterface = !0;
        });
        h.push(...l);
        break;
      case "constructor":
        l = Z({content:m, props:l, ns:f, i:b, location:d});
        l.forEach(t => {
          t.properties.some(({isConstructor:y}) => y) || X(t, b);
          t.isConstructor = !0;
        });
        h.push(...l);
        break;
      case "method":
        l = Z({content:m, props:l, ns:f, i:b, isMethod:!0, location:d});
        h.push(...l);
        break;
      case "import":
        p = new sa, p.b(m, l, l.ns || l.from, b), k.push(p);
    }
    return h;
  }, []);
  b && a.forEach(h => ua(b, h));
  return {namespace:g, types:a, imports:k};
}, _getLinks:O};


//# sourceMappingURL=typal.js.map