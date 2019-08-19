const jute = require("../js/jute.js").jute.js;
const tap = require("tap");
const yaml = require("js-yaml");
const fs = require('fs');

const specFiles = [
  "fn_directive.yml",
  "if_directive.yml",
  "let_directive.yml",
  "map_directive.yml",
  "expressions.yml"
];

specFiles.forEach((f) => {
  const spec = yaml.safeLoad(fs.readFileSync(`../spec/${f}`, {encoding: "utf-8"}));

  tap.test(spec.suite, t => {
    spec.tests.forEach(specTest => {
      t.test(specTest.desc, t => {
        const tpl = jute.compile(specTest.template, {});
        const result = tpl(specTest.scope);
        
        t.strictSame(result, specTest.result, specTest.desc);
        t.done();
      });
    })

    t.done();
  });
});