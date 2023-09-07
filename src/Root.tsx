import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import type { GatsbyBrowser } from 'gatsby';
import { Script } from 'gatsby';

import { EthereumProvider, Layout, SnapsProvider } from './components';
import { messages } from './locales/en/messages';

// eslint-disable-next-line import/no-unassigned-import, import/extensions
import './assets/fonts/fonts.css';

i18n.load('en', messages);
i18n.activate('en');

/**
 * Wrap every page in the specified components. This can be used to wrap pages
 * in things like the Layout component. Providers should be specified in the
 * {@link wrapRootElement} function instead.
 *
 * This is exported here so that it can be used in both gatsby-browser.tsx and
 * gatsby-ssr.tsx.
 *
 * @param props - The props provided by Gatsby.
 * @param props.element - The page element to wrap.
 * @returns The wrapped page element.
 */
export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => {
  return <Layout>{element}</Layout>;
};

/**
 * Wrap every page in the specified components. This can be used to wrap the
 * root in provider components. Layout components should be specified in the
 * {@link wrapPageElement} function instead.
 *
 * This is exported here so that it can be used in both gatsby-browser.tsx and
 * gatsby-ssr.tsx.
 *
 * @param props - The props provided by Gatsby.
 * @param props.element - The root element to wrap.
 * @returns The wrapped root element.
 */
export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return (
    <>
      <I18nProvider i18n={i18n}>
        <SnapsProvider>
          <EthereumProvider>{element}</EthereumProvider>
        </SnapsProvider>
      </I18nProvider>
      <Script id="usabilla">
        {`window.lightningjs||function(n){var e="lightningjs";function t(e,t){var r,i,a,o,d,c;return t&&(t+=(/\\?/.test(t)?"&":"?")+"lv=1"),n[e]||(r=window,i=document,a=e,o=i.location.protocol,d="load",c=0,function(){n[a]=function(){var t=arguments,i=this,o=++c,d=i&&i!=r&&i.id||0;function s(){return s.id=o,n[a].apply(s,arguments)}return(e.s=e.s||[]).push([o,d,t]),s.then=function(n,t,r){var i=e.fh[o]=e.fh[o]||[],a=e.eh[o]=e.eh[o]||[],d=e.ph[o]=e.ph[o]||[];return n&&i.push(n),t&&a.push(t),r&&d.push(r),s},s};var e=n[a]._={};function s(){e.P(d),e.w=1,n[a]("_load")}e.fh={},e.eh={},e.ph={},e.l=t?t.replace(/^\\/\\//,("https:"==o?o:"http:")+"//"):t,e.p={0:+new Date},e.P=function(n){e.p[n]=new Date-e.p[0]},e.w&&s(),r.addEventListener?r.addEventListener(d,s,!1):r.attachEvent("onload",s);var l=function(){function n(){return["<!DOCTYPE ",o,"><",o,"><head></head><",t,"><",r,' src="',e.l,'"></',r,"></",t,"></",o,">"].join("")}var t="body",r="script",o="html",d=i[t];if(!d)return setTimeout(l,100);e.P(1);var c,s=i.createElement("div"),h=s.appendChild(i.createElement("div")),u=i.createElement("iframe");s.style.display="none",d.insertBefore(s,d.firstChild).id="lightningjs-"+a,u.frameBorder="0",u.id="lightningjs-frame-"+a,/MSIE[ ]+6/.test(navigator.userAgent)&&(u.src="javascript:false"),u.allowTransparency="true",h.appendChild(u);try{u.contentWindow.document.open()}catch(n){e.domain=i.domain,c="javascript:var d=document.open();d.domain='"+i.domain+"';",u.src=c+"void(0);"}try{var p=u.contentWindow.document;p.write(n()),p.close()}catch(e){u.src=c+'d.write("'+n().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}e.P(2)};e.l&&l()}()),n[e].lv="1",n[e]}var r=window.lightningjs=t(e);r.require=t,r.modules=n}({});window.usabilla_live = lightningjs.require("usabilla_live", "//w.usabilla.com/512dee2d593d.js");`}
      </Script>
    </>
  );
};
