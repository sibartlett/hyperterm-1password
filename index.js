const onepass = require("onepass")({
  bundleId: "com.sudolikeaboss.sudolikeaboss"
});

exports.decorateTerm = Term => {
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
