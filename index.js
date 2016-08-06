const onepass = require("onepass")({
  bundleId: "com.sudolikeaboss.sudolikeaboss"
});

exports.decorateTerm = (Term, { React }) => {
  return class extends React.Component {

    constructor (props, context) {
      super(props, context);
      this._onTerminal = this._onTerminal.bind(this);
    }

    _onTerminal (term) {
      if (this.props && this.props.onTerminal) this.props.onTerminal(term);

      const handler = [
        "keydown",
        function(e) {
          if (e.metaKey && e.keyCode === 220) {
            e.preventDefault();
            onepass.password("sudolikeaboss://local")
                   .then(pass => this.terminal.io.sendString(pass))
                   .catch(() => {});
          }
        }.bind(term.keyboard)
      ];

      term.uninstallKeyboard();
      term.keyboard.handlers_ = [handler].concat(term.keyboard.handlers_);
      term.installKeyboard();
    }

    render () {
      return React.createElement(Term, Object.assign({}, this.props, {
        onTerminal: this._onTerminal
      }));
    }

  };
};
