#!/usr/bin/env node
             
const os = require('os');
const fs = require('fs');
const path = require('path');
const stream = require('stream');             
var w = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
  a != Array.prototype && a != Object.prototype && (a[b] = d.value);
};
function x(a) {
  a = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
  for (var b = 0; b < a.length; ++b) {
    var d = a[b];
    if (d && d.Math == Math) {
      return d;
    }
  }
  return globalThis;
}
var y = x(this);
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
const B = os.EOL, C = os.homedir;
function D(a, b, d) {
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
;const E = new RegExp(`${/([^\s>=/]+)/.source}(?:\\s*=\\s*${/(?:"([\s\S]*?)"|'([\s\S]*?)')/.source})?`, "g"), F = new RegExp(`(?:\\s+((?:${E.source}\\s*)*))`);
const G = (a, b) => {
  a = (Array.isArray(a) ? a : [a]).join("|");
  return D(new RegExp(`<(${a})${F.source}?(?:${/\s*\/>/.source}|${/>([\s\S]+?)?<\/\1>/.source})`, "g"), b, "t a v v1 v2 c".split(" ")).map(({t:d, a:c = "", c:e = ""}) => {
    c = c.replace(/\/$/, "").trim();
    c = aa(c);
    return {content:e, props:c, tag:d};
  });
}, aa = a => D(E, a, ["key", "val", "def", "f"]).reduce((b, {key:d, val:c}) => {
  if (void 0 === c) {
    return b[d] = !0, b;
  }
  b[d] = "true" == c ? !0 : "false" == c ? !1 : /^\d+$/.test(c) ? parseInt(c, 10) : c;
  return b;
}, {});
const ba = a => a.split(/([!?=*(),:.<>{}|\s+])/g).filter(b => /\S/.test(b)).map(b => {
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
function ca(a) {
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
      for (var n; ")" != a[b];) {
        if (n && "this" == a[b]) {
          throw Error("this must come first in function arguments");
        }
        if (n && "new" == a[b]) {
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
              n = c();
              if (")" != a[b]) {
                throw Error("Variable args must come last");
              }
              h.variableArgs = n;
            } else {
              n = c(), h.args.push(n), "=" == a[b] && (n.optional = !0, b++);
            }
          }
        }
        n = !0;
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
      ":" == a[b] && (b++, n = c(), void 0 == n.name && n.nullable && (n.name = ""), h.return = n);
      l.function = h;
    } else {
      if ("<" == a[b] || (h = "." == a[b] && "<" == d())) {
        b++;
        h && b++;
        l = f;
        for (h = []; ">" != a[b];) {
          n = c();
          h.push(n);
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
  a = ba(a);
  return ca(a);
}
;const da = path.dirname, ea = path.resolve;
const I = ({A:a, C:b, l:d, type:c}) => b ? "string" : a ? "number" : d ? "boolean" : c ? c : "*", J = a => {
  a = a.trimRight();
  var b = /\S/.exec(a);
  if (!b) {
    return a;
  }
  b = b.index;
  if (0 == b) {
    return a;
  }
  var d = a.substr(0, b).lastIndexOf(B);
  -1 == d ? d = 0 : (d++, a = a.substr(d));
  b -= d;
  const c = " ".repeat(b);
  d = a.split(B);
  if (d.filter(e => /\S/.test(e)).find(e => !e.startsWith(c))) {
    return a.trim();
  }
  {
    const e = new RegExp(`^ {${b}}`);
    return d.map(g => g.replace(e, "")).join(B);
  }
}, K = (a, b, d = null) => {
  const {async:c, "void":e, "return":g = e ? "void" : "", ...f} = a;
  ({args:a = ""} = a);
  a || (a = b.map(({s:k, name:h}) => "this" == h ? `${h}: ${k}` : h.startsWith("...") ? `...${k}` : k).join(","));
  b = g.replace(/\r?\n\s*/g, " ");
  c && b ? b = `!Promise<${b}>` : c && (b = "!Promise");
  d = `function(${"constructor" == f.name ? `new: ${d}, ` : ""}${a})`;
  b && (d += `: ${b}`);
  return {F:{...f, async:c, return:b}, o:d};
};
function L(a, b) {
  const d = a.example;
  d && d.startsWith(".") && b && (a.example = ea(da(b), d));
}
;function fa(a, b, {name:d, string:c, "boolean":e, opt:g, number:f, type:k}, h) {
  if (!d) {
    throw Error("Argument does not have a name.");
  }
  a.name = d;
  b && (a.description = J(b));
  b = I({A:f, C:c, l:e, type:k});
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
const M = (a, b) => {
  let d = a.lastIndexOf("</arg>"), c = a;
  var e = [];
  -1 != d && (d += 6, e = a.slice(0, d), c = a.slice(d), e = G("arg", e), e = e.map(({content:g, props:f}) => {
    const k = new ha;
    fa(k, g, f, b);
    return k;
  }));
  return {w:c, j:e};
};
const ia = fs.readFileSync;
const ja = a => {
  const b = a.replace(/^\s*\r?\n/gm, "").split(B).reduce((d, c) => {
    [{length:c = 0} = {}] = /^\s*/.exec(c) || [];
    return c < d ? c : d;
  }, Infinity);
  return a.replace(new RegExp(`^ {${b}}`, "gm"), "");
};
function N(a, b = "") {
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
function O(a, b, d = new RegExp(`([!?])?${b}\\.`, "g")) {
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
    let {function:{new:b, args:d, return:c, this:e, variableArgs:g}} = this.parsed;
    b && (c = b);
    var f = d.map(h => a(h)).map((h, l) => {
      const {optional:n} = d[l];
      let {name:m = `arg${l}`, optional:p = n} = this.D[l] || {};
      return `${`${m}${p ? "?" : ""}`}: ${h}`;
    });
    if (e) {
      var k = a(e);
      f.unshift(`this: ${k}`);
    }
    if (g) {
      k = a(g);
      let h = "...args";
      try {
        h = `${this.args[this.args.length - 1].name}`;
      } catch (l) {
      }
      f.push(`${h}: ${k}[]`);
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
  b(a, {name:b, string:d, "boolean":c, opt:e, number:g, type:f, "default":k, closure:h, alias:l, aliases:n, example:m, "example-override":p = "", noParams:q, "static":r, initial:t}) {
    if (!b) {
      throw Error("Property does not have a name.");
    }
    this.name = b;
    a && (this.description = J(a));
    a = I({A:g, C:d, l:c, type:f});
    q && (this.v = q);
    h && (this.f = h);
    this.type = a;
    void 0 !== k ? this.default = k : void 0 !== t && (this.default = t);
    if (e || void 0 !== k) {
      this.optional = !0;
    }
    l && (this.aliases = [l]);
    n && (this.aliases = n.split(/\s*,\s*/));
    r && (this.g = !0);
    m && (this.examples = N(m, p));
  }
  get type() {
    return this.h || "*";
  }
  set type(a) {
    this.h = a || null;
    this.u = this.f || this.h || "";
    if (!this.v) {
      try {
        this.parsed = H(this.u), this.isParsedFunction && !this.args && (this.args = []);
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
;function ka(a, b, d, c) {
  var e = G("prop", a).map(({content:h, props:l}) => {
    const n = new P;
    L(l, d);
    n.b(h, l);
    return n;
  });
  a = G(["function", "fn", "static"], a).map(({content:h, props:l, tag:n}) => {
    n = "static" == n;
    const {w:m, j:p} = M(h, b);
    h = new Q(p);
    const {F:q, o:r} = K(l, p, c);
    q.type = r;
    L(q, d);
    h.b(m, q);
    n && (h.g = !0);
    return h;
  });
  e = [...e, ...a];
  const {m:g, B:f, n:k} = e.reduce((h, l) => {
    l.isConstructor ? h.m.push(l) : l.static ? h.B.push(l) : h.n.push(l);
    return h;
  }, {m:[], B:[], n:[]});
  return {constructor:g[0] || null, properties:[...g, ...f, ...k]};
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
    }), e += c.join(", "), e += " }") : a.application ? (e += T(a.name, b, g, d) + "&lt;", c = a.application.map(f => R(f, b, d)), e += c.join(", "), e += "&gt;") : a.union ? (e = e + g + "(", g = a.union.map(f => R(f, b, d)), e += g.join(c ? " \\| " : " | "), e += ")") : e += T("any" == a.name ? "*" : a.name, b, g, d);
  }
  return e;
}, T = (a, b, d = "", c = {}) => {
  const {flatten:e = !1, nameProcess:g, link:f = ({link:l}) => `#${l}`} = c;
  c = la(b, a);
  d = `${d}${a}`;
  if (!c) {
    return d;
  }
  let {link:k, type:{description:h}} = c;
  e && ((b = b.find(({fullName:l}) => l == a)) && b.link && (k = b.link), !h && b.description && (h = b.description), "function" == typeof e && e(a));
  c.link == k && (k = f(c));
  b = g ? g(d) : d;
  return h ? `<a href="${k}" title="${h.replace(/"/g, "&quot;")}">${b}</a>` : `[${b}](${k})`;
}, la = (a, b) => {
  a = a.filter(({fullName:c}) => c == b);
  if (a.length) {
    var d = a.find(({import:c}) => c || !1);
    a = a.find(({import:c}) => !c) || d;
    return {link:`${"type"}-${a.fullName.replace(/<\/?code>/g, "").replace(/<\/?strong>/g, "").replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/[^\w-\d ]/g, "").toLowerCase().replace(/[, ]/g, "-")}`, type:a};
  }
};
function ma(a, b = [], d = [], c = {}) {
  const {narrow:e = !1, preprocessDesc:g} = c;
  if (!b.length) {
    return "";
  }
  const f = a.isConstructor || a.isInterface, k = b.some(({hasDefault:m}) => m), h = {escapePipe:!e, ...c};
  let l;
  const n = m => S(d, m, {...h, nameProcess:c.nameProcess ? p => c.nameProcess(p, l) : void 0});
  a = b.map((m, p) => {
    l = 0 < (p + 1) % 2;
    p = m.args && m.isParsedFunction ? m.toTypeScriptFunction(n) : n(m.parsed || m.type);
    const q = f || m.optional ? m.name : `${m.name}*`, r = m.hasDefault ? `\`${m.default}\`` : "-", t = g ? g(m.description) : m.description;
    return {prop:m, typeName:p, name:q, de:na(t, !e), d:r, G:l};
  });
  if (e) {
    return {props:a, anyHaveDefault:k, constr:f};
  }
  a = a.map(({name:m, typeName:p, de:q, d:r, prop:t}) => [t.optional ? m : `__${m}__`, `<em>${p}</em>`, q, ...k ? [r] : []]);
  b = ["Name", ...e ? ["Type & Description"] : ["Type", "Description"], ...k ? [f ? "Initial" : "Default"] : []];
  return `

\`\`\`table
${JSON.stringify([b, ...a], null, 2)}
\`\`\``;
}
const na = (a = "", b = !0) => {
  null === a && (a = "");
  b && (a = a.replace(/\|/g, "\\|"));
  return a.replace(/</g, "&lt;").replace(/>/, "&gt;");
};
const oa = (a, b, d = {}) => {
  function c(e) {
    e.replace(/^!?/, "");
    return `\`${e}\``;
  }
  return a.split(/,\s*/).map(e => S(b, e, {flatten:!0, ...d, nameProcess:d.nameProcess ? g => {
    g = d.nameProcess(g);
    return /[_*~>]/.test(g) ? `<code>${g}</code>` : c(g);
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
  b(a, {name:b, type:d, desc:c, noToc:e, spread:g, noExpand:f, link:k, closure:h, constructor:l, "extends":n, "interface":m, record:p, example:q, "example-override":r}, t, z = null) {
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
    !0 === m && (this.isInterface = m);
    !0 === p && (this.isRecord = p);
    n && (this.extends = n);
    t && (this.namespace = t);
    if (a) {
      const {properties:u, constructor:v} = ka(a, z, this.f, this.fullName);
      v && (this.args = v.args);
      this.properties = u;
    }
    q && (a = {example:q}, L(a, this.f), this.examples = N(a.example, r));
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
    this.link ? f = `[${g}](${this.link})` : !this.import && this.type && (f = S(a, this.type, b), g = f != this.type, f = V(f, g));
    g = V(this.fullName);
    g = this.import ? `[${g}](l-type)` : this.noToc ? `[${g}](l-type)` : `[${g}](t-type)`;
    const k = this.description ? `: ${this.description}` : "";
    f = f ? `${f} ` : "";
    let h = /_/.test(g);
    if (this.extends) {
      const l = oa(this.extends, a, b), n = ` extends ${l}`;
      h = h || /_/.test(l);
      f = (h ? f + "<strong>" : f + "__") + (g + n);
      "function" == typeof d && d(this.extends);
    } else {
      f = (h ? f + "<strong>" : f + "__") + g;
    }
    f = (h ? f + "</strong>" : f + "__") + k;
    a = ma(this, this.properties, a, b);
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
    this.description = J(a);
    super.b("", c, ...e);
    d && (this.g = d.replace(/\r?\n\s*/g, " "));
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
;class pa extends U {
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
;C();
const qa = (a, b) => {
  const d = new RegExp(`([!?])?${a}\\.`, "g");
  b.properties.forEach(c => {
    O(c, a, d);
  });
  b.h(a);
}, X = (a, b) => {
  var {args:d = []} = a, c = d.map(({s:g}) => g).join(", ");
  let e = `new: ${a.fullName}`;
  c.length && (e = `${e}, `);
  c = `function(${e}${c})`;
  d = new Q(d);
  d.isConstructor = !0;
  d.b("Constructor method.", {type:c, name:"constructor"});
  d.examples = a.examples;
  O(d, b);
  a.properties.unshift(d);
}, Y = (a, b, d, c, e = !1, g = null) => {
  const f = e ? new W : new U;
  f.f = g;
  g = a.search(/<(prop|function|fn|static) /);
  let k = "", h = a;
  1 != g && (k = a.slice(0, g), h = a.slice(g));
  const {j:l, w:n} = M(k, c);
  f.b(e ? n : h, b, d, c);
  ({o:a} = K(b, l));
  e && (f.closureType = a);
  f.args || (f.args = l);
  return f;
}, Z = ({content:a, props:b, ns:d, i:c, isMethod:e = !1, location:g = null}) => {
  const f = [], {alias:k, aliases:h, ...l} = b;
  b = Y(a, b, d, c, e, g);
  f.push(b);
  (k ? [k] : h ? h.split(/, */) : []).forEach(n => {
    n = Y(a, {...l, name:n}, d, c, e, g);
    n.description = `${n.description}${n.description ? " " : ""}Alias of \`${l.name}\`.`;
    f.push(n);
  });
  return f;
};
/*

 Typal: keep types information in XML files to embed as typedefs,
        Closure Compiler externs and markdown tables.

 Copyright (C) 2020  Art Deco

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
module.exports = {_Type:U, _Property:P, _Method:W, _parseFile:(a, b, d = null) => {
  a = G("types", a);
  if (!a.length) {
    throw Error("XML file should contain root types element.");
  }
  const [{content:c, props:{namespace:e, ns:g = e}}] = a, f = b == g ? void 0 : g;
  a = G(["embed"], c).map(({props:l}) => l);
  const k = [], h = G("type interface constructor method import record".split(" "), c).reduce((l, {content:n, props:m, tag:p}) => {
    "record" == p && (p = "type", m.record = !0);
    const {alias:q, aliases:r, ...t} = m;
    d && L(t, d);
    var z = q ? [q] : r ? r.split(/, */) : [];
    switch(p) {
      case "type":
        p = new U;
        d && (p.f = d);
        p.b(n, m, f, b);
        l.push(p);
        z.forEach(u => {
          const v = new U;
          d && (v.f = d);
          v.b(n, {...t, name:u}, f, b);
          l.push(v);
        });
        break;
      case "interface":
        m = Z({content:n, props:m, ns:f, i:b, location:d});
        m.forEach(u => {
          u.properties.some(({isConstructor:v}) => v) || X(u, b);
          u.isInterface = !0;
        });
        l.push(...m);
        break;
      case "constructor":
        m = Z({content:n, props:m, ns:f, i:b, location:d});
        m.forEach(u => {
          u.properties.some(({isConstructor:v}) => v) || X(u, b);
          u.isConstructor = !0;
        });
        l.push(...m);
        break;
      case "method":
        m = Z({content:n, props:m, ns:f, i:b, isMethod:!0, location:d});
        l.push(...m);
        break;
      case "import":
        z = new pa, z.b(n, m, m.ns || m.from, b), k.push(z);
    }
    return l;
  }, []);
  b && h.forEach(l => qa(b, l));
  return {namespace:g, types:h, imports:k, embeds:a};
}, _getLinks:S};


//# sourceMappingURL=typal.js.map