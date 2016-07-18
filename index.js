const onepass = require("onepass")({
  bundleId: "com.sudolikeaboss.sudolikeaboss"
});

exports.decorateTerm = (Term, { React }) => {
  return class extends React.Component {

    _onTerminal (term) {
      if (this.props && this.props.onTerminal) this.props.onTerminal(term);

      term.uninstallKeyboard();

      term.keyboard.handlers_ = term.keyboard.handlers_.map(handler => {
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
          }.bind(term.keyboard)
        ];
      });

      term.installKeyboard();
    }

    render () {
      return React.createElement(Term, Object.assign({}, this.props, {
        onTerminal: this._onTerminal
      }));
    }

  };
};
