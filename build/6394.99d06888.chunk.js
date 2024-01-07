"use strict";(self.webpackChunkstl_emporium=self.webpackChunkstl_emporium||[]).push([[6394],{84409:(R,o,e)=>{e.d(o,{p:()=>d});var t=e(67294),u=e(51435),_=e(88767);const d=(m={})=>{const{get:E}=(0,u.kY)(),{data:n,isLoading:a}=(0,_.useQuery)(["ee","providers"],async()=>{const{data:P}=await E("/admin/providers");return P},m);return{providers:t.useMemo(()=>n??[],[n]),isLoading:a}}},76394:(R,o,e)=>{e.r(o),e.d(o,{LoginEE:()=>l});var t=e(67294),u=e(26910),_=e(16607),d=e(96987),m=e(10574),E=e(45697),n=e.n(E),a=e(86896),D=e(1565),P=e(50745),O=e(31640),M=e(84409),v=e(80090);const i=(0,D.default)(u.i)`
  flex: 1;
`,l=c=>{const{formatMessage:s}=(0,a.Z)(),{isLoading:p,providers:g}=(0,M.p)({enabled:window.strapi.features.isEnabled(window.strapi.features.SSO)});return!window.strapi.features.isEnabled(window.strapi.features.SSO)||!p&&g.length===0?t.createElement(P.ZP,null,t.createElement(O.Z,{...c})):t.createElement(P.ZP,null,t.createElement(O.Z,{...c},t.createElement(_.x,{paddingTop:7},t.createElement(d.k,{direction:"column",alignItems:"stretch",gap:7},t.createElement(d.k,null,t.createElement(i,null),t.createElement(_.x,{paddingLeft:3,paddingRight:3},t.createElement(m.Z,{variant:"sigma",textColor:"neutral600"},s({id:"Auth.login.sso.divider"}))),t.createElement(i,null)),t.createElement(v.Z,{providers:g,displayAllProviders:!1})))))};l.defaultProps={onSubmit:c=>c.preventDefault(),requestError:null},l.propTypes={formErrors:n().object.isRequired,modifiedData:n().object.isRequired,onChange:n().func.isRequired,onSubmit:n().func,requestError:n().object}},80090:(R,o,e)=>{e.d(o,{Z:()=>c});var t=e(67294),u=e(96987),_=e(81315),d=e(10574),m=e(31988),E=e(6498),n=e(45697),a=e.n(n),D=e(86896),P=e(73727),O=e(1565);const M=O.default.a`
  width: ${136/16}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${48/16}rem;
  border: 1px solid ${({theme:s})=>s.colors.neutral150};
  border-radius: ${({theme:s})=>s.borderRadius};
  text-decoration: inherit;
  &:link {
    text-decoration: none;
  }
  color: ${({theme:s})=>s.colors.neutral600};
`,v=(0,O.default)(u.k)`
  & a:not(:first-child):not(:last-child) {
    margin: 0 ${({theme:s})=>s.spaces[2]};
  }
  & a:first-child {
    margin-right: ${({theme:s})=>s.spaces[2]};
  }
  & a:last-child {
    margin-left: ${({theme:s})=>s.spaces[2]};
  }
`,i=({provider:s})=>t.createElement(_.u,{label:s.displayName},t.createElement(M,{href:`${window.strapi.backendURL}/admin/connect/${s.uid}`},s.icon?t.createElement("img",{src:s.icon,"aria-hidden":!0,alt:"",height:"32px"}):t.createElement(d.Z,null,s.displayName)));i.propTypes={provider:a().shape({icon:a().string,displayName:a().string.isRequired,uid:a().string.isRequired}).isRequired};const l=({providers:s,displayAllProviders:p})=>{const{formatMessage:g}=(0,D.Z)();return p?t.createElement(m.r,{gap:4},s.map(r=>t.createElement(E.P,{key:r.uid,col:4},t.createElement(i,{provider:r})))):s.length>2&&!p?t.createElement(m.r,{gap:4},s.slice(0,2).map(r=>t.createElement(E.P,{key:r.uid,col:4},t.createElement(i,{provider:r}))),t.createElement(E.P,{col:4},t.createElement(_.u,{label:g({id:"global.see-more"})},t.createElement(M,{as:P.rU,to:"/auth/providers"},t.createElement("span",{"aria-hidden":!0},"\u2022\u2022\u2022"))))):t.createElement(v,{justifyContent:"center"},s.map(r=>t.createElement(i,{key:r.uid,provider:r})))};l.defaultProps={displayAllProviders:!0},l.propTypes={providers:a().arrayOf(a().object).isRequired,displayAllProviders:a().bool};const c=l}}]);
