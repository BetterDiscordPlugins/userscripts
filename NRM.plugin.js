/**
 * @name NoReplyMention
 * @description Automatically sets replies to not mention target
 * @author somebody
 * @authorId 153146360705712128
 * @authorLink https://github.com/somebody1234
 * @version 0.0.2
 * @source https://raw.githubusercontent.com/somebody1234/userscripts/master/NRM.plugin.js
 * @updateUrl https://raw.githubusercontent.com/somebody1234/userscripts/master/NRM.plugin.js
 */
module.exports = class NoReplyMention {
  constructor() {
    const {Webpack, Webpack: {Filters}} = BdApi;

    [this.i18n, this.classes] = Webpack.getBulk(
      {filter: m => m.getLocale && m.Messages?.REPLY_MENTION_ON},
      {filter: Filters.byProps("mentionButton")}
    );
  }
  
  start() {}
  stop() {}
  
  observer({addedNodes}) {
    if (!this.i18n || !this.classes) return;
    
    for (const node of addedNodes) {
      if (node.nodeType === Node.TEXT_NODE) continue;

      const elements = node.getElementsByClassName(this.classes.mentionButton);

      if (!elements.length) continue;
      
      for (const element of elements) {
        if (element.textContent === this.i18n.Messages.REPLY_MENTION_ON) {
          element.click();
        }
      }
    }  
  }
}
