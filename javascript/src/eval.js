const data = require('./data.js');
const forms = require('./forms.js');

function evaluate(env, expr) {
  if (expr instanceof data.Undef || expr instanceof data.Bool ||
      expr instanceof data.Int) {
    return expr;
  }
  if (expr instanceof data.Symbol) {
    return env.lookup(expr.name).value;
  }
  if (expr instanceof data.Pair) {
    const rawArgs = data.valueToArray(expr.cdr);
    if (expr.car instanceof data.Symbol) {
      const form = forms.ALL.get(expr.car.name);
      if (form) {
        return form(env, ...rawArgs);
      }
    }
    const func = evaluate(env, expr.car);
    if (!(func instanceof data.Func)) {
      throw new Error('can not call non-function value');
    }
    const args = rawArgs.map((rawArg) => evaluate(env, rawArg));
    return func.call(args);
  }
  throw new Error('not evaluatable value');
}

Object.assign(module.exports, {
  evaluate,
});
