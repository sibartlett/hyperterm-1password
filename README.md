# 1Password for HyperTerm

Extension for [HyperTerm](https://hyperterm.org/) that adds [1Password](https://1password.com) integration.

![1Password and HyperTerm in action](http://i.imgur.com/ERv1A4M.gif)

### How to use

1. Install HyperTerm
2. Add `hyperterm-1password` to plugins in `~/.hyper.js`.
3. Use `Cmd + \` to open the 1Password modal.

### Configuring 1Password to work with HyperTerm

If you're using 1Password 5+, or you run into this screen:

![Cannot Fill Item in Web Browser](https://raw.githubusercontent.com/ravenac95/readme-images/master/sudolikeaboss/cannot-fill-item-error-popup.png)

This causes a problem for `HyperTerm` as it isn't a "trusted browser" per se.
In order to fix this issue, you need to do the following:

1. Open up 1Password's preferences
2. Find the `Advanced` settings tab.
3. Uncheck `Verify browser code signature`.

![Uncheck "Verify browser code signature"](https://cloud.githubusercontent.com/assets/889219/6270365/a69a0726-b816-11e4-9b96-558ddeb00378.png)

### Configuring passwords in 1Password

So that 1Password automatically displays logins relevant to HyperTerm, add a website field to each login with a value of:

`sudolikeaboss://local`

This also ensures compatibility with the [iTerm2](https://www.iterm2.com/) plugin, [sudolikeaboss](https://github.com/ravenac95/sudolikeaboss).

![Adding website field to 1Password login item](https://raw.githubusercontent.com/ravenac95/readme-images/master/sudolikeaboss/add-password.gif)

### Acknowledgements

A big thank you to [Reuven V. Gonzales](https://github.com/ravenac95) for his work on [sudolikeaboss](https://github.com/ravenac95/sudolikeaboss) and the 1Password screenshots above. `HyperTerm` is largely based on `sudolikeaboss`.

Also a big thank you to [AgileBits](https://agilebits.com/) for bringing us [1Password](https://1password.com/).
