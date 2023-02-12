/**
 * @name NoReplyMention
 * @description Automatically sets replies to not mention target
 * @author somebody
 * @authorId 153146360705712128
 * @authorLink https://github.com/somebody1234
 * @version 0.0.3
 * @source https://github.com/BetterDiscordPlugins/userscripts/blob/master/NRM.plugin.js
 * @updateUrl https://raw.githubusercontent.com/BetterDiscordPlugins/userscripts/master/NRM.plugin.js
 */
module.exports = class NoReplyMention {
  constructor(meta) {
    this.api = new BdApi(meta.name);
    const { Filters } = this.api.Webpack;
    this.replyBar = this.getModuleAndKey(Filters.byStrings(".shouldMention", ".showMentionToggle"))
    if (!this.replyBar) console.error("NoReplyMention: Could not find reply bar module");
  }

  getModuleAndKey(filter) {
    const { getModule } = this.api.Webpack;
    let module;
    const value = getModule((e, m) => filter(e) ? (module = m) : false, { searchExports: true });
    if (!module) return;
    return [module.exports, Object.keys(module.exports).find(k => module.exports[k] === value)];
  }

  start() {
    const { Patcher } = this.api;
    Patcher.before(...this.replyBar, (_thisArg, [props]) => {
      props.shouldMention = false;
    });
  }
  stop() {
    const { Patcher } = this.api;
    Patcher.unpatchAll();
  }
}
