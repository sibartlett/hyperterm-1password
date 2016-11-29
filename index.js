const onepass = require("onepass")();

const CRED_KEY = "1Password.credentials";

exports.decorateTerm = (Term, { React, notify }) => {

  let credentials = JSON.parse(window.localStorage.getItem(CRED_KEY));

  if (!credentials) {
    credentials = onepass.auth.generateCredentials();
    window.localStorage.setItem(CRED_KEY, JSON.stringify(credentials));
  }

  onepass.auth.credentials(credentials);

  onepass.on("authCode", code => {
    notify(`1Password auth code: ${code}`);
  });

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
