/*! For license information please see index.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["@humanmade/block-editor-components"]=t():e["@humanmade/block-editor-components"]=t()}(self,(()=>(()=>{var e={184:(e,t)=>{var n;!function(){"use strict";var o={}.hasOwnProperty;function l(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=typeof n;if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)){if(n.length){var a=l.apply(null,n);a&&e.push(a)}}else if("object"===r){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var i in n)o.call(n,i)&&n[i]&&e.push(i)}}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):void 0===(n=function(){return l}.apply(t,[]))||(e.exports=n)}()},703:(e,t,n)=>{"use strict";var o=n(414);function l(){}function r(){}r.resetWarningCache=l,e.exports=function(){function e(e,t,n,l,r,a){if(a!==o){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:r,resetWarningCache:l};return n.PropTypes=n,n}},697:(e,t,n)=>{e.exports=n(703)()},414:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},t={};function n(o){var l=t[o];if(void 0!==l)return l.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{"use strict";n.r(o),n.d(o,{ConditionalComponent:()=>l,FetchAllTermSelectControl:()=>p,FileControls:()=>b,GenericServerSideEdit:()=>y,ImageControl:()=>T,InnerBlockSlider:()=>A,LinkToolbar:()=>L,PlainTextWithLimit:()=>j,PostPickerButton:()=>J,PostPickerModal:()=>Q,PostPickerToolbarButton:()=>Y,PostTitleControl:()=>q,PostTypeCheck:()=>$,RichTextWithLimit:()=>z,TermSelector:()=>H,createOptionFromPost:()=>de,createOptionFromTerm:()=>me,createOptionsFromPosts:()=>pe,createOptionsFromPostsWithHierarchy:()=>fe,createOptionsFromTerms:()=>be,createOptionsFromTermsWithHierarchy:()=>ge,findBlockByName:()=>re,findInvalidBlock:()=>ae,findInvalidBlocks:()=>ie,findValidBlock:()=>ce,findValidBlocks:()=>se,getImageDataForSize:()=>h,useActiveBlockStyle:()=>X,useBlockStyles:()=>Z,useDisallowedBlocks:()=>ee,useMeta:()=>te,useRenderAppenderWithBlockLimit:()=>ne,useSelectBlock:()=>oe,useSetAttribute:()=>le,withActiveVariation:()=>ke});const e=window.wp.element,t=window.React;function l(t){const{children:n=null,ComponentFalse:o=(()=>null),ComponentTrue:l=(()=>n),predicate:r,...a}=t,i=r(a)?l:o;return(0,e.createElement)(i,{...a})}const r=window.wp.apiFetch;var a=n.n(r);const i=window.wp.components,c=window.wp.data,s=window.wp.i18n,u=window.wp.url,d={label:"",value:""},m={disabled:!0,label:(0,s.__)("No items found!","block-editor-components"),value:""};const p=function(n){const{defaultOption:o=d,fallbackOption:l=m,taxonomy:r,...p}=n,[f,b]=(0,t.useState)(),[g,k]=(0,t.useState)(),y=(0,c.useSelect)((e=>e("core").getTaxonomy(r)?.rest_base),[r]);return(0,t.useEffect)((()=>{y&&(async()=>{try{const e=await a()({path:(0,u.addQueryArgs)(`/wp/v2/${y}`,{_fields:"id,name",context:"view",per_page:-1})});if(!e?.length)return void k(l?[l]:[]);k([...o?[o]:[],...be(e)])}catch(t){var e;b(null!==(e=t.message)&&void 0!==e?e:(0,s.__)("Unknown error.","block-editor-components"))}})()}),[y,o,l]),f?(0,e.createElement)(i.Notice,{isDismissible:!1,status:"error"},(0,e.createElement)("p",null,f)):g?(0,e.createElement)(i.SelectControl,{...p,options:g}):(0,e.createElement)(i.Spinner,null)},f=window.wp.blockEditor;function b(t){const{value:n,onChange:o,...l}=t;return(0,e.createElement)(f.MediaUploadCheck,null,(0,e.createElement)(f.MediaUpload,{title:(0,s.__)("Select or Upload File","block-editor-components"),...l,multiple:!1,render:({open:t})=>(0,e.createElement)(i.ToolbarGroup,null,(0,e.createElement)(i.ToolbarButton,{icon:"admin-links",label:n?(0,s.__)("Edit file","block-editor-components"):(0,s.__)("Select file","block-editor-components"),onClick:t}),n&&(0,e.createElement)(i.ToolbarButton,{icon:"editor-unlink",label:(0,s.__)("Deselect file","block-editor-components"),onClick:()=>o(null)})),value:n,onSelect:o}))}const g=window.wp.serverSideRender;var k=n.n(g);const y=function({attributes:t,context:n,name:o}){return(0,e.createElement)("div",{...(0,f.useBlockProps)()},(0,e.createElement)(i.Disabled,null,(0,e.createElement)(k(),{attributes:t,block:o,EmptyResponsePlaceholder:()=>(0,e.createElement)("div",{className:`wp-block-${o.replace("/","-")}`},o," ",(0,s.__)("Block rendered as empty.")),urlQueryArgs:"object"==typeof n&&Object.hasOwn(n,"postId")?{post_id:n.postId}:{}})))};function h(e,t){var n;const o=null!==(n=e?.sizes)&&void 0!==n?n:e?.media_details?.sizes,l=o?.[t];return l?{src:l.url||l.source_url,width:l.width,height:l.height}:null}const v=["image"],E=(0,s.__)("Select Image","block-editor-components"),S=(0,s.__)("Select Image","block-editor-components"),_=(0,s.__)("Remove image","block-editor-components"),w=(0,s.__)("Replace Image","block-editor-components");function T(t){const{buttonText:n=E,className:o,help:l,id:r,label:a,modalTitle:s=S,removeButtonText:u=_,replaceButtonText:d=w,size:m,value:p,onChange:b}=t,g=(0,c.useSelect)((e=>{const t=e("core").getMedia(p,{context:"view"});return t?t.alt_text:""}),[p]),k=(0,c.useSelect)((e=>{const t=e("core").getMedia(p,{context:"view"});if(t){if(m){const e=h(t,m);if(e)return e.src}return t.source_url}}),[m,p]);return(0,e.createElement)(i.BaseControl,{className:o,help:l,id:r,label:a},(0,e.createElement)(f.MediaUploadCheck,null,(0,e.createElement)(f.MediaUpload,{allowedTypes:v,render:({open:t})=>(0,e.createElement)("div",null,p?k?(0,e.createElement)(i.Button,{isLink:!0,onClick:t},(0,e.createElement)("img",{alt:g,src:k})):(0,e.createElement)(i.Spinner,null):null,(0,e.createElement)(i.Button,{isSecondary:!0,onClick:t},p?d:n)),title:s,onSelect:b})),(0,e.createElement)("br",null),p?(0,e.createElement)(i.Button,{isDestructive:!0,isLink:!0,onClick:()=>b(null)},u):null)}var B=n(697),C=n.n(B);const x=window.wp.blocks;function I({className:n,allowedBlocks:o,template:l,currentItemIndex:r,parentBlockId:a,renderAppender:i,captureToolbars:c}){const s=(0,t.useRef)(),u=(0,f.useInnerBlocksProps)({id:`inner-block-display-single-${a}`,className:n},{__experimentalCaptureToolbars:c,allowedBlocks:o,orientation:"horizontal",renderAppender:i,template:l,templateLock:!1});return(0,t.useEffect)((()=>{s.current&&(s.current.innerHTML=`#inner-block-display-single-${a} > *:not(:nth-child(${r+1}) ) { display: none; }`)}),[r,s,a]),(0,e.createElement)(e.Fragment,null,(0,e.createElement)("style",{ref:s}),(0,e.createElement)("div",{...u}))}I.defaultProps={currentItemIndex:0,renderAppender:!1,captureToolbars:!0},I.propTypes={parentBlockId:C().string.isRequired,allowedBlocks:C().arrayOf(C().string).isRequired,template:C().array,className:C().string,currentItemIndex:C().number,renderAppender:C().oneOfType([C().bool,C().element])};const P=I;var R=n(184),O=n.n(R);function N({totalPages:t,currentPage:n,setCurrentPage:o,prevEnabled:l,nextEnabled:r,addSlide:a=(()=>{}),addSlideEnabled:c=!1}){return(0,e.createElement)("div",{className:"inner-block-slider__navigation"},(0,e.createElement)(i.IconButton,{disabled:!l,icon:"arrow-left-alt2",isSecondary:!0,isSmall:!0,onClick:()=>{l&&o(n-1)}}),[...Array(t).keys()].map((t=>(0,e.createElement)(i.Button,{key:t+1,"aria-label":`Slide ${t+1}`,className:O()("components-button","is-not-small",{"is-primary":n===t+1,"is-secondary":n!==t+1}),type:"button",onClick:()=>{o(t+1)}},t+1))),(0,e.createElement)(i.IconButton,{disabled:!r,icon:"arrow-right-alt2",isSecondary:!0,isSmall:!0,onClick:()=>{r&&o(n+1)}}),(0,e.createElement)(i.IconButton,{disabled:!c,icon:"plus-alt2",isSecondary:!0,isSmall:!0,onClick:()=>a()}))}N.propTypes={totalPages:C().number.isRequired,currentPage:C().number.isRequired,setCurrentPage:C().func.isRequired,prevEnabled:C().bool.isRequired,nextEnabled:C().bool.isRequired,addSlide:C().func,addSlideEnabled:C().bool};const M=N,F=({parentBlockId:n,allowedBlock:o,template:l,slideLimit:r})=>{const a=l||[[o]],{slideBlocks:i,selectedBlockId:s,hasSelectedInnerBlock:u}=(0,c.useSelect)((e=>{const t=e("core/block-editor");return{slideBlocks:t.getBlock(n).innerBlocks,selectedBlockId:t.getSelectedBlockClientId(),hasSelectedInnerBlock:t.hasSelectedInnerBlock}})),{selectBlock:d}=(0,c.useDispatch)("core/block-editor"),[m,p]=(0,t.useState)(0),f=(0,t.useCallback)((e=>{p(e),d(i[e].clientId)}),[p,d,i]),b=(0,t.useRef)(i.length),{insertBlock:g}=(0,c.useDispatch)("core/block-editor");return(0,t.useEffect)((()=>{(i.length>b.current||i.length<b.current&&m+1>i.length)&&f(i.length-1),b.current=i.length}),[i.length,m,b,d,f]),(0,t.useEffect)((()=>{const e=i.findIndex((e=>e.clientId===s||u(e.clientId)));e>=0&&f(e)}),[s,i,f,u]),(0,e.createElement)("div",{className:"inner-block-slider"},(0,e.createElement)(P,{allowedBlocks:[o],className:"slides",currentItemIndex:m,parentBlockId:n,template:a}),(0,e.createElement)(M,{addSlide:()=>{const e=(0,x.createBlock)(o);g(e,void 0,n)},addSlideEnabled:i.length<r,currentPage:m+1,nextEnabled:m+1<i.length,prevEnabled:m+1>1,setCurrentPage:e=>f(e-1),totalPages:i.length}))};F.defaultProps={slideLimit:10,template:null},F.propTypes={parentBlockId:C().string.isRequired,allowedBlock:C().string.isRequired,template:C().array};const A=F;function L(n){const{onChange:o,opensInNewTab:l,url:r}=n,[a,c]=(0,t.useState)(!1),u=(0,t.useMemo)((()=>[{icon:"admin-links",title:(0,s.__)("Link","block-editor-components"),isActive:r?.length>0,onClick:()=>c(!a)}]),[c,a,r]),d=(0,t.useMemo)((()=>({url:r,opensInNewTab:l})),[l,r]);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(i.ToolbarGroup,{controls:u}),a&&(0,e.createElement)(i.Popover,null,(0,e.createElement)(f.__experimentalLinkControl,{forceIsEditingLink:a,opensInNewTab:l,value:d,onChange:o})))}function j(n){const{className:o,limit:l=0,onChange:r,...a}=n,[i,c]=(0,t.useState)(l&&n.value?.length>l);return(0,e.createElement)(f.PlainText,{className:`${o} limit-text ${i?"invalid":""}`.trim(),onChange:e=>{l&&e.length>l?i||c(!0):(i&&c(!1),r(e))},...a})}const D=/[\r\n]+/g;function q(n){const{editPost:o}=(0,c.useDispatch)("core/editor"),l=(0,c.useSelect)((e=>e("core/editor").getEditedPostAttribute("title")),[]),r=(0,t.useCallback)((e=>o({title:e.replace(D," ")})),[o]);return(0,e.createElement)(f.RichText,{...n,allowedFormats:[],value:l,onChange:r})}function $(e){var t;const{postType:n}=e;return(0,c.useSelect)((e=>e("core/editor").getCurrentPostType()),[])===n?e.children:null!==(t=e.fallback)&&void 0!==t?t:null}const W=window.wp.dom,U=e=>{const t=document.createRange();t.selectNodeContents(e),t.collapse(!1);const n=window.getSelection();n.removeAllRanges(),n.addRange(t)};function z(n){const{className:o,limit:l=0,onChange:r,...a}=n,i=(0,t.useRef)(),[c,s]=(0,t.useState)(l&&n.value?.length>l),[u,d]=(0,t.useState)(!1);return(0,e.createElement)(f.RichText,{ref:i,className:`${o} limit-text ${c?"invalid":""}`.trim(),onChange:e=>{if(l&&(0,W.__unstableStripHTML)(e).length>l)return d(!1),i.current.innerHTML=n.value,U(i.current),void(c||s(!0));u&&c&&s(!1),d(!0),r(e)},...a})}const H=function(t){const{taxonomy:n,value:o=[],onChange:l}=t,r=(0,c.useSelect)((e=>e("core").getTaxonomy(n)),[n]),{taxonomyTermsById:a,taxonomyTermsByTitle:u}=(0,c.useSelect)((e=>{var t;const o=null!==(t=e("core").getEntityRecords("taxonomy",n,{per_page:100}))&&void 0!==t?t:[],l=function(e){return e?e.reduce(((e,t)=>(e[t.id]=t.name,e)),{}):[]}(o),r=function(e){return e?e.reduce(((e,t)=>(e[t.name]=t.id,e)),{}):[]}(o);return{taxonomyTermsById:l,taxonomyTermsByTitle:r}}),[n]),d=o.map((e=>a[e])).filter(Boolean);return(0,e.createElement)(i.FormTokenField,{label:(0,s.sprintf)((0,s.__)("Filter by %s","block-editor-components"),r?r.labels.singular_name:""),suggestions:Object.values(a),value:d,onChange:e=>{l(e.map((e=>u[e])))}})};function V(t){const{postType:n,queryArgs:o,onChange:l,values:r=[],isSortable:a=!1}=t,u=(0,c.useSelect)((e=>{var t;return null!==(t=e("core").getEntityRecords("postType",n,o))&&void 0!==t?t:[]}),[n,o]),d=(0,c.useSelect)((e=>e("core/data").isResolving("core","getEntityRecords",["postType",n,o])));return(0,e.createElement)("div",{style:{marginTop:-24,paddingTop:24,paddingLeft:4,marginLeft:-4}},d&&(0,e.createElement)(i.Spinner,null)||u.length<1&&(0,e.createElement)(i.Notice,{isDismissible:!1},(0,s.__)("No results found","block-editor-components"))||u.map((t=>(0,e.createElement)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",marginRight:-2,paddingRight:2}},(0,e.createElement)(i.CheckboxControl,{key:t.id,checked:r.includes(t.id),label:t.title?.rendered||(0,s.__)("(No title)","block-editor-components"),onChange:e=>{l(e?[...r,t.id]:r.filter((e=>e!==t.id)))}}),a&&(0,e.createElement)(i.ButtonGroup,null,(0,e.createElement)(i.Button,{icon:"arrow-up-alt2",iconSize:12,isSmall:!0,label:(0,s.__)("Move up","block-editor-components"),variant:"secondary",onClick:()=>(e=>{const t=r.indexOf(e);-1!==t&&0!==t&&l([...r.slice(0,t-1),r[t],r[t-1],...r.slice(t+1)])})(t.id)}),(0,e.createElement)(i.Button,{icon:"arrow-down-alt2",iconSize:12,isSmall:!0,label:(0,s.__)("Move down","block-editor-components"),variant:"secondary",onClick:()=>(e=>{const t=r.indexOf(e);-1!==t&&t!==r.length-1&&l([...r.slice(0,t),r[t+1],r[t],...r.slice(t+2)])})(t.id)}))))))}function G(n){const{postType:o,onChange:l,values:r,taxonomies:a}=n,[u,d]=(0,e.useState)(""),m=(0,c.useSelect)((e=>a.map((t=>e("core").getTaxonomy(t)))),[a]),[p,f]=(0,e.useState)([]),b=(0,t.useCallback)(((e,t)=>{const n=m.find((t=>t&&t.slug===e));n&&f({...p,[`${n.rest_base}`]:t})}),[p,m]);(0,t.useEffect)((()=>{m.forEach((e=>{e&&!p[e.rest_base]&&b(e.rest_base,[])}))}),[m,b,p]);const g={search:u||void 0,per_page:30,...p};return(0,e.createElement)(i.Flex,{align:"flex-start",style:{gap:24}},(0,e.createElement)(i.FlexItem,{style:{width:"35%"}},(0,e.createElement)(i.SearchControl,{label:(0,s.__)("Search Posts","block-editor-components"),style:{marginBottom:24},value:u,onChange:e=>d(e)}),a.map((t=>{const n=m.find((e=>e&&e.slug===t));return n?(0,e.createElement)(H,{taxonomy:t,value:p[n.rest_base],onChange:e=>b(t,e)}):null}))),(0,e.createElement)(i.FlexItem,{style:{width:"65%"}},(0,e.createElement)(V,{postType:o,queryArgs:g,values:r,onChange:l})))}function Q(t){const{title:n,postType:o="post",taxonomies:l=[],values:r=[],onChange:a,setModalOpen:c}=t;return(0,e.createElement)(i.Modal,{style:{width:"800px",maxWidth:"100%"},title:n,onRequestClose:()=>c(!1)},(0,e.createElement)("div",{style:{marginTop:-16}},(0,e.createElement)(i.TabPanel,{tabs:[{name:"browse",title:(0,s.__)("Browse Posts","block-editor-components"),content:()=>(0,e.createElement)(e.Fragment,null,"Foo")},{name:"selection",title:(0,s.__)("Current Selection","block-editor-components")}]},(t=>(0,e.createElement)("div",{style:{marginTop:"calc( var(--wp-admin-border-width-focus) * -1 )",borderStyle:"none",borderTop:"var( --wp-admin-border-width-focus ) solid #ddd",paddingTop:24}},"browse"===t.name&&(0,e.createElement)(G,{postType:o,taxonomies:l,values:r,onChange:a}),"selection"===t.name&&(0,e.createElement)(V,{isSortable:!0,postType:o,queryArgs:{include:r,orderby:"include",per_page:r.length},values:r,onChange:a}))))))}function Y(t){const{title:n=(0,s.__)("Select posts","block-editor-components"),icon:o="edit"}=t,[l,r]=(0,e.useState)(!1);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(i.ToolbarButton,{icon:o,label:n,onClick:()=>r(!0)},n),l&&(0,e.createElement)(Q,{...t,setModalOpen:r,title:n}))}function J(t){const{title:n=(0,s.__)("Select posts","block-editor-components")}=t,[o,l]=(0,e.useState)(!1);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(i.Button,{variant:"primary",onClick:()=>l(!0)},n),o&&(0,e.createElement)(Q,{...t,setModalOpen:l,title:n}))}const K=/^is-style-/;function X(e){const{blockName:n,className:o}=(0,c.useSelect)((t=>{var n,o;const l=t("core/block-editor").getBlock(e);return{blockName:null!==(n=l?.name)&&void 0!==n?n:"",className:null!==(o=l?.attributes?.className)&&void 0!==o?o:""}}),[e]),{blockStyles:l,defaultStyle:r}=Z(n),a=(0,t.useMemo)((()=>l.map((({name:e})=>e))),[l]),i=(0,t.useMemo)((()=>function(e=""){return e.trim().replace(/\s+/," ").split(" ").map((e=>K.test(e)?e.replace(K,""):"")).filter(Boolean)}(o)),[o]);return(0,t.useMemo)((()=>{var e;return null!==(e=i.find((e=>a.includes(e))))&&void 0!==e?e:r}),[a,i,r])}function Z(e){const n=(0,c.useSelect)((t=>t("core/blocks").getBlockStyles(e)),[e]);return(0,t.useMemo)((()=>{var e;return{blockStyles:n,defaultStyle:null!==(e=n.find((({isDefault:e})=>e))?.name)&&void 0!==e?e:""}}),[n])}function ee(e){return(0,t.useMemo)((()=>{const t=(0,x.getBlockTypes)();return t?.length?t.filter((({name:t,parent:n})=>!n&&!e.includes(t))).map((({name:e})=>e)):[]}),[e])}function te(e,n){var o;const{editPost:l}=(0,c.useDispatch)("core/editor"),r=(0,c.useSelect)((e=>e("core/editor").getEditedPostAttribute("meta"))),a=(0,t.useCallback)((t=>l({meta:{[e]:t}})),[l,e]);return[null!==(o=r?.[e])&&void 0!==o?o:n,a]}function ne(e,t,n){return(0,c.useSelect)((o=>{const{innerBlocks:l}=o("core/block-editor").getBlock(e);return l?.length<t&&n}),[])}function oe(){const{selectBlock:e}=(0,c.useDispatch)("core/block-editor");return(0,t.useCallback)((t=>{const n=document.getElementById(`block-${t}`);n&&(e(t),setTimeout((()=>n.scrollIntoView({behavior:"smooth"})),200))}),[e])}function le(e,n,o){return(0,t.useCallback)(((t=o)=>n({[e]:t})),[e,o,n])}function re(e){const{getBlocks:t}=(0,c.select)("core/block-editor");return t().find((({name:t})=>t===e))}function ae(e,t){return e.find((e=>!t(e)))}function ie(e,t){return e.filter((e=>!t(e)))}function ce(e,t){return e.find((e=>t(e)))}function se(e,t){return e.filter((e=>t(e)))}const ue=window.wp.htmlEntities;function de(e,t=""){const{id:n,title:o}=e;return{label:t+(0,ue.decodeEntities)(o.rendered||(0,s.sprintf)((0,s.__)("#%d (no title)","block-editor-components"),n)),value:n}}function me(e,t=""){const{id:n,name:o}=e;return{label:t+(0,ue.decodeEntities)(o||(0,s.sprintf)((0,s.__)("#%d (no name)","block-editor-components"),n)),value:n}}function pe(e){return e.map((e=>de(e)))}function fe(e,t="\u2014 ",n=0){return e.map((({children:e=[],...o})=>[de(o,t.repeat(n)),...fe(e,t,n+1)])).flat()}function be(e){return e.map((e=>me(e)))}function ge(e,t="\u2014 ",n=0){return e.map((({children:e=[],...o})=>[me(o,t.repeat(n)),...ge(e,t,n+1)])).flat()}function ke(e,...t){if(e.variations?.length){const n=function(e){return(t,n)=>e.every((e=>t[e]===n[e]))}(t);e.variations=e.variations.map((e=>(e.isActive=n,e)))}return e}})(),o})()));