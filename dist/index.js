(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{ConditionalComponent:()=>l,FetchAllTermSelectControl:()=>v,FileControls:()=>b,ImageControl:()=>_,LinkToolbar:()=>y,PlainTextWithLimit:()=>E,PostTitleControl:()=>T,PostTypeCheck:()=>B,RichTextWithLimit:()=>N,createOptionFromPost:()=>G,createOptionFromTerm:()=>Q,createOptionsFromPosts:()=>q,createOptionsFromPostsWithHierarchy:()=>J,createOptionsFromTerms:()=>K,createOptionsFromTermsWithHierarchy:()=>X,findBlockByName:()=>j,findInvalidBlock:()=>U,findInvalidBlocks:()=>$,findValidBlock:()=>W,findValidBlocks:()=>H,getImageDataForSize:()=>V,useActiveBlockStyle:()=>O,useBlockStyles:()=>x,useDisallowedBlocks:()=>I,useMeta:()=>A,useRenderAppenderWithBlockLimit:()=>L,useSelectBlock:()=>R,useSetAttribute:()=>D,withActiveVariation:()=>Z});const n=window.wp.element,o=window.React;function l(e){const{children:t=null,ComponentFalse:o=(()=>null),ComponentTrue:l=(()=>t),predicate:r,...i}=e,c=r(i)?l:o;return(0,n.createElement)(c,i)}function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r.apply(this,arguments)}const i=window.wp.apiFetch;var c=e.n(i);const a=window.wp.components,u=window.wp.data,s=window.wp.i18n,d=window.wp.url,m={label:"",value:""},p={disabled:!0,label:(0,s.__)("No items found!","block-editor-components"),value:""};const v=function(e){const{defaultOption:t=m,fallbackOption:l=p,taxonomy:i,...v}=e,[f,b]=(0,o.useState)(),[g,h]=(0,o.useState)(),k=(0,u.useSelect)((e=>{var t;return null===(t=e("core").getTaxonomy(i))||void 0===t?void 0:t.rest_base}),[i]);return(0,o.useEffect)((()=>{k&&(async()=>{try{const e=await c()({path:(0,d.addQueryArgs)(`/wp/v2/${k}`,{_fields:"id,name",context:"view",per_page:-1})});if(null==e||!e.length)return void h(l?[l]:[]);h([...t?[t]:[],...K(e)])}catch(t){var e;b(null!==(e=t.message)&&void 0!==e?e:(0,s.__)("Unknown error.","block-editor-components"))}})()}),[k,t,l]),f?(0,n.createElement)(a.Notice,{isDismissible:!1,status:"error"},(0,n.createElement)("p",null,f)):g?(0,n.createElement)(a.SelectControl,r({},v,{options:g})):(0,n.createElement)(a.Spinner,null)},f=window.wp.blockEditor;function b(e){const{value:t,onChange:o,...l}=e;return(0,n.createElement)(f.MediaUploadCheck,null,(0,n.createElement)(f.MediaUpload,r({title:(0,s.__)("Select or Upload File","block-editor-components")},l,{multiple:!1,render:e=>{let{open:l}=e;return(0,n.createElement)(a.ToolbarGroup,null,(0,n.createElement)(a.ToolbarButton,{icon:"admin-links",label:t?(0,s.__)("Edit file","block-editor-components"):(0,s.__)("Select file","block-editor-components"),onClick:l}),t&&(0,n.createElement)(a.ToolbarButton,{icon:"editor-unlink",label:(0,s.__)("Deselect file","block-editor-components"),onClick:()=>o(null)}))},value:t,onSelect:o})))}const g=["image"],h=(0,s.__)("Select Image","block-editor-components"),k=(0,s.__)("Select Image","block-editor-components"),w=(0,s.__)("Remove image","block-editor-components"),S=(0,s.__)("Replace Image","block-editor-components");function _(e){const{buttonText:t=h,className:o,help:l,id:r,label:i,modalTitle:c=k,removeButtonText:s=w,replaceButtonText:d=S,value:m,onChange:p}=e,v=(0,u.useSelect)((e=>{var t;return null===(t=e("core").getMedia(m,{context:"view"}))||void 0===t?void 0:t.source_url}),[m]);return(0,n.createElement)(a.BaseControl,{className:o,help:l,id:r,label:i},(0,n.createElement)(f.MediaUploadCheck,null,(0,n.createElement)(f.MediaUpload,{allowedTypes:g,render:e=>{let{open:o}=e;return(0,n.createElement)("div",null,v&&(0,n.createElement)(a.Button,{isLink:!0,onClick:o},(0,n.createElement)("img",{alt:"",src:v})),(0,n.createElement)(a.Button,{isSecondary:!0,onClick:o},m?d:t))},title:c,onSelect:p})),(0,n.createElement)("br",null),m&&(0,n.createElement)(a.Button,{isDestructive:!0,isLink:!0,onClick:()=>p(null)},s))}function y(e){const{onChange:t,opensInNewTab:l,url:r}=e,[i,c]=(0,o.useState)(!1),u=(0,o.useMemo)((()=>[{icon:"admin-links",title:(0,s.__)("Link","block-editor-components"),isActive:(null==r?void 0:r.length)>0,onClick:()=>c(!i)}]),[c,i,r]),d=(0,o.useMemo)((()=>({url:r,opensInNewTab:l})),[l,r]);return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(a.Toolbar,{controls:u}),i&&(0,n.createElement)(a.Popover,null,(0,n.createElement)(f.__experimentalLinkControl,{forceIsEditingLink:i,opensInNewTab:l,value:d,onChange:t})))}function E(e){var t;const{className:l,limit:i=0,onChange:c,...a}=e,[u,s]=(0,o.useState)(i&&(null===(t=e.value)||void 0===t?void 0:t.length)>i);return(0,n.createElement)(f.PlainText,r({className:`${l} limit-text ${u?"invalid":""}`.trim(),onChange:e=>{i&&e.length>i?u||s(!0):(u&&s(!1),c(e))}},a))}const C=/[\r\n]+/g;function T(e){const{editPost:t}=(0,u.useDispatch)("core/editor"),l=(0,u.useSelect)((e=>e("core/editor").getEditedPostAttribute("title")),[]),i=(0,o.useCallback)((e=>t({title:e.replace(C," ")})),[t]);return(0,n.createElement)(f.RichText,r({},e,{allowedFormats:[],value:l,onChange:i}))}function B(e){var t;const{postType:n}=e;return(0,u.useSelect)((e=>e("core/editor").getCurrentPostType()),[])===n?e.children:null!==(t=e.fallback)&&void 0!==t?t:null}const M=window.wp.dom;function N(e){var t;const{className:l,limit:i=0,onChange:c,...a}=e,u=(0,o.useRef)(),[s,d]=(0,o.useState)(i&&(null===(t=e.value)||void 0===t?void 0:t.length)>i),[m,p]=(0,o.useState)(!1);return(0,n.createElement)(f.RichText,r({ref:u,className:`${l} limit-text ${s?"invalid":""}`.trim(),onChange:t=>{if(i&&(0,M.__unstableStripHTML)(t).length>i)return p(!1),u.current.innerHTML=e.value,(e=>{const t=document.createRange();t.selectNodeContents(e),t.collapse(!1);const n=window.getSelection();n.removeAllRanges(),n.addRange(t)})(u.current),void(s||d(!0));m&&s&&d(!1),p(!0),c(t)}},a))}const P=/^is-style-/;function O(e){const{blockName:t,className:n}=(0,u.useSelect)((t=>{var n,o,l;const r=t("core/editor").getBlock(e);return{blockName:null!==(n=null==r?void 0:r.name)&&void 0!==n?n:"",className:null!==(o=null==r||null===(l=r.attributes)||void 0===l?void 0:l.className)&&void 0!==o?o:""}}),[e]),{blockStyles:l,defaultStyle:r}=x(t),i=(0,o.useMemo)((()=>l.map((e=>{let{name:t}=e;return t}))),[l]),c=(0,o.useMemo)((()=>function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").trim().replace(/\s+/," ").split(" ").map((e=>P.test(e)?e.replace(P,""):"")).filter(Boolean)}(n)),[n]);return(0,o.useMemo)((()=>{var e;return null!==(e=c.find((e=>i.includes(e))))&&void 0!==e?e:r}),[i,c,r])}function x(e){const t=(0,u.useSelect)((t=>t("core/blocks").getBlockStyles(e)),[e]);return(0,o.useMemo)((()=>{var e,n;return{blockStyles:t,defaultStyle:null!==(e=null===(n=t.find((e=>{let{isDefault:t}=e;return t})))||void 0===n?void 0:n.name)&&void 0!==e?e:""}}),[t])}const F=window.wp.blocks;function I(e){return(0,o.useMemo)((()=>{const t=(0,F.getBlockTypes)();return null!=t&&t.length?t.filter((t=>{let{name:n,parent:o}=t;return!o&&!e.includes(n)})).map((e=>{let{name:t}=e;return t})):[]}),[e])}function A(e,t){var n;const{editPost:l}=(0,u.useDispatch)("core/editor"),r=(0,u.useSelect)((e=>e("core/editor").getEditedPostAttribute("meta"))),i=(0,o.useCallback)((t=>l({meta:{[e]:t}})),[l,e]);return[null!==(n=null==r?void 0:r[e])&&void 0!==n?n:t,i]}function L(e,t,n){return(0,u.useSelect)((o=>{const{innerBlocks:l}=o("core/block-editor").getBlock(e);return(null==l?void 0:l.length)<t&&n}),[])}function R(){const{selectBlock:e}=(0,u.useDispatch)("core/block-editor");return(0,o.useCallback)((t=>{const n=document.getElementById(`block-${t}`);n&&(e(t),setTimeout((()=>n.scrollIntoView({behavior:"smooth"})),200))}),[e])}function D(e,t,n){return(0,o.useCallback)((function(){let o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n;return t({[e]:o})}),[e,n,t])}function j(e){const{getBlocks:t}=(0,u.select)("core/block-editor");return t().find((t=>{let{name:n}=t;return n===e}))}function U(e,t){return e.find((e=>!t(e)))}function $(e,t){return e.filter((e=>!t(e)))}function W(e,t){return e.find((e=>t(e)))}function H(e,t){return e.filter((e=>t(e)))}function V(e,t){var n,o;const l=null!==(n=null==e?void 0:e.sizes)&&void 0!==n?n:null==e||null===(o=e.media_details)||void 0===o?void 0:o.sizes,r=null==l?void 0:l[t];return r?{src:r.url||r.source_url,width:r.width,height:r.height}:null}const z=window.wp.htmlEntities;function G(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";const{id:n,title:o}=e;return{label:t+(0,z.decodeEntities)(o.rendered||(0,s.sprintf)((0,s.__)("#%d (no title)","block-editor-components"),n)),value:n}}function Q(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";const{id:n,name:o}=e;return{label:t+(0,z.decodeEntities)(o||(0,s.sprintf)((0,s.__)("#%d (no name)","block-editor-components"),n)),value:n}}function q(e){return e.map((e=>G(e)))}function J(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"\u2014 ",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return e.map((e=>{let{children:o=[],...l}=e;return[G(l,t.repeat(n)),...J(o,t,n+1)]})).flat()}function K(e){return e.map((e=>Q(e)))}function X(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"\u2014 ",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return e.map((e=>{let{children:o=[],...l}=e;return[Q(l,t.repeat(n)),...X(o,t,n+1)]})).flat()}function Y(e){return(t,n)=>e.every((e=>t[e]===n[e]))}function Z(e){var t;if(null!==(t=e.variations)&&void 0!==t&&t.length){for(var n=arguments.length,o=new Array(n>1?n-1:0),l=1;l<n;l++)o[l-1]=arguments[l];const t=Y(o);e.variations=e.variations.map((e=>(e.isActive=t,e)))}return e}})();