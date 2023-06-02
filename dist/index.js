/*! For license information please see index.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["@humanmade/block-editor-components"]=t():e["@humanmade/block-editor-components"]=t()}(self,(()=>(()=>{var e={184:(e,t)=>{var n;!function(){"use strict";var o={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var l=typeof n;if("string"===l||"number"===l)e.push(n);else if(Array.isArray(n)){if(n.length){var i=r.apply(null,n);i&&e.push(i)}}else if("object"===l){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var a in n)o.call(n,a)&&n[a]&&e.push(a)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()},703:(e,t,n)=>{"use strict";var o=n(414);function r(){}function l(){}l.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,l,i){if(i!==o){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:l,resetWarningCache:r};return n.PropTypes=n,n}},697:(e,t,n)=>{e.exports=n(703)()},414:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,n),l.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{"use strict";n.r(o),n.d(o,{ConditionalComponent:()=>r,FetchAllTermSelectControl:()=>f,FileControls:()=>b,GenericServerSideEdit:()=>y,ImageControl:()=>C,InnerBlockSlider:()=>L,LinkToolbar:()=>j,PlainTextWithLimit:()=>q,PostPicker:()=>z,PostTitleControl:()=>V,PostTypeCheck:()=>G,RichTextWithLimit:()=>J,TermSelector:()=>D,createOptionFromPost:()=>de,createOptionFromTerm:()=>me,createOptionsFromPosts:()=>pe,createOptionsFromPostsWithHierarchy:()=>fe,createOptionsFromTerms:()=>ge,createOptionsFromTermsWithHierarchy:()=>be,findBlockByName:()=>le,findInvalidBlock:()=>ie,findInvalidBlocks:()=>ae,findValidBlock:()=>ce,findValidBlocks:()=>se,getImageDataForSize:()=>k,useActiveBlockStyle:()=>X,useBlockStyles:()=>Z,useDisallowedBlocks:()=>ee,useMeta:()=>te,useRenderAppenderWithBlockLimit:()=>ne,useSelectBlock:()=>oe,useSetAttribute:()=>re,withActiveVariation:()=>ve});const e=window.wp.element,t=window.React;function r(t){const{children:n=null,ComponentFalse:o=(()=>null),ComponentTrue:r=(()=>n),predicate:l,...i}=t,a=l(i)?r:o;return(0,e.createElement)(a,i)}function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},l.apply(this,arguments)}const i=window.wp.apiFetch;var a=n.n(i);const c=window.wp.components,s=window.wp.data,u=window.wp.i18n,d=window.wp.url,m={label:"",value:""},p={disabled:!0,label:(0,u.__)("No items found!","block-editor-components"),value:""};const f=function(n){const{defaultOption:o=m,fallbackOption:r=p,taxonomy:i,...f}=n,[g,b]=(0,t.useState)(),[v,h]=(0,t.useState)(),y=(0,s.useSelect)((e=>{var t;return null===(t=e("core").getTaxonomy(i))||void 0===t?void 0:t.rest_base}),[i]);return(0,t.useEffect)((()=>{y&&(async()=>{try{const e=await a()({path:(0,d.addQueryArgs)(`/wp/v2/${y}`,{_fields:"id,name",context:"view",per_page:-1})});if(null==e||!e.length)return void h(r?[r]:[]);h([...o?[o]:[],...ge(e)])}catch(t){var e;b(null!==(e=t.message)&&void 0!==e?e:(0,u.__)("Unknown error.","block-editor-components"))}})()}),[y,o,r]),g?(0,e.createElement)(c.Notice,{isDismissible:!1,status:"error"},(0,e.createElement)("p",null,g)):v?(0,e.createElement)(c.SelectControl,l({},f,{options:v})):(0,e.createElement)(c.Spinner,null)},g=window.wp.blockEditor;function b(t){const{value:n,onChange:o,...r}=t;return(0,e.createElement)(g.MediaUploadCheck,null,(0,e.createElement)(g.MediaUpload,l({title:(0,u.__)("Select or Upload File","block-editor-components")},r,{multiple:!1,render:t=>{let{open:r}=t;return(0,e.createElement)(c.ToolbarGroup,null,(0,e.createElement)(c.ToolbarButton,{icon:"admin-links",label:n?(0,u.__)("Edit file","block-editor-components"):(0,u.__)("Select file","block-editor-components"),onClick:r}),n&&(0,e.createElement)(c.ToolbarButton,{icon:"editor-unlink",label:(0,u.__)("Deselect file","block-editor-components"),onClick:()=>o(null)}))},value:n,onSelect:o})))}const v=window.wp.serverSideRender;var h=n.n(v);const y=function(t){let{attributes:n,context:o,name:r}=t;return(0,e.createElement)("div",(0,g.useBlockProps)(),(0,e.createElement)(c.Disabled,null,(0,e.createElement)(h(),{attributes:n,block:r,EmptyResponsePlaceholder:()=>(0,e.createElement)("div",{className:`wp-block-${r.replace("/","-")}`},r," ",(0,u.__)("Block rendered as empty.")),urlQueryArgs:"object"==typeof o&&Object.hasOwn(o,"postId")?{post_id:o.postId}:{}})))};function k(e,t){var n,o;const r=null!==(n=null==e?void 0:e.sizes)&&void 0!==n?n:null==e||null===(o=e.media_details)||void 0===o?void 0:o.sizes,l=null==r?void 0:r[t];return l?{src:l.url||l.source_url,width:l.width,height:l.height}:null}const E=["image"],S=(0,u.__)("Select Image","block-editor-components"),w=(0,u.__)("Select Image","block-editor-components"),_=(0,u.__)("Remove image","block-editor-components"),T=(0,u.__)("Replace Image","block-editor-components");function C(t){const{buttonText:n=S,className:o,help:r,id:l,label:i,modalTitle:a=w,removeButtonText:u=_,replaceButtonText:d=T,size:m,value:p,onChange:f}=t,b=(0,s.useSelect)((e=>{const t=e("core").getMedia(p,{context:"view"});return t?t.alt_text:""}),[p]),v=(0,s.useSelect)((e=>{const t=e("core").getMedia(p,{context:"view"});if(t){if(m){const e=k(t,m);if(e)return e.src}return t.source_url}}),[m,p]);return(0,e.createElement)(c.BaseControl,{className:o,help:r,id:l,label:i},(0,e.createElement)(g.MediaUploadCheck,null,(0,e.createElement)(g.MediaUpload,{allowedTypes:E,render:t=>{let{open:o}=t;return(0,e.createElement)("div",null,p?v?(0,e.createElement)(c.Button,{isLink:!0,onClick:o},(0,e.createElement)("img",{alt:b,src:v})):(0,e.createElement)(c.Spinner,null):null,(0,e.createElement)(c.Button,{isSecondary:!0,onClick:o},p?d:n))},title:a,onSelect:f})),(0,e.createElement)("br",null),p?(0,e.createElement)(c.Button,{isDestructive:!0,isLink:!0,onClick:()=>f(null)},u):null)}var x=n(697),B=n.n(x);const P=window.wp.blocks;function I(n){let{className:o,allowedBlocks:r,template:l,currentItemIndex:i,parentBlockId:a,renderAppender:c,captureToolbars:s}=n;const u=(0,t.useRef)(),d=(0,g.useInnerBlocksProps)({id:`inner-block-display-single-${a}`,className:o},{__experimentalCaptureToolbars:s,allowedBlocks:r,orientation:"horizontal",renderAppender:c,template:l,templateLock:!1});return(0,t.useEffect)((()=>{u.current&&(u.current.innerHTML=`#inner-block-display-single-${a} > *:not(:nth-child(${i+1}) ) { display: none; }`)}),[i,u,a]),(0,e.createElement)(e.Fragment,null,(0,e.createElement)("style",{ref:u}),(0,e.createElement)("div",d))}I.defaultProps={currentItemIndex:0,renderAppender:!1,captureToolbars:!0},I.propTypes={parentBlockId:B().string.isRequired,allowedBlocks:B().arrayOf(B().string).isRequired,template:B().array,className:B().string,currentItemIndex:B().number,renderAppender:B().oneOfType([B().bool,B().element])};const O=I;var R=n(184),N=n.n(R);function F(t){let{totalPages:n,currentPage:o,setCurrentPage:r,prevEnabled:l,nextEnabled:i,addSlide:a=(()=>{}),addSlideEnabled:s=!1}=t;return(0,e.createElement)("div",{className:"inner-block-slider__navigation"},(0,e.createElement)(c.IconButton,{disabled:!l,icon:"arrow-left-alt2",isSecondary:!0,isSmall:!0,onClick:()=>{l&&r(o-1)}}),[...Array(n).keys()].map((t=>(0,e.createElement)(c.Button,{key:t+1,"aria-label":`Slide ${t+1}`,className:N()("components-button","is-not-small",{"is-primary":o===t+1,"is-secondary":o!==t+1}),type:"button",onClick:()=>{r(t+1)}},t+1))),(0,e.createElement)(c.IconButton,{disabled:!i,icon:"arrow-right-alt2",isSecondary:!0,isSmall:!0,onClick:()=>{i&&r(o+1)}}),(0,e.createElement)(c.IconButton,{disabled:!s,icon:"plus-alt2",isSecondary:!0,isSmall:!0,onClick:()=>a()}))}F.propTypes={totalPages:B().number.isRequired,currentPage:B().number.isRequired,setCurrentPage:B().func.isRequired,prevEnabled:B().bool.isRequired,nextEnabled:B().bool.isRequired,addSlide:B().func,addSlideEnabled:B().bool};const M=F,A=n=>{let{parentBlockId:o,allowedBlock:r,template:l,slideLimit:i}=n;const a=l||[[r]],c=(0,s.useSelect)((e=>e("core/block-editor").getBlock(o).innerBlocks)),[u,d]=(0,t.useState)(0),m=(0,t.useRef)(c.length),{insertBlock:p}=(0,s.useDispatch)("core/block-editor");return(0,t.useEffect)((()=>{(c.length>m.current||c.length<m.current&&u+1>c.length)&&d(c.length-1),m.current=c.length}),[c.length,u,m]),(0,e.createElement)("div",{className:"inner-block-slider"},(0,e.createElement)(O,{allowedBlocks:[r],className:"slides",currentItemIndex:u,parentBlockId:o,template:a}),(0,e.createElement)(M,{addSlide:()=>{const e=(0,P.createBlock)(r);p(e,void 0,o)},addSlideEnabled:c.length<i,currentPage:u+1,nextEnabled:u+1<c.length,prevEnabled:u+1>1,setCurrentPage:e=>d(e-1),totalPages:c.length}))};A.defaultProps={slideLimit:10,template:null},A.propTypes={parentBlockId:B().string.isRequired,allowedBlock:B().string.isRequired,template:B().array};const L=A;function j(n){const{onChange:o,opensInNewTab:r,url:l}=n,[i,a]=(0,t.useState)(!1),s=(0,t.useMemo)((()=>[{icon:"admin-links",title:(0,u.__)("Link","block-editor-components"),isActive:(null==l?void 0:l.length)>0,onClick:()=>a(!i)}]),[a,i,l]),d=(0,t.useMemo)((()=>({url:l,opensInNewTab:r})),[r,l]);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(c.ToolbarGroup,{controls:s}),i&&(0,e.createElement)(c.Popover,null,(0,e.createElement)(g.__experimentalLinkControl,{forceIsEditingLink:i,opensInNewTab:r,value:d,onChange:o})))}function q(n){var o;const{className:r,limit:i=0,onChange:a,...c}=n,[s,u]=(0,t.useState)(i&&(null===(o=n.value)||void 0===o?void 0:o.length)>i);return(0,e.createElement)(g.PlainText,l({className:`${r} limit-text ${s?"invalid":""}`.trim(),onChange:e=>{i&&e.length>i?s||u(!0):(s&&u(!1),a(e))}},c))}const D=function(t){const{taxonomy:n,value:o=[],onChange:r}=t,l=(0,s.useSelect)((e=>e("core").getTaxonomy(n)),[n]),{taxonomyTermsById:i,taxonomyTermsByTitle:a}=(0,s.useSelect)((e=>{var t;const o=null!==(t=e("core").getEntityRecords("taxonomy",n,{per_page:100}))&&void 0!==t?t:[],r=function(e){return e?e.reduce(((e,t)=>(e[t.id]=t.name,e)),{}):[]}(o),l=function(e){return e?e.reduce(((e,t)=>(e[t.name]=t.id,e)),{}):[]}(o);return{taxonomyTermsById:r,taxonomyTermsByTitle:l}}),[n]),d=o.map((e=>i[e]));return(0,e.createElement)(c.FormTokenField,{label:(0,u.sprintf)((0,u.__)("Filter by %s","block-editor-components"),l?l.labels.singular_name:""),suggestions:Object.values(i),value:d,onChange:e=>{r(e.map((e=>a[e])))}})};function $(t){const{postType:n,queryArgs:o,onChange:r,values:l=[],isSortable:i=!1}=t,a=(0,s.useSelect)((e=>{var t;return null!==(t=e("core").getEntityRecords("postType",n,o))&&void 0!==t?t:[]}),[n,o]),d=(0,s.useSelect)((e=>e("core/data").isResolving("core","getEntityRecords",["postType",n,o])));return(0,e.createElement)("div",{style:{marginTop:-24,paddingTop:24,paddingLeft:4,marginLeft:-4}},d&&(0,e.createElement)(c.Spinner,null)||a.length<1&&(0,e.createElement)(c.Notice,{isDismissible:!1},(0,u.__)("No results found","block-editor-components"))||a.map((t=>{var n;return(0,e.createElement)("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",marginRight:-2,paddingRight:2}},(0,e.createElement)(c.CheckboxControl,{key:t.id,checked:l.includes(t.id),label:(null===(n=t.title)||void 0===n?void 0:n.rendered)||(0,u.__)("(No title)","block-editor-components"),onChange:e=>{r(e?[...l,t.id]:l.filter((e=>e!==t.id)))}}),i&&(0,e.createElement)(c.ButtonGroup,null,(0,e.createElement)(c.Button,{icon:"arrow-up-alt2",iconSize:12,isSmall:!0,label:(0,u.__)("Move up","block-editor-components"),variant:"secondary",onClick:()=>(e=>{const t=l.indexOf(e);-1!==t&&0!==t&&r([...l.slice(0,t-1),l[t],l[t-1],...l.slice(t+1)])})(t.id)}),(0,e.createElement)(c.Button,{icon:"arrow-down-alt2",iconSize:12,isSmall:!0,label:(0,u.__)("Move down","block-editor-components"),variant:"secondary",onClick:()=>(e=>{const t=l.indexOf(e);-1!==t&&t!==l.length-1&&r([...l.slice(0,t),l[t+1],l[t],...l.slice(t+2)])})(t.id)})))})))}function W(n){const{postType:o,onChange:r,values:l,taxonomies:i}=n,[a,d]=(0,e.useState)(""),m=(0,s.useSelect)((e=>i.map((t=>e("core").getTaxonomy(t)))),[i]),[p,f]=(0,e.useState)([]),g=(0,t.useCallback)(((e,t)=>{const n=m.find((t=>t&&t.slug===e));n&&f({...p,[`${n.rest_base}`]:t})}),[p,m]);(0,t.useEffect)((()=>{m.forEach((e=>{e&&!p[e.rest_base]&&g(e.rest_base,[])}))}),[m,g,p]);const b={search:a||void 0,per_page:30,...p};return(0,e.createElement)(c.Flex,{align:"flex-start",style:{gap:24}},(0,e.createElement)(c.FlexItem,{style:{width:"35%"}},(0,e.createElement)(c.SearchControl,{label:(0,u.__)("Search Posts","block-editor-components"),style:{marginBottom:24},value:a,onChange:e=>d(e)}),i.map((t=>{const n=m.find((e=>e&&e.slug===t));return n?(0,e.createElement)(D,{taxonomy:t,value:p[n.rest_base],onChange:e=>g(t,e)}):null}))),(0,e.createElement)(c.FlexItem,{style:{width:"65%"}},(0,e.createElement)($,{postType:o,queryArgs:b,values:l,onChange:r})))}function U(t){const{title:n,postType:o="post",taxonomies:r=[],values:l=[],onChange:i,setModalOpen:a}=t;return(0,e.createElement)(c.Modal,{style:{width:"800px",maxWidth:"100%"},title:n,onRequestClose:()=>a(!1)},(0,e.createElement)("div",{style:{marginTop:-16}},(0,e.createElement)(c.TabPanel,{tabs:[{name:"browse",title:(0,u.__)("Browse Posts","block-editor-components"),content:()=>(0,e.createElement)(e.Fragment,null,"Foo")},{name:"selection",title:(0,u.__)("Current Selection","block-editor-components")}]},(t=>(0,e.createElement)("div",{style:{marginTop:"calc( var(--wp-admin-border-width-focus) * -1 )",borderStyle:"none",borderTop:"var( --wp-admin-border-width-focus ) solid #ddd",paddingTop:24}},"browse"===t.name&&(0,e.createElement)(W,{postType:o,taxonomies:r,values:l,onChange:i}),"selection"===t.name&&(0,e.createElement)($,{isSortable:!0,postType:o,queryArgs:{include:l,orderby:"include",per_page:l.length},values:l,onChange:i}))))))}const z=function(t){const{title:n=(0,u.__)("Select posts","block-editor-components")}=t,[o,r]=(0,e.useState)(!1);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(c.Button,{variant:"primary",onClick:()=>r(!0)},n),o&&(0,e.createElement)(U,l({},t,{setModalOpen:r,title:n})))},H=/[\r\n]+/g;function V(n){const{editPost:o}=(0,s.useDispatch)("core/editor"),r=(0,s.useSelect)((e=>e("core/editor").getEditedPostAttribute("title")),[]),i=(0,t.useCallback)((e=>o({title:e.replace(H," ")})),[o]);return(0,e.createElement)(g.RichText,l({},n,{allowedFormats:[],value:r,onChange:i}))}function G(e){var t;const{postType:n}=e;return(0,s.useSelect)((e=>e("core/editor").getCurrentPostType()),[])===n?e.children:null!==(t=e.fallback)&&void 0!==t?t:null}const Q=window.wp.dom,Y=e=>{const t=document.createRange();t.selectNodeContents(e),t.collapse(!1);const n=window.getSelection();n.removeAllRanges(),n.addRange(t)};function J(n){var o;const{className:r,limit:i=0,onChange:a,...c}=n,s=(0,t.useRef)(),[u,d]=(0,t.useState)(i&&(null===(o=n.value)||void 0===o?void 0:o.length)>i),[m,p]=(0,t.useState)(!1);return(0,e.createElement)(g.RichText,l({ref:s,className:`${r} limit-text ${u?"invalid":""}`.trim(),onChange:e=>{if(i&&(0,Q.__unstableStripHTML)(e).length>i)return p(!1),s.current.innerHTML=n.value,Y(s.current),void(u||d(!0));m&&u&&d(!1),p(!0),a(e)}},c))}const K=/^is-style-/;function X(e){const{blockName:n,className:o}=(0,s.useSelect)((t=>{var n,o,r;const l=t("core/block-editor").getBlock(e);return{blockName:null!==(n=null==l?void 0:l.name)&&void 0!==n?n:"",className:null!==(o=null==l||null===(r=l.attributes)||void 0===r?void 0:r.className)&&void 0!==o?o:""}}),[e]),{blockStyles:r,defaultStyle:l}=Z(n),i=(0,t.useMemo)((()=>r.map((e=>{let{name:t}=e;return t}))),[r]),a=(0,t.useMemo)((()=>function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").trim().replace(/\s+/," ").split(" ").map((e=>K.test(e)?e.replace(K,""):"")).filter(Boolean)}(o)),[o]);return(0,t.useMemo)((()=>{var e;return null!==(e=a.find((e=>i.includes(e))))&&void 0!==e?e:l}),[i,a,l])}function Z(e){const n=(0,s.useSelect)((t=>t("core/blocks").getBlockStyles(e)),[e]);return(0,t.useMemo)((()=>{var e,t;return{blockStyles:n,defaultStyle:null!==(e=null===(t=n.find((e=>{let{isDefault:t}=e;return t})))||void 0===t?void 0:t.name)&&void 0!==e?e:""}}),[n])}function ee(e){return(0,t.useMemo)((()=>{const t=(0,P.getBlockTypes)();return null!=t&&t.length?t.filter((t=>{let{name:n,parent:o}=t;return!o&&!e.includes(n)})).map((e=>{let{name:t}=e;return t})):[]}),[e])}function te(e,n){var o;const{editPost:r}=(0,s.useDispatch)("core/editor"),l=(0,s.useSelect)((e=>e("core/editor").getEditedPostAttribute("meta"))),i=(0,t.useCallback)((t=>r({meta:{[e]:t}})),[r,e]);return[null!==(o=null==l?void 0:l[e])&&void 0!==o?o:n,i]}function ne(e,t,n){return(0,s.useSelect)((o=>{const{innerBlocks:r}=o("core/block-editor").getBlock(e);return(null==r?void 0:r.length)<t&&n}),[])}function oe(){const{selectBlock:e}=(0,s.useDispatch)("core/block-editor");return(0,t.useCallback)((t=>{const n=document.getElementById(`block-${t}`);n&&(e(t),setTimeout((()=>n.scrollIntoView({behavior:"smooth"})),200))}),[e])}function re(e,n,o){return(0,t.useCallback)((function(){return n({[e]:arguments.length>0&&void 0!==arguments[0]?arguments[0]:o})}),[e,o,n])}function le(e){const{getBlocks:t}=(0,s.select)("core/block-editor");return t().find((t=>{let{name:n}=t;return n===e}))}function ie(e,t){return e.find((e=>!t(e)))}function ae(e,t){return e.filter((e=>!t(e)))}function ce(e,t){return e.find((e=>t(e)))}function se(e,t){return e.filter((e=>t(e)))}const ue=window.wp.htmlEntities;function de(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";const{id:n,title:o}=e;return{label:t+(0,ue.decodeEntities)(o.rendered||(0,u.sprintf)((0,u.__)("#%d (no title)","block-editor-components"),n)),value:n}}function me(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";const{id:n,name:o}=e;return{label:t+(0,ue.decodeEntities)(o||(0,u.sprintf)((0,u.__)("#%d (no name)","block-editor-components"),n)),value:n}}function pe(e){return e.map((e=>de(e)))}function fe(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"\u2014 ",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return e.map((e=>{let{children:o=[],...r}=e;return[de(r,t.repeat(n)),...fe(o,t,n+1)]})).flat()}function ge(e){return e.map((e=>me(e)))}function be(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"\u2014 ",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return e.map((e=>{let{children:o=[],...r}=e;return[me(r,t.repeat(n)),...be(o,t,n+1)]})).flat()}function ve(e){var t;if(null!==(t=e.variations)&&void 0!==t&&t.length){for(var n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];const t=function(e){return(t,n)=>e.every((e=>t[e]===n[e]))}(o);e.variations=e.variations.map((e=>(e.isActive=t,e)))}return e}})(),o})()));