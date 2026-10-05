import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
const root=path.resolve("dist");let count=0;
function walk(directory){for(const entry of fs.readdirSync(directory,{withFileTypes:true})){const file=path.join(directory,entry.name);if(entry.isDirectory())walk(file);else if(entry.name.endsWith(".js"))finalize(file);}}
function finalize(file){
 const text=fs.readFileSync(file,"utf8"),source=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS),edits=[];
 function resolve(literal){
  const value=literal.text;if(!value.startsWith("."))return;
  const target=path.resolve(path.dirname(file),value);
  if(fs.existsSync(target)&&fs.statSync(target).isFile())return;
  const suffix=fs.existsSync(target+".js")?".js":fs.existsSync(path.join(target,"index.js"))?"/index.js":undefined;
  if(!suffix)throw new Error(`Unresolved emitted import ${file}: ${value}`);
  edits.push({start:literal.getStart(source),end:literal.getEnd(),replacement:JSON.stringify(value+suffix)});
 }
 function visit(node){if((ts.isImportDeclaration(node)||ts.isExportDeclaration(node))&&node.moduleSpecifier&&ts.isStringLiteral(node.moduleSpecifier))resolve(node.moduleSpecifier);
  if(ts.isCallExpression(node)&&node.expression.kind===ts.SyntaxKind.ImportKeyword&&node.arguments.length===1&&ts.isStringLiteral(node.arguments[0]))resolve(node.arguments[0]);ts.forEachChild(node,visit);}
 visit(source);let output=text;for(const edit of edits.sort((a,b)=>b.start-a.start))output=output.slice(0,edit.start)+edit.replacement+output.slice(edit.end);
 // Rewritten module locations invalidate the compiler's emitted source-map offsets.
 output=output.replace(/\n?\/\/# sourceMappingURL=.*$/m,"");
 const sourcePath=path.resolve("src",path.relative(root,file).replace(/\.js$/, ".tsx"));
 if(fs.existsSync(sourcePath)&&!/^(["'])use client\1;?/.test(output.trimStart()))output='"use client";\n'+output;
 fs.writeFileSync(file,output);count+=edits.length;
}
walk(root);console.log(`Finalized ${count} exact relative ESM import specifiers`);
