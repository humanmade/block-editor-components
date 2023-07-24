/*! For license information please see index.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["@humanmade/block-editor-components"]=t():e["@humanmade/block-editor-components"]=t()}(self,(()=>(()=>{var e={184:(e,t)=>{var n;!function(){"use strict";var o={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var l=typeof n;if("string"===l||"number"===l)e.push(n);else if(Array.isArray(n)){if(n.length){var i=r.apply(null,n);i&&e.push(i)}}else if("object"===l){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var a in n)o.call(n,a)&&n[a]&&e.push(a)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()},703:(e,t,n)=>{"use strict";var o=n(414);function r(){}function l(){}l.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,l,i){if(i!==o){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:l,resetWarningCache:r};return n.PropTypes=n,n}},697:(e,t,n)=>{e.exports=n(703)()},414:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,n),l.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{"use strict";n.r(o),n.d(o,{ConditionalComponent:()=>r,FetchAllTermSelectControl:()=>m,FileControls:()=>b,GenericServerSideEdit:()=>h,ImageControl:()=>B,InnerBlockSlider:()=>L,LinkToolbar:()=>F,PlainTextWithLimit:()=>j,PostTitleControl:()=>$,PostTypeCheck:()=>q,RichTextWithLimit:()=>H,createOptionFromPost:()=>le,createOptionFromTerm:()=>ie,createOptionsFromPosts:()=>ae,createOptionsFromPostsWithHierarchy:()=>ce,createOptionsFromTerms:()=>se,createOptionsFromTermsWithHierarchy:()=>ue,findBlockByName:()=>Z,findInvalidBlock:()=>ee,findInvalidBlocks:()=>te,findValidBlock:()=>ne,findValidBlocks:()=>oe,getImageDataForSize:()=>v,useActiveBlockStyle:()=>V,useBlockStyles:()=>G,useDisallowedBlocks:()=>Q,useMeta:()=>Y,useRenderAppenderWithBlockLimit:()=>J,useSelectBlock:()=>K,useSetAttribute:()=>X,withActiveVariation:()=>de});const e=window.wp.element,t=window.React;function r(t){const{children:n=null,ComponentFalse:o=(()=>null),ComponentTrue:r=(()=>n),predicate:l,...i}=t,a=l(i)?r:o;return(0,e.createElement)(a,{...i})}const l=window.wp.apiFetch;var i=n.n(l);const a=window.wp.components,c=window.wp.data,s=window.wp.i18n,u=window.wp.url,d={label:"",value:""},p={disabled:!0,label:(0,s.__)("No items found!","block-editor-components"),value:""};const m=function(n){const{defaultOption:o=d,fallbackOption:r=p,taxonomy:l,...m}=n,[f,b]=(0,t.useState)(),[k,g]=(0,t.useState)(),h=(0,c.useSelect)((e=>e("core").getTaxonomy(l)?.rest_base),[l]);return(0,t.useEffect)((()=>{h&&(async()=>{try{const e=await i()({path:(0,u.addQueryArgs)(`/wp/v2/${h}`,{_fields:"id,name",context:"view",per_page:-1})});if(!e?.length)return void g(r?[r]:[]);g([...o?[o]:[],...se(e)])}catch(t){var e;b(null!==(e=t.message)&&void 0!==e?e:(0,s.__)("Unknown error.","block-editor-components"))}})()}),[h,o,r]),f?(0,e.createElement)(a.Notice,{isDismissible:!1,status:"error"},(0,e.createElement)("p",null,f)):k?(0,e.createElement)(a.SelectControl,{...m,options:k}):(0,e.createElement)(a.Spinner,null)},f=window.wp.blockEditor;function b(t){const{value:n,onChange:o,...r}=t;return(0,e.createElement)(f.MediaUploadCheck,null,(0,e.createElement)(f.MediaUpload,{title:(0,s.__)("Select or Upload File","block-editor-components"),...r,multiple:!1,render:({open:t})=>(0,e.createElement)(a.ToolbarGroup,null,(0,e.createElement)(a.ToolbarButton,{icon:"admin-links",label:n?(0,s.__)("Edit file","block-editor-components"):(0,s.__)("Select file","block-editor-components"),onClick:t}),n&&(0,e.createElement)(a.ToolbarButton,{icon:"editor-unlink",label:(0,s.__)("Deselect file","block-editor-components"),onClick:()=>o(null)})),value:n,onSelect:o}))}const k=window.wp.serverSideRender;var g=n.n(k);const h=function({attributes:t,context:n,name:o}){return(0,e.createElement)("div",{...(0,f.useBlockProps)()},(0,e.createElement)(a.Disabled,null,(0,e.createElement)(g(),{attributes:t,block:o,EmptyResponsePlaceholder:()=>(0,e.createElement)("div",{className:`wp-block-${o.replace("/","-")}`},o," ",(0,s.__)("Block rendered as empty.")),urlQueryArgs:"object"==typeof n&&Object.hasOwn(n,"postId")?{post_id:n.postId}:{}})))};function v(e,t){var n;const o=null!==(n=e?.sizes)&&void 0!==n?n:e?.media_details?.sizes,r=o?.[t];return r?{src:r.url||r.source_url,width:r.width,height:r.height}:null}const y=["image"],S=(0,s.__)("Select Image","block-editor-components"),E=(0,s.__)("Select Image","block-editor-components"),w=(0,s.__)("Remove image","block-editor-components"),_=(0,s.__)("Replace Image","block-editor-components");function B(t){const{buttonText:n=S,className:o,help:r,id:l,label:i,modalTitle:s=E,removeButtonText:u=w,replaceButtonText:d=_,size:p,value:m,onChange:b}=t,k=(0,c.useSelect)((e=>{const t=e("core").getMedia(m,{context:"view"});return t?t.alt_text:""}),[m]),g=(0,c.useSelect)((e=>{const t=e("core").getMedia(m,{context:"view"});if(t){if(p){const e=v(t,p);if(e)return e.src}return t.source_url}}),[p,m]);return(0,e.createElement)(a.BaseControl,{className:o,help:r,id:l,label:i},(0,e.createElement)(f.MediaUploadCheck,null,(0,e.createElement)(f.MediaUpload,{allowedTypes:y,render:({open:t})=>(0,e.createElement)("div",null,m?g?(0,e.createElement)(a.Button,{isLink:!0,onClick:t},(0,e.createElement)("img",{alt:k,src:g})):(0,e.createElement)(a.Spinner,null):null,(0,e.createElement)(a.Button,{isSecondary:!0,onClick:t},m?d:n)),title:s,onSelect:b})),(0,e.createElement)("br",null),m?(0,e.createElement)(a.Button,{isDestructive:!0,isLink:!0,onClick:()=>b(null)},u):null)}var T=n(697),C=n.n(T);const x=window.wp.blocks;function P({className:n,allowedBlocks:o,template:r,currentItemIndex:l,parentBlockId:i,renderAppender:a,captureToolbars:c}){const s=(0,t.useRef)(),u=(0,f.useInnerBlocksProps)({id:`inner-block-display-single-${i}`,className:n},{__experimentalCaptureToolbars:c,allowedBlocks:o,orientation:"horizontal",renderAppender:a,template:r,templateLock:!1});return(0,t.useEffect)((()=>{s.current&&(s.current.innerHTML=`#inner-block-display-single-${i} > *:not(:nth-child(${l+1}) ) { display: none; }`)}),[l,s,i]),(0,e.createElement)(e.Fragment,null,(0,e.createElement)("style",{ref:s}),(0,e.createElement)("div",{...u}))}P.defaultProps={currentItemIndex:0,renderAppender:!1,captureToolbars:!0},P.propTypes={parentBlockId:C().string.isRequired,allowedBlocks:C().arrayOf(C().string).isRequired,template:C().array,className:C().string,currentItemIndex:C().number,renderAppender:C().oneOfType([C().bool,C().element])};const I=P;var R=n(184),O=n.n(R);function N({totalPages:t,currentPage:n,setCurrentPage:o,prevEnabled:r,nextEnabled:l,addSlide:i=(()=>{}),addSlideEnabled:c=!1}){return(0,e.createElement)("div",{className:"inner-block-slider__navigation"},(0,e.createElement)(a.IconButton,{disabled:!r,icon:"arrow-left-alt2",isSecondary:!0,isSmall:!0,onClick:()=>{r&&o(n-1)}}),[...Array(t).keys()].map((t=>(0,e.createElement)(a.Button,{key:t+1,"aria-label":`Slide ${t+1}`,className:O()("components-button","is-not-small",{"is-primary":n===t+1,"is-secondary":n!==t+1}),type:"button",onClick:()=>{o(t+1)}},t+1))),(0,e.createElement)(a.IconButton,{disabled:!l,icon:"arrow-right-alt2",isSecondary:!0,isSmall:!0,onClick:()=>{l&&o(n+1)}}),(0,e.createElement)(a.IconButton,{disabled:!c,icon:"plus-alt2",isSecondary:!0,isSmall:!0,onClick:()=>i()}))}N.propTypes={totalPages:C().number.isRequired,currentPage:C().number.isRequired,setCurrentPage:C().func.isRequired,prevEnabled:C().bool.isRequired,nextEnabled:C().bool.isRequired,addSlide:C().func,addSlideEnabled:C().bool};const A=N,M=({parentBlockId:n,allowedBlock:o,template:r,slideLimit:l})=>{const i=r||[[o]],a=(0,c.useSelect)((e=>e("core/block-editor").getBlock(n).innerBlocks)),[s,u]=(0,t.useState)(0),d=(0,t.useRef)(a.length),{insertBlock:p}=(0,c.useDispatch)("core/block-editor");return(0,t.useEffect)((()=>{(a.length>d.current||a.length<d.current&&s+1>a.length)&&u(a.length-1),d.current=a.length}),[a.length,s,d]),(0,e.createElement)("div",{className:"inner-block-slider"},(0,e.createElement)(I,{allowedBlocks:[o],className:"slides",currentItemIndex:s,parentBlockId:n,template:i}),(0,e.createElement)(A,{addSlide:()=>{const e=(0,x.createBlock)(o);p(e,void 0,n)},addSlideEnabled:a.length<l,currentPage:s+1,nextEnabled:s+1<a.length,prevEnabled:s+1>1,setCurrentPage:e=>u(e-1),totalPages:a.length}))};M.defaultProps={slideLimit:10,template:null},M.propTypes={parentBlockId:C().string.isRequired,allowedBlock:C().string.isRequired,template:C().array};const L=M;function F(n){const{onChange:o,opensInNewTab:r,url:l}=n,[i,c]=(0,t.useState)(!1),u=(0,t.useMemo)((()=>[{icon:"admin-links",title:(0,s.__)("Link","block-editor-components"),isActive:l?.length>0,onClick:()=>c(!i)}]),[c,i,l]),d=(0,t.useMemo)((()=>({url:l,opensInNewTab:r})),[r,l]);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.ToolbarGroup,{controls:u}),i&&(0,e.createElement)(a.Popover,null,(0,e.createElement)(f.__experimentalLinkControl,{forceIsEditingLink:i,opensInNewTab:r,value:d,onChange:o})))}function j(n){const{className:o,limit:r=0,onChange:l,...i}=n,[a,c]=(0,t.useState)(r&&n.value?.length>r);return(0,e.createElement)(f.PlainText,{className:`${o} limit-text ${a?"invalid":""}`.trim(),onChange:e=>{r&&e.length>r?a||c(!0):(a&&c(!1),l(e))},...i})}const D=/[\r\n]+/g;function $(n){const{editPost:o}=(0,c.useDispatch)("core/editor"),r=(0,c.useSelect)((e=>e("core/editor").getEditedPostAttribute("title")),[]),l=(0,t.useCallback)((e=>o({title:e.replace(D," ")})),[o]);return(0,e.createElement)(f.RichText,{...n,allowedFormats:[],value:r,onChange:l})}function q(e){var t;const{postType:n}=e;return(0,c.useSelect)((e=>e("core/editor").getCurrentPostType()),[])===n?e.children:null!==(t=e.fallback)&&void 0!==t?t:null}const U=window.wp.dom,W=e=>{const t=document.createRange();t.selectNodeContents(e),t.collapse(!1);const n=window.getSelection();n.removeAllRanges(),n.addRange(t)};function H(n){const{className:o,limit:r=0,onChange:l,...i}=n,a=(0,t.useRef)(),[c,s]=(0,t.useState)(r&&n.value?.length>r),[u,d]=(0,t.useState)(!1);return(0,e.createElement)(f.RichText,{ref:a,className:`${o} limit-text ${c?"invalid":""}`.trim(),onChange:e=>{if(r&&(0,U.__unstableStripHTML)(e).length>r)return d(!1),a.current.innerHTML=n.value,W(a.current),void(c||s(!0));u&&c&&s(!1),d(!0),l(e)},...i})}const z=/^is-style-/;function V(e){const{blockName:n,className:o}=(0,c.useSelect)((t=>{var n,o;const r=t("core/block-editor").getBlock(e);return{blockName:null!==(n=r?.name)&&void 0!==n?n:"",className:null!==(o=r?.attributes?.className)&&void 0!==o?o:""}}),[e]),{blockStyles:r,defaultStyle:l}=G(n),i=(0,t.useMemo)((()=>r.map((({name:e})=>e))),[r]),a=(0,t.useMemo)((()=>function(e=""){return e.trim().replace(/\s+/," ").split(" ").map((e=>z.test(e)?e.replace(z,""):"")).filter(Boolean)}(o)),[o]);return(0,t.useMemo)((()=>{var e;return null!==(e=a.find((e=>i.includes(e))))&&void 0!==e?e:l}),[i,a,l])}function G(e){const n=(0,c.useSelect)((t=>t("core/blocks").getBlockStyles(e)),[e]);return(0,t.useMemo)((()=>{var e;return{blockStyles:n,defaultStyle:null!==(e=n.find((({isDefault:e})=>e))?.name)&&void 0!==e?e:""}}),[n])}function Q(e){return(0,t.useMemo)((()=>{const t=(0,x.getBlockTypes)();return t?.length?t.filter((({name:t,parent:n})=>!n&&!e.includes(t))).map((({name:e})=>e)):[]}),[e])}function Y(e,n){var o;const{editPost:r}=(0,c.useDispatch)("core/editor"),l=(0,c.useSelect)((e=>e("core/editor").getEditedPostAttribute("meta"))),i=(0,t.useCallback)((t=>r({meta:{[e]:t}})),[r,e]);return[null!==(o=l?.[e])&&void 0!==o?o:n,i]}function J(e,t,n){return(0,c.useSelect)((o=>{const{innerBlocks:r}=o("core/block-editor").getBlock(e);return r?.length<t&&n}),[])}function K(){const{selectBlock:e}=(0,c.useDispatch)("core/block-editor");return(0,t.useCallback)((t=>{const n=document.getElementById(`block-${t}`);n&&(e(t),setTimeout((()=>n.scrollIntoView({behavior:"smooth"})),200))}),[e])}function X(e,n,o){return(0,t.useCallback)(((t=o)=>n({[e]:t})),[e,o,n])}function Z(e){const{getBlocks:t}=(0,c.select)("core/block-editor");return t().find((({name:t})=>t===e))}function ee(e,t){return e.find((e=>!t(e)))}function te(e,t){return e.filter((e=>!t(e)))}function ne(e,t){return e.find((e=>t(e)))}function oe(e,t){return e.filter((e=>t(e)))}const re=window.wp.htmlEntities;function le(e,t=""){const{id:n,title:o}=e;return{label:t+(0,re.decodeEntities)(o.rendered||(0,s.sprintf)((0,s.__)("#%d (no title)","block-editor-components"),n)),value:n}}function ie(e,t=""){const{id:n,name:o}=e;return{label:t+(0,re.decodeEntities)(o||(0,s.sprintf)((0,s.__)("#%d (no name)","block-editor-components"),n)),value:n}}function ae(e){return e.map((e=>le(e)))}function ce(e,t="\u2014 ",n=0){return e.map((({children:e=[],...o})=>[le(o,t.repeat(n)),...ce(e,t,n+1)])).flat()}function se(e){return e.map((e=>ie(e)))}function ue(e,t="\u2014 ",n=0){return e.map((({children:e=[],...o})=>[ie(o,t.repeat(n)),...ue(e,t,n+1)])).flat()}function de(e,...t){if(e.variations?.length){const n=function(e){return(t,n)=>e.every((e=>t[e]===n[e]))}(t);e.variations=e.variations.map((e=>(e.isActive=n,e)))}return e}})(),o})()));