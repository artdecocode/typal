#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');             
var w = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, e) {
  a != Array.prototype && a != Object.prototype && (a[b] = e.value);
}, y = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function A(a, b) {
  if (b) {
    var e = y;
    a = a.split(".");
    for (var c = 0; c < a.length - 1; c++) {
      var d = a[c];
      d in e || (e[d] = {});
      e = e[d];
    }
    a = a[a.length - 1];
    c = e[a];
    b = b(c);
    b != c && null != b && w(e, a, {configurable:!0, writable:!0, value:b});
  }
}
A("String.prototype.trimRight", function(a) {
  function b() {
    return this.replace(/[\s\xa0]+$/, "");
  }
  return a || b;
});
function B(a, b, e) {
  const c = [];
  b.replace(a, (d, ...g) => {
    d = g.slice(0, g.length - 2).reduce((f, h, k) => {
      k = e[k];
      if (!k || void 0 === h) {
        return f;
      }
      f[k] = h;
      return f;
    }, {});
    c.push(d);
  });
  return c;
}
;const C = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), D = new RegExp(`(?:\\s+((?:${C.source}\\s*)*))`);
const F = (a, b) => B(new RegExp(`<(${(Array.isArray(a) ? a : [a]).join("|")})${D.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:e, a:c = "", c:d = ""}) => {
  c = c.replace(/\/$/, "").trim();
  c = E(c);
  return {content:d, props:c, tag:e};
}), E = a => B(C, a, ["key", "val", "def", "f"]).reduce((b, {key:e, val:c}) => {
  if (void 0 === c) {
    return b[e] = !0, b;
  }
  b[e] = "true" == c ? !0 : "false" == c ? !1 : /^\d+$/.test(c) ? parseInt(c, 10) : c;
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
  const e = (d = 1) => a[b + d], c = (d = !0, g = []) => {
    var f = {};
    let h = a[b];
    if (["nullable", "nonNullable"].includes(h)) {
      if (!d) {
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
        for (d = {}; "}" != a[b];) {
          var k = a[b];
          b++;
          d[k] = null;
          if (":" == a[b]) {
            b++;
            try {
              var l = c();
              d[k] = l;
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
        g.record = d;
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
            if ("." == a[b] && "." == e() && "." == e(2)) {
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
      if ("<" == a[b] || (k = "." == a[b] && "<" == e())) {
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
    if ("|" != a[b] || !d) {
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
;const I = ({v:a, A:b, i:e, type:c}) => b ? "string" : a ? "number" : e ? "boolean" : c ? c : "*", J = a => {
  a = a.trimRight();
  var b = /\S/.exec(a);
  if (!b) {
    return a;
  }
  b = b.index;
  if (0 == b) {
    return a;
  }
  var e = a.substr(0, b).lastIndexOf("\n");
  -1 == e ? e = 0 : (e++, a = a.substr(e));
  b -= e;
  const c = " ".repeat(b);
  e = a.split("\n");
  if (e.filter(d => /\S/.test(d)).find(d => !d.startsWith(c))) {
    return a.trim();
  }
  {
    const d = new RegExp(`^ {${b}}`);
    return e.map(g => g.replace(d, "")).join("\n");
  }
}, K = (a, b) => {
  const {async:e, "void":c, "return":d = c ? "void" : "", ...g} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({l:f, name:h}) => "this" == h ? `${h}: ${f}` : h.startsWith("...") ? `...${f}` : f).join(","));
  b = d.replace(/\n\s*/g, " ");
  e && b ? b = `!Promise<${b}>` : e && (b = "!Promise");
  a = `function(${a})`;
  b && (a += `: ${b}`);
  return {C:g, j:a};
};
function ba(a, b, {name:e, string:c, "boolean":d, opt:g, number:f, type:h}, k) {
  if (!e) {
    throw Error("Argument does not have a name.");
  }
  a.name = e;
  b && (a.description = J(b));
  b = I({v:f, A:c, i:d, type:h});
  k && (b = b.replace(new RegExp(`([!?])?${k}\\.`, "g"), "$1"));
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
  get l() {
    return this.optional ? `${this.type}=` : this.type;
  }
}
const L = (a, b) => {
  let e = a.lastIndexOf("</arg>"), c = a;
  var d = [];
  -1 != e && (e += 6, d = a.slice(0, e), c = a.slice(e), d = F("arg", d), d = d.map(({content:g, props:f}) => {
    const h = new ca;
    ba(h, g, f, b);
    return h;
  }));
  return {u:c, h:d};
};
const {readFileSync:da} = fs;
const ea = a => {
  const b = a.replace(/^\s*\n/gm, "").replace(/[^\s]/g, "").split("\n").reduce((e, c) => c.length < e ? c.length : e, Infinity);
  return a.replace(new RegExp(`^ {${b}}`, "gm"), "");
};
function M(a, b = "") {
  const e = b.split(/\s*,\s*/);
  return a.split(/\s*,\s*/).map(c => {
    let d = c = da(c, "utf8");
    if (c = /\/\* start example \*\/\r?\n([\s\S]+?)\r?\n\/\* end example \*\//.exec(c)) {
      [, c] = c, d = ea(c);
    }
    e.forEach(g => {
      const [f, h] = g.split(/\s*=>\s*/);
      d = d.replace(`'${f}'`, `'${h}'`);
      d = d.replace(`"${f}"`, `"${h}"`);
    });
    return d = d.replace(/@/g, "\uff20");
  });
}
function N(a, b, {name:e, string:c, "boolean":d, opt:g, number:f, type:h, "default":k, closure:l, alias:m, aliases:p, example:n, "example-override":r = "", noParams:t, "static":q, initial:u}) {
  if (!e) {
    throw Error("Property does not have a name.");
  }
  a.name = e;
  b && (a.description = J(b));
  b = I({v:f, A:c, i:d, type:h});
  t && (a.s = t);
  l && (a.o = l);
  a.type = b;
  void 0 !== k ? a.default = k : void 0 !== u && (a.default = u);
  if (g || void 0 !== k) {
    a.optional = !0;
  }
  m && (a.aliases = [m]);
  p && (a.aliases = p.split(/\s*,\s*/));
  q && (a.b = !0);
  n && (a.examples = M(n, r));
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
    this.examples = [];
  }
  toTypeScriptFunction(a) {
    if (!this.parsed) {
      throw Error("The property was not parsed.");
    }
    const {function:{args:b, return:e, this:c, variableArgs:d}} = this.parsed;
    var g = b.map(h => a(h)).map((h, k) => {
      const {optional:l} = b[k];
      let {name:m = `arg${k}`, optional:p = l} = this.B[k] || {};
      return `${`${m}${p ? "?" : ""}`}: ${h}`;
    });
    if (c) {
      var f = a(c);
      g.unshift(`this: ${f}`);
    }
    if (d) {
      f = a(d);
      let h = "...args";
      try {
        h = `${this.args[this.args.length - 1].name}`;
      } catch (k) {
      }
      g.push(`${h}: ${f}[]`);
    }
    g = g.join(", ");
    f = e ? a(e) : "?";
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
        this.parsed = H(this.m), this.isParsedFunction && !this.args && (this.args = []);
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
;const S = (a, b, e = {}) => {
  let c;
  if ("object" == typeof b) {
    c = b;
  } else {
    try {
      (c = H(b)) || console.log("Could not parse %s", b);
    } catch (d) {
      console.log("Could not parse %s", b), console.error(d.message);
    }
  }
  return c ? R(c, a, e) : b;
}, R = (a, b, e = {}) => {
  if ("" == a.name && a.nullable) {
    return "?";
  }
  var {escapePipe:c = !0} = e;
  let d = "";
  var g = "";
  a.nullable ? g = "?" : !1 === a.nullable && (g = "!");
  if (a.function) {
    d = d + g + (a.name + "(");
    const f = [];
    a.function.this && (c = "this: " + R(a.function.this, b, e), f.push(c));
    a.function.new && (c = "new: " + R(a.function.new, b, e), f.push(c));
    a.function.args.forEach(h => {
      let k = R(h, b, e);
      h.optional && (k += "=");
      f.push(k);
    });
    a.function.variableArgs && (c = "..." + R(a.function.variableArgs, b, e), f.push(c));
    d += f.join(", ") + ")";
    a.function.return && (d += ": " + R(a.function.return, b, e));
  } else {
    a.record ? (d += "{ ", c = Object.keys(a.record).map(f => {
      var h = a.record[f];
      if (!h) {
        return f;
      }
      h = R(h, b, e);
      return `${f}: ${h}`;
    }), d += c.join(", "), d += " }") : a.application ? (d += T(a.name, b, g, e) + "&lt;", c = a.application.map(f => R(f, b, e)), d += c.join(", "), d += "&gt;") : a.union ? (d = d + g + "(", g = a.union.map(f => R(f, b, e)), d += g.join(c ? " \\| " : " | "), d += ")") : d += T("any" == a.name ? "*" : a.name, b, g, e);
  }
  return d;
}, T = (a, b, e = "", c = {}) => {
  const {flatten:d = !1, nameProcess:g, link:f = ({link:l}) => `#${l}`} = c;
  c = fa(b, a);
  e = `${e}${a}`;
  if (!c) {
    return e;
  }
  let {link:h, type:{description:k}} = c;
  h = f(c);
  d && ((b = b.find(({fullName:l}) => l == a)) && b.link && (h = b.link), !k && b.description && (k = b.description), "function" == typeof d && d(a));
  b = g ? g(e) : e;
  return k ? `<a href="${h}" title="${k.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${h})`;
}, fa = (a, b) => {
  a = a.filter(({fullName:c}) => c == b);
  if (a.length) {
    var e = a.find(({import:c}) => c || !1);
    a = a.find(({import:c}) => !c) || e;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function ha(a, b = [], e = [], c = {}) {
  const {narrow:d = !1, flatten:g = !1, preprocessDesc:f, link:h} = c;
  if (!b.length) {
    return "";
  }
  const k = a.isConstructor || a.isInterface, l = b.some(({hasDefault:n}) => n), m = {flatten:g, escapePipe:!d, link:h}, p = n => S(e, n, m);
  a = b.map(n => {
    let r;
    n.args && n.isParsedFunction ? (r = n.toTypeScriptFunction(p), n.isConstructor && (r = `new ${r}`)) : r = S(e, n.parsed || n.type, m);
    const t = k || n.optional ? n.name : `${n.name}*`, q = n.hasDefault ? `\`${n.default}\`` : "-", u = f ? f(n.description) : n.description;
    return {prop:n, typeName:r, name:t, de:ia(u, !d), d:q};
  });
  if (d) {
    return {props:a, anyHaveDefault:l, constr:k};
  }
  a = a.map(({name:n, typeName:r, de:t, d:q, prop:u}) => [u.optional ? n : `__${n}__`, `<em>${r}</em>`, t, ...l ? [q] : []]);
  b = ["Name", ...d ? ["Type & Description"] : ["Type", "Description"], ...l ? [k ? "Initial" : "Default"] : []];
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
  b(a, {name:b, type:e, desc:c, noToc:d, spread:g, noExpand:f, link:h, closure:k, constructor:l, "extends":m, "interface":p, record:n, example:r, "example-override":t}, q, u = null) {
    if (!b) {
      throw Error("Type does not have a name.");
    }
    this.name = b;
    e && (this.type = e);
    k ? this.closureType = k : this.closureType = this.type;
    c && (this.description = J(c));
    this.noToc = !!d;
    this.spread = !!g;
    this.noExpand = !!f;
    h && (this.link = h);
    !0 === l && (this.isConstructor = l);
    !0 === p && (this.isInterface = p);
    !0 === n && (this.isRecord = n);
    m && (this.extends = m);
    if (a) {
      b = F("prop", a).map(({content:v, props:x}) => {
        const z = new Q;
        N(z, v, x);
        return z;
      });
      a = F(["function", "fn", "static"], a).map(({content:v, props:x, tag:z}) => {
        z = "static" == z;
        const {u:ja, h:O} = L(v, u);
        v = new Q(O);
        const {C:P, j:ka} = K(x, O);
        P.type = ka;
        N(v, ja, P);
        z && (v.b = !0);
        return v;
      });
      a = [...b, ...a];
      const {w:la, n:ma} = a.reduce((v, x) => {
        x.static ? v.w.push(x) : v.n.push(x);
        return v;
      }, {w:[], n:[]});
      this.properties = [...la, ...ma];
    }
    q && (this.namespace = q);
    r && M(r, t);
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
    const {flatten:e, details:c = []} = b, d = c.includes(this.name);
    var g = this.type ? `\`${this.type}\`` : "", f = g;
    this.link ? f = `[${g}](${this.link})` : !this.import && this.type && (f = S(a, this.type, b), g = f != this.type, f = V(f, g));
    g = V(this.fullName);
    g = this.import ? `[${g}](l-type)` : this.noToc ? `[${g}](l-type)` : `[${g}](t-type)`;
    const h = this.description ? `: ${this.description}` : "";
    f = f ? `${f} ` : "";
    let k = /_/.test(g);
    if (this.extends) {
      const l = na(this.extends, a, b), m = ` extends ${l}`;
      k = k || /_/.test(l);
      f = (k ? f + "<strong>" : f + "__") + (g + m);
      "function" == typeof e && e(this.extends);
    } else {
      f = (k ? f + "<strong>" : f + "__") + g;
    }
    f = (k ? f + "</strong>" : f + "__") + h;
    a = ha(this, this.properties, a, b);
    return {LINE:f, table:a, displayInDetails:d};
  }
}
const V = (a, b = !1) => `${b ? "<code>" : "`"}${a}${b ? "</code>" : "`"}`, na = (a, b, e) => a.split(/,\s*/).map(c => {
  let d = `\`${c}\``;
  var g = b.find(({fullName:f}) => f == c);
  g && g.link ? (d = "<a ", g.description && (d += `title="${g.description}" `), d += `href="${g.link}">\`${c}\`</a>`) : (g = S(b, c, {...e, nameProcess:f => `\`${f}\``}), c != g && (d = g));
  return d;
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
  b(a, {async:b, "return":e, ...c}, ...d) {
    this.description = J(a);
    super.b("", c, ...d);
    e && (this.f = e.replace(/\n\s*/g, " "));
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
;class oa extends U {
  constructor() {
    super();
    this.from = "";
  }
  get import() {
    return !0;
  }
  b(a, {from:b, name:e, ...c}, d, g) {
    if (!b) {
      throw Error("From attribute of import is not given.");
    }
    this.from = b;
    this.description = J(a);
    super.b("", {...c, noToc:!0, name:e, type:`import('${b}').${e}`}, d != g ? d : null);
  }
}
;const {homedir:pa} = os;
pa();
const qa = (a, b) => {
  const e = new RegExp(`([!?])?${a}\\.`, "g");
  b.properties.forEach(c => {
    c.g(a, e);
  });
  b.g(a);
}, X = (a, b) => {
  if (a.args && a.args.length) {
    var e = `function(${a.args.map(({l:d}) => d).join(", ")}): ${a.fullName}`, c = new Q(a.args);
    c.isConstructor = !0;
    N(c, "Constructor method.", {type:e, name:"constructor"});
    c.g(b);
    a.properties.unshift(c);
  }
}, Y = (a, b, e, c, d = !1) => {
  const g = d ? new W : new U, f = a.search(/<(prop|function|fn|static) /);
  let h = "", k = a;
  1 != f && (h = a.slice(0, f), k = a.slice(f));
  const {h:l, u:m} = L(h, c);
  g.b(d ? m : k, b, e, c);
  ({j:a} = K(b, l));
  d && (g.closureType = a);
  g.args = l;
  return g;
}, Z = (a, b, e, c, d = !1) => {
  const g = [], {alias:f, aliases:h, ...k} = b;
  b = Y(a, b, e, c, d);
  g.push(b);
  (f ? [f] : h ? h.split(/, */) : []).forEach(l => {
    l = Y(a, {...k, name:l}, e, c, d);
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
  const [{content:e, props:{namespace:c, ns:d = c}}] = a, g = b == d ? void 0 : d, f = [];
  a = F(["type", "interface", "constructor", "method", "import"], e).reduce((h, {content:k, props:l, tag:m}) => {
    const {alias:p, aliases:n, ...r} = l;
    var t = p ? [p] : n ? n.split(/, */) : [];
    switch(m) {
      case "type":
        m = new U;
        m.b(k, l, g, b);
        h.push(m);
        t.forEach(q => {
          const u = new U;
          u.b(k, {...r, name:q}, g, b);
          h.push(u);
        });
        break;
      case "interface":
        l = Z(k, l, g, b);
        l.forEach(q => {
          X(q, b);
          q.isInterface = !0;
        });
        h.push(...l);
        break;
      case "constructor":
        l = Z(k, l, g, b);
        l.forEach(q => {
          X(q, b);
          q.isConstructor = !0;
        });
        h.push(...l);
        break;
      case "method":
        l = Z(k, l, g, b, !0);
        h.push(...l);
        break;
      case "import":
        t = new oa, t.b(k, l, l.ns || l.from, b), f.push(t);
    }
    return h;
  }, []);
  b && a.forEach(h => qa(b, h));
  return {namespace:d, types:a, imports:f};
}, _getLinks:S};


//# sourceMappingURL=typal.js.map