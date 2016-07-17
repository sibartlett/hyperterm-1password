const onepass = require("onepass")({
  bundleId: "com.sudolikeaboss.sudolikeaboss"
});

const isTerm = Term => {
  const keys = Object.getOwnPropertyNames(Term.prototype);
  return [
    "clear",
    "focus",
    "getTermDocument",
    "write"
  ].every(key => keys.indexOf(key) > -1);
};

exports.decorateTerm = (Term, { notify }) => {
  if (!isTerm(Term)) {
    notify("hyperterm-1password", "Must be 1st plugin listed in ~/.hyperterm.js");
    return Term;
  }

  return class extends Term {

    componentDidMount () {
      super.componentDidMount();

      this.term.uninstallKeyboard();

      this.term.keyboard.handlers_ = this.term.keyboard.handlers_.map(handler => {
        if (handler[0] !== "keydown") {
          return handler;
        }

        return [
          "keydown",
          function(e) {
            if (e.metaKey && e.keyCode === 220) {
              onepass.password("sudolikeaboss://local")
                     .then(pass => this.terminal.io.sendString(pass))
                     .catch(() => {});
            }
            return this.onKeyDown_(e);
          }.bind(this.term.keyboard)
        ];
      });

      this.term.installKeyboard();
    }
  };
};
