(this.webpackJsonpmtzger=this.webpackJsonpmtzger||[]).push([[0],{261:function(t,e){},534:function(t,e,n){},535:function(t,e,n){},536:function(t,e,n){},538:function(t,e,n){},539:function(t,e,n){},551:function(t,e){},553:function(t,e){},560:function(t,e){},562:function(t,e){},584:function(t,e){},586:function(t,e){},614:function(t,e){},616:function(t,e){},617:function(t,e){},622:function(t,e){},624:function(t,e){},643:function(t,e){},655:function(t,e){},658:function(t,e){},752:function(t,e){},865:function(t,e){},989:function(t,e,n){},990:function(t,e,n){},991:function(t,e,n){},993:function(t,e,n){},994:function(t,e,n){"use strict";n.r(e);var s=n(2),a=n.n(s),o=n(44),i=n.n(o),r=(n(534),n(114)),c=n(47),u=(n(535),n(5)),l=n(10),d=n(8),p=n(9),j=(n(536),n(11)),m=n.n(j),h=n(95),b=(n(538),n(522)),A=n.n(b),f=n(1030),O=(n(539),n(3));var x=function(t){return Object(O.jsxs)("div",{className:"posts_addPostModal",id:t.id,children:[Object(O.jsx)("div",{className:"posts_addPostModal_background",onClick:function(){document.querySelector("#"+t.id).style.display="none"}}),Object(O.jsxs)("div",{className:"posts_addPostModal_foreground",children:[Object(O.jsx)("div",{className:"modal_close_icon",onClick:function(){document.querySelector("#"+t.id).style.display="none"},children:"x"}),Object(O.jsx)("h1",{className:"modal_title",children:t.title}),t.children]})]})},y=n(1028),g=n(1029),v=n(130),S=n(224),P=v.a.initializeApp({apiKey:"AIzaSyDHMPzv_GApJUnYWZ32DkQwzelmvLFqksM",authDomain:"mtzger-d5e6c.firebaseapp.com",databaseURL:"https://mtzger-d5e6c.firebaseio.com",projectId:"mtzger-d5e6c",storageBucket:"mtzger-d5e6c.appspot.com",messagingSenderId:"45726699749",appId:"1:45726699749:web:05b7da68c3498e6d98840c",measurementId:"G-0D8F82834Y"});S.initializeApp({credential:S.credential.applicationDefault(),databaseURL:"https://mtzger-d5e6c.firebaseio.com"});var w,B,U,F,M,C,G,N,q,R,E,k,z=P.firestore(),L=v.a.auth(),X=(v.a.storage(),new v.a.auth.GoogleAuthProvider),W=function(t){Object(d.a)(n,t);var e=Object(p.a)(n);function n(t){var s;return Object(u.a)(this,n),(s=e.call(this,t)).authChanged=function(t){return L.onAuthStateChanged(function(){var t=Object(h.a)(m.a.mark((function t(e){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e&&1==e.emailVerified?s.setState({authUser:e}):s.setState({authUser:null});case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},s.state={authUser:null},s}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.authChanged(),console.log(S.auth().listUsers().then((function(t){t.users.forEach((function(t){console.log("user: ",t.displayName)}))})))}},{key:"componentWillUnmount",value:function(){}},{key:"signInWithGoogle",value:function(){var t=this;this.setInputEmpty(),L.signInWithPopup(X).then((function(){return t.setInputEmpty()})).catch((function(t){return alert(t.message)}))}},{key:"signIn",value:function(t){var e=this;t.preventDefault(),L.signInWithEmailAndPassword(t.target.email.value,t.target.password.value).then((function(t){1==t.emailVerified&&e.setState({authUser:t}),e.setInputEmpty()})).catch((function(t){return alert(t.message)}))}},{key:"signUp",value:function(){var t=Object(h.a)(m.a.mark((function t(e){var n,s,a,o,i=this;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.preventDefault(),n=e.target.username.value,s=e.target.email.value,a=e.target.password.value,o=e.target.con_password.value,this.checkUsernameExists(n,(function(t){1==t?alert("Username already exists!"):0==t?""!==n&&""!==s&&""!==a?a==o?(L.createUserWithEmailAndPassword(s,a).then((function(t){return t.user.updateProfile({displayName:n})})).then(Object(h.a)(m.a.mark((function t(){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,z.collection("users").add({displayName:n});case 2:L.currentUser.sendEmailVerification().then((function(){alert("Check your emails.\nYou should got a email from us.\nGo to the link to sign up.")}));case 3:case"end":return t.stop()}}),t)})))).catch((function(t){return alert(t.message)})).then((function(){i.setInputEmpty()})),i.setInputEmpty()):alert("Password and confirm password are not the same!"):alert("Username, email or password is empty!"):alert("Error! Try again.")}));case 6:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"checkUsernameExists",value:function(t,e){return z.collection("users").onSnapshot((function(n){n.docs.map((function(t){return t.data().displayName})).includes(t)?e(!0):e(!1)})),!1}},{key:"setInputEmpty",value:function(){window.innerWidth<=415&&(document.querySelectorAll(".title_bar")[0].style.display="none"),document.querySelectorAll(".posts_addPostModal").forEach((function(t){t.style.display="none"})),window.innerWidth<=1012&&(document.querySelector(".title_bar").style.display="none"),document.querySelectorAll("input").forEach((function(t){t.value=""})),document.querySelectorAll("textarea").forEach((function(t){t.value=""}))}},{key:"checkAvatar",value:function(){return null!==this.state.authUser?Object(O.jsx)(f.a,{src:"/static/images/avatar/1.jpg",alt:this.state.authUser.displayName,id:"title_username"}):Object(O.jsx)(f.a,{src:"",id:"title_username"})}},{key:"isAuthenticated",value:function(){var t=this;return null==this.state.authUser?Object(O.jsxs)("div",{children:[Object(O.jsx)("h4",{onClick:function(){return document.querySelector("#modal_sign_in").style.display="block"},children:"Sign in"}),Object(O.jsx)("h4",{id:"sign_up",onClick:function(){return document.querySelector("#modal_sign_up").style.display="block"},children:"Sign up"})]}):Object(O.jsxs)("div",{children:[Object(O.jsx)("h4",{children:this.state.authUser.displayName}),Object(O.jsx)("h4",{id:"sign_out",onClick:function(){L.signOut(),t.setInputEmpty()},children:"Sign out"})]})}},{key:"render",value:function(){var t=this;return Object(O.jsxs)("div",{className:"title_background",children:[Object(O.jsx)("h1",{id:"main_title_left",children:this.props.left_title}),Object(O.jsx)("h1",{id:"main_title_middle",children:this.props.middle_title}),Object(O.jsx)(A.a,{id:"menu_icon",onClick:function(){return document.querySelectorAll(".title_bar")[0].style.display="block"}}),this.checkAvatar(),Object(O.jsxs)("div",{className:"title_bar",children:[Object(O.jsx)("div",{id:"close_icon_title_bar",onClick:function(){return document.querySelectorAll(".title_bar")[0].style.display="none"},children:"x"}),this.isAuthenticated()]}),Object(O.jsx)(x,{title:"Sign up",id:"modal_sign_up",children:Object(O.jsxs)("form",{onSubmit:function(e){return t.signUp(e)},children:[Object(O.jsx)(y.a,{type:"text",label:"Username",className:"addInputs",name:"username"}),Object(O.jsx)(y.a,{type:"text",label:"Emailadress",className:"addInputs",name:"email"}),Object(O.jsx)(y.a,{type:"password",label:"Password",className:"addInputs",name:"password"}),Object(O.jsx)(y.a,{type:"password",label:"Confirm Password",className:"addInputs",name:"con_password"}),Object(O.jsx)("button",{onClick:function(){return t.signInWithGoogle()},className:"plus_sign",children:"Sign up with Google"}),Object(O.jsx)(g.a,{type:"submit",id:"addPostButton",children:"Sign up"})]})}),Object(O.jsx)(x,{title:"Sign in",id:"modal_sign_in",children:Object(O.jsxs)("form",{onSubmit:function(e){return t.signIn(e)},children:[Object(O.jsx)(y.a,{type:"text",label:"Emailadress",className:"addInputs",name:"email"}),Object(O.jsx)(y.a,{type:"Password",label:"Password",className:"addInputs",name:"password"}),Object(O.jsx)("button",{onClick:function(){return t.signInWithGoogle()},className:"plus_sign",children:"Sign in with Google"}),Object(O.jsx)(g.a,{type:"submit",id:"addPostButton",children:"Sign in"})]})})]})}}]),n}(a.a.Component),V=function(t){Object(d.a)(n,t);var e=Object(p.a)(n);function n(){return Object(u.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(O.jsxs)("div",{className:"Home",children:[Object(O.jsx)(W,{middle_title:"Home"}),Object(O.jsxs)("div",{className:"home_top_background",children:[Object(O.jsx)("h1",{id:"home_title",children:"mtzger"}),Object(O.jsxs)("div",{className:"home_top_titles",children:[Object(O.jsx)(r.b,{to:mt+"/posts",children:Object(O.jsx)("h1",{children:"Posting"})}),Object(O.jsx)(r.b,{to:mt+"/chats",children:Object(O.jsx)("h1",{children:"Chatting"})}),Object(O.jsx)(r.b,{to:mt+"/meetings",children:Object(O.jsx)("h1",{children:"Meeting"})}),Object(O.jsx)(r.b,{to:mt+"/catchForestFruit",children:Object(O.jsx)("h1",{children:"catchForestFruit"})})]})]}),Object(O.jsxs)("div",{className:"zoom_properties",children:[Object(O.jsx)("h1",{children:"Posting"}),Object(O.jsx)("h1",{children:"Chatting"}),Object(O.jsx)("h1",{children:"Meeting"}),Object(O.jsx)("h1",{children:"About"})]})]})}}]),n}(s.Component),Q=function(t){Object(d.a)(n,t);var e=Object(p.a)(n);function n(t){var s;return Object(u.a)(this,n),(s=e.call(this,t)).state={post_element:""},s}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var t=Object(h.a)(m.a.mark((function t(){var e=this;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.setState({post_element:document.querySelectorAll(".post")});case 2:document.querySelector("#addNewPost").scrollIntoView(),L.onAuthStateChanged((function(t){t?e.setState({authUser:t}):e.setState({authUser:null})}));case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this;return Object(O.jsxs)("div",{className:"post",children:[Object(O.jsxs)("div",{className:"post_avatar",children:[Object(O.jsx)(f.a,{src:"/static/images/avatar/1.jpg",alt:this.props.doc.user}),Object(O.jsx)("h1",{className:"post_user",onClick:function(){return t.props.changeToUserPage(t.props.doc.user)},children:this.props.doc.user})]}),Object(O.jsx)("h2",{className:"post_message",children:this.props.doc.message}),Object(O.jsx)("img",{className:"post_img",src:this.props.doc.imgUrl}),Object(O.jsx)("h5",{className:"post_caption",children:this.props.doc.caption})]})}}]),n}(s.Component),Y=(n(989),function(t){Object(d.a)(n,t);var e=Object(p.a)(n);function n(){var t;return Object(u.a)(this,n),(t=e.call(this)).state={authUser:null,posts:[],addCaption:"",addImgUrl:"",addMessage:""},t}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var t=this;z.collection("posts").orderBy("timestamp","asc").onSnapshot((function(e){t.setState({posts:e.docs.map((function(t){return{id:t.id,post_data:t.data()}}))})})),L.onAuthStateChanged((function(e){e&&1==e.emailVerified&&t.setState({authUser:e})})),document.querySelector("#addNewPost").scrollIntoView()}},{key:"addNewPost",value:function(){var t=Object(h.a)(m.a.mark((function t(){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null!=this.state.authUser){t.next=3;break}return alert("To send make post, you have to sign in!"),t.abrupt("return","");case 3:if(document.querySelector("#addNewPostModal").style.display="none",""!=this.state.addMessage||""!=this.state.addImgUrl||""!=this.state.addCaption){t.next=7;break}return alert("Empty message!"),t.abrupt("return","");case 7:return t.next=9,z.collection("posts").add({timestamp:v.a.firestore.FieldValue.serverTimestamp(),user:this.state.authUser.displayName,message:this.state.addMessage,caption:this.state.addCaption,imgUrl:this.state.addImgUrl});case 9:this.setState({addCaption:"",addImgUrl:"",addMessage:""}),document.querySelectorAll("input").forEach((function(t){t.value=""})),document.querySelectorAll("textarea").forEach((function(t){t.value=""}));case 12:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"changeToUserPage",value:function(t){null==this.state.authUser?alert("You have to sign in to watch this user!"):this.props.history.push({pathname:mt+"/posts/users/"+t})}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var t,e=this;return window.addEventListener("scroll",(function(e){t=window.scrollY})),window.addEventListener("orientationchange",(function(e){t,setTimeout((function(){document.querySelector("#addNewPost").scrollIntoView()}),500),document.querySelector("#addNewPost").scrollIntoView()})),Object(O.jsxs)("div",{className:"Posts",children:[Object(O.jsx)(W,{middle_title:"Posts",authUser:this.state.authUser}),this.state.posts.map((function(t){return Object(O.jsx)(Q,{doc:t.post_data,changeToUserPage:function(t){return e.changeToUserPage(t)}})})),Object(O.jsxs)(x,{title:"Add new Post",id:"addNewPostModal",children:[Object(O.jsx)(y.a,{type:"text",label:"ImageUrl",onChange:function(t){return e.setState({addImgUrl:t.target.value})},className:"addInputs"}),Object(O.jsx)(y.a,{type:"text",label:"Caption",onChange:function(t){return e.setState({addCaption:t.target.value})},className:"addInputs"}),Object(O.jsx)("textarea",{type:"text",name:"message",className:"addMessage",placeholder:"Message",onChange:function(t){return e.setState({addMessage:t.target.value})}}),Object(O.jsx)(g.a,{id:"addPostButton",onClick:function(){return e.addNewPost()},className:"addNewPostButtonUnique",children:"Send"})]}),Object(O.jsx)(g.a,{id:"addNewPost",onClick:function(){document.querySelector("#addNewPostModal").style.display="block",document.querySelector("#addNewPostModal").style.animation="modal_appears 0.5s"},children:"Add new Post"}),Object(O.jsx)("br",{})]})}}]),n}(a.a.Component)),J=function(t){Object(d.a)(n,t);var e=Object(p.a)(n);function n(){return Object(u.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(O.jsx)("div",{})}}]),n}(s.Component),T=(n(990),s.Component,n(15)),H=n(189),D=(n(991),n.p+"static/media/grasslight-big.b100e352.jpg"),I="data:image/png;base64,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",K=n(28),Z=.075,_=!1,$=[];function tt(t){var e=new T.Vector3(0,q,0),n=new T.Raycaster(R.current.position,e).intersectObjects($);return"get"==t?n:n.length>0}function et(t){var e=Object(s.useRef)(),n=Object(H.b)().setDefaultCamera;return Object(s.useEffect)((function(){n(e.current)}),[]),Object(O.jsx)("perspectiveCamera",Object(K.a)({ref:e},t))}document.addEventListener("pointerlockchange",(function(){_=null!=document.pointerLockElement}));var nt=function(t){var e=tt("get");e.forEach((function(t){R.current.position.z>t.object.position.z+t.object.geometry.parameters.depth/2-.75&&(R.current.position.z+=.075),R.current.position.z<t.object.position.z-t.object.geometry.parameters.depth/2+.75&&(R.current.position.z-=.075),R.current.position.x>t.object.position.x+t.object.geometry.parameters.depth/2-.75&&(R.current.position.x+=.075),R.current.position.x<t.object.position.x-t.object.geometry.parameters.depth/2+.75&&(R.current.position.x-=.075)}))},st=new T.Clock(!0);function at(){requestAnimationFrame(at);try{if(B.w&&(R.current.translateZ(-.075),1==tt()&&nt()),B.s&&(R.current.translateZ(Z),1==tt()&&nt()),B.a&&(R.current.translateX(-.075),1==tt()&&nt()),B.d&&(R.current.translateX(Z),1==tt()&&nt()),k.lookAt(R.current.position),F.current.rotation.z+=.25,B.w||B.s||B.a||B.d){var t=.55*Math.sin(8*st.getElapsedTime());M.current.position.z=t,C.current.position.z=-t,G.current.position.z=-t,N.current.position.z=t}}catch(e){console.log(e)}}var ot,it=function(t){var e=Object(H.b)(),n=e.camera;return e.gl,$=t.not_allowed,w=t.avatar,R=Object(s.useRef)(),E=Object(s.useRef)(),n.position.z,n.position.y,B=t.keys,q=t.ground_height,w=Object(s.useRef)(),U=Object(s.useRef)(),F=Object(s.useRef)(),M=Object(s.useRef)(),C=Object(s.useRef)(),G=Object(s.useRef)(),N=Object(s.useRef)(),k=n,Object(s.useEffect)((function(){$=$.map((function(t){return t.current}))})),document.body.addEventListener("mousemove",(function(t){if(0!=_&&void 0!==R&&void 0!==R.current){R.current.rotation.y-=2*Math.PI*t.movementX/1800*.5;var e=2*Math.PI*t.movementY/1800*.5;E.current.rotation.x-=e,w.current.rotation.x+=e,E.current.rotation.x<=-Math.PI/2+.2&&(E.current.rotation.x+=e,w.current.rotation.x-=e),E.current.rotation.x>.3&&(E.current.rotation.x+=e,w.current.rotation.x-=e)}})),at(),Object(O.jsxs)(O.Fragment,{children:[t.children,Object(O.jsx)("group",{ref:R,position:[0,0,20],children:Object(O.jsxs)("group",{ref:E,children:[Object(O.jsxs)("group",{ref:w,rotation:[0,Math.PI,0],children:[Object(O.jsxs)("mesh",{position:[0,0,0],castShadow:!0,children:[Object(O.jsx)("sphereGeometry",{args:[1,10,10]}),Object(O.jsx)("meshNormalMaterial",{attach:"material"})]}),Object(O.jsxs)("mesh",{ref:C,position:[1.5,0,0],children:[Object(O.jsx)("sphereGeometry",{args:[.5,10,10]}),Object(O.jsx)("meshNormalMaterial",{attach:"material"})]}),Object(O.jsxs)("mesh",{ref:N,position:[1,-1,0],children:[Object(O.jsx)("sphereGeometry",{args:[.5,10,10]}),Object(O.jsx)("meshNormalMaterial",{attach:"material"})]}),Object(O.jsxs)("mesh",{ref:G,position:[-1,-1,0],children:[Object(O.jsx)("sphereGeometry",{args:[.5,10,10]}),Object(O.jsx)("meshNormalMaterial",{attach:"material"})]}),Object(O.jsxs)("group",{ref:M,position:[0,0,0],children:[Object(O.jsxs)("mesh",{position:[-1.25,0,0],rotation:[0,0,Math.PI/2],children:[Object(O.jsx)("cylinderGeometry",{args:[.1,.1,1]}),Object(O.jsx)("meshNormalMaterial",{attach:"material"})]}),Object(O.jsxs)("mesh",{castShadow:!0,position:[-1.4,-.1,0],ref:U,children:[Object(O.jsx)("boxBufferGeometry",{args:[.8,.8,.8]}),Object(O.jsx)("meshStandardMaterial",{attach:"material",color:"darkred"})]}),Object(O.jsxs)("mesh",{castShadow:!0,position:[-1.4,-.1,.5],ref:F,children:[Object(O.jsx)("boxBufferGeometry",{args:[.3,.3,1.5]}),Object(O.jsx)("meshStandardMaterial",{attach:"material",color:"red"})]})]})]}),Object(O.jsx)(et,{position:[0,1,7.5]})]})})]})},rt=[],ct=-1.5,ut={w:!1,a:!1,s:!1,d:!1},lt=function(t){var e=Object(s.useRef)(),n=Object(s.useRef)();rt.push(n);var a=Object(s.useMemo)((function(){return(new T.TextureLoader).load(I)}),[]),o=Object(s.useMemo)((function(){return(new T.TextureLoader).load("data:image/png;base64,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")}),[]),i=Object(s.useMemo)((function(){return(new T.TextureLoader).load("data:image/png;base64,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")}),[]);return a.magFilter=T.NearestFilter,i.magFilter=T.NearestFilter,o.magFilter=T.NearestFilter,Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("mesh",{position:[t.position[0],t.position[1]-1,t.position[2]],ref:n,children:[Object(O.jsx)("boxGeometry",{args:[4,.1,4],attach:"geometry"}),Object(O.jsx)("meshPhongMaterial",{color:!0,opacity:0,transparent:!0})]}),Object(O.jsxs)("mesh",{position:[t.position[0],t.position[1],t.position[2]],ref:e,children:[Object(O.jsx)("boxGeometry",{args:[2,2,2],attach:"geometry"}),Object(O.jsx)("meshBasicMaterial",{map:a,attachArray:"material"}),Object(O.jsx)("meshBasicMaterial",{map:a,attachArray:"material"}),Object(O.jsx)("meshBasicMaterial",{map:i,attachArray:"material"}),Object(O.jsx)("meshBasicMaterial",{map:o,attachArray:"material"}),Object(O.jsx)("meshBasicMaterial",{map:a,attachArray:"material"}),Object(O.jsx)("meshBasicMaterial",{map:a,attachArray:"material"})]})]})},dt=function(){Object(s.useEffect)((function(){ot=document.querySelector(".escape_game"),document.addEventListener("pointerlockerror",(function(){console.log("Error"),setTimeout((function(){try{document.body.requestPointerLock()}catch(t){alert("ERROR!\nRestart the page!")}}),1e3)}),!1),void 0!==ot&&ot.addEventListener("click",(function(){ot.style.display="none",document.body.requestPointerLock()})),document.addEventListener("pointerlockchange",(function(){null==document.pointerLockElement?(!1,ot.style.display="block"):(!0,ot.style.display="none")}))}),[]);var t=Object(s.useMemo)((function(){return(new T.TextureLoader).load(D)}),[]);return t.wrapS=t.wrapT=T.RepeatWrapping,t.repeat.set(25,25),t.anisotropy=16,t.encoding=T.sRGBEncoding,Object(s.useMemo)((function(){return(new T.TextureLoader).load(I)}),[]).magFilter=T.NearestFilter,Object(O.jsxs)(H.a,{colorManagement:!0,children:[Object(O.jsx)("ambientLight",{intensity:.5}),Object(O.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[0,ct,0],children:[Object(O.jsx)("planeGeometry",{args:[100,100]}),Object(O.jsx)("meshStandardMaterial",{attach:"material",children:Object(O.jsx)("primitive",{attach:"map",object:t})})]}),Object(O.jsx)(pt,{}),Object(O.jsx)(it,{ground_height:ct,keys:ut,not_allowed:rt})]})};var pt=function(){return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(lt,{position:[10,-.5,0]}),Object(O.jsx)(lt,{position:[8,-.5,0]}),Object(O.jsx)(lt,{position:[6,-.5,0]}),Object(O.jsx)(lt,{position:[4,-.5,0]}),Object(O.jsx)(lt,{position:[2,-.5,0]}),Object(O.jsx)(lt,{position:[0,-.5,0]}),Object(O.jsx)(lt,{position:[-2,-.5,0]}),Object(O.jsx)(lt,{position:[-4,-.5,0]}),Object(O.jsx)(lt,{position:[-6,-.5,0]}),Object(O.jsx)(lt,{position:[-8,-.5,0]}),Object(O.jsx)(lt,{position:[-10,-.5,0]}),Object(O.jsx)(lt,{position:[10,-.5,0]}),Object(O.jsx)(lt,{position:[8,-.5,0]}),Object(O.jsx)(lt,{position:[6,-.5,2]}),Object(O.jsx)(lt,{position:[4,-.5,2]}),Object(O.jsx)(lt,{position:[2,-.5,2]}),Object(O.jsx)(lt,{position:[0,-.5,2]}),Object(O.jsx)(lt,{position:[-2,-.5,2]}),Object(O.jsx)(lt,{position:[-4,-.5,2]}),Object(O.jsx)(lt,{position:[-6,-.5,2]}),Object(O.jsx)(lt,{position:[-8,-.5,2]}),Object(O.jsx)(lt,{position:[-10,-.5,2]}),Object(O.jsx)(lt,{position:[6,-.5,4]}),Object(O.jsx)(lt,{position:[4,-.5,4]}),Object(O.jsx)(lt,{position:[2,-.5,4]}),Object(O.jsx)(lt,{position:[0,-.5,4]}),Object(O.jsx)(lt,{position:[-2,-.5,4]}),Object(O.jsx)(lt,{position:[-4,-.5,4]}),Object(O.jsx)(lt,{position:[-6,-.5,4]}),Object(O.jsx)(lt,{position:[-8,-.5,4]}),Object(O.jsx)(lt,{position:[-10,-.5,4]}),Object(O.jsx)(lt,{position:[6,-.5,6]}),Object(O.jsx)(lt,{position:[4,-.5,6]}),Object(O.jsx)(lt,{position:[2,-.5,6]}),Object(O.jsx)(lt,{position:[0,-.5,6]}),Object(O.jsx)(lt,{position:[-2,-.5,6]}),Object(O.jsx)(lt,{position:[-4,-.5,6]}),Object(O.jsx)(lt,{position:[-6,-.5,6]}),Object(O.jsx)(lt,{position:[-8,-.5,6]}),Object(O.jsx)(lt,{position:[-10,-.5,6]}),Object(O.jsx)(lt,{position:[0,2.5,0]}),Object(O.jsx)(lt,{position:[0,4.5,0]}),Object(O.jsx)(lt,{position:[0,6.5,0]}),Object(O.jsx)(lt,{position:[0,8.5,0]}),Object(O.jsx)(lt,{position:[0,10.5,0]}),Object(O.jsx)(lt,{position:[6,12.5,0]}),Object(O.jsx)(lt,{position:[4,12.5,0]}),Object(O.jsx)(lt,{position:[2,12.5,0]}),Object(O.jsx)(lt,{position:[0,12.5,0]}),Object(O.jsx)(lt,{position:[-2,12.5,0]}),Object(O.jsx)(lt,{position:[-4,12.5,0]}),Object(O.jsx)(lt,{position:[-6,12.5,0]}),Object(O.jsx)(lt,{position:[0,3.5,15]})]})},jt=function(){return Object(s.useEffect)((function(){document.addEventListener("keydown",(function(t){ut.hasOwnProperty(t.key.toLowerCase())&&(ut[t.key.toLowerCase()]=!0)})),document.addEventListener("keyup",(function(t){ut.hasOwnProperty(t.key.toLowerCase())&&(ut[t.key.toLowerCase()]=!1),"Alt"!=t.key&&"Escape"!=t.key||(ot.style.display="block")}))}),[]),Object(O.jsxs)("div",{className:"catchForestFruit",children:[Object(O.jsx)(dt,{}),Object(O.jsx)("div",{className:"escape_game",children:Object(O.jsx)("h1",{children:"Click to play"})})]})};n(304),n(993);performance.now(),new T.Vector3,new T.Vector3,new T.Vector3,new T.Color;var mt="/mtzger";var ht=function(){return Object(O.jsx)("div",{className:"App",children:Object(O.jsxs)(r.a,{children:[Object(O.jsx)(c.a,{exact:!0,path:mt+"/",component:V}),Object(O.jsx)(c.a,{exact:!0,path:mt+"/posts",component:Y}),Object(O.jsx)(c.a,{exact:!0,path:mt+"/posts/users/:username",component:J}),Object(O.jsx)(c.a,{exact:!0,path:mt+"/catchForestFruit",component:jt})]})})};i.a.render(Object(O.jsx)(a.a.StrictMode,{children:Object(O.jsx)(ht,{})}),document.getElementById("root"))}},[[994,1,2]]]);
//# sourceMappingURL=main.020bd4cf.chunk.js.map