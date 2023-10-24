(self.webpackChunkstl_emporium=self.webpackChunkstl_emporium||[]).push([[2544],{98374:(U,L,o)=>{"use strict";o.d(L,{F:()=>O});var e=o(67294),h=o(51435),R=o(86896),v=o(88767);const O=(P={},A={})=>{const{id:E="",...S}=P,{get:V}=(0,h.kY)(),{locale:a}=(0,R.Z)(),F=(0,h.Xe)(a,{sensitivity:"base"}),{data:m,error:M,isError:N,isLoading:g,refetch:b}=(0,v.useQuery)(["roles",E,S],async()=>{const{data:Q}=await V(`/admin/roles/${E??""}`,{params:S});return Q},A);return{roles:e.useMemo(()=>{let Q=[];return m&&(Array.isArray(m.data)?Q=m.data:Q=[m.data]),[...Q].sort((oe,ee)=>F.compare(oe.name,ee.name))},[m,F]),error:M,isError:N,isLoading:g,refetch:b}}},24233:(U,L,o)=>{"use strict";o.d(L,{V:()=>R});var e=o(51435),h=o(88767);const R=(v={id:null},O={})=>{const{id:P,...A}=v,{get:E}=(0,e.kY)(),{data:S,error:V,isError:a,isLoading:F,refetch:m}=(0,h.useQuery)(["roles",P,"permissions",A],async()=>{const{data:{data:M}}=await E(`/admin/roles/${P}/permissions`,{params:A});return M},O);return{permissions:S,error:V,isError:a,isLoading:F,refetch:m}}},25545:(U,L,o)=>{"use strict";o.r(L),o.d(L,{CreatePage:()=>me,default:()=>Te});var e=o(67294),h=o(40720),R=o(90731),v=o(96987),O=o(12473),P=o(34726),A=o(16607),E=o(10574),S=o(31988),V=o(6498),a=o(38670),F=o(457),m=o(51435),M=o(97695),N=o(66115),g=o(41054),b=o(41609),z=o.n(b),Q=o(86896),oe=o(86706),ee=o(16550),C=o(1565),de=o(36364),J=o(30909),te=o(90065),Y=o(24233),ue=o(87561);const Le=ue.Ry().shape({name:ue.Z_().required(m.I0.required),description:ue.Z_().required(m.I0.required)}),ce=C.default.div`
  border: 1px solid ${({theme:X})=>X.colors.primary200};
  background: ${({theme:X})=>X.colors.primary100};
  padding: ${({theme:X})=>`${X.spaces[2]} ${X.spaces[4]}`};
  color: ${({theme:X})=>X.colors.primary600};
  border-radius: ${({theme:X})=>X.borderRadius};
  font-size: ${12/16}rem;
  font-weight: bold;
`,me=()=>{const X=(0,ee.$B)("/settings/roles/duplicate/:id"),xe=(0,m.lm)(),{lockApp:W,unlockApp:w}=(0,m.o1)(),{formatMessage:j}=(0,Q.Z)(),[_,re]=(0,e.useState)(!1),{replace:ye}=(0,ee.k6)(),G=(0,e.useRef)(),{trackUsage:Re}=(0,m.rS)(),{post:he,put:Be}=(0,m.kY)(),{params:Ce}=X??{},{isLoading:Fe,data:Ne}=(0,te.d)(Ce?.id,{cacheTime:0}),{permissions:pe,isLoading:Pe}=(0,Y.V)({id:Ce?.id},{cacheTime:0,enabled:!!Ce?.id}),We=Se=>{W(),re(!0),Ce?.id?Re("willDuplicateRole"):Re("willCreateNewRole"),Promise.resolve(he("/admin/roles",Se)).then(async({data:ae})=>{const{permissionsToSend:le}=G.current.getPermissions();return Ce?.id?Re("didDuplicateRole"):Re("didCreateNewRole"),ae.data.id&&!z()(le)&&await Be(`/admin/roles/${ae.data.id}/permissions`,{permissions:le}),ae}).then(ae=>{re(!1),xe({type:"success",message:{id:"Settings.roles.created",defaultMessage:"created"}}),ye(`/settings/roles/${ae.data.id}`)}).catch(ae=>{console.error(ae),re(!1),xe({type:"warning",message:{id:"notification.error"}})}).finally(()=>{w()})},Ze=`${j({id:"Settings.roles.form.created",defaultMessage:"Created"})} ${(0,N.Z)(new Date,"PPP")}`;return e.createElement(h.o,null,e.createElement(m.SL,{name:"Roles"}),e.createElement(g.J9,{initialValues:{name:"",description:Ze},onSubmit:We,validationSchema:Le,validateOnChange:!1},({handleSubmit:Se,values:ae,errors:le,handleReset:Ee,handleChange:ne})=>e.createElement(m.l0,{noValidate:!0},e.createElement(e.Fragment,null,e.createElement(R.T,{primaryAction:e.createElement(v.k,{gap:2},e.createElement(O.z,{variant:"secondary",onClick:()=>{Ee(),G.current.resetForm()},size:"L"},j({id:"app.components.Button.reset",defaultMessage:"Reset"})),e.createElement(O.z,{onClick:Se,loading:_,size:"L"},j({id:"global.save",defaultMessage:"Save"}))),title:j({id:"Settings.roles.create.title",defaultMessage:"Create a role"}),subtitle:j({id:"Settings.roles.create.description",defaultMessage:"Define the rights given to the role"}),navigationAction:e.createElement(m.rU,{startIcon:e.createElement(M.Z,null),to:"/settings/roles"},j({id:"global.back",defaultMessage:"Back"}))}),e.createElement(P.D,null,e.createElement(v.k,{direction:"column",alignItems:"stretch",gap:6},e.createElement(A.x,{background:"neutral0",padding:6,shadow:"filterShadow",hasRadius:!0},e.createElement(v.k,{direction:"column",alignItems:"stretch",gap:4},e.createElement(v.k,{justifyContent:"space-between"},e.createElement(A.x,null,e.createElement(A.x,null,e.createElement(E.Z,{fontWeight:"bold"},j({id:"global.details",defaultMessage:"Details"}))),e.createElement(A.x,null,e.createElement(E.Z,{variant:"pi",textColor:"neutral600"},j({id:"Settings.roles.form.description",defaultMessage:"Name and description of the role"})))),e.createElement(ce,null,j({id:"Settings.roles.form.button.users-with-role",defaultMessage:"{number, plural, =0 {# users} one {# user} other {# users}} with this role"},{number:0}))),e.createElement(S.r,{gap:4},e.createElement(V.P,{col:6},e.createElement(a.o,{name:"name",error:le.name&&j({id:le.name}),label:j({id:"global.name",defaultMessage:"Name"}),onChange:ne,required:!0,value:ae.name})),e.createElement(V.P,{col:6},e.createElement(F.g,{label:j({id:"global.description",defaultMessage:"Description"}),id:"description",error:le.description&&j({id:le.description}),onChange:ne},ae.description))))),!Fe&&!Pe?e.createElement(A.x,{shadow:"filterShadow",hasRadius:!0},e.createElement(J.Z,{isFormDisabled:!1,ref:G,permissions:pe,layout:Ne})):e.createElement(A.x,{background:"neutral0",padding:6,shadow:"filterShadow",hasRadius:!0},e.createElement(m.dO,null))))))))};function Te(){const X=(0,oe.v9)(de._);return e.createElement(m.O4,{permissions:X.settings.roles.create},e.createElement(me,null))}},30909:(U,L,o)=>{"use strict";o.d(L,{Z:()=>ts});var e=o(67294),h=o(98948),R=o(91788),v=o(94955),O=o(51435),P=o(18721),A=o.n(P),E=o(41609),S=o.n(E),V=o(45697),a=o.n(V),F=o(86896),m=o(16607),M=o(89734),N=o.n(M),g=o(1565),b=o(96987),z=o(12803),Q=o(73924),oe=o(14981),ee=o(27361),C=o.n(ee),de=o(57557),J=o.n(de);const te=e.createContext(null),Y=()=>e.useContext(te);var ue=o(12473),be=o(40989);const Le=g.default.div`
  position: relative;

  ${({hasConditions:t,disabled:n,theme:r})=>t&&`
    &:before {
      content: '';
      position: absolute;
      top: -3px;
      left: -10px;
      width: 6px;
      height: 6px;
      border-radius: ${20/16}rem;;
      background: ${n?r.colors.neutral100:r.colors.primary600};
    }
  `}
`,ce=({onClick:t,className:n,hasConditions:r,variant:s})=>{const{formatMessage:i}=(0,F.Z)();return e.createElement(Le,{hasConditions:r,className:n},e.createElement(ue.z,{variant:s,startIcon:e.createElement(be.Z,null),onClick:t},i({id:"global.settings",defaultMessage:"Settings"})))};ce.defaultProps={className:null,hasConditions:!1,variant:"tertiary"},ce.propTypes={onClick:a().func.isRequired,className:a().string,hasConditions:a().bool,variant:a().string};const me=(0,g.default)(ce)``;var Te=o(74622),X=o(36854),xe=o(71543),W=o(10574),w=o(37022),j=o(82392),_=o(75071),re=o(18172),ye=o(7739),G=o.n(ye),Re=o(11700),he=o.n(Re),Be=o(13814);const Ce=t=>Object.values(t).map(n=>Object.entries(n).filter(([,r])=>r).map(([r])=>r)).flat(),Fe=t=>t.reduce((n,[r,s])=>(n.push({label:he()(r),children:s.map(i=>({label:i.displayName,value:i.id}))}),n),[]),Ne=(t,n)=>t.map(([,r])=>r).flat().reduce((r,s)=>({[s.id]:n.includes(s.id),...r}),{}),pe=({arrayOfOptionsGroupedByCategory:t,isFormDisabled:n,isGrey:r,label:s,name:i,onChange:l,value:c})=>{const{formatMessage:d}=(0,F.Z)(),p=u=>{l(i,Ne(t,u))};return e.createElement(b.k,{as:"li",background:r?"neutral100":"neutral0",paddingBottom:3,paddingTop:3},e.createElement(b.k,{paddingLeft:6,style:{width:180}},e.createElement(W.Z,{variant:"sigma",textColor:"neutral600"},d({id:"Settings.permissions.conditions.can",defaultMessage:"Can"}),"\xA0"),e.createElement(W.Z,{variant:"sigma",title:s,textColor:"primary600",ellipsis:!0},d({id:`Settings.roles.form.permissions.${s.toLowerCase()}`,defaultMessage:s})),e.createElement(W.Z,{variant:"sigma",textColor:"neutral600"},"\xA0",d({id:"Settings.permissions.conditions.when",defaultMessage:"When"}))),e.createElement(m.x,{style:{maxWidth:430,width:"100%"}},e.createElement(Be.Q,{id:i,customizeContent:u=>`${u.length} currently selected`,onChange:p,value:Ce(c),options:Fe(t),disabled:n})))};pe.propTypes={arrayOfOptionsGroupedByCategory:a().array.isRequired,isFormDisabled:a().bool.isRequired,isGrey:a().bool.isRequired,label:a().string.isRequired,name:a().string.isRequired,value:a().object.isRequired,onChange:a().func.isRequired};const Pe=pe,We=(t,n)=>t.reduce((r,s)=>(r[s.id]=C()(n,s.id,!1),r),{}),Ze=(t,n)=>t.reduce((r,s)=>{const[i,l]=s,c=We(l,n);return r[i]=c,r},{}),ae=(t,n,r)=>t.reduce((s,i)=>{const l=C()(n,[...i.pathToConditionsObject,"conditions"],{}),c=Ze(r,l);return s[i.pathToConditionsObject.join("..")]=c,s},{}),le=({actions:t,headerBreadCrumbs:n,isFormDisabled:r,onClosed:s,onToggle:i})=>{const{formatMessage:l}=(0,F.Z)(),{availableConditions:c,modifiedData:d,onChangeConditions:p}=Y(),u=(0,e.useMemo)(()=>Object.entries(G()(c,"category")),[c]),f=t.filter(({isDisplayed:y,hasSomeActionsSelected:k,hasAllActionsSelected:D})=>y&&(k||D)),x=(0,e.useMemo)(()=>ae(f,d,u),[f,d,u]),[$,Z]=(0,e.useState)(x),I=(y,k)=>{Z((0,re.ZP)(D=>{D[y]||(D[y]={}),D[y].default||(D[y].default={}),D[y].default=k}))},T=()=>{const y=Object.entries($).reduce((k,D)=>{const[B,se]=D,H=Object.values(se).reduce((q,K)=>({...q,...K}),{});return k[B]=H,k},{});p(y),i()};return e.createElement(Te.P,{labelledBy:"condition-modal-breadcrumbs",onClose:s},e.createElement(X.x,null,e.createElement(j.O,{id:"condition-modal-breadcrumbs",label:n.join(", ")},n.map((y,k,D)=>e.createElement(_.$,{isCurrent:k===D.length-1,key:y},he()(l({id:y,defaultMessage:y})))))),e.createElement(xe.f,null,f.length===0&&e.createElement(W.Z,null,l({id:"Settings.permissions.conditions.no-actions",defaultMessage:"You first need to select actions (create, read, update, ...) before defining conditions on them."})),e.createElement("ul",null,f.map(({actionId:y,label:k,pathToConditionsObject:D},B)=>{const se=D.join("..");return e.createElement(Pe,{key:y,arrayOfOptionsGroupedByCategory:u,label:k,isFormDisabled:r,isGrey:B%2===0,name:se,onChange:I,value:C()($,se,{})})}))),e.createElement(w.m,{startActions:e.createElement(ue.z,{variant:"tertiary",onClick:i},l({id:"app.components.Button.cancel",defaultMessage:"Cancel"})),endActions:e.createElement(ue.z,{onClick:T},l({id:"Settings.permissions.conditions.apply",defaultMessage:"Apply"}))}))};le.propTypes={actions:a().arrayOf(a().shape({actionId:a().string.isRequired,checkboxName:a().string,hasSomeActionsSelected:a().bool.isRequired,hasAllActionsSelected:a().bool,isDisplayed:a().bool.isRequired,label:a().string})).isRequired,headerBreadCrumbs:a().arrayOf(a().string).isRequired,isFormDisabled:a().bool.isRequired,onClosed:a().func.isRequired,onToggle:a().func.isRequired};const Ee=le,ne=`${120/16}rem`,Me=`${200/16}rem`,je=`${53/16}rem`,Ge=g.default.div`
  width: ${ne};
`,at=(0,g.default)(b.k)`
  padding-right: ${({theme:t})=>t.spaces[2]};
  overflow: hidden;
  flex: 1;
  ${({isCollapsable:t})=>t&&"cursor: pointer;"}
`,ze=({children:t,isCollapsable:n,isActive:r,isFormDisabled:s,label:i,onChange:l,onClick:c,checkboxName:d,someChecked:p,value:u})=>{const{formatMessage:f}=(0,F.Z)();return e.createElement(b.k,{alignItems:"center",paddingLeft:6,style:{width:Me,flexShrink:0}},e.createElement(m.x,{paddingRight:2},e.createElement(z.C,{name:d,"aria-label":f({id:"Settings.permissions.select-all-by-permission",defaultMessage:"Select all {label} permissions"},{label:i}),disabled:s,onValueChange:x=>l({target:{name:d,value:x}}),indeterminate:p,value:u})),e.createElement(at,{title:i,alignItems:"center",isCollapsable:n,...n&&{onClick:c,"aria-expanded":r,onKeyDown:({key:x})=>(x==="Enter"||x===" ")&&c(),tabIndex:0,role:"button"}},e.createElement(W.Z,{fontWeight:r?"bold":"",textColor:r?"primary600":"neutral800",ellipsis:!0},he()(i)),t))};ze.defaultProps={children:null,checkboxName:"",onChange(){},value:!1,someChecked:!1,isCollapsable:!1},ze.propTypes={checkboxName:a().string,children:a().node,label:a().string.isRequired,isCollapsable:a().bool,isFormDisabled:a().bool.isRequired,onChange:a().func,onClick:a().func.isRequired,someChecked:a().bool,value:a().bool,isActive:a().bool.isRequired};const it=(0,e.memo)(ze);var Zt=o(42348),Vt=o.n(Zt),Kt=o(13218),Ae=o.n(Kt);const lt=t=>Ae()(t)?Vt()(Object.values(t).map(n=>Ae()(n)?lt(n):n)):[],Ie=lt,Ye=t=>t?Object.keys(t).reduce((n,r)=>(r!=="conditions"&&(n[r]=t[r]),n),{}):null,Oe=t=>{const n=Ye(t),r=Ie(n);if(!r.length)return{hasAllActionsSelected:!1,hasSomeActionsSelected:!1};const s=r.every(l=>l),i=r.some(l=>l)&&!s;return{hasAllActionsSelected:s,hasSomeActionsSelected:i}};var Ut=o(58471);const Ve=(0,g.default)(Ut.Z)`
  display: none;
  width: ${10/16}rem;
  transform: rotate(${({$isActive:t})=>t?"180":"0"}deg);
  margin-left: ${({theme:t})=>t.spaces[2]};
`,Ke=t=>`
  ${W.Z} {
    color: ${t.colors.primary600};
    font-weight: ${t.fontWeights.bold}
  }
  ${Ve} {
    display: block;
    path {
      fill: ${t.colors.primary600}
    };
  }
`,Ht=(t,n,r)=>t.map(({actionId:s,isDisplayed:i,applyToProperties:l,label:c})=>{if(!i)return{actionId:s,hasSomeActionsSelected:!1,isDisplayed:i};const d=[...r.split(".."),s],p=S()(l)?[...d,"properties","enabled"]:d,u=p.join(".."),f=C()(n,[...d,"conditions"],null),x=Ie(f).some(T=>T);if(S()(l)){const T=C()(n,p,!1);return{actionId:s,checkboxName:u,hasAllActionsSelected:T,hasConditions:x,hasSomeActionsSelected:T,isDisplayed:i,isParentCheckbox:!1,label:c,pathToConditionsObject:d}}const $=C()(n,p,null),{hasAllActionsSelected:Z,hasSomeActionsSelected:I}=Oe($);return{actionId:s,checkboxName:u,hasAllActionsSelected:Z,hasConditions:x,hasSomeActionsSelected:I,isDisplayed:i,isParentCheckbox:!0,label:c,pathToConditionsObject:d}}),Xe=(t,n)=>`
  ${ct} {
    background-color: ${t.colors.primary100};
    color: ${t.colors.primary600};
    border-radius: ${n?"2px 2px 0 0":"2px"};
  }
  ${ut} {
    display: flex;
  }
  ${me} {
    display: block;
  }
  &:hover {
   ${Ke(t)}
  }

  &:focus-within {
    ${({theme:r,isActive:s})=>Xe(r,s)}
  }
  
`,ct=g.default.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: ${je};
  background-color: ${({isGrey:t,theme:n})=>t?n.colors.neutral100:n.colors.neutral0};
  border: 1px solid transparent;
`,Gt=g.default.div`
  display: inline-flex;
  min-width: 100%;

  ${me} {
    display: none;
  }
  ${({isActive:t,theme:n})=>t&&Xe(n,t)}
  &:hover {
    ${({theme:t,isActive:n})=>Xe(t,n)}
  }
`,dt=(0,g.default)(b.k)`
  width: ${ne};
  position: relative;
`,ut=(0,g.default)(m.x)`
  display: none;
  svg {
    width: 11px;
  }
  * {
    fill: ${({theme:t})=>t.colors.primary600};
  }
`,mt=g.default.span`
  position: absolute;
  top: -6px;
  left: 37px;
  width: 6px;
  height: 6px;
  border-radius: 20px;
  background: ${({theme:t})=>t.colors.primary600};
`,zt=(0,g.default)(m.x)`
  position: absolute;
  right: 9px;
  transform: translateY(10px);
`,pt=({availableActions:t,isActive:n,isGrey:r,isFormDisabled:s,label:i,onClickToggle:l,pathToData:c})=>{const[d,p]=(0,e.useState)(!1),{formatMessage:u}=(0,F.Z)(),{modifiedData:f,onChangeParentCheckbox:x,onChangeSimpleCheckbox:$}=Y(),Z=()=>{p(H=>!H)},I=()=>{p(!1)},T=C()(f,c.split(".."),{}),y=(0,e.useMemo)(()=>Object.keys(T).reduce((H,q)=>(H[q]=J()(T[q],"conditions"),H),{}),[T]),{hasAllActionsSelected:k,hasSomeActionsSelected:D}=Oe(y),B=(0,e.useMemo)(()=>Ht(t,f,c),[t,f,c]),se=B.some(({hasConditions:H})=>H);return e.createElement(Gt,{isActive:n},e.createElement(ct,{isGrey:r},e.createElement(it,{isCollapsable:!0,isFormDisabled:s,label:i,checkboxName:c,onChange:x,onClick:l,someChecked:D,value:k,isActive:n},e.createElement(ut,{paddingLeft:2},n?e.createElement(Q.Z,null):e.createElement(oe.Z,null))),e.createElement(b.k,{style:{flex:1}},B.map(({actionId:H,hasConditions:q,hasAllActionsSelected:K,hasSomeActionsSelected:fe,isDisplayed:ke,isParentCheckbox:ie,checkboxName:ve,label:Ue})=>ke?ie?e.createElement(dt,{key:H,justifyContent:"center",alignItems:"center"},q&&e.createElement(mt,null),e.createElement(z.C,{disabled:s,name:ve,"aria-label":u({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${Ue} ${i}`}),onValueChange:$e=>{x({target:{name:ve,value:$e}})},indeterminate:fe,value:K})):e.createElement(dt,{key:H,justifyContent:"center",alignItems:"center"},q&&e.createElement(mt,null),e.createElement(z.C,{disabled:s,indeterminate:q,name:ve,onValueChange:$e=>{$({target:{name:ve,value:$e}})},value:K})):e.createElement(Ge,{key:H}))),d&&e.createElement(Ee,{headerBreadCrumbs:[i,"Settings.permissions.conditions.conditions"],actions:B,isFormDisabled:s,onClosed:I,onToggle:Z})),e.createElement(zt,null,e.createElement(me,{onClick:Z,hasConditions:se})))};pt.propTypes={availableActions:a().array.isRequired,isActive:a().bool.isRequired,isGrey:a().bool.isRequired,isFormDisabled:a().bool.isRequired,label:a().string.isRequired,onClickToggle:a().func.isRequired,pathToData:a().string.isRequired};const Yt=pt,Xt=g.default.span`
  color: ${({theme:t})=>t.colors.danger700};
  padding-left: ${({theme:t})=>t.spaces[1]}px;
`,gt=()=>e.createElement(Xt,null,"*"),wt=(t,n)=>t.map(r=>{const s=Array.isArray(r.subjects)&&r.subjects.indexOf(n)!==-1;return{...r,isDisplayed:s}}),Qt=(0,g.default)(m.x)`
  transform: translate(-4px, -12px);

  &:before {
    content: '';
    width: ${4/16}rem;
    height: ${12/16}rem;
    background: ${({theme:t})=>t.colors.primary200};
    display: block;
  }
`,Jt=g.default.svg`
  position: relative;
  flex-shrink: 0;
  transform: translate(-0.5px, -1px);

  * {
    fill: ${({theme:t,color:n})=>t.colors[n]};
  }
`,we=t=>e.createElement(Qt,null,e.createElement(Jt,{width:"20",height:"23",viewBox:"0 0 20 23",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},e.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.02477 14.7513C8.65865 17.0594 11.6046 18.6059 17.5596 18.8856C18.6836 18.9384 19.5976 19.8435 19.5976 20.9688V20.9688C19.5976 22.0941 18.6841 23.0125 17.5599 22.9643C10.9409 22.6805 6.454 20.9387 3.75496 17.1258C0.937988 13.1464 0.486328 7.39309 0.486328 0.593262H4.50974C4.50974 7.54693 5.06394 11.9813 7.02477 14.7513Z",fill:"#D9D8FF"})));we.defaultProps={fill:"primary200"},we.propTypes={fill:a().string};const qt=(0,e.memo)(we),ft=(0,g.default)(b.k)`
  width: ${ne};
  position: relative;
`,_t=(0,g.default)(b.k)`
  height: ${je};
`,en=(0,g.default)(m.x)`
  padding-left: ${31/16}rem;
`,tn=(0,g.default)(m.x)`
  border-left: ${({isVisible:t,theme:n})=>t?`4px solid ${n.colors.primary200}`:"4px solid transparent"};
`,nn=(0,g.default)(b.k)`
  padding-left: ${({theme:t})=>t.spaces[4]};
  width: ${({level:t})=>145-t*36}px;

  ${({isCollapsable:t,theme:n})=>t&&`
      ${Ve} {
        display: block;
        color: ${n.colors.neutral100};
      }
      &:hover {
        ${Ke(n)}
      }
  `}
  ${({isActive:t,theme:n})=>t&&Ke(n)};
`,sn=g.default.div`
  padding-top: ${({theme:t})=>t.spaces[2]};
  margin-top: ${({theme:t})=>t.spaces[2]};
  width: ${4/16}rem;
  background-color: ${({theme:t})=>t.colors.primary200};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`,Qe=({childrenForm:t,isFormDisabled:n,recursiveLevel:r,pathToDataFromActionRow:s,propertyActions:i,parentName:l,propertyName:c})=>{const{formatMessage:d}=(0,F.Z)(),{modifiedData:p,onChangeParentCheckbox:u,onChangeSimpleCheckbox:f}=Y(),[x,$]=(0,e.useState)(null),Z=T=>{$(y=>y===T?null:T)},I=(0,e.useMemo)(()=>x?t.find(({value:T})=>T===x):null,[x,t]);return e.createElement(en,null,e.createElement(sn,null),t.map(({label:T,value:y,required:k,children:D},B)=>{const se=B+1<t.length,H=Array.isArray(D),q=x===y;return e.createElement(tn,{key:y,isVisible:se},e.createElement(_t,null,e.createElement(qt,{color:"primary200"}),e.createElement(b.k,{style:{flex:1}},e.createElement(nn,{level:r,isActive:q,isCollapsable:H},e.createElement(at,{alignItems:"center",isCollapsable:H,...H&&{onClick:()=>Z(y),"aria-expanded":q,onKeyDown:({key:K})=>(K==="Enter"||K===" ")&&Z(y),tabIndex:0,role:"button"},title:T},e.createElement(W.Z,{ellipsis:!0},he()(T)),k&&e.createElement(gt,null),e.createElement(Ve,{$isActive:q}))),e.createElement(b.k,{style:{flex:1}},i.map(({actionId:K,label:fe,isActionRelatedToCurrentProperty:ke})=>{if(!ke)return e.createElement(Ge,{key:K});const ie=[...s.split(".."),K,"properties",c,...l.split(".."),y],ve=C()(p,ie,!1);if(!D)return e.createElement(ft,{key:fe,justifyContent:"center",alignItems:"center"},e.createElement(z.C,{disabled:n,name:ie.join(".."),"aria-label":d({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${l} ${T} ${fe}`}),onValueChange:De=>{f({target:{name:ie.join(".."),value:De}})},value:ve}));const{hasAllActionsSelected:Ue,hasSomeActionsSelected:$e}=Oe(ve);return e.createElement(ft,{key:fe,justifyContent:"center",alignItems:"center"},e.createElement(z.C,{key:fe,disabled:n,name:ie.join(".."),"aria-label":d({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${l} ${T} ${fe}`}),onValueChange:De=>{u({target:{name:ie.join(".."),value:De}})},value:Ue,indeterminate:$e}))})))),I&&q&&e.createElement(m.x,{paddingBottom:2},e.createElement(Qe,{isFormDisabled:n,parentName:`${l}..${y}`,pathToDataFromActionRow:s,propertyActions:i,propertyName:c,recursiveLevel:r+1,childrenForm:I.children})))}))};Qe.propTypes={childrenForm:a().array.isRequired,isFormDisabled:a().bool.isRequired,parentName:a().string.isRequired,pathToDataFromActionRow:a().string.isRequired,propertyActions:a().array.isRequired,propertyName:a().string.isRequired,recursiveLevel:a().number.isRequired};const on=(0,e.memo)(Qe),rn=t=>t.reduce((r,s)=>(s.isActionRelatedToCurrentProperty&&r.push(s.actionId),r),[]),an=(t,n,r,s,i)=>{const c=rn(t).reduce((d,p)=>{const u=[...r.split(".."),p,"properties",s,i],f=C()(n,u,!1);return d[p]=f,d},{});return Oe(c)},yt=(0,g.default)(b.k)`
  width: ${ne};
  position: relative;
`,ln=(0,g.default)(b.k)`
  height: ${je};
  flex: 1;

  ${({isCollapsable:t,theme:n})=>t&&`
      ${Ve} {
        display: block;
        color: ${n.colors.neutral100};
      }
      &:hover {
        ${Ke(n)}
      }
  `}
  ${({isActive:t,theme:n})=>t&&Ke(n)};
`,Je=({childrenForm:t,label:n,isFormDisabled:r,name:s,required:i,pathToData:l,propertyActions:c,propertyName:d,isOdd:p})=>{const{formatMessage:u}=(0,F.Z)(),[f,x]=(0,e.useState)(null),{modifiedData:$,onChangeCollectionTypeLeftActionRowCheckbox:Z,onChangeParentCheckbox:I,onChangeSimpleCheckbox:T}=Y(),y=f===s,k=(0,e.useMemo)(()=>Array.isArray(t)?t:[],[t]),D=k.length>0,B=(0,e.useCallback)(()=>{D&&x(K=>K===s?null:s)},[D,s]),se=({target:{value:K}})=>{Z(l,d,s,K)},{hasAllActionsSelected:H,hasSomeActionsSelected:q}=(0,e.useMemo)(()=>an(c,$,l,d,s),[c,$,l,d,s]);return e.createElement(e.Fragment,null,e.createElement(ln,{alignItems:"center",isCollapsable:D,isActive:y,background:p?"neutral100":"neutral0"},e.createElement(b.k,null,e.createElement(it,{onChange:se,onClick:B,isCollapsable:D,isFormDisabled:r,label:n,someChecked:q,value:H,isActive:y},i&&e.createElement(gt,null),e.createElement(Ve,{$isActive:y})),e.createElement(b.k,null,c.map(({label:K,isActionRelatedToCurrentProperty:fe,actionId:ke})=>{if(!fe)return e.createElement(Ge,{key:K});const ie=[...l.split(".."),ke,"properties",d,s];if(!D){const De=C()($,ie,!1);return e.createElement(yt,{key:ke,justifyContent:"center",alignItems:"center"},e.createElement(z.C,{disabled:r,name:ie.join(".."),"aria-label":u({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${s} ${K}`}),onValueChange:ns=>{T({target:{name:ie.join(".."),value:ns}})},value:De}))}const ve=C()($,ie,{}),{hasAllActionsSelected:Ue,hasSomeActionsSelected:$e}=Oe(ve);return e.createElement(yt,{key:K,justifyContent:"center",alignItems:"center"},e.createElement(z.C,{disabled:r,name:ie.join(".."),onValueChange:De=>{I({target:{name:ie.join(".."),value:De}})},"aria-label":u({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${s} ${K}`}),value:Ue,indeterminate:$e}))})))),y&&e.createElement(on,{childrenForm:k,isFormDisabled:r,parentName:s,pathToDataFromActionRow:l,propertyName:d,propertyActions:c,recursiveLevel:0}))};Je.defaultProps={childrenForm:[],required:!1},Je.propTypes={childrenForm:a().array,label:a().string.isRequired,isFormDisabled:a().bool.isRequired,name:a().string.isRequired,pathToData:a().string.isRequired,propertyActions:a().array.isRequired,propertyName:a().string.isRequired,required:a().bool,isOdd:a().bool.isRequired};const cn=(0,e.memo)(Je),ht=(0,g.default)(b.k)`
  width: ${ne};
  flex-shrink: 0;
`,dn=(0,g.default)(b.k)`
  width: ${Me};
  height: ${je};
  flex-shrink: 0;
`,Ct=({headers:t,label:n})=>{const{formatMessage:r}=(0,F.Z)(),s=r({id:"Settings.roles.form.permission.property-label",defaultMessage:"{label} permissions"},{label:n});return e.createElement(b.k,null,e.createElement(dn,{alignItems:"center",paddingLeft:6},e.createElement(W.Z,{variant:"sigma",textColor:"neutral500"},s)),t.map(i=>i.isActionRelatedToCurrentProperty?e.createElement(ht,{justifyContent:"center",key:i.label},e.createElement(W.Z,{variant:"sigma",textColor:"neutral500"},r({id:`Settings.roles.form.permissions.${i.label.toLowerCase()}`,defaultMessage:i.label}))):e.createElement(ht,{key:i.label})))};Ct.propTypes={headers:a().arrayOf(a().shape({label:a().string.isRequired,isActionRelatedToCurrentProperty:a().bool.isRequired})).isRequired,label:a().string.isRequired};const un=Ct,mn=(t,n)=>t.map(r=>{const s=Array.isArray(r.applyToProperties)&&r.applyToProperties.indexOf(n)!==-1&&r.isDisplayed;return{label:r.label,actionId:r.actionId,isActionRelatedToCurrentProperty:s}}),pn=g.default.div`
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
`,Et=({availableActions:t,childrenForm:n,isFormDisabled:r,label:s,pathToData:i,propertyName:l})=>{const c=(0,e.useMemo)(()=>mn(t,l),[t,l]);return e.createElement(pn,null,e.createElement(un,{label:s,headers:c}),e.createElement(m.x,null,n.map(({children:d,label:p,value:u,required:f},x)=>e.createElement(cn,{childrenForm:d,key:u,label:p,isFormDisabled:r,name:u,required:f,propertyActions:c,pathToData:i,propertyName:l,isOdd:x%2===0}))))};Et.propTypes={childrenForm:a().array.isRequired,availableActions:a().array.isRequired,isFormDisabled:a().bool.isRequired,label:a().string.isRequired,pathToData:a().string.isRequired,propertyName:a().string.isRequired};const gn=Et,fn=g.default.div`
  flex-direction: column;
  display: inline-flex;
  min-width: 100%;
  ${({theme:t,isActive:n})=>n&&`border: 1px solid ${t.colors.primary600};`}
`,vt=({allActions:t,contentTypeName:n,label:r,index:s,isActive:i,isFormDisabled:l,onClickToggleCollapse:c,pathToData:d,properties:p})=>{const u=(0,e.useCallback)(()=>{c(n)},[n,c]),f=(0,e.useMemo)(()=>wt(t,n),[t,n]);return e.createElement(fn,{isActive:i},e.createElement(Yt,{availableActions:f,isActive:i,isGrey:s%2===0,isFormDisabled:l,label:r,onClickToggle:u,pathToData:d}),i&&p.map(({label:x,value:$,children:Z})=>e.createElement(gn,{availableActions:f,childrenForm:Z,isFormDisabled:l,label:x,pathToData:d,propertyName:$,key:$})))};vt.propTypes={allActions:a().array.isRequired,contentTypeName:a().string.isRequired,index:a().number.isRequired,isActive:a().bool.isRequired,isFormDisabled:a().bool.isRequired,label:a().string.isRequired,onClickToggleCollapse:a().func.isRequired,pathToData:a().string.isRequired,properties:a().array.isRequired};const yn=vt,qe=({actions:t,isFormDisabled:n,pathToData:r,subjects:s})=>{const[i,l]=(0,e.useState)(null),c=d=>{l(i===d?null:d)};return s.map(({uid:d,label:p,properties:u},f)=>e.createElement(yn,{allActions:t,key:d,contentTypeName:d,label:p,isActive:i===d,isFormDisabled:n,index:f,onClickToggleCollapse:c,pathToData:`${r}..${d}`,properties:u}))};qe.defaultProps={actions:[],subjects:[]},qe.propTypes={actions:a().array.isRequired,isFormDisabled:a().bool.isRequired,pathToData:a().string.isRequired,subjects:a().arrayOf(a().shape({uid:a().string.isRequired,label:a().string.isRequired,properties:a().array.isRequired}))};const hn=(0,e.memo)(qe),Cn=t=>t.filter(({subjects:n})=>n&&n.length),En=t=>t.map(({actionId:n})=>n),vn=(t,n)=>t.reduce((r,s)=>(Object.keys(n).forEach(i=>{const l=C()(n,[i,s],{}),c={[i]:Ye(l)};r[s]?r[s]={...r[s],...c}:r[s]=c}),r),{}),bn=(t,n)=>{const r=En(t),s=vn(r,n);return Object.keys(s).reduce((l,c)=>(l[c]=Oe(s[c]),l),{})},xn=(0,g.default)(b.k)`
  width: ${ne};
  flex-shrink: 0;
`,_e=({actions:t,isFormDisabled:n,kind:r})=>{const{formatMessage:s}=(0,F.Z)(),{modifiedData:i,onChangeCollectionTypeGlobalActionCheckbox:l}=Y(),c=(0,e.useMemo)(()=>Cn(t),[t]),d=(0,e.useMemo)(()=>bn(c,i[r]),[i,c,r]);return e.createElement(m.x,{paddingBottom:4,paddingTop:6,style:{paddingLeft:Me}},e.createElement(b.k,{gap:0},c.map(({label:p,actionId:u})=>e.createElement(xn,{direction:"column",alignItems:"center",justifyContent:"center",key:u,gap:3},e.createElement(W.Z,{variant:"sigma",textColor:"neutral500"},s({id:`Settings.roles.form.permissions.${p.toLowerCase()}`,defaultMessage:p})),e.createElement(z.C,{disabled:n,onValueChange:f=>{l(r,u,f)},name:u,"aria-label":s({id:"Settings.permissions.select-all-by-permission",defaultMessage:"Select all {label} permissions"},{label:s({id:`Settings.roles.form.permissions.${p.toLowerCase()}`,defaultMessage:p})}),value:C()(d,[u,"hasAllActionsSelected"],!1),indeterminate:C()(d,[u,"hasSomeActionsSelected"],!1)})))))};_e.defaultProps={actions:[]},_e.propTypes={actions:a().arrayOf(a().shape({label:a().string.isRequired,actionId:a().string.isRequired,subjects:a().array.isRequired})),isFormDisabled:a().bool.isRequired,kind:a().string.isRequired};const Rn=(0,e.memo)(_e),An=(0,g.default)(m.x)`
  overflow-x: auto;
`,bt=({isFormDisabled:t,kind:n,layout:{actions:r,subjects:s}})=>{const i=N()([...s],"label");return e.createElement(An,{background:"neutral0"},e.createElement(Rn,{actions:r,kind:n,isFormDisabled:t}),e.createElement(hn,{actions:r,isFormDisabled:t,pathToData:n,subjects:i}))};bt.propTypes={isFormDisabled:a().bool.isRequired,kind:a().string.isRequired,layout:a().shape({actions:a().array,subjects:a().arrayOf(a().shape({uid:a().string.isRequired,label:a().string.isRequired,properties:a().array.isRequired}))}).isRequired};const xt=(0,e.memo)(bt),Rt=({children:t,value:n})=>e.createElement(te.Provider,{value:n},t);Rt.propTypes={children:a().node.isRequired,value:a().exact({availableConditions:a().array.isRequired,modifiedData:a().object.isRequired,onChangeCollectionTypeLeftActionRowCheckbox:a().func.isRequired,onChangeConditions:a().func.isRequired,onChangeSimpleCheckbox:a().func.isRequired,onChangeParentCheckbox:a().func.isRequired,onChangeCollectionTypeGlobalActionCheckbox:a().func.isRequired}).isRequired};const Tn=Rt;var Pn=o(63122),Sn=o(1744),Mn=o(68889),At=o(22546),On=o(31988),$n=o(6498);const Dn=(t,n,r)=>t.map(s=>{const i=[...r,s.action,"properties","enabled"],l=C()(n,i,!1),c=C()(n,[...r,s.action,"conditions"],{}),d=Ie(c).some(p=>p);return{...s,isDisplayed:l,checkboxName:i.join(".."),hasSomeActionsSelected:l,value:l,hasConditions:d,label:s.displayName,actionId:s.action,pathToConditionsObject:[...r,s.action]}}),Ln=t=>{const n=Object.entries(t).reduce((s,i)=>{const[l,{conditions:c}]=i;return s[l]=c,s},{});return Ie(n).some(s=>s)},jn=g.default.div`
  flex: 1;
  align-self: center;
  border-top: 1px solid ${({theme:t})=>t.colors.neutral150};
`,In=g.default.div`
  position: relative;
  word-break: keep-all;
  ${({hasConditions:t,disabled:n,theme:r})=>t&&`
    &:before {
      content: '';
      position: absolute;
      top: ${-4/16}rem;
      left: ${-8/16}rem;
      width: ${6/16}rem;
      height: ${6/16}rem;
      border-radius: ${20/16}rem;
      background: ${n?r.colors.neutral100:r.colors.primary600};
    }
  `}
`,Tt=({categoryName:t,isFormDisabled:n,subCategoryName:r,actions:s,pathToData:i})=>{const[l,c]=(0,e.useState)(!1),{modifiedData:d,onChangeParentCheckbox:p,onChangeSimpleCheckbox:u}=Y(),{formatMessage:f}=(0,F.Z)(),x=C()(d,i,{}),$=(0,e.useMemo)(()=>Object.keys(x).reduce((B,se)=>(B[se]=Ye(x[se]),B),{}),[x]),{hasAllActionsSelected:Z,hasSomeActionsSelected:I}=Oe($),T=()=>{c(B=>!B)},y=()=>{c(!1)},k=Dn(s,d,i),D=Ln(C()(d,[...i],{}));return e.createElement(e.Fragment,null,e.createElement(m.x,null,e.createElement(b.k,{justifyContent:"space-between",alignItems:"center"},e.createElement(m.x,{paddingRight:4},e.createElement(W.Z,{variant:"sigma",textColor:"neutral600"},r)),e.createElement(jn,null),e.createElement(m.x,{paddingLeft:4},e.createElement(At.X,{name:i.join(".."),disabled:n,onValueChange:B=>{p({target:{name:i.join(".."),value:B}})},indeterminate:I,value:Z},f({id:"app.utils.select-all",defaultMessage:"Select all"})))),e.createElement(b.k,{paddingTop:6,paddingBottom:6},e.createElement(On.r,{gap:2,style:{flex:1}},k.map(({checkboxName:B,value:se,action:H,displayName:q,hasConditions:K})=>e.createElement($n.P,{col:3,key:H},e.createElement(In,{disabled:n,hasConditions:K},e.createElement(At.X,{name:B,disabled:n,onValueChange:fe=>{u({target:{name:B,value:fe}})},value:se},q))))),e.createElement(me,{hasConditions:D,onClick:T}))),l&&e.createElement(Ee,{headerBreadCrumbs:[t,r],actions:k,isFormDisabled:n,onClosed:y,onToggle:T}))};Tt.propTypes={actions:a().array.isRequired,categoryName:a().string.isRequired,isFormDisabled:a().bool.isRequired,subCategoryName:a().string.isRequired,pathToData:a().array.isRequired};const kn=Tt,et=({childrenForm:t,kind:n,name:r,isOpen:s,isFormDisabled:i,isWhite:l,onOpenCategory:c,pathToData:d})=>{const{formatMessage:p}=(0,F.Z)(),u=()=>{c(r)},f=(0,e.useMemo)(()=>r.split("::").pop(),[r]);return e.createElement(Pn.U,{expanded:s,onToggle:u,id:`accordion-${r}`,variant:l?"primary":"secondary"},e.createElement(Sn.B,{title:he()(f),description:`${p({id:"Settings.permissions.category"},{category:f})} ${n==="plugins"?"plugin":n}`}),e.createElement(Mn.v,null,e.createElement(m.x,{padding:6},t.map(({actions:x,subCategoryName:$,subCategoryId:Z})=>e.createElement(kn,{key:$,actions:x,categoryName:f,isFormDisabled:i,subCategoryName:$,pathToData:[...d,Z]})))))};et.defaultProps={},et.propTypes={childrenForm:a().array.isRequired,isOpen:a().bool.isRequired,isFormDisabled:a().bool.isRequired,isWhite:a().bool.isRequired,kind:a().string.isRequired,name:a().string.isRequired,onOpenCategory:a().func.isRequired,pathToData:a().array.isRequired};const Bn=et,Pt=({isFormDisabled:t,kind:n,layout:r})=>{const[s,i]=(0,e.useState)(null),l=c=>{i(c===s?null:c)};return e.createElement(m.x,{padding:6,background:"neutral0"},r.map(({category:c,categoryId:d,childrenForm:p},u)=>e.createElement(Bn,{key:c,childrenForm:p,kind:n,isFormDisabled:t,isOpen:s===c,isWhite:u%2===1,name:c,onOpenCategory:l,pathToData:[n,d]})))};Pt.propTypes={isFormDisabled:a().bool.isRequired,kind:a().string.isRequired,layout:a().arrayOf(a().shape({category:a().string.isRequired,categoryId:a().string.isRequired,childrenForm:a().arrayOf(a().shape({actions:a().array.isRequired})).isRequired}).isRequired).isRequired};const St=Pt;var Fn=o(82492),Nn=o.n(Fn),Wn=o(36968),ge=o.n(Wn);const Mt=(t,n,r)=>t.find(s=>s.action===n&&s.subject===r),Ot=(t,n=[])=>t.reduce((r,s)=>(r[s.id]=n.indexOf(s.id)!==-1,r),{}),$t=({children:t},n,r="")=>t.reduce((s,i)=>{if(i.children)return{...s,[i.value]:$t(i,n,`${r}${i.value}.`)};const l=n.indexOf(`${r}${i.value}`)!==-1;return s[i.value]=l,s},{}),Zn=(t,n,r)=>t.reduce((s,i)=>{const l=n.properties.find(({value:c})=>c===i);if(l){const c=C()(r,["properties",l.value],[]),d=$t(l,c);s.properties[i]=d}return s},{properties:{}}),Vn=(t,n)=>n.reduce((r,s)=>{const i=t.find(({uid:l})=>l===s)||null;return i&&(r[s]=i),r},{}),Dt=({subjects:t},n,r,s=[])=>n.reduce((i,l)=>{const c=l.subjects,d=Vn(t,c);if(S()(d))return i;const p=Object.keys(d).reduce((u,f)=>{const{actionId:x,applyToProperties:$}=l,T=d[f].properties.map(({value:B})=>B).every(B=>($||[]).indexOf(B)===-1),y=Mt(s,x,f),k=Ot(r,C()(y,"conditions",[]));if(S()($)||T)return ge()(u,[f,x],{properties:{enabled:y!==void 0},conditions:k}),u;const D=Zn($,d[f],y);return ge()(u,[f,x],{...D,conditions:k}),u},{});return Nn()(i,p)},{}),Kn=(t,n,r)=>t.reduce((s,i)=>{const l=Mt(r,i.action,null);return s[i.action]={properties:{enabled:l!==void 0},conditions:Ot(n,l?.conditions??[])},s},{}),Un=(t,n,r)=>t.reduce((s,i)=>(s[i.subCategoryId]=Kn(i.actions,n,r),s),{}),Lt=(t,n,r=[])=>t.reduce((s,{categoryId:i,childrenForm:l})=>{const c=Un(l,n,r);return s[i]=c,s},{}),jt=t=>t.split(" ").join("-"),It=(t,n)=>Object.entries(G()(t,n)).map(([r,s])=>({category:r,categoryId:jt(r),childrenForm:Object.entries(G()(s,"subCategory")).map(([i,l])=>({subCategoryName:i,subCategoryId:jt(i),actions:l}))})),Hn=(t,n)=>{const{conditions:r,sections:{collectionTypes:s,singleTypes:i,plugins:l,settings:c}}=t,d={collectionTypes:s,singleTypes:i,plugins:It(l,"plugin"),settings:It(c,"category")},p={collectionTypes:Dt(s,s.actions||[],r,n),singleTypes:Dt(i,i.actions||[],r,n),plugins:Lt(d.plugins,r,n),settings:Lt(d.settings,r,n)};return{initialData:p,modifiedData:p,layouts:d}};var Gn=o(50361),tt=o.n(Gn);const kt=t=>Object.keys(t).reduce((n,r)=>{const s=t[r];if(Ae()(s)&&!A()(s,"conditions"))return{...n,[r]:kt(s)};if(Ae()(s)&&A()(s,"conditions")&&!Ie(J()(s,"conditions")).some(l=>l)){const l=Object.keys(s.conditions).reduce((c,d)=>(c[d]=!1,c),{});return{...n,[r]:{...s,conditions:l}}}return n[r]=s,n},{}),nt=kt,Bt=(t,n,r=!1)=>Object.keys(t).reduce((s,i)=>{const l=t[i];return i==="conditions"&&!r?(s[i]=l,s):Ae()(l)?{...s,[i]:Bt(l,n,i==="fields")}:(s[i]=n,s)},{}),He=Bt,zn={initialData:{},modifiedData:{},layouts:{}},Yn=(t,n)=>(0,re.ZP)(t,r=>{switch(n.type){case"ON_CHANGE_COLLECTION_TYPE_GLOBAL_ACTION_CHECKBOX":{const{collectionTypeKind:s,actionId:i,value:l}=n,c=["modifiedData",s];Object.keys(C()(t,c)).forEach(d=>{const p=C()(t,[...c,d,i],void 0);if(p){let u=He(p,l);if(!l&&u.conditions){const f=He(u.conditions,!1);u={...u,conditions:f}}ge()(r,[...c,d,i],u)}});break}case"ON_CHANGE_COLLECTION_TYPE_ROW_LEFT_CHECKBOX":{const{pathToCollectionType:s,propertyName:i,rowName:l,value:c}=n;let d=tt()(t.modifiedData);const p=s.split(".."),u=C()(d,p,{});Object.keys(u).forEach(f=>{if(A()(u[f],`properties.${i}`)){const x=C()(u,[f,"properties",i,l]),$=[...p,f,"properties",i,l];if(!Ae()(x))ge()(d,$,c);else{const Z=He(x,c);ge()(d,$,Z)}}}),c||(d=nt(d)),ge()(r,"modifiedData",d);break}case"ON_CHANGE_CONDITIONS":{Object.entries(n.conditions).forEach(s=>{const[i,l]=s;ge()(r,["modifiedData",...i.split(".."),"conditions"],l)});break}case"ON_CHANGE_SIMPLE_CHECKBOX":{let s=tt()(t.modifiedData);ge()(s,[...n.keys.split("..")],n.value),n.value||(s=nt(s)),ge()(r,"modifiedData",s);break}case"ON_CHANGE_TOGGLE_PARENT_CHECKBOX":{const{keys:s,value:i}=n,l=[...s.split("..")];let c=tt()(t.modifiedData);const d=C()(c,l,{}),p=He(d,i);ge()(c,l,p),i||(c=nt(c)),ge()(r,["modifiedData"],c);break}case"RESET_FORM":{r.modifiedData=t.initialData;break}case"SET_FORM_AFTER_SUBMIT":{r.initialData=t.modifiedData;break}default:return r}}),st=t=>Object.entries(t).filter(([,n])=>n).map(([n])=>n),Xn=t=>{const[n,{conditions:r}]=t;return{action:n,subject:null,conditions:st(r),properties:{}}},wn=t=>Object.values(t).reduce((n,r)=>{const s=Object.entries(r).reduce((i,l)=>{const[,{properties:{enabled:c}}]=l;if(!c)return i;const d=Xn(l);return i.push(d),i},[]);return[...n,...s]},[]),Ft=t=>Object.values(t).reduce((n,r)=>{const s=wn(r);return[...n,...s]},[]),Nt=(t,n="")=>Object.entries(t).reduce((r,s)=>{const[i,l]=s;return Ae()(l)?[...r,...Nt(l,`${n}${i}.`)]:(l&&!Ae()(l)&&r.push(`${n}${i}`),r)},[]),Qn=(t,n,{conditions:r,properties:s})=>Object.entries(s).reduce((i,l)=>{const[c,d]=l;return i.properties[c]=Nt(d),i},{action:t,subject:n,conditions:st(r),properties:{}}),Jn=(t,n,{conditions:r})=>({action:t,subject:n,properties:{},conditions:st(r)}),qn=(t,n)=>Object.entries(n).reduce((s,i)=>{const[l,c]=i;if(!Ie(c).some(u=>u))return s;if(!c?.properties?.enabled){const u=Qn(l,t,c);return[...s,u]}if(!c.properties.enabled)return s;const p=Jn(l,t,c);return s.push(p),s},[]),Wt=t=>Object.entries(t).reduce((r,s)=>{const[i,l]=s,c=qn(i,l);return[...r,...c]},[]),_n=t=>{const n=Ft(t.plugins),r=Ft(t.settings),s=Wt(t.collectionTypes),i=Wt(t.singleTypes);return[...n,...r,...s,...i]},es=[{labelId:"app.components.LeftMenuLinkContainer.collectionTypes",defaultMessage:"Collection Types",id:"collectionTypes"},{labelId:"app.components.LeftMenuLinkContainer.singleTypes",id:"singleTypes",defaultMessage:"Single Types"},{labelId:"app.components.LeftMenuLinkContainer.plugins",defaultMessage:"Plugins",id:"plugins"},{labelId:"app.components.LeftMenuLinkContainer.settings",defaultMessage:"Settings",id:"settings"}],ot=(0,e.forwardRef)(({layout:t,isFormDisabled:n,permissions:r},s)=>{const[{initialData:i,layouts:l,modifiedData:c},d]=(0,e.useReducer)(Yn,zn,()=>Hn(t,r)),{formatMessage:p}=(0,F.Z)();(0,e.useImperativeHandle)(s,()=>({getPermissions(){const I=(0,O.e5)(i.collectionTypes,c.collectionTypes),T=(0,O.e5)(i.singleTypes,c.singleTypes),y={...I,...T};let k;return S()(y)?k=!1:k=Object.values(y).some(D=>Object.values(D).some(B=>A()(B,"conditions"))),{permissionsToSend:_n(c),didUpdateConditions:k}},resetForm(){d({type:"RESET_FORM"})},setFormAfterSubmit(){d({type:"SET_FORM_AFTER_SUBMIT"})}}));const u=(I,T,y,k)=>{d({type:"ON_CHANGE_COLLECTION_TYPE_ROW_LEFT_CHECKBOX",pathToCollectionType:I,propertyName:T,rowName:y,value:k})},f=(I,T,y)=>{d({type:"ON_CHANGE_COLLECTION_TYPE_GLOBAL_ACTION_CHECKBOX",collectionTypeKind:I,actionId:T,value:y})},x=I=>{d({type:"ON_CHANGE_CONDITIONS",conditions:I})},$=(0,e.useCallback)(({target:{name:I,value:T}})=>{d({type:"ON_CHANGE_SIMPLE_CHECKBOX",keys:I,value:T})},[]),Z=(0,e.useCallback)(({target:{name:I,value:T}})=>{d({type:"ON_CHANGE_TOGGLE_PARENT_CHECKBOX",keys:I,value:T})},[]);return e.createElement(Tn,{value:{availableConditions:t.conditions,modifiedData:c,onChangeConditions:x,onChangeSimpleCheckbox:$,onChangeParentCheckbox:Z,onChangeCollectionTypeLeftActionRowCheckbox:u,onChangeCollectionTypeGlobalActionCheckbox:f}},e.createElement(h.v,{id:"tabs",label:p({id:"Settings.permissions.users.tabs.label",defaultMessage:"Tabs Permissions"})},e.createElement(R.m,null,es.map(I=>e.createElement(R.O,{key:I.id},p({id:I.labelId,defaultMessage:I.defaultMessage})))),e.createElement(v.n,{style:{position:"relative"}},e.createElement(v.x,null,e.createElement(xt,{layout:l.collectionTypes,kind:"collectionTypes",isFormDisabled:n})),e.createElement(v.x,null,e.createElement(xt,{layout:l.singleTypes,kind:"singleTypes",isFormDisabled:n})),e.createElement(v.x,null,e.createElement(St,{layout:l.plugins,kind:"plugins",isFormDisabled:n})),e.createElement(v.x,null,e.createElement(St,{layout:l.settings,kind:"settings",isFormDisabled:n})))))});ot.defaultProps={permissions:[],layout:{conditions:[],sections:{collectionTypes:{},singleTypes:{actions:[]},settings:[],plugins:[]}}},ot.propTypes={layout:a().object,isFormDisabled:a().bool.isRequired,permissions:a().array};const ts=(0,e.memo)(ot)},63727:(U,L,o)=>{"use strict";o.r(L),o.d(L,{default:()=>xe});var e=o(67294),h=o(51435),R=o(86706),v=o(16550),O=o(36364),P=o(40720),A=o(90731),E=o(96987),S=o(12473),V=o(34726),a=o(16607),F=o(97695),m=o(41054),M=o(86896),N=o(98374),g=o(90065),b=o(24233),z=o(30909),Q=o(10574),oe=o(31988),ee=o(6498),C=o(38670),de=o(457),J=o(45697),te=o.n(J);const Y=({disabled:W,role:w,values:j,errors:_,onChange:re,onBlur:ye})=>{const{formatMessage:G}=(0,M.Z)();return e.createElement(a.x,{background:"neutral0",padding:6,shadow:"filterShadow",hasRadius:!0},e.createElement(E.k,{direction:"column",alignItems:"stretch",gap:4},e.createElement(E.k,{justifyContent:"space-between"},e.createElement(a.x,null,e.createElement(a.x,null,e.createElement(Q.Z,{fontWeight:"bold"},w?w.name:G({id:"global.details",defaultMessage:"Details"}))),e.createElement(a.x,null,e.createElement(Q.Z,{textColor:"neutral500",variant:"pi"},w?w.description:G({id:"Settings.roles.form.description",defaultMessage:"Name and description of the role"})))),e.createElement(S.z,{disabled:!0,variant:"secondary"},G({id:"Settings.roles.form.button.users-with-role",defaultMessage:"{number, plural, =0 {# users} one {# user} other {# users}} with this role"},{number:w.usersCount}))),e.createElement(oe.r,{gap:4},e.createElement(ee.P,{col:6},e.createElement(C.o,{disabled:W,name:"name",error:_.name&&G({id:_.name}),label:G({id:"global.name",defaultMessage:"Name"}),onChange:re,onBlur:ye,required:!0,value:j.name||""})),e.createElement(ee.P,{col:6},e.createElement(de.g,{disabled:W,label:G({id:"global.description",defaultMessage:"Description"}),id:"description",error:_.name&&G({id:_.name}),onChange:re,onBlur:ye},j.description||"")))))};Y.defaultProps={disabled:!1,role:null,values:{name:"",description:""}},Y.propTypes={disabled:te().bool,errors:te().object.isRequired,onBlur:te().func.isRequired,onChange:te().func.isRequired,role:te().object,values:te().object};const ue=Y;var be=o(87561);const ce=be.Ry().shape({name:be.Z_().required(h.I0.required)}),Te=()=>{const W=(0,h.lm)(),{formatMessage:w}=(0,M.Z)(),{params:{id:j}}=(0,v.$B)("/settings/roles/:id"),{put:_}=(0,h.kY)(),[re,ye]=(0,e.useState)(!1),G=(0,e.useRef)(),{lockApp:Re,unlockApp:he}=(0,h.o1)(),{trackUsage:Be}=(0,h.rS)(),{formatAPIError:Ce}=(0,h.So)(),{isLoading:Fe,data:Ne}=(0,g.d)(j,{cacheTime:0}),{roles:[pe={}],isLoading:Pe,refetch:We}=(0,N.F)({id:j},{cacheTime:0}),{permissions:Ze,isLoading:Se}=(0,b.V)({id:j},{cacheTime:0}),ae=async Ee=>{try{Re(),ye(!0);const{permissionsToSend:ne,didUpdateConditions:Me}=G.current.getPermissions();await _(`/admin/roles/${j}`,Ee),pe.code!=="strapi-super-admin"&&(await _(`/admin/roles/${j}/permissions`,{permissions:ne}),Me&&Be("didUpdateConditions")),G.current.setFormAfterSubmit(),await We(),W({type:"success",message:{id:"notification.success.saved"}})}catch(ne){W({type:"warning",message:Ce(ne)})}finally{ye(!1),he()}},le=!Pe&&pe.code==="strapi-super-admin";return e.createElement(P.o,null,e.createElement(h.SL,{name:"Roles"}),e.createElement(m.J9,{enableReinitialize:!0,initialValues:{name:pe.name,description:pe.description},onSubmit:ae,validationSchema:ce,validateOnChange:!1},({handleSubmit:Ee,values:ne,errors:Me,handleChange:je,handleBlur:rt})=>e.createElement("form",{onSubmit:Ee},e.createElement(A.T,{primaryAction:e.createElement(E.k,{gap:2},e.createElement(S.z,{disabled:pe.code==="strapi-super-admin",onClick:Ee,loading:re,size:"L"},w({id:"global.save",defaultMessage:"Save"}))),title:w({id:"Settings.roles.edit.title",defaultMessage:"Edit a role"}),subtitle:w({id:"Settings.roles.create.description",defaultMessage:"Define the rights given to the role"}),navigationAction:e.createElement(h.rU,{startIcon:e.createElement(F.Z,null),to:"/settings/roles"},w({id:"global.back",defaultMessage:"Back"}))}),e.createElement(V.D,null,e.createElement(E.k,{direction:"column",alignItems:"stretch",gap:6},e.createElement(ue,{isLoading:Pe||Se,disabled:le,errors:Me,values:ne,onChange:je,onBlur:rt,role:pe}),!Fe&&!Pe&&!Se?e.createElement(a.x,{shadow:"filterShadow",hasRadius:!0},e.createElement(z.Z,{isFormDisabled:le,permissions:Ze,ref:G,layout:Ne})):e.createElement(a.x,{background:"neutral0",padding:6,shadow:"filterShadow",hasRadius:!0},e.createElement(h.dO,null)))))))},xe=()=>{const W=(0,R.v9)(O._),{isLoading:w,allowedActions:{canRead:j,canUpdate:_}}=(0,h.ss)({read:W.settings.roles.read,update:W.settings.roles.update});return w?e.createElement(h.dO,null):!j&&!_?e.createElement(v.l_,{to:"/"}):e.createElement(Te,null)}},90065:(U,L,o)=>{"use strict";o.d(L,{d:()=>R});var e=o(51435),h=o(88767);const R=(v,O={})=>{const{get:P}=(0,e.kY)(),{data:A,error:E,isError:S,isLoading:V}=(0,h.useQuery)(["permissions",v],async()=>{const{data:{data:a}}=await P("/admin/permissions",{params:{role:v}});return a},O);return{data:A,error:E,isError:S,isLoading:V}}},44174:U=>{function L(o,e,h,R){for(var v=-1,O=o==null?0:o.length;++v<O;){var P=o[v];e(R,P,h(P),o)}return R}U.exports=L},81119:(U,L,o)=>{var e=o(89881);function h(R,v,O,P){return e(R,function(A,E,S){v(P,A,O(A),S)}),P}U.exports=h},9872:(U,L,o)=>{var e=o(44174),h=o(81119),R=o(67206),v=o(1469);function O(P,A){return function(E,S){var V=v(E)?e:h,a=A?A():{};return V(E,P,R(S,2),a)}}U.exports=O},42348:(U,L,o)=>{var e=o(21078),h=1/0;function R(v){var O=v==null?0:v.length;return O?e(v,h):[]}U.exports=R},7739:(U,L,o)=>{var e=o(89465),h=o(9872),R=Object.prototype,v=R.hasOwnProperty,O=h(function(P,A,E){v.call(P,E)?P[E].push(A):e(P,E,[A])});U.exports=O},63122:(U,L,o)=>{"use strict";o.d(L,{U:()=>F,y:()=>V});var e=o(85893),h=o(67294),R=o(1565),v=o(31254),O=o(92058),P=o(10574),A=o(96987),E=o(16607);const S=({theme:m,expanded:M,variant:N,disabled:g,error:b})=>b?`1px solid ${m.colors.danger600} !important`:g?`1px solid ${m.colors.neutral150}`:M?`1px solid ${m.colors.primary600}`:N==="primary"?`1px solid ${m.colors.neutral0}`:`1px solid ${m.colors.neutral100}`,V=(0,R.default)(P.Z)``,a=(0,R.default)(E.x)`
  border: ${S};

  &:hover:not([aria-disabled='true']) {
    border: 1px solid ${({theme:m})=>m.colors.primary600};

    ${V} {
      color: ${({theme:m,expanded:M})=>M?void 0:m.colors.primary700};
    }

    ${P.Z} {
      color: ${({theme:m,expanded:M})=>M?void 0:m.colors.primary600};
    }

    & > ${A.k} {
      background: ${({theme:m})=>m.colors.primary100};
    }

    [data-strapi-dropdown='true'] {
      background: ${({theme:m})=>m.colors.primary200};
    }
  }
`,F=({children:m,disabled:M=!1,error:N,expanded:g=!1,hasErrorMessage:b=!0,id:z,onToggle:Q,toggle:oe,size:ee="M",variant:C="primary",shadow:de})=>{const J=(0,O.M)(z),te=h.useMemo(()=>({expanded:g,onToggle:Q,toggle:oe,id:J,size:ee,variant:C,disabled:M}),[M,g,J,Q,ee,oe,C]);return(0,e.jsxs)(v.S.Provider,{value:te,children:[(0,e.jsx)(a,{"data-strapi-expanded":g,disabled:M,"aria-disabled":M,expanded:g,hasRadius:!0,variant:C,error:N,shadow:de,children:m}),N&&b&&(0,e.jsx)(E.x,{paddingTop:1,children:(0,e.jsx)(P.Z,{variant:"pi",textColor:"danger600",children:N})})]})}},68889:(U,L,o)=>{"use strict";o.d(L,{v:()=>v});var e=o(85893),h=o(31254),R=o(16607);const v=({children:O,...P})=>{const{expanded:A,id:E}=(0,h.A)();if(!A)return null;const S=`accordion-content-${E}`,V=`accordion-label-${E}`,a=`accordion-desc-${E}`;return(0,e.jsx)(R.x,{role:"region",id:S,"aria-labelledby":V,"aria-describedby":a,...P,children:O})}},31254:(U,L,o)=>{"use strict";o.d(L,{A:()=>R,S:()=>h});var e=o(67294);const h=(0,e.createContext)({disabled:!1,expanded:!1,id:"",size:"M",variant:"primary"}),R=()=>(0,e.useContext)(h)},1744:(U,L,o)=>{"use strict";o.d(L,{B:()=>m});var e=o(85893),h=o(58471),R=o(1565),v=o(63122),O=o(31254);const P=({expanded:M,disabled:N,variant:g})=>{let b="neutral100";return M?b="primary100":N?b="neutral150":g==="primary"&&(b="neutral0"),b};var A=o(58753),E=o(85200),S=o(96987),V=o(10574);const a=(0,R.default)(A.A)`
  text-align: left;

  // necessary to make the ellipsis prop work on the title
  > span {
    max-width: 100%;
  }

  svg {
    width: ${14/16}rem;
    height: ${14/16}rem;

    path {
      fill: ${({theme:M,expanded:N})=>N?M.colors.primary600:M.colors.neutral500};
    }
  }
`,F=(0,R.default)(S.k)`
  min-height: ${({theme:M,size:N})=>M.sizes.accordions[N]};
  border-radius: ${({theme:M,expanded:N})=>N?`${M.borderRadius} ${M.borderRadius} 0 0`:M.borderRadius};

  &:hover {
    svg {
      path {
        fill: ${({theme:M})=>M.colors.primary600};
      }
    }
  }
`,m=({title:M,description:N,as:g="span",togglePosition:b="right",action:z,...Q})=>{const{onToggle:oe,toggle:ee,expanded:C,id:de,size:J,variant:te,disabled:Y}=(0,O.A)(),ue=`accordion-content-${de}`,be=`accordion-label-${de}`,Le=`accordion-desc-${de}`,ce=J==="M"?6:4,me=J==="M"?ce:ce-2,Te=P({expanded:C,disabled:Y,variant:te}),xe={as:g,fontWeight:J==="S"?"bold":void 0,id:be,textColor:C?"primary600":"neutral700",ellipsis:!0,variant:J==="M"?"delta":void 0},W=C?"primary600":"neutral600",w=C?"primary200":"neutral200",j=J==="M"?`${32/16}rem`:`${24/16}rem`,_=()=>{Y||(ee&&!oe?(console.warn('Deprecation warning: Usage of "toggle" prop in Accordion component is deprecated. This is discouraged and will be removed in the next major release. Please use "onToggle" instead'),ee()):oe&&oe())},re=(0,e.jsx)(S.k,{justifyContent:"center",borderRadius:"50%",height:j,width:j,transform:C?"rotate(180deg)":void 0,"data-strapi-dropdown":!0,"aria-hidden":!0,as:"span",background:w,cursor:Y?"not-allowed":"pointer",onClick:_,shrink:0,children:(0,e.jsx)(E.J,{as:h.Z,width:J==="M"?`${11/16}rem`:`${8/16}rem`,color:C?"primary600":"neutral600"})});return(0,e.jsx)(F,{paddingBottom:me,paddingLeft:ce,paddingRight:ce,paddingTop:me,background:Te,expanded:C,size:J,justifyContent:"space-between",cursor:Y?"not-allowed":"",children:(0,e.jsxs)(S.k,{gap:3,flex:1,maxWidth:"100%",children:[b==="left"&&re,(0,e.jsx)(a,{onClick:_,"aria-disabled":Y,"aria-expanded":C,"aria-controls":ue,"aria-labelledby":be,"data-strapi-accordion-toggle":!0,expanded:C,type:"button",flex:1,minWidth:0,...Q,children:(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(v.y,{...xe,children:M}),N&&(0,e.jsx)(V.Z,{as:"p",id:Le,textColor:W,children:N})]})}),b==="right"&&(0,e.jsxs)(S.k,{gap:3,children:[re,z]}),b==="left"&&z]})})}},13814:(U,L,o)=>{"use strict";o.d(L,{Q:()=>v});var e=o(85893),h=o(1565),R=o(82832);const v=({options:P,...A})=>(0,e.jsx)(R.NU,{...A,children:P.map(E=>"children"in E?(0,e.jsx)(R.Ab,{label:E.label,values:E.children.map(S=>S.value.toString()),children:E.children.map(S=>(0,e.jsx)(O,{value:S.value,children:S.label},S.value))},E.label):(0,e.jsx)(R.ML,{value:E.value,children:E.label},E.value))}),O=(0,h.default)(R.ML)`
  padding-left: ${({theme:P})=>P.spaces[7]};
`}}]);
