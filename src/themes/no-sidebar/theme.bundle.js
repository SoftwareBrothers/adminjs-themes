var THEME_COMPONENTS=function(e,t,n,l,r,a){"use strict";const o=()=>{const e=r.useSelector((e=>e.resources)),{pathname:o}=a.useLocation(),m=n.useNavigationResources(e),s=l.useCallback((({href:e,elements:t})=>e?e===o:t?.map((e=>e.href)).includes(o)),[o]);return l.createElement(t.Box,{as:"nav",flex:!0,alignItems:"center"},m.map((e=>l.createElement(t.DropDown,{key:e.label},l.createElement(t.DropDownTrigger,null,l.createElement(t.Button,{color:s(e)?"primary":"text"},l.createElement(t.Icon,{icon:e.icon}),e.label)),l.createElement(t.DropDownMenu,null,e.elements?.map((e=>l.createElement(c,{key:e.href,element:e}))))))))},c=({element:{href:e,label:n,icon:r,elements:a}})=>l.createElement(t.DropDownItem,{as:"a",href:e},r&&l.createElement(t.Icon,{icon:r}),n,a?.length?l.createElement(t.DropDownMenu,null,a.map((e=>l.createElement(c,{key:e.href,element:e})))):null),m=l.memo(o),s=new n.ViewHelpers;return e.Sidebar=()=>null,e.TopBar=()=>{const e=r.useSelector((e=>e.session)),a=r.useSelector((e=>e.branding)),{logo:o,companyName:c}=a,{tb:i}=n.useTranslation(),u=[{label:i("logout"),href:s.logoutUrl(),icon:"LogOut"}];return l.createElement(t.Box,{flex:!0,flexDirection:"row",alignItems:"center",height:"navbarHeight",bg:"container"},l.createElement(t.Box,{as:"a",href:s.dashboardUrl(),mx:"xl"},o?l.createElement("img",{src:o,alt:c}):l.createElement("h1",null,c)),l.createElement(m,null),l.createElement(t.Box,{as:"div",flex:!0,flexGrow:1}),e&&l.createElement(t.CurrentUserNav,{name:e.email,title:e.title,avatarUrl:e.avatarUrl,dropActions:u}))},e}({},AdminJSDesignSystem,AdminJS,React,ReactRedux,ReactRouter);
