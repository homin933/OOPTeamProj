await figma.loadFontAsync({family:'Noto Sans KR',style:'Regular'});
await figma.loadFontAsync({family:'Noto Sans KR',style:'Bold'});
const page=figma.currentPage;page.name='01 · Screens';
const ids=[];const vars={};const styles={};
const prim=await createVariableCollection('CQ / Primitives',['Value']);
const theme=await createVariableCollection('CQ / Light',['Light']);
const darkTheme=await createVariableCollection('CQ / Dark',['Dark']);
const darkVars={};
const map={bg:['FFFFFF','111111'],surface:['F5F5F5','202020'],text:['111111','F5F5F5'],muted:['666666','AAAAAA'],line:['DDDDDD','3A3A3A'],accent:['2962FF','82B1FF'],onAction:['FFFFFF','111111'],black:['000000','000000'],white:['FFFFFF','FFFFFF']};
const primitives={};
for(const hex of [...new Set(Object.values(map).flat())]){let v=figma.variables.createVariable('hex/'+hex,prim.collection,'COLOR');v.scopes=[];v.setValueForMode(prim.modeIds.Value,{r:parseInt(hex.slice(0,2),16)/255,g:parseInt(hex.slice(2,4),16)/255,b:parseInt(hex.slice(4,6),16)/255});v.setVariableCodeSyntax('WEB','var(--cq-'+hex.toLowerCase()+')');primitives[hex]=v;}
for(const [name,values] of Object.entries(map))for(const dark of [false,true]){const coll=dark?darkTheme:theme;let v=figma.variables.createVariable('color/'+name,coll.collection,'COLOR');v.scopes=['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR'];v.setVariableCodeSyntax('WEB','var(--cq-'+name+')');v.setValueForMode(Object.values(coll.modeIds)[0],{type:'VARIABLE_ALIAS',id:primitives[values[dark?1:0]].id});(dark?darkVars:vars)[name]=v;}
for(const n of [0,4,8,12,16,24,32,40]){let v=figma.variables.createVariable('space/'+n,prim.collection,'FLOAT');v.scopes=n===0?['GAP','CORNER_RADIUS']:['GAP'];v.setVariableCodeSyntax('WEB','var(--cq-space-'+n+')');v.setValueForMode(prim.modeIds.Value,n);vars['s'+n]=v;darkVars['s'+n]=v;}
for(const [name,size,style] of [['display',36,'Bold'],['title',26,'Bold'],['section',20,'Bold'],['body',14,'Regular'],['strong',14,'Bold'],['caption',12,'Regular']]){let t=figma.createTextStyle();t.name='CQ / '+name;t.fontName={family:'Noto Sans KR',style};t.fontSize=size;t.lineHeight={unit:'PERCENT',value:145};styles[name]=t;}
let mode=false;function paint(name){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',(mode?darkVars:vars)[name]);}
const built=await createComponentWithVariants({name:'CQ / Button',description:'캠퍼스 퀴즈 공통 동작. Primary=주요 행동, Secondary=보조 행동. 반경 0, 최소 높이 44.',variantAxes:{Theme:['Light','Dark'],Style:['Primary','Secondary'],State:['Default','Hover','Disabled']},baseProps:{width:200,height:44,layoutMode:'HORIZONTAL',radius:0},page});
const labelProp=built.componentSet.addComponentProperty('Label','TEXT','계속하기');
for(const n of built.variants){mode=n.name.includes('Dark');ids.push(n.id);let primary=n.name.includes('Primary'),disabled=n.name.includes('Disabled');n.fills=[paint(disabled?'line':primary?'text':'bg')];if(!primary){n.strokes=[paint('line')];n.strokeWeight=1;}n.setBoundVariable('cornerRadius',vars.s0);n.setBoundVariable('paddingLeft',vars.s16);n.setBoundVariable('paddingRight',vars.s16);let t=figma.createText();t.fontName={family:'Noto Sans KR',style:'Bold'};t.textStyleId=styles.strong.id;t.characters='계속하기';t.fills=[paint(disabled?'muted':primary?'onAction':'text')];n.appendChild(t);t.componentPropertyReferences={characters:labelProp};ids.push(t.id);}
built.componentSet.x=200;built.componentSet.y=-480;ids.push(built.componentSet.id);
return {createdNodeIds:ids,pageId:page.id,theme:{id:theme.collection.id,modes:theme.modeIds},darkVariables:Object.fromEntries(Object.entries(darkVars).map(([k,v])=>[k,v.id])),variables:Object.fromEntries(Object.entries(vars).map(([k,v])=>[k,v.id])),styles:Object.fromEntries(Object.entries(styles).map(([k,v])=>[k,v.id])),buttons:built.variants.map(n=>({id:n.id,name:n.name})),primitiveIds:Object.values(primitives).map(v=>v.id)};
