"use strict";(self.webpackChunkstl_emporium=self.webpackChunkstl_emporium||[]).push([[1069],{41069:(V,M,t)=>{t.r(M),t.d(M,{default:()=>K});var l=t(67294),P=t(45697),a=t.n(P),D=t(96724),f=t(78048),C=t(96987),v=t(17734),h=t(90820),A=t(61456),y=t(35771),R=t(51435),T=t(86896),B=t(1565);const I=n=>{const{selectProps:u}=n,r=m=>o=>{o.preventDefault(),u.onChange(u.value.filter(_=>_!==m))};return l.createElement(D.V,{type:"button",tabIndex:-1,icon:l.createElement(y.Z,null),onClick:r(n.data)},n.data.label)},L=(0,B.default)(R.JV)`
  .select-control {
    height: auto;

    & > div:first-child {
      padding: 4px;
      gap: 4px;

      & > div {
        padding-left: 8px;
      }
    }

    .select-multi-value-container {
      margin-right: -8px;
    }
  }
`,c=({value:n,onChange:u,name:r,intlLabel:m,required:o,attribute:_,description:p,placeholder:U,disabled:W,error:g})=>{const{formatMessage:E}=(0,T.Z)(),i=(0,l.useMemo)(()=>(_.options||[]).map(e=>{const[s,d]=[...e.split(":"),e];return!s||!d?null:{label:s,value:d}}).filter(Boolean),[_]),b=(0,l.useMemo)(()=>{let e;try{e=JSON.parse(n||"[]")}catch{e=[]}return Array.isArray(e)?i.filter(s=>e.some(d=>s.value===d)):[]},[n,i]),O=(0,l.useMemo)(()=>g||(o&&!i.length?"No options":null),[o,g,i]);return l.createElement(f.g,{hint:p&&E(p),error:O,name:r,required:o},l.createElement(C.k,{direction:"column",alignItems:"stretch",gap:1},l.createElement(v.Q,null,E(m)),l.createElement(L,{isSearchable:!0,isMulti:!0,error:O,name:r,id:r,disabled:W||i.length===0,placeholder:U,defaultValue:b.map(e=>({label:E({id:e.label,defaultMessage:e.label}),value:e.value})),components:{MultiValueContainer:I},options:i.map(e=>({...e,label:E({id:e.label,defaultMessage:e.label})})),onChange:e=>{u({target:{name:r,value:e?.length&&e.filter(s=>!!s)?JSON.stringify(e.filter(s=>!!s).map(s=>s.value)):null,type:_.type}})},classNames:{control:e=>"select-control",multiValue:e=>"select-multi-value",placeholder:e=>"select-placeholder"}}),l.createElement(h.J,null),l.createElement(A.c,null)))};c.defaultProps={description:null,disabled:!1,error:null,labelAction:null,required:!1,value:""},c.propTypes={intlLabel:a().object.isRequired,onChange:a().func.isRequired,attribute:a().object.isRequired,name:a().string.isRequired,description:a().object,disabled:a().bool,error:a().string,labelAction:a().object,required:a().bool,value:a().string};const K=c}}]);
